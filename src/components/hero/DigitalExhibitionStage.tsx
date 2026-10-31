"use client";

import React, { useRef, useEffect, useState } from "react";
import halftoneData from "@/data/halftoneDots.json";

export interface DigitalExhibitionStageProps {
  desktopAnchorRef: React.RefObject<HTMLDivElement>;
  mobileAnchorRef: React.RefObject<HTMLDivElement>;
  headlineAnchorRef: React.RefObject<HTMLDivElement>;
  line1Ref: React.RefObject<HTMLElement>;
  line2Ref: React.RefObject<HTMLElement>;
  headlineStage: "curiosity" | "engineered";
  onHeadlineStageChange: (stage: "curiosity" | "engineered") => void;
  triggerTransformSignal?: number;
}

interface PortraitDot {
  x0: number; // Base anchor X [0..480]
  y0: number; // Base anchor Y [0..513]
  x: number;  // Current world X on canvas
  y: number;  // Current world Y on canvas
  vx: number;
  vy: number;
  r0: number; // Base radius
  r: number;
  l: number;  // Luminance [0..1]
  color: string;
  luminousColor: string;
  featureWeight: number;
  dissolveAngle: number;
  dissolveSpeed: number;
  initialOffsetX: number;
  initialOffsetY: number;
}

interface TextParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  originX: number;
  originY: number;
  radius: number;
  color: string;
  alpha: number;
  active: boolean;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  radius: number;
}

interface Comet {
  active: boolean;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  startX: number;
  startY: number;
  progress: number;
  speed: number;
  trail: Array<{ x: number; y: number; alpha: number }>;
}

interface Shockwave {
  active: boolean;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export function DigitalExhibitionStage({
  desktopAnchorRef,
  mobileAnchorRef,
  headlineAnchorRef,
  line1Ref,
  line2Ref,
  headlineStage,
  onHeadlineStageChange,
  triggerTransformSignal = 0,
}: DigitalExhibitionStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);

  // References for mutable animation state across requestAnimationFrame
  const animStateRef = useRef<{
    currentStage: "curiosity" | "engineered";
    transforming: boolean;
    transformStartTime: number;
    impactTriggered: boolean;
    reconstructedTriggered: boolean;
    targetStage: "curiosity" | "engineered";
  }>({
    currentStage: headlineStage,
    transforming: false,
    transformStartTime: 0,
    impactTriggered: false,
    reconstructedTriggered: false,
    targetStage: headlineStage === "curiosity" ? "engineered" : "curiosity",
  });

  // Keep stage synced
  useEffect(() => {
    animStateRef.current.currentStage = headlineStage;
    animStateRef.current.targetStage = headlineStage === "curiosity" ? "engineered" : "curiosity";
  }, [headlineStage]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to manually or automatically initiate the transformation
  const initiateTransformRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (triggerTransformSignal > 0) {
      initiateTransformRef.current();
    }
  }, [triggerTransformSignal]);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Canvas sizing to cover the full hero section
    let canvasWidth = (canvas.width = window.innerWidth);
    let canvasHeight = (canvas.height = window.innerHeight * 1.25);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? Math.max(parent.clientHeight, window.innerHeight * 1.2) : window.innerHeight * 1.2;
      canvasWidth = width;
      canvasHeight = height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 1. Initialize Portrait Halftone Dots from JSON dataset
    const baseWidth = halftoneData.width;   // 480
    const baseHeight = halftoneData.height; // 513
    const rawDots = halftoneData.dots as Array<[number, number, number, number]>;

    const portraitDots: PortraitDot[] = rawDots.map(([x0, y0, r0, l], i) => {
      let color = "rgba(245, 245, 247, 0.95)";
      let luminousColor = "rgba(255, 255, 255, 1.0)";

      if (l > 0.8) {
        color = "rgba(255, 255, 255, 0.98)";
        luminousColor = "rgba(255, 255, 255, 1.0)";
      } else if (l > 0.55) {
        color = "rgba(226, 232, 240, 0.90)";
        luminousColor = "rgba(245, 240, 255, 1.0)";
      } else if (l > 0.35) {
        color = "rgba(180, 190, 205, 0.78)";
        luminousColor = "rgba(220, 215, 245, 0.95)";
      } else if (l > 0.18) {
        color = "rgba(120, 130, 150, 0.65)";
        luminousColor = "rgba(180, 175, 220, 0.85)";
      } else {
        color = "rgba(70, 78, 95, 0.50)";
        luminousColor = "rgba(130, 125, 170, 0.70)";
      }

      // Facial feature weighting (protects eyes, nose bridge, lips)
      const isCoreFeature = x0 > 175 && x0 < 305 && y0 > 185 && y0 < 415;
      const featureWeight = isCoreFeature ? 0.65 : 1.0;

      // Deterministic angle & speed for smooth scroll-driven dissolve
      const dx = x0 - baseWidth * 0.5;
      const dy = y0 - baseHeight * 0.45;
      const angle = Math.atan2(dy, dx) + Math.sin(i * 1.7) * 0.45;
      const speed = 80 + (i % 41) * 5.2;

      // Deterministic initial scatter for organic cubic reveal from darkness
      const initialDist = 55 + (i % 27) * 3.5;
      const initialAngle = (i * 0.42) % (Math.PI * 2);
      const initialOffsetX = Math.cos(initialAngle) * initialDist;
      const initialOffsetY = Math.sin(initialAngle) * initialDist;

      return {
        x0,
        y0,
        x: x0,
        y: y0,
        vx: 0,
        vy: 0,
        r0,
        r: 0,
        l,
        color,
        luminousColor,
        featureWeight,
        dissolveAngle: angle,
        dissolveSpeed: speed,
        initialOffsetX,
        initialOffsetY,
      };
    });

    // 2. Physical Typography State & Particles
    let textParticles: TextParticle[] = [];
    const sparks: Spark[] = [];
    let portraitSparkImpulse = 0;

    const comet: Comet = {
      active: false,
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      startX: 0,
      startY: 0,
      progress: 0,
      speed: 0.024,
      trail: [],
    };

    const shockwave: Shockwave = {
      active: false,
      x: 0,
      y: 0,
      radius: 0,
      maxRadius: 160,
      alpha: 0,
    };

    // Helper to sample text into particle coordinates from DOM fonts
    const sampleTextToCoordinates = (
      text: string,
      fontSpec: string,
      targetRect: DOMRect,
      canvasRect: DOMRect,
      step: number = 3
    ): Array<{ x: number; y: number }> => {
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return [];

      const pad = 24;
      const w = Math.ceil(targetRect.width) + pad * 2;
      const h = Math.ceil(targetRect.height) + pad * 2;
      offscreen.width = w;
      offscreen.height = h;

      offCtx.font = fontSpec;
      offCtx.fillStyle = "#FFFFFF";
      offCtx.textBaseline = "middle";
      offCtx.fillText(text, pad, h / 2);

      const imgData = offCtx.getImageData(0, 0, w, h);
      const pixels = imgData.data;
      const coords: Array<{ x: number; y: number }> = [];

      const offsetX = targetRect.left - canvasRect.left - pad;
      const offsetY = targetRect.top - canvasRect.top - pad;

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const idx = (y * w + x) * 4;
          if (pixels[idx + 3] > 110) {
            coords.push({
              x: offsetX + x,
              y: offsetY + y,
            });
          }
        }
      }

      return coords;
    };

    // Prepare typography particles for transformation
    const initiateTransformation = () => {
      if (animStateRef.current.transforming || prefersReducedMotion) return;

      const line2El = line2Ref.current;
      if (!line2El || !canvas) return;

      const line2Rect = line2El.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();

      // Compute impact point on the target word
      const impactX = line2Rect.left - canvasRect.left + line2Rect.width * 0.62;
      const impactY = line2Rect.top - canvasRect.top + line2Rect.height * 0.52;

      // Launch Luminous Comet from above
      comet.active = true;
      comet.startX = impactX + (Math.random() - 0.5) * 50;
      comet.startY = -50;
      comet.targetX = impactX;
      comet.targetY = impactY;
      comet.progress = 0;
      comet.trail = [];

      animStateRef.current.transforming = true;
      animStateRef.current.transformStartTime = performance.now();
      animStateRef.current.impactTriggered = false;
      animStateRef.current.reconstructedTriggered = false;
    };

    initiateTransformRef.current = initiateTransformation;

    // Auto-trigger the signature physical typography transformation after 4.2s of reading
    const autoTriggerTimer = setTimeout(() => {
      initiateTransformation();
    }, 4200);

    // Mouse coordinates tracking in full hero canvas space
    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    // Scroll state tracking for unbounded particle dissolve
    let currentScrollY = window.scrollY;
    const handleScroll = () => {
      currentScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Animation loop timing
    const startTime = performance.now();
    let time = 0;
    let animationFrameId: number;

    // Scanning wave parameters (periodic, travels across actual face dots only)
    const scanPeriod = 12500; // 12.5s between scans
    const scanDuration = 2400; // 2.4s scan transit
    const scanBandWidth = 70; // 70px vertical band width

    const render = (now: number) => {
      const elapsed = now - startTime;
      time += 0.016;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Measure current portrait anchor position in canvas world coordinates
      const isMobile = window.innerWidth < 768;
      const anchorEl = (isMobile ? mobileAnchorRef.current : desktopAnchorRef.current) || desktopAnchorRef.current || mobileAnchorRef.current;
      const canvasRect = canvas.getBoundingClientRect();

      let anchorX = canvasWidth * 0.65;
      let anchorY = canvasHeight * 0.18;
      let anchorW = Math.min(540, canvasWidth * 0.42);
      let anchorH = anchorW * (baseHeight / baseWidth);

      if (anchorEl) {
        const anchorRect = anchorEl.getBoundingClientRect();
        anchorX = anchorRect.left - canvasRect.left;
        anchorY = anchorRect.top - canvasRect.top;
        anchorW = anchorRect.width;
        anchorH = anchorRect.width * (baseHeight / baseWidth);
      }

      const portraitScale = anchorW / baseWidth;

      // 1. Initial reconstruction reveal progress [0..1] over 1.3s
      const revealProgress = prefersReducedMotion
        ? 1.0
        : Math.min(1.0, Math.max(0.0, elapsed / 1300));
      const revealEase = 1 - Math.pow(1 - revealProgress, 3);

      // 2. Scroll-driven unbounded dissolve factor [0..1]
      // Begins after 70px scroll, fully dissolved by 540px
      const localScroll = Math.max(0, currentScrollY - 70) / 470;
      const dissolveFactor = prefersReducedMotion ? 0 : Math.min(1.0, Math.max(0.0, localScroll));
      const dissolveEase = Math.pow(dissolveFactor, 1.35);

      // 3. Periodic scanning wave (travels vertically through the actual dots)
      const cycleTime = elapsed % scanPeriod;
      const isScanning =
        !prefersReducedMotion &&
        cycleTime < scanDuration &&
        revealProgress >= 0.95 &&
        dissolveFactor < 0.35;
      const scanProgress = isScanning ? cycleTime / scanDuration : -1;
      // scanY in world canvas coordinates, traversing anchor top to anchor bottom
      const scanY = isScanning
        ? anchorY + scanProgress * (anchorH + scanBandWidth * 2) - scanBandWidth
        : -9999;

      // Damped decay of spark impulse on portrait
      if (portraitSparkImpulse > 0.005) {
        portraitSparkImpulse *= 0.94;
      } else {
        portraitSparkImpulse = 0;
      }

      // ----------------------------------------------------
      // SECTION A: RENDER PORTRAIT HALFTONE DOTS (UNBOUNDED)
      // ----------------------------------------------------
      const numDots = portraitDots.length;

      for (let i = 0; i < numDots; i++) {
        const p = portraitDots[i];

        // Compute baseline anchor position in world canvas coordinates
        const baseX = anchorX + p.x0 * portraitScale;
        const baseY = anchorY + p.y0 * portraitScale;

        if (prefersReducedMotion) {
          const currentRadius = p.r0 * portraitScale;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(baseX, baseY, currentRadius, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        let targetX = baseX;
        let targetY = baseY;

        // Initial organic convergence from soft scatter
        if (revealProgress < 1.0) {
          const scatterRemaining = 1.0 - revealEase;
          targetX = baseX + p.initialOffsetX * portraitScale * scatterRemaining * 1.5;
          targetY = baseY + p.initialOffsetY * portraitScale * scatterRemaining * 1.5;
        }

        // Magnetic cursor interaction (active only when near equilibrium and not heavily dissolved)
        if (mouse.active && !isMobile && revealProgress > 0.8 && dissolveFactor < 0.3) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const interactionRadius = 88;
          const interactionRadiusSq = interactionRadius * interactionRadius;

          if (distSq < interactionRadiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const q = dist / interactionRadius;
            const factor = Math.cos(q * Math.PI * 0.5);
            // Feature weight prevents excessive distortion on facial features
            const force = factor * factor * 12.0 * p.featureWeight;
            targetX += (dx / dist) * force;
            targetY += (dy / dist) * force;
          }
        } else if (revealProgress >= 1.0 && dissolveFactor < 0.2) {
          // Subtle idle ambient harmonic breath
          const ambient = Math.sin(time * 0.8 + (p.x0 + p.y0) * 0.012) * 0.3;
          targetX += ambient * 0.35;
          targetY += ambient * 0.25;
        }

        // Scroll-driven unbounded dissolution displacement
        // Notice: Dots can float across the entire canvas width and height without any box clipping!
        if (dissolveFactor > 0.001) {
          const driftDist = p.dissolveSpeed * portraitScale * dissolveEase * 3.2;
          const driftX = Math.cos(p.dissolveAngle) * driftDist;
          const driftY = Math.sin(p.dissolveAngle) * driftDist + dissolveEase * 80;
          targetX += driftX;
          targetY += driftY;
        }

        // Damped harmonic spring physics integration
        const springK = 0.11;
        const friction = 0.76;
        const ax = (targetX - p.x) * springK;
        const ay = (targetY - p.y) * springK;

        p.vx = (p.vx + ax) * friction;
        p.vy = (p.vy + ay) * friction;

        p.x += p.vx;
        p.y += p.vy;

        // Scanning wave illumination calculation (strictly through the dots, NO rectangular box)
        let isLitByScan = false;
        let scanBoost = 0;
        if (isScanning) {
          const distToScan = Math.abs(p.y - scanY);
          if (distToScan < scanBandWidth) {
            isLitByScan = true;
            const q = distToScan / scanBandWidth;
            scanBoost = Math.pow(Math.cos(q * Math.PI * 0.5), 2);
          }
        }

        // Spark impulse illumination response from physical typography shockwave
        let sparkBoost = 0;
        if (portraitSparkImpulse > 0.01) {
          const relX = p.x0 / baseWidth;
          if (relX < 0.45) {
            sparkBoost = (1 - relX / 0.45) * portraitSparkImpulse * 0.6;
          }
        }

        // Particle scale and alpha
        const revealScale = Math.min(1.0, revealEase * 1.15);
        const dissolveAlpha = Math.max(0.0, 1.0 - dissolveEase * 1.15);

        if (dissolveAlpha <= 0.005) continue;

        let drawRadius = Math.max(
          0.2,
          p.r0 * portraitScale * revealScale * (1 - dissolveEase * 0.45)
        );

        if (isLitByScan) {
          drawRadius *= (1 + scanBoost * 0.38); // Dots expand subtly during light wave
        }
        if (sparkBoost > 0) {
          drawRadius *= (1 + sparkBoost * 0.3);
        }

        // Render dot with luminous or monochrome tone
        if ((isLitByScan && scanBoost > 0.15) || sparkBoost > 0.2) {
          ctx.fillStyle = p.luminousColor;
        } else {
          ctx.fillStyle = p.color;
        }

        if (dissolveAlpha < 0.99) {
          ctx.globalAlpha = dissolveAlpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ----------------------------------------------------
      // SECTION B: PHYSICAL TYPOGRAPHY ANIMATION CHOREOGRAPHY
      // ----------------------------------------------------
      if (!prefersReducedMotion && animStateRef.current.transforming) {
        const transElapsed = now - animStateRef.current.transformStartTime;

        // Step 1: Luminous Comet Anticipation & Trajectory (~0.75s)
        if (comet.active) {
          comet.progress += comet.speed;
          // Gravitational acceleration curve (ease-in-quad)
          const t = Math.min(1.0, Math.pow(comet.progress, 1.8));

          comet.x = comet.startX + (comet.targetX - comet.startX) * t;
          comet.y = comet.startY + (comet.targetY - comet.startY) * t;

          // Record trail
          comet.trail.push({ x: comet.x, y: comet.y, alpha: 1.0 });
          if (comet.trail.length > 7) comet.trail.shift();

          // Draw trail
          for (let i = 0; i < comet.trail.length; i++) {
            const tr = comet.trail[i];
            tr.alpha *= 0.78;
            ctx.fillStyle = `rgba(192, 132, 252, ${tr.alpha * 0.5})`;
            ctx.beginPath();
            ctx.arc(tr.x, tr.y, 1.2 * (i / comet.trail.length), 0, Math.PI * 2);
            ctx.fill();
          }

          // Draw Comet Head (Compact luminous energy sphere)
          const coronaGrad = ctx.createRadialGradient(comet.x, comet.y, 1, comet.x, comet.y, 12);
          coronaGrad.addColorStop(0, "rgba(233, 213, 255, 0.85)");
          coronaGrad.addColorStop(0.4, "rgba(168, 85, 247, 0.45)");
          coronaGrad.addColorStop(1, "rgba(168, 85, 247, 0)");
          ctx.fillStyle = coronaGrad;
          ctx.beginPath();
          ctx.arc(comet.x, comet.y, 12, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(comet.x, comet.y, 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Step 2: Impact Trigger
          if (comet.progress >= 1.0 && !animStateRef.current.impactTriggered) {
            comet.active = false;
            animStateRef.current.impactTriggered = true;

            // Trigger Shockwave
            shockwave.active = true;
            shockwave.x = comet.targetX;
            shockwave.y = comet.targetY;
            shockwave.radius = 2;
            shockwave.alpha = 0.95;

            // Trigger 6 high-speed Sparks arcing toward portrait
            for (let s = 0; s < 6; s++) {
              sparks.push({
                x: comet.targetX,
                y: comet.targetY,
                vx: 5.5 + Math.random() * 5.0,
                vy: (Math.random() - 0.5) * 3.2,
                alpha: 1.0,
                radius: 1.2 + Math.random() * 0.8,
              });
            }

            // Sample Current DOM Headline Text into Particles
            const line2El = line2Ref.current;
            const line1El = line1Ref.current;
            if (line2El && canvas) {
              const line2Rect = line2El.getBoundingClientRect();
              const computedStyle2 = window.getComputedStyle(line2El);

              const currentStage = animStateRef.current.currentStage;
              const sourceText = currentStage === "curiosity" ? "made tangible." : "engineered to endure.";
              const targetText = currentStage === "curiosity" ? "engineered to endure." : "made tangible.";

              // Source particles
              const srcCoords = sampleTextToCoordinates(
                sourceText,
                `${computedStyle2.fontWeight} ${computedStyle2.fontSize} ${computedStyle2.fontFamily}`,
                line2Rect,
                canvasRect,
                3
              );

              // Target particles for Reconstruction
              const targetCoords = sampleTextToCoordinates(
                targetText,
                `${computedStyle2.fontWeight} ${computedStyle2.fontSize} ${computedStyle2.fontFamily}`,
                line2Rect,
                canvasRect,
                3
              );

              // Create text particles from source coords, assigning targets
              textParticles = srcCoords.map((pt, i) => {
                const targetPt = targetCoords[i % targetCoords.length] || pt;
                const dx = pt.x - comet.targetX;
                const dy = pt.y - comet.targetY;

                // Radial blast velocity from impact point
                const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.6;
                const speed = 2.5 + Math.random() * 6.5;

                return {
                  x: pt.x,
                  y: pt.y,
                  vx: Math.cos(angle) * speed,
                  vy: Math.sin(angle) * speed - 1.2,
                  targetX: targetPt.x,
                  targetY: targetPt.y,
                  originX: pt.x,
                  originY: pt.y,
                  radius: 1.2 + Math.random() * 0.9,
                  color: i % 4 === 0 ? "rgba(233, 213, 255, 0.95)" : "rgba(237, 237, 239, 0.92)",
                  alpha: 1.0,
                  active: true,
                };
              });

              // Supplement particles if target has more points than source
              if (targetCoords.length > srcCoords.length) {
                for (let k = srcCoords.length; k < targetCoords.length; k++) {
                  const targetPt = targetCoords[k];
                  const angle = Math.random() * Math.PI * 2;
                  const speed = 2.0 + Math.random() * 4.0;
                  textParticles.push({
                    x: comet.targetX + Math.cos(angle) * 15,
                    y: comet.targetY + Math.sin(angle) * 15,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 1.0,
                    targetX: targetPt.x,
                    targetY: targetPt.y,
                    originX: comet.targetX,
                    originY: comet.targetY,
                    radius: 1.2 + Math.random() * 0.9,
                    color: "rgba(216, 180, 254, 0.95)",
                    alpha: 1.0,
                    active: true,
                  });
                }
              }

              // Hide DOM text while particles are in flight
              line2El.style.opacity = "0";
              if (line1El) {
                line1El.style.transition = "opacity 0.6s ease-in-out";
                line1El.style.opacity = "0.2";
              }
            }
          }
        }

        // Render Shockwave Ring
        if (shockwave.active) {
          shockwave.radius += 4.8;
          shockwave.alpha *= 0.93;

          ctx.strokeStyle = `rgba(192, 132, 252, ${shockwave.alpha * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(shockwave.x, shockwave.y, shockwave.radius, 0, Math.PI * 2);
          ctx.stroke();

          if (shockwave.radius > shockwave.maxRadius || shockwave.alpha < 0.02) {
            shockwave.active = false;
          }
        }

        // Render Sparks arcing toward portrait
        for (let s = sparks.length - 1; s >= 0; s--) {
          const sp = sparks[s];
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.vy += 0.05;
          sp.alpha *= 0.95;

          // Check if spark reaches portrait region
          if (sp.x >= anchorX && portraitSparkImpulse === 0) {
            portraitSparkImpulse = 0.85; // Trigger portrait shimmer response!
          }

          ctx.fillStyle = `rgba(216, 180, 254, ${sp.alpha})`;
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
          ctx.fill();

          if (sp.alpha < 0.05) {
            sparks.splice(s, 1);
          }
        }

        // Render & Update Text Fragmentation / Reconstruction Particles
        if (textParticles.length > 0) {
          const timeSinceImpact = transElapsed - 750;
          const isReconstructing = timeSinceImpact > 700;

          let allSettled = true;

          for (let pIdx = 0; pIdx < textParticles.length; pIdx++) {
            const tp = textParticles[pIdx];
            if (!tp.active) continue;

            if (isReconstructing) {
              const springK = 0.075;
              const friction = 0.78;
              const ax = (tp.targetX - tp.x) * springK;
              const ay = (tp.targetY - tp.y) * springK;

              tp.vx = (tp.vx + ax) * friction;
              tp.vy = (tp.vy + ay) * friction;

              const distToTarget = Math.hypot(tp.targetX - tp.x, tp.targetY - tp.y);
              if (distToTarget > 0.8) {
                allSettled = false;
              }
            } else {
              tp.vx *= 0.90;
              tp.vy *= 0.90;
              allSettled = false;
            }

            tp.x += tp.vx;
            tp.y += tp.vy;

            ctx.fillStyle = tp.color;
            ctx.beginPath();
            ctx.arc(tp.x, tp.y, tp.radius, 0, Math.PI * 2);
            ctx.fill();
          }

          // Step 3: Complete Reconstruction & Hand Off to Semantic DOM
          if (
            isReconstructing &&
            timeSinceImpact > 2200 &&
            !animStateRef.current.reconstructedTriggered
          ) {
            animStateRef.current.reconstructedTriggered = true;

            // Notify parent to update semantic DOM headline to Target Stage
            const nextStage: "curiosity" | "engineered" = animStateRef.current.targetStage;
            onHeadlineStageChange(nextStage);

            // Fade in DOM text smoothly
            const line2El = line2Ref.current;
            const line1El = line1Ref.current;
            if (line2El) {
              line2El.style.transition = "opacity 0.6s ease-out";
              line2El.style.opacity = "1";
            }
            if (line1El) {
              line1El.style.transition = "opacity 0.6s ease-out";
              line1El.style.opacity = "1";
            }

            // Fade out canvas text particles
            setTimeout(() => {
              textParticles = [];
              animStateRef.current.transforming = false;
            }, 600);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(autoTriggerTimer);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, [
    isClient,
    desktopAnchorRef,
    mobileAnchorRef,
    headlineAnchorRef,
    line1Ref,
    line2Ref,
    onHeadlineStageChange,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-[125%] pointer-events-none z-[10] block"
      aria-hidden="true"
    />
  );
}

export default DigitalExhibitionStage;
