"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { AtmosphericBackground } from "./AtmosphericBackground";
import Threads from "@/components/ui/Threads";
import { DigitalExhibitionStage } from "./DigitalExhibitionStage";
import { HoverHighlighter } from "@/components/ui/HoverHighlighter";

const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), { ssr: false });

export function MonumentalHero() {
  const { theme } = useTheme();
  const isLightMode = theme === "light";
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Layout anchor references for master unbounded canvas
  const desktopAnchorRef = useRef<HTMLDivElement>(null);
  const mobileAnchorRef = useRef<HTMLDivElement>(null);
  const headlineAnchorRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setHasMounted(true);
    }, 60);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      clearTimeout(mountTimer);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[100svh] bg-[var(--bg)] text-[var(--fg)] overflow-hidden flex flex-col justify-between transition-colors duration-300">
      {/* 1. ReactBits Background Animation: Threads (Active in Dark Mode for fluid WebGL ribbons on pitch black) */}
      <div
        className={`absolute inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700 ${
          isLightMode ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        <Threads
          color={[0.66, 0.33, 0.97]}
          accentColor={[0.75, 0.52, 0.99]}
          amplitude={1.15}
          distance={0.28}
          enableMouseInteraction={true}
          lineCount={42}
          thickness={1.1}
          opacity={0.42}
          className="w-full h-full"
        />
      </div>

      {/* 2. Studio Ghibli Full-Width Summer Landscape Backdrop (Light Mode Only) */}
      {isLightMode && (
        <div
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
          aria-hidden="true"
        >
          {/* Full-width Ghibli Summer Countryside Sky & Rolling Hills (Reference 1) */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-[center_top] opacity-35 mix-blend-multiply"
            style={{ backgroundImage: `url('/images/ghibli-countryside-summer.jpg')` }}
          />
          {/* Soft linear paper gradient overlay ensuring text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)]/90 via-[var(--bg)]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)]" />
        </div>
      )}

      {/* 3. Living Conservatory Environment Layer (Active in Light Mode: Rain streaks, sun beam, puddle ripples) */}
      <div
        className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-700 ${
          isLightMode ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      >
        <AtmosphericBackground />
      </div>

      {/* 3. Master Unbounded Digital Exhibition Canvas (Portrait Dots, Physics & Scanning Wave) */}
      <DigitalExhibitionStage
        desktopAnchorRef={desktopAnchorRef}
        mobileAnchorRef={mobileAnchorRef}
        headlineAnchorRef={headlineAnchorRef}
        line1Ref={line1Ref}
        line2Ref={line2Ref as any}
      />

      {/* Pure perimeter vignette to softly frame the exhibition stage without lightening black */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_at_center,transparent_55%,var(--bg)_100%)] opacity-40"
        aria-hidden="true"
      />

      {/* Centerstage: Asymmetric Two-Column Editorial Exhibition */}
      <section
        aria-label="Hero Introduction"
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-16 my-auto pt-20 sm:pt-24 pb-6 sm:pb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column (Columns 1–7): Physical Typography, Personal Anchor & Narrative */}
          <div className="md:col-span-7 flex flex-col justify-center max-w-full md:max-w-[560px] lg:max-w-[620px]">
            {/* Monumental Headline: Refined Editorial Proportions */}
            <div
              ref={headlineAnchorRef}
              className="relative flex flex-col select-none py-1 pb-1 overflow-visible group/headline"
            >
              {/* Line 1: Expressive Editorial Italic Serif */}
              <span
                ref={line1Ref}
                className="font-serif italic font-normal text-4xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-[5.25rem] leading-[0.92] tracking-[-0.025em] pb-1.5 sm:pb-2 inline-block select-none transform-gpu"
                style={{
                  background:
                    "linear-gradient(90deg, var(--fg) 0%, var(--fg) 32%, var(--accent) 52%, var(--fg) 70%, var(--fg) 100%)",
                  backgroundSize: "220% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: prefersReducedMotion ? "none" : "kineticShine 8.5s ease-in-out infinite",
                  opacity: hasMounted ? 1 : 0,
                  filter: hasMounted ? "blur(0px)" : "blur(14px)",
                  transform: hasMounted ? "translateY(0px) scale(1)" : "translateY(24px) scale(0.99)",
                  transition: prefersReducedMotion
                    ? "none"
                    : "opacity 950ms cubic-bezier(0.16, 1, 0.3, 1), filter 950ms cubic-bezier(0.16, 1, 0.3, 1), transform 950ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                Curiosity,
              </span>

              {/* Line 2: Confident, Distinctive Sans-Serif Line */}
              <div
                ref={line2Ref}
                className="font-display font-semibold text-3xl sm:text-5xl md:text-[2.75rem] lg:text-[3.5rem] xl:text-[4.25rem] leading-[1.02] tracking-[-0.035em] text-[var(--fg)] block select-none transform-gpu"
                style={{
                  opacity: hasMounted ? 1 : 0,
                  filter: hasMounted ? "blur(0px)" : "blur(14px)",
                  transform: hasMounted ? "translateY(0px) scale(1)" : "translateY(22px) scale(0.99)",
                  transition: prefersReducedMotion
                    ? "none"
                    : "opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1) 140ms, filter 1000ms cubic-bezier(0.16, 1, 0.3, 1) 140ms, transform 1000ms cubic-bezier(0.16, 1, 0.3, 1) 140ms",
                }}
              >
                made tangible.
              </div>
            </div>

            {/* Mobile Portrait Anchor */}
            <div className="block md:hidden my-6 w-full max-w-[320px] mx-auto">
              <div
                ref={mobileAnchorRef}
                className="w-full pointer-events-none aspect-[480/513] relative"
                aria-label="Mobile Portrait Spatial Guide"
              >
                {hasMounted && isLightMode && (
                  <div className="absolute inset-0 pointer-events-auto">
                    <Lanyard
                      frontImage="/images/lanyard-front.png"
                      backImage="/images/lanyard-back.png"
                      strapImage="/images/lanyard-strap.png"
                      cardColor="#FAF8F5"
                      finish="glossy"
                      metal="silver"
                      strapColor="#1B382B"
                      strapWidth={0.65}
                      size={0.65}
                      strapLength={0.44}
                      elasticity={0.55}
                      damping={0.45}
                      gravity={1.1}
                      breeze={0.35}
                      anchor="center"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Non-Redundant Purpose Anchor */}
            <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-[var(--border)] flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" aria-hidden="true" />
              <span className="font-mono text-xs sm:text-[13px] text-[var(--fg)] tracking-wider uppercase font-semibold">
                Computer Engineering · Builder
              </span>
            </div>

            {/* Punchy, Non-Generic Description */}
            <p className="mt-3 sm:mt-4 max-w-xl font-sans text-xs sm:text-sm lg:text-base leading-[1.7] text-[var(--fg-muted)] font-normal">
              I explore technology, experiment with ideas, and build software that turns{" "}
              <HoverHighlighter opacity={25}>
                interesting problems
              </HoverHighlighter>{" "}
              into{" "}
              <HoverHighlighter opacity={25}>
                useful experiences
              </HoverHighlighter>
              .
            </p>

            {/* Purpose-Driven Action Group */}
            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#work"
                className="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[var(--fg)] text-[var(--bg)] font-sans text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 hover:opacity-90 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <span>Explore My Work</span>
                <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5 text-[var(--bg)]" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs sm:text-sm font-sans font-medium text-[var(--fg)] hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors" />
              </a>

              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-resume-modal"));
                  }
                }}
                className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs sm:text-sm font-sans font-medium text-[var(--fg)] hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
              >
                <span>Curriculum Vitae</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors" />
              </button>
            </div>
          </div>

          {/* Right Column (Columns 8–12): Desktop Unbounded Halftone Portrait Spatial Anchor */}
          <div className="hidden md:flex md:col-span-5 relative items-center justify-center md:justify-end">
            {/* Subtle Ambient Radial Glow behind Portrait */}
            <div 
              className={`absolute -inset-4 bg-[radial-gradient(circle_at_center,var(--accent-glow)_0%,transparent_70%)] blur-2xl pointer-events-none ${
                isLightMode ? "opacity-15" : "opacity-25"
              }`}
              aria-hidden="true" 
            />

            <div
              ref={desktopAnchorRef}
              className="w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] xl:max-w-[480px] pointer-events-none ml-auto relative z-10 aspect-[480/513]"
              aria-label="Desktop Portrait Spatial Guide"
            />
          </div>
        </div>
      </section>

      {/* Light Mode 3D Physics Lanyard: Anchored at the absolute top ceiling of the screen (top-0), bleeding with unrestricted full-viewport physics */}
      {hasMounted && isLightMode && (
        <div
          className="hidden md:block absolute top-0 right-0 w-[55vw] lg:w-[50vw] xl:w-[46vw] h-[100svh] min-h-[720px] z-40 pointer-events-auto overflow-visible select-none"
          aria-label="Interactive 3D Engineering ID Lanyard"
        >
          <Lanyard
            frontImage="/images/lanyard-front.png"
            backImage="/images/lanyard-back.png"
            strapImage="/images/lanyard-strap.png"
            cardColor="#FAF8F5"
            finish="glossy"
            metal="silver"
            strapColor="#1B382B"
            strapWidth={0.65}
            size={0.62}
            strapLength={0.42}
            elasticity={0.55}
            damping={0.45}
            gravity={1.1}
            breeze={0.35}
            anchor="center"
          />
        </div>
      )}

      {/* Subtle Scroll Affordance Indicator */}
      <div className="relative z-20 flex flex-col items-center justify-center pt-1 pb-2 text-[var(--fg-subtle)] pointer-events-none select-none">
        <span className="font-mono text-[9px] uppercase tracking-widest block mb-1 text-[var(--fg-subtle)]/70">
          Scroll to explore
        </span>
        <div className="w-[1px] h-4 bg-gradient-to-b from-[var(--accent)]/80 to-transparent" />
      </div>

      {/* 5. Architectural Editorial Datum Rail with Refined Labels */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-2 pb-5 sm:pb-6">
        <div className="border-t border-[var(--border)]/70 pt-3 sm:pt-3.5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 font-mono text-[10px] sm:text-[11px] tracking-wider text-[var(--fg-muted)]">
            {/* Index 01: Based In */}
            <div>
              <span className="block text-[9px] sm:text-[10px] text-[var(--fg-subtle)] uppercase tracking-widest">BASED IN</span>
              <span className="text-[var(--fg)] mt-0.5 block">Pune, India</span>
            </div>

            {/* Index 02: Currently Exploring */}
            <div>
              <span className="block text-[9px] sm:text-[10px] text-[var(--fg-subtle)] uppercase tracking-widest">EXPLORING</span>
              <span className="text-[var(--fg)] mt-0.5 block">Software &amp; Systems</span>
            </div>

            {/* Index 03: Studying */}
            <div>
              <span className="block text-[9px] sm:text-[10px] text-[var(--fg-subtle)] uppercase tracking-widest">EDUCATION</span>
              <span className="text-[var(--fg)] mt-0.5 block">Computer Engineering</span>
            </div>

            {/* Index 04: Availability */}
            <div className="flex flex-col sm:items-end">
              <span className="block text-[9px] sm:text-[10px] text-[var(--fg-subtle)] uppercase tracking-widest">AVAILABILITY</span>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-resume-modal"));
                  }
                }}
                className="flex items-center gap-1.5 mt-0.5 text-left sm:text-right hover:opacity-80 transition-opacity cursor-pointer group"
                title="Click to view credentials & curriculum vitae"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                <span className="text-[var(--fg)] font-medium group-hover:underline">Summer 2026 Internships</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MonumentalHero;
