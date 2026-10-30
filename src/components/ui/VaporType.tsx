"use client";

import React, { useEffect, useRef, useState } from "react";
import "./VaporType.css";

export interface VaporTypeProps {
  words: string[];
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string | number;
  fontStyle?: "normal" | "italic";
  color?: string;
  vaporColor?: string;
  glowColor?: string;
  interval?: number; // Time held in solid state
  className?: string;
  interactive?: boolean;
}

interface VaporParticle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  phase: number;
  active: boolean;
  color: string;
}

export function VaporType({
  words,
  fontFamily = "'Instrument Serif', serif",
  fontSize = 76,
  fontWeight = "400",
  fontStyle = "normal",
  color = "#EDEDEF",
  vaporColor = "#E9D5FF",
  glowColor = "#C084FC",
  interval = 2800,
  className = "",
  interactive = true,
}: VaporTypeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordIndexRef = useRef(0);
  const [currentWord, setCurrentWord] = useState(words[0] || "");

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let rafId: number;
    let particles: VaporParticle[] = [];
    let state: "condensing" | "solid" | "evaporating" = "condensing";
    let stateTimer = performance.now();
    let textWidth = 0;
    let textHeight = 0;
    let dpr = 1;
    let currentRenderWord = words[wordIndexRef.current] || "";
    let mouse = { x: -999, y: -999, active: false };

    // Offscreen canvas for rasterizing text and extracting glyph pixel coordinates
    const offCanvas = document.createElement("canvas");
    const offCtx = offCanvas.getContext("2d", { willReadFrequently: true })!;

    // Compute responsive font size based on container client width
    const getResponsiveFontSize = () => {
      const containerWidth = container.clientWidth || window.innerWidth || 1200;
      if (containerWidth < 480) {
        return Math.min(fontSize, Math.max(34, containerWidth * 0.11));
      } else if (containerWidth < 768) {
        return Math.min(fontSize, Math.max(48, containerWidth * 0.08));
      }
      return fontSize;
    };

    const sampleWord = async (word: string) => {
      if (typeof document !== "undefined" && document.fonts) {
        try {
          await document.fonts.ready;
        } catch {
          // Fallback if fonts.ready fails
        }
      }

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const actualFontSize = getResponsiveFontSize();
      const fontSpec = `${fontStyle} ${fontWeight} ${actualFontSize * dpr}px ${fontFamily}`;

      offCtx.font = fontSpec;
      const textMetrics = offCtx.measureText(word);
      textWidth = Math.ceil(textMetrics.width) + 30 * dpr;
      textHeight = Math.ceil(actualFontSize * 1.5 * dpr);

      offCanvas.width = textWidth;
      offCanvas.height = textHeight;

      // Ensure canvas has extra margin for vapor particles drifting up and right
      const canvasW = textWidth + 140 * dpr;
      const canvasH = textHeight + 90 * dpr;

      canvas.width = canvasW;
      canvas.height = canvasH;
      canvas.style.width = `${canvasW / dpr}px`;
      canvas.style.height = `${canvasH / dpr}px`;

      offCtx.font = fontSpec;
      offCtx.fillStyle = "#ffffff";
      offCtx.textBaseline = "middle";
      const startX = 20 * dpr;
      const startY = textHeight / 2 + 50 * dpr; // Leave room above for drifting vapor
      offCtx.fillText(word, startX, startY);

      const imgData = offCtx.getImageData(0, 0, textWidth, textHeight + 50 * dpr);
      const data = imgData.data;
      const step = Math.max(2, Math.floor(2 * dpr));
      const newParticles: VaporParticle[] = [];

      for (let y = 0; y < imgData.height; y += step) {
        for (let x = 0; x < textWidth; x += step) {
          const idx = (y * textWidth + x) * 4;
          const alpha = data[idx + 3];
          if (alpha > 140 && Math.random() < 0.65) {
            const originX = x;
            const originY = y;
            // Angle drifting up and to the right per reference image
            const driftAngle = -Math.PI * 0.35 + (Math.random() - 0.5) * 0.6;
            const speed = 25 * dpr + Math.random() * 45 * dpr;

            const isVaporHue = Math.random() < 0.35;
            newParticles.push({
              originX,
              originY,
              x: originX,
              y: originY,
              vx: Math.cos(driftAngle) * speed,
              vy: Math.sin(driftAngle) * speed,
              size: (0.75 + Math.random() * 1.3) * dpr,
              alpha: 0,
              maxAlpha: 0.4 + Math.random() * 0.55,
              phase: Math.random() * Math.PI * 2,
              active: false,
              color: isVaporHue ? vaporColor : "#FFFFFF",
            });
          }
        }
      }

      particles = newParticles;
      state = "condensing";
      stateTimer = performance.now();
      currentRenderWord = word;
      setCurrentWord(word);
    };

    sampleWord(words[wordIndexRef.current]);

    const handlePointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min(0.04, (time - lastTime) / 1000);
      lastTime = time;
      const elapsed = time - stateTimer;
      const actualFontSize = getResponsiveFontSize();
      const fontSpec = `${fontStyle} ${fontWeight} ${actualFontSize * dpr}px ${fontFamily}`;
      const startX = 20 * dpr;
      const startY = textHeight / 2 + 50 * dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (state === "condensing") {
        const CONDENSE_DURATION = 1100;
        const progress = Math.min(1, elapsed / CONDENSE_DURATION);
        // Condensation wavefront sweeps from left to right
        const revealX = startX + progress * textWidth;

        // 1. Draw solid materialized text behind the wavefront
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, revealX, canvas.height);
        ctx.clip();

        ctx.font = fontSpec;
        ctx.fillStyle = color;
        ctx.textBaseline = "middle";
        ctx.fillText(currentRenderWord, startX, startY);
        ctx.restore();

        // 2. Draw incoming converging vapor particles at wavefront
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (p.originX >= revealX - 40 * dpr && p.originX <= revealX + 60 * dpr) {
            const distFromWave = 1 - Math.abs(p.originX - revealX) / (60 * dpr);
            const particleAlpha = Math.max(0, distFromWave) * p.maxAlpha;

            // Converging spring towards glyph contour
            const spawnX = p.originX + Math.sin(p.phase + time * 0.005) * 20 * dpr;
            const spawnY = p.originY - Math.cos(p.phase) * 25 * dpr;
            p.x += (p.originX - p.x) * 12 * dt;
            p.y += (p.originY - p.y) * 12 * dt;

            ctx.fillStyle = p.color;
            ctx.globalAlpha = particleAlpha;
            ctx.beginPath();
            ctx.arc(p.x || spawnX, p.y || spawnY, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1.0;

        if (progress >= 1) {
          state = "solid";
          stateTimer = time;
          // Reset particle origins for evaporation phase
          for (let i = 0; i < particles.length; i++) {
            particles[i].x = particles[i].originX;
            particles[i].y = particles[i].originY;
            particles[i].active = false;
          }
        }
      } else if (state === "solid") {
        // Fully solid, monumental typography
        ctx.font = fontSpec;
        ctx.fillStyle = color;
        ctx.textBaseline = "middle";

        // Subtle ambient atmospheric glow under letters
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 18 * dpr;
        ctx.fillText(currentRenderWord, startX, startY);
        ctx.shadowBlur = 0; // Reset shadow

        // Occasional ethereal ambient drifting micro-embers (30 motes)
        for (let i = 0; i < Math.min(45, particles.length); i++) {
          const p = particles[i * 8 % particles.length];
          p.phase += dt * 2;
          const driftY = p.originY - Math.abs(Math.sin(p.phase)) * 14 * dpr;
          const driftX = p.originX + Math.cos(p.phase * 0.7) * 8 * dpr;

          // Interactive mouse dispersion
          let finalX = driftX;
          let finalY = driftY;
          if (mouse.active) {
            const mdx = driftX - mouse.x;
            const mdy = driftY - mouse.y;
            const dist = Math.hypot(mdx, mdy);
            if (dist < 80 * dpr && dist > 0) {
              const force = (1 - dist / (80 * dpr)) * 25 * dpr;
              finalX += (mdx / dist) * force;
              finalY += (mdy / dist) * force;
            }
          }

          ctx.fillStyle = vaporColor;
          ctx.globalAlpha = 0.25 + Math.sin(p.phase) * 0.15;
          ctx.beginPath();
          ctx.arc(finalX, finalY, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;

        if (elapsed > interval) {
          state = "evaporating";
          stateTimer = time;
        }
      } else if (state === "evaporating") {
        const EVAP_DURATION = 1450;
        const progress = Math.min(1, elapsed / EVAP_DURATION);

        // Evaporation wavefront sweeps across the word from right to left per reference image
        // At progress 0: entire word is visible
        // At progress 0.5: left half is solid, right half is dissolved in vapor
        const visibleWidth = startX + textWidth * (1 - progress);

        // 1. Draw remaining solid unevaporated text
        if (visibleWidth > startX) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(0, 0, visibleWidth, canvas.height);
          ctx.clip();

          ctx.font = fontSpec;
          ctx.fillStyle = color;
          ctx.textBaseline = "middle";
          ctx.fillText(currentRenderWord, startX, startY);
          ctx.restore();
        }

        // 2. Activate and update vapor particles breaking off the active wavefront
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          // Particles to the right of visibleWidth become active and drift away
          if (!p.active && p.originX >= visibleWidth - 10 * dpr) {
            p.active = true;
            p.x = p.originX;
            p.y = p.originY;
            p.alpha = p.maxAlpha;
          }

          if (p.active && p.alpha > 0.01) {
            // Upward and rightward aerodynamic curl with turbulence
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.vx += (18 * dpr + Math.sin(p.phase + time * 0.004) * 12 * dpr) * dt;
            p.vy -= (28 * dpr + Math.cos(p.phase * 0.8) * 8 * dpr) * dt;
            p.alpha = Math.max(0, p.alpha - dt * 0.65);

            // Draw drifting vapor particle with luminous core and soft bloom
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            // Soft atmospheric halo
            if (p.alpha > 0.25) {
              ctx.fillStyle = glowColor;
              ctx.globalAlpha = p.alpha * 0.28;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size * 2.6, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
        ctx.globalAlpha = 1.0;

        if (progress >= 1) {
          // Advance to next word
          wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
          sampleWord(words[wordIndexRef.current]);
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const handleResize = () => {
      sampleWord(words[wordIndexRef.current]);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [words, fontFamily, fontSize, fontWeight, fontStyle, color, vaporColor, glowColor, interval, interactive]);

  return (
    <div ref={containerRef} className={`vapor-type-container ${className}`}>
      <canvas ref={canvasRef} className="vapor-type-canvas" />
      <span className="sr-only">{currentWord}</span>
    </div>
  );
}

export default VaporType;
