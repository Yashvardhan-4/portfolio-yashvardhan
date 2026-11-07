"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Strands from "./Strands";

interface SproutAITriggerProps {
  isOpen: boolean;
  onToggle: () => void;
}

// Tailored palettes matching the portfolio's Quiet Garden theme:
// Dark Mode: Botanical Obsidian + Royal Purple + Lavender + Amethyst Core
const DARK_THEME_STRANDS_PALETTE = [
  "#7C3AED", // Royal violet
  "#A855F7", // Bright purple
  "#C084FC", // Soft lavender
  "#FAF5FF", // Warm starlight core
  "#C084FC", // Electric purple spark
  "#6D28D9", // Deep amethyst
  "#4C1D95", // Obsidian dusk
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
        aria-label={isOpen ? "Close Sprout (Press Escape)" : "Ask Sprout (Press ⌘K)"}
        aria-expanded={isOpen}
        aria-controls="sprout-chat-companion"
        className={`group relative h-12 px-3 sm:px-4 rounded-full border transition-all duration-300 flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95 cursor-pointer backdrop-blur-md shadow-lg ${
          isDarkMode
            ? "bg-[#111714]/90 hover:bg-[#151e19] border-[#23322B] text-[#ECEEE7]"
            : "bg-[#FAFBF7]/95 hover:bg-[#F3F3E9] border-[#D5DEC9] text-[#20352B]"
        }`}
        style={{
          boxShadow: isDarkMode
            ? isOpen
              ? "0 0 24px rgba(52, 211, 153, 0.35), 0 8px 32px rgba(0,0,0,0.8)"
              : isHovered
              ? "0 0 20px rgba(52, 211, 153, 0.25), 0 4px 20px rgba(0,0,0,0.6)"
              : "0 4px 16px rgba(0,0,0,0.5)"
            : isOpen
            ? "0 8px 24px rgba(71, 120, 94, 0.25), 0 2px 6px rgba(0,0,0,0.06)"
            : isHovered
            ? "0 6px 20px rgba(71, 120, 94, 0.18), 0 2px 6px rgba(0,0,0,0.05)"
            : "0 4px 12px rgba(71, 120, 94, 0.1), 0 1px 3px rgba(0,0,0,0.04)",
          transform: isHovered && !isOpen ? "translateY(-1.5px)" : undefined,
        }}
      >
        {/* Left: The Official React Bits <Strands /> Component in compact glass orb */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 pointer-events-none">
            <Strands
              colors={isDarkMode ? DARK_THEME_STRANDS_PALETTE : LIGHT_THEME_STRANDS_PALETTE}
              lightMode={!isDarkMode}
              glass={true}
              glassSize={1.1}
              count={3}
              speed={isHovered ? 1.6 : 0.9}
              energy={isHovered ? 0.85 : 0.65}
              interactive={true}
              clickPulse={true}
              scale={1.05}
              glow={isDarkMode ? 1.2 : 0.8}
            />
          </div>
        </div>

        {/* Center: Friendly Editorial Label */}
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
              isOpen
                ? isDarkMode
                  ? "bg-emerald-400"
                  : "bg-emerald-600"
                : "bg-emerald-500 animate-pulse"
            }`}
          />
          <span className="text-[13px] font-medium tracking-tight">
            {isOpen ? "Close" : "Sprout"}
          </span>
        </div>

        {/* Right: Keyboard Shortcut Hint (Desktop only) */}
        <kbd
          className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono border transition-colors ${
            isDarkMode
              ? "bg-[#18221D] border-[#26372E] text-[#9BA89F]"
              : "bg-[#E5EBDD] border-[#D5DEC9] text-[#526356]"
          }`}
        >
          {isOpen ? "ESC" : "⌘K"}
        </kbd>
      </button>
    </aside>
  );
}

export default SproutAITrigger;
