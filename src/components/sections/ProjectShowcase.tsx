"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, X, Layers, Code, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { projects, Project } from "@/data/projects";
import { SectionCrosshairHeader } from "@/components/ui/GridHairline";

export function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const categories = ["ALL", "Full Stack & WebGL", "Disaster Preparedness", "Machine Learning", "Systems & Algorithms"];

  const filteredProjects =
    activeCategory === "ALL" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="border-b border-[var(--border)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 12-Column Asymmetric Header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-start mb-12">
          <div className="lg:col-span-4">
            <SectionCrosshairHeader
              index="03"
              tag="SYSTEM ARCHITECTURES"
              title="Project Ledger & Case Study Benchmarks."
            />
          </div>

          <div className="lg:col-span-1 hidden lg:block" />

          <div className="lg:col-span-7 flex flex-col justify-between">
            <p className="max-w-prose text-base leading-[1.65] text-[var(--fg-muted)]">
              Modular project architecture showcasing engineered systems. Each case study isolates problem domains,
              state machines, and database constraints. Select any architecture to inspect its technical blueprint or
              view the full repository.
            </p>

            {/* Filter buttons */}
            <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`border px-3 py-1 transition-colors ${
                    activeCategory === cat
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[#08090a] font-medium"
                      : "border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Exposed Hairline Project Ledger */}
        <div className="border border-[var(--border)] bg-[var(--border)] gap-px flex flex-col">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-[var(--bg)] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer hover:bg-[var(--surface)] transition-all"
            >
              <div className="flex-1">
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-[var(--fg-muted)] mb-3">
                  <span className="text-[var(--accent)]">0{idx + 1} //</span>
                  <span className="border border-[var(--border)] bg-[var(--surface-raised)] px-2 py-0.5 text-[var(--fg)]">
                    {project.status}
                  </span>
                  <span>{project.category}</span>
                  <span className="text-[var(--border)]">/</span>
                  <span>{project.year}</span>
                </div>

                {/* Project Title */}
                <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                  {project.title}
                </h3>

                {/* Subtitle / summary */}
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)] max-w-3xl">
                  {project.subtitle}
                </p>

                {/* Tech Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="border border-[var(--border)] bg-[var(--surface)]/70 px-2 py-0.5 text-[var(--fg-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="border border-[var(--border)] px-1.5 py-0.5 text-[var(--fg-muted)]">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Action hint */}
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors lg:pl-6 lg:border-l lg:border-[var(--border)]">
                <span>INSPECT BLUEPRINT</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link to Dedicated Project Archive */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-6 font-mono text-xs">
          <span className="text-[var(--fg-muted)]">
            SCHEMA READY FOR EXPANDED CASE STUDY DOCUMENTATION
          </span>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline"
          >
            <span>ACCESS COMPLETE PROJECT REPOSITORY ARCHIVE</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Slide-Over Drawer / Technical Inspection Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative flex h-full w-full max-w-2xl flex-col border-l border-[var(--border)] bg-[#08090a] shadow-2xl overflow-y-auto sm:border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-[#08090a]/95 px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent)]">
                <ShieldCheck className="h-4 w-4" />
                <span>ARCHITECTURAL SPECIFICATION: {selectedProject.slug}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project blueprint modal"
                className="border border-[var(--border)] bg-[var(--surface)] p-1 text-[var(--fg-muted)] hover:text-[var(--fg)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--fg-muted)]">
                  <span className="border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-[var(--accent)]">
                    {selectedProject.status}
                  </span>
                  <span>{selectedProject.year}</span>
                  <span>&bull;</span>
                  <span>{selectedProject.category}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--fg)] mt-2">
                  {selectedProject.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--fg-muted)] leading-relaxed">
                  {selectedProject.brief}
                </p>
              </div>

              {/* Problem Definition */}
              <div className="border border-[var(--border)] bg-[var(--surface)] p-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] block mb-1">
                  [PROBLEM STATEMENT]
                </span>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
                  {selectedProject.problem}
                </p>
              </div>

              {/* Architecture Decisions */}
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg)] block mb-3">
                  Key Technical Implementations & Architectural Decisions
                </span>
                <ul className="flex flex-col gap-2.5">
                  {selectedProject.architecture.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--fg-muted)] leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-[var(--accent)] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Difficulties & Trade-offs */}
              {selectedProject.challenges.length > 0 && (
                <div className="border-t border-[var(--border)] pt-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)] block mb-2">
                    Engineering Challenges & Mitigations
                  </span>
                  <ul className="flex flex-col gap-2 text-sm text-[var(--fg-muted)]">
                    {selectedProject.challenges.map((c, i) => (
                      <li key={i} className="font-mono text-xs text-[var(--fg-muted)]">
                        &bull; {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)] block mb-2">
                  Stack Verified
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {selectedProject.technologies.map((t) => (
                    <span key={t} className="border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[var(--fg)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics or Outcomes */}
              {selectedProject.metricsOrOutcome && (
                <div className="border-t border-[var(--border)] pt-4 font-mono text-xs">
                  <span className="text-[var(--fg-muted)] block mb-1">RECORDED OUTCOME / EVIDENCE:</span>
                  <span className="text-[var(--accent)]">{selectedProject.metricsOrOutcome}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap gap-3 pt-4 border-t border-[var(--border)]">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-mono text-xs text-[var(--fg)] hover:border-[var(--accent)]"
                  >
                    <span>VIEW GITHUB REPOSITORY</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent)]" />
                  </a>
                )}
                <Link
                  href={`/projects/${selectedProject.slug}`}
                  className="inline-flex items-center gap-1.5 border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 font-mono text-xs font-semibold text-[#08090a] hover:bg-[var(--accent-dim)]"
                >
                  <span>OPEN FULL CASE STUDY PAGE</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
