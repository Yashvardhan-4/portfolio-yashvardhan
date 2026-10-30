"use client";

import React, { useState } from "react";
import { ConcaveCarousel } from "@/components/ui/ConcaveCarousel";
import { carouselPlaceholderProjects, ProjectItem } from "@/data/carouselProjects";
import { VariableProximity } from "@/components/ui/VariableProximity";
import { TrueFocus } from "@/components/ui/TrueFocus";
import { Threads } from "@/components/ui/Threads";
import { StarBorder } from "@/components/ui/StarBorder";
import { NeonReveal } from "@/components/ui/NeonReveal";
import { NeonButton } from "@/components/ui/NeonButton";
import { ArrowUpRight, Github, X, Activity, CheckCircle2, Layers } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function SelectedWork() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  return (
    <section
      id="work"
      aria-label="Featured Projects & Engineering Work"
      className="relative w-full border-t border-[#1E2430] bg-[#08090C] py-16 sm:py-24 lg:py-28 overflow-hidden scroll-mt-24"
    >
      {/* 1. Neon Reveal Top Light Beam */}
      <NeonReveal
        title="SELECTED WORKS"
        neonColor="#C084FC"
        glowColor="#A855F7"
        beamHeight="130px"
        interactive={true}
        className="mb-8"
      />

      {/* 2. WebGL Dynamic Threads Filament Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0" aria-hidden="true">
        <Threads
          color={[0.66, 0.33, 0.97]}
          accentColor={[0.22, 0.74, 0.97]}
          amplitude={1.3}
          distance={0.35}
          lineCount={60}
          thickness={0.7}
          softness={1.2}
          speed={0.35}
          waves={1.05}
          angle={25}
          parting={0.4}
          brightness={1.3}
          fade={0.15}
          opacity={0.35}
          enableMouseInteraction={true}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Header without AI slop // */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:mb-12 lg:grid-cols-12 lg:gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#A855F7] tracking-wider uppercase font-semibold">
                Portfolio Showcase
              </span>
              <span className="text-[#1E2430]">&bull;</span>
              <TrueFocus
                sentence="FEATURED PROJECTS"
                focusStyle="brackets"
                borderColor="#A855F7"
                cornerSize={6}
                borderWidth={1.5}
                blurAmount={0}
                unfocusedOpacity={0.7}
                animationDuration={0.4}
                pauseBetweenAnimations={1.8}
                className="font-mono text-xs uppercase tracking-widest text-[#C084FC]"
                wordClassName="font-mono text-xs uppercase tracking-widest"
              />
            </div>
            <div className="mt-3 font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#EDEDEF]">
              <VariableProximity
                label="Production Platforms & Systems."
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 800"
                radius={120}
                falloff="gaussian"
                scale={1.04}
                lift={0.05}
                fromColor="#EDEDEF"
                toColor="#C084FC"
                idleWave={true}
                className="cursor-default"
              />
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end lg:pt-5">
            <p className="max-w-prose font-sans text-sm sm:text-base leading-relaxed text-[#94A3B8]">
              Drag to explore production systems built for enterprise operations, download concurrency, local-first sync, and 3D graphics. Click any card to inspect architecture blueprints.
            </p>
          </div>
        </div>

        {/* 3D Curved Carousel */}
        <div className="relative w-full rounded-2xl border border-[#1E2430] bg-[#0E1015]/75 backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <ConcaveCarousel
            items={carouselPlaceholderProjects}
            aspect={1.5}
            size={0.52}
            curvature={0.78}
            distance={3.6}
            tilt={0}
            gap={22}
            radius={14}
            reflection={0.16}
            dim={0.32}
            autoplay="drift"
            speed={0.04}
            snap={true}
            inertia={0.35}
            pauseOnHover={true}
            draggable={true}
            wheel={true}
            captions={true}
            controls={true}
            backgroundColor="transparent"
            onIndexChange={() => {}}
            onSelect={(item) => setActiveProject(item as ProjectItem)}
            className="h-[480px] sm:h-[540px]"
          />
        </div>

        {/* Subtle navigation guidance */}
        <div className="mt-4 flex flex-wrap items-center justify-between text-xs font-mono text-[#94A3B8] px-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-pulse" />
            <span>Click any project card to open technical case study</span>
          </div>
          <div className="flex items-center gap-3">
            {carouselPlaceholderProjects.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveProject(p)}
                className="hover:text-[#C084FC] transition-colors underline-offset-4 hover:underline"
              >
                {idx + 1}. {p.title.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Project Details Modal / Drawer */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-[#08090C]/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl rounded-2xl border border-[#A855F7]/40 bg-[#0E1015] p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.25)] z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-[#1E2430] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#A855F7]">
                    {activeProject.category}
                  </span>
                  <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-normal text-[#EDEDEF]">
                    {activeProject.title}
                  </h3>
                  <p className="mt-1 font-sans text-sm text-[#94A3B8]">
                    {activeProject.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="rounded-full border border-[#1E2430] p-2 text-[#94A3B8] hover:border-[#A855F7] hover:text-[#EDEDEF] transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Verified Metrics Strip */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeProject.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-[#1E2430] bg-[#08090C]/80 p-3.5 flex items-center gap-2.5"
                  >
                    <Activity className="h-4 w-4 text-[#A855F7] shrink-0" />
                    <span className="font-mono text-xs font-medium text-[#EDEDEF]">
                      {metric}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mt-6 space-y-4">
                <p className="font-sans text-sm sm:text-base leading-relaxed text-[#94A3B8]">
                  {activeProject.description}
                </p>

                {/* Key Technical Highlights */}
                <div className="rounded-xl border border-[#1E2430] bg-[#08090C]/60 p-4 space-y-2.5">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-[#C084FC] font-semibold">
                    Core Architectural Implementations
                  </span>
                  {activeProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs font-sans text-[#94A3B8] leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-[#38BDF8] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Blueprint */}
                <div className="pt-2">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-[#94A3B8] mb-2.5">
                    Technology Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.stack.map((t, i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-[#1E2430] bg-[#08090C] px-2.5 py-1 font-mono text-xs text-[#C084FC]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#1E2430] pt-5">
                <div className="flex items-center gap-3">
                  {activeProject.liveUrl && (
                    <NeonButton
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      accentColor="#A855F7"
                      icon={<ArrowUpRight className="h-4 w-4 text-[#C084FC]" />}
                      className="rounded-full px-5 py-2 text-xs"
                    >
                      Visit Live System
                    </NeonButton>
                  )}

                  {activeProject.githubUrl && (
                    <NeonButton
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      accentColor="#38BDF8"
                      icon={<Github className="h-4 w-4 text-[#38BDF8]" />}
                      className="rounded-full px-5 py-2 text-xs"
                    >
                      Source Code
                    </NeonButton>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="font-mono text-xs text-[#94A3B8] hover:text-[#EDEDEF] transition-colors"
                >
                  Close [Esc]
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default SelectedWork;
