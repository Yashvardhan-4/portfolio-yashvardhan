"use client";

import React, { useState, useRef, useEffect } from "react";
import "./NeonReveal.css";

export interface NeonRevealProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  neonColor?: string;
  glowColor?: string;
  beamHeight?: number | string;
  interactive?: boolean;
  flicker?: boolean;
}

export function NeonReveal({
  children,
  title,
  className = "",
  neonColor = "#C084FC",
  glowColor = "#A855F7",
  beamHeight = "440px",
  interactive = true,
  flicker = true,
}: NeonRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [beamOffset, setBeamOffset] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!interactive) return;

    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
      setBeamOffset(Math.max(20, Math.min(80, relativeX)));
    };

    const handlePointerEnter = () => setIsHovered(true);
    const handlePointerLeave = () => {
      setIsHovered(false);
      setBeamOffset(50);
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerenter", handlePointerEnter);
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerenter", handlePointerEnter);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [interactive]);

  const cssVars = {
    "--neon-glow": neonColor,
    "--neon-core": glowColor,
    "--neon-haze": glowColor,
    "--neon-wash": "rgba(168, 85, 247, 0.38)",
    "--neon-wash-mid": "rgba(147, 51, 234, 0.18)",
    "--neon-wash-deep": "rgba(88, 28, 135, 0.05)",
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      style={{ ...cssVars, minHeight: beamHeight }}
      className={`neon-reveal-wrapper ${className}`}
    >
      {/* 1. The Glowing Neon Light Tube */}
      <div className={`neon-reveal-tube-container ${flicker ? "neon-hum" : ""}`}>
        <div
          className="neon-reveal-tube"
          style={{
            boxShadow: isHovered
              ? `0 0 5px 2px #ffffff, 0 0 16px 4px ${neonColor}, 0 0 42px 12px ${glowColor}, 0 0 90px 24px ${glowColor}`
              : undefined,
          }}
        />
      </div>

      {/* 2. Volumetric Downward Illuminating Beam Cone */}
      <div
        className="neon-reveal-beam transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(ellipse 90% 75% at ${beamOffset}% 0%, rgba(192, 132, 252, ${
            isHovered ? "0.45" : "0.36"
          }) 0%, rgba(147, 51, 234, 0.18) 40%, rgba(88, 28, 135, 0.05) 75%, transparent 100%)`,
        }}
      >
        <div className="neon-reveal-rays" />
      </div>

      {/* 3. Revealed Content Container */}
      <div className="relative z-20 w-full flex flex-col items-center pt-16 sm:pt-20 px-6">
        {title && (
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#EDEDEF] drop-shadow-[0_4px_16px_rgba(168,85,247,0.35)] text-center">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}

export default NeonReveal;
