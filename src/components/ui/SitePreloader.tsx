"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";

interface SitePreloaderProps {
  onComplete?: () => void;
}

type PreloaderPhase = "FILLING" | "DUALITY" | "EXITING_DARK" | "EXITING_LIGHT" | "DONE";

export function SitePreloader({ onComplete }: SitePreloaderProps) {
  const { setTheme } = useTheme();

  const [phase, setPhase] = useState<PreloaderPhase>("FILLING");
  const [percent, setPercent] = useState(0);
  const [splitX, setSplitX] = useState(50);
  const [hoveredSide, setHoveredSide] = useState<"dark" | "light" | null>(null);
  const [mounted, setMounted] = useState(false);

  const targetSplitRef = useRef(50);
  const currentSplitRef = useRef(50);
  const animFrameRef = useRef<number | null>(null);

  // Smooth spring lerp for the diagonal split
  useEffect(() => {
    if (phase !== "DUALITY") return;

    const loop = () => {
      const diff = targetSplitRef.current - currentSplitRef.current;
      currentSplitRef.current += diff * 0.065; // Silk-smooth spring follow
      setSplitX(currentSplitRef.current);
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [phase]);

  // Loading Sequence (3.2 seconds liquid filling into YASHVARDHAN)
  useEffect(() => {
    setMounted(true);

    // Fast-path for returning session visits
    if (typeof window !== "undefined") {
      try {
        const seen = sessionStorage.getItem("yashvardhan_preloader_seen");
        if (seen === "true") {
          setPhase("DONE");
          onComplete?.();
          return;
        }
      } catch {}
    }

    const duration = 3200; // 3.2 seconds
    const start = performance.now();

    const frame = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);

      // Smooth custom ease-in-out curve
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const p = Math.round(eased * 100);
      setPercent(p);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setPercent(100);
        // Brief illumination pause at 100% before opening Duality Chamber
        setTimeout(() => {
          setPhase("DUALITY");
        }, 400);
      }
    };

    const id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, [onComplete]);

  // Interactive mouse tracking to flex the diagonal split
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { innerWidth } = window;
    const xPct = (e.clientX / innerWidth) * 100;

    // Flex between 35% and 65% based on mouse position
    const target = 32 + (xPct / 100) * 36;
    targetSplitRef.current = target;

    if (xPct < 48) {
      setHoveredSide("dark");
    } else if (xPct > 52) {
      setHoveredSide("light");
    } else {
      setHoveredSide(null);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase === "DUALITY") {
        if (e.key === "ArrowLeft" || e.key === "1") {
          handleSelect("dark");
        } else if (e.key === "ArrowRight" || e.key === "2") {
          handleSelect("light");
        }
      }
      if (e.key === "Escape") {
        handleSelect("dark");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase]);

  // Handle final choice with cinematic rupture
  const handleSelect = (choice: "dark" | "light") => {
    if (phase === "EXITING_DARK" || phase === "EXITING_LIGHT" || phase === "DONE") return;

    setPhase(choice === "dark" ? "EXITING_DARK" : "EXITING_LIGHT");
    setTheme(choice);

    try {
      sessionStorage.setItem("yashvardhan_preloader_seen", "true");
    } catch {}

    // Allow the cinematic rupture exit animation to unfold (780ms)
    setTimeout(() => {
      setPhase("DONE");
      onComplete?.();
    }, 780);
  };

  if (!mounted || phase === "DONE") return null;

  // Diagonal clip path geometry
  const topCut = splitX + 8;
  const bottomCut = splitX - 8;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Yashvardhan Portfolio Genesis"
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[99999] overflow-hidden select-none bg-[#07080B] text-white"
    >
      {/* ─────────────────────────────────────────────────────────────
          PHASE 1: LIQUID TYPOGRAPHY FILLING (YASHVARDHAN)
          ───────────────────────────────────────────────────────────── */}
      {phase === "FILLING" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-12 z-20 transition-opacity duration-500">
          {/* Skip Button in Corner */}
          <button
            type="button"
            onClick={() => handleSelect("dark")}
            className="absolute top-8 right-8 text-[11px] font-mono tracking-widest text-white/30 hover:text-white transition-colors cursor-pointer px-3 py-1 rounded-full border border-white/10"
          >
            ESC TO SKIP
          </button>

          {/* Monumental Liquid Typographic Fill */}
          <div className="relative flex flex-col items-center">
            {/* Base Ghost Outline Typography */}
            <div
              className="font-display font-bold tracking-[0.22em] text-4xl sm:text-7xl md:text-8xl lg:text-9xl uppercase text-transparent select-none leading-none"
              style={{
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.16)",
              }}
            >
              YASHVARDHAN
            </div>

            {/* Rising Liquid Fill Layer */}
            <div
              className="absolute inset-0 font-display font-bold tracking-[0.22em] text-4xl sm:text-7xl md:text-8xl lg:text-9xl uppercase select-none leading-none overflow-hidden transition-[clip-path] duration-75 ease-out"
              style={{
                clipPath: `inset(${100 - percent}% 0 0 0)`,
              }}
            >
              <span className="bg-gradient-to-t from-[#00FFA3] via-[#00F0FF] to-[#FFFFFF] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,240,255,0.45)]">
                YASHVARDHAN
              </span>

              {/* Glowing Meniscus Crest */}
              <div
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FFA3] to-transparent drop-shadow-[0_0_12px_#00FFA3]"
                style={{
                  top: `${100 - percent}%`,
                }}
              />
            </div>

            {/* Pure, Minimalist Tabular Percentage Counter */}
            <div className="mt-8 sm:mt-12 flex items-baseline gap-2 font-mono text-xs sm:text-sm tracking-[0.35em] text-white/40 tabular-nums">
              <span className="text-white/80 font-semibold">{String(percent).padStart(2, "0")}</span>
              <span className="text-white/20">/ 100</span>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PHASE 2 & 3: THE DIAGONAL DUALITY CHAMBER & RUPTURE EXIT
          ───────────────────────────────────────────────────────────── */}
      {(phase === "DUALITY" || phase === "EXITING_DARK" || phase === "EXITING_LIGHT") && (
        <div className="absolute inset-0 z-30 overflow-hidden">
          {/* =========================================================
              LEFT / BOTTOM HALF: OBSIDIAN DARK REALM
              ========================================================= */}
          <div
            onClick={() => handleSelect("dark")}
            className={`absolute inset-0 cursor-pointer transition-all ${
              phase === "EXITING_DARK"
                ? "z-40 scale-105 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                : phase === "EXITING_LIGHT"
                ? "opacity-0 -translate-x-full duration-700 ease-in"
                : "duration-300"
            }`}
            style={{
              clipPath:
                phase === "EXITING_DARK"
                  ? "polygon(0 0, 160% 0, 160% 100%, 0 100%)"
                  : phase === "EXITING_LIGHT"
                  ? "polygon(0 0, 0% 0, 0% 100%, 0 100%)"
                  : `polygon(0 0, ${topCut}% 0, ${bottomCut}% 100%, 0 100%)`,
              backgroundColor: "#05070A",
            }}
          >
            {/* Deep Starlight & Cosmic Dust Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,240,255,0.14),transparent_65%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.18),transparent_60%)] pointer-events-none" />

            {/* Content Container */}
            <div className="absolute inset-y-0 left-0 w-full sm:w-[50vw] flex flex-col justify-between p-8 sm:p-16 z-10">
              {/* Header Label */}
              <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>OBSIDIAN</span>
              </div>

              {/* Center Typography */}
              <div className="space-y-4 max-w-lg">
                <h2
                  className={`font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-[-0.04em] text-white leading-none transition-transform duration-500 ${
                    hoveredSide === "dark" ? "scale-105 translate-x-2" : ""
                  }`}
                >
                  DARK
                </h2>
                <p className="font-sans text-xs sm:text-sm text-cyan-100/70 font-light leading-relaxed max-w-sm">
                  The silence of midnight, focused thought, and luminescent starlight.
                </p>

                <div className="pt-2">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                      hoveredSide === "dark"
                        ? "bg-cyan-500 text-[#05070A] shadow-[0_0_24px_rgba(0,240,255,0.5)]"
                        : "border border-cyan-500/30 text-cyan-300 bg-cyan-950/30"
                    }`}
                  >
                    <span>Enter Dark Realm</span>
                    <span>↵</span>
                  </span>
                </div>
              </div>

              {/* Bottom Subtle Note */}
              <div className="text-[11px] font-mono tracking-widest text-cyan-400/50">
                ✦ STARRY MATRIX · DEEP TERMINAL
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT / TOP HALF: PETRICHOR LIGHT REALM
              ========================================================= */}
          <div
            onClick={() => handleSelect("light")}
            className={`absolute inset-0 cursor-pointer transition-all ${
              phase === "EXITING_LIGHT"
                ? "z-40 scale-105 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                : phase === "EXITING_DARK"
                ? "opacity-0 translate-x-full duration-700 ease-in"
                : "duration-300"
            }`}
            style={{
              clipPath:
                phase === "EXITING_LIGHT"
                  ? "polygon(-60% 0, 100% 0, 100% 100%, -60% 100%)"
                  : phase === "EXITING_DARK"
                  ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
                  : `polygon(${topCut}% 0, 100% 0, 100% 100%, ${bottomCut}% 100%)`,
              backgroundColor: "#FAF8F5",
              color: "#18241C",
            }}
          >
            {/* Studio Ghibli Summer Sky Backdrop */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-multiply pointer-events-none"
              style={{ backgroundImage: `url('/images/ghibli-countryside-summer.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-bl from-amber-100/50 via-transparent to-transparent pointer-events-none" />

            {/* Content Container */}
            <div className="absolute inset-y-0 right-0 w-full sm:w-[50vw] flex flex-col justify-between items-end p-8 sm:p-16 text-right z-10">
              {/* Header Label */}
              <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-[#2D5A42]">
                <span>PETRICHOR</span>
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              </div>

              {/* Center Typography */}
              <div className="space-y-4 max-w-lg flex flex-col items-end">
                <h2
                  className={`font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-[-0.04em] text-[#17241C] leading-none transition-transform duration-500 ${
                    hoveredSide === "light" ? "scale-105 -translate-x-2" : ""
                  }`}
                >
                  LIGHT
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#48564D] font-light leading-relaxed max-w-sm">
                  The morning sun, gentle raindrops on summer leaves, and living paper.
                </p>

                <div className="pt-2">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                      hoveredSide === "light"
                        ? "bg-[#2D5A42] text-white shadow-[0_4px_20px_rgba(45,90,66,0.35)]"
                        : "border border-[#2D5A42]/30 text-[#2D5A42] bg-[#EDF2EB]"
                    }`}
                  >
                    <span>Enter Light Realm</span>
                    <span>↵</span>
                  </span>
                </div>
              </div>

              {/* Bottom Subtle Note */}
              <div className="text-[11px] font-mono tracking-widest text-[#566B5D]">
                🌿 SUNLIT LINEN · LIVING CONSERVATORY
              </div>
            </div>
          </div>

          {/* =========================================================
              CENTER FLOATING DUALITY BADGE
              ========================================================= */}
          {phase === "DUALITY" && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 flex flex-col items-center gap-2"
              style={{
                left: `${(topCut + bottomCut) / 2}%`,
                transition: "left 0.12s ease-out",
              }}
            >
              <div className="flex items-center gap-3 px-5 py-2 rounded-full backdrop-blur-2xl border border-white/20 bg-black/60 text-white shadow-2xl">
                <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-300">
                  ✦ DARK
                </span>
                <span className="text-xs font-mono text-white/40">|</span>
                <span className="text-[11px] font-mono tracking-widest uppercase text-amber-200">
                  LIGHT ✦
                </span>
              </div>
            </div>
          )}

          {/* Shockwave Rupture Overlays */}
          {phase === "EXITING_DARK" && (
            <div className="absolute inset-0 z-50 pointer-events-none animate-[pulse_0.4s_ease-out] bg-cyan-400/15 mix-blend-screen" />
          )}
          {phase === "EXITING_LIGHT" && (
            <div className="absolute inset-0 z-50 pointer-events-none animate-[pulse_0.4s_ease-out] bg-amber-200/25 mix-blend-screen" />
          )}
        </div>
      )}
    </div>
  );
}

export default SitePreloader;
