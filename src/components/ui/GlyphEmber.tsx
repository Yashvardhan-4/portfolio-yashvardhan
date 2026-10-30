"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import "./GlyphEmber.css";

export interface GlyphEmberProps {
  text?: string;
  fontSize?: number;
  fontWeight?: number | string;
  fontFamily?: string;
  color?: string;
  emberColors?: string[];
  burnStart?: number; // 0 to 1, where the disintegration begins (default 0.48 matching the 'Inspire' image)
  particleDensity?: number;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

interface EmberParticle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  turbOffset: number;
}

export function GlyphEmber({
  text = "Inspire",
  fontSize = 92,
  fontWeight = 800,
  fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  color = "#FFFFFF",
  emberColors = ["#FFFFFF", "#F1F5F9", "#E2E8F0", "#C084FC", "#A855F7", "#E879F9"],
  burnStart = 0.46,
  particleDensity = 1.0,
  interactive = true,
  className = "",
  style = {},
}: GlyphEmberProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animId: number;
    let particles: EmberParticle[] = [];

    // 1. Measure text dimensions on an off-screen canvas
    const measureCanvas = document.createElement("canvas");
    const measureCtx = measureCanvas.getContext("2d");
    if (!measureCtx) return;

    const fontString = `${fontWeight} ${fontSize}px ${fontFamily}`;
    measureCtx.font = fontString;
    const metrics = measureCtx.measureText(text);

    const textWidth = Math.ceil(metrics.width);
    const textHeight = Math.ceil(fontSize * 1.35);

    // Padding for particles drifting up and right
    const padXRight = Math.max(120, textWidth * 0.35);
    const padTop = Math.max(60, textHeight * 0.45);
    const padBottom = 20;
    const padLeft = 10;

    const totalWidth = textWidth + padLeft + padXRight;
    const totalHeight = textHeight + padTop + padBottom;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = totalWidth * dpr;
    canvas.height = totalHeight * dpr;
    canvas.style.width = `${totalWidth}px`;
    canvas.style.height = `${totalHeight}px`;

    ctx.scale(dpr, dpr);

    // 2. Render text to an offscreen buffer to extract dissolving pixels
    const offCanvas = document.createElement("canvas");
    offCanvas.width = totalWidth;
    offCanvas.height = totalHeight;
    const offCtx = offCanvas.getContext("2d");
    if (!offCtx) return;

    offCtx.font = fontString;
    offCtx.fillStyle = color;
    offCtx.textBaseline = "middle";

    const textX = padLeft;
    const textY = padTop + textHeight * 0.5;
    offCtx.fillText(text, textX, textY);

    const imgData = offCtx.getImageData(0, 0, totalWidth, totalHeight);
    const pixels = imgData.data;

    // Collect candidate pixels in the dissolving region
    const burnEdgeX = textX + textWidth * burnStart;
    const candidatePixels: Array<{ x: number; y: number; alpha: number }> = [];

    const step = 2;
    for (let py = 0; py < totalHeight; py += step) {
      for (let px = 0; px < totalWidth; px += step) {
        const idx = (py * totalWidth + px) * 4;
        const alpha = pixels[idx + 3];
        if (alpha > 40) {
          if (px >= burnEdgeX - 8) {
            candidatePixels.push({ x: px, y: py, alpha: alpha / 255 });
          }
        }
      }
    }

    // 3. Particle Spawner
    const spawnEmber = () => {
      if (candidatePixels.length === 0) return;
      const count = Math.ceil(8 * particleDensity);

      for (let i = 0; i < count; i++) {
        const pt = candidatePixels[Math.floor(Math.random() * candidatePixels.length)];
        // Bias: particles spawn more heavily the closer to the burn edge
        const distFromBurn = (pt.x - burnEdgeX) / (textWidth * (1 - burnStart));
        const chance = Math.max(0.15, distFromBurn + 0.3);
        if (Math.random() > chance) continue;

        const pColor = emberColors[Math.floor(Math.random() * emberColors.length)];
        const size = Math.random() * 1.6 + 0.6; // 0.6px to 2.2px fine sand particles
        const speedMultiplier = 1.0 + Math.random() * 1.5;

        // Velocity biased up and right
        const vx = (Math.random() * 2.2 + 0.6) * speedMultiplier;
        const vy = (-(Math.random() * 1.8 + 0.4)) * speedMultiplier;

        particles.push({
          x: pt.x,
          y: pt.y,
          originX: pt.x,
          originY: pt.y,
          vx,
          vy,
          size,
          alpha: pt.alpha * (Math.random() * 0.4 + 0.6),
          decay: Math.random() * 0.012 + 0.008,
          color: pColor,
          turbOffset: Math.random() * 100,
        });
      }
    };

    // Pre-populate particles so there's an instant stream
    for (let f = 0; f < 35; f++) {
      spawnEmber();
      particles.forEach((p) => {
        p.x += p.vx * 1.2;
        p.y += p.vy * 1.2;
        p.alpha -= p.decay * 0.8;
      });
      particles = particles.filter((p) => p.alpha > 0.02);
    }

    let time = 0;

    // 4. Animation Loop
    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, totalWidth, totalHeight);

      // A. Draw the solid / intact portion of the text
      // We clip to the left of the burn region
      ctx.save();
      ctx.beginPath();
      // Organic serrated clip boundary
      ctx.moveTo(0, 0);
      ctx.lineTo(burnEdgeX, 0);

      // Create an organic ragged erosion edge along the vertical slice
      const segments = 16;
      for (let s = 0; s <= segments; s++) {
        const ySeg = (totalHeight / segments) * s;
        const jitter = Math.sin(s * 1.4 + time * 0.5) * 4 + Math.cos(s * 0.8) * 6;
        ctx.lineTo(burnEdgeX + jitter, ySeg);
      }

      ctx.lineTo(0, totalHeight);
      ctx.closePath();
      ctx.clip();

      ctx.font = fontString;
      ctx.fillStyle = color;
      ctx.textBaseline = "middle";
      ctx.fillText(text, textX, textY);
      ctx.restore();

      // B. Draw intermediate dissolving text with progressive noise & erosion
      ctx.save();
      ctx.beginPath();
      ctx.rect(burnEdgeX - 6, 0, totalWidth - (burnEdgeX - 6), totalHeight);
      ctx.clip();

      // Draw dithered/partially eaten letters in the erosion zone
      const erosionWidth = textWidth * (1 - burnStart);
      for (const pt of candidatePixels) {
        const progress = (pt.x - burnEdgeX) / erosionWidth;
        const noise = (Math.sin(pt.x * 0.4 + pt.y * 0.3) + Math.cos(pt.y * 0.5)) * 0.5 + 0.5;

        // If noise > progress, this pixel is still hanging on
        if (noise > progress * 1.4) {
          const pixelAlpha = Math.max(0, 1 - progress * 1.2) * pt.alpha;
          if (pixelAlpha > 0.05) {
            ctx.fillStyle = color;
            ctx.globalAlpha = pixelAlpha;
            ctx.fillRect(pt.x, pt.y, step, step);
          }
        }
      }
      ctx.restore();

      // C. Spawn new embers & update particle physics
      spawnEmber();

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      ctx.globalAlpha = 1;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Curl / wind turbulence
        const windX = Math.cos(time + p.turbOffset) * 0.35 + 0.6;
        const windY = Math.sin(time * 1.3 + p.turbOffset) * 0.45 - 0.4;

        p.vx += windX * 0.08;
        p.vy += windY * 0.08;

        // Drag
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Interactive mouse wind
        if (mouseActive) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90 && dist > 0) {
            const force = (1 - dist / 90) * 3.5;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0.01 || p.x > totalWidth + 20 || p.y < -20) {
          particles.splice(i, 1);
          continue;
        }

        // Render ember mote
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // 5. Mouse tracking
    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    if (interactive) {
      canvas.addEventListener("mousemove", handlePointerMove);
      canvas.addEventListener("mouseleave", handlePointerLeave);
    }

    return () => {
      cancelAnimationFrame(animId);
      if (interactive) {
        canvas.removeEventListener("mousemove", handlePointerMove);
        canvas.removeEventListener("mouseleave", handlePointerLeave);
      }
    };
  }, [text, fontSize, fontWeight, fontFamily, color, emberColors, burnStart, particleDensity, interactive]);

  return (
    <div className={`glyph-ember-container ${className}`} style={style}>
      <canvas ref={canvasRef} className="glyph-ember-canvas" />
    </div>
  );
}

export default GlyphEmber;
