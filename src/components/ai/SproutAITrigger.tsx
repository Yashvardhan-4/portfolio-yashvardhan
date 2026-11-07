"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { StrandsCanvas } from "./StrandsCanvas";

interface SproutAITriggerProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SproutAITrigger({ isOpen, onToggle }: SproutAITriggerProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      aria-label="Sprout AI Companion Trigger"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none pointer-events-auto"
    >
      <button
        type="button"
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={
          isOpen
            ? "Close Sprout AI Companion (Press Escape)"
            : "Open Sprout AI Companion (Press ⌘K)"
        }
        aria-expanded={isOpen}
        aria-controls="sprout-ai-command-hud"
        className={`group relative h-12 px-3.5 rounded-full border transition-all duration-300 flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-95 cursor-pointer backdrop-blur-xl ${
          isDarkMode
            ? "bg-[#0A0D14]/90 border-[#1E2638] text-[#F1F4F9]"
            : "bg-[#FAFBF7]/90 border-[#DFE2D2] text-[#1F2421]"
        }`}
        style={{
          boxShadow: isDarkMode
            ? isOpen
              ? "0 0 24px rgba(0, 240, 255, 0.4), 0 0 8px rgba(0, 255, 163, 0.3)"
              : isHovered
              ? "0 0 28px rgba(0, 240, 255, 0.35), 0 4px 20px rgba(0,0,0,0.8)"
              : "0 0 16px rgba(0, 240, 255, 0.15), 0 2px 10px rgba(0,0,0,0.6)"
            : isOpen
            ? "0 6px 20px rgba(71, 120, 94, 0.3)"
            : isHovered
            ? "0 8px 24px rgba(71, 120, 94, 0.22), 0 2px 6px rgba(0,0,0,0.06)"
            : "0 4px 14px rgba(71, 120, 94, 0.12), 0 1px 3px rgba(0,0,0,0.04)",
          transform: isHovered && !isOpen ? "translateY(-1.5px)" : undefined,
        }}
      >
        {/* Left Portal: Miniature Strands Flowing Canvas */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center border border-white/10">
          <div className="absolute inset-0">
            <StrandsCanvas
              isDarkMode={isDarkMode}
              isHovered={isHovered || isOpen}
              strandCount={4}
            />
          </div>

          {/* Central Spectral Core Spark */}
          <span
            className={`relative z-10 text-xs font-mono transition-transform duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            style={{
              color: isDarkMode ? "#00F0FF" : "#47785E",
              textShadow: isDarkMode ? "0 0 8px #00F0FF" : undefined,
            }}
          >
            {isOpen ? "✕" : "✦"}
          </span>
        </div>

        {/* Middle: Monospace Label & Live Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300 ${
                isOpen
                  ? isDarkMode
                    ? "bg-cyan-400"
                    : "bg-emerald-600"
                  : "bg-emerald-500 animate-pulse"
              }`}
            />
            <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[var(--fg)]">
              {isOpen ? "Close" : "Sprout AI"}
            </span>
          </div>

          {/* Right: Keyboard Shortcut Badge */}
          <kbd
            className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono border transition-colors ${
              isDarkMode
                ? "bg-[#141B26] border-[#223048] text-[#8E9CB0]"
                : "bg-[#EDF0E8] border-[#D6DDD0] text-[#556053]"
            }`}
          >
            {isOpen ? "ESC" : "⌘K"}
          </kbd>
        </div>
      </button>
    </aside>
  );
}

export default SproutAITrigger;
