"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";

export function MonumentalHero() {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    // Subtle ambient mouse tracking for organic light reaction on desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (mediaQuery.matches || window.innerWidth < 1024) return;
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[100svh] bg-[#08090C] text-[#EDEDEF] overflow-hidden flex flex-col justify-between selection:bg-[#A855F7] selection:text-[#08090C]">
      {/* 1. Ambient Atmospheric Depth Layer (Soft Electric Violet & Deep Obsidian Vignette) */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        {/* Primary soft diffused electric-violet ambient glow behind portrait */}
        <div
          className="absolute w-[500px] sm:w-[650px] lg:w-[750px] h-[500px] sm:h-[650px] lg:h-[750px] rounded-full blur-[110px] sm:blur-[140px] opacity-60 transition-transform duration-700 ease-out"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.24) 0%, rgba(126, 34, 206, 0.09) 45%, transparent 72%)",
            top: prefersReducedMotion ? "25%" : `${20 + mousePos.y * 10}%`,
            right: prefersReducedMotion ? "5%" : `${2 + (1 - mousePos.x) * 6}%`,
            transform: "translate(15%, -15%)",
          }}
        />

        {/* Secondary subtle sapphire-indigo balance light on left */}
        <div
          className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full blur-[130px] opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 75%)",
            top: "12%",
            left: "8%",
          }}
        />

        {/* Deep perimeter vignette to ensure editorial obsidian framing */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,9,12,0.35)_70%,#08090C_100%)]" />

        {/* Micro-architectural crosshairs at composition anchor points */}
        <span className="hidden lg:block absolute top-10 left-10 font-mono text-[11px] text-[#242A38] select-none">
          +
        </span>
        <span className="hidden lg:block absolute top-10 right-10 font-mono text-[11px] text-[#242A38] select-none">
          +
        </span>
        <span className="hidden lg:block absolute bottom-16 left-10 font-mono text-[11px] text-[#242A38] select-none">
          +
        </span>
        <span className="hidden lg:block absolute bottom-16 right-10 font-mono text-[11px] text-[#242A38] select-none">
          +
        </span>
      </div>

      {/* 2. Minimal Editorial Header Navigation */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-4 sm:pt-8 pb-3 sm:pb-4">
        <div className="flex items-center justify-between border-b border-[#1A1F2C]/60 pb-3 sm:pb-5">
          {/* Wordmark & Volume Identifier */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#"
              className="group flex items-baseline gap-2 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A855F7]"
              aria-label="Yashvardhan Borude Home"
            >
              <span className="font-display text-xs sm:text-base font-semibold tracking-[-0.01em] text-[#EDEDEF] group-hover:text-white">
                YASHVARDHAN BORUDE
              </span>
              <span className="hidden sm:inline font-mono text-[10px] tracking-widest uppercase text-[#A855F7]/80">
                / ED. 26
              </span>
            </a>
          </div>

          {/* Understated Editorial Navigation Links */}
          <nav aria-label="Primary Navigation" className="flex items-center gap-3 sm:gap-8 text-xs font-sans">
            <a
              href="#work"
              className="hidden sm:inline text-[#94A3B8] hover:text-[#EDEDEF] transition-colors focus-visible:outline-none focus-visible:text-[#C084FC]"
            >
              Work
            </a>
            <a
              href="#about"
              className="hidden sm:inline text-[#94A3B8] hover:text-[#EDEDEF] transition-colors focus-visible:outline-none focus-visible:text-[#C084FC]"
            >
              About
            </a>
            <a
              href="#contact"
              className="hidden md:inline text-[#94A3B8] hover:text-[#EDEDEF] transition-colors focus-visible:outline-none focus-visible:text-[#C084FC]"
            >
              Contact
            </a>

            {/* Subtle Contact Action */}
            <a
              href="mailto:yashvardhanborude7@gmail.com"
              className="group inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full border border-[#242C3D] bg-[#0E121A]/80 text-[10px] sm:text-[11px] font-mono tracking-wider text-[#EDEDEF] hover:border-[#A855F7]/70 hover:text-[#F3E8FF] transition-all duration-300"
              aria-label="Initiate email communication with Yashvardhan Borude"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-pulse" aria-hidden="true" />
              <span>CONNECT</span>
              <ArrowUpRight className="h-3 w-3 text-[#94A3B8] group-hover:text-[#C084FC] transition-colors" />
            </a>
          </nav>
        </div>
      </header>

      {/* 3. Centerstage: Asymmetric Editorial Composition (md: and lg: 2-column, mobile optimized) */}
      <section
        aria-label="Hero Introduction"
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-16 my-auto py-6 sm:py-10 lg:py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-10 items-center">
          {/* Left / Narrative Column (md: cols 1–7, lg: cols 1–7) */}
          <div className="md:col-span-7 flex flex-col justify-center">
            {/* Editorial Index Eyebrow */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-5">
              <span className="font-mono text-[10px] sm:text-[11px] font-medium tracking-[0.16em] uppercase text-[#C084FC]">
                PORTFOLIO // VOL. 01
              </span>
              <span className="h-px w-8 sm:w-10 bg-[#283244]" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-widest text-[#64748B] uppercase">
                PUNE, IN
              </span>
            </div>

            {/* Monumental Headline: "Curiosity, made tangible." */}
            <h1 className="flex flex-col tracking-[-0.035em]">
              {/* Line 1: Expressive Editorial Italic Serif */}
              <span className="font-serif italic font-normal text-4xl sm:text-6xl md:text-6xl lg:text-8xl xl:text-[6.85rem] leading-[0.92] text-[#EDEDEF]">
                Curiosity,
              </span>

              {/* Line 2: Commanding Display Modern Sans with Subtle Electric Accent */}
              <span className="font-display font-semibold text-3xl sm:text-5xl md:text-5xl lg:text-7xl xl:text-[5.85rem] leading-[0.96] text-transparent bg-clip-text bg-gradient-to-r from-[#EDEDEF] via-[#F8FAFC] to-[#D8B4FE] mt-1 sm:mt-2">
                made tangible<span className="text-[#A855F7]">.</span>
              </span>
            </h1>

            {/* Mobile Portrait Injection (Visible only on small screens < 768px for balanced editorial flow) */}
            <div className="block md:hidden my-6 relative max-w-[230px] mx-auto">
              {/* Soft purple aura behind mobile cutout */}
              <div
                className="absolute inset-0 rounded-full blur-[50px] opacity-75 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(126, 34, 206, 0.15) 50%, transparent 75%)",
                }}
                aria-hidden="true"
              />
              <picture className="relative z-10 block w-full">
                <source srcSet="/images/yashvardhan-cutout.webp" type="image/webp" />
                <img
                  src="/images/yashvardhan-cutout.png"
                  alt="Portrait photograph of Yashvardhan Borude"
                  width={766}
                  height={1024}
                  className="w-full h-auto object-contain object-bottom drop-shadow-[0_16px_35px_rgba(0,0,0,0.85)] filter brightness-[0.98] contrast-[1.04]"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 99%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 99%)",
                  }}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>

            {/* Prominent Personal Identity Structural Anchor */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#1C2333]/90 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" aria-hidden="true" />
                <span className="font-display text-sm sm:text-base lg:text-lg font-medium text-[#EDEDEF] tracking-tight">
                  Yashvardhan Borude
                </span>
              </div>
              <span className="font-mono text-[11px] sm:text-xs text-[#94A3B8] tracking-wide">
                — Computer Engineering &amp; Systems Architecture
              </span>
            </div>

            {/* Concise, Authentic Narrative Copy */}
            <p className="mt-3 sm:mt-4 max-w-xl font-sans text-xs sm:text-sm lg:text-base leading-[1.7] text-[#94A3B8] font-normal">
              Specializing in high-throughput concurrency engines, local-first offline web architectures, and
              resilient distributed platforms. Driven by algorithmic depth, clean code craftsmanship, and building
              software that scales reliably.
            </p>

            {/* Action Group */}
            <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#work"
                className="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#EDEDEF] text-[#08090C] font-sans text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 hover:bg-white hover:shadow-[0_0_28px_rgba(168,85,247,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]"
              >
                <span>Explore Selected Work</span>
                <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5 text-[#08090C]" />
              </a>

              <a
                href="mailto:yashvardhanborude7@gmail.com"
                className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-[#242C3D] bg-[#0E121A]/80 text-xs sm:text-sm font-sans font-medium text-[#EDEDEF] hover:border-[#A855F7]/70 hover:bg-[#141924] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#94A3B8] group-hover:text-[#C084FC] transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column (md: cols 8–12, lg: cols 8–12): High-Quality Integrated Portrait Cutout on Tablet & Desktop */}
          <div className="hidden md:flex md:col-span-5 relative items-center justify-center md:justify-end">
            {/* Atmospheric Backlight Rim behind Portrait */}
            <div
              className="absolute w-[280px] md:w-[360px] lg:w-[460px] h-[280px] md:h-[360px] lg:h-[460px] rounded-full blur-[80px] lg:blur-[100px] opacity-75 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(126, 34, 206, 0.12) 42%, transparent 72%)",
              }}
              aria-hidden="true"
            />

            {/* Architectural Frame Accents (Technical Coordinate Badges) */}
            <div
              className="flex absolute -top-3 right-1 z-20 items-center gap-2 px-2.5 py-0.5 rounded border border-[#222B3D] bg-[#0A0D14]/90 backdrop-blur-md font-mono text-[9px] lg:text-[10px] text-[#94A3B8] tracking-wider"
              aria-hidden="true"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />
              <span>FIG. 01 // PORTRAIT SPECIMEN</span>
            </div>

            {/* High-Resolution Cutout with Organic Base Gradient Fade */}
            <div className="relative z-10 w-full max-w-[320px] md:max-w-[360px] lg:max-w-[460px] xl:max-w-[490px]">
              <picture className="block w-full">
                <source srcSet="/images/yashvardhan-cutout.webp" type="image/webp" />
                <img
                  src="/images/yashvardhan-cutout.png"
                  alt="Portrait photograph of Yashvardhan Borude"
                  width={766}
                  height={1024}
                  className="w-full h-auto object-contain object-bottom drop-shadow-[0_24px_50px_rgba(0,0,0,0.85)] filter brightness-[0.98] contrast-[1.04]"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 99%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 99%)",
                  }}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Architectural Editorial Datum Rail (Footer Rail of Hero Section) */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-4 pb-6 sm:pb-7">
        <div className="border-t border-[#1A1F2C]/70 pt-3.5 sm:pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 font-mono text-[10px] sm:text-[11px] tracking-wider text-[#94A3B8]">
            {/* Index 01 */}
            <div>
              <span className="block text-[9px] sm:text-[10px] text-[#64748B] uppercase tracking-widest">LOCATION</span>
              <span className="text-[#EDEDEF] mt-0.5 block">Pune, IN (18.52° N)</span>
            </div>

            {/* Index 02 */}
            <div>
              <span className="block text-[9px] sm:text-[10px] text-[#64748B] uppercase tracking-widest">SPECIALIZATION</span>
              <span className="text-[#EDEDEF] mt-0.5 block">Concurrency &amp; Systems</span>
            </div>

            {/* Index 03 */}
            <div>
              <span className="block text-[9px] sm:text-[10px] text-[#64748B] uppercase tracking-widest">EDUCATION</span>
              <span className="text-[#EDEDEF] mt-0.5 block">B.E. Computer Engineering</span>
            </div>

            {/* Index 04: Status with Live Pulse */}
            <div className="flex flex-col sm:items-end">
              <span className="block text-[9px] sm:text-[10px] text-[#64748B] uppercase tracking-widest">STATUS</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-ping" aria-hidden="true" />
                <span className="text-[#C084FC] font-medium">Open to High-Impact Roles</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MonumentalHero;