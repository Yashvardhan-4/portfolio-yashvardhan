"use client";

import React from "react";
import { ArrowUpRight, Cpu, GitBranch, Trophy, Zap, Terminal } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionCrosshairHeader } from "@/components/ui/GridHairline";

export function MetricsBento() {
  return (
    <section id="algorithms" className="border-b border-[var(--border)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 12-Column Asymmetric Header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-start mb-12">
          <div className="lg:col-span-4">
            <SectionCrosshairHeader
              index="02"
              tag="ALGORITHMIC SPECIMEN"
              title="Computational Rigor & Competitive Problem Solving."
            />
          </div>

          <div className="lg:col-span-1 hidden lg:block" />

          <div className="lg:col-span-7 flex flex-col justify-end">
            <p className="max-w-prose text-base leading-[1.65] text-[var(--fg-muted)]">
              System software requires deep algorithmic intuition. With 500+ problems solved across premier
              competitive platforms and an Elite+Silver accreditation in Graph Theory from IIT Madras, my engineering
              foundation is grounded in optimal time/space complexity, invariant design, and efficient memory layout.
            </p>
          </div>
        </div>

        {/* Exposed Hairline Grid (Deterministic anti-slop architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
          {/* Cell 1: Google BigCode 2026 */}
          <div className="bg-[var(--bg)] p-6 sm:p-8 flex flex-col justify-between group hover:bg-[var(--surface)] transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[var(--fg-muted)] mb-4">
                <span>[BENCHMARK-01]</span>
                <Trophy className="h-4 w-4 text-[var(--accent)]" />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">Global Competitor</span>
              <h3 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-[var(--fg)] mt-1">
                Top 1,500
              </h3>
              <p className="font-mono text-xs text-[var(--fg-muted)] mt-1">Google BigCode 2026 Worldwide</p>
              <p className="text-sm leading-relaxed text-[var(--fg-muted)] mt-4">
                Ranked among the top 1,500 participants globally in competitive algorithmic engineering and automated code
                synthesis.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border)] font-mono text-[11px] text-[var(--accent)] flex items-center justify-between">
              <span>STATUS: VERIFIED RESULT</span>
              <span className="text-[var(--fg-muted)]">2026</span>
            </div>
          </div>

          {/* Cell 2: IIT Madras Elite + Silver */}
          <div className="bg-[var(--bg)] p-6 sm:p-8 flex flex-col justify-between group hover:bg-[var(--surface)] transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[var(--fg-muted)] mb-4">
                <span>[BENCHMARK-02]</span>
                <GitBranch className="h-4 w-4 text-[var(--accent)]" />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">IIT Madras / NPTEL</span>
              <h3 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-[var(--fg)] mt-1">
                77 / 100
              </h3>
              <p className="font-mono text-xs text-[var(--fg-muted)] mt-1">Elite + Silver Certificate (Top Tier)</p>
              <p className="text-sm leading-relaxed text-[var(--fg-muted)] mt-4">
                12-week rigorous curriculum in Algorithmic Graph Theory: Dijkstra, Bellman-Ford, Ford-Fulkerson Max Flow,
                Bipartite Matching, and NP-Completeness.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border)] font-mono text-[11px] text-[var(--accent)] flex items-center justify-between">
              <span>SCORE: 77% (TOP TIER)</span>
              <span className="text-[var(--fg-muted)]">JAN–APR 2025</span>
            </div>
          </div>

          {/* Cell 3: 500+ Algorithmic Problems Solved */}
          <div className="bg-[var(--bg)] p-6 sm:p-8 flex flex-col justify-between group hover:bg-[var(--surface)] transition-colors md:col-span-2 lg:col-span-1">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[var(--fg-muted)] mb-4">
                <span>[BENCHMARK-03]</span>
                <Cpu className="h-4 w-4 text-[var(--accent)]" />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">Problem Volume</span>
              <h3 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-[var(--fg)] mt-1">
                500+ Solved
              </h3>
              <p className="font-mono text-xs text-[var(--fg-muted)] mt-1">Cross-Platform Verification</p>
              <p className="text-sm leading-relaxed text-[var(--fg-muted)] mt-4">
                Systematic mastery across dynamic programming, trees, graph networks, number theory, and greedy algorithms
                implemented primarily in C++ and Python.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border)] font-mono text-[11px] text-[var(--accent)] flex items-center justify-between">
              <span>SPECIALTY: GRAPHS & DP</span>
              <span className="text-[var(--fg-muted)]">ACTIVE</span>
            </div>
          </div>

          {/* Row 2: Four Platform Cells */}
          {profile.competitiveProgramming.platforms.map((platform, idx) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--bg)] p-6 sm:p-8 flex flex-col justify-between hover:bg-[var(--surface)] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] text-[var(--fg-muted)] mb-3">
                  <span>0{idx + 4} // PLATFORM</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors" />
                </div>
                <div className="font-display text-xl font-semibold text-[var(--fg)] flex items-center gap-2">
                  <span>{platform.name}</span>
                  <span className="font-mono text-xs font-normal text-[var(--fg-muted)]">
                    @{platform.handle}
                  </span>
                </div>
                <div className="mt-2 font-mono text-sm font-medium text-[var(--accent)]">
                  {platform.ratingOrStatus}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[var(--fg-muted)]">
                  {platform.solved}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border)] font-mono text-[10px] text-[var(--fg-muted)] group-hover:text-[var(--fg)] transition-colors">
                VIEW PUBLIC PROFILE &rarr;
              </div>
            </a>
          ))}

          {/* Bonus Cell: C++ Systems Specimen */}
          <div className="bg-[var(--bg)] p-6 sm:p-8 flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center justify-between font-mono text-[11px] text-[var(--fg-muted)] mb-3">
                <span>CORE LANGUAGE MASTERY</span>
                <span className="text-[var(--accent)]">5-STAR GOLD</span>
              </div>
              <h4 className="font-display text-xl font-semibold text-[var(--fg)]">
                C++ Systems & Algorithmic Foundations
              </h4>
              <p className="mt-2 text-sm text-[var(--fg-muted)] leading-relaxed max-w-prose">
                Direct memory management, STL template metaprogramming, and custom algorithmic data structures. Rated
                5-Star Gold on HackerRank in C++ with extensive competitive problem implementations.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px]">
              {["Custom Priority Queues", "Disjoint Set Union", "Segment Trees", "Bitmask DP", "Fast I/O"].map((t) => (
                <span key={t} className="border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-[var(--fg-muted)]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
