"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  rings: number;
}

export function RainRippleEffect() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Only active in Light Mode (Ghibli Petrichor mode)
    if (theme !== "light") {
      ripplesRef.current = [];
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const spawnRipple = (x: number, y: number) => {
      ripplesRef.current.push({
        x,
        y,
        radius: 2,
        maxRadius: Math.random() * 25 + 40,
        alpha: 0.45,
        speed: 1.25,
        rings: 2,
      });

      if (!animFrameRef.current) {
        render();
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Avoid firing on fast drags or buttons if needed, but smooth click ripples on canvas feel organic
      spawnRipple(e.clientX, e.clientY);
    };
    window.addEventListener("click", handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += r.speed;
        r.alpha *= 0.94;

        if (r.alpha <= 0.01 || r.radius >= r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        // Concentric expanding water rings (Ghibli Pond style)
        for (let ring = 0; ring < r.rings; ring++) {
          const ringOffset = ring * 14;
          const currentRadius = Math.max(0, r.radius - ringOffset);
          if (currentRadius <= 0) continue;

          ctx.beginPath();
          ctx.arc(r.x, r.y, currentRadius, 0, Math.PI * 2);
          // Soft slate petrichor blue/emerald water tone
          ctx.strokeStyle = `rgba(59, 130, 150, ${r.alpha * (ring === 0 ? 1 : 0.65)})`;
          ctx.lineWidth = 1.25;
          ctx.stroke();
        }
      }

      if (ripplesRef.current.length > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        animFrameRef.current = null;
      }
    };

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [theme]);

  if (theme !== "light") return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
}

export default RainRippleEffect;
