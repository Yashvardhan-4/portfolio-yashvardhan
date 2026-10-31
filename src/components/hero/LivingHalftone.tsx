"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
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
}

interface LivingHalftoneProps {
  className?: string;
  width?: number;
  height?: number;
}

export function LivingHalftone({ className = "" }: LivingHalftoneProps) {
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

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    const baseWidth = halftoneData.width;   // 480
    const baseHeight = halftoneData.height; // 641

    // Initialize dot particles from pre-sampled halftone data
    const rawDots = halftoneData.dots as Array<[number, number, number, number]>;
    const particles: Dot[] = rawDots.map(([x0, y0, r0, l]) => {
      // Determine refined editorial monochrome tint
      let color = "rgba(245, 245, 247, 0.95)";
      if (l > 0.8) {
        color = "rgba(255, 255, 255, 0.98)";
      } else if (l > 0.55) {
        color = "rgba(226, 232, 240, 0.90)";
      } else if (l > 0.35) {
        color = "rgba(180, 190, 205, 0.78)";
      } else if (l > 0.18) {
        color = "rgba(120, 130, 150, 0.65)";
      } else {
        color = "rgba(70, 78, 95, 0.50)";
      }

      return {
        x0,
        y0,
        x: x0,
        y: y0,
        vx: 0,
        vy: 0,
        r0,
        r: r0,
        l,
        color,
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

    // Physics parameters for magnetic interaction
    const interactionRadius = 90; // Influence zone in base coords
    const interactionRadiusSq = interactionRadius * interactionRadius;
    const maxRepulsion = 18;      // Maximum displacement in base coords (restrained, no exploding)
    const springK = 0.085;        // Spring return tension
    const friction = 0.80;        // Damping factor to prevent oscillation

    let time = 0;

    const render = () => {
      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      const numParticles = particles.length;

      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];

        if (prefersReducedMotion) {
          // Static, zero-displacement render when reduced motion is preferred
          const currentRadius = p.r0 * scale;
          const drawX = p.x0 * scale;
          const drawY = p.y0 * scale;

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(drawX, drawY, currentRadius, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        let targetX = p.x0;
        let targetY = p.y0;

        // 1. Magnetic repulsive cursor interaction
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < interactionRadiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            // Smooth non-linear falloff (strongest close to cursor, vanishing at boundary)
            const factor = Math.pow(1 - dist / interactionRadius, 1.6);
            const force = factor * maxRepulsion;
            targetX = p.x0 + (dx / dist) * force;
            targetY = p.y0 + (dy / dist) * force;
          }
        } else {
          // 2. Micro-harmonic ambient breath when idle (imperceptible organic life)
          const ambient = Math.sin(time * 0.9 + (p.x0 + p.y0) * 0.012) * 0.35;
          targetX = p.x0 + ambient * 0.4;
          targetY = p.y0 + ambient * 0.3;
        }

        // 3. Damped spring physics integration
        const ax = (targetX - p.x) * springK;
        const ay = (targetY - p.y) * springK;

        p.vx = (p.vx + ax) * friction;
        p.vy = (p.vy + ay) * friction;

        p.x += p.vx;
        p.y += p.vy;

        // 4. Render dot on canvas
        const drawRadius = Math.max(0.2, p.r0 * scale);
        const drawX = p.x * scale;
        const drawY = p.y * scale;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(drawX, drawY, drawRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      mediaQuery.removeEventListener("change", handleMotionChange);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [isClient]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[480/641] max-w-[440px] sm:max-w-[480px] lg:max-w-[500px] mx-auto select-none touch-none ${className}`}
      aria-label="Generative halftone portrait of Yashvardhan Borude"
      role="img"
    >
      {/* Restrained electric-violet ambient aura behind halftone face */}
      <div
        className="absolute inset-x-8 top-12 bottom-12 rounded-full blur-[70px] opacity-25 pointer-events-none"
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