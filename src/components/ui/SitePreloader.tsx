"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";

interface SitePreloaderProps {
  onComplete?: () => void;
}

type PreloaderPhase = "CALIBRATION" | "DUALITY_CHOICE" | "RUPTURE_DARK" | "RUPTURE_LIGHT" | "COMPLETE";

const POETIC_PHRASES = [
  "Curiosity, seeking form.",
  "Crafting atmospheres from thought.",
  "Where code meets living craft.",
  "Choose your realm.",
];

export function SitePreloader({ onComplete }: SitePreloaderProps) {
  const { setTheme } = useTheme();

  const [phase, setPhase] = useState<PreloaderPhase>("CALIBRATION");
  const [percent, setPercent] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [hoveredSide, setHoveredSide] = useState<"dark" | "light" | null>(null);
  const [splitPercent, setSplitPercent] = useState(50);
  const [targetSplit, setTargetSplit] = useState(50);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Smooth lerp for the diagonal split line
  useEffect(() => {
    if (phase !== "DUALITY_CHOICE") return;

    const lerpSplit = () => {
      setSplitPercent((prev) => {
        const diff = targetSplit - prev;
        if (Math.abs(diff) < 0.2) return targetSplit;
        return prev + diff * 0.08;
      });
      animFrameRef.current = requestAnimationFrame(lerpSplit);
    };

    animFrameRef.current = requestAnimationFrame(lerpSplit);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [phase, targetSplit]);

  // Loading Sequence (3.2 seconds total)
  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);

      // Check if user already made choice in this tab session
      try {
        const dismissed = sessionStorage.getItem("preloader_genesis_dismissed");
        if (dismissed === "true") {
          setPhase("COMPLETE");
          onComplete?.();
          return;
        }
      } catch {}
    }

    const startTime = Date.now();
    const duration = 3200; // 3.2 seconds

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Eased progress (cubic ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentPercent = Math.round(eased * 100);
      setPercent(currentPercent);

      // Update poetic phrase in sync with progression
      if (progress < 0.3) {
        setPhraseIndex(0);
      } else if (progress < 0.65) {
        setPhraseIndex(1);
      } else if (progress < 0.95) {
        setPhraseIndex(2);
      } else {
        setPhraseIndex(3);
      }

      if (progress >= 1) {
        clearInterval(progressTimer);
        setPercent(100);
        // Switch to Duality Chamber choice
        setTimeout(() => {
          setPhase("DUALITY_CHOICE");
        }, 320);
      }
    }, 24);

    return () => {
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase === "DUALITY_CHOICE") {
        if (e.key === "ArrowLeft" || e.key === "1") {
          handleSelectRealm("dark");
        } else if (e.key === "ArrowRight" || e.key === "2") {
          handleSelectRealm("light");
        }
      }

      // Escape key quick skip
      if (e.key === "Escape") {
        handleSelectRealm("dark");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase]);

  // Track cursor across screen to flex the diagonal split
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (phase !== "DUALITY_CHOICE") return;
      const { innerWidth } = window;
      const xPercent = (e.clientX / innerWidth) * 100;

      // Flex between 35% and 65% based on mouse position
      const flexed = 35 + (xPercent / 100) * 30;
      setTargetSplit(flexed);

      if (xPercent < 48) {
        setHoveredSide("dark");
      } else if (xPercent > 52) {
        setHoveredSide("light");
      } else {
        setHoveredSide(null);
      }
    },
    [phase]
  );

  // Trigger realm selection and dramatic rupture animation
  const handleSelectRealm = (choice: "dark" | "light") => {
    if (phase === "RUPTURE_DARK" || phase === "RUPTURE_LIGHT" || phase === "COMPLETE") return;

    const rupturePhase = choice === "dark" ? "RUPTURE_DARK" : "RUPTURE_LIGHT";
    setPhase(rupturePhase);

    // Apply theme immediately to document for seamless background sync
    setTheme(choice);

    try {
      sessionStorage.setItem("preloader_genesis_dismissed", "true");
    } catch {}

    // Allow the cinematic rupture exit animation to unfold (780ms)
    setTimeout(() => {
      setPhase("COMPLETE");
      onComplete?.();
    }, 820);
  };

  if (!mounted || phase === "COMPLETE") return null;

  // Calculate dynamic diagonal clip paths
  // Slanted angle of 14% width offset between top and bottom
  const topSplit = splitPercent + 7;
  const bottomSplit = splitPercent - 7;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Genesis Realm Calibration"
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[9999] overflow-hidden select-none bg-[#08090C] text-[#F3F4F6]"
    >
      {/* ─────────────────────────────────────────────────────────────
          STAGE 1: THE GENESIS CALIBRATION (0.0s – 3.2s)
          ───────────────────────────────────────────────────────────── */}
      {phase === "CALIBRATION" && (
        <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-14 z-20 transition-opacity duration-500">
          {/* Header Monogram */}
          <div className="flex items-center justify-between text-xs font-mono tracking-widest text-[#8A93A6]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="uppercase">YASHVARDHAN</span>
            </div>
            <button
              type="button"
              onClick={() => handleSelectRealm("dark")}
              className="text-[11px] text-[#6B7280] hover:text-[#E5E7EB] transition-colors border border-white/10 px-2.5 py-1 rounded-full cursor-pointer"
            >
              Skip ↵
            </button>
          </div>

          {/* Central Typographic Monolith */}
          <div className="flex flex-col items-center justify-center my-auto text-center space-y-6">
            {/* Monumental Name Display */}
            <div className="relative overflow-hidden">
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[0.22em] text-[#FFFFFF] uppercase">
                YASHVARDHAN
              </h1>
              {/* Soft Golden Shimmer Bar */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2.5s_infinite]"
                style={{
                  transform: "skewX(-20deg)",
                }}
              />
            </div>

            {/* Evocative Poetic Thought */}
            <p className="font-sans text-sm sm:text-base text-[#9CA3AF] tracking-wide h-6 transition-all duration-300 font-light">
              {POETIC_PHRASES[phraseIndex]}
            </p>

            {/* Architectural Minimalist Progress Bar */}
            <div className="w-64 sm:w-80 space-y-2 pt-4">
              <div className="relative w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-cyan-400 via-emerald-400 to-white transition-all duration-75 ease-out"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#6B7280]">
                <span>INITIALIZING</span>
                <span className="tabular-nums font-semibold text-emerald-400">{percent}%</span>
              </div>
            </div>
          </div>

          {/* Footer Subtitle */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#525A6A]">
            <span>SOFTWARE &amp; SYSTEMS ARCHITECT</span>
            <span>EDITION 2026</span>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STAGE 2: THE DIAGONAL DUALITY CHAMBER (CHOOSE REALM)
          ───────────────────────────────────────────────────────────── */}
      {(phase === "DUALITY_CHOICE" || phase === "RUPTURE_DARK" || phase === "RUPTURE_LIGHT") && (
        <div className="absolute inset-0 z-30 overflow-hidden">
          {/* =========================================================
              SIDE A: OBSIDIAN DARK REALM (LEFT / BOTTOM)
              ========================================================= */}
          <div
            onClick={() => handleSelectRealm("dark")}
            className={`absolute inset-0 cursor-pointer transition-all ${
              phase === "RUPTURE_DARK"
                ? "z-40 scale-105 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                : phase === "RUPTURE_LIGHT"
                ? "opacity-0 -translate-x-full duration-700 ease-in"
                : "duration-300 hover:brightness-110"
            }`}
            style={{
              clipPath:
                phase === "RUPTURE_DARK"
                  ? "polygon(0 0, 150% 0, 150% 100%, 0 100%)"
                  : phase === "RUPTURE_LIGHT"
                  ? "polygon(0 0, 0% 0, 0% 100%, 0 100%)"
                  : `polygon(0 0, ${topSplit}% 0, ${bottomSplit}% 100%, 0 100%)`,
              backgroundColor: "#05070B",
            }}
          >
            {/* Cybernetic Starlight & Nebula Backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,240,255,0.12),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_60%)]" />

            {/* Diagonal Realm Content */}
            <div className="absolute inset-y-0 left-0 w-full sm:w-[50vw] flex flex-col justify-between p-8 sm:p-16">
              {/* Top Tag */}
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400/80">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>REALM I · OBSIDIAN</span>
              </div>

              {/* Center Typography */}
              <div className="space-y-4 max-w-md">
                <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white leading-none">
                  DARK
                </h2>
                <p className="font-sans text-xs sm:text-sm text-cyan-100/70 leading-relaxed font-light">
                  The deep night of focused thought, glowing halftone points, and cybernetic elegance.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <span className="text-xs font-mono px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300">
                    Enter Dark Realm ↵
                  </span>
                </div>
              </div>

              {/* Bottom Mascot Preview */}
              <div className="flex items-center gap-3 text-xs font-mono text-cyan-400/60">
                <span>✦ Starlight Matrix · Sprout Awakened</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              SIDE B: PETRICHOR LIGHT REALM (RIGHT / TOP)
              ========================================================= */}
          <div
            onClick={() => handleSelectRealm("light")}
            className={`absolute inset-0 cursor-pointer transition-all ${
              phase === "RUPTURE_LIGHT"
                ? "z-40 scale-105 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                : phase === "RUPTURE_DARK"
                ? "opacity-0 translate-x-full duration-700 ease-in"
                : "duration-300 hover:brightness-105"
            }`}
            style={{
              clipPath:
                phase === "RUPTURE_LIGHT"
                  ? "polygon(-50% 0, 100% 0, 100% 100%, -50% 100%)"
                  : phase === "RUPTURE_DARK"
                  ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
                  : `polygon(${topSplit}% 0, 100% 0, 100% 100%, ${bottomSplit}% 100%)`,
              backgroundColor: "#FAF8F5",
              color: "#1F2421",
            }}
          >
            {/* Studio Ghibli Summer Sky & Sunlight Wash Backdrop */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-multiply pointer-events-none"
              style={{ backgroundImage: `url('/images/ghibli-countryside-summer.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-bl from-amber-100/40 via-transparent to-transparent" />

            {/* Diagonal Realm Content */}
            <div className="absolute inset-y-0 right-0 w-full sm:w-[50vw] flex flex-col justify-between items-end p-8 sm:p-16 text-right">
              {/* Top Tag */}
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#2D5A42]">
                <span>REALM II · PETRICHOR</span>
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
              </div>

              {/* Center Typography */}
              <div className="space-y-4 max-w-md">
                <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#1A251E] leading-none">
                  LIGHT
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#4A574F] leading-relaxed font-light">
                  The morning sun, gentle raindrops on summer leaves, and the tactile warmth of paper.
                </p>
                <div className="pt-2 flex items-center justify-end gap-3">
                  <span className="text-xs font-mono px-3 py-1.5 rounded-full border border-[#2D5A42]/30 bg-[#EDF2EB] text-[#2D5A42]">
                    Enter Light Realm ↵
                  </span>
                </div>
              </div>

              {/* Bottom Mascot Preview */}
              <div className="flex items-center gap-3 text-xs font-mono text-[#526859]">
                <span>🌿 Summer Conservatory · Dewdrop Sprout</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              CENTER SEAM & FLOATING DUALITY BADGE
              ========================================================= */}
          {phase === "DUALITY_CHOICE" && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 flex flex-col items-center gap-2"
              style={{
                left: `${(topSplit + bottomSplit) / 2}%`,
                transition: "left 0.15s ease-out",
              }}
            >
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-xl border border-white/20 bg-black/60 text-white shadow-2xl">
                <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-300">
                  ✦ DARK
                </span>
                <span className="text-xs font-mono text-white/50">|</span>
                <span className="text-[11px] font-mono tracking-widest uppercase text-amber-200">
                  LIGHT ✦
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 drop-shadow-md">
                Click a side to choose your world
              </span>
            </div>
          )}

          {/* Rupture Dramatic Shockwave Overlays */}
          {phase === "RUPTURE_DARK" && (
            <div className="absolute inset-0 z-50 pointer-events-none animate-[pulse_0.4s_ease-out] bg-cyan-400/10 mix-blend-screen" />
          )}
          {phase === "RUPTURE_LIGHT" && (
            <div className="absolute inset-0 z-50 pointer-events-none animate-[pulse_0.4s_ease-out] bg-amber-300/20 mix-blend-screen" />
          )}
        </div>
      )}
    </div>
  );
}

export default SitePreloader;
