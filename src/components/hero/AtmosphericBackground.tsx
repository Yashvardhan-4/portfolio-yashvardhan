"use client";

import React, { useRef, useEffect } from "react";

interface RainStreak {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
}

interface WaterRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

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

    // Mouse position for subtle interaction
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

    // 1. Constellation Network Nodes (Algorithmic / Systems Lattice for Dark & Light)
    const nodeCount = 38;
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.20,
      vy: (Math.random() - 0.5) * 0.16,
      radius: 0.7 + Math.random() * 0.7,
      baseAlpha: 0.12 + Math.random() * 0.18,
      phase: Math.random() * Math.PI * 2,
      tintDark: i % 4 === 0 ? "rgba(168, 85, 247," : "rgba(237, 237, 239,",
      tintLight: i % 4 === 0 ? "rgba(42, 87, 65," : "rgba(84, 73, 64,",
    }));

    // 2. Window Rain Streaks (Light Mode Conservatory Scene)
    const streakCount = 16;
    const rainStreaks: RainStreak[] = Array.from({ length: streakCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: 16 + Math.random() * 28,
      speed: 0.40 + Math.random() * 0.65,
      opacity: 0.025 + Math.random() * 0.045,
      width: 0.7 + Math.random() * 0.7,
    }));

    // 3. Water Puddle Ripples (Inspired by the Ghibli Rain Garden reference)
    const ripples: WaterRipple[] = [];
    let lastRippleTime = 0;

    const spawnRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 2,
        maxRadius: 28 + Math.random() * 22,
        alpha: 0.28,
        speed: 0.35 + Math.random() * 0.25,
      });
      if (ripples.length > 8) ripples.shift();
    };

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.006;
      ctx.clearRect(0, 0, width, height);

      // --- SECTION 1: CONSERVATORY LIGHT APERTURE & AMBIENT DEPTH ---
      if (isLight) {
        // Morning sunlight aperture beam sweeping across from top-left (eliminates plain white)
        const sunX = width * 0.15;
        const sunY = -60;
        const sunGrad = ctx.createRadialGradient(sunX, sunY, 40, sunX + width * 0.25, sunY + height * 0.45, width * 0.75);
        sunGrad.addColorStop(0, "rgba(240, 225, 200, 0.28)"); // Warm golden morning sunlight
        sunGrad.addColorStop(0.35, "rgba(235, 220, 195, 0.12)");
        sunGrad.addColorStop(0.70, "rgba(225, 235, 225, 0.05)");
        sunGrad.addColorStop(1, "rgba(245, 239, 235, 0)");
        ctx.fillStyle = sunGrad;
        ctx.fillRect(0, 0, width, height);

        // Secondary soft forest moss reflection at bottom-right
        const mossX = width * 0.85;
        const mossY = height * 0.85;
        const mossGrad = ctx.createRadialGradient(mossX, mossY, 20, mossX, mossY, width * 0.45);
        mossGrad.addColorStop(0, "rgba(42, 87, 65, 0.045)");
        mossGrad.addColorStop(0.5, "rgba(71, 120, 94, 0.018)");
        mossGrad.addColorStop(1, "rgba(245, 239, 235, 0)");
        ctx.fillStyle = mossGrad;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Dark Mode: Deep Violet Cosmic Aurora Beacon
        const cx1 = width * (0.68 + Math.sin(time * 0.35) * 0.07);
        const cy1 = height * (0.32 + Math.cos(time * 0.28) * 0.07);
        const grad1 = ctx.createRadialGradient(cx1, cy1, 10, cx1, cy1, width * 0.45);
        grad1.addColorStop(0, "rgba(168, 85, 247, 0.065)");
        grad1.addColorStop(0.5, "rgba(126, 34, 206, 0.022)");
        grad1.addColorStop(1, "rgba(8, 9, 11, 0)");
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, width, height);

        const cx2 = width * (0.22 + Math.cos(time * 0.25) * 0.05);
        const cy2 = height * (0.62 + Math.sin(time * 0.30) * 0.05);
        const grad2 = ctx.createRadialGradient(cx2, cy2, 10, cx2, cy2, width * 0.38);
        grad2.addColorStop(0, "rgba(99, 102, 241, 0.04)");
        grad2.addColorStop(0.6, "rgba(79, 70, 229, 0.012)");
        grad2.addColorStop(1, "rgba(8, 9, 11, 0)");
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, width, height);
      }

      // --- SECTION 2: LIGHT MODE CONSERVATORY WINDOW, RAIN & FOLIAGE ---
      if (isLight && !prefersReducedMotion) {
        // Periodic rain droplet ripples
        if (time - lastRippleTime > 3.2) {
          lastRippleTime = time;
          // Spawn in the lower region or sides
          const rx = width * (0.12 + Math.random() * 0.76);
          const ry = height * (0.45 + Math.random() * 0.48);
          spawnRipple(rx, ry);
        }

        // Render expanding water ripple rings
        for (let r = ripples.length - 1; r >= 0; r--) {
          const rip = ripples[r];
          rip.radius += rip.speed;
          rip.alpha = Math.max(0, rip.alpha - 0.0035);

          if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
            ripples.splice(r, 1);
            continue;
          }

          ctx.save();
          ctx.strokeStyle = `rgba(42, 87, 65, ${rip.alpha * 0.65})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.ellipse(rip.x, rip.y, rip.radius, rip.radius * 0.45, 0, 0, Math.PI * 2);
          ctx.stroke();

          // Outer secondary ripple
          if (rip.radius > 8) {
            ctx.strokeStyle = `rgba(91, 140, 120, ${rip.alpha * 0.38})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.ellipse(rip.x, rip.y, rip.radius * 0.72, rip.radius * 0.32, 0, 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.restore();
        }

        // Soft Window Rain Streaks
        ctx.lineCap = "round";
        for (let s = 0; s < streakCount; s++) {
          const st = rainStreaks[s];
          st.y += st.speed;
          if (st.y > height + 40) {
            st.y = -40;
            st.x = Math.random() * width;
          }

          ctx.strokeStyle = `rgba(42, 87, 65, ${st.opacity * 0.85})`;
          ctx.lineWidth = st.width;
          ctx.beginPath();
          ctx.moveTo(st.x, st.y);
          ctx.lineTo(st.x + 0.4, st.y + st.length);
          ctx.stroke();

          // Droplet bead at base
          ctx.fillStyle = `rgba(168, 196, 184, ${st.opacity * 1.3})`;
          ctx.beginPath();
          ctx.arc(st.x + 0.4, st.y + st.length, st.width * 1.1, 0, Math.PI * 2);
          ctx.fill();
        }

        // Gentle Foliage Silhouettes at Canvas Periphery (conservatory garden depth)
        // Top-right trailing ivy vine
        ctx.save();
        ctx.fillStyle = "rgba(42, 87, 65, 0.026)";
        ctx.beginPath();
        ctx.moveTo(width, 0);
        ctx.bezierCurveTo(width - 120, 40, width - 210, 150, width - 170, 230);
        ctx.bezierCurveTo(width - 140, 190, width - 85, 125, width, 85);
        ctx.closePath();
        ctx.fill();

        // Delicate leaf lobes
        ctx.beginPath();
        ctx.ellipse(width - 160, 135, 26, 11, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(width - 120, 180, 22, 9, Math.PI / 3, 0, Math.PI * 2);
        ctx.fill();

        // Bottom-left subtle garden fern silhouette
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.bezierCurveTo(60, height - 80, 110, height - 120, 160, height - 130);
        ctx.bezierCurveTo(120, height - 90, 70, height - 50, 0, height - 40);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // --- SECTION 3: HARMONIC FILAMENT WAVES & CONSTELLATION NODES ---
      if (!prefersReducedMotion) {
        // Mathematical Harmonic Waves
        const waveCount = 3;
        for (let w = 0; w < waveCount; w++) {
          const yBase = height * (0.35 + w * 0.22);
          const freq = 0.0018 + w * 0.0006;
          const amp = 24 + w * 12;
          const speed = time * (0.8 + w * 0.35);

          ctx.beginPath();
          if (isLight) {
            ctx.strokeStyle =
              w === 0
                ? "rgba(42, 87, 65, 0.045)"
                : w === 1
                ? "rgba(84, 73, 64, 0.035)"
                : "rgba(71, 120, 94, 0.028)";
          } else {
            ctx.strokeStyle =
              w === 0
                ? "rgba(168, 85, 247, 0.035)"
                : w === 1
                ? "rgba(192, 132, 252, 0.025)"
                : "rgba(147, 197, 253, 0.02)";
          }
          ctx.lineWidth = 0.85;

          for (let x = 0; x <= width; x += 12) {
            let y =
              yBase +
              Math.sin(x * freq + speed) * amp +
              Math.cos(x * freq * 0.5 - speed * 0.7) * (amp * 0.5);

            if (mouse.active) {
              const dx = x - mouse.x;
              const dy = y - mouse.y;
              const distSq = dx * dx + dy * dy;
              if (distSq < 16000 && distSq > 0.1) {
                const dist = Math.sqrt(distSq);
                const force = (1 - dist / 126) * 14;
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

        // Constellation Nodes & Connecting Filaments
        const maxDist = 100;
        const maxDistSq = maxDist * maxDist;

        for (let i = 0; i < nodeCount; i++) {
          const p1 = nodes[i];
          for (let j = i + 1; j < nodeCount; j++) {
            const p2 = nodes[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxDistSq) {
              const alpha = (1 - distSq / maxDistSq) * 0.040;
              ctx.strokeStyle = isLight
                ? `rgba(42, 87, 65, ${alpha * 0.7})`
                : `rgba(168, 85, 247, ${alpha})`;
              ctx.lineWidth = 0.7;
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

          p.x += p.vx + Math.sin(time + p.phase) * 0.08;
          p.y += p.vy + Math.cos(time + p.phase) * 0.07;

          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 14400 && distSq > 0.01) {
              const dist = Math.sqrt(distSq);
              const factor = (1 - dist / 120) * 0.7;
              p.x += (dx / dist) * factor;
              p.y += (dy / dist) * factor;
            }
          }

          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;

          const shimmer = Math.sin(time * 1.8 + p.phase) * 0.05;
          const currentAlpha = Math.max(0.03, p.baseAlpha + shimmer);

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
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Procedural Analog Washi Paper Grain (Tactile physical paper surface, removes plain white glare) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.032] mix-blend-multiply transition-opacity duration-300"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* 2. Living Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 block w-full h-full"
      />
    </div>
  );
}

export default AtmosphericBackground;
