"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  carouselPlaceholderProjects,
  archiveProjects,
  ProjectItem,
  ArchiveWorkItem,
} from "@/data/carouselProjects";
import { ShivkushDiagram } from "./ProjectDiagrams";
import { LiquidArtPlane } from "./LiquidArtPlane";
import { ElasticDivider } from "@/components/ui/ElasticDivider";
import { MagneticPill } from "@/components/ui/MagneticPill";
import { useTheme } from "@/context/ThemeContext";
import {
  ArrowUpRight,
  Github,
  X,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

export function SelectedWork() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [activeMoodIndex, setActiveMoodIndex] = useState(0);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [modalTab, setModalTab] = useState<"story" | "engineering">("story");
  const spreadRefs = useRef<(HTMLElement | null)[]>([]);

  // Floating hover preview state for Dennis Snellenberg–style archive list
  const [hoveredArchive, setHoveredArchive] = useState<ArchiveWorkItem | null>(null);
  const previewX = useMotionValue(-300);
  const previewY = useMotionValue(-300);
  const smoothPreviewX = useSpring(previewX, { stiffness: 260, damping: 28, mass: 0.5 });
  const smoothPreviewY = useSpring(previewY, { stiffness: 260, damping: 28, mass: 0.5 });

  // Track which flagship chapter is centered in viewport for ambient color wash
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observers: IntersectionObserver[] = [];

    spreadRefs.current.forEach((el, idx) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveMoodIndex(idx);
          }
        },
        { threshold: 0.45 }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close case study modal cleanly on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeProject) {
        closeProjectModal();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const openProjectModal = (project: ProjectItem) => {
    setActiveProject(project);
    setModalTab("story");
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("sprout-inspect-modal", { detail: { open: true, title: project.title } })
      );
      window.dispatchEvent(new CustomEvent("sprout-chapter-react"));
    }
  };

  const closeProjectModal = () => {
    setActiveProject(null);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("sprout-inspect-modal", { detail: { open: false } })
      );
    }
  };

  const activeMood =
    carouselPlaceholderProjects[activeMoodIndex] || carouselPlaceholderProjects[0];
  const moodTint = isLight ? activeMood.moodLight : activeMood.moodDark;

  const handleArchivePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    previewX.set(e.clientX + 28);
    previewY.set(e.clientY - 110);
  };

  return (
    <section
      id="work"
      aria-label="Selected Projects and Stories"
      className="relative w-full bg-[var(--bg)] pb-24 sm:pb-36 scroll-mt-16 transition-colors duration-500"
    >
      {/* Elastic Silk Arch Boundary */}
      <ElasticDivider fill="var(--bg)" className="-mt-10 sm:-mt-16 relative z-20" />

      {/* Studio Ghibli Waterfall Veil (Strictly Light Mode) */}
      {isLight && (
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-25 mix-blend-multiply"
            style={{ backgroundImage: `url('/images/ghibli-mossy-waterfall.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)] opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)]/85 via-transparent to-[var(--bg)]/85" />
        </div>
      )}

      {/* Living Color-Shifting Chapter Mood Wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(ellipse 75% 45% at 50% 42%, ${moodTint}, transparent 75%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-16 pt-12 sm:pt-16">
        {/* Section Editorial Header (12-Column Asymmetric Tension) */}
        <div className="mb-12 sm:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-10 border-b border-[var(--border)]">
          <div className="lg:col-span-7">
            <span className="font-mono text-[11px] text-[var(--accent)] tracking-[0.14em] uppercase font-semibold flex items-center gap-2">
              {isLight && <span aria-hidden="true">🌿</span>}
              03 · Selected Works
            </span>
            <h2 className="mt-2.5 font-serif text-4xl sm:text-6xl lg:text-[4.25rem] font-normal text-[var(--fg)] tracking-[-0.03em] leading-[0.96] [text-wrap:balance]">
              Crafted for real impact.
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end lg:items-end">
            <p className="font-sans text-sm sm:text-base leading-[1.65] text-[var(--fg-muted)] max-w-prose [text-wrap:pretty]">
              Five flagship stories spanning healthcare AI, financial fraud clarity, commercial software, desktop performance, and local-first design.
            </p>
          </div>
        </div>

        {/* 5 Editorial Magazine Flagship Spreads */}
        <div className="divide-y divide-[var(--border)]">
          {carouselPlaceholderProjects.map((project, index) => {
            const imageLeft = index % 2 === 0;

            return (
              <article
                key={project.id}
                ref={(el) => {
                  spreadRefs.current[index] = el;
                }}
                className="group py-14 sm:py-20 first:pt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Artwork Column (7 Cols) */}
                <div
                  className={`lg:col-span-7 ${
                    imageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => openProjectModal(project)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openProjectModal(project);
                      }
                    }}
                    data-cursor-label="VIEW STORY"
                    aria-label={`Open full story for ${project.title}`}
                    className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] shadow-2xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    <LiquidArtPlane src={project.src} alt={project.alt} />

                    {/* Soft Bottom Scrim + Quiet Museum Index */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
                    />
                    <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 font-mono text-[10px] uppercase tracking-[0.14em]">
                      <span className="px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/15 tabular-nums">
                        {project.index} · {project.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/15">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Narrative Story Column (5 Cols) */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-between space-y-5 ${
                    imageLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--accent)]">
                      <span className="font-semibold">{project.roleOrType}</span>
                      <span className="text-[var(--fg-subtle)] tabular-nums">{project.index} / 05</span>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-5xl text-[var(--fg)] tracking-[-0.025em] leading-[1.02]">
                      {project.title}
                    </h3>

                    <p className="font-display text-sm sm:text-base font-medium text-[var(--fg)]/90 leading-snug">
                      {project.humanHook}
                    </p>

                    <p className="font-sans text-sm leading-[1.7] text-[var(--fg-muted)] max-w-prose [text-wrap:pretty]">
                      {project.humanStory}
                    </p>
                  </div>

                  {/* Clean Hairline Metrics Row */}
                  <div className="grid grid-cols-3 gap-3 border-y border-[var(--border)] py-4">
                    {project.humanMetrics.map((m, mIdx) => (
                      <div key={mIdx} className="space-y-1">
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--fg-subtle)]">
                          {m.label}
                        </span>
                        <span className="block font-mono text-xs sm:text-sm font-semibold text-[var(--fg)] tabular-nums">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Row */}
                  <div className="pt-1 flex flex-wrap items-center gap-2.5">
                    <MagneticPill
                      as="button"
                      type="button"
                      variant="primary"
                      cursorLabel="EXPLORE"
                      onClick={() => openProjectModal(project)}
                      className="px-4 py-2 font-mono text-xs font-semibold"
                    >
                      <span>Explore Story</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </MagneticPill>

                    {project.liveUrl && (
                      <MagneticPill
                        as="a"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="secondary"
                        cursorLabel="LIVE SITE"
                        className="px-4 py-2 font-mono text-xs"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="h-3 w-3" />
                      </MagneticPill>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-label="GITHUB"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] font-mono text-xs transition-colors"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Dennis Snellenberg–style Floating-Preview Hairline Archive Index */}
        <div
          className="mt-12 sm:mt-16 pt-12 border-t border-[var(--border)] relative"
          onPointerMove={handleArchivePointerMove}
          onPointerLeave={() => setHoveredArchive(null)}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)] font-semibold block">
                More Verified Works
              </span>
              <h3 className="mt-1 font-serif text-2xl sm:text-4xl text-[var(--fg)] tracking-tight">
                Hackathons &amp; Foundations
              </h3>
            </div>
            <Link
              href="/projects"
              data-cursor-label="FULL ARCHIVE"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
            >
              <span>View Complete Register (8 Projects)</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {archiveProjects.map((item) => (
              <Link
                key={item.id}
                href={`/projects/${item.slug}`}
                onPointerEnter={() => setHoveredArchive(item)}
                data-cursor-label="READ BRIEF"
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6 py-5 sm:py-7 px-2 hover:px-4 transition-all duration-300 hover:bg-[var(--surface)]/50"
              >
                <div className="space-y-1">
                  <span className="font-serif text-2xl sm:text-3xl text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors block">
                    {item.title}
                  </span>
                  <span className="font-sans text-xs sm:text-sm text-[var(--fg-muted)] block">
                    {item.summary}
                  </span>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 shrink-0 font-mono text-xs text-[var(--fg-muted)]">
                  <span className="hidden md:inline-block">{item.category}</span>
                  <span className="tabular-nums text-[var(--fg-subtle)]">{item.year}</span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>

          {/* Floating Spring Image Preview Capsule (Desktop Fine Pointer) */}
          <AnimatePresence>
            {hoveredArchive && (
              <motion.div
                key={hoveredArchive.id}
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.72, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                exit={{ opacity: 0, scale: 0.72, rotate: -4 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{ left: smoothPreviewX, top: smoothPreviewY }}
                className="hidden lg:block fixed z-40 pointer-events-none w-72 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-card)] shadow-2xl"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={hoveredArchive.previewImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-3.5 py-2.5 flex items-center justify-between font-mono text-[10px] text-[var(--fg-muted)] bg-[var(--surface)]">
                  <span className="truncate">{hoveredArchive.outcome}</span>
                  <span className="text-[var(--accent)] shrink-0 ml-2">{hoveredArchive.year}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Full-Screen Curved Curtain Case-Study Takeover Modal */}
      <AnimatePresence>
        {activeProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[var(--bg)]/85 backdrop-blur-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            onClick={closeProjectModal}
          >
            <motion.div
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 40, scale: 0.94, borderRadius: "2.5rem" }}
              animate={{ opacity: 1, y: 0, scale: 1, borderRadius: "1rem" }}
              exit={{ opacity: 0, y: 30, scale: 0.96, borderRadius: "2rem" }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-[var(--border)] bg-[var(--surface)] shadow-2xl p-6 sm:p-9 space-y-6"
            >
              {/* Modal Top Bar */}
              <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-5">
                <div>
                  <span className="font-mono text-[11px] text-[var(--accent)] uppercase tracking-[0.14em] font-semibold block">
                    {activeProject.index} · {activeProject.category} · {activeProject.year}
                  </span>
                  <h3
                    id="modal-project-title"
                    className="mt-1.5 font-serif text-3xl sm:text-4xl text-[var(--fg)] tracking-tight"
                  >
                    {activeProject.title}
                  </h3>
                  <p className="mt-1 font-sans text-xs sm:text-sm text-[var(--fg-muted)]">
                    {activeProject.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeProjectModal}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition-colors cursor-pointer"
                  aria-label="Close project modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Dual-Audience Tab Switcher */}
              <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border)] pb-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setModalTab("story")}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-colors cursor-pointer ${
                    modalTab === "story"
                      ? "bg-[var(--fg)] text-[var(--bg)] font-semibold"
                      : "border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>The Story (Overview)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab("engineering")}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-colors cursor-pointer ${
                    modalTab === "engineering"
                      ? "bg-[var(--fg)] text-[var(--bg)] font-semibold"
                      : "border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  <Wrench className="h-3.5 w-3.5" />
                  <span>Under the Hood (For Engineers)</span>
                </button>
              </div>

              {/* Tab 1: Plain-English Human Story */}
              {modalTab === "story" && (
                <div className="space-y-6">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                    <img
                      src={activeProject.src}
                      alt={activeProject.alt}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <p className="font-serif text-xl sm:text-2xl text-[var(--fg)] leading-relaxed">
                    {activeProject.humanHook}
                  </p>

                  <p className="font-sans text-sm sm:text-base text-[var(--fg-muted)] leading-[1.7] max-w-prose">
                    {activeProject.humanStory}
                  </p>

                  <div className="space-y-3 border-t border-[var(--border)] pt-5">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                      Why It Matters
                    </h4>
                    <ul className="space-y-2.5 font-sans text-sm text-[var(--fg-muted)]">
                      {activeProject.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 2: Deep Technical Breakdown for SWE Reviewers */}
              {modalTab === "engineering" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                      Verified Architecture &amp; Engineering Specs
                    </h4>
                    <ul className="space-y-3 font-sans text-sm text-[var(--fg)] leading-relaxed">
                      {activeProject.engineeringHighlights.map((spec, sIdx) => (
                        <li
                          key={sIdx}
                          className="flex items-start gap-3 border-t border-[var(--border)] pt-3 first:border-t-0 first:pt-0"
                        >
                          <span className="font-mono text-[11px] text-[var(--accent)] mt-0.5 shrink-0 tabular-nums">
                            0{sIdx + 1}
                          </span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {activeProject.id === "shivkush-consultancy" && <ShivkushDiagram />}

                  <div className="border-t border-[var(--border)] pt-5">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold mb-3">
                      Core Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs text-[var(--fg)] bg-[var(--bg)] border border-[var(--border)] px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Bottom Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      <span>Open Live Site</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] font-mono text-xs hover:border-[var(--accent)] transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}
                  <Link
                    href={`/projects/${activeProject.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] font-mono text-xs transition-colors"
                  >
                    <span>Full Case Study Page</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={closeProjectModal}
                  className="font-mono text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] cursor-pointer"
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
