"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import Threads from "./Threads";
import BouncingDotsLoader from "./BouncingDotsLoader";

interface SitePreloaderProps {
  onComplete?: () => void;
}

type PreloaderPhase = "CALIBRATION" | "DUALITY" | "PORTAL_EXPANDING" | "COMPLETE";

const NAME_LETTERS = ["Y", "A", "S", "H", "V", "A", "R", "D", "H", "A", "N"];

export function SitePreloader({ onComplete }: SitePreloaderProps) {
  const { setTheme } = useTheme();

  const [phase, setPhase] = useState<PreloaderPhase>("CALIBRATION");
  const [mounted, setMounted] = useState(false);
  const [selectedRealm, setSelectedRealm] = useState<"dark" | "light">("dark");
  const [clickPos, setClickPos] = useState({ x: 50, y: 50 });
  const [hoveredSide, setHoveredSide] = useState<"dark" | "light" | null>(null);
  const [isDissolving, setIsDissolving] = useState(false);

  // Water-like smooth spring physics for the diagonal split line
  const rawSplit = useMotionValue(50);
  const smoothSplit = useSpring(rawSplit, {
    damping: 32,
    stiffness: 160,
    mass: 0.7,
  });

  const [splitDisplay, setSplitDisplay] = useState(50);

  useEffect(() => {
    return smoothSplit.on("change", (v) => {
      setSplitDisplay(v);
    });
  }, [smoothSplit]);

  // Phase 1: Framer Bouncing Dots + Fluid Typography Reveal (~3.2 seconds)
  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      try {
        const seen = sessionStorage.getItem("yashvardhan_preloader_seen_v2");
        if (seen === "true") {
          setPhase("COMPLETE");
          onComplete?.();
          return;
        }
      } catch {}
    }

    const timer = setTimeout(() => {
      setPhase("DUALITY");
    }, 3400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Mouse move on Duality stage -> water-like spring response
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (phase !== "DUALITY") return;
    const { innerWidth } = window;
    const xPct = (e.clientX / innerWidth) * 100;

    // Fluid membrane flex between 34% and 66%
    const target = 34 + (xPct / 100) * 32;
    rawSplit.set(target);

    if (xPct < 48) {
      setHoveredSide("dark");
    } else if (xPct > 52) {
      setHoveredSide("light");
    } else {
      setHoveredSide(null);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase === "DUALITY") {
        if (e.key === "ArrowLeft" || e.key === "1") {
          triggerRealmSelection("dark", window.innerWidth * 0.25, window.innerHeight * 0.5);
        } else if (e.key === "ArrowRight" || e.key === "2") {
          triggerRealmSelection("light", window.innerWidth * 0.75, window.innerHeight * 0.5);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase]);

  // Trigger liquid portal expansion and subsequent slow cinematic dissolution
  const triggerRealmSelection = (choice: "dark" | "light", clientX: number, clientY: number) => {
    if (phase === "PORTAL_EXPANDING" || phase === "COMPLETE") return;

    const xPct = (clientX / window.innerWidth) * 100;
    const yPct = (clientY / window.innerHeight) * 100;

    setClickPos({ x: xPct, y: yPct });
    setSelectedRealm(choice);
    setPhase("PORTAL_EXPANDING");
    setIsDissolving(false);

    try {
      sessionStorage.setItem("yashvardhan_preloader_seen_v2", "true");
    } catch {}

    // 1. Synchronize theme halfway through the portal expansion (400ms)
    setTimeout(() => {
      setTheme(choice);
    }, 400);

    // 2. Once portal occupies full screen (720ms), trigger slow cinematic dissolve
    setTimeout(() => {
      setIsDissolving(true);
    }, 720);

    // 3. Complete transition smoothly after the 800ms dissolve veil (1550ms total)
    setTimeout(() => {
      setPhase("COMPLETE");
      onComplete?.();
    }, 1550);
  };

  if (!mounted || phase === "COMPLETE") return null;

  // Slanted diagonal geometry with dynamic offset
  const topCut = splitDisplay + 6;
  const bottomCut = splitDisplay - 6;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Yashvardhan Portfolio Genesis"
      onMouseMove={handleMouseMove}
      className={`fixed inset-0 z-[99999] overflow-hidden select-none bg-[#050508] transition-opacity duration-700 ${
        isDissolving ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      <AnimatePresence mode="wait">
        {/* ─────────────────────────────────────────────────────────────
            STAGE 1: BRAND HARMONY PRELOADER (PURE MONUMENTAL TYPOGRAPHY
            + FRAMER BOUNCING DOTS · ZERO COUNTDOWN CLUTTER)
            ───────────────────────────────────────────────────────────── */}
        {phase === "CALIBRATION" && (
          <motion.div
            key="stage-calibration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-12 z-20"
          >
            {/* Minimalist Obsidian Starlight Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-[#050508]" />
              {/* Centered Obsidian Royal Purple Ambient Aura */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,rgba(124,58,237,0.05)_45%,transparent_70%)] blur-[70px]" />
            </div>

            {/* Monumental Name Typography: Pure White, Zero Shadow, Refined Optical Kerning */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center justify-center gap-0.5 sm:gap-1.5 md:gap-2.5 overflow-hidden py-3">
                {NAME_LETTERS.map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1 + index * 0.045,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                    className="font-display font-medium text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[-0.03em] select-none inline-block text-white antialiased leading-none"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Exact Framer BouncingDots Physics Loader in Unified Brand Purple Palette */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 sm:mt-8 flex flex-col items-center"
              >
                <BouncingDotsLoader
                  dotCount={4}
                  dotSize={22}
                  bounceHeight={46}
                  animationDuration={1.35}
                  dotSpacing={16}
                  showRipple={true}
                  showShadow={true}
                />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            STAGE 2: WATER-SMOOTH DIAGONAL DUALITY CHAMBER
            ───────────────────────────────────────────────────────────── */}
        {phase === "DUALITY" && (
          <motion.div
            key="stage-duality"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30 overflow-hidden"
          >
            {/* =========================================================
                LEFT / BOTTOM REALM: OBSIDIAN DARK (PURPLE THEME)
                ========================================================= */}
            <div
              onClick={(e) => triggerRealmSelection("dark", e.clientX, e.clientY)}
              className="absolute inset-0 cursor-pointer overflow-hidden transition-all duration-300"
              style={{
                clipPath: `polygon(0 0, ${topCut}% 0, ${bottomCut}% 100%, 0 100%)`,
                backgroundColor: "#05060A",
              }}
            >
              {/* ReactBits Real-time Flowing WebGL Threads (Obsidian Royal Purple) */}
              <div className="absolute inset-0 pointer-events-none opacity-55">
                <Threads
                  color={[0.66, 0.33, 0.97]}
                  accentColor={[0.48, 0.22, 0.93]}
                  amplitude={1.2}
                  distance={0.3}
                  enableMouseInteraction={true}
                  lineCount={36}
                  thickness={1.2}
                  opacity={0.5}
                  className="w-full h-full"
                />
              </div>

              {/* Ambient Radial Stardust Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.22),transparent_65%)] pointer-events-none" />

              {/* Content Canvas */}
              <div className="absolute inset-y-0 left-0 w-full sm:w-[50vw] flex flex-col justify-between p-8 sm:p-16 z-10 pointer-events-none">
                <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-purple-400">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#C084FC]" />
                  <span>OBSIDIAN · DARK</span>
                </div>

                <div className="space-y-4 max-w-lg">
                  <motion.h2
                    animate={{
                      scale: hoveredSide === "dark" ? 1.04 : 1,
                      x: hoveredSide === "dark" ? 6 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-[-0.04em] text-white leading-none"
                  >
                    DARK
                  </motion.h2>
                  <p className="font-sans text-xs sm:text-sm text-purple-200/70 font-light leading-relaxed max-w-sm">
                    Midnight void, luminous violet ribbons, and deep architectural focus.
                  </p>

                  <div className="pt-2">
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                        hoveredSide === "dark"
                          ? "bg-purple-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.7)]"
                          : "border border-purple-500/30 text-purple-300 bg-purple-950/40"
                      }`}
                    >
                      <span>Choose Obsidian</span>
                      <span>↵</span>
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-mono tracking-widest text-purple-400/50">
                  ✦ ARCHITECTURAL RUNTIME
                </div>
              </div>
            </div>

            {/* =========================================================
                RIGHT / TOP REALM: PETRICHOR LIGHT
                ========================================================= */}
            <div
              onClick={(e) => triggerRealmSelection("light", e.clientX, e.clientY)}
              className="absolute inset-0 cursor-pointer overflow-hidden transition-all duration-300"
              style={{
                clipPath: `polygon(${topCut}% 0, 100% 0, 100% 100%, ${bottomCut}% 100%)`,
                backgroundColor: "#FAF8F5",
              }}
            >
              {/* Studio Ghibli Summer Sky Landscape */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-multiply pointer-events-none"
                style={{ backgroundImage: `url('/images/ghibli-countryside-summer.jpg')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-bl from-amber-100/60 via-transparent to-transparent pointer-events-none" />

              {/* Content Canvas */}
              <div className="absolute inset-y-0 right-0 w-full sm:w-[50vw] flex flex-col justify-between items-end p-8 sm:p-16 text-right z-10 pointer-events-none">
                <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-[#2D5A42]">
                  <span>PETRICHOR · LIGHT</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shadow-[0_0_8px_#059669]" />
                </div>

                <div className="space-y-4 max-w-lg flex flex-col items-end">
                  <motion.h2
                    animate={{
                      scale: hoveredSide === "light" ? 1.04 : 1,
                      x: hoveredSide === "light" ? -6 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-[-0.04em] text-[#17241C] leading-none"
                  >
                    LIGHT
                  </motion.h2>
                  <p className="font-sans text-xs sm:text-sm text-[#48564D] font-light leading-relaxed max-w-sm">
                    Morning sun, summer raindrops on living leaves, and warm tactile linen.
                  </p>

                  <div className="pt-2">
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                        hoveredSide === "light"
                          ? "bg-[#2D5A42] text-white shadow-[0_4px_24px_rgba(45,90,66,0.4)]"
                          : "border border-[#2D5A42]/30 text-[#2D5A42] bg-[#EDF2EB]"
                      }`}
                    >
                      <span>Choose Petrichor</span>
                      <span>↵</span>
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-mono tracking-widest text-[#566B5D]">
                  🌿 LIVING CONSERVATORY
                </div>
              </div>
            </div>

            {/* Dynamic Center Duality Pill Indicator */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 flex flex-col items-center gap-2"
              style={{
                left: `${(topCut + bottomCut) / 2}%`,
              }}
            >
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-2xl border border-white/20 bg-black/60 text-white shadow-2xl">
                <span className="text-[11px] font-mono tracking-widest uppercase text-purple-300">
                  ✦ OBSIDIAN
                </span>
                <span className="text-xs font-mono text-white/40">|</span>
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#FAF8F5]">
                  PETRICHOR ✦
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            STAGE 3: EXPANDING PORTAL & CINEMATIC SLOW DISSOLVE
            (Occupies screen smoothly, then slowly dissolves without sudden pop)
            ───────────────────────────────────────────────────────────── */}
        {phase === "PORTAL_EXPANDING" && (
          <motion.div
            key="stage-portal"
            initial={{
              clipPath: `circle(0% at ${clickPos.x}% ${clickPos.y}%)`,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            animate={
              isDissolving
                ? {
                    clipPath: `circle(170% at ${clickPos.x}% ${clickPos.y}%)`,
                    opacity: 0,
                    scale: 1.04,
                    filter: "blur(12px)",
                  }
                : {
                    clipPath: `circle(170% at ${clickPos.x}% ${clickPos.y}%)`,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }
            }
            transition={
              isDissolving
                ? {
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1], // Gentle, water-smooth exit dissolution
                  }
                : {
                    duration: 0.72,
                    ease: [0.19, 1, 0.22, 1], // Expo-out expansion
                  }
            }
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden"
            style={{
              backgroundColor: selectedRealm === "dark" ? "#06080D" : "#FAF8F5",
            }}
          >
            {/* Ambient Shockwave Halo */}
            <div
              className={`absolute inset-0 opacity-40 ${
                selectedRealm === "dark"
                  ? "bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.45),transparent_70%)]"
                  : "bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.5),transparent_70%)]"
              }`}
            />

            {/* Radiant Realm Unfurl Emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={
                isDissolving
                  ? { scale: 1.15, opacity: 0, filter: "blur(6px)" }
                  : { scale: 1.05, opacity: 1, filter: "blur(0px)" }
              }
              transition={{ duration: isDissolving ? 0.6 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center font-display text-4xl sm:text-6xl font-semibold tracking-tight"
              style={{
                color: selectedRealm === "dark" ? "#F3E8FF" : "#17241C",
              }}
            >
              {selectedRealm === "dark" ? "OBSIDIAN" : "PETRICHOR"}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SitePreloader;
