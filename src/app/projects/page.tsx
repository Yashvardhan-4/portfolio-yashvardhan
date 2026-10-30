import React from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { SectionCrosshairHeader } from "@/components/ui/GridHairline";

export const metadata = {
  title: "Project Repository Archive — Yashvardhan Borude",
  description: "Complete ledger of architectural systems, prototypes, and research pipelines.",
};

export default function ProjectsArchivePage() {
  return (
    <div className="py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>RETURN TO PRIMARY FOLIO</span>
          </Link>
        </div>

        {/* Header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-start mb-12 border-b border-[var(--border)] pb-8">
          <div className="lg:col-span-5">
            <SectionCrosshairHeader
              index="ARCHIVE"
              tag="PROJECT REGISTER"
              title="Architectural Systems Ledger."
            />
          </div>
          <div className="lg:col-span-7 flex flex-col justify-end">
            <p className="max-w-prose text-base leading-[1.65] text-[var(--fg-muted)]">
              Full index of candidate architectures, contract deliverables, hackathon MVPs, and machine learning
              pipelines. Each system is documented with problem constraints, technical decisions, and status verification.
            </p>
          </div>
        </div>

        {/* Full Ledger Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)]">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="bg-[var(--bg)] p-6 sm:p-8 flex flex-col justify-between hover:bg-[var(--surface)] transition-all"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] text-[var(--fg-muted)] mb-3">
                  <span className="text-[var(--accent)]">[SYSTEM-0{idx + 1}]</span>
                  <span className="border border-[var(--border)] bg-[var(--surface-raised)] px-2 py-0.5 text-[var(--fg)]">
                    {project.status}
                  </span>
                </div>

                <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[var(--fg)]">
                  {project.title}
                </h2>
                <p className="mt-1 font-mono text-xs text-[var(--accent)]">
                  {project.category} &bull; {project.year}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[var(--fg-muted)]">
                  {project.brief}
                </p>

                {/* Architecture Highlights */}
                <div className="mt-6 border-t border-[var(--border-subtle)] pt-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)] block mb-2">
                    Key Implementations
                  </span>
                  <ul className="flex flex-col gap-2 text-xs text-[var(--fg-muted)]">
                    {project.architecture.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent)] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Pills */}
                <div className="mt-6 flex flex-wrap gap-1 font-mono text-[10px]">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-[var(--fg-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  <span>INSPECT FULL CASE STUDY</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  >
                    GITHUB &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
