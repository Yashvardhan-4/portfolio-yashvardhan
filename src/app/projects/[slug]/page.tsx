import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldAlert, Cpu, Layers, GitBranch, ShieldCheck } from "lucide-react";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between border-b border-[var(--border)] pb-4 font-mono text-xs">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>BACK TO PROJECT REGISTER</span>
          </Link>
          <span className="text-[var(--fg-muted)]">[SLUG: {project.slug}]</span>
        </div>

        {/* Header Block */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[var(--accent)] font-semibold">
              STATUS: {project.status.toUpperCase()}
            </span>
            <span className="text-[var(--fg-muted)]">{project.year}</span>
            <span className="text-[var(--border)]">/</span>
            <span className="text-[var(--fg-muted)]">{project.category}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-[var(--fg)] leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-[var(--fg-muted)] leading-relaxed max-w-3xl">
            {project.subtitle}
          </p>
        </div>

        {/* 6-Part Architectural Deep Dive */}
        <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
          {/* 1. Problem Statement */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-wider text-[var(--accent)] flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              <span>01. The Problem</span>
            </div>
            <div className="md:col-span-8 text-base text-[var(--fg)] leading-relaxed">
              <p>{project.problem}</p>
            </div>
          </div>

          {/* 2. What Was Built */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-t border-[var(--border-subtle)] pt-8">
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-wider text-[var(--accent)] flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span>02. System Scope</span>
            </div>
            <div className="md:col-span-8 text-base text-[var(--fg-muted)] leading-relaxed">
              <p>{project.brief}</p>
            </div>
          </div>

          {/* 3. Architectural Decisions */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-t border-[var(--border-subtle)] pt-8">
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-wider text-[var(--accent)] flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              <span>03. Key Implementations</span>
            </div>
            <div className="md:col-span-8">
              <ul className="flex flex-col gap-3">
                {project.architecture.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[var(--fg)] leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-[var(--accent)] mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4. Technical Difficulties */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-t border-[var(--border-subtle)] pt-8">
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-wider text-[var(--accent)] flex items-center gap-2">
              <GitBranch className="h-4 w-4" />
              <span>04. Technical Hardships</span>
            </div>
            <div className="md:col-span-8">
              <ul className="flex flex-col gap-2.5">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="text-sm font-mono text-[var(--fg-muted)]">
                    &bull; {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 5. Verified Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-t border-[var(--border-subtle)] pt-8">
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
              <span>05. Tech Toolchain</span>
            </div>
            <div className="md:col-span-8 flex flex-wrap gap-2 font-mono text-xs">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[var(--fg)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 6. Measurable Result / Evidence */}
          {project.metricsOrOutcome && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-t border-[var(--border-subtle)] pt-8">
              <div className="md:col-span-4 font-mono text-xs uppercase tracking-wider text-[var(--accent)] flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span>06. Evidence & Outcome</span>
              </div>
              <div className="md:col-span-8 font-mono text-sm text-[var(--accent)]">
                {project.metricsOrOutcome}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-[var(--fg)] hover:text-[var(--accent)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>BACK TO ALL PROJECTS</span>
          </Link>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-mono text-xs text-[var(--fg)] hover:border-[var(--accent)]"
            >
              <span>INSPECT GITHUB CODE</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent)]" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
