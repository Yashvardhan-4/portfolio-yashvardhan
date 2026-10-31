"use client";

import React from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { LivingHalftone } from "./LivingHalftone";

export function MonumentalHero() {
  return (
    <div className="relative w-full min-h-[100svh] bg-[#08090B] text-[#EDEDEF] overflow-hidden flex flex-col justify-between selection:bg-[#A855F7] selection:text-[#08090B]">
      {/* 1. Atmospheric Ambient Lighting (Near-Black Obsidian with Soft Peripheral Luminance) */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        {/* Subtle, restrained electric-violet ambient glow behind the portrait side */}
        <div
          className="absolute w-[640px] sm:w-[760px] h-[640px] sm:h-[760px] rounded-full blur-[140px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.20) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 75%)",
            top: "12%",
            right: "3%",
          }}
        />

        {/* Deep perimeter vignette to ensure editorial obsidian focus */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,9,11,0.4)_70%,#08090B_100%)]" />

        {/* Micro-architectural structural crosshairs */}
        <span className="hidden lg:block absolute top-10 left-10 font-mono text-[11px] text-[#202530] select-none">
          +
        </span>
        <span className="hidden lg:block absolute top-10 right-10 font-mono text-[11px] text-[#202530] select-none">
          +
        </span>
        <span className="hidden lg:block absolute bottom-16 left-10 font-mono text-[11px] text-[#202530] select-none">
          +
        </span>
        <span className="hidden lg:block absolute bottom-16 right-10 font-mono text-[11px] text-[#202530] select-none">
          +
        </span>
      </div>

      {/* 2. Minimal Editorial Header Navigation */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-5 sm:pt-8 pb-3 sm:pb-4">
        <div className="flex items-center justify-between border-b border-[#181D26]/70 pb-4 sm:pb-5">
          {/* Wordmark */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="group flex items-baseline gap-2.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A855F7]"
              aria-label="Yashvardhan Borude Home"
            >
              <span className="font-display text-sm sm:text-base font-semibold tracking-[-0.01em] text-[#EDEDEF] group-hover:text-white">
                YASHVARDHAN BORUDE
              </span>
            </a>
          </div>

          {/* Understated Editorial Navigation Links */}
          <nav aria-label="Primary Navigation" className="flex items-center gap-4 sm:gap-8 text-xs font-sans">
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
              className="group inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full border border-[#202634] bg-[#0E121A]/80 text-[10px] sm:text-[11px] font-mono tracking-wider text-[#EDEDEF] hover:border-[#A855F7]/70 hover:text-[#F3E8FF] transition-all duration-300"
              aria-label="Initiate email communication with Yashvardhan Borude"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-pulse" aria-hidden="true" />
              <span>CONNECT</span>
              <ArrowUpRight className="h-3 w-3 text-[#94A3B8] group-hover:text-[#C084FC] transition-colors" />
            </a>
          </nav>
        </div>
      </header>

      {/* 3. Centerstage: Asymmetric Two-Column Editorial Composition */}
      <section
        aria-label="Hero Introduction"
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-16 my-auto py-6 sm:py-10 lg:py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-10 xl:gap-12 items-center">
          {/* Left Column (Columns 1–7): Headline, Name, Identity & Narrative */}
          <div className="md:col-span-7 flex flex-col justify-center">
            {/* Monumental Headline: Refined Lockup with Tight Rhythmic Line Spacing */}
            <h1 className="flex flex-col">
              {/* Line 1: Expressive Editorial Italic Serif */}
              <span className="font-serif italic font-normal text-5xl sm:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.88] tracking-[-0.025em] text-[#EDEDEF]">
                Curiosity,
              </span>

              {/* Line 2: Contemporary Modern Display Geometry nestled under Line 1 */}
              <span className="font-display font-medium text-4xl sm:text-6xl lg:text-7xl xl:text-[5.75rem] leading-[0.92] tracking-[-0.04em] text-[#EDEDEF] -mt-1 sm:-mt-2 lg:-mt-3">
                made tangible<span className="text-[#A855F7]">.</span>
              </span>
            </h1>

            {/* Mobile Halftone Portrait (Visible on mobile < 768px in the flow, scaled ~10% up) */}
            <div className="block md:hidden my-6 w-full max-w-[310px] mx-auto">
              <LivingHalftone />
            </div>

            {/* Prominent Personal Identity Structural Anchor */}
            <div className="mt-5 sm:mt-8 pt-5 sm:pt-7 border-t border-[#181D26] flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" aria-hidden="true" />
                <span className="font-display text-base sm:text-lg font-medium text-[#EDEDEF] tracking-tight">
                  Yashvardhan Borude
                </span>
              </div>
              <span className="font-mono text-xs text-[#94A3B8] tracking-wide">
                — Computer Engineering &amp; Systems Architecture
              </span>
            </div>

            {/* Supporting Description */}
            <p className="mt-3 sm:mt-4 max-w-xl font-sans text-xs sm:text-sm lg:text-base leading-[1.7] text-[#94A3B8] font-normal">
              Building thoughtful software through engineering, experimentation and computational thinking.
            </p>

            {/* Action Group */}
            <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#work"
                className="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#EDEDEF] text-[#08090B] font-sans text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 hover:bg-white hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]"
              >
                <span>Explore Selected Work</span>
                <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5 text-[#08090B]" />
              </a>

              <a
                href="mailto:yashvardhanborude7@gmail.com"
                className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-[#202634] bg-[#0E121A]/80 text-xs sm:text-sm font-sans font-medium text-[#EDEDEF] hover:border-[#A855F7]/70 hover:bg-[#141924] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#94A3B8] group-hover:text-[#C084FC] transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column (Columns 8–12): Generative Halftone Magnetic Portrait on Tablet & Desktop */}
          <div className="hidden md:flex md:col-span-5 relative items-center justify-center md:justify-end">
            <LivingHalftone />
          </div>
        </div>
      </section>

      {/* 4. Architectural Editorial Datum Rail (Footer Rail of Hero Section) */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-4 pb-6 sm:pb-7">
        <div className="border-t border-[#181D26]/70 pt-3.5 sm:pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 font-mono text-[10px] sm:text-[11px] tracking-wider text-[#94A3B8]">
            {/* Index 01 */}
            <div>
              <span className="block text-[9px] sm:text-[10px] text-[#64748B] uppercase tracking-widest">LOCATION</span>
              <span className="text-[#EDEDEF] mt-0.5 block">Pune, IN</span>
            </div>

            {/* Index 02 */}
            <div>
              <span className="block text-[9px] sm:text-[10px] text-[#64748B] uppercase tracking-widest">DISCIPLINE</span>
              <span className="text-[#EDEDEF] mt-0.5 block">Systems &amp; Concurrency</span>
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
                <span className="text-[#EDEDEF] font-medium">Open to High-Impact Roles</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MonumentalHero;