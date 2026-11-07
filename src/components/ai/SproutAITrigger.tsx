"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Strands from "./Strands";

interface SproutAITriggerProps {
  isOpen: boolean;
  onToggle: () => void;
}

// Tailored palettes matching the portfolio's Quiet Garden theme:
// Dark Mode: Botanical Obsidian + Emerald + Electric Mint + Cyan + Warm White Core
const DARK_THEME_STRANDS_PALETTE = [
  "#059669", // Deep emerald arch
  "#10b981", // Forest mint
  "#34d399", // Vivid mint
  "#f0fdf4", // Warm white core
  "#00f0ff", // Electric cyan spark
  "#0284c7", // Sapphire rim
  "#064e3b", // Deep spruce
];

// Light Mode: Editorial Ghibli Garden + Sage + Warm Amber + Ivory Core
const LIGHT_THEME_STRANDS_PALETTE = [
  "#2d5a40", // Woodland green
  "#47785e", // Sage leaf
  "#e5a93c", // Warm amber sunshine
  "#fcfbf7", // Warm ivory core
  "#52796f", // Eucalyptus mist
  "#354f52", // Slate pine
  "#1b2e23", // Deep bark
];

export function SproutAITrigger({ isOpen, onToggle }: SproutAITriggerProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      aria-label="Sprout Companion Trigger"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none pointer-events-auto"
    >
      <button
        type="button"
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={isOpen ? "Close Sprout companion (Press Escape)" : "Ask Sprout AI (Press ⌘K)"}
        aria-expanded={isOpen}
        aria-controls="sprout-chat-companion"
        title={isOpen ? "Close Sprout (Esc)" : "Ask Sprout (⌘K)"}
        className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-90 cursor-pointer"
        style={{
          filter: isDarkMode
            ? isOpen
              ? "drop-shadow(0 0 20px rgba(0, 240, 255, 0.6)) drop-shadow(0 0 8px rgba(52, 211, 153, 0.4))"
              : isHovered
              ? "drop-shadow(0 0 22px rgba(0, 240, 255, 0.5)) drop-shadow(0 6px 18px rgba(0, 0, 0, 0.8))"
              : "drop-shadow(0 4px 14px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 8px rgba(52, 211, 153, 0.2))"
            : isOpen
            ? "drop-shadow(0 0 16px rgba(71, 120, 94, 0.45)) drop-shadow(0 6px 16px rgba(0, 0, 0, 0.12))"
            : isHovered
            ? "drop-shadow(0 0 18px rgba(71, 120, 94, 0.35)) drop-shadow(0 6px 14px rgba(0, 0, 0, 0.1))"
            : "drop-shadow(0 4px 12px rgba(71, 120, 94, 0.2)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.06))",
          transform: isHovered && !isOpen ? "scale(1.06)" : undefined,
        }}
      >
        {/* The Strands Ball itself IS the button */}
        <div className="w-full h-full rounded-full overflow-hidden">
          <Strands
            colors={isDarkMode ? DARK_THEME_STRANDS_PALETTE : LIGHT_THEME_STRANDS_PALETTE}
            lightMode={!isDarkMode}
            glass={true}
            glassSize={1.15}
            count={3}
            speed={isHovered ? 1.6 : 0.9}
            energy={isHovered ? 0.9 : 0.65}
            interactive={true}
            clickPulse={true}
            scale={1.1}
            glow={isDarkMode ? 1.3 : 0.9}
          />
        </div>

        {/* Minimal live status beacon on top-right rim */}
        <span
          className={`absolute top-0.5 right-0.5 w-3 h-3 rounded-full border-2 transition-colors ${
            isDarkMode ? "border-[#090D0B]" : "border-[#F3F3E9]"
          } ${
            isOpen
              ? isDarkMode
                ? "bg-cyan-400 shadow-[0_0_8px_#00F0FF]"
                : "bg-emerald-600"
              : "bg-emerald-500 animate-pulse shadow-[0_0_6px_#10B981]"
          }`}
          aria-hidden="true"
        />
      </button>
    </aside>
  );
}

export default SproutAITrigger;
