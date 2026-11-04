"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface AnimatedSVGUnderlineProps {
  children: React.ReactNode;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
}

export function AnimatedSVGUnderline({
  children,
  strokeColor = "#A855F7",
  strokeWidth = 1.8,
  className = "",
}: AnimatedSVGUnderlineProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  // Organic, subtle calligraphic underline path
  const pathD =
    "M2 12C35 8 70 5 110 7C145 8.8 180 13 215 11C240 9.5 270 7 298 9";

  return (
    <span
      className={`relative inline-flex flex-col group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
        {children}
      </span>
      <span className="absolute -bottom-1 left-0 right-0 h-2.5 overflow-visible pointer-events-none z-0">
        <svg
          viewBox="0 0 300 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <motion.path
            d={pathD}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isHovered ? 1 : 0,
              opacity: isHovered ? 0.85 : 0,
            }}
            transition={{
              duration: prefersReduced ? 0.01 : 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </svg>
      </span>
    </span>
  );
}

export default AnimatedSVGUnderline;
