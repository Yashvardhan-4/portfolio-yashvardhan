"use client";

import React from "react";
import { ArrowDown, ArrowUpRight, Award, Code2, Terminal as TerminalIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { GraphCanvas } from "./GraphCanvas";

export function HeroSection() {
  return (
    <section id="overview" className="relative border-b border-[var(--border)] pt-8 pb-14 md:pt-14 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Architectural Specifier */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4 font-mono text-[11px] text-[var(--fg-muted)]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--accent)]">[SYS-INDEX: 01]</span>
            <span className="text-[var(--border)]">/</span>
            <span>FOLIO V1.0</span>
            <span className="text-[var(--border)]">/</span>
            <span className="text-[var(--fg)]">PUNE, INDIA</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)] animate-ping" />
            <span className="text-[var(--fg)]">STATUS: OPEN FOR ENGINEERING ROLES & CONTRACTS</span>
          </div>
        </div>

        {/* 12-Column Asymmetric Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
          {/* Left Column: Architectural Typography & Identity (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Engineering Title */}
              <div className="mb-3 font-mono text-xs uppercase tracking-[0.1em] text-[var(--accent)]">
                Full-Stack Software Engineer &bull; Competitive Programmer
              </div>

              {/* Main Display Headline */}
              <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] text-[var(--fg)] sm:text-5xl md:text-6xl lg:text-[4rem] leading-[0.96]">
                Architecting resilient systems with algorithmic precision.
              </h1>

              {/* Concise Human-Written Positioning */}
              <p className="mt-6 max-w-prose text-base leading-[1.65] text-[var(--fg-muted)] sm:text-lg">
                Computer Engineering undergraduate at PCCOE Pune. Ranked in the{" "}
                <strong className="font-semibold text-[var(--fg)]">Global Top 1,500 in Google BigCode 2026</strong>{" "}
                with <strong className="font-semibold text-[var(--fg)]">500+ algorithmic problems solved</strong>.
                Proven experience engineering production progressive web apps with offline caching, PostgreSQL Row-Level
                Security, and interactive WebGL experiences.
              </p>
            </div>

            {/* Quick Actions & Repository Nav */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 border border-[var(--accent)] bg-[var(--accent)] px-5 py-2.5 font-mono text-xs font-semibold text-[#08090a] transition-all hover:bg-[var(--accent-dim)]"
              >
                <span>INSPECT PROJECT LEDGER</span>
                <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 font-mono text-xs text-[var(--fg)] transition-all hover:border-[var(--accent)]"
              >
                <span>GITHUB ARCHIVE</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent)]" />
              </a>

              <a
                href="#terminal"
                className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 font-mono text-xs text-[var(--fg-muted)] transition-all hover:text-[var(--fg)]"
              >
                <TerminalIcon className="h-3.5 w-3.5" />
                <span>TERMINAL</span>
              </a>
            </div>

            {/* Exposed Hairline Fact Specimen (Strict Truth / Zero Fabrication) */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)]">
              <div className="bg-[var(--bg)] p-3.5">
                <span className="block font-mono text-[10px] uppercase text-[var(--fg-muted)]">BigCode 2026</span>
                <span className="font-mono text-base font-semibold text-[var(--accent)] sm:text-lg">Top 1,500</span>
                <span className="block font-mono text-[10px] text-[var(--fg-muted)]">Global Standing</span>
              </div>

              <div className="bg-[var(--bg)] p-3.5">
                <span className="block font-mono text-[10px] uppercase text-[var(--fg-muted)]">DSA Solved</span>
                <span className="font-mono text-base font-semibold text-[var(--fg)] sm:text-lg">500+</span>
                <span className="block font-mono text-[10px] text-[var(--fg-muted)]">CF / LC / CC</span>
              </div>

              <div className="bg-[var(--bg)] p-3.5">
                <span className="block font-mono text-[10px] uppercase text-[var(--fg-muted)]">IIT Madras</span>
                <span className="font-mono text-base font-semibold text-[var(--accent)] sm:text-lg">77 / 100</span>
                <span className="block font-mono text-[10px] text-[var(--fg-muted)]">Elite + Silver Graph</span>
              </div>

              <div className="bg-[var(--bg)] p-3.5">
                <span className="block font-mono text-[10px] uppercase text-[var(--fg-muted)]">Academic CGPA</span>
                <span className="font-mono text-base font-semibold text-[var(--fg)] sm:text-lg">8.86</span>
                <span className="block font-mono text-[10px] text-[var(--fg-muted)]">PCCOE Pune &apos;28</span>
              </div>
            </div>
          </div>

          {/* Right Column: Signature Interactive Algorithmic Canvas Centerpiece (Cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col">
            <GraphCanvas />
            <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-[var(--fg-muted)]">
              <span>DISCIPLINE: GRAPH THEORY & TOPOLOGY</span>
              <span>RENDER: HTML5 2D ACCELERATED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
