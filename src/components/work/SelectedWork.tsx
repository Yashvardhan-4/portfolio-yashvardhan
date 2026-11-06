"use client";

import React, { useState } from "react";
import { carouselPlaceholderProjects, ProjectItem } from "@/data/carouselProjects";
import { ShivkushDiagram } from "./ProjectDiagrams";
import {
  ArrowUpRight,
  Github,
  X,
  Maximize2,
  Layers,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function SelectedWork() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [modalTab, setModalTab] = useState<"overview" | "architecture">("overview");

  return (
    <section
      id="work"
      aria-label="Selected Projects and Built Tools"
      className="relative w-full border-t border-[var(--border)] bg-[var(--bg)] py-20 sm:py-28 scroll-mt-16 transition-colors duration-300"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end border-b border-[var(--border)] pb-8">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-semibold block">
              Selected Work
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[var(--fg)] tracking-tight leading-[0.98]">
              Things I&apos;ve Built.
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[var(--fg-muted)] max-w-prose">
              A collection of applications and tools I&apos;ve designed and built — focusing on speed, clean interfaces, and solving real user problems.
            </p>
          </div>
        </div>

        {/* Dynamic Stacking Cards on Scroll */}
        <div className="relative space-y-12 sm:space-y-16 pb-12">
          {carouselPlaceholderProjects.map((project, index) => {
            // Increasing top offset for cascading stack effect
            const topOffset = 88 + index * 24;

            return (
              <div
                key={project.id}
                style={{ top: `${topOffset}px` }}
                className="sticky transition-all duration-500 ease-out"
              >
                <article className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] shadow-2xl hover:border-[var(--accent)]/50 transition-all duration-500 overflow-hidden">
                  {/* Card Inner Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center p-6 sm:p-8 lg:p-10">
                    {/* Visual Presentation Column (7 Columns) */}
                    <div className="lg:col-span-7">
                      <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-xl">
                        {/* Browser Chrome Header */}
                        <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]/80" />
                            {project.liveUrl && (
                              <span className="ml-3 font-mono text-[11px] text-[var(--fg-muted)] hidden sm:flex items-center gap-1.5 bg-[var(--bg)] px-2.5 py-0.5 rounded border border-[var(--border)]">
                                <span className="text-[#10B981] text-xs">🔒</span>
                                <span className="truncate max-w-[200px]">
                                  {project.liveUrl.replace("https://", "")}
                                </span>
                              </span>
                            )}
                          </div>

                          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] bg-[var(--accent-muted)] px-2.5 py-0.5 rounded border border-[var(--accent)]/30 font-medium">
                            {project.category}
                          </span>
                        </div>

                        {/* High-Resolution Viewport Preview */}
                        <div
                          onClick={() => setActiveProject(project)}
                          className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--bg)] cursor-pointer"
                        >
                          <img
                            src={project.src}
                            alt={project.alt}
                            className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                            loading="lazy"
                          />

                          {/* Hover Inspection Badge */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[var(--bg)]/50 backdrop-blur-[2px]">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent)] bg-[var(--surface)] text-[var(--fg)] font-mono text-xs shadow-lg">
                              <Maximize2 className="h-3.5 w-3.5 text-[var(--accent-secondary)]" />
                              <span>Inspect architecture &amp; details</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Story & Technical Breakdown Column (5 Columns) */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                      <div>
                        <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-wider font-semibold block">
                          {project.category}
                        </span>

                        <h3 className="mt-1 font-serif text-3xl sm:text-4xl text-[var(--fg)] tracking-tight">
                          {project.title}
                        </h3>
                        <p className="mt-1 font-mono text-xs text-[var(--accent-secondary)]">
                          {project.subtitle}
                        </p>

                        <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-[var(--fg-muted)]">
                          {project.description}
                        </p>

                        {/* Benchmark Metrics (Tabular Mono) */}
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 border-y border-[var(--border)] py-3.5">
                          {project.metrics.map((metric, mIdx) => (
                            <div key={mIdx} className="space-y-0.5">
                              <span className="block font-mono text-[9px] text-[var(--fg-subtle)] uppercase tracking-wider">
                                BENCHMARK
                              </span>
                              <span className="block font-mono text-xs text-[var(--fg)] font-medium tabular-nums">
                                {metric}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="font-mono text-[11px] text-[var(--fg-muted)] bg-[var(--surface)] border border-[var(--border)] px-2 py-0.5 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="pt-2 flex flex-wrap items-center gap-2.5">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold hover:opacity-90 shadow-sm transition-all active:scale-[0.98]"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="h-3 w-3 text-[var(--bg)]" />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] font-mono text-xs hover:border-[var(--accent)] hover:text-[var(--accent-secondary)] transition-all active:scale-[0.98]"
                          >
                            <Github className="h-3.5 w-3.5" />
                            <span>Source Code</span>
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => setActiveProject(project)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] font-mono text-xs transition-all active:scale-[0.98]"
                        >
                          <Layers className="h-3.5 w-3.5 text-[var(--accent)]" />
                          <span>Architecture Deep Dive</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Architecture Modal */}
      <AnimatePresence>
        {activeProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[var(--bg)]/85 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] shadow-2xl p-6 sm:p-8 space-y-6"
            >
              {/* Modal Top Bar */}
              <div className="flex items-start justify-between border-b border-[var(--border)] pb-4">
                <div>
                  <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-wider font-semibold block">
                    {activeProject.category}
                  </span>
                  <h3
                    id="modal-project-title"
                    className="mt-1 font-serif text-2xl sm:text-3xl text-[var(--fg)]"
                  >
                    {activeProject.title}
                  </h3>
                  <p className="font-mono text-xs text-[var(--fg-muted)]">{activeProject.subtitle}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  aria-label="Close project modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Tab Switcher */}
              <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setModalTab("overview")}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    modalTab === "overview"
                      ? "bg-[var(--surface)] text-[var(--fg)] font-semibold border border-[var(--border)]"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  Overview &amp; Features
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab("architecture")}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    modalTab === "architecture"
                      ? "bg-[var(--surface)] text-[var(--fg)] font-semibold border border-[var(--border)]"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  Architecture &amp; How It Works
                </button>
              </div>

              {/* Tab 1: Overview */}
              {modalTab === "overview" && (
                <div className="space-y-6">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                    <img
                      src={activeProject.src}
                      alt={activeProject.alt}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                      Key Highlights &amp; Solved Challenges
                    </h4>
                    <ul className="space-y-2 font-sans text-sm text-[var(--fg-muted)]">
                      {activeProject.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold mb-3">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs text-[var(--fg)] bg-[var(--surface)] border border-[var(--border)] px-3 py-1.5 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Architecture & Schematics */}
              {modalTab === "architecture" && (
                <div className="space-y-6">
                  {activeProject.id === "shivkush-consultancy" ? (
                    <ShivkushDiagram />
                  ) : (
                    <div className="border border-[var(--border)] bg-[var(--surface)] p-5 rounded-xl space-y-4">
                      <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 font-mono text-xs text-[var(--fg-muted)]">
                        <span>System Architecture — {activeProject.title}</span>
                        <span className="text-[var(--accent)]">Parallel Execution Core</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs text-[var(--fg-muted)]">
                        <div className="border border-[var(--border)] bg-[var(--surface-card)] p-4 rounded-lg space-y-2">
                          <span className="text-[var(--fg)] font-semibold block">Client Layer</span>
                          <p className="text-[11px] leading-relaxed">
                            Event-driven interface running on React 19 and custom WebGL viewports.
                          </p>
                        </div>
                        <div className="border border-[var(--border)] bg-[var(--surface-card)] p-4 rounded-lg space-y-2">
                          <span className="text-[var(--accent)] font-semibold block">Execution Core</span>
                          <p className="text-[11px] leading-relaxed">
                            Multi-stream concurrency pipelines handling fast local disk writes without buffer locking.
                          </p>
                        </div>
                        <div className="border border-[var(--border)] bg-[var(--surface-card)] p-4 rounded-lg space-y-2">
                          <span className="text-[var(--accent-nature)] font-semibold block">Data Integrity</span>
                          <p className="text-[11px] leading-relaxed">
                            Local-first persistence via IndexedDB &amp; PostgreSQL with zero data loss guarantees.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 font-sans text-sm text-[var(--fg-muted)]">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                      Engineering Principles Applied
                    </h4>
                    <p className="leading-relaxed">
                      Every architectural decision prioritizes user latency, resilient failure recovery, and zero unnecessary dependencies. Built to perform reliably under real-world conditions.
                    </p>
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                <div className="flex items-center gap-3">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold hover:opacity-90 transition-colors"
                    >
                      <span>Visit Live Application</span>
                      <ExternalLink className="h-3.5 w-3.5 text-[var(--bg)]" />
                    </a>
                  )}
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] font-mono text-xs hover:border-[var(--accent)] hover:text-[var(--accent-secondary)] transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>View GitHub Repository</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="font-mono text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
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
