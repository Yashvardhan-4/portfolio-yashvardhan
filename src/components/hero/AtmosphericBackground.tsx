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
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Mouse position for subtle gravitational interaction
    const mouse = { x: -9999, y: -9999, active: false };
    const handlePointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    let isLight = document.documentElement.getAttribute("data-theme") === "light";
    const handleThemeChange = () => {
      isLight = document.documentElement.getAttribute("data-theme") === "light";
    };
    window.addEventListener("themechange", handleThemeChange);

    // 1. Constellation Network Nodes (Algorithmic / Systems Lattice)
    const nodeCount = 48;
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.18,
      radius: 0.8 + Math.random() * 0.8,
      baseAlpha: 0.14 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2,
      tintDark: i % 4 === 0 ? "rgba(168, 85, 247," : "rgba(237, 237, 239,",
      tintLight: i % 4 === 0 ? "rgba(42, 114, 78," : "rgba(23, 35, 28,",
    }));

    // 2. Harmonic Filament Waves Parameters
    const waveCount = 3;
    // Rain streaks on window pane (for light theme)
    const streakCount = 18;
    const rainStreaks = Array.from({ length: streakCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: 18 + Math.random() * 32,
      speed: 0.45 + Math.random() * 0.75,
      opacity: 0.03 + Math.random() * 0.05,
      width: 0.75 + Math.random() * 0.75,
    }));


    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.006;
      ctx.clearRect(0, 0, width, height);

      // 1. Ambient Living Light Beacons (Deep Field Depth)
      const cx1 = width * (0.68 + Math.sin(time * 0.35) * 0.07);
      const cy1 = height * (0.32 + Math.cos(time * 0.28) * 0.07);
      const grad1 = ctx.createRadialGradient(cx1, cy1, 10, cx1, cy1, width * 0.45);
      if (isLight) {
        grad1.addColorStop(0, "rgba(71, 120, 94, 0.065)");
        grad1.addColorStop(0.4, "rgba(185, 216, 208, 0.035)");
        grad1.addColorStop(1, "rgba(243, 243, 233, 0)");
      } else {
        grad1.addColorStop(0, "rgba(168, 85, 247, 0.065)");
        grad1.addColorStop(0.5, "rgba(126, 34, 206, 0.022)");
        grad1.addColorStop(1, "rgba(8, 9, 11, 0)");
      }
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const cx2 = width * (0.22 + Math.cos(time * 0.25) * 0.05);
      const cy2 = height * (0.62 + Math.sin(time * 0.30) * 0.05);
      const grad2 = ctx.createRadialGradient(cx2, cy2, 10, cx2, cy2, width * 0.38);
      if (isLight) {
        grad2.addColorStop(0, "rgba(185, 216, 208, 0.05)");
        grad2.addColorStop(0.6, "rgba(71, 120, 94, 0.02)");
        grad2.addColorStop(1, "rgba(243, 243, 233, 0)");
      } else {
        grad2.addColorStop(0, "rgba(99, 102, 241, 0.04)");
        grad2.addColorStop(0.6, "rgba(79, 70, 229, 0.012)");
        grad2.addColorStop(1, "rgba(8, 9, 11, 0)");
      }
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      
      // Render Rain Window Atmosphere in Light Mode
      if (isLight && !prefersReducedMotion) {
        // 1. Soft Window Rain Streaks
        ctx.lineCap = "round";
        for (let s = 0; s < streakCount; s++) {
          const st = rainStreaks[s];
          st.y += st.speed;
          if (st.y > height + 40) {
            st.y = -40;
            st.x = Math.random() * width;
          }

          ctx.strokeStyle = `rgba(71, 120, 94, ${st.opacity})`;
          ctx.lineWidth = st.width;
          ctx.beginPath();
          ctx.moveTo(st.x, st.y);
          ctx.lineTo(st.x + 0.5, st.y + st.length);
          ctx.stroke();

          // Delicate droplet head at bottom of streak
          ctx.fillStyle = `rgba(185, 216, 208, ${st.opacity * 1.5})`;
          ctx.beginPath();
          ctx.arc(st.x + 0.5, st.y + st.length, st.width * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // 2. Gentle Foliage Silhouettes at Canvas Periphery (looking out conservatory window)
        // Top-right trailing vine branch
        ctx.save();
        ctx.fillStyle = "rgba(71, 120, 94, 0.032)";
        ctx.beginPath();
        ctx.moveTo(width, 0);
        ctx.bezierCurveTo(width - 120, 40, width - 200, 140, width - 160, 220);
        ctx.bezierCurveTo(width - 130, 180, width - 80, 120, width, 80);
        ctx.closePath();
        ctx.fill();

        // Secondary subtle leaf silhouette
        ctx.beginPath();
        ctx.ellipse(width - 150, 130, 28, 12, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(width - 110, 175, 24, 10, Math.PI / 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (!prefersReducedMotion) {
        // 2. Mathematical Harmonic Filament Waves (Floating in Background)
        for (let w = 0; w < waveCount; w++) {
          const yBase = height * (0.35 + w * 0.22);
          const freq = 0.0018 + w * 0.0006;
          const amp = 24 + w * 12;
          const speed = time * (0.8 + w * 0.35);

          ctx.beginPath();
          if (isLight) {
            ctx.strokeStyle =
              w === 0
                ? "rgba(42, 114, 78, 0.055)"
                : w === 1
                ? "rgba(59, 130, 150, 0.045)"
                : "rgba(34, 103, 67, 0.035)";
          } else {
            ctx.strokeStyle =
              w === 0
                ? "rgba(168, 85, 247, 0.035)"
                : w === 1
                ? "rgba(192, 132, 252, 0.025)"
                : "rgba(147, 197, 253, 0.02)";
          }
          ctx.lineWidth = 1.0;

          for (let x = 0; x <= width; x += 12) {
            let y =
              yBase +
              Math.sin(x * freq + speed) * amp +
              Math.cos(x * freq * 0.5 - speed * 0.7) * (amp * 0.5);

            // Subtle mouse repulsion on wave line
            if (mouse.active) {
              const dx = x - mouse.x;
              const dy = y - mouse.y;
              const distSq = dx * dx + dy * dy;
              if (distSq < 16000 && distSq > 0.1) {
                const dist = Math.sqrt(distSq);
                const force = (1 - dist / 126) * 16;
                y += (dy / dist) * force;
              }
            }

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }

        // 3. Constellation Nodes & Connecting Dynamic Filaments
        const maxDist = 110;
        const maxDistSq = maxDist * maxDist;

        // Draw connections
        for (let i = 0; i < nodeCount; i++) {
          const p1 = nodes[i];
          for (let j = i + 1; j < nodeCount; j++) {
            const p2 = nodes[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxDistSq) {
              const alpha = (1 - distSq / maxDistSq) * 0.045;
              ctx.strokeStyle = isLight
                ? `rgba(42, 114, 78, ${alpha * 0.8})`
                : `rgba(168, 85, 247, ${alpha})`;
              ctx.lineWidth = 0.75;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        // Update & Render Nodes
        for (let i = 0; i < nodeCount; i++) {
          const p = nodes[i];

          // Gentle ambient drift
          p.x += p.vx + Math.sin(time + p.phase) * 0.10;
          p.y += p.vy + Math.cos(time + p.phase) * 0.08;

          // Subtle cursor repulsion
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 14400 && distSq > 0.01) {
              const dist = Math.sqrt(distSq);
              const factor = (1 - dist / 120) * 0.8;
              p.x += (dx / dist) * factor;
              p.y += (dy / dist) * factor;
            }
          }

          // Boundary wrap
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;

          const shimmer = Math.sin(time * 1.8 + p.phase) * 0.06;
          const currentAlpha = Math.max(0.04, p.baseAlpha + shimmer);

          ctx.fillStyle = `${isLight ? p.tintLight : p.tintDark} ${currentAlpha})`;
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
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("themechange", handleThemeChange);
      mediaQuery.removeEventListener("change", handleMotionChange);
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
