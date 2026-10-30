"use client";

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useSyncExternalStore,
  CSSProperties,
  ReactNode,
} from "react";
import * as THREE from "three";

export type PlantType = "ficus" | "olive" | "palm" | "fern";
export type PlacementType =
  | "top-right"
  | "top-left"
  | "right"
  | "left"
  | "bottom-right"
  | "bottom-left";
export type WindowMode = "auto" | "on" | "off";

export interface DappledLightProps {
  plant?: PlantType;
  placement?: PlacementType;
  scale?: number;
  density?: number;
  depth?: number;
  softness?: number;
  shadowStrength?: number;
  lightColor?: string;
  shadowColor?: string;
  backgroundColor?: string;
  window?: WindowMode;
  windowAngle?: number;
  windowSize?: number;
  intensity?: number;
  bloom?: number;
  wind?: number;
  windSpeed?: number;
  clouds?: number;
  breeze?: boolean;
  grain?: number;
  seed?: number;
  intro?: boolean;
  paused?: boolean;
  dpr?: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface DappledLightRef {
  gust: (strength?: number) => void;
  replay: () => void;
}

const TWO_PI = 2 * Math.PI;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const smoothstep = (e: number) => {
  const t = clamp(e, 0, 1);
  return t * t * t * (t * (6 * t - 15) + 10);
};
const wrapAngle = (e: number) => {
  let t = (e + Math.PI) % TWO_PI;
  if (t < 0) t += TWO_PI;
  return t - Math.PI;
};

const subscribeReducedMotion = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  const m = window.matchMedia("(prefers-reduced-motion: reduce)");
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const getReducedMotionSnapshot = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const tempColor = new THREE.Color();
const parseColor = (e?: string): [number, number, number] | null => {
  if (!e) return null;
  const t = e.trim().toLowerCase();
  if (!t || t === "transparent" || t === "none" || t === "auto") return null;
  try {
    tempColor.setStyle(t, THREE.SRGBColorSpace);
    return [tempColor.r, tempColor.g, tempColor.b];
  } catch {
    return null;
  }
};
const srgbToLinear = (e: number) =>
  e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);

interface BranchConfig {
  offset: number;
  length: number;
  segments: number;
  curl: number;
  droop: number;
  depth: number;
  spread: number;
}

const PLANT_PRESETS: Record<PlantType, BranchConfig[]> = {
  ficus: [
    { offset: 0, length: 0.95, segments: 6, curl: 0.16, droop: 0.05, depth: 0.12, spread: 0 },
    { offset: -0.44, length: 0.74, segments: 5, curl: -0.1, droop: 0.06, depth: 0.55, spread: -0.12 },
    { offset: 0.42, length: 0.66, segments: 5, curl: 0.2, droop: 0.04, depth: 0.95, spread: 0.1 },
    { offset: 0.88, length: 0.52, segments: 4, curl: -0.14, droop: 0.07, depth: 0.35, spread: 0.2 },
  ],
  olive: [
    { offset: 0.02, length: 1.15, segments: 10, curl: 0.1, droop: 0.035, depth: 0.18, spread: 0 },
    { offset: -0.36, length: 0.92, segments: 8, curl: -0.07, droop: 0.04, depth: 0.6, spread: -0.1 },
    { offset: 0.4, length: 0.86, segments: 8, curl: 0.14, droop: 0.03, depth: 1, spread: 0.12 },
  ],
  palm: [
    { offset: 0.04, length: 1.28, segments: 14, curl: 0.02, droop: 0.05, depth: 0.14, spread: 0 },
    { offset: -0.5, length: 1.05, segments: 12, curl: -0.02, droop: 0.06, depth: 0.6, spread: -0.08 },
    { offset: 0.56, length: 1.0, segments: 12, curl: 0.03, droop: 0.065, depth: 0.95, spread: 0.1 },
  ],
  fern: [
    { offset: 0, length: 1.1, segments: 18, curl: 0.22, droop: 0.06, depth: 0.15, spread: 0 },
    { offset: -0.42, length: 0.88, segments: 15, curl: 0.12, droop: 0.07, depth: 0.55, spread: -0.1 },
    { offset: 0.45, length: 0.82, segments: 14, curl: 0.3, droop: 0.06, depth: 0.95, spread: 0.12 },
    { offset: 0.9, length: 0.62, segments: 11, curl: 0.18, droop: 0.08, depth: 0.4, spread: 0.2 },
  ],
};

const PLACEMENT_CONFIG: Record<PlacementType, { x: number; y: number; angle: number }> = {
  "top-right": { x: 1, y: 1, angle: -2.42 },
  "top-left": { x: -1, y: 1, angle: -0.72 },
  right: { x: 1, y: 0.18, angle: Math.PI - 0.18 },
  left: { x: -1, y: 0.18, angle: 0.18 },
  "bottom-right": { x: 1, y: -1, angle: 2.42 },
  "bottom-left": { x: -1, y: -1, angle: 0.72 },
};

const QUAD_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const LEAF_VERT = `
attribute vec4 iLeaf;
attribute vec4 iShape;
uniform vec2 uHalf;
varying vec2 vLocal;
varying vec4 vShape;
varying float vLength;
void main() {
  float r = iLeaf.w * 0.5;
  float halfWidth = r * iShape.x;
  vec2 extent = vec2(r, halfWidth) + iShape.y * 2.4 + 0.003;
  vec2 local = position.xy * extent;
  float c = cos(iLeaf.z);
  float s = sin(iLeaf.z);
  vec2 world = iLeaf.xy + vec2(c * local.x - s * local.y, s * local.x + c * local.y);
  gl_Position = vec4(world / uHalf, 0.0, 1.0);
  vLocal = local;
  vShape = iShape;
  vLength = iLeaf.w;
}
`;

const LEAF_FRAG = `
varying vec2 vLocal;
varying vec4 vShape;
varying float vLength;

float sdLeaf(vec2 p, float len, float ratio) {
  float r = len * 0.5;
  float w = max(r * ratio, 1e-4);
  float R = (r * r + w * w) / (2.0 * w);
  float d = R - w;
  vec2 q = abs(p);
  return max(length(vec2(q.x, q.y + d)) - R, q.x - r);
}

void main() {
  float sd = sdLeaf(vLocal, vLength, vShape.x);
  float occ = 1.0 - smoothstep(-vShape.y, vShape.y, sd);
  gl_FragColor = vec4(occ * vShape.z);
}
`;

const STEM_VERT = `
attribute vec4 iStem;
attribute vec4 iStemShape;
uniform vec2 uHalf;
varying vec2 vWorld;
varying vec4 vSegment;
varying vec4 vShape;
void main() {
  vec2 a = iStem.xy;
  vec2 b = iStem.zw;
  vec2 axis = b - a;
  float len = max(length(axis), 1e-5);
  vec2 dir = axis / len;
  vec2 perp = vec2(-dir.y, dir.x);
  float pad = iStemShape.x + iStemShape.y * 2.4 + 0.003;
  vec2 center = (a + b) * 0.5;
  vec2 world = center + dir * position.x * (len * 0.5 + pad) + perp * position.y * pad;
  gl_Position = vec4(world / uHalf, 0.0, 1.0);
  vWorld = world;
  vSegment = iStem;
  vShape = iStemShape;
}
`;

const STEM_FRAG = `
varying vec2 vWorld;
varying vec4 vSegment;
varying vec4 vShape;
void main() {
  vec2 pa = vWorld - vSegment.xy;
  vec2 ba = vSegment.zw - vSegment.xy;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
  float sd = length(pa - ba * h) - vShape.x;
  float occ = 1.0 - smoothstep(-vShape.y, vShape.y, sd);
  gl_FragColor = vec4(occ * vShape.z);
}
`;

const WINDOW_CHUNK = `
uniform vec2 uHalf;
uniform vec4 uWindow;
uniform float uWindowAngle;
uniform float uWindowOn;

float windowMask(vec2 p, out float falloff) {
  falloff = 1.0;
  if (uWindowOn < 0.5) return 1.0;
  vec2 d = p - uWindow.xy;
  if (uWindowOn > 1.5) {
    vec2 e = d / vec2(uWindow.z * 1.35, uWindow.z);
    float r = length(e);
    falloff = mix(0.55, 1.0, 1.0 - smoothstep(0.0, 1.0, r));
    return 1.0 - smoothstep(0.35, 1.0, r);
  }
  float c = cos(uWindowAngle);
  float s = sin(uWindowAngle);
  vec2 r = vec2(c * d.x + s * d.y, -s * d.x + c * d.y);
  float size = uWindow.z;
  float soft = uWindow.w;
  float halfLen = size * 1.3;
  float persp = 1.0 + 0.3 * clamp(r.x / halfLen, -1.0, 1.0);
  float y = r.y / persp;
  float halfW = size * 0.5;
  float across = smoothstep(-halfW - soft, -halfW + soft, y) * (1.0 - smoothstep(halfW - soft, halfW + soft, y));
  float along = smoothstep(-halfLen - soft * 2.0, -halfLen + soft * 2.0, r.x) * (1.0 - smoothstep(halfLen - soft * 2.0, halfLen + soft * 2.0, r.x));
  float bar = size * 0.016;
  float mullion = 1.0 - (1.0 - smoothstep(bar, bar + soft * 0.8, abs(y))) * 0.94;
  float transom = 1.0 - (1.0 - smoothstep(bar, bar + soft * 0.8, abs(r.x + halfLen * 0.28))) * 0.9;
  falloff = mix(0.5, 1.0, 1.0 - smoothstep(-halfLen, halfLen, r.x)) * mix(0.8, 1.0, 1.0 - smoothstep(0.0, halfW, abs(y)));
  return across * along * mullion * transom;
}
`;

const EMISSION_FRAG = `
uniform sampler2D uMask;
uniform vec3 uLightColor;
uniform vec3 uShadowColor;
uniform float uSun;
uniform float uIntensity;
varying vec2 vUv;
${WINDOW_CHUNK}
void main() {
  vec2 p = (vUv * 2.0 - 1.0) * uHalf;
  float shade = texture2D(uMask, vUv).r;
  float falloff;
  float win = windowMask(p, falloff);
  vec3 light = uLightColor * (1.0 - shade) + uShadowColor * shade * 0.08;
  vec3 emission = light * win * falloff * uSun * uIntensity;
  gl_FragColor = vec4(emission, 1.0);
}
`;

const DOWNSAMPLE_FRAG = `
uniform sampler2D uSource;
uniform vec2 uTexel;
varying vec2 vUv;
vec3 tap(vec2 d) { return texture2D(uSource, vUv + d * uTexel).rgb; }
void main() {
  vec3 a = tap(vec2(-2.0, 2.0));
  vec3 b = tap(vec2(0.0, 2.0));
  vec3 c = tap(vec2(2.0, 2.0));
  vec3 d = tap(vec2(-2.0, 0.0));
  vec3 e = tap(vec2(0.0, 0.0));
  vec3 f = tap(vec2(2.0, 0.0));
  vec3 g = tap(vec2(-2.0, -2.0));
  vec3 h = tap(vec2(0.0, -2.0));
  vec3 i = tap(vec2(2.0, -2.0));
  vec3 j = tap(vec2(-1.0, 1.0));
  vec3 k = tap(vec2(1.0, 1.0));
  vec3 l = tap(vec2(-1.0, -1.0));
  vec3 m = tap(vec2(1.0, -1.0));
  vec3 color = e * 0.125 + (a + c + g + i) * 0.03125 + (b + d + f + h) * 0.0625 + (j + k + l + m) * 0.125;
  gl_FragColor = vec4(color, 1.0);
}
`;

const UPSAMPLE_FRAG = `
uniform sampler2D uSource;
uniform vec2 uTexel;
varying vec2 vUv;
vec3 tap(vec2 d) { return texture2D(uSource, vUv + d * uTexel).rgb; }
void main() {
  vec3 color = tap(vec2(0.0)) * 4.0
    + (tap(vec2(-1.0, 0.0)) + tap(vec2(1.0, 0.0)) + tap(vec2(0.0, -1.0)) + tap(vec2(0.0, 1.0))) * 2.0
    + tap(vec2(-1.0, -1.0)) + tap(vec2(1.0, -1.0)) + tap(vec2(-1.0, 1.0)) + tap(vec2(1.0, 1.0));
  gl_FragColor = vec4(color / 16.0, 1.0);
}
`;

const COMBINE_FRAG = `
uniform sampler2D uEmission;
uniform sampler2D uBloom;
uniform vec3 uBackground;
uniform vec2 uResolution;
uniform float uBloomStrength;
uniform float uGrain;
uniform float uTime;
varying vec2 vUv;

vec3 neutral(vec3 color) {
  const float start = 0.76;
  const float desaturation = 0.15;
  float x = min(color.r, min(color.g, color.b));
  float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
  color -= offset;
  float peak = max(color.r, max(color.g, color.b));
  if (peak < start) return color;
  const float d = 1.0 - start;
  float next = 1.0 - d * d / (peak + d - start);
  color *= next / peak;
  float g = 1.0 - 1.0 / (desaturation * (peak - next) + 1.0);
  return mix(color, vec3(next), g);
}

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  vec2 c = vUv - 0.5;
  vec2 shift = c * 1.4 / uResolution.y;
  vec3 emission;
  emission.r = texture2D(uEmission, vUv + shift).r;
  emission.g = texture2D(uEmission, vUv).g;
  emission.b = texture2D(uEmission, vUv - shift).b;
  emission += texture2D(uBloom, vUv).rgb * uBloomStrength;
  vec3 light = neutral(max(emission, 0.0));
  light = pow(light, vec3(1.0 / 2.2));
  vec3 color = 1.0 - (1.0 - uBackground) * (1.0 - light);
  float l = max(light.r, max(light.g, light.b));
  float mask = smoothstep(0.0, 0.04, l);
  float n = hash(gl_FragCoord.xy + fract(uTime * 17.0) * 911.0) - 0.5;
  color += n * uGrain * 0.1 * mask;
  color += (hash(gl_FragCoord.xy * 1.7) - 0.5) / 255.0 * mask;
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

interface LeafData {
  at: number;
  side: number;
  length: number;
  width: number;
  tilt: number;
  droop: number;
  flutter: number;
  rate: number;
  kind: number;
}

interface SimulatedBranch {
  base: [number, number];
  angle: number;
  length: number;
  segments: number;
  curl: number;
  droop: number;
  depth: number;
  phase: number;
  thickness: number;
  leaves: LeafData[];
  bend: number;
  velocity: number;
  kick: number;
  kickAt: number;
}

export const DappledLight = forwardRef<DappledLightRef, DappledLightProps>(
  function DappledLight(
    {
      plant = "ficus",
      placement = "top-right",
      scale = 1,
      density = 1,
      depth = 0.7,
      softness = 1,
      shadowStrength = 1,
      lightColor = "#818CF8",
      shadowColor = "#1E2235",
      backgroundColor = "#07080B",
      window: windowMode = "auto",
      windowAngle = 28,
      windowSize = 0.52,
      intensity = 0.95,
      bloom = 0.6,
      wind = 0.6,
      windSpeed = 1,
      clouds = 0.25,
      breeze = true,
      grain = 0.25,
      seed = 1,
      intro = true,
      paused = false,
      dpr = 2,
      children,
      className,
      style,
    },
    ref
  ) {
    const rootRef = useRef<HTMLDivElement>(null);
    const canvasWrapRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<{
      sync: () => void;
      gust: (strength?: number) => void;
      replay: () => void;
      destroy: () => void;
    } | null>(null);

    const isReduced = useSyncExternalStore(
      subscribeReducedMotion,
      getReducedMotionSnapshot,
      () => false
    );

    const settingsRef = useRef({
      plant,
      placement,
      scale,
      density,
      depth,
      softness,
      shadowStrength,
      lightColor,
      shadowColor,
      backgroundColor,
      window: windowMode,
      windowAngle,
      windowSize,
      intensity,
      bloom,
      wind,
      windSpeed,
      clouds,
      breeze,
      grain,
      seed,
      intro,
      paused,
      dpr,
      reduced: isReduced,
    });

    useEffect(() => {
      settingsRef.current = {
        plant,
        placement,
        scale,
        density,
        depth,
        softness,
        shadowStrength,
        lightColor,
        shadowColor,
        backgroundColor,
        window: windowMode,
        windowAngle,
        windowSize,
        intensity,
        bloom,
        wind,
        windSpeed,
        clouds,
        breeze,
        grain,
        seed,
        intro,
        paused,
        dpr,
        reduced: isReduced,
      };
      engineRef.current?.sync();
    });

    useEffect(() => {
      const container = rootRef.current;
      const wrap = canvasWrapRef.current;
      if (!container || !wrap) return;

      const doc = container.ownerDocument;
      const win = doc.defaultView || (typeof window !== "undefined" ? window : ({} as Window));
      const canvas = doc.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      canvas.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;";

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: false,
          antialias: false,
          powerPreference: "high-performance",
        });
      } catch {
        return;
      }

      wrap.appendChild(canvas);
      renderer.autoClear = false;

      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
      const quadGeo = new THREE.PlaneGeometry(2, 2);
      const quadScene = new THREE.Scene();
      const quadMesh = new THREE.Mesh(quadGeo);
      quadMesh.frustumCulled = false;
      quadScene.add(quadMesh);

      const uHalf = new THREE.Vector2(1, 0.5);

      const leafGeo = new THREE.InstancedBufferGeometry();
      leafGeo.index = quadGeo.index;
      leafGeo.setAttribute("position", quadGeo.getAttribute("position"));
      const leafDataArray = new Float32Array(768);
      const leafShapeArray = new Float32Array(768);
      const leafAttr = new THREE.InstancedBufferAttribute(leafDataArray, 4);
      const shapeAttr = new THREE.InstancedBufferAttribute(leafShapeArray, 4);
      leafAttr.setUsage(THREE.DynamicDrawUsage);
      shapeAttr.setUsage(THREE.DynamicDrawUsage);
      leafGeo.setAttribute("iLeaf", leafAttr);
      leafGeo.setAttribute("iShape", shapeAttr);
      leafGeo.instanceCount = 0;

      const stemGeo = new THREE.InstancedBufferGeometry();
      stemGeo.index = quadGeo.index;
      stemGeo.setAttribute("position", quadGeo.getAttribute("position"));
      const stemDataArray = new Float32Array(384);
      const stemShapeArray = new Float32Array(384);
      const stemAttr = new THREE.InstancedBufferAttribute(stemDataArray, 4);
      const stemShapeAttr = new THREE.InstancedBufferAttribute(stemShapeArray, 4);
      stemAttr.setUsage(THREE.DynamicDrawUsage);
      stemShapeAttr.setUsage(THREE.DynamicDrawUsage);
      stemGeo.setAttribute("iStem", stemAttr);
      stemGeo.setAttribute("iStemShape", stemShapeAttr);
      stemGeo.instanceCount = 0;

      const blendOpts: Partial<THREE.ShaderMaterialParameters> = {
        transparent: true,
        blending: THREE.CustomBlending,
        blendEquation: THREE.AddEquation,
        blendSrc: THREE.OneFactor,
        blendDst: THREE.OneFactor,
        depthTest: false,
        depthWrite: false,
      };

      const leafMat = new THREE.ShaderMaterial({
        uniforms: { uHalf: { value: uHalf } },
        vertexShader: LEAF_VERT,
        fragmentShader: LEAF_FRAG,
        ...blendOpts,
      });

      const stemMat = new THREE.ShaderMaterial({
        uniforms: { uHalf: { value: uHalf } },
        vertexShader: STEM_VERT,
        fragmentShader: STEM_FRAG,
        ...blendOpts,
      });

      const plantScene = new THREE.Scene();
      const leafMesh = new THREE.Mesh(leafGeo, leafMat);
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      leafMesh.frustumCulled = false;
      stemMesh.frustumCulled = false;
      plantScene.add(stemMesh);
      plantScene.add(leafMesh);

      const windowUniforms = {
        uHalf: { value: uHalf },
        uWindow: { value: new THREE.Vector4(0, 0, 0.6, 0.03) },
        uWindowAngle: { value: 0 },
        uWindowOn: { value: 0 },
      };

      const bgColor = new THREE.Color(0.03, 0.03, 0.04);
      const lightCol = new THREE.Color(0.5, 0.55, 1.0);
      const shadowCol = new THREE.Color(0.12, 0.13, 0.2);

      const createTarget = (hdr: boolean) =>
        new THREE.WebGLRenderTarget(1, 1, {
          type: hdr ? THREE.HalfFloatType : THREE.UnsignedByteType,
          format: THREE.RGBAFormat,
          depthBuffer: false,
          stencilBuffer: false,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          generateMipmaps: false,
        });

      const maskTarget = createTarget(false);
      const emissionTarget = createTarget(true);
      const blurPyramid = Array.from({ length: 5 }, () => createTarget(true));

      const emissionMat = new THREE.ShaderMaterial({
        uniforms: {
          ...windowUniforms,
          uMask: { value: maskTarget.texture },
          uLightColor: { value: lightCol },
          uShadowColor: { value: shadowCol },
          uSun: { value: 1 },
          uIntensity: { value: 1 },
        },
        vertexShader: QUAD_VERT,
        fragmentShader: EMISSION_FRAG,
        depthTest: false,
        depthWrite: false,
      });

      const downsampleMat = new THREE.ShaderMaterial({
        uniforms: {
          uSource: { value: null },
          uTexel: { value: new THREE.Vector2() },
        },
        vertexShader: QUAD_VERT,
        fragmentShader: DOWNSAMPLE_FRAG,
        depthTest: false,
        depthWrite: false,
      });

      const upsampleMat = new THREE.ShaderMaterial({
        uniforms: {
          uSource: { value: null },
          uTexel: { value: new THREE.Vector2() },
        },
        vertexShader: QUAD_VERT,
        fragmentShader: UPSAMPLE_FRAG,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });

      const combineMat = new THREE.ShaderMaterial({
        uniforms: {
          uEmission: { value: emissionTarget.texture },
          uBloom: { value: blurPyramid[0].texture },
          uBackground: { value: bgColor },
          uResolution: { value: new THREE.Vector2(1, 1) },
          uBloomStrength: { value: 0.5 },
          uGrain: { value: 0 },
          uTime: { value: 0 },
        },
        vertexShader: QUAD_VERT,
        fragmentShader: COMBINE_FRAG,
        depthTest: false,
        depthWrite: false,
      });

      let curW = 0;
      let curH = 0;
      let curDpr = 1;
      let isReady = false;
      let branches: SimulatedBranch[] = [];
      let plantSignature = "";
      const plantCenter = { x: 0, y: 0 };
      let lastColorCheck = -10;
      let simTime = 0;
      let windAccum = 0;
      let kickEnergy = 0;
      const pointerVel = { x: 0, y: 0 };
      let lastPointer: { x: number; y: number; t: number } | null = null;
      let introStart = -1;
      let introDone = false;
      let rafId = 0;
      let lastFrameTime = 0;
      let isIntersecting = false;
      let isContextLost = false;

      const nowSec = () => performance.now() / 1000;

      const updateSize = () => {
        const s = settingsRef.current;
        const w = Math.round(container.clientWidth);
        const h = Math.round(container.clientHeight);
        if (w < 2 || h < 2) {
          isReady = false;
          return false;
        }
        const dprVal = Math.min(win.devicePixelRatio || 1, Math.max(s.dpr, 0.5));
        if (isReady && w === curW && h === curH && dprVal === curDpr) return false;

        isReady = true;
        curW = w;
        curH = h;
        curDpr = dprVal;

        renderer.setPixelRatio(curDpr);
        renderer.setSize(curW, curH, false);
        maskTarget.setSize(curW, curH);
        emissionTarget.setSize(curW, curH);

        let bw = curW;
        let bh = curH;
        for (const target of blurPyramid) {
          bw = Math.max(1, Math.round(bw / 2));
          bh = Math.max(1, Math.round(bh / 2));
          target.setSize(bw, bh);
        }

        uHalf.set(curW / curH / 2, 0.5);
        combineMat.uniforms.uResolution.value.set(curW, curH);
        plantSignature = "";
        return true;
      };

      const updateColors = () => {
        const s = settingsRef.current;
        const bgRgb = parseColor(s.backgroundColor) || [0.03, 0.03, 0.04];
        const lightRgb = parseColor(s.lightColor) || [0.5, 0.55, 1.0];
        const shadowRgb = parseColor(s.shadowColor) || [0.12, 0.13, 0.2];

        bgColor.setRGB(bgRgb[0], bgRgb[1], bgRgb[2]);
        lightCol.setRGB(
          srgbToLinear(lightRgb[0]),
          srgbToLinear(lightRgb[1]),
          srgbToLinear(lightRgb[2])
        );
        shadowCol.setRGB(
          srgbToLinear(shadowRgb[0]),
          srgbToLinear(shadowRgb[1]),
          srgbToLinear(shadowRgb[2])
        );
      };

      const getAspectScale = () => clamp(curW / curH / 1.5, 0.48, 1);

      const requestFrame = () => {
        if (isContextLost || !isIntersecting || rafId) return;
        rafId = requestAnimationFrame(animateLoop);
      };

      const triggerGust = (strength = 1) => {
        if (settingsRef.current.reduced) return;
        const s = clamp(strength, 0, 3);
        const t = nowSec();
        branches.forEach((b, idx) => {
          b.kick = Math.min(b.kick + s * (0.75 + 0.2 * Math.sin(2.3 * idx)), 2.2);
          b.kickAt = t + 0.05 + 0.09 * idx + 0.08 * b.depth;
        });
        kickEnergy = Math.min(kickEnergy + 0.6 * s, 1.5);
        requestFrame();
      };

      const buildPlantStructure = () => {
        const s = settingsRef.current;
        const aspect = curW / curH;
        const sig = [s.plant, s.placement, s.scale, s.density, s.seed, aspect.toFixed(3)].join(
          "|"
        );
        if (sig === plantSignature) return;
        plantSignature = sig;

        const plantType = s.plant;
        const place = PLACEMENT_CONFIG[s.placement] ?? PLACEMENT_CONFIG["top-right"];
        const sc = clamp(s.scale, 0.3, 2.5) * getAspectScale();
        const den = clamp(s.density, 0.2, 1.6);

        let randSeed =
          (Math.floor(
            Math.abs(7919 * Math.round(s.seed) + 131 * plantType.length + 17 * s.placement.length)
          ) %
            0x7ffffffe) +
          1;
        const nextRand = () => {
          randSeed = (16807 * randSeed) % 0x7fffffff;
          return (randSeed - 1) / 0x7ffffffe;
        };

        const uDir = place.x < 0 ? -1 : 1;
        const dDir = place.y < 0 ? -1 : 1;
        const leafThreshold = clamp(0.5 + 0.5 * den, 0.25, 1);
        const leafScale = 0.82 + 0.18 * clamp(den, 0.3, 1.6);
        const originX = place.x * (aspect / 2 + 0.05);
        const originY = Math.abs(place.y) === 1 ? 0.56 * place.y : place.y;

        branches = (PLANT_PRESETS[plantType] ?? PLANT_PRESETS.ficus).map((cfg, bIdx) => {
          const normalAngle = place.angle + Math.PI / 2;
          const spreadOffset = cfg.spread * sc;
          const branch: SimulatedBranch = {
            base: [
              originX + Math.cos(normalAngle) * spreadOffset * 0.6,
              originY +
                Math.sin(normalAngle) *
                  spreadOffset *
                  0.6 *
                  (Math.abs(place.y) < 1 ? 1 : 0.4),
            ],
            angle: place.angle + cfg.offset * uDir * dDir,
            length: cfg.length * sc * (0.92 + 0.16 * nextRand()),
            segments: cfg.segments,
            curl: cfg.curl * uDir * dDir,
            droop: cfg.droop,
            depth: cfg.depth,
            phase: nextRand() * TWO_PI + bIdx,
            thickness:
              plantType === "palm" ? 0.0036 : plantType === "fern" ? 0.0028 : 0.0042,
            leaves: [],
            bend: 0,
            velocity: 0,
            kick: 0,
            kickAt: 0,
          };

          const segCount = cfg.segments;
          for (let seg = 1; seg <= segCount; seg++) {
            const segRatio = seg / segCount;
            const sides = seg === segCount ? [0] : [-1, 1];
            for (const side of sides) {
              if (side !== 0 && nextRand() > leafThreshold) continue;

              if (plantType === "ficus") {
                if (side !== 0 && (seg + (side > 0 ? 1 : 0)) % 2 === 0 && nextRand() < 0.35)
                  continue;
                branch.leaves.push({
                  at: seg,
                  side,
                  length:
                    (0.13 + 0.08 * nextRand()) * sc * leafScale * (side === 0 ? 1.12 : 1),
                  width: 0.4 + 0.14 * nextRand(),
                  tilt: side === 0 ? 0 : 0.62 + 0.45 * nextRand(),
                  droop: 0.22,
                  flutter: nextRand() * TWO_PI,
                  rate: 1.1 + 1.1 * nextRand(),
                  kind: 0,
                });
              } else if (plantType === "olive") {
                branch.leaves.push({
                  at: seg,
                  side,
                  length: (0.095 + 0.05 * nextRand()) * sc * leafScale,
                  width: 0.15 + 0.06 * nextRand(),
                  tilt: side === 0 ? 0 : 0.42 + 0.32 * nextRand(),
                  droop: 0.12,
                  flutter: nextRand() * TWO_PI,
                  rate: 1.6 + 1.4 * nextRand(),
                  kind: 0,
                });
              } else if (plantType === "fern") {
                const sVal =
                  Math.pow(Math.sin(Math.PI * clamp(0.9 * segRatio + 0.08, 0, 1)), 0.85) *
                  (1 - 0.35 * segRatio);
                branch.leaves.push({
                  at: seg,
                  side,
                  length:
                    (0.03 + 0.11 * sVal) * sc * leafScale * (0.92 + 0.16 * nextRand()),
                  width: 0.3 + 0.08 * nextRand(),
                  tilt: side === 0 ? 0 : 1.05 + 0.12 * nextRand(),
                  droop: 0.18,
                  flutter: nextRand() * TWO_PI,
                  rate: 1.6 + 1.4 * nextRand(),
                  kind: 0,
                });
              } else {
                const sVal = Math.pow(
                  Math.sin(Math.PI * clamp(0.94 * segRatio + 0.04, 0, 1)),
                  0.7
                );
                branch.leaves.push({
                  at: seg,
                  side,
                  length: (0.06 + 0.2 * sVal) * sc * leafScale * (0.92 + 0.16 * nextRand()),
                  width: 0.11 + 0.04 * nextRand(),
                  tilt: side === 0 ? 0 : 0.92 + 0.18 * nextRand(),
                  droop: 0.38,
                  flutter: nextRand() * TWO_PI,
                  rate: 1.8 + 1.6 * nextRand(),
                  kind: 0,
                });
              }
            }
          }
          return branch;
        });

        let totalLen = 0;
        plantCenter.x = 0;
        plantCenter.y = 0;
        for (const b of branches) {
          plantCenter.x += (b.base[0] + Math.cos(b.angle) * b.length * 0.55) * b.length;
          plantCenter.y += (b.base[1] + Math.sin(b.angle) * b.length * 0.55) * b.length;
          totalLen += b.length;
        }
        if (totalLen > 0) {
          plantCenter.x /= totalLen;
          plantCenter.y /= totalLen;
        }
      };

      const waveHarmonic = (tVal: number, ph: number) =>
        0.55 * Math.sin(0.71 * tVal + ph) +
        0.3 * Math.sin(1.37 * tVal + 2.1 * ph) +
        0.15 * Math.sin(2.93 * tVal + 0.7 * ph);

      function animateLoop(timestamp: number) {
        rafId = 0;
        if (isContextLost || (!isReady && (!updateSize() || !isReady))) return;

        const s = settingsRef.current;
        const dt =
          lastFrameTime && timestamp - lastFrameTime < 100
            ? Math.min(Math.max((timestamp - lastFrameTime) / 1000, 0), 0.05)
            : 1 / 60;
        lastFrameTime = timestamp;

        const now = nowSec();
        const reduced = s.reduced;

        updateSize();
        if (now - lastColorCheck > 1.2) {
          lastColorCheck = now;
          updateColors();
        }

        buildPlantStructure();

        const activeMotion = !s.paused && !reduced;
        if (activeMotion) {
          simTime += dt;
          windAccum +=
            dt *
            clamp(s.windSpeed, 0, 4) *
            (1 + 0.8 * Math.min(Math.hypot(pointerVel.x, pointerVel.y), 1.5) + kickEnergy);
        }

        const decay = Math.exp(-dt / 1.3);
        pointerVel.x *= decay;
        pointerVel.y *= decay;
        kickEnergy *= Math.exp(-dt / 1.6);
        if (kickEnergy < 0.001) kickEnergy = 0;

        if (introStart < 0) {
          introStart = now;
          introDone = reduced || !s.intro;
        }

        let introFactor = 1;
        if (!introDone) {
          introFactor = smoothstep((now - introStart) / 2.4);
          if (introFactor >= 1) introDone = true;
        }

        const cloudVal = reduced ? 0 : clamp(s.clouds, 0, 1);
        const cloudFactor =
          cloudVal > 0
            ? smoothstep(
                (Math.sin(0.037 * simTime + 1.3) * Math.sin(0.023 * simTime) - 0.25) / 0.45
              )
            : 0;
        const sunIntensity = introFactor * (1 - 0.6 * cloudVal * cloudFactor);

        // Physics step for branches and leaves
        const windPower = reduced ? 0 : clamp(s.wind, 0, 2);
        const softVal = clamp(s.softness, 0, 3);
        const depthVal = clamp(s.depth, 0, 1.5);
        const windGustMod =
          0.55 + 0.45 * Math.sin(0.21 * windAccum) * Math.sin(0.13 * windAccum + 1.1);

        let stemIndex = 0;
        let leafIndex = 0;

        for (const b of branches) {
          const normalX = -Math.sin(b.angle);
          const normalY = Math.cos(b.angle);
          const pointerForce = pointerVel.x * normalX + pointerVel.y * normalY;
          const targetBend =
            windPower * waveHarmonic(windAccum, b.phase) * windGustMod * 0.16 +
            0.3 * pointerForce;

          if (b.kick > 0 && now >= b.kickAt && !reduced) {
            b.velocity +=
              b.kick * (b.angle > -Math.PI / 2 && b.angle < Math.PI / 2 ? 1 : -1) * 0.55;
            b.kick = 0;
          }

          const freq = TWO_PI / (1.5 + 0.9 * b.depth + 0.4 * b.length);
          if (reduced) {
            b.bend = 0;
            b.velocity = 0;
          } else {
            const subSteps = Math.max(1, Math.ceil(120 * dt));
            const subDt = dt / subSteps;
            for (let i = 0; i < subSteps; i++) {
              b.velocity += (freq * freq * (targetBend - b.bend) - 0.6 * freq * b.velocity) * subDt;
              b.bend += b.velocity * subDt;
            }
          }

          const branchDepth = b.depth * depthVal;
          const blurRadius =
            (0.0016 + 0.028 * branchDepth * branchDepth + 0.004 * branchDepth) *
            (0.3 + 0.7 * softVal) *
            sunIntensity;
          const opacityScale = clamp(0.98 - 0.36 * branchDepth, 0.3, 1);
          const segDist = b.length / b.segments;

          let curX = b.base[0];
          let curY = b.base[1];
          let curAngle = b.angle;
          const spinePoints: [number, number, number][] = [[curX, curY, curAngle]];

          for (let seg = 1; seg <= b.segments; seg++) {
            const ratio = seg / b.segments;
            curAngle += (b.curl / b.segments) * 2;
            curAngle += wrapAngle(-Math.PI / 2 - curAngle) * b.droop * 0.5;
            curAngle +=
              b.bend * Math.pow(ratio, 1.4) * 0.9 +
              (reduced ? 0 : 0.012 * windPower * Math.sin(3.1 * windAccum + seg + b.phase));

            const nxtX = curX + Math.cos(curAngle) * segDist;
            const nxtY = curY + Math.sin(curAngle) * segDist;

            if (stemIndex < 96) {
              stemDataArray.set([curX, curY, nxtX, nxtY], 4 * stemIndex);
              stemShapeArray.set(
                [
                  b.thickness *
                    (1.25 - 0.8 * ratio) *
                    clamp(s.scale, 0.3, 2.5) *
                    getAspectScale(),
                  blurRadius,
                  opacityScale,
                  0,
                ],
                4 * stemIndex
              );
              stemIndex++;
            }

            curX = nxtX;
            curY = nxtY;
            spinePoints.push([curX, curY, curAngle]);
          }

          for (const lf of b.leaves) {
            if (leafIndex >= 192) break;
            const parentSeg = spinePoints[Math.min(lf.at, spinePoints.length - 1)];
            const flutterAnim = reduced
              ? 0
              : Math.sin(windAccum * lf.rate + lf.flutter) * (0.05 + 0.22 * Math.abs(s.wind) * 6) * windPower;
            let leafAngle =
              parentSeg[2] +
              (lf.side === 0 ? lf.tilt + 0.6 * flutterAnim : lf.side * (lf.tilt + flutterAnim));
            leafAngle += wrapAngle(-Math.PI / 2 - leafAngle) * lf.droop * 0.35;

            const leafReach = 0.55 * lf.length;
            const leafPosX = parentSeg[0] + Math.cos(leafAngle) * leafReach;
            const leafPosY = parentSeg[1] + Math.sin(leafAngle) * leafReach;

            leafDataArray.set([leafPosX, leafPosY, leafAngle, lf.length], 4 * leafIndex);
            leafShapeArray.set([lf.width, blurRadius, opacityScale, lf.kind], 4 * leafIndex);
            leafIndex++;
          }
        }

        leafGeo.instanceCount = leafIndex;
        stemGeo.instanceCount = stemIndex;
        leafAttr.needsUpdate = true;
        shapeAttr.needsUpdate = true;
        stemAttr.needsUpdate = true;
        stemShapeAttr.needsUpdate = true;

        // Window configuration
        const windowEnabled = s.window === "on" || s.window === "auto";
        windowUniforms.uWindowOn.value = windowEnabled ? 1 : 0;
        const place = PLACEMENT_CONFIG[s.placement] ?? PLACEMENT_CONFIG["top-right"];
        const winSizeVal =
          clamp(s.windowSize, 0.2, 2) * getAspectScale() * (windowEnabled ? 1 : 1.25);
        const winBoundX = (curW / curH) * 0.5 - 0.35 * winSizeVal;

        windowUniforms.uWindow.value.set(
          clamp(0.68 * plantCenter.x, -Math.max(winBoundX, 0), Math.max(winBoundX, 0)),
          clamp(0.62 * plantCenter.y, -0.32, 0.32),
          winSizeVal,
          (0.018 + 0.03 * clamp(s.softness, 0, 3)) * (1 + 0.8 * cloudVal * cloudFactor)
        );
        windowUniforms.uWindowAngle.value =
          ((clamp(s.windowAngle, -90, 90) * Math.PI) / 180) *
          place.x *
          (place.y < 0 ? -1 : 1);

        // Render pass 1: Shadow mask
        renderer.setRenderTarget(maskTarget);
        renderer.setClearColor(0, 0);
        renderer.clear();
        renderer.render(plantScene, camera);

        // Render pass 2: Emission
        emissionMat.uniforms.uSun.value = sunIntensity;
        emissionMat.uniforms.uIntensity.value = clamp(s.intensity, 0, 4);
        quadMesh.material = emissionMat;
        renderer.setRenderTarget(emissionTarget);
        renderer.render(quadScene, camera);

        // Render pass 3: Bloom blur pyramid
        const bloomVal = clamp(s.bloom, 0, 2);
        if (bloomVal > 0) {
          quadMesh.material = downsampleMat;
          let sourceTarget = emissionTarget;
          for (const target of blurPyramid) {
            downsampleMat.uniforms.uSource.value = sourceTarget.texture;
            downsampleMat.uniforms.uTexel.value.set(
              1 / sourceTarget.width,
              1 / sourceTarget.height
            );
            renderer.setRenderTarget(target);
            renderer.render(quadScene, camera);
            sourceTarget = target;
          }

          quadMesh.material = upsampleMat;
          for (let i = blurPyramid.length - 1; i > 0; i--) {
            upsampleMat.uniforms.uSource.value = blurPyramid[i].texture;
            upsampleMat.uniforms.uTexel.value.set(
              1 / blurPyramid[i].width,
              1 / blurPyramid[i].height
            );
            renderer.setRenderTarget(blurPyramid[i - 1]);
            renderer.render(quadScene, camera);
          }
        }

        // Render pass 4: Combine to screen
        combineMat.uniforms.uBloomStrength.value = 0.6 * bloomVal;
        combineMat.uniforms.uGrain.value = clamp(s.grain, 0, 1);
        combineMat.uniforms.uTime.value = simTime;
        quadMesh.material = combineMat;
        renderer.setRenderTarget(null);
        renderer.render(quadScene, camera);

        const hasActiveMotion =
          Math.abs(pointerVel.x) + Math.abs(pointerVel.y) > 0.001 ||
          kickEnergy > 0 ||
          branches.some(
            (b) => Math.abs(b.velocity) > 1e-4 || Math.abs(b.bend) > 1e-4 || b.kick > 0
          );

        if (activeMotion || !introDone || hasActiveMotion) {
          requestFrame();
        }
      }

      // Pointer event listeners for cursor breeze
      const handlePointerMove = (e: PointerEvent) => {
        if (!settingsRef.current.breeze || settingsRef.current.reduced) return;
        const rect = container.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        const t = performance.now();

        if (lastPointer) {
          const dt = Math.max((t - lastPointer.t) / 1000, 1 / 240);
          const invH = 1 / Math.max(curH, 1);
          const vx = ((px - lastPointer.x) * invH) / dt;
          const vy = -(((py - lastPointer.y) * invH) / dt);
          const blend = 0.35 * clamp(dt / 0.12, 0, 1);
          pointerVel.x += (clamp(vx, -4, 4) - pointerVel.x) * blend;
          pointerVel.y += (clamp(vy, -4, 4) - pointerVel.y) * blend;
          const mag = Math.hypot(pointerVel.x, pointerVel.y);
          if (mag > 2) {
            pointerVel.x *= 2 / mag;
            pointerVel.y *= 2 / mag;
          }
        }

        lastPointer = { x: px, y: py, t };
        requestFrame();
      };

      const handlePointerLeave = () => {
        lastPointer = null;
      };

      const handlePointerDown = (e: PointerEvent) => {
        if (!settingsRef.current.breeze || !e.isPrimary || e.button > 0) return;
        const target = e.target;
        if (
          target instanceof Element &&
          target.closest("a, button, input, textarea, select, label, [role=button]")
        ) {
          return;
        }
        triggerGust(0.9);
      };

      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerleave", handlePointerLeave);
      container.addEventListener("pointerdown", handlePointerDown);

      const resizeObserver = new ResizeObserver(() => {
        if (updateSize()) requestFrame();
      });
      resizeObserver.observe(container);

      const intersectionObserver =
        typeof IntersectionObserver === "undefined"
          ? null
          : new IntersectionObserver(
              ([entry]) => {
                isIntersecting = entry.isIntersecting;
                if (isIntersecting) {
                  lastFrameTime = 0;
                  requestFrame();
                } else if (rafId) {
                  cancelAnimationFrame(rafId);
                  rafId = 0;
                }
              },
              { rootMargin: "80px" }
            );

      if (intersectionObserver) {
        intersectionObserver.observe(container);
      } else {
        isIntersecting = true;
      }

      const onContextLost = (e: Event) => {
        e.preventDefault();
        isContextLost = true;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      };

      const onContextRestored = () => {
        isContextLost = false;
        plantSignature = "";
        requestFrame();
      };

      canvas.addEventListener("webglcontextlost", onContextLost);
      canvas.addEventListener("webglcontextrestored", onContextRestored);

      updateSize();
      updateColors();
      requestFrame();

      engineRef.current = {
        sync: () => {
          updateSize();
          updateColors();
          requestFrame();
        },
        gust: triggerGust,
        replay: () => {
          introStart = -1;
          introDone = false;
          requestFrame();
        },
        destroy: () => {
          if (rafId) cancelAnimationFrame(rafId);
          intersectionObserver?.disconnect();
          resizeObserver.disconnect();
          container.removeEventListener("pointermove", handlePointerMove);
          container.removeEventListener("pointerleave", handlePointerLeave);
          container.removeEventListener("pointerdown", handlePointerDown);
          canvas.removeEventListener("webglcontextlost", onContextLost);
          canvas.removeEventListener("webglcontextrestored", onContextRestored);

          maskTarget.dispose();
          emissionTarget.dispose();
          blurPyramid.forEach((t) => t.dispose());
          leafMat.dispose();
          stemMat.dispose();
          emissionMat.dispose();
          downsampleMat.dispose();
          upsampleMat.dispose();
          combineMat.dispose();
          leafGeo.dispose();
          stemGeo.dispose();
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
        gust: (str?: number) => engineRef.current?.gust(str),
        replay: () => engineRef.current?.replay(),
      }),
      []
    );

    return (
      <div
        ref={rootRef}
        className={`relative isolate h-full min-h-[320px] w-full overflow-hidden ${
          className || ""
        }`}
        style={{
          backgroundColor: backgroundColor || "#07080B",
          ...style,
        }}
      >
        <div
          ref={canvasWrapRef}
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none"
        />
        {children && <div className="relative z-10 h-full">{children}</div>}
      </div>
    );
  }
);
