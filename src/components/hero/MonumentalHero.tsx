"use client";

import React, { useRef } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { LaserFlow } from "@/components/ui/LaserFlow";
import { VaporType } from "@/components/ui/VaporType";
import { RotatingText } from "@/components/ui/RotatingText";
import { ScrambledText } from "@/components/ui/ScrambledText";
import { StrokeText } from "@/components/ui/StrokeText";
import { SignalType } from "@/components/ui/SignalType";
import { NeonButton } from "@/components/ui/NeonButton";
import { Magnet } from "@/components/ui/Magnet";

export function MonumentalHero() {
  const datumCardRef = useRef<HTMLDivElement>(null);

  const engineeringSpecialties = [
    "High-Throughput Concurrency Engines",
    "Local-First Offline Web Architectures",
    "Distributed Enterprise ERP Platforms",
    "Competitive Algorithmic Optimization",
  ];

  return (
    <div className="relative w-full min-h-[100svh] overflow-hidden bg-[#08090C] flex flex-col justify-between">
      {/* 1. Luminous LaserFlow WebGL2 Background (Pouring Laser Beam, Volumetric Fog & Flowing Dust) */}
      <div className="absolute inset-0 z-0 pointer-events-auto" aria-hidden="true">
        <LaserFlow
          surfaceRef={datumCardRef}
          beamPosition={0.5}
          surfaceLevel={0.84}
          color="#9333EA"
          intensity={2.0}
          beamWidth={1.8}
          flare={1.6}
          spread={1.8}
          spill={1.2}
          fog={0.28}
          dust={1.8}
          streaks={1.6}
          dots={1.0}
          pulse={1.5}
          speed={1.3}
          mouseInteraction={true}
        />
      </div>

      <section
        aria-label="Introduction and Hero"
        className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-between px-6 py-6 sm:px-10 sm:py-8 lg:px-16 lg:py-10 z-10"
      >
        {/* Header Navigation: StrokeText Name + SignalType Neon + Magnet Contact */}
        <header className="flex items-center justify-between font-sans text-xs tracking-wide text-[#94A3B8]">
          <div className="flex items-center gap-3">
            <Magnet padding={35} magnetStrength={2.0}>
              <div className="flex items-center cursor-pointer py-1">
                <StrokeText
                  text="Yashvardhan Borude"
                  fontSize={22}
                  fontWeight={700}
                  fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                  strokeColor="#C084FC"
                  fillColor="#EDEDEF"
                  strokeWidth={1.2}
                  drawDuration={1.6}
                  fillDelay={0.3}
                  fillMode="wipe"
                  wipeFrom="left"
                  trigger="mount"
                  hoverRedraw={true}
                  className="tracking-tight"
                />
              </div>
            </Magnet>

            <span className="hidden h-3 w-px bg-[#1E2430] sm:block" aria-hidden="true" />

            <span className="hidden font-mono text-[11px] text-[#94A3B8] sm:inline">
              SYSTEMS &amp; FULL-STACK
            </span>
          </div>

          <nav aria-label="Quick Navigation" className="flex items-center gap-5">
            {/* Signal Type: Neon Sign Ignition Flicker */}
            <div className="hidden md:block">
              <SignalType
                text="Open to High-Impact Engineering Roles"
                glowColor="#A855F7"
                onColor="#F3E8FF"
                offColor="#64748B"
                delay={500}
              />
            </div>

            <Magnet padding={40} magnetStrength={2}>
              <NeonButton
                href="mailto:yashvardhanborude7@gmail.com"
                variant="secondary"
                accentColor="#A855F7"
                aria-label="Send email to yashvardhanborude7@gmail.com"
                icon={<ArrowUpRight className="h-3.5 w-3.5 text-[#C084FC]" />}
                className="rounded-full px-4 py-1.5 text-xs border-[#1E2430] text-[#94A3B8] hover:text-[#EDEDEF]"
              >
                Get in Touch
              </NeonButton>
            </Magnet>
          </nav>
        </header>

        {/* Center Stage: Monumental Typography with Clear Architectural Hierarchy */}
        <div className="my-auto py-8 sm:py-12 lg:py-16 w-full">
          <div className="flex flex-col gap-4 w-full">
            {/* Level 1: Monumental Display Headline with Vapor Disperse */}
            <div className="w-full">
              <VaporType
                words={[
                  "Systems Architect",
                  "Software Engineer",
                  "Full-Stack Craftsman",
                  "Algorithmic Builder",
                ]}
                fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
                fontSize={86}
                fontWeight="800"
                color="#EDEDEF"
                vaporColor="#E9D5FF"
                glowColor="#C084FC"
                interval={2800}
                className="drop-shadow-[0_0_45px_rgba(168,85,247,0.4)]"
              />
            </div>

            {/* Level 2: Highly Visible Architectural Sub-Headline */}
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#A855F7] animate-pulse" />
                <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#C084FC] font-semibold">
                  Engineering Focus:
                </span>
              </div>
              <div className="text-base sm:text-xl font-sans font-medium text-[#EDEDEF]">
                <RotatingText
                  texts={engineeringSpecialties}
                  effect="flip"
                  splitBy="words"
                  highlight={false}
                  rotationInterval={3200}
                  mainClassName="font-semibold text-[#F3E8FF] px-3 py-1 rounded-md bg-[#1E112A]/80 border border-[#A855F7]/30 shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Datum Line, Laser Surface Contact & Interactive Scrambled Narrative */}
        <div ref={datumCardRef} className="w-full">
          <div className="w-full border-t border-[#1E2430]/80 pt-6 sm:pt-8 lg:pt-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 items-start">
              {/* Left: Rewritten Authoritative Bio with Interactive ScrambledText */}
              <div className="md:col-span-8 lg:col-span-7">
                <ScrambledText
                  effect="scramble"
                  radius={120}
                  strength={1}
                  duration={1.2}
                  speed={0.5}
                  scrambleChars=".:/*_#"
                  scrambleColor="#C084FC"
                  clickBurst={true}
                  intro={true}
                  className="font-sans text-base sm:text-lg leading-[1.7] text-[#94A3B8]"
                >
                  Computer engineering graduate specializing in high-concurrency systems, local-first offline architectures, and resilient distributed platforms. Driven by algorithmic precision, clean software craftsmanship, and engineering systems that scale reliably.
                </ScrambledText>
              </div>

              {/* Right: Neon Action Button & Scroll cue */}
              <div className="flex flex-row md:flex-col md:col-span-4 lg:col-span-5 md:items-end justify-between gap-4">
                <Magnet padding={60} magnetStrength={2.8}>
                  <NeonButton
                    href="#work"
                    variant="primary"
                    accentColor="#A855F7"
                    aria-label="Jump to Featured Projects section"
                    icon={<ArrowUpRight className="h-4 w-4 text-[#C084FC]" />}
                    className="rounded-full px-6 py-3 text-sm shadow-[0_0_25px_rgba(168,85,247,0.22)]"
                  >
                    View Featured Projects
                  </NeonButton>
                </Magnet>

                <a
                  href="#work"
                  aria-label="Scroll down to projects"
                  className="group flex items-center gap-1.5 font-mono text-[11px] text-[#94A3B8] transition-colors hover:text-[#C084FC]"
                >
                  <span>explore</span>
                  <ArrowDown className="h-3 w-3 animate-bounce text-[#C084FC]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MonumentalHero;
