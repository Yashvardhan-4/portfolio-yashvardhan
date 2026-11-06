"use client";

import React from "react";
import { GraduationCap, Award, Terminal, ArrowUpRight } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";

export function AboutPhilosophy() {
  return (
    <section
      id="about"
      aria-label="Education, Certifications, and Achievements"
      className="relative w-full border-t border-[var(--border)] bg-[var(--bg)] py-20 sm:py-28 overflow-hidden scroll-mt-20 transition-colors duration-300"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end border-b border-[var(--border)] pb-8">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-semibold block">
              Education &amp; Achievements
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[var(--fg)] tracking-tight leading-[0.98]">
              Academic Foundation &amp; Proof.
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[var(--fg-muted)] max-w-prose">
              A solid computer engineering foundation paired with active algorithmic problem solving, national certifications, and competitive programming.
            </p>
          </div>
        </div>

        {/* Architectural Exposed Hairline Ledger Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 bg-[var(--border)] gap-px border border-[var(--border)]">
          {/* Column 1: Academic Degree */}
          <div className="md:col-span-4 bg-[var(--bg)] p-8 sm:p-10 flex flex-col justify-between space-y-8 relative group hover:bg-[var(--surface)] transition-colors duration-300">
            <span
              className="absolute -top-2.5 -left-2.5 font-mono text-xs text-[var(--accent)] select-none pointer-events-none"
              aria-hidden="true"
            >
              +
            </span>

            <div>
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-[var(--accent)]" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] font-semibold">
                    Academic Degree
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[var(--accent-nature)] bg-[var(--accent-muted)] px-2 py-0.5 rounded border border-[var(--accent)]/30 font-medium">
                  Distinction
                </span>
              </div>

              <div className="mt-6">
                <h3 className="font-serif text-2xl sm:text-3xl text-[var(--fg)] leading-snug">
                  B.E. Computer Engineering
                </h3>
                <p className="mt-1 font-mono text-xs text-[var(--fg-muted)]">
                  Savitribai Phule Pune University (PCCOE)
                </p>
              </div>

              {/* CGPA Callout */}
              <div className="mt-6 flex items-baseline gap-2 border-y border-[var(--border)] py-4">
                <span className="tabular-nums font-mono text-4xl font-bold tracking-tight text-[var(--fg)]">
                  <CountUp to={8.86} decimals={2} duration={2} />
                </span>
                <span className="font-mono text-xs text-[var(--fg-muted)]">/ 10.0 CGPA</span>
              </div>

              <p className="mt-5 font-sans text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed">
                Core coursework in data structures, algorithms, operating systems, computer networks, database management, and object-oriented design.
              </p>
            </div>

            <div className="font-mono text-[11px] text-[var(--fg-subtle)] pt-4 border-t border-[var(--border)]">
              Pune, India &bull; Class of 2026
            </div>
          </div>

          {/* Column 2: National Certification */}
          <div className="md:col-span-4 bg-[var(--bg)] p-8 sm:p-10 flex flex-col justify-between space-y-8 relative group hover:bg-[var(--surface)] transition-colors duration-300">
            <span
              className="absolute -top-2.5 -left-2.5 font-mono text-xs text-[var(--accent)] select-none pointer-events-none hidden md:block"
              aria-hidden="true"
            >
              +
            </span>

            <div>
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-[var(--accent)]" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] font-semibold">
                    National Certification
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[var(--accent-secondary)] bg-[var(--accent-muted)] px-2 py-0.5 rounded border border-[var(--accent)]/30 font-medium">
                  Top 1% Elite
                </span>
              </div>

              <div className="mt-6">
                <h3 className="font-serif text-2xl sm:text-3xl text-[var(--fg)] leading-snug">
                  NPTEL IIT Madras
                </h3>
                <p className="mt-1 font-mono text-xs text-[var(--fg-muted)]">
                  Graph Theory &amp; Algorithms
                </p>
              </div>

              {/* Score Callout */}
              <div className="mt-6 flex items-baseline gap-2 border-y border-[var(--border)] py-4">
                <span className="tabular-nums font-mono text-4xl font-bold tracking-tight text-[var(--fg)]">
                  <CountUp to={77} decimals={0} duration={2} />
                </span>
                <span className="font-mono text-xs text-[var(--fg-muted)]">/ 100 Score &bull; Silver Medal</span>
              </div>

              <p className="mt-5 font-sans text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed">
                12-week advanced academic curriculum covering network flows (Ford-Fulkerson, Edmonds-Karp), shortest path trees, cycle detection, and graph coloring algorithms.
              </p>
            </div>

            <div className="font-mono text-[11px] text-[var(--fg-subtle)] pt-4 border-t border-[var(--border)]">
              Verified Certificate &bull; Jan–Apr 2025
            </div>
          </div>

          {/* Column 3: Competitive Coding Mastery */}
          <div className="md:col-span-4 bg-[var(--bg)] p-8 sm:p-10 flex flex-col justify-between space-y-8 relative group hover:bg-[var(--surface)] transition-colors duration-300">
            <span
              className="absolute -top-2.5 -left-2.5 font-mono text-xs text-[var(--accent)] select-none pointer-events-none hidden md:block"
              aria-hidden="true"
            >
              +
            </span>

            <div>
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-[var(--accent)]" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] font-semibold">
                    Problem Solving
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[var(--accent-water)] bg-[var(--accent-muted)] px-2 py-0.5 rounded border border-[var(--accent-water)]/30 font-medium">
                  Active Practice
                </span>
              </div>

              <div className="mt-6">
                <h3 className="font-serif text-2xl sm:text-3xl text-[var(--fg)] leading-snug">
                  Competitive Coding
                </h3>
                <p className="mt-1 font-mono text-xs text-[var(--fg-muted)]">
                  LeetCode &amp; Codeforces
                </p>
              </div>

              {/* Solved Count Callout */}
              <div className="mt-6 flex items-baseline gap-2 border-y border-[var(--border)] py-4">
                <span className="tabular-nums font-mono text-4xl font-bold tracking-tight text-[var(--fg)]">
                  <CountUp to={315} decimals={0} duration={2} />
                </span>
                <span className="font-mono text-xs text-[var(--fg-muted)]">+ Problems Solved</span>
              </div>

              <p className="mt-5 font-sans text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed">
                Active problem solving with focus on dynamic programming, graph algorithms, binary search, and asymptotic time/space optimization.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex items-center gap-4">
              <a
                href="https://leetcode.com/u/yashvardhan_4/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#FFA116] hover:underline inline-flex items-center gap-1"
              >
                <span>LeetCode</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <span className="text-[var(--border)]">&bull;</span>
              <a
                href="https://codeforces.com/profile/yashvardhanborude7"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--accent-water)] hover:underline inline-flex items-center gap-1"
              >
                <span>Codeforces</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPhilosophy;
