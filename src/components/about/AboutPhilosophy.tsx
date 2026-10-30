"use client";

import React from "react";
import { CountUp } from "@/components/ui/CountUp";
import { GlyphEmber } from "@/components/ui/GlyphEmber";
import { FolderFloat } from "@/components/ui/FolderFloat";
import { InterferenceRibbons } from "@/components/ui/InterferenceRibbons";
import { ArrowUpRight, Terminal, Award, Activity, ShieldCheck } from "lucide-react";

export function AboutPhilosophy() {
  const achievements = [
    {
      index: "01",
      domain: "Academic Degree",
      value: (
        <span className="tabular-nums font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEDEF]">
          <CountUp to={8.86} decimals={2} duration={2} />
          <span className="text-sm sm:text-base font-normal text-[#94A3B8] ml-1">/ 10.0</span>
        </span>
      ),
      title: "B.E. Computer Engineering",
      institution: "Savitribai Phule Pune University (PCCOE)",
      detail:
        "First Class with Distinction. Core specialization in distributed computing, concurrency architectures, operating systems, and discrete mathematics.",
      link: null,
    },
    {
      index: "02",
      domain: "Specialized Certification",
      value: (
        <span className="tabular-nums font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEDEF]">
          <CountUp to={77} duration={1.8} />
          <span className="text-sm sm:text-base font-normal text-[#94A3B8] ml-1">/ 100</span>
        </span>
      ),
      title: "NPTEL IIT Madras Graph Theory",
      institution: "Indian Institute of Technology, Madras",
      detail:
        "Elite + Silver Medal. Ranked in top percentile nationally across algorithmic graph theory, network flow optimizations, and topological proofs.",
      link: null,
    },
    {
      index: "03",
      domain: "Competitive Mastery",
      value: (
        <span className="tabular-nums font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEDEF]">
          <CountUp to={515} suffix="+" duration={2.2} />
          <span className="text-sm sm:text-base font-normal text-[#94A3B8] ml-1">Solved</span>
        </span>
      ),
      title: "Algorithmic Problem Solving",
      institution: "LeetCode • Codeforces • CodeChef • HackerRank",
      detail:
        "LeetCode 315+ &bull; Codeforces Pupil (1227 Peak, 200+ Solved) &bull; CodeChef 2-Star (1434 Peak) &bull; HackerRank 5-Star in C++.",
      link: "https://leetcode.com/u/yashvardhan_4/",
    },
    {
      index: "04",
      domain: "National Benchmark",
      value: (
        <span className="tabular-nums font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEDEF]">
          Top <CountUp to={1500} separator="," duration={2.4} />
        </span>
      ),
      title: "Smart India Hackathon 2024",
      institution: "Ministry of Education & Google BigCode",
      detail:
        "SIH National Finalist selected among tens of thousands of engineering participants nationwide, and global top 1,500 ranking in Google BigCode.",
      link: null,
    },
  ];

  const engineeringPillars = [
    "C++ Concurrency",
    "POSIX File Descriptors",
    "Node.js (ESM)",
    "Supabase PostgreSQL",
    "Dexie.js IndexedDB",
    "Google Draco 3D",
  ];

  return (
    <section
      id="credentials"
      aria-label="Credentials and Academic Rigor"
      className="relative w-full border-t border-[#1E2430]/70 bg-[#08090C] py-20 sm:py-28 overflow-hidden scroll-mt-24"
    >
      {/* Harmonic Laser Filament Weave in Credentials Section */}
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

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Editorial Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1E2430]/70 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#A855F7] font-semibold">
              02 / Academic &amp; Competitive Foundation
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#EDEDEF] tracking-tight">
              Engineering Rigor &amp; Proven Benchmarks
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <GlyphEmber
              text="Inspire"
              fontSize={44}
              fontWeight={800}
              color="#EDEDEF"
              emberColors={["#FFFFFF", "#E2E8F0", "#C084FC", "#A855F7", "#E879F9"]}
              burnStart={0.46}
              interactive={true}
              className="drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]"
            />
            <p className="max-w-md font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed text-left md:text-right">
              Combining theoretical depth in algorithms with hands-on systems programming and commercial client deliveries.
            </p>
          </div>
        </div>

        {/* Editorial Broadsheet Specimen Ledger */}
        <div className="divide-y divide-[#1E2430]/70 border-b border-[#1E2430]/70">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="group py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline transition-colors duration-300 hover:bg-[#0E1015]/40"
            >
              {/* Col 1: Index & Domain */}
              <div className="md:col-span-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-[#A855F7] font-semibold tracking-wider">
                  {item.index} &bull; {item.domain}
                </span>
                <div className="mt-2">{item.value}</div>
              </div>

              {/* Col 2: Title & Institution */}
              <div className="md:col-span-4 flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#EDEDEF] group-hover:text-[#C084FC] transition-colors">
                    {item.title}
                  </h3>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#94A3B8] hover:text-[#C084FC] transition-colors"
                      aria-label="View competitive profile"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <span className="mt-1 font-mono text-xs text-[#94A3B8]">
                  {item.institution}
                </span>
              </div>

              {/* Col 3: Editorial Detail */}
              <div className="md:col-span-5 text-left md:text-right flex items-center md:justify-end">
                <p
                  className="font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-md"
                  dangerouslySetInnerHTML={{ __html: item.detail }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tactile Engineering Matter.js FolderFloat */}
        <div className="mt-16 pt-10 border-t border-[#1E2430]/70 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#A855F7] font-semibold">
              Interactive Engineering Vault
            </span>
            <h4 className="mt-1 font-serif text-2xl text-[#EDEDEF]">
              Zero-Gravity Systems Index
            </h4>
            <p className="mt-1 max-w-md font-sans text-xs sm:text-sm text-[#94A3B8]">
              Hover or click the archive folder to launch production architecture pillars into a Matter.js physics sandbox. Drag, toss, and collide the pills.
            </p>
          </div>

          <div className="shrink-0 flex items-center justify-center p-4">
            <FolderFloat
              items={engineeringPillars}
              label="Systems Vault"
              sublabel="6 Core Pillars"
              trigger="hover"
              physics={true}
              drift={0.65}
              width={210}
              height={148}
              spread={190}
              folderColor="#1E2430"
              frontColor="#2D3748"
              paperColor="#0E1015"
              itemColor="#0E1015"
              itemTextColor="#C084FC"
              labelColor="#EDEDEF"
              bounce={0.35}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPhilosophy;
