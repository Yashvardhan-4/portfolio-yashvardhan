"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import "./GravityLetters.css";

export interface GravityLettersProps {
  words?: string[];
  fontSize?: number;
  fontWeight?: number | string;
  fontFamily?: string;
  color?: string;
  highlightColor?: string;
  gravity?: number;
  sliceRadius?: number;
  restitutionDelay?: number;
  className?: string;
}

interface SandParticle {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  isFree: boolean;
  freeTime: number;
  alpha: number;
}

export function GravityLetters({
  words = ["Systems Architect", "Software Engineer"],
  fontSize = 76,
  fontWeight = 800,
  fontFamily = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  color = "#EDEDEF",
  highlightColor = "#C084FC",
  gravity = 0.38,
  sliceRadius = 24,
  restitutionDelay = 1400,
  className = "",
}: GravityLettersProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const currentWord = words[wordIndex % words.length];

  const sliceTrailRef = useRef<Array<{ x: number; y: number; time: number }>>([]);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animId: number;
    let particles: SandParticle[] = [];

    // 1. Measure and rasterize text on offscreen canvas
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const containerW = canvas.parentElement?.clientWidth || window.innerWidth;
    const computedFontSize = Math.min(fontSize, Math.max(38, containerW / (currentWord.length * 0.72)));
    const fontString = `${fontWeight} ${computedFontSize}px ${fontFamily}`;

    const measureCanvas = document.createElement("canvas");
    const measureCtx = measureCanvas.getContext("2d");
    if (!measureCtx) return;

    measureCtx.font = fontString;
    const metrics = measureCtx.measureText(currentWord);
    const textWidth = Math.ceil(metrics.width);
    const textHeight = Math.ceil(computedFontSize * 1.35);

    const padX = 40;
    const padTop = 30;
    const floorHeight = 140; // extra space below text for particles to fall, bounce and pool
    const totalW = textWidth + padX * 2;
    const totalH = textHeight + padTop + floorHeight;

    canvas.width = totalW * dpr;
    canvas.height = totalH * dpr;
    canvas.style.width = `${totalW}px`;
    canvas.style.height = `${totalH}px`;

    ctx.scale(dpr, dpr);

    // Render offscreen to extract glyph pixels
    const off = document.createElement("canvas");
    off.width = totalW;
    off.height = totalH;
    const offCtx = off.getContext("2d");
    if (!offCtx) return;

    offCtx.font = fontString;
    offCtx.fillStyle = "#ffffff";
    offCtx.textBaseline = "middle";
    offCtx.fillText(currentWord, padX, padTop + textHeight * 0.45);

    const imgData = offCtx.getImageData(0, 0, totalW, totalH);
    const pixels = imgData.data;

    const step = computedFontSize > 50 ? 3 : 2;
    for (let py = 0; py < totalH; py += step) {
      for (let px = 0; px < totalW; px += step) {
        const idx = (py * totalW + px) * 4;
        const alpha = pixels[idx + 3];
        if (alpha > 45) {
          const isHighlight = Math.random() < 0.22;
          particles.push({
            homeX: px,
            homeY: py,
            x: px + (Math.random() - 0.5) * 2,
            y: py + (Math.random() - 0.5) * 2,
            vx: 0,
            vy: 0,
            size: Math.random() * 0.9 + 1.2,
            color: isHighlight ? highlightColor : color,
            isFree: false,
            freeTime: 0,
            alpha: alpha / 255,
          });
        }
      }
    }

    const floorY = totalH - 12;
    let time = 0;

    // 2. Animation & Physics Loop
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, totalW, totalH);

      const now = performance.now();

      // Prune slice trail
      sliceTrailRef.current = sliceTrailRef.current.filter((pt) => now - pt.time < 300);

      // Draw slice trail glow
      if (sliceTrailRef.current.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(192, 132, 252, 0.75)";
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "#A855F7";
        ctx.shadowBlur = 12;

        for (let i = 0; i < sliceTrailRef.current.length; i++) {
          const pt = sliceTrailRef.current[i];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.isFree) {
          const elapsed = now - p.freeTime;

          if (elapsed > restitutionDelay) {
            // Magnetic restitution: rise and pour back into home
            const dx = p.homeX - p.x;
            const dy = p.homeY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 4) {
              p.x = p.homeX;
              p.y = p.homeY;
              p.vx = 0;
              p.vy = 0;
              p.isFree = false;
            } else {
              const pull = 0.08 + Math.min(0.2, (elapsed - restitutionDelay) * 0.0002);
              p.vx = p.vx * 0.88 + (dx / dist) * Math.min(dist * 0.25, 14) * pull;
              p.vy = p.vy * 0.88 + (dy / dist) * Math.min(dist * 0.25, 14) * pull;
              p.x += p.vx;
              p.y += p.vy;
            }
          } else {
            // Falling under gravity & bouncing
            p.vy += gravity;
            p.vx *= 0.98;
            p.x += p.vx;
            p.y += p.vy;

            // Bounce on floor
            if (p.y >= floorY) {
              p.y = floorY;
              p.vy = -p.vy * 0.42;
              p.vx += (Math.random() - 0.5) * 1.8;
            }

            // Left / Right bounds
            if (p.x < 4) p.x = 4;
            if (p.x > totalW - 4) p.x = totalW - 4;
          }
        } else {
          // Idle drift & breath
          const driftX = Math.sin(time + p.homeY * 0.05) * 0.4;
          const driftY = Math.cos(time + p.homeX * 0.05) * 0.3;
          p.x = p.homeX + driftX;
          p.y = p.homeY + driftY;
        }

        // Render particle
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // 3. Pointer slice interaction
    const checkSlice = (px: number, py: number) => {
      const now = performance.now();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.isFree) continue;

        const dx = p.x - px;
        const dy = p.y - py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < sliceRadius) {
          // Sliced! Cut pieces fall
          p.isFree = true;
          p.freeTime = now;
          p.vx = (dx / (dist || 1)) * 3.5 + (Math.random() - 0.5) * 3;
          p.vy = (dy / (dist || 1)) * 2 + Math.random() * 2;
        }
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      sliceTrailRef.current.push({ x: px, y: py, time: performance.now() });
      checkSlice(px, py);
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      if (isDraggingRef.current) {
        sliceTrailRef.current.push({ x: px, y: py, time: performance.now() });
        checkSlice(px, py);
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
    };
  }, [currentWord, fontSize, fontWeight, fontFamily, color, highlightColor, gravity, sliceRadius, restitutionDelay]);

  return (
    <div className={`gravity-letters-container ${className}`}>
      <canvas ref={canvasRef} className="gravity-letters-canvas" />
      <div className="gravity-letters-hint">
        <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-ping" />
        <span>Drag / slice through the headline to scatter glyph sand &bull; Watches them pour back</span>
        <button
          type="button"
          onClick={() => setWordIndex((prev) => (prev + 1) % words.length)}
          className="ml-auto text-[#C084FC] hover:text-[#EDEDEF] transition-colors underline underline-offset-4"
        >
          [Switch: {words[(wordIndex + 1) % words.length]}]
        </button>
      </div>
    </div>
  );
}

export default GravityLetters;
