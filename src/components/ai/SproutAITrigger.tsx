"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

interface SproutAITriggerProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SproutAITrigger({ isOpen, onToggle }: SproutAITriggerProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isHovered, setIsHovered] = useState(false);
  const [hasNotified, setHasNotified] = useState(false);

  // Pulse notification badge briefly on first page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasNotified(true);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center select-none pointer-events-auto">
      {/* Sleek Hover Tooltip Label */}
      <div
        className={`absolute right-full mr-3.5 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none transition-all duration-300 ${
          isHovered && !isOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono tracking-wide backdrop-blur-md shadow-lg ${
            isDarkMode
              ? "bg-[#0B0E14]/90 border-[#1E2638] text-[#F1F4F9] shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
              : "bg-[#FAFBF7]/95 border-[#DFE2D2] text-[#1F2421] shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Ask Sprout AI</span>
          <kbd
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${
              isDarkMode
                ? "bg-[#161B26] border-[#2A354A] text-[#9BA3AF]"
                : "bg-[#EDEFE8] border-[#DFE2D2] text-[#555E57]"
            }`}
          >
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Main Mascot AI Orb Trigger Button */}
      <button
        type="button"
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={isOpen ? "Close Sprout AI Companion" : "Open Sprout AI Companion (Press ⌘K)"}
        aria-expanded={isOpen}
        aria-controls="sprout-ai-drawer"
        className={`group relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 active:scale-95 cursor-pointer ${
          isOpen ? "scale-95" : "hover:scale-105"
        }`}
        style={{
          boxShadow: isDarkMode
            ? isHovered
              ? "0 0 28px rgba(0, 240, 255, 0.45), 0 0 12px rgba(16, 185, 129, 0.35)"
              : "0 0 18px rgba(0, 240, 255, 0.22), 0 4px 16px rgba(0,0,0,0.8)"
            : isHovered
            ? "0 8px 24px rgba(62, 107, 82, 0.28), 0 2px 6px rgba(0,0,0,0.06)"
            : "0 6px 18px rgba(62, 107, 82, 0.16), 0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        {/* Orbital Halo Ring 1 */}
        <div
          className={`absolute -inset-1 rounded-full border border-dashed transition-all duration-700 pointer-events-none ${
            isDarkMode
              ? "border-cyan-400/35 group-hover:border-cyan-400/70"
              : "border-emerald-700/25 group-hover:border-emerald-700/50"
          } ${isHovered ? "animate-[spin_4s_linear_infinite]" : "animate-[spin_10s_linear_infinite]"}`}
        />

        {/* Ambient Pulsing Core Sphere */}
        <div
          className={`absolute inset-0 rounded-full transition-colors duration-300 backdrop-blur-md overflow-hidden ${
            isDarkMode
              ? "bg-gradient-to-b from-[#161C28] via-[#0E131E] to-[#070A0F] border border-cyan-500/40"
              : "bg-gradient-to-b from-[#FFFFFF] via-[#FAFBF7] to-[#EDF0E8] border border-[#C8CEBD]"
          }`}
        >
          {/* Internal Specular Highlight Reflection */}
          <div
            className={`absolute top-1 left-2.5 right-2.5 h-3.5 rounded-full pointer-events-none ${
              isDarkMode
                ? "bg-gradient-to-b from-cyan-300/25 to-transparent"
                : "bg-gradient-to-b from-white/90 to-transparent"
            }`}
          />

          {/* Bioluminescent Micro Grid Lines (Dark mode only) */}
          {isDarkMode && (
            <div
              className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:6px_6px]"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Dynamic Sprout Mascot AI Vector Emblem */}
        <div className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          {isOpen ? (
            /* Close Cross when Drawer is Active */
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isDarkMode ? "text-cyan-300" : "text-[#2D4F3C]"}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            /* Cool Sprout AI Emblem: Organic Seed + Sprouting Dual Leaf + Cybernetic Neural Eyes */
            <svg
              viewBox="0 0 32 32"
              width="28"
              height="28"
              className="transition-transform duration-300"
              fill="none"
            >
              {/* Twin Sprout Leaves */}
              <path
                d="M16 11 C15 6, 9 5, 8 8 C7 11, 11 13, 16 12 Z"
                fill={isDarkMode ? "#00FFA3" : "#3E6B52"}
                className="transition-colors duration-300"
              />
              <path
                d="M16 12 C18 6, 24 5, 25 8 C26 11, 22 13, 16 12 Z"
                fill={isDarkMode ? "#00F0FF" : "#558A6D"}
                className="transition-colors duration-300"
              />
              {/* Sprout Stem */}
              <path
                d="M16 12 L16 16"
                stroke={isDarkMode ? "#00FFA3" : "#3E6B52"}
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              {/* Seed Mascot Body */}
              <rect
                x="8.5"
                y="15.5"
                width="15"
                height="12"
                rx="6"
                fill={isDarkMode ? "#121824" : "#F4F6EE"}
                stroke={isDarkMode ? "#00F0FF" : "#3E6B52"}
                strokeWidth="1.6"
              />

              {/* Expressive Neural Eyes */}
              <circle
                cx="12.5"
                cy="20.5"
                r="1.5"
                fill={isDarkMode ? "#00FFA3" : "#2D4F3C"}
                className={isHovered ? "animate-ping" : ""}
              />
              <circle
                cx="19.5"
                cy="20.5"
                r="1.5"
                fill={isDarkMode ? "#00F0FF" : "#2D4F3C"}
              />

              {/* Cheerful Mascot Smile */}
              <path
                d="M14 23.5 Q16 25 18 23.5"
                stroke={isDarkMode ? "#9BA3AF" : "#558A6D"}
                strokeWidth="1.2"
                strokeLinecap="round"
              />

              {/* Micro Cyber Spark Constellation */}
              {isDarkMode && (
                <>
                  <circle cx="9" cy="9" r="0.8" fill="#00FFA3" />
                  <circle cx="23" cy="9" r="0.8" fill="#00F0FF" />
                </>
              )}
            </svg>
          )}
        </div>

        {/* Online Status Beacon */}
        {!isOpen && hasNotified && (
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[var(--bg)]" />
          </span>
        )}
      </button>
    </div>
  );
}
