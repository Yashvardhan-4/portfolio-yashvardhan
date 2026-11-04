"use client";

import React from "react";
import { CountUp } from "@/components/ui/CountUp";
import { GlyphEmber } from "@/components/ui/GlyphEmber";
import { InterferenceRibbons } from "@/components/ui/InterferenceRibbons";
import { ArrowUpRight, GraduationCap, Trophy, Code2, Award, CheckCircle2 } from "lucide-react";

export function AboutPhilosophy() {
  return (
    <section
      id="about"
      aria-label="Education and Achievements"
      className="relative w-full border-t border-[#1E2430]/70 bg-[#08090C] py-20 sm:py-28 overflow-hidden scroll-mt-24"
    >
      {/* Harmonic Laser Filament Weave in Background */}
      <InterferenceRibbons
        strandCount={38}
        ribbonCount={2}
        baseColor="#3B0764"
        accentColor="#A855F7"
        highlightColor="#38BDF8"
        speed={0.7}
        twist={1.4}
        amplitude={60}
        frequency={0.0028}
        opacity={0.3}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1E2430]/70 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#A855F7] font-semibold">
              02 / Education &amp; Achievements
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#EDEDEF] tracking-tight">
              Education &amp; Achievements
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <GlyphEmber
              text="Builder"
              fontSize={44}
              fontWeight={800}
              color="#EDEDEF"
              emberColors={["#FFFFFF", "#E2E8F0", "#C084FC", "#A855F7", "#E879F9"]}
              burnStart={0.46}
              interactive={true}
              className="drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]"
            />
            <p className="max-w-md font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed text-left md:text-right">
              A solid academic foundation in computer engineering combined with active problem solving and competitive coding.
            </p>
          </div>
        </div>

        {/* Reorganized Credentials: Two Distinct, Spacious Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Education & Academic Degree */}
          <div className="relative rounded-2xl border border-[#1E2430] bg-[#0E1015]/80 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:border-[#A855F7]/40 transition-colors duration-300">
            <div>
              <div className="flex items-center justify-between border-b border-[#1E2430] pb-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-[#A855F7]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#A855F7] font-semibold">
                    01 // Academic Education
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 rounded-full border border-[#10B981]/30">
                  First Class with Distinction
                </span>
              </div>

              {/* Main Degree Info */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#EDEDEF]">
                    B.E. Computer Engineering
                  </h3>
                  <p className="mt-1 font-mono text-xs text-[#94A3B8]">
                    Savitribai Phule Pune University (PCCOE)
                  </p>
                </div>

                <div className="flex items-baseline gap-1 text-right shrink-0">
                  <span className="tabular-nums font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEDEF]">
                    <CountUp to={8.86} decimals={2} duration={2} />
                  </span>
                  <span className="font-mono text-sm text-[#94A3B8]">/ 10.0 CGPA</span>
                </div>
              </div>

              <p className="mt-4 font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Focused on core computer science fundamentals: data structures, algorithms, operating systems, database design, and computer networks.
              </p>
            </div>

            {/* Sub-Card: IIT Madras NPTEL Certification */}
            <div className="rounded-xl border border-[#1E2430] bg-[#08090C]/80 p-4 sm:p-5 mt-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-[#38BDF8]" />
                  <span className="font-mono text-xs font-semibold text-[#EDEDEF]">
                    IIT Madras — Graph Theory Certification
                  </span>
                </div>
                <span className="font-mono text-xs text-[#38BDF8] shrink-0 font-bold">
                  77 / 100
                </span>
              </div>
              <p className="mt-2 font-mono text-[11px] text-[#A855F7]">
                Elite + Silver Medal • NPTEL IIT Madras
              </p>
              <p className="mt-1 font-sans text-xs text-[#94A3B8] leading-relaxed">
                Ranked in the top percentile nationally across algorithmic graph theory, network algorithms, and data modeling.
              </p>
            </div>
          </div>

          {/* Card 2: Problem Solving & Competitions */}
          <div className="relative rounded-2xl border border-[#1E2430] bg-[#0E1015]/80 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:border-[#38BDF8]/40 transition-colors duration-300">
            <div>
              <div className="flex items-center justify-between border-b border-[#1E2430] pb-4">
                <div className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-[#38BDF8]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#38BDF8] font-semibold">
                    02 // Problem Solving
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#C084FC] bg-[#C084FC]/10 px-2.5 py-0.5 rounded-full border border-[#C084FC]/30">
                  Active Competitor
                </span>
              </div>

              {/* Main Problem Solving Metric */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#EDEDEF]">
                    Competitive Programming
                  </h3>
                  <p className="mt-1 font-mono text-xs text-[#94A3B8]">
                    Daily practice across algorithmic platforms
                  </p>
                </div>

                <div className="flex items-baseline gap-1 text-right shrink-0">
                  <span className="tabular-nums font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEDEF]">
                    <CountUp to={515} suffix="+" duration={2.2} />
                  </span>
                  <span className="font-mono text-sm text-[#94A3B8]">Solved</span>
                </div>
              </div>

              {/* Platform Badges with Direct Profile Links */}
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <a
                  href="https://leetcode.com/u/yashvardhan_4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-xl border border-[#1E2430] bg-[#08090C]/80 hover:border-[#FFA116] transition-all"
                >
                  <div>
                    <span className="block font-mono text-xs font-semibold text-[#EDEDEF] group-hover:text-[#FFA116] transition-colors">
                      LeetCode
                    </span>
                    <span className="font-mono text-[11px] text-[#94A3B8]">315+ Solved</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#64748B] group-hover:text-[#FFA116] transition-colors" />
                </a>

                <a
                  href="https://codeforces.com/profile/yashvardhanborude7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-xl border border-[#1E2430] bg-[#08090C]/80 hover:border-[#38BDF8] transition-all"
                >
                  <div>
                    <span className="block font-mono text-xs font-semibold text-[#EDEDEF] group-hover:text-[#38BDF8] transition-colors">
                      Codeforces
                    </span>
                    <span className="font-mono text-[11px] text-[#94A3B8]">Pupil (1227 Peak)</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#64748B] group-hover:text-[#38BDF8] transition-colors" />
                </a>

                <a
                  href="https://www.codechef.com/users/cheer_swan_02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-xl border border-[#1E2430] bg-[#08090C]/80 hover:border-[#A855F7] transition-all"
                >
                  <div>
                    <span className="block font-mono text-xs font-semibold text-[#EDEDEF] group-hover:text-[#A855F7] transition-colors">
                      CodeChef
                    </span>
                    <span className="font-mono text-[11px] text-[#94A3B8]">2-Star (1434 Peak)</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#64748B] group-hover:text-[#A855F7] transition-colors" />
                </a>

                <a
                  href="https://hackerrank.com/profile/yashvardhanboru9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-xl border border-[#1E2430] bg-[#08090C]/80 hover:border-[#00EA64] transition-all"
                >
                  <div>
                    <span className="block font-mono text-xs font-semibold text-[#EDEDEF] group-hover:text-[#00EA64] transition-colors">
                      HackerRank
                    </span>
                    <span className="font-mono text-[11px] text-[#94A3B8]">5-Star in C++</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#64748B] group-hover:text-[#00EA64] transition-colors" />
                </a>
              </div>
            </div>

            {/* Sub-Card: Smart India Hackathon & Google BigCode */}
            <div className="rounded-xl border border-[#1E2430] bg-[#08090C]/80 p-4 sm:p-5 mt-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-[#F59E0B]" />
                  <span className="font-mono text-xs font-semibold text-[#EDEDEF]">
                    Smart India Hackathon 2024
                  </span>
                </div>
                <span className="font-mono text-xs text-[#F59E0B] shrink-0 font-bold">
                  National Finalist
                </span>
              </div>
              <p className="mt-2 font-mono text-[11px] text-[#94A3B8]">
                Ministry of Education &amp; Google BigCode
              </p>
              <p className="mt-1 font-sans text-xs text-[#94A3B8] leading-relaxed">
                Selected among thousands of engineering participants nationwide, along with a Global Top 1,500 ranking in Google BigCode.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPhilosophy;
