"use client";

import React, { useEffect, useRef } from "react";

interface StrandsCanvasProps {
  isDarkMode?: boolean;
  isHovered?: boolean;
  strandCount?: number;
  className?: string;
}

interface Strand {
  baseY: number;
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
  lineWidth: number;
  alpha: number;
}

export function StrandsCanvas({
  isDarkMode = true,
  isHovered = false,
  strandCount = 4,
  className = "",
}: StrandsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animIdRef = useRef<number | null>(null);
  const speedRef = useRef(1.0);
  const targetSpeedRef = useRef(1.0);

  // Speed lerp on hover
  useEffect(() => {
    targetSpeedRef.current = isHovered ? 2.4 : 1.0;
  }, [isHovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 32);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 32);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resize);

    // Initialize individual harmonic strands
    const strands: Strand[] = Array.from({ length: strandCount }, (_, i) => {
      const normalized = i / Math.max(1, strandCount - 1);
      return {
        baseY: height * (0.32 + normalized * 0.36),
        amplitude: 4 + (i % 2) * 2.5,
        frequency: 0.08 + (i % 3) * 0.04,
        speed: 0.035 + (i % 2) * 0.02,
        phase: (i * Math.PI) / 2,
        lineWidth: i === 1 ? 1.75 : 1.1,
        alpha: 0.45 + (i % 2) * 0.35,
      };
    });

    let time = 0;

    const render = () => {
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.08;
      time += 0.02 * speedRef.current;

      ctx.clearRect(0, 0, width, height);

      // Dark Mode: Cyan -> Mint
      // Light Mode: Forest Sage -> Golden Honey
      const colorStart = isDarkMode ? "0, 240, 255" : "71, 120, 94";
      const colorEnd = isDarkMode ? "0, 255, 163" : "229, 169, 60";

      strands.forEach((strand, idx) => {
        ctx.beginPath();

        const points: Array<{ x: number; y: number }> = [];
        const step = 4;

        for (let x = 0; x <= width; x += step) {
          const edgeDamp = Math.sin((x / width) * Math.PI);
          const y =
            strand.baseY +
            Math.sin(x * strand.frequency + time * strand.speed * 4 + strand.phase) *
              strand.amplitude *
              edgeDamp;

          points.push({ x, y });
        }

        if (points.length > 0) {
          ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
          }
        }

        const grad = ctx.createLinearGradient(0, 0, width, 0);
        const effectiveAlpha = isHovered ? Math.min(1.0, strand.alpha * 1.35) : strand.alpha;

        grad.addColorStop(0, `rgba(${colorStart}, 0)`);
        grad.addColorStop(0.3, `rgba(${colorStart}, ${effectiveAlpha})`);
        grad.addColorStop(0.7, `rgba(${colorEnd}, ${effectiveAlpha})`);
        grad.addColorStop(1, `rgba(${colorEnd}, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = strand.lineWidth;
        ctx.lineCap = "round";

        if (isDarkMode && idx === 1) {
          ctx.shadowColor = `rgba(${colorStart}, 0.8)`;
          ctx.shadowBlur = 6;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.stroke();
      });

      ctx.shadowBlur = 0;
      animIdRef.current = requestAnimationFrame(render);
    };

    animIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, [isDarkMode, isHovered, strandCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
}

export default StrandsCanvas;
