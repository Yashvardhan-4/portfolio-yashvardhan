"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface NeonButtonProps extends HTMLMotionProps<"a"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "subtle";
  icon?: React.ReactNode;
  accentColor?: string;
  className?: string;
}

export function NeonButton({
  children,
  variant = "primary",
  icon,
  accentColor = "#A855F7",
  className = "",
  href,
  ...props
}: NeonButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const isPrimary = variant === "primary";

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden px-5 py-2.5 font-sans text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7] ${
        isPrimary
          ? "text-[#EDEDEF] bg-[#0E1015]/90 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.12)] hover:shadow-[0_0_30px_rgba(168,85,247,0.28)]"
          : "text-[#94A3B8] bg-[#0A0D14]/60 backdrop-blur-sm hover:text-[#EDEDEF]"
      } ${className}`}
      {...props}
    >
      {/* 1. Subtle glowing hairline border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-none border border-[#1E2430] transition-colors duration-300 group-hover:border-[#A855F7]/50"
      />

      {/* 2. Interactive Spotlight Glow following cursor */}
      {isHovered && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.22), transparent 70%)`,
          }}
        />
      )}

      {/* 3. Refined electric top-rail beam */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#A855F7] to-transparent opacity-35 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">
        <span>{children}</span>
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            {icon}
          </span>
        )}
      </span>
    </motion.a>
  );
}

export default NeonButton;
