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
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function SelectedWork() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [previewMode, setPreviewMode] = useState<"live" | "snapshot">("live");
  const [interactiveCardId, setInteractiveCardId] = useState<string | null>(null);

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
        {/* Section Header */}
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
              Explore production architectures with live interactive previews. Built for multi-stream download concurrency, local-first offline resilience, and commercial enterprise operations.
            </p>
          </div>
        </div>

        {/* 3D Curved Carousel (Renders real website screenshot textures) */}
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

        {/* Navigation Guidance Strip */}
        <div className="mt-4 flex flex-wrap items-center justify-between text-xs font-mono text-[#94A3B8] px-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-pulse" />
            <span>Click any 3D card or live preview card to open architecture breakdown</span>
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

        {/* 3. Dedicated Live Website Preview Cards Grid */}
        <div className="mt-14 sm:mt-18">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#1E2430] pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#A855F7] font-semibold">
                Interactive Systems
              </span>
              <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-normal text-[#EDEDEF]">
                Live Preview Cards
              </h3>
            </div>
            <p className="font-mono text-xs text-[#94A3B8]">
              Direct embedded previews &bull; Scroll, click, or test live
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {carouselPlaceholderProjects.map((project) => {
              const isIframeActive = interactiveCardId === project.id;

              return (
                <div
                  key={project.id}
                  className="group flex flex-col justify-between rounded-2xl border border-[#1E2430] bg-[#0E1015]/85 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-[#A855F7]/60 hover:shadow-[0_0_35px_rgba(168,85,247,0.18)]"
                >
                  {/* Top: Browser Mockup Frame */}
                  <div>
                    {/* Browser Chrome Header */}
                    <div className="flex items-center justify-between border-b border-[#1E2430] bg-[#08090C] px-3.5 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]/80" />
                      </div>

                      <div className="flex items-center gap-1.5 rounded-md border border-[#1E2430] bg-[#0E1015] px-2.5 py-0.5 font-mono text-[10px] text-[#94A3B8]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                        <span className="truncate max-w-[140px] sm:max-w-[170px]">
                          {project.liveUrl?.replace(/^https?:\/\//, "")}
                        </span>
                      </div>

                      {project.liveUrl && (
                        <button
                          type="button"
                          onClick={() => setInteractiveCardId(isIframeActive ? null : project.id)}
                          className="font-mono text-[10px] text-[#C084FC] hover:text-[#EDEDEF] transition-colors border border-[#1E2430] hover:border-[#A855F7] px-2 py-0.5 rounded bg-[#0E1015]"
                          title={isIframeActive ? "Show screenshot" : "Interact with live site"}
                        >
                          {isIframeActive ? "Snapshot" : "Interact"}
                        </button>
                      )}
                    </div>

                    {/* Preview Viewport */}
                    <div className="relative w-full h-[220px] sm:h-[240px] bg-[#08090C] overflow-hidden">
                      {isIframeActive && project.liveUrl ? (
                        <iframe
                          src={project.liveUrl}
                          title={project.title}
                          className="w-full h-full border-0"
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                      ) : (
                        <div
                          onClick={() => setActiveProject(project)}
                          className="relative w-full h-full cursor-pointer overflow-hidden"
                        >
                          <img
                            src={project.src}
                            alt={project.alt}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1015] via-transparent to-transparent opacity-60" />
                          
                          {/* Hover Overlay Hint */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#08090C]/60 backdrop-blur-[2px]">
                            <span className="flex items-center gap-1.5 rounded-full border border-[#A855F7] bg-[#0E1015]/90 px-3.5 py-1.5 font-mono text-xs text-[#EDEDEF] shadow-[0_0_20px_rgba(168,85,247,0.35)]">
                              <ExternalLink className="h-3.5 w-3.5 text-[#C084FC]" />
                              Inspect Architecture
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 space-y-4">
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#A855F7] font-semibold">
                          {project.category}
                        </span>
                        <h4 className="mt-1 font-serif text-xl sm:text-2xl font-normal text-[#EDEDEF]">
                          {project.title}
                        </h4>
                        <p className="mt-1.5 font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Verified Metrics Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.metrics.slice(0, 2).map((m, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E2430] bg-[#08090C] px-2.5 py-1 font-mono text-[11px] text-[#EDEDEF]"
                          >
                            <Activity className="h-3 w-3 text-[#A855F7]" />
                            {m}
                          </span>
                        ))}
                      </div>

                      {/* Stack Badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="rounded-md border border-[#1E2430] bg-[#08090C]/80 px-2 py-0.5 font-mono text-[10px] text-[#C084FC]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-[#1E2430]/60 mt-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="font-mono text-xs text-[#94A3B8] hover:text-[#C084FC] transition-colors flex items-center gap-1"
                    >
                      <span>Architecture</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-[#1E2430] p-1.5 text-[#94A3B8] hover:border-[#38BDF8] hover:text-[#38BDF8] transition-colors"
                          aria-label="View source code on GitHub"
                        >
                          <Github className="h-3.5 w-3.5" />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 rounded-full border border-[#1E2430] bg-[#08090C] px-3 py-1 font-mono text-xs text-[#EDEDEF] hover:border-[#A855F7] hover:text-[#C084FC] transition-all"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="h-3 w-3 text-[#A855F7]" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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

              {/* Embedded Live Website Preview Frame */}
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
                        {previewMode === "live" ? "View Retina Snapshot" : "Interact Live (iFrame)"}
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
