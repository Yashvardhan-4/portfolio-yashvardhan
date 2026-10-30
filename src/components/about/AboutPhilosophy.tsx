"use client";

import React from "react";
import { CountUp } from "@/components/ui/CountUp";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Particles } from "@/components/ui/Particles";
import { GlyphEmber } from "@/components/ui/GlyphEmber";
import { Award, Terminal, Activity, ShieldCheck, Check, ArrowUpRight } from "lucide-react";

export function AboutPhilosophy() {
  const benchmarks = [
    {
      metric: (
        <span className="tabular-nums">
          <CountUp to={8.86} decimals={2} duration={2} /> / 10.0
        </span>
      ),
      badge: "CGPA",
      title: "B.E. Computer Engineering",
      subtitle: "Savitribai Phule Pune University (PCCOE)",
      icon: <Award className="h-5 w-5 text-[#C084FC]" />,
      link: null,
    },
    {
      metric: (
        <span className="tabular-nums">
          <CountUp to={77} duration={1.8} /> / 100
        </span>
      ),
      badge: "Elite+Silver",
      title: "NPTEL IIT Madras Graph Theory",
      subtitle: "Top percentile in algorithmic graph theory",
      icon: <Activity className="h-5 w-5 text-[#C084FC]" />,
      link: null,
    },
    {
      metric: (
        <span className="tabular-nums">
          <CountUp to={500} suffix="+" duration={2.2} />
        </span>
      ),
      badge: "Competitive",
      title: "Algorithmic Problem Solving",
      subtitle: "LeetCode 315+ • Codeforces 200+ (1227) • CodeChef 2★ (1434) • HackerRank 5★ C++",
      icon: <Terminal className="h-5 w-5 text-[#C084FC]" />,
      link: "https://leetcode.com/u/yashvardhan_4/",
    },
    {
      metric: (
        <span className="tabular-nums">
          Top <CountUp to={1500} separator="," duration={2.4} />
        </span>
      ),
      badge: "National Finalist",
      title: "Smart India Hackathon 2024",
      subtitle: "SIH National Finalist & Google BigCode Global Top 1,500",
      icon: <ShieldCheck className="h-5 w-5 text-[#C084FC]" />,
      link: null,
    },
  ];

  const coreCompetencies = [
    {
      category: "Systems & Concurrency",
      skills: [
        "C++",
        "Node.js (ESM)",
        "Electron",
        "POSIX File Descriptors",
        "HTTP Range Multiplexing",
        "Work-Stealing Algorithms",
      ],
    },
    {
      category: "Full-Stack & Local-First Web",
      skills: [
        "TypeScript",
        "Next.js 16",
        "React 19",
        "Supabase PostgreSQL",
        "IndexedDB (Dexie.js)",
        "Tailwind CSS v4",
      ],
    },
  ];

  return (
    <section
      id="credentials"
      aria-label="Credentials and Core Competencies"
      className="relative w-full border-t border-[#1E2430] bg-[#08090C] py-16 sm:py-24 overflow-hidden scroll-mt-24"
    >
      {/* Subtle WebGL Particles Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0" aria-hidden="true">
        <Particles
          particleColors={["#A855F7", "#C084FC", "#38BDF8"]}
          particleCount={85}
          particleSpread={12}
          speed={0.1}
          particleBaseSize={70}
          glow={0.5}
          twinkle={0.25}
          connections={true}
          connectionDistance={90}
          opacity={0.3}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Minimalist Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#A855F7] font-semibold">
              Credentials &amp; Foundation
            </span>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#EDEDEF]">
              Engineering Rigor &amp; Problem Solving
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <GlyphEmber
              text="Inspire"
              fontSize={48}
              fontWeight={800}
              color="#EDEDEF"
              emberColors={["#FFFFFF", "#E2E8F0", "#C084FC", "#A855F7", "#E879F9"]}
              burnStart={0.46}
              interactive={true}
              className="drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]"
            />
            <p className="max-w-md font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed text-left md:text-right">
              Combining algorithmic problem solving with hands-on production engineering for commercial clients.
            </p>
          </div>
        </div>

        {/* 4 Minimalist Verified Benchmark Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benchmarks.map((item, index) => (
            <SpotlightCard
              key={index}
              theme="dark"
              spotlightColor="#A855F7"
              intensity={0.2}
              spotlightSize={320}
              softness={0.7}
              borderGlow={0.6}
              grain={0.05}
              proximity={120}
              className="rounded-2xl border border-[#1E2430] bg-[#0E1015]/85 p-6 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#C084FC] border border-[#1E2430] px-2.5 py-1 rounded-md bg-[#08090C]">
                    {item.badge}
                  </span>
                  {item.icon}
                </div>

                <div className="mt-5 font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[#EDEDEF]">
                  {item.metric}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1E2430]/80">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-sm font-semibold text-[#EDEDEF]">
                    {item.title}
                  </h3>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#94A3B8] hover:text-[#C084FC] transition-colors"
                      aria-label="View competitive programming profile"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                <p className="mt-1 font-sans text-xs text-[#94A3B8] leading-normal">
                  {item.subtitle}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Core Engineering Competencies Architecture (2-Column Streamlined) */}
        <div className="mt-12 rounded-2xl border border-[#1E2430] bg-[#0E1015]/70 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center justify-between mb-6 border-b border-[#1E2430] pb-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#A855F7] font-semibold">
              Core Engineering Competencies
            </h3>
            <span className="font-mono text-[11px] text-[#64748B]">
              Verified Production &amp; Systems Stack
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreCompetencies.map((comp, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="font-serif text-xl font-normal text-[#EDEDEF] flex items-center justify-between">
                  <span>{comp.category}</span>
                  <span className="font-mono text-xs text-[#C084FC] font-semibold">0{idx + 1}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {comp.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center gap-2 rounded-xl border border-[#1E2430] bg-[#08090C]/80 px-3 py-2 text-xs font-mono text-[#EDEDEF] transition-all duration-200 hover:border-[#A855F7]/60 hover:text-[#C084FC]"
                    >
                      <Check className="h-3.5 w-3.5 text-[#A855F7] shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPhilosophy;
