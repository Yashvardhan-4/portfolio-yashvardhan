"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface HoverHighlighterProps {
  children: React.ReactNode;
  color?: string; // Marker color, default: #A855F7
  opacity?: number; // 0-100, default: 28
  height?: number; // Height % of text line, default: 38
  className?: string;
}

export function HoverHighlighter({
  children,
  color = "var(--accent)",
  opacity = 32,
  height = 36,
  className = "",
}: HoverHighlighterProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  const lightColor = `color-mix(in srgb, ${color} ${opacity}%, transparent)`;
  const darkColor = color;
  const gradient = `linear-gradient(to right, ${lightColor} 0%, ${lightColor} calc(100% - 6px), ${darkColor} calc(100% - 6px), ${darkColor} 100%)`;

  return (
    <span
      className={`relative inline-block cursor-default font-medium text-[var(--fg)] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden="true"
        className="absolute left-0 bottom-[10%] rounded-sm pointer-events-none z-0"
        style={{
          height: `${height}%`,
          background: gradient,
          originX: 0,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          duration: prefersReduced ? 0.01 : 0.42,
          ease: [0.25, 1, 0.5, 1],
        }}
      />
    </span>
  );
}

export default HoverHighlighter;
