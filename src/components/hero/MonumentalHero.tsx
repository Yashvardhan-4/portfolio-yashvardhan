"use client";

import React from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { InterferenceRibbons } from "@/components/ui/InterferenceRibbons";
import { RotatingText } from "@/components/ui/RotatingText";
import { GravityLetters } from "@/components/ui/GravityLetters";
import { StrokeText } from "@/components/ui/StrokeText";
import { SignalType } from "@/components/ui/SignalType";
import { NeonButton } from "@/components/ui/NeonButton";
import { ShinyText } from "@/components/ui/ShinyText";
import { Magnet } from "@/components/ui/Magnet";

export function MonumentalHero() {
  const engineeringSpecialties = [
    "Full-Stack Web Platforms",
    "High-Speed Concurrency Engines",
    "Local-First Offline Architectures",
    "Algorithmic Problem Solving",
  ];

  return (
    <div className="relative w-full min-h-[100svh] overflow-hidden bg-[#08090C] flex flex-col justify-between">
      {/* 1. Full-Screen Edge-to-Edge Interference Ribbons (Fine Luminous Wire Filaments) */}
      <InterferenceRibbons
        strandCount={42}
        ribbonCount={3}
        baseColor="#581C87"
        accentColor="#C084FC"
        highlightColor="#38BDF8"
        speed={0.85}
        twist={1.6}
        amplitude={75}
        frequency={0.0032}
        opacity={0.42}
      />

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

        {/* Center Stage: Gravity Letters (Sliceable Sand Physics, Falling & Pouring Back) */}
        <div className="my-auto py-8 sm:py-12 lg:py-16 w-full">
          <div className="flex flex-col gap-3 w-full">
            <GravityLetters
              words={["Systems Architect", "Software Engineer", "Full-Stack Craftsman"]}
              fontSize={80}
              fontWeight={800}
              color="#EDEDEF"
              highlightColor="#C084FC"
              gravity={0.36}
              sliceRadius={28}
              restitutionDelay={1300}
              className="drop-shadow-[0_0_40px_rgba(168,85,247,0.32)]"
            />

            {/* Dynamic RotatingText Subtitle */}
            <div className="mt-2 flex flex-wrap items-center gap-2 font-sans text-sm sm:text-base text-[#94A3B8]">
              <span>Engineering</span>
              <RotatingText
                texts={engineeringSpecialties}
                effect="flip"
                splitBy="words"
                highlight={true}
                highlightColor="#A855F7"
                rotationInterval={3000}
                mainClassName="font-medium px-2.5 py-0.5 rounded-lg text-xs sm:text-sm font-mono shadow-[0_0_15px_rgba(168,85,247,0.35)]"
              />
            </div>
          </div>
        </div>

        {/* Architectural Datum Line, Asymmetric Narrative & Kinetic CTA */}
        <div className="w-full">
          <div className="w-full border-t border-[#1E2430]/70 pt-6 sm:pt-8 lg:pt-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 items-start">
              {/* Left: Positioning statement */}
              <div className="md:col-span-8 lg:col-span-7">
                <p className="max-w-prose font-sans text-base leading-[1.65] text-[#94A3B8] sm:text-lg">
                  <ShinyText
                    text="Software engineer specializing in high-throughput distributed systems, local-first web platforms, and low-latency reactive architectures. Driven by algorithmic depth, clean code craftsmanship, and building software that scales reliably."
                    speed={5}
                  />
                </p>
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
