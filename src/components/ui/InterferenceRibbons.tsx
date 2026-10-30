"use client";

import React, { useEffect, useRef } from "react";
import "./InterferenceRibbons.css";

export interface InterferenceRibbonsProps {
  strandCount?: number;
  ribbonCount?: number;
  baseColor?: string;
  accentColor?: string;
  highlightColor?: string;
  speed?: number;
  twist?: number;
  amplitude?: number;
  frequency?: number;
  opacity?: number;
  className?: string;
}

export function InterferenceRibbons({
  strandCount = 38,
  ribbonCount = 3,
  baseColor = "#7E22CE",
  accentColor = "#C084FC",
  highlightColor = "#38BDF8",
  speed = 0.8,
  twist = 1.4,
  amplitude = 65,
  frequency = 0.0035,
  opacity = 0.45,
  className = "",
}: InterferenceRibbonsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; tx: number; ty: number }>({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handlePointerMove = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth - 0.5) * 80;
      mouseRef.current.ty = (e.clientY / window.innerHeight - 0.5) * 60;
    };
    window.addEventListener("mousemove", handlePointerMove);

    let time = 0;

    const render = () => {
      time += 0.012 * speed;

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.05;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Render multiple interwoven ribbons of fine wire filaments
      for (let r = 0; r < ribbonCount; r++) {
        const ribbonOffset = (r / ribbonCount) * Math.PI * 2;
        const centerY = h * 0.45 + Math.sin(time * 0.7 + ribbonOffset) * 40 + mouseRef.current.y * (r + 1) * 0.4;
        const centerXOffset = mouseRef.current.x * (r + 1) * 0.3;

        for (let s = 0; s < strandCount; s++) {
          const strandFrac = s / strandCount; // 0 to 1
          const phase = strandFrac * Math.PI * twist + ribbonOffset + time;
          const spreadOffset = (strandFrac - 0.5) * 110;

          ctx.beginPath();

          // Choose gradient color based on strand & ribbon
          let strokeStyle = accentColor;
          if (s % 3 === 0) strokeStyle = highlightColor;
          else if (s % 2 === 0) strokeStyle = baseColor;

          ctx.strokeStyle = strokeStyle;
          ctx.lineWidth = 1.0;
          ctx.globalAlpha = opacity * (1 - Math.abs(strandFrac - 0.5) * 1.2);

          const step = 20;
          for (let x = -40; x <= w + 40; x += step) {
            // Harmonic wave interference formula
            const wave1 = Math.sin(x * frequency + phase) * amplitude;
            const wave2 = Math.cos(x * frequency * 1.8 - phase * 0.6) * (amplitude * 0.65);
            const wave3 = Math.sin(x * frequency * 0.5 + time * 0.3) * (amplitude * 0.4);

            const y = centerY + wave1 + wave2 + wave3 + spreadOffset * Math.cos(x * 0.002 + phase);

            if (x === -40) {
              ctx.moveTo(x + centerXOffset, y);
            } else {
              ctx.lineTo(x + centerXOffset, y);
            }
          }

          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, [strandCount, ribbonCount, baseColor, accentColor, highlightColor, speed, twist, amplitude, frequency, opacity]);

  return (
    <div className={`interference-ribbons-wrapper ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="interference-ribbons-canvas" />
    </div>
  );
}

export default InterferenceRibbons;
