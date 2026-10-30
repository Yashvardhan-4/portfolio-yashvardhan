"use client";

import React from "react";
import { ElectricLogo, LETTER_Y } from "@/components/ui/ElectricLogo";

interface AnimatedLogoProps {
  className?: string;
  size?: number;
}

export function AnimatedLogo({ className = "", size = 44 }: AnimatedLogoProps) {
  return (
    <a
      href="/"
      aria-label="Yashvardhan Borude Portfolio Home"
      className={`group relative flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer select-none bg-transparent ${className}`}
      style={{ width: size, height: size }}
    >
      <ElectricLogo
        src={LETTER_Y}
        color="#FFFFFF"
        glowColor="#C084FC"
        scale={0.64}
        intensity={1.1}
        glow={0.7}
        thickness={1.3}
        strands={3}
        bend={0.55}
        crackle={1.2}
        arcs={1}
        flicker={0.35}
        speed={1.8}
        interactive={true}
        cursorIntensity={0.8}
        cursorRadius={60}
        theme="dark"
        className="w-full h-full pointer-events-auto"
      />
    </a>
  );
}

export default AnimatedLogo;
