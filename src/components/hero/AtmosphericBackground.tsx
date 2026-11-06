"use client";

import React, { useRef, useEffect, useState } from "react";

// ============================================================================
// STUDIO GHIBLI LIGHT MODE TYPES & STRUCTURES (DIRECTION A: THE HORIZON)
// ============================================================================

interface GhibliCloud {
  x: number;
  y: number;
  scale: number;
  speed: number;
  opacity: number;
  puffs: { dx: number; dy: number; r: number }[];
}

interface GhibliLeaf {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  angle: number;
  spin: number;
  phase: number;
  color: string;
  isPetal: boolean;
}

interface WaterRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

// ============================================================================
// DARK MODE TYPES (100% ISOLATED & UNTOUCHED)
// ============================================================================

interface DarkConstellationNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  phase: number;
  tintDark: string;
}

export function AtmosphericBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLightMode, setIsLightMode] = useState(false);

  // Synchronize theme state with rock-solid MutationObserver + custom events
  useEffect(() => {
    const updateTheme = () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      setIsLightMode(isLight);
    };
    updateTheme();

    window.addEventListener("theme-change", updateTheme);
    window.addEventListener("themechange", updateTheme);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "data-theme") {
          updateTheme();
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      window.removeEventListener("theme-change", updateTheme);
      window.removeEventListener("themechange", updateTheme);
      observer.disconnect();
    };
  }, []);

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

    // Pointer coordinates & wake physics
    const mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0, active: false };
    const handlePointerMove = (e: PointerEvent) => {
      const dx = e.clientX - mouse.x;
      const dy = e.clientY - mouse.y;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // In Light Mode: moving across the lower water plane generates subtle wakes
      if (document.documentElement.getAttribute("data-theme") === "light" && !prefersReducedMotion) {
        if (e.clientY > height * 0.52 && mouse.speed > 8 && Math.random() < 0.28) {
          spawnRipple(e.clientX, e.clientY, 18 + Math.random() * 16, 0.35);
        }
      }
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Clicking anywhere in the hero spawns an expanding water ripple in Light Mode
    const handleClick = (e: MouseEvent) => {
      if (document.documentElement.getAttribute("data-theme") === "light" && !prefersReducedMotion) {
        spawnRipple(e.clientX, e.clientY, 38 + Math.random() * 24, 0.55);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    // ========================================================================
    // LIGHT MODE STATE: GHIBLI DIRECTION A (COUNTRYSIDE HORIZON & RAIN PUDDLE)
    // ========================================================================

    // 1. Volumetric Cumulus Clouds (Kazuo Oga style)
    const createCloudPuffs = (seed: number) => [
      { dx: 0, dy: 0, r: 44 },
      { dx: -34, dy: 6, r: 34 },
      { dx: 36, dy: 4, r: 36 },
      { dx: -62, dy: 16, r: 26 },
      { dx: 64, dy: 14, r: 28 },
      { dx: -20, dy: -22, r: 28 },
      { dx: 18, dy: -24, r: 32 },
      { dx: 0, dy: -32, r: 26 },
      { dx: seed % 2 === 0 ? 45 : -45, dy: -14, r: 22 },
    ];

    const clouds: GhibliCloud[] = [
      {
        x: width * 0.15,
        y: height * 0.07,
        scale: 1.15,
        speed: 0.14,
        opacity: 0.85,
        puffs: createCloudPuffs(1),
      },
      {
        x: width * 0.62,
        y: height * 0.16,
        scale: 0.90,
        speed: 0.20,
        opacity: 0.72,
        puffs: createCloudPuffs(2),
      },
      {
        x: width * 0.88,
        y: height * 0.05,
        scale: 1.35,
        speed: 0.11,
        opacity: 0.90,
        puffs: createCloudPuffs(3),
      },
      {
        x: -width * 0.2,
        y: height * 0.22,
        scale: 0.78,
        speed: 0.24,
        opacity: 0.65,
        puffs: createCloudPuffs(4),
      },
    ];

    // 2. Wind-Blown Floating Summer Leaves & Petals
    const leafCount = 14;
    const leafColors = [
      "rgba(71, 120, 94, 0.45)",  // Cedar leaf green
      "rgba(91, 140, 120, 0.40)", // Muted meadow sage
      "rgba(42, 87, 65, 0.50)",   // Deep forest green
      "rgba(200, 147, 85, 0.38)", // Golden honey sunlit petal
    ];

    const leaves: GhibliLeaf[] = Array.from({ length: leafCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0.35 + Math.random() * 0.45,
      vy: 0.20 + Math.random() * 0.35,
      size: 4 + Math.random() * 4,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.03,
      phase: Math.random() * Math.PI * 2,
      color: leafColors[i % leafColors.length],
      isPetal: i % 4 === 0,
    }));

    // 3. Water Puddle Concentric Ripples (Reference 3)
    const ripples: WaterRipple[] = [];
    let lastAmbientRippleTime = 0;

    const spawnRipple = (x: number, y: number, maxRadius = 38, alpha = 0.42) => {
      ripples.push({
        x,
        y,
        radius: 2,
        maxRadius,
        alpha,
        speed: 0.42 + Math.random() * 0.22,
      });
      if (ripples.length > 14) ripples.shift();
    };

    // ========================================================================
    // DARK MODE STATE (100% UNTOUCHED ORIGINAL COSMIC LATTICE)
    // ========================================================================
    const darkNodeCount = 38;
    const darkNodes: DarkConstellationNode[] = Array.from({ length: darkNodeCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.20,
      vy: (Math.random() - 0.5) * 0.16,
      radius: 0.7 + Math.random() * 0.7,
      baseAlpha: 0.12 + Math.random() * 0.18,
      phase: Math.random() * Math.PI * 2,
      tintDark: i % 4 === 0 ? "rgba(168, 85, 247," : "rgba(237, 237, 239,",
    }));

    // ========================================================================
    // 60FPS RAF RENDERING PIPELINE (ISOLATED PATHWAYS)
    // ========================================================================
    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.007;
      ctx.clearRect(0, 0, width, height);

      const isCurrentThemeLight = document.documentElement.getAttribute("data-theme") === "light";

      if (isCurrentThemeLight) {
        // ====================================================================
        // PATH A: GHIBLI LIGHT MODE UNIVERSE (DIRECTION A: THE HORIZON)
        // ====================================================================

        // 1. Azure Summer Ghibli Sky & Horizon Transition
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.85);
        skyGrad.addColorStop(0, "rgba(89, 162, 220, 0.24)");    // Vibrant summer sky top
        skyGrad.addColorStop(0.30, "rgba(148, 210, 242, 0.14)"); // Cerulean mid-sky
        skyGrad.addColorStop(0.65, "rgba(224, 240, 245, 0.06)"); // Soft horizon mist
        skyGrad.addColorStop(1, "rgba(245, 239, 235, 0)");       // Fades into warm linen parchment
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, height);

        // 2. Dappled Komorebi Sunbeam Rays (Top-Left Morning Sun Origin)
        if (!prefersReducedMotion) {
          const sunX = width * 0.10;
          const sunY = -40;
          const rayCount = 4;
          for (let r = 0; r < rayCount; r++) {
            const rayAngle = 0.42 + r * 0.16 + Math.sin(time * 0.35 + r) * 0.025;
            const rayLength = height * 1.15;
            const raySpread = 0.09 + r * 0.015;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(sunX, sunY);
            ctx.lineTo(
              sunX + Math.cos(rayAngle - raySpread) * rayLength,
              sunY + Math.sin(rayAngle - raySpread) * rayLength
            );
            ctx.lineTo(
              sunX + Math.cos(rayAngle + raySpread) * rayLength,
              sunY + Math.sin(rayAngle + raySpread) * rayLength
            );
            ctx.closePath();

            const rayGrad = ctx.createRadialGradient(sunX, sunY, 30, sunX + 400, sunY + 500, rayLength);
            rayGrad.addColorStop(0, "rgba(255, 248, 220, 0.14)");
            rayGrad.addColorStop(0.45, "rgba(250, 238, 200, 0.055)");
            rayGrad.addColorStop(1, "rgba(245, 239, 235, 0)");
            ctx.fillStyle = rayGrad;
            ctx.fill();
            ctx.restore();
          }
        }

        // 3. Volumetric Anime Cumulus Clouds (Kazuo Oga style)
        if (!prefersReducedMotion) {
          for (let c = 0; c < clouds.length; c++) {
            const cloud = clouds[c];
            cloud.x += cloud.speed;
            const cloudWidth = 140 * cloud.scale;

            if (cloud.x - cloudWidth > width) {
              cloud.x = -cloudWidth - 60;
              cloud.y = height * (0.04 + Math.random() * 0.22);
            }

            ctx.save();
            ctx.translate(cloud.x, cloud.y);
            ctx.scale(cloud.scale, cloud.scale);

            // A. Base shadow puffs (Periwinkle-sage watercolor underside)
            ctx.fillStyle = `rgba(165, 195, 218, ${cloud.opacity * 0.32})`;
            for (let p = 0; p < cloud.puffs.length; p++) {
              const puff = cloud.puffs[p];
              ctx.beginPath();
              ctx.arc(puff.dx, puff.dy + 8, puff.r * 1.05, 0, Math.PI * 2);
              ctx.fill();
            }

            // B. Sunlit cloud highlight puffs (Warm ivory-white crests)
            ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity * 0.72})`;
            for (let p = 0; p < cloud.puffs.length; p++) {
              const puff = cloud.puffs[p];
              ctx.beginPath();
              ctx.arc(puff.dx, puff.dy, puff.r, 0, Math.PI * 2);
              ctx.fill();
            }

            // C. Secondary soft inner glow
            ctx.fillStyle = `rgba(255, 252, 245, ${cloud.opacity * 0.45})`;
            for (let p = 0; p < cloud.puffs.length; p++) {
              const puff = cloud.puffs[p];
              ctx.beginPath();
              ctx.arc(puff.dx - 2, puff.dy - 3, puff.r * 0.75, 0, Math.PI * 2);
              ctx.fill();
            }

            ctx.restore();
          }
        }

        // 4. Rolling Summer Hill Silhouettes (Kazuo Oga Stepped Countryside Slopes)
        ctx.save();
        // A. Distant misty sage-green ridge
        ctx.fillStyle = "rgba(91, 140, 120, 0.045)";
        ctx.beginPath();
        ctx.moveTo(0, height * 0.68);
        ctx.bezierCurveTo(
          width * 0.28,
          height * 0.64,
          width * 0.62,
          height * 0.72,
          width,
          height * 0.66
        );
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();

        // B. Midground terraced rice-paddy hill
        ctx.fillStyle = "rgba(42, 87, 65, 0.032)";
        ctx.beginPath();
        ctx.moveTo(0, height * 0.76);
        ctx.bezierCurveTo(
          width * 0.35,
          height * 0.72,
          width * 0.72,
          height * 0.80,
          width,
          height * 0.75
        );
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // 5. Wind-Blown Summer Leaves & Petals
        if (!prefersReducedMotion) {
          for (let l = 0; l < leaves.length; l++) {
            const leaf = leaves[l];
            leaf.x += leaf.vx + Math.sin(time * 1.4 + leaf.phase) * 0.45;
            leaf.y += leaf.vy + Math.cos(time * 0.9 + leaf.phase) * 0.25;
            leaf.angle += leaf.spin;

            // Mouse air-wake repulsion
            if (mouse.active) {
              const dx = leaf.x - mouse.x;
              const dy = leaf.y - mouse.y;
              const distSq = dx * dx + dy * dy;
              if (distSq < 10000 && distSq > 0.1) {
                const dist = Math.sqrt(distSq);
                const force = (1 - dist / 100) * 1.6;
                leaf.x += (dx / dist) * force;
                leaf.y += (dy / dist) * force;
              }
            }

            // Wrap around edges
            if (leaf.x > width + 20) leaf.x = -20;
            if (leaf.y > height + 20) {
              leaf.y = -20;
              leaf.x = Math.random() * width;
            }

            ctx.save();
            ctx.translate(leaf.x, leaf.y);
            ctx.rotate(leaf.angle);
            ctx.fillStyle = leaf.color;

            if (leaf.isPetal) {
              // Soft rounded flower petal
              ctx.beginPath();
              ctx.ellipse(0, 0, leaf.size, leaf.size * 0.6, 0, 0, Math.PI * 2);
              ctx.fill();
            } else {
              // Pointed willow / cedar leaf with delicate central spine
              ctx.beginPath();
              ctx.moveTo(-leaf.size, 0);
              ctx.quadraticCurveTo(0, -leaf.size * 0.48, leaf.size, 0);
              ctx.quadraticCurveTo(0, leaf.size * 0.48, -leaf.size, 0);
              ctx.fill();

              ctx.strokeStyle = "rgba(255, 255, 255, 0.42)";
              ctx.lineWidth = 0.55;
              ctx.beginPath();
              ctx.moveTo(-leaf.size * 0.7, 0);
              ctx.lineTo(leaf.size * 0.7, 0);
              ctx.stroke();
            }

            ctx.restore();
          }
        }

        // 6. Interactive Rain Puddle with Concentric Ripples (Reference 3)
        if (!prefersReducedMotion) {
          // Ambient gentle raindrop intervals in the lower ground pool
          if (time - lastAmbientRippleTime > 2.6) {
            lastAmbientRippleTime = time;
            const rx = width * (0.12 + Math.random() * 0.76);
            const ry = height * (0.55 + Math.random() * 0.38);
            spawnRipple(rx, ry, 32 + Math.random() * 26, 0.38);
          }

          for (let r = ripples.length - 1; r >= 0; r--) {
            const rip = ripples[r];
            rip.radius += rip.speed;
            rip.alpha = Math.max(0, rip.alpha - 0.0042);

            if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
              ripples.splice(r, 1);
              continue;
            }

            ctx.save();
            // Foreshortened ground perspective ellipse (0.42 aspect ratio)
            // Primary outer wave ring
            ctx.strokeStyle = `rgba(42, 87, 65, ${rip.alpha * 0.72})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.ellipse(rip.x, rip.y, rip.radius, rip.radius * 0.42, 0, 0, Math.PI * 2);
            ctx.stroke();

            // Secondary inner reflection ring
            if (rip.radius > 7) {
              ctx.strokeStyle = `rgba(91, 140, 120, ${rip.alpha * 0.44})`;
              ctx.lineWidth = 0.65;
              ctx.beginPath();
              ctx.ellipse(rip.x, rip.y, rip.radius * 0.70, rip.radius * 0.29, 0, 0, Math.PI * 2);
              ctx.stroke();
            }

            // Droplet bead / splash crown when freshly born
            if (rip.radius < 6) {
              ctx.fillStyle = `rgba(220, 242, 230, ${rip.alpha * 0.85})`;
              ctx.beginPath();
              ctx.arc(rip.x, rip.y - 1, 1.3, 0, Math.PI * 2);
              ctx.fill();
            }

            ctx.restore();
          }
        }

      } else {
        // In Dark Mode: ReactBits Threads handles the background animation on pure pitch black (#000000)
        // Clear canvas completely so pitch black shines through 100% cleanly with zero washed-out haze
        ctx.clearRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("click", handleClick);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Procedural Analog Washi Paper Grain (Tactile paper texture strictly for Light Mode only) */}
      {isLightMode && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.032] mix-blend-multiply transition-opacity duration-300"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
      {/* 2. Living Ambient Canvas (Ghibli Countryside Horizon in Light Mode; Cosmic Wave Lattice in Dark Mode) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 block w-full h-full"
      />
    </div>
  );
}

export default AtmosphericBackground;
