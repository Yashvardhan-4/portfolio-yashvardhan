"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface LiquidArtPlaneProps {
  src: string;
  alt: string;
  className?: string;
}

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uTime;
  uniform float uAspect;
  uniform vec2 uTexResolution;
  varying vec2 vUv;

  vec2 coverUv(vec2 uv, vec2 res, float targetAspect) {
    float texAspect = res.x / max(res.y, 1.0);
    vec2 scaled = uv - 0.5;
    if (texAspect > targetAspect) {
      scaled.x *= targetAspect / texAspect;
    } else {
      scaled.y *= texAspect / targetAspect;
    }
    return scaled + 0.5;
  }

  void main() {
    vec2 uv = coverUv(vUv, uTexResolution, uAspect);
    vec2 aspectPos = vec2((vUv.x - uMouse.x) * uAspect, vUv.y - uMouse.y);
    float dist = length(aspectPos);

    // Smooth liquid-silk concentric ripple & delicate optical refraction around pointer
    float ripple = sin(dist * 22.0 - uTime * 3.8) * exp(-dist * 5.2) * uHover;
    vec2 dir = dist > 0.0001 ? normalize(aspectPos) : vec2(0.0);
    vec2 displaced = uv + dir * ripple * 0.014;

    float shift = abs(ripple) * 0.0045;
    float r = texture2D(uTexture, clamp(displaced + vec2(shift, 0.0), 0.001, 0.999)).r;
    float g = texture2D(uTexture, clamp(displaced, 0.001, 0.999)).g;
    float b = texture2D(uTexture, clamp(displaced - vec2(shift, 0.0), 0.001, 0.999)).b;

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

/**
 * Lusion-inspired Liquid-Silk Interactive Artwork Plane.
 * Mounts WebGL lazily via IntersectionObserver only while inside or near the
 * viewport so multiple showcase works never exhaust browser WebGL contexts.
 * Always keeps crisp `<img>` fallback underneath for instant paint & touch devices.
 */
export function LiquidArtPlane({ src, alt, className = "" }: LiquidArtPlaneProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [shaderReady, setShaderReady] = useState(false);

  // Lazy mount WebGL only when artwork enters near-viewport
  useEffect(() => {
    const el = hostRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const finePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: "180px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) {
      setShaderReady(false);
      return;
    }

    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    let alive = true;
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const canvas = renderer.domElement;
    canvas.className = "absolute inset-0 w-full h-full pointer-events-none block transition-opacity duration-500";
    canvas.style.opacity = "0";
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const uniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uAspect: { value: width / height },
      uTexResolution: { value: new THREE.Vector2(1600, 1000) },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let texture: THREE.Texture | null = null;
    const loader = new THREE.TextureLoader();
    loader.load(
      src,
      (loaded) => {
        if (!alive) {
          loaded.dispose();
          return;
        }
        loaded.colorSpace = THREE.SRGBColorSpace;
        loaded.minFilter = THREE.LinearFilter;
        loaded.magFilter = THREE.LinearFilter;
        texture = loaded;
        uniforms.uTexture.value = loaded;
        if (loaded.image) {
          uniforms.uTexResolution.value.set(
            loaded.image.naturalWidth || loaded.image.width || 1600,
            loaded.image.naturalHeight || loaded.image.height || 1000
          );
        }
        canvas.style.opacity = "1";
        setShaderReady(true);
      },
      undefined,
      () => {
        if (alive) setShaderReady(false);
      }
    );

    const targetMouse = new THREE.Vector2(0.5, 0.5);
    let targetHover = 0;
    let pointerSpeed = 0;
    let lastClient = { x: 0, y: 0, has: false };
    let raf = 0;
    let lastTime = performance.now();

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = 1 - (e.clientY - rect.top) / rect.height;
      targetMouse.set(Math.min(1, Math.max(0, nx)), Math.min(1, Math.max(0, ny)));

      if (lastClient.has) {
        const dist = Math.hypot(e.clientX - lastClient.x, e.clientY - lastClient.y);
        pointerSpeed = Math.min(1.4, pointerSpeed + dist * 0.015);
      }
      lastClient = { x: e.clientX, y: e.clientY, has: true };
      targetHover = 1;
    };

    const onLeave = () => {
      targetHover = 0;
      lastClient.has = false;
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(() => {
      if (!alive) return;
      const w = Math.max(1, host.clientWidth);
      const h = Math.max(1, host.clientHeight);
      renderer.setSize(w, h, false);
      uniforms.uAspect.value = w / h;
    });
    ro.observe(host);

    const loop = (now: number) => {
      if (!alive) return;
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      uniforms.uTime.value += dt;
      uniforms.uMouse.value.lerp(targetMouse, 0.14);
      pointerSpeed *= 0.92;
      const desired = Math.min(1.15, targetHover * (0.28 + pointerSpeed));
      uniforms.uHover.value += (desired - uniforms.uHover.value) * 0.1;

      if (uniforms.uTexture.value) {
        renderer.render(scene, camera);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      geometry.dispose();
      material.dispose();
      texture?.dispose();
      renderer.dispose();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [inView, src]);

  return (
    <div ref={hostRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
          shaderReady ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}

export default LiquidArtPlane;
