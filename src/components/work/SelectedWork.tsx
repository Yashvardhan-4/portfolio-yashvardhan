"use client";

import React, { useState } from "react";
import { ConcaveCarousel } from "@/components/ui/ConcaveCarousel";
import { carouselPlaceholderProjects, ProjectItem } from "@/data/carouselProjects";
import { VariableProximity } from "@/components/ui/VariableProximity";
import { TrueFocus } from "@/components/ui/TrueFocus";
import { Threads } from "@/components/ui/Threads";
import { NeonReveal } from "@/components/ui/NeonReveal";
import { NeonButton } from "@/components/ui/NeonButton";
import {
  ArrowUpRight,
  Github,
  X,
  Activity,
  CheckCircle2,
  Globe,
  Monitor,
  ExternalLink,
  Code2,
  Play,
  Layers,
  Sparkles,
  Maximize2,
  ChevronRight,
  Laptop,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function SelectedWork() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [viewMode, setViewMode] = useState<"showcase" | "3d">("showcase");
  const [previewMode, setPreviewMode] = useState<"live" | "snapshot">("snapshot");

  const currentProject = carouselPlaceholderProjects[selectedIdx] ?? carouselPlaceholderProjects[0];

  return (
    <section
      id="work"
      aria-label="Projects and Software Tools"
      className="relative w-full border-t border-[#1E2430] bg-[#08090C] py-16 sm:py-24 lg:py-28 overflow-hidden scroll-mt-24"
    >
      {/* 1. Neon Reveal Top Light Beam */}
      <NeonReveal
        badge="WHAT I BUILD"
        title="MY PROJECTS"
        subtitle="Fast, Parallel Downloads • Works Even Without Internet • Real-World Business Tools"
        neonColor="#E879F9"
        glowColor="#C084FC"
        beamHeight="260px"
        titleStyle="luminous"
        interactive={true}
        className="mb-6 sm:mb-8"
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

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:mb-12 lg:grid-cols-12 lg:gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#A855F7] tracking-wider uppercase font-semibold">
                Portfolio Showcase
              </span>
              <span className="text-[#1E2430]">&bull;</span>
              <TrueFocus
                sentence="PROJECTS I'VE BUILT"
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
                label="Things I've Built."
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
              A collection of applications and tools I&apos;ve designed and built — focusing on speed, clean interfaces, and solving real user problems.
            </p>

            {/* View Mode Switcher Pill */}
            <div className="mt-4 flex items-center gap-2 self-start lg:self-auto">
              <span className="font-mono text-[11px] text-[#64748B] uppercase tracking-wider mr-1">
                View:
              </span>
              <div className="inline-flex items-center rounded-full border border-[#1E2430] bg-[#0E1015]/80 p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode("showcase")}
                  className={`px-3 py-1 rounded-full font-mono text-xs transition-all ${
                    viewMode === "showcase"
                      ? "bg-[#A855F7] text-white font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                      : "text-[#94A3B8] hover:text-[#EDEDEF]"
                  }`}
                >
                  Featured Showcase
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("3d")}
                  className={`px-3 py-1 rounded-full font-mono text-xs transition-all ${
                    viewMode === "3d"
                      ? "bg-[#A855F7] text-white font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                      : "text-[#94A3B8] hover:text-[#EDEDEF]"
                  }`}
                >
                  3D Curved Reel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MODE 1: GRAND VISUAL SHOWCASE (DEFAULT - LARGE VISUAL PRESENTATION) */}
        {viewMode === "showcase" && (
          <div className="space-y-6">
            {/* Project Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[#1E2430]/80 pb-4">
              {carouselPlaceholderProjects.map((p, idx) => {
                const isSelected = selectedIdx === idx;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    className={`group relative flex items-center gap-2.5 px-4 py-2 rounded-xl border font-mono text-xs transition-all duration-300 ${
                      isSelected
                        ? "border-[#A855F7] bg-[#A855F7]/10 text-[#EDEDEF] shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                        : "border-[#1E2430] bg-[#0E1015]/60 text-[#94A3B8] hover:border-[#2E3748] hover:text-[#EDEDEF]"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        isSelected ? "bg-[#A855F7]" : "bg-[#64748B] group-hover:bg-[#EDEDEF]"
                      }`}
                    />
                    <span className="font-semibold text-[#A855F7]">0{idx + 1}.</span>
                    <span>{p.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Stage: Large Split-Pane Visual Presentation */}
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
            >
              {/* Left Column (Columns 1–7): Large Browser Presentation Frame */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="relative group overflow-hidden rounded-2xl border border-[#202736] bg-[#0A0D14] shadow-[0_20px_60px_rgba(0,0,0,0.85)] hover:border-[#A855F7]/50 transition-all duration-500">
                  {/* macOS Browser Chrome Bar */}
                  <div className="flex items-center justify-between border-b border-[#1E2430] bg-[#0E1015] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]/80" />
                      {currentProject.liveUrl && (
                        <span className="ml-3 font-mono text-[11px] text-[#94A3B8] hidden sm:flex items-center gap-1.5 bg-[#08090C] px-3 py-1 rounded-md border border-[#1E2430]">
                          <span className="text-[#10B981] text-xs">🔒</span>
                          <span className="truncate max-w-[240px]">
                            {currentProject.liveUrl.replace("https://", "")}
                          </span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#A855F7] bg-[#A855F7]/10 px-2 py-0.5 rounded border border-[#A855F7]/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-pulse" />
                        <span>Interactive System</span>
                      </span>
                    </div>
                  </div>

                  {/* High-Resolution Expansive Preview Canvas */}
                  <div
                    onClick={() => setActiveProject(currentProject)}
                    className="relative aspect-[16/10] w-full overflow-hidden bg-[#08090C] cursor-pointer"
                  >
                    <img
                      src={currentProject.src}
                      alt={currentProject.alt}
                      className="w-full h-full object-cover object-top filter brightness-[0.97] contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      loading="eager"
                    />

                    {/* Gradient Depth Overlay on Bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/80 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Center Inspection Pill on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[#08090C]/40 backdrop-blur-[2px]">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#A855F7] bg-[#0E1015]/90 text-white font-mono text-xs shadow-[0_0_25px_rgba(168,85,247,0.5)]">
                        <Maximize2 className="h-3.5 w-3.5 text-[#C084FC]" />
                        <span>Click to view details &amp; how it works</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (Columns 8–12): Project Story, Plain-Language Highlights & Actions */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#1E2430] bg-[#0E1015]/70 p-6 sm:p-8 backdrop-blur-xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#A855F7] font-semibold">
                      {currentProject.category}
                    </span>
                  </div>

                  <h3 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#EDEDEF] tracking-tight">
                    {currentProject.title}
                  </h3>

                  <p className="mt-1 font-mono text-xs text-[#C084FC]">
                    {currentProject.subtitle}
                  </p>

                  <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-[#94A3B8]">
                    {currentProject.description}
                  </p>

                  {/* Highlights Grid with Plain Language */}
                  <div className="mt-6 space-y-2.5 border-t border-[#1E2430] pt-5">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-[#94A3B8] font-semibold mb-3">
                      Key Highlights:
                    </span>
                    {currentProject.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 text-[#A855F7] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Badges */}
                  <div className="mt-6 pt-5 border-t border-[#1E2430]">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-[#94A3B8] font-semibold mb-2.5">
                      Technologies Used:
                    </span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {currentProject.stack.map((t, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-[#1E2430] bg-[#0A0D14] px-2.5 py-1 font-mono text-xs text-[#EDEDEF]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="mt-8 pt-5 border-t border-[#1E2430] flex flex-wrap items-center gap-3">
                  {currentProject.liveUrl && (
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EDEDEF] text-[#08090B] font-sans text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 hover:bg-white hover:shadow-[0_0_24px_rgba(255,255,255,0.25)]"
                    >
                      <span>Visit Live Site</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}

                  {currentProject.githubUrl && (
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#1E2430] bg-[#0A0D14] text-xs sm:text-sm font-mono text-[#EDEDEF] hover:border-[#A855F7] hover:text-[#C084FC] transition-all"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>View Code</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveProject(currentProject)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#1E2430] bg-transparent text-xs sm:text-sm font-mono text-[#94A3B8] hover:text-[#EDEDEF] hover:border-[#64748B] transition-all ml-auto"
                  >
                    <span>How It Works</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* MODE 2: 3D CURVED CAROUSEL (ENLARGED VISUALS) */}
        {viewMode === "3d" && (
          <div className="space-y-4">
            <div className="relative w-full rounded-2xl border border-[#1E2430] bg-[#0E1015]/75 backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <ConcaveCarousel
                items={carouselPlaceholderProjects}
                aspect={1.6}
                size={0.68}
                curvature={0.72}
                distance={3.0}
                tilt={0}
                gap={24}
                radius={16}
                reflection={0.16}
                dim={0.28}
                autoplay="drift"
                speed={0.035}
                snap={true}
                inertia={0.35}
                pauseOnHover={true}
                draggable={true}
                wheel={true}
                captions={true}
                controls={true}
                backgroundColor="transparent"
                onIndexChange={(idx) => setSelectedIdx(idx)}
                onSelect={(item) => setActiveProject(item as ProjectItem)}
                className="h-[520px] sm:h-[580px]"
              />
            </div>

            {/* Navigation Strip */}
            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#94A3B8] px-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-pulse" />
                <span>Drag to rotate 3D reel • Click any card for details</span>
              </div>
              <div className="flex items-center gap-3">
                {carouselPlaceholderProjects.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActiveProject(p)}
                    className="hover:text-[#C084FC] transition-colors underline-offset-4 hover:underline"
                  >
                    0{idx + 1}. {p.title.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Project Details Modal */}
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
              className="relative w-full max-w-4xl rounded-2xl border border-[#A855F7]/40 bg-[#0E1015] p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.25)] z-10 max-h-[90vh] overflow-y-auto"
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

              {/* Embedded Website Preview Frame */}
              {activeProject.liveUrl && (
                <div className="mt-6 overflow-hidden rounded-xl border border-[#1E2430] bg-[#08090C] shadow-2xl">
                  {/* macOS Browser Chrome */}
                  <div className="flex items-center justify-between border-b border-[#1E2430] bg-[#0E1015] px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#EF4444]/80" />
                      <span className="h-3 w-3 rounded-full bg-[#F59E0B]/80" />
                      <span className="h-3 w-3 rounded-full bg-[#10B981]/80" />
                      <span className="ml-3 font-mono text-[11px] text-[#94A3B8] flex items-center gap-1.5 bg-[#08090C] px-3 py-0.5 rounded-md border border-[#1E2430]">
                        <span className="text-[#10B981] text-xs">🔒</span>
                        {activeProject.liveUrl}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewMode(previewMode === "live" ? "snapshot" : "live")}
                        className="font-mono text-[11px] text-[#C084FC] hover:text-[#EDEDEF] transition-colors bg-[#1E2430]/60 hover:bg-[#1E2430] px-2.5 py-1 rounded"
                      >
                        {previewMode === "live" ? "View Screenshot" : "Interact Live (iFrame)"}
                      </button>
                    </div>
                  </div>

                  {/* Viewport Frame */}
                  <div className="relative w-full h-[360px] sm:h-[420px] bg-[#08090C] overflow-hidden">
                    {previewMode === "live" ? (
                      <iframe
                        src={activeProject.liveUrl}
                        title={activeProject.title}
                        className="w-full h-full border-0"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      />
                    ) : (
                      <img
                        src={activeProject.src}
                        alt={activeProject.alt}
                        className="w-full h-full object-cover object-top"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Key Results Strip */}
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

              {/* Description & How It's Built */}
              <div className="mt-6 space-y-4">
                <p className="font-sans text-sm sm:text-base leading-relaxed text-[#94A3B8]">
                  {activeProject.description}
                </p>

                {/* How It's Built Highlights */}
                <div className="rounded-xl border border-[#1E2430] bg-[#08090C]/60 p-4 space-y-2.5">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-[#C084FC] font-semibold">
                    How It Works &amp; Key Features
                  </span>
                  {activeProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs font-sans text-[#94A3B8] leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-[#38BDF8] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="pt-2">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-[#94A3B8] mb-2.5">
                    Technologies
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
                      Visit Live Site
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
                      View Source
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
