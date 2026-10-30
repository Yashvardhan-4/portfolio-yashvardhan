"use client";

import React from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { DappledLight } from "@/components/ui/DappledLight";
import { RotatingText } from "@/components/ui/RotatingText";
import { ParticleText } from "@/components/ui/ParticleText";
import { StrokeText } from "@/components/ui/StrokeText";
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
    <div className="relative w-full overflow-hidden bg-[#08090C]">
      {/* 1. Living WebGL Dappled Light Background (Restrained Neon Violet & Deep Obsidian) */}
      <DappledLight
        plant="ficus"
        placement="top-right"
        backgroundColor="#08090C"
        lightColor="#9333EA"
        shadowColor="#040507"
        window="on"
        windowAngle={32}
        windowSize={0.65}
        intensity={0.62}
        bloom={0.45}
        breeze={true}
        wind={0.65}
        windSpeed={0.9}
        grain={0.12}
        className="min-h-[100svh]"
      >
        <section
          aria-label="Introduction and Hero"
          className="relative mx-auto flex min-h-[calc(100svh-1.5rem)] w-full max-w-7xl flex-col justify-between px-6 py-6 sm:px-10 sm:py-8 lg:px-16 lg:py-10 z-10"
        >
          {/* Header Navigation with Animated StrokeText Name */}
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
                FULL-STACK &amp; SYSTEMS ENGINEER
              </span>
            </div>

            <nav aria-label="Quick Navigation" className="flex items-center gap-4">
              <span className="hidden font-mono text-[11px] text-[#94A3B8] md:inline">
                Open to High-Impact Engineering Roles
              </span>

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

          {/* Monumental Headline with Interactive ParticleText */}
          <div className="my-auto py-8 sm:py-12 lg:py-14">
            <div className="flex flex-col gap-2">
              <div className="overflow-visible">
                <ParticleText
                  text="Systems Architect"
                  fontSize="clamp(2.75rem, 7.8vw, 6.2rem)"
                  fontWeight={800}
                  fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                  color="#EDEDEF"
                  highlightColor="#C084FC"
                  highlightMode="motion"
                  intro="gather"
                  scatter={40}
                  gatherDuration={1.8}
                  pointerRepel={3.5}
                  repelRadius={85}
                  clickBurst={true}
                  burstStrength={12}
                  idleDrift={0.65}
                  glow={true}
                  className="drop-shadow-[0_0_35px_rgba(168,85,247,0.35)]"
                />
              </div>

              {/* Dynamic RotatingText Subtitle - Clean Editorial Replacement for // focus */}
              <div className="mt-4 flex flex-wrap items-center gap-2 font-sans text-sm sm:text-base text-[#94A3B8]">
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
            <div className="w-full border-t border-[#1E2430] pt-6 sm:pt-8 lg:pt-10">
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
      </DappledLight>
    </div>
  );
}

export default MonumentalHero;
