"use client";

import React, { useRef, useEffect, useState } from "react";
import halftoneData from "@/data/halftoneDots.json";

interface Dot {
  x0: number; // Base anchor X
  y0: number; // Base anchor Y
  x: number;  // Current physics X
  y: number;  // Current physics Y
  vx: number; // Velocity X
  vy: number; // Velocity Y
  r0: number; // Base radius
  r: number;  // Current radius
  l: number;  // Luminance [0..1]
  color: string;
  luminousColor: string;
  featureWeight: number; // Protection weight for core facial features
  dissolveAngle: number; // Deterministic angle for scroll dissolve
  dissolveSpeed: number; // Deterministic speed for scroll dissolve
  initialOffsetX: number; // Offsets for initial reconstruction reveal
  initialOffsetY: number;
}

interface LivingHalftoneProps {
  className?: string;
  scrollProgress?: number; // Optional externally driven scroll progress [0..1]
}

export function LivingHalftone({ className = "", scrollProgress }: LivingHalftoneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    const baseWidth = halftoneData.width;   // 480
    const baseHeight = halftoneData.height; // 641
    const cx = baseWidth * 0.5;
    const cy = baseHeight * 0.45;

    // Initialize dot particles from pre-sampled halftone data with reveal & dissolve parameters
    const rawDots = halftoneData.dots as Array<[number, number, number, number]>;
    const particles: Dot[] = rawDots.map(([x0, y0, r0, l], i) => {
      // Determine refined editorial monochrome tint
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

      // Feature preservation weight (protects eyes, nose bridge, lips from distortion)
      const isCoreFeature = x0 > 175 && x0 < 305 && y0 > 185 && y0 < 415;
      const featureWeight = isCoreFeature ? 0.65 : 1.0;

      // Deterministic angle & speed for smooth scroll-driven dissolve
      const dx = x0 - cx;
      const dy = y0 - cy;
      const angle = Math.atan2(dy, dx) + Math.sin(i * 1.7) * 0.45;
      const speed = 70 + (i % 37) * 4.5;

      // Deterministic offsets for initial reconstruction reveal
      const initialDist = 45 + (i % 23) * 3;
      const initialAngle = (i * 0.4) % (Math.PI * 2);
      const initialOffsetX = Math.cos(initialAngle) * initialDist;
      const initialOffsetY = Math.sin(initialAngle) * initialDist;

      return {
        x0,
        y0,
        x: x0 + initialOffsetX,
        y: y0 + initialOffsetY,
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

    let width = container.clientWidth || baseWidth;
    let height = container.clientHeight || (width * (baseHeight / baseWidth));
    let scale = width / baseWidth;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.width * (baseHeight / baseWidth);
      scale = width / baseWidth;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse interaction state
    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.x = x / scale;
      mouse.y = y / scale;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    // Scroll state tracking for smooth dissolve into Projects
    let currentScrollY = window.scrollY;
    const handleScroll = () => {
      currentScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Animation & timing state
    const startTime = performance.now();
    let time = 0;

    // Physics parameters
    const interactionRadius = 82;
    const interactionRadiusSq = interactionRadius * interactionRadius;
    const maxRepulsion = 11.5;
    const springK = 0.11;
    const friction = 0.76;

    // Periodic scanning wave parameters (travels top to bottom every ~10 seconds)
    const scanPeriod = 10000; // 10s between scans
    const scanDuration = 2200; // 2.2s scan transit
    const scanBandWidth = 75; // 75px band width in base coords

    const render = (now: number) => {
      const elapsed = now - startTime;
      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      // 1. Initial reconstruction reveal progress [0..1] over 1.3 seconds
      const revealProgress = prefersReducedMotion
        ? 1.0
        : Math.min(1.0, Math.max(0.0, elapsed / 1300));
      // Ease-out cubic for organic convergence
      const revealEase = 1 - Math.pow(1 - revealProgress, 3);

      // 2. Scroll-driven dissolve factor [0..1]
      // Begins after 80px scroll, fully dissolved by 540px
      const localScroll = scrollProgress !== undefined ? scrollProgress : Math.max(0, currentScrollY - 70) / 460;
      const dissolveFactor = prefersReducedMotion ? 0 : Math.min(1.0, Math.max(0.0, localScroll));
      const dissolveEase = Math.pow(dissolveFactor, 1.35);

      // 3. Periodic scanning wave calculation
      // Scan occurs within a window every scanPeriod
      const cycleTime = elapsed % scanPeriod;
      const isScanning = !prefersReducedMotion && cycleTime < scanDuration && revealProgress >= 0.95 && dissolveFactor < 0.4;
      const scanProgress = isScanning ? cycleTime / scanDuration : -1;
      const scanY = isScanning ? scanProgress * (baseHeight + scanBandWidth * 2) - scanBandWidth : -9999;

      // Soft illumination band glow on canvas during scan
      if (isScanning && scanY > 0 && scanY < baseHeight) {
        const bandScreenY = scanY * scale;
        const bandScreenHeight = scanBandWidth * scale * 1.5;
        const scanGrad = ctx.createLinearGradient(0, bandScreenY - bandScreenHeight * 0.5, 0, bandScreenY + bandScreenHeight * 0.5);
        scanGrad.addColorStop(0, "rgba(168, 85, 247, 0)");
        scanGrad.addColorStop(0.5, "rgba(192, 132, 252, 0.055)");
        scanGrad.addColorStop(1, "rgba(168, 85, 247, 0)");

        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, Math.max(0, bandScreenY - bandScreenHeight * 0.5), width, bandScreenHeight);
      }

      const numParticles = particles.length;

      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];

        if (prefersReducedMotion) {
          const currentRadius = p.r0 * scale;
          const drawX = p.x0 * scale;
          const drawY = p.y0 * scale;

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(drawX, drawY, currentRadius, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        // Base coordinate calculation (considering reveal convergence)
        let targetX = p.x0;
        let targetY = p.y0;

        if (revealProgress < 1.0) {
          // Particles converge inward from initial soft scatter during initial reveal
          const scatterRemaining = 1.0 - revealEase;
          targetX = p.x0 + p.initialOffsetX * scatterRemaining;
          targetY = p.y0 + p.initialOffsetY * scatterRemaining;
        }

        // Magnetic cursor interaction (active only when reveal is nearly complete and not heavily dissolved)
        if (mouse.active && revealProgress > 0.8 && dissolveFactor < 0.3) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < interactionRadiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const q = dist / interactionRadius;
            const factor = Math.cos(q * Math.PI * 0.5);
            const force = factor * factor * maxRepulsion * p.featureWeight;
            targetX += (dx / dist) * force;
            targetY += (dy / dist) * force;
          }
        } else if (revealProgress >= 1.0 && dissolveFactor < 0.2) {
          // Subtle idle ambient harmonic breath
          const ambient = Math.sin(time * 0.8 + (p.x0 + p.y0) * 0.012) * 0.25;
          targetX += ambient * 0.35;
          targetY += ambient * 0.25;
        }

        // Scroll-driven dissolution displacement (particles gently separate and drift outward/downward)
        if (dissolveFactor > 0.001) {
          const driftDist = p.dissolveSpeed * dissolveEase * 2.5;
          const driftX = Math.cos(p.dissolveAngle) * driftDist;
          const driftY = Math.sin(p.dissolveAngle) * driftDist + dissolveEase * 60; // Upward-to-downward drift
          targetX += driftX;
          targetY += driftY;
        }

        // Damped spring physics integration
        const ax = (targetX - p.x) * springK;
        const ay = (targetY - p.y) * springK;

        p.vx = (p.vx + ax) * friction;
        p.vy = (p.vy + ay) * friction;

        p.x += p.vx;
        p.y += p.vy;

        // Scanning wave illumination calculation for this particle
        let isLitByScan = false;
        let scanBoost = 0;
        if (isScanning) {
          const distToScan = Math.abs(p.y0 - scanY);
          if (distToScan < scanBandWidth) {
            isLitByScan = true;
            const q = distToScan / scanBandWidth;
            scanBoost = Math.pow(Math.cos(q * Math.PI * 0.5), 2);
          }
        }

        // Particle opacity and scale calculation
        const revealScale = Math.min(1.0, revealEase * 1.15);
        const dissolveAlpha = Math.max(0.0, 1.0 - dissolveEase * 1.1);

        if (dissolveAlpha <= 0.005) continue;

        let drawRadius = Math.max(0.2, p.r0 * scale * revealScale * (1 - dissolveEase * 0.45));
        if (isLitByScan) {
          drawRadius *= (1 + scanBoost * 0.32); // Dots subtly expand during scan
        }

        const drawX = p.x * scale;
        const drawY = p.y * scale;

        // Choose color based on scanning illumination or resting tone
        if (isLitByScan && scanBoost > 0.15) {
          ctx.fillStyle = p.luminousColor;
        } else {
          ctx.fillStyle = p.color;
        }

        if (dissolveAlpha < 0.99) {
          ctx.globalAlpha = dissolveAlpha;
          ctx.beginPath();
          ctx.arc(drawX, drawY, drawRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        } else {
          ctx.beginPath();
          ctx.arc(drawX, drawY, drawRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleMotionChange);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [isClient, scrollProgress]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[480/641] max-w-[480px] sm:max-w-[520px] lg:max-w-[550px] xl:max-w-[580px] mx-auto select-none touch-none ${className}`}
      aria-label="Generative halftone portrait of Yashvardhan Borude"
      role="img"
    >
      {/* Restrained electric-violet ambient aura behind halftone face */}
      <div
        className="absolute inset-x-8 top-12 bottom-12 rounded-full blur-[75px] opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.22) 0%, rgba(126, 34, 206, 0.06) 50%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full block cursor-crosshair"
      />
    </div>
  );
}

export default LivingHalftone;