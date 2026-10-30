"use client";

import React, { useState } from "react";
import { ConcaveCarousel } from "@/components/ui/ConcaveCarousel";
import { carouselPlaceholderProjects, ProjectItem } from "@/data/carouselProjects";
import { VariableProximity } from "@/components/ui/VariableProximity";
import { TrueFocus } from "@/components/ui/TrueFocus";
import { Threads } from "@/components/ui/Threads";
import { NeonReveal } from "@/components/ui/NeonReveal";
import { NeonButton } from "@/components/ui/NeonButton";
import { FolderFloat, FolderFloatItem } from "@/components/ui/FolderFloat";
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
  const [selectedVaultProject, setSelectedVaultProject] = useState<ProjectItem>(carouselPlaceholderProjects[0]);
  const [isVaultIframeLive, setIsVaultIframeLive] = useState<boolean>(true);
  const [previewMode, setPreviewMode] = useState<"live" | "snapshot">("live");

  return (
    <section
      id="work"
      aria-label="Featured Projects & Engineering Work"
      className="relative w-full border-t border-[#1E2430] bg-[#08090C] py-16 sm:py-24 lg:py-28 overflow-hidden scroll-mt-24"
    >
      {/* 1. Neon Reveal Top Light Beam (Image 2) */}
      <NeonReveal
        badge="HIGH-IMPACT ENGINEERING"
        title="SELECTED WORKS"
        subtitle="Distributed Systems • Multi-Stream Concurrency • Local-First Offline PWA"
        neonColor="#E879F9"
        glowColor="#C084FC"
        beamHeight="280px"
        titleStyle="luminous"
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

        {/* 3. Tactical Matter.js FolderFloat Project Vault & Live Stage */}
        <div className="mt-16 sm:mt-20">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2430] pb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#A855F7] font-semibold flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C084FC] animate-pulse" />
                Zero-Gravity Repository &bull; Systems Archive
              </span>
              <h3 className="mt-1 font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#EDEDEF]">
                Project Vault &amp; Live Systems
              </h3>
            </div>
            <p className="font-mono text-xs text-[#94A3B8] max-w-md">
              Hover or click the vault folder to release production systems into zero gravity. Drag, throw, or select any system to launch its live environment below.
            </p>
          </div>

          {/* Interactive Vault Folder */}
          <div className="w-full mb-10 py-8 px-4 rounded-2xl border border-[#1E2430] bg-[#0E1015]/70 backdrop-blur-md flex flex-col items-center justify-center relative overflow-visible shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
            <div className="text-center mb-3">
              <span className="font-mono text-[11px] text-[#A855F7] tracking-wider uppercase">
                PHYSICS-ENABLED REPOSITORY
              </span>
            </div>

            <FolderFloat
              items={[
                { label: "01 / TurboIDM (32-Stream Concurrency Engine)", value: "turbo-idm" },
                { label: "02 / Inkless (Local-First Offline Journal)", value: "inkless" },
                { label: "03 / Shivkush Nursery & ERP (Digital Platform)", value: "shivkush-nursery-pwa" },
                { label: "04 / Algorithmic Graph Engine (Network Flow)", value: "algorithmic-graph-engine" },
              ]}
              label="Project Vault"
              sublabel="4 Production Systems"
              trigger="hover"
              physics={true}
              drift={0.65}
              width={230}
              height={155}
              spread={210}
              folderColor="#1E2430"
              frontColor="#2D3748"
              paperColor="#0E1015"
              itemColor="#0E1015"
              itemTextColor="#C084FC"
              labelColor="#EDEDEF"
              bounce={0.35}
              onSelect={(val) => {
                const found = carouselPlaceholderProjects.find((p) => p.id === val);
                if (found) setSelectedVaultProject(found);
              }}
            />

            <div className="mt-4 flex items-center gap-2 font-mono text-xs text-[#94A3B8]">
              <span>Active System:</span>
              <span className="text-[#C084FC] font-semibold">{selectedVaultProject.title}</span>
            </div>
          </div>

          {/* Dedicated Live Production System Terminal */}
          <div className="rounded-2xl border border-[#1E2430] bg-[#0E1015]/90 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
            {/* Browser Chrome Header */}
            <div className="flex items-center justify-between border-b border-[#1E2430] bg-[#08090C] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#EF4444]/80" />
                <span className="h-3 w-3 rounded-full bg-[#F59E0B]/80" />
                <span className="h-3 w-3 rounded-full bg-[#10B981]/80" />
                <span className="ml-3 font-mono text-xs text-[#94A3B8] hidden sm:inline">
                  {selectedVaultProject.category}
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-[#1E2430] bg-[#0E1015] px-3 py-1 font-mono text-xs text-[#EDEDEF]">
                <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="truncate max-w-[200px] sm:max-w-[280px]">
                  {selectedVaultProject.liveUrl?.replace(/^https?:\/\//, "") || "local-first system"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {selectedVaultProject.liveUrl && (
                  <button
                    type="button"
                    onClick={() => setIsVaultIframeLive(!isVaultIframeLive)}
                    className="font-mono text-xs text-[#C084FC] hover:text-[#EDEDEF] transition-colors border border-[#1E2430] hover:border-[#A855F7] px-2.5 py-1 rounded bg-[#0E1015]"
                  >
                    {isVaultIframeLive ? "Snapshot Mode" : "Interactive Live"}
                  </button>
                )}
              </div>
            </div>

            {/* Viewport Frame */}
            <div className="relative w-full h-[320px] sm:h-[440px] lg:h-[500px] bg-[#08090C] overflow-hidden">
              {isVaultIframeLive && selectedVaultProject.liveUrl ? (
                <iframe
                  src={selectedVaultProject.liveUrl}
                  title={selectedVaultProject.title}
                  className="w-full h-full border-0"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              ) : (
                <div
                  onClick={() => setActiveProject(selectedVaultProject)}
                  className="relative w-full h-full cursor-pointer overflow-hidden group"
                >
                  <img
                    src={selectedVaultProject.src}
                    alt={selectedVaultProject.alt}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1015] via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#08090C]/60 backdrop-blur-[2px]">
                    <span className="flex items-center gap-2 rounded-full border border-[#A855F7] bg-[#0E1015]/90 px-4 py-2 font-mono text-xs text-[#EDEDEF] shadow-[0_0_20px_rgba(168,85,247,0.35)]">
                      <ExternalLink className="h-4 w-4 text-[#C084FC]" />
                      Inspect Architecture
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* System Metadata, Stack Badges & Technical Drawer Trigger */}
            <div className="p-6 sm:p-8 border-t border-[#1E2430] grid grid-cols-1 md:grid-cols-12 gap-6 items-center justify-between">
              <div className="md:col-span-7">
                <span className="font-mono text-xs uppercase tracking-wider text-[#A855F7] font-semibold">
                  {selectedVaultProject.category}
                </span>
                <h4 className="mt-1 font-serif text-2xl sm:text-3xl text-[#EDEDEF]">
                  {selectedVaultProject.title}
                </h4>
                <p className="mt-2 font-sans text-sm text-[#94A3B8] leading-relaxed">
                  {selectedVaultProject.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedVaultProject.metrics.map((m, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E2430] bg-[#08090C] px-3 py-1 font-mono text-xs text-[#EDEDEF]"
                    >
                      <Activity className="h-3 w-3 text-[#A855F7]" />
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col md:items-end gap-4">
                <div className="flex flex-wrap gap-1.5 justify-start md:justify-end">
                  {selectedVaultProject.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-[#1E2430] bg-[#08090C]/90 px-2.5 py-1 font-mono text-[11px] text-[#C084FC]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveProject(selectedVaultProject)}
                    className="rounded-full border border-[#A855F7]/40 bg-[#1E112A] hover:bg-[#A855F7]/20 px-4 py-2 font-mono text-xs text-[#E9D5FF] transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                  >
                    <span>Architecture Drawer</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#C084FC]" />
                  </button>

                  {selectedVaultProject.githubUrl && (
                    <a
                      href={selectedVaultProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-[#1E2430] p-2 text-[#94A3B8] hover:border-[#38BDF8] hover:text-[#38BDF8] transition-colors"
                      aria-label="View source code on GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}

                  {selectedVaultProject.liveUrl && (
                    <a
                      href={selectedVaultProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full border border-[#1E2430] bg-[#08090C] px-4 py-2 font-mono text-xs text-[#EDEDEF] hover:border-[#A855F7] hover:text-[#C084FC] transition-all"
                    >
                      <span>Open Live</span>
                      <ExternalLink className="h-3.5 w-3.5 text-[#A855F7]" />
                    </a>
                  )}
                </div>
              </div>
            </div>
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
