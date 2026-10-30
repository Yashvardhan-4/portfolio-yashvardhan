"use client";

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useSyncExternalStore,
  CSSProperties,
} from "react";
import * as THREE from "three";

export interface CarouselItem {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  tag?: string;
  href?: string;
}

export interface ConcaveCarouselProps {
  items: CarouselItem[];
  startIndex?: number;
  aspect?: number;
  size?: number;
  curvature?: number;
  distance?: number;
  tilt?: number;
  gap?: number;
  radius?: number;
  reflection?: number;
  dim?: number;
  autoplay?: "drift" | "step" | "off";
  speed?: number;
  interval?: number;
  snap?: boolean;
  inertia?: number;
  pauseOnHover?: boolean;
  draggable?: boolean;
  wheel?: boolean;
  captions?: boolean;
  controls?: boolean;
  backgroundColor?: string;
  paused?: boolean;
  dpr?: number;
  ariaLabel?: string;
  onIndexChange?: (index: number) => void;
  onSelect?: (item: CarouselItem, index: number) => void;
  className?: string;
  style?: CSSProperties;
}

export interface ConcaveCarouselRef {
  next: () => void;
  previous: () => void;
  goTo: (index: number) => void;
}

const ARC_LIMIT = (52 * Math.PI) / 180;
const TWO_PI = 2 * Math.PI;

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));

const subscribeReducedMotion = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  const m = window.matchMedia("(prefers-reduced-motion: reduce)");
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

const getReducedMotionSnapshot = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const VERTEX_SHADER = `
uniform float uCenter;
uniform float uWidth;
uniform float uK;
uniform float uFloor;
uniform float uMirror;
varying vec2 vUv;
varying float vLift;

void main() {
  vUv = uv;
  float s = uCenter + (uv.x - 0.5) * uWidth;
  float y = uv.y - 0.5;
  float x = s;
  float z = 0.0;
  if (uK > 1e-5) {
    float a = s * uK;
    float h = sin(a * 0.5);
    x = sin(a) / uK;
    z = 2.0 * h * h / uK;
  }
  vLift = y - uFloor;
  if (uMirror > 0.5) y = 2.0 * uFloor - y;
  gl_Position = projectionMatrix * viewMatrix * vec4(x, y, z, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform sampler2D uImage;
uniform float uImageAspect;
uniform float uWidth;
uniform float uRadius;
uniform float uLoaded;
uniform float uAlpha;
uniform float uMirror;
uniform float uReflect;
uniform float uDim;
uniform float uHover;
uniform vec2 uResolution;
uniform vec3 uPlaceholder;
varying vec2 vUv;
varying float vLift;

float roundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec2 size = vec2(uWidth, 1.0);
  vec2 p = (vUv - 0.5) * size;
  float lift = max(vLift, 0.0);
  float mirror = step(0.5, uMirror);
  float soft = 1.0 + mirror * lift * 26.0;
  float d = roundBox(p, size * 0.5, min(uRadius, 0.5 * min(size.x, size.y)));
  float aa = max(fwidth(d), 1e-5) * 0.7 * soft;
  float mask = 1.0 - smoothstep(-aa, aa, d);

  float fade = mix(1.0, uReflect * pow(1.0 - clamp(lift / 0.62, 0.0, 1.0), 2.2), mirror);
  float edge = abs(gl_FragCoord.x / uResolution.x * 2.0 - 1.0);
  float vignette = 1.0 - uDim * smoothstep(0.18, 1.05, edge) * (1.0 - 0.85 * uHover);
  float alpha = mask * fade * vignette * uAlpha;
  if (alpha < 0.002) discard;

  float panelAspect = size.x / size.y;
  vec2 uv = vUv - 0.5;
  if (panelAspect > uImageAspect) {
    uv.y *= uImageAspect / panelAspect;
  } else {
    uv.x *= panelAspect / uImageAspect;
  }
  uv += 0.5;
  
  vec4 texColor = texture2D(uImage, uv);
  float loaded = clamp(uLoaded, 0.0, 1.0);
  vec3 rgb = mix(uPlaceholder, texColor.rgb, loaded);
  alpha *= mix(0.12, 1.0, loaded);
  gl_FragColor = vec4(rgb * alpha, alpha);
}
`;

interface LoadedImageItem {
  image: HTMLImageElement;
  texture: THREE.Texture;
  aspect: number;
  ready: boolean;
  uploaded: boolean;
  fade: number;
}

export const ConcaveCarousel = forwardRef<ConcaveCarouselRef, ConcaveCarouselProps>(
  function ConcaveCarousel(
    {
      items,
      startIndex = 0,
      aspect = 1.45,
      size = 0.5,
      curvature = 0.75,
      distance = 3.6,
      tilt = 0,
      gap = 20,
      radius = 16,
      reflection = 0.15,
      dim = 0.35,
      autoplay = "drift",
      speed = 0.14,
      interval = 4,
      snap = true,
      inertia = 0.5,
      pauseOnHover = true,
      draggable = true,
      wheel = true,
      captions = true,
      controls = true,
      backgroundColor = "transparent",
      paused = false,
      dpr = 2,
      ariaLabel = "Concave 3D Project Carousel",
      onIndexChange,
      onSelect,
      className = "",
      style,
    },
    ref
  ) {
    const rootRef = useRef<HTMLDivElement>(null);
    const canvasWrapRef = useRef<HTMLDivElement>(null);
    const captionWrapRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<{
      sync: () => void;
      step: (dir: number) => void;
      goTo: (idx: number) => void;
      destroy: () => void;
    } | null>(null);

    const isReduced = useSyncExternalStore(
      subscribeReducedMotion,
      getReducedMotionSnapshot,
      () => false
    );

    const [activeIndex, setActiveIndex] = useState(
      clamp(Math.round(startIndex), 0, Math.max(items.length - 1, 0))
    );
    const [controlsTop, setControlsTop] = useState<number | null>(null);

    const settingsRef = useRef({
      aspect,
      size,
      curvature,
      distance,
      tilt,
      gap,
      radius,
      reflection,
      dim,
      autoplay,
      speed,
      interval,
      snap,
      inertia,
      pauseOnHover,
      draggable,
      wheel,
      captions,
      controls,
      backgroundColor,
      paused,
      dpr,
      reduced: isReduced,
    });

    const itemsRef = useRef(items);
    const callbacksRef = useRef({ onIndexChange, onSelect });

    useEffect(() => {
      settingsRef.current = {
        aspect,
        size,
        curvature,
        distance,
        tilt,
        gap,
        radius,
        reflection,
        dim,
        autoplay,
        speed,
        interval,
        snap,
        inertia,
        pauseOnHover,
        draggable,
        wheel,
        captions,
        controls,
        backgroundColor,
        paused,
        dpr,
        reduced: isReduced,
      };
      itemsRef.current = items;
      callbacksRef.current = { onIndexChange, onSelect };
      engineRef.current?.sync();
    });

    useEffect(() => {
      const container = rootRef.current;
      const wrap = canvasWrapRef.current;
      const captionContainer = captionWrapRef.current;
      if (!container || !wrap || !captionContainer) return;

      const doc = container.ownerDocument;
      const canvas = doc.createElement("canvas");
      canvas.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;display:block;";

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
      } catch {
        return;
      }

      wrap.appendChild(canvas);
      renderer.setClearColor(0, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.02, 400);
      const quadGeo = new THREE.PlaneGeometry(1, 1, 72, 1);

      const placeholderTex = new THREE.DataTexture(
        new Uint8Array([14, 18, 26, 255]),
        1,
        1,
        THREE.RGBAFormat
      );
      placeholderTex.needsUpdate = true;

      const resolution = new THREE.Vector2(1, 1);
      const placeholderColor = new THREE.Color(0.05, 0.07, 0.1);

      const createMaterial = (isMirror: boolean) =>
        new THREE.ShaderMaterial({
          uniforms: {
            uImage: { value: placeholderTex },
            uImageAspect: { value: 1.5 },
            uCenter: { value: 0 },
            uWidth: { value: 1.3 },
            uK: { value: 0.3 },
            uFloor: { value: -0.535 },
            uMirror: { value: isMirror ? 1 : 0 },
            uRadius: { value: 0.04 },
            uLoaded: { value: 0 },
            uAlpha: { value: 1 },
            uReflect: { value: 0 },
            uDim: { value: 0 },
            uHover: { value: 0 },
            uResolution: { value: resolution },
            uPlaceholder: { value: placeholderColor },
          },
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
          transparent: true,
          depthTest: false,
          depthWrite: false,
          side: THREE.DoubleSide,
        });

      const panels = Array.from({ length: 28 }, () => {
        const mirrorMesh = new THREE.Mesh(quadGeo, createMaterial(true));
        const mesh = new THREE.Mesh(quadGeo, createMaterial(false));
        mirrorMesh.frustumCulled = false;
        mesh.frustumCulled = false;
        mirrorMesh.visible = false;
        mesh.visible = false;
        mirrorMesh.renderOrder = 0;
        mesh.renderOrder = 1;
        scene.add(mirrorMesh);
        scene.add(mesh);
        return { mesh, mirror: mirrorMesh };
      });

      const captionPool = Array.from({ length: 5 }, () => {
        const el = doc.createElement("div");
        el.setAttribute("aria-hidden", "true");
        el.style.cssText =
          "position:absolute;left:0;top:0;display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center;white-space:nowrap;opacity:0;pointer-events:none;will-change:transform,opacity;";
        const tag = doc.createElement("span");
        tag.style.cssText =
          "font-family:monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#00F0FF;";
        const title = doc.createElement("span");
        title.style.cssText =
          "font-family:'Instrument Serif',Georgia,serif;font-size:22px;font-weight:400;color:#FFFFFF;letter-spacing:-0.02em;";
        const subtitle = doc.createElement("span");
        subtitle.style.cssText =
          "font-family:sans-serif;font-size:12px;color:#8492A6;";
        el.append(tag, title, subtitle);
        captionContainer.appendChild(el);
        return {
          node: el,
          tag,
          title,
          subtitle,
          index: NaN,
          opacity: -1,
          x: NaN,
          y: NaN,
        };
      });

      let loadedImages: LoadedImageItem[] = [];
      let itemsSignature = "";
      let canvasW = 0;
      let canvasH = 0;
      let dprVal = 1;
      let isReady = false;
      let currentPos = startIndex;
      let velocity = 0;
      let targetPos: number | null = startIndex;
      let lastTime = 0;
      let rafId = 0;
      let isIntersecting = false;
      let isHovered = false;
      let hoveredIndex: number | null = null;
      let isPointerDown = false;
      let pointerSession: {
        id: number;
        startX: number;
        originPos: number;
        moved: boolean;
        samples: { t: number; p: number }[];
      } | null = null;
      const hoverMap = new Map<number, number>();

      const geom = {
        labelGap: 24,
        controlsTop: 24,
        unit: 1,
        pitch: 1.4,
        width: 1.35,
        k: 0.3,
        distance: 2.4,
        lift: 0,
        radius: 0.04,
      };

      const getItemCount = () => Math.max(itemsRef.current.length, 1);
      const modIndex = (i: number) =>
        ((i % getItemCount()) + getItemCount()) % getItemCount();

      const loadItems = () => {
        const curItems = itemsRef.current;
        const sig = curItems.map((c) => c.src).join("|");
        if (sig === itemsSignature) return;
        itemsSignature = sig;

        captionPool.forEach((c) => {
          c.index = NaN;
        });
        loadedImages.forEach((img) => {
          img.image.onload = null;
          img.texture.dispose();
        });

        loadedImages = curItems.map((item) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.decoding = "async";
          const tex = new THREE.Texture(img);
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;

          const record: LoadedImageItem = {
            image: img,
            texture: tex,
            aspect: 1.5,
            ready: false,
            uploaded: false,
            fade: 0,
          };

          img.onload = () => {
            record.aspect = img.naturalWidth / Math.max(img.naturalHeight, 1);
            record.ready = true;
            tex.needsUpdate = true;
            requestFrame();
          };
          img.src = item.src;
          return record;
        });
      };

      const updateDimensions = () => {
        const s = settingsRef.current;
        const w = Math.round(container.clientWidth);
        const h = Math.round(container.clientHeight);
        if (w < 2 || h < 2) return false;

        const winDpr = Math.min(
          window.devicePixelRatio || 1,
          Math.max(s.dpr, 0.5)
        );
        if (isReady && w === canvasW && h === canvasH && winDpr === dprVal) {
          return false;
        }

        isReady = true;
        canvasW = w;
        canvasH = h;
        dprVal = winDpr;

        renderer.setPixelRatio(dprVal);
        renderer.setSize(canvasW, canvasH, false);
        resolution.set(canvasW * dprVal, canvasH * dprVal);
        return true;
      };

      const calculateGeometry = () => {
        const s = settingsRef.current;
        const scaleMod = clamp(canvasH / 620, 0.72, 1.15);
        const gapVal = 24 * scaleMod;
        const controlsSpace = s.controls ? gapVal + 48 : 0;
        geom.labelGap = gapVal;
        geom.controlsTop = canvasH - controlsSpace;

        const effectiveH = Math.max(canvasH - controlsSpace, 0.55 * canvasH);
        const panelAspect = clamp(s.aspect, 0.4, 3.5);
        let panelH = clamp(s.size, 0.15, 0.95) * effectiveH;
        const dist = clamp(s.distance, 0.9, 12);
        const maxTan = Math.tan((62 * Math.PI) / 180);

        if (canvasW / panelH / 2 / dist > maxTan) {
          panelH = canvasW / 2 / dist / maxTan;
        }

        const normGap = Math.max(0, s.gap) / panelH;
        geom.unit = panelH;
        geom.width = panelAspect;
        geom.pitch = panelAspect + normGap;
        geom.k = (clamp(s.curvature, 0, 1) * ARC_LIMIT) / geom.pitch;
        geom.distance = dist;
        geom.radius = Math.max(0, s.radius) / panelH;

        camera.fov =
          (2 * Math.atan(canvasH / 2 / panelH / dist) * 180) / Math.PI;
        camera.aspect = canvasW / canvasH;
        camera.near = Math.max(0.01, 0.02 * dist);
        camera.far = dist + 200;
        camera.position.set(0, Math.tan((s.tilt * Math.PI) / 180) * dist, dist);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();

        setControlsTop(geom.controlsTop);
      };

      const requestFrame = () => {
        if (!isIntersecting || rafId) return;
        rafId = requestAnimationFrame(renderLoop);
      };

      function renderLoop(time: number) {
        rafId = 0;
        if (!isReady && (!updateDimensions() || !isReady)) return;

        const s = settingsRef.current;
        const dt =
          lastTime && time - lastTime < 100
            ? Math.min(Math.max((time - lastTime) / 1000, 0), 0.05)
            : 1 / 60;
        lastTime = time;

        updateDimensions();
        calculateGeometry();

        // Autoplay and motion physics
        const isInteracting = isPointerDown || (s.pauseOnHover && isHovered);
        if (!isInteracting && !s.paused && !s.reduced) {
          if (s.autoplay === "drift") {
            currentPos += s.speed * dt;
          }
        }

        if (targetPos !== null && !isPointerDown) {
          const diff = targetPos - currentPos;
          currentPos += diff * Math.min(1, dt * 7);
          if (Math.abs(diff) < 0.001) {
            currentPos = targetPos;
            targetPos = null;
          }
        }

        const centerIdx = modIndex(Math.round(currentPos));
        if (centerIdx !== activeIndex) {
          setActiveIndex(centerIdx);
          callbacksRef.current.onIndexChange?.(centerIdx);
        }

        // Render 3D Concave Panels
        const roundPos = Math.round(currentPos);
        let panelIndex = 0;

        for (let offset = -13; offset <= 14 && panelIndex < 28; offset++) {
          const itemIdx = roundPos + offset;
          const arcOffset = (itemIdx - currentPos) * geom.pitch;

          if (geom.k > 1e-5 && Math.abs(arcOffset * geom.k) > 0.98 * Math.PI) {
            continue;
          }

          const panel = panels[panelIndex++];
          const itemRecord = loadedImages[modIndex(itemIdx)];

          const hoverVal = hoverMap.get(itemIdx) || 0;
          const isCenter = Math.abs(itemIdx - currentPos) < 0.5;

          for (const meshObj of [panel.mesh, panel.mirror]) {
            const isMirror = meshObj === panel.mirror;
            meshObj.visible = !isMirror || s.reflection > 0.001;

            const u = meshObj.material.uniforms;
            u.uCenter.value = arcOffset;
            u.uWidth.value = geom.width;
            u.uK.value = geom.k;
            u.uRadius.value = geom.radius;
            u.uAlpha.value = 1;
            u.uReflect.value = s.reflection;
            u.uDim.value = s.dim;
            u.uHover.value = hoverVal;

            if (itemRecord) {
              u.uImage.value = itemRecord.ready
                ? itemRecord.texture
                : placeholderTex;
              u.uImageAspect.value = itemRecord.aspect;
              u.uLoaded.value = itemRecord.ready ? 1 : 0;
            }
          }
        }

        for (let i = panelIndex; i < 28; i++) {
          panels[i].mesh.visible = false;
          panels[i].mirror.visible = false;
        }

        // Position Active Captions
        const curItems = itemsRef.current;
        for (let offset = -2; offset <= 2; offset++) {
          const capIdx = roundPos + offset;
          const caption = captionPool[((capIdx % 5) + 5) % 5];
          const distFromCenter = Math.abs(capIdx - currentPos);

          if (s.captions && distFromCenter < 1.2) {
            if (caption.index !== capIdx) {
              caption.index = capIdx;
              const itemData = curItems[modIndex(capIdx)];
              caption.tag.textContent = itemData?.tag || "EXPERIMENT";
              caption.title.textContent = itemData?.title || itemData?.alt || "";
              caption.subtitle.textContent = itemData?.subtitle || "";
            }

            const opacity = clamp(1 - distFromCenter * 1.5, 0, 1);
            caption.node.style.opacity = opacity.toFixed(3);

            const screenX =
              canvasW / 2 +
              (capIdx - currentPos) * geom.pitch * (geom.unit * 0.85);
            const screenY = geom.controlsTop - 36;
            caption.node.style.transform = `translate(${screenX.toFixed(
              1
            )}px, ${screenY.toFixed(1)}px) translateX(-50%)`;
          } else {
            caption.node.style.opacity = "0";
          }
        }

        renderer.render(scene, camera);

        if (!s.paused || isPointerDown || targetPos !== null) {
          requestFrame();
        }
      }

      // Pointer drag interaction
      const handlePointerDown = (e: PointerEvent) => {
        if (!settingsRef.current.draggable || e.button > 0) return;
        isPointerDown = true;
        pointerSession = {
          id: e.pointerId,
          startX: e.clientX,
          originPos: currentPos,
          moved: false,
          samples: [{ t: performance.now(), p: currentPos }],
        };
        requestFrame();
      };

      const handlePointerMove = (e: PointerEvent) => {
        if (!pointerSession || pointerSession.id !== e.pointerId) return;
        const dx = e.clientX - pointerSession.startX;
        if (Math.hypot(dx) > 5) {
          pointerSession.moved = true;
          targetPos = null;
        }
        if (pointerSession.moved) {
          // Controlled, natural 1:1 physical finger/cursor tracking
          const deltaPan = -(dx / Math.max(canvasW, 1)) * 1.35;
          currentPos = pointerSession.originPos + deltaPan;
          requestFrame();
        }
      };

      const handlePointerUp = (e: PointerEvent) => {
        if (!pointerSession || pointerSession.id !== e.pointerId) return;
        if (pointerSession.moved && settingsRef.current.snap) {
          targetPos = Math.round(currentPos);
        } else if (!pointerSession.moved) {
          const rawIdx = Math.round(currentPos) % items.length;
          const normalizedIdx = (rawIdx + items.length) % items.length;
          callbacksRef.current.onSelect?.(items[normalizedIdx], normalizedIdx);
        }
        isPointerDown = false;
        pointerSession = null;
        requestFrame();
      };

      let wheelAccumulator = 0;
      let wheelDebounce: ReturnType<typeof setTimeout> | null = null;
      const handleWheel = (e: WheelEvent) => {
        if (!settingsRef.current.wheel) return;
        e.preventDefault();
        wheelAccumulator += e.deltaY || e.deltaX;
        
        if (wheelDebounce) clearTimeout(wheelDebounce);
        wheelDebounce = setTimeout(() => {
          wheelAccumulator = 0;
        }, 180);

        // Smooth step only when threshold is crossed to prevent spinning wildly
        if (Math.abs(wheelAccumulator) >= 70) {
          const step = wheelAccumulator > 0 ? 1 : -1;
          targetPos = (targetPos ?? currentPos) + step;
          wheelAccumulator = 0;
          requestFrame();
        }
      };

      container.addEventListener("pointerdown", handlePointerDown);
      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerup", handlePointerUp);
      container.addEventListener("pointercancel", handlePointerUp);
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("mouseenter", () => {
        isHovered = true;
      });
      container.addEventListener("mouseleave", () => {
        isHovered = false;
      });

      const resizeObs = new ResizeObserver(() => {
        if (updateDimensions()) requestFrame();
      });
      resizeObs.observe(container);

      const intersectObs =
        typeof IntersectionObserver === "undefined"
          ? null
          : new IntersectionObserver(
              ([entry]) => {
                isIntersecting = entry.isIntersecting;
                if (isIntersecting) {
                  lastTime = 0;
                  requestFrame();
                } else if (rafId) {
                  cancelAnimationFrame(rafId);
                  rafId = 0;
                }
              },
              { rootMargin: "100px" }
            );

      if (intersectObs) intersectObs.observe(container);
      else isIntersecting = true;

      loadItems();
      updateDimensions();
      calculateGeometry();
      requestFrame();

      engineRef.current = {
        sync: () => {
          loadItems();
          updateDimensions();
          calculateGeometry();
          requestFrame();
        },
        step: (dir: number) => {
          targetPos = Math.round(targetPos ?? currentPos) + dir;
          requestFrame();
        },
        goTo: (idx: number) => {
          targetPos = idx;
          requestFrame();
        },
        destroy: () => {
          if (rafId) cancelAnimationFrame(rafId);
          if (wheelDebounce) clearTimeout(wheelDebounce);
          resizeObs.disconnect();
          intersectObs?.disconnect();
          container.removeEventListener("pointerdown", handlePointerDown);
          container.removeEventListener("pointermove", handlePointerMove);
          container.removeEventListener("pointerup", handlePointerUp);
          container.removeEventListener("pointercancel", handlePointerUp);
          container.removeEventListener("wheel", handleWheel);
          loadedImages.forEach((img) => {
            img.image.onload = null;
            img.texture.dispose();
          });
          panels.forEach((p) => {
            p.mesh.material.dispose();
            p.mirror.material.dispose();
          });
          placeholderTex.dispose();
          quadGeo.dispose();
          renderer.dispose();
          canvas.remove();
        },
      };

      return () => {
        engineRef.current?.destroy();
        engineRef.current = null;
      };
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        next: () => engineRef.current?.step(1),
        previous: () => engineRef.current?.step(-1),
        goTo: (idx: number) => engineRef.current?.goTo(idx),
      }),
      []
    );

    return (
      <div
        ref={rootRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        className={`relative h-[560px] w-full overflow-hidden select-none outline-none ${className}`}
        style={style}
      >
        <div ref={canvasWrapRef} className="absolute inset-0 z-0" />
        <div ref={captionWrapRef} className="absolute inset-0 z-10 pointer-events-none" />

        {/* Carousel Prev / Next Controls */}
        {controls && (
          <div
            className="absolute left-0 right-0 z-20 flex justify-center items-center gap-4 pointer-events-auto"
            style={{ top: controlsTop ? `${controlsTop}px` : "84%" }}
          >
            <button
              type="button"
              aria-label="Previous Project"
              onClick={() => engineRef.current?.step(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#161B26] bg-[#0A0D14]/80 text-[#8492A6] backdrop-blur-md transition-all duration-200 hover:border-[#00F0FF] hover:text-[#00F0FF] hover:shadow-[0_0_15px_rgba(0,240,255,0.25)]"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <span className="font-mono text-xs tabular-nums text-[#8492A6]">
              <span className="text-[#00F0FF] font-semibold">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="opacity-40"> / {String(items.length).padStart(2, "0")}</span>
            </span>

            <button
              type="button"
              aria-label="Next Project"
              onClick={() => engineRef.current?.step(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#161B26] bg-[#0A0D14]/80 text-[#8492A6] backdrop-blur-md transition-all duration-200 hover:border-[#00F0FF] hover:text-[#00F0FF] hover:shadow-[0_0_15px_rgba(0,240,255,0.25)]"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }
);
