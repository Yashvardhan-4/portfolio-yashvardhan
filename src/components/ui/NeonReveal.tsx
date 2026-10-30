"use client";

import React, { useState, useRef, useEffect } from "react";
import "./NeonReveal.css";

export interface NeonRevealProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  neonColor?: string;
  glowColor?: string;
  beamHeight?: number | string;
  interactive?: boolean;
  flicker?: boolean;
  titleStyle?: "silhouette" | "luminous";
}

export function NeonReveal({
  children,
  title,
  subtitle,
  badge,
  className = "",
  neonColor = "#C084FC",
  glowColor = "#A855F7",
  beamHeight = "340px",
  interactive = true,
  flicker = true,
  titleStyle = "luminous",
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
    "--neon-wash": "rgba(192, 132, 252, 0.48)",
    "--neon-wash-mid": "rgba(147, 51, 234, 0.28)",
    "--neon-wash-deep": "rgba(88, 28, 135, 0.10)",
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      style={{ ...cssVars, minHeight: beamHeight }}
      className={`neon-reveal-wrapper ${className}`}
    >
      {/* 1. The Glowing Neon Light Tube Spanning the Top */}
      <div className={`neon-reveal-tube-container ${flicker ? "neon-hum" : ""}`}>
        <div
          className="neon-reveal-tube"
          style={{
            boxShadow: isHovered
              ? `0 0 6px 3px #ffffff, 0 0 20px 6px ${neonColor}, 0 0 55px 16px ${glowColor}, 0 0 110px 30px ${glowColor}`
              : `0 0 4px 2px #ffffff, 0 0 14px 4px ${neonColor}, 0 0 40px 10px ${glowColor}, 0 0 85px 22px ${glowColor}`,
          }}
        />
      </div>

      {/* 2. Volumetric Downward Illuminating Beam Cone (Image 2) */}
      <div
        className="neon-reveal-beam transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(ellipse 95% 85% at ${beamOffset}% 0%, rgba(216, 70, 239, ${
            isHovered ? "0.52" : "0.44"
          }) 0%, rgba(168, 85, 247, 0.32) 35%, rgba(88, 28, 135, 0.12) 70%, transparent 100%)`,
        }}
      >
        <div className="neon-reveal-rays" />
      </div>

      {/* 3. Revealed Content Container */}
      <div className="relative z-20 w-full flex flex-col items-center pt-12 sm:pt-16 lg:pt-20 px-6">
        {badge && (
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#A855F7]/30 bg-[#1E112A]/60 px-3 py-1 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#E9D5FF] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E879F9] animate-pulse" />
            {badge}
          </span>
        )}

        {title && (
          <h2
            className={`font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-center ${
              titleStyle === "silhouette"
                ? "text-[#120B1E] drop-shadow-[0_-1px_2px_rgba(255,255,255,0.45)] [text-shadow:0_2px_24px_rgba(168,85,247,0.65)]"
                : "text-[#EDEDEF] drop-shadow-[0_4px_24px_rgba(168,85,247,0.5)]"
            }`}
          >
            {title}
          </h2>
        )}

        {subtitle && (
          <p className="mt-3 max-w-xl font-sans text-xs sm:text-sm text-[#D8B4FE] text-center tracking-wide leading-relaxed">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </div>
  );
}

export default NeonReveal;
