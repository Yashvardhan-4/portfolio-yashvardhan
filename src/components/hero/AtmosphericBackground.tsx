"use client";

import React, { useRef, useEffect } from "react";

export function AtmosphericBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Generate 38 delicate atmospheric floating dust particles
    const particleCount = 38;
    const dustParticles = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -0.08 - Math.random() * 0.14, // Gentle upward drift
      radius: 0.6 + Math.random() * 0.9,
      baseAlpha: 0.12 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2,
      tint: i % 5 === 0 ? "rgba(192, 132, 252," : "rgba(237, 237, 239,",
    }));

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.008;

      ctx.clearRect(0, 0, width, height);

      // 1. Slow-moving, non-synchronized organic ambient light centers
      // Light Center 1 (Subtle electric-violet illumination drift)
      const cx1 = width * (0.65 + Math.sin(time * 0.4) * 0.08);
      const cy1 = height * (0.35 + Math.cos(time * 0.3) * 0.08);
      const grad1 = ctx.createRadialGradient(cx1, cy1, 10, cx1, cy1, width * 0.45);
      grad1.addColorStop(0, "rgba(168, 85, 247, 0.055)");
      grad1.addColorStop(0.5, "rgba(126, 34, 206, 0.018)");
      grad1.addColorStop(1, "rgba(8, 9, 11, 0)");

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Light Center 2 (Subtle sapphire-indigo counter-balance drift)
      const cx2 = width * (0.25 + Math.cos(time * 0.28) * 0.06);
      const cy2 = height * (0.60 + Math.sin(time * 0.35) * 0.06);
      const grad2 = ctx.createRadialGradient(cx2, cy2, 10, cx2, cy2, width * 0.4);
      grad2.addColorStop(0, "rgba(99, 102, 241, 0.035)");
      grad2.addColorStop(0.6, "rgba(79, 70, 229, 0.010)");
      grad2.addColorStop(1, "rgba(8, 9, 11, 0)");

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        // 2. Render delicate floating dust particles
        for (let i = 0; i < particleCount; i++) {
          const p = dustParticles[i];

          p.x += p.vx + Math.sin(time + p.phase) * 0.12;
          p.y += p.vy;

          // Wrap around canvas boundaries smoothly
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          const shimmer = Math.sin(time * 1.5 + p.phase) * 0.08;
          const currentAlpha = Math.max(0.04, p.baseAlpha + shimmer);

          ctx.fillStyle = `${p.tint} ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 block w-full h-full"
      aria-hidden="true"
    />
  );
}

export default AtmosphericBackground;