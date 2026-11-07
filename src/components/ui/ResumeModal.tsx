"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { profile } from "@/data/profile";
import { showToast } from "./TactileToast";

export function ResumeModal() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener("open-resume-modal", handleOpen);
    window.addEventListener("close-resume-modal", handleClose);

    return () => {
      window.removeEventListener("open-resume-modal", handleOpen);
      window.removeEventListener("close-resume-modal", handleClose);
    };
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyATS = () => {
    const atsText = `
YASHVARDHAN SHASHIKANT BORUDE
Full Stack Software Engineer & Competitive Programmer
Pune, Maharashtra, India | +91-7058230773 | yashvardhanborude7@gmail.com
GitHub: https://github.com/Yashvardhan-4 | LinkedIn: https://linkedin.com/in/yashvardhan-borude
LeetCode: https://leetcode.com/u/yashvardhan_4/ | Codeforces: https://codeforces.com/profile/yashvardhan_4

EDUCATION
Pimpri Chinchwad College of Engineering (PCCOE), Pune
Bachelor of Technology in Computer Engineering | CGPA: 8.86 / 10.0 (Till Semester 4) | Expected May 2028
Relevant Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, OOP, ML.

HONORS & CERTIFICATIONS
NPTEL Elite + Silver Certificate — Algorithmic Graph Theory & Data Structures
Issuer: IIT Madras / IIT Kharagpur | Score: 77/100 (Top Percentile Nationwide)
Topics: Graph Traversals, Dijkstra, Bellman-Ford, Ford-Fulkerson Max Flow, Dinic's, Bipartite Matching.

COMPETITIVE PROGRAMMING
- 500+ Algorithmic Problems Solved Across Platforms
- LeetCode: 213+ Solved (Specialized in Trees, Dynamic Programming, and Graph Algorithms)
- Codeforces: Pupil Rank (Peak Rating: 1227, 200+ Contest Problems Solved)
- CodeChef: 2-Star (Peak Rating: 1434)
- HackerRank: 5-Star Gold Badge in C++
- Google BigCode 2026: Ranked in Global Top 1,500

EXPERIENCE
Shivkush Hi-Tech Nursery — Full Stack Software Developer (Commercial Freelance Contract) | Dec 2025 – May 2026
- Engineered and deployed a production bilingual (English/Marathi) agricultural e-commerce PWA.
- Architected offline service worker caching with 100% Lighthouse PWA audit compliance.
- Secured Supabase PostgreSQL backend with granular Row-Level Security (RLS) policies for anonymous ordering.
- Integrated interactive 3D WebGL hero canvas using Three.js and dynamic particle systems.

Smart India Hackathon (SIH 2024) — Lead Frontend Engineer (PralayVeer) | Aug 2024
- Architected rapid-response disaster preparedness platform for low-bandwidth rural networks.
- Built accessible evacuation mapping using Leaflet API adhering to WCAG AA contrast standards.

TECHNICAL PROFICIENCIES
Languages: C++, TypeScript, JavaScript (ES6+), Python, SQL (PostgreSQL), HTML5, CSS3.
Frontend: Next.js (App Router), React.js, Three.js, WebGL, Canvas API, Tailwind CSS, PWAs.
Backend: Node.js, Express.js, PostgreSQL, Supabase, Row-Level Security (RLS), REST APIs.
Tools & Systems: Git, GitHub, Linux, Bash, Docker (Basics), Postman, Figma, Vercel.
    `.trim();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(atsText).catch(() => {});
      }
    } catch {}
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2400);
    showToast("ATS plaintext resume copied to clipboard ✓");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.85)" : "rgba(25, 30, 27, 0.45)",
          backdropFilter: "blur(6px)",
        }}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Yashvardhan Borude Resume Preview"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border transition-all duration-300 shadow-2xl overflow-hidden ${
            isDarkMode
              ? "bg-[#090C12] text-[#F1F4F9] border-[#1E2638] shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
              : "bg-[#FFFFFF] text-[#1F2421] border-[#DFE2D2] shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          }`}
        >
          {/* Modal Header Toolbar */}
          <header className="px-5 py-3.5 border-b border-[var(--border)] flex items-center justify-between shrink-0 bg-[var(--surface)]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-[var(--fg)]">
                Curriculum Vitae · Verified Profile
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyATS}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCopied
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold"
                    : "border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-hover)]"
                }`}
                title="Copy clean plaintext for ATS submission"
              >
                {isCopied && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                <span>{isCopied ? "Copied Plaintext ✓" : "Copy ATS Plaintext"}</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs font-mono text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-hover)] transition-all cursor-pointer flex items-center gap-1.5"
                title="Print or Save as PDF"
              >
                <span>Print / PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Resume Modal"
                className="p-1.5 rounded-lg text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </header>

          {/* Modal Body / Printable Document */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 font-sans print:p-0 print:space-y-6">
            {/* Document Header */}
            <div className="border-b border-[var(--border)] pb-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h1 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-[var(--fg)]">
                  {profile.legalName}
                </h1>
                <span className="font-mono text-xs text-[var(--accent)] font-medium">
                  PCCOE Pune · Class of 2028
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-[var(--fg-muted)] font-mono">
                {profile.headline}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-[var(--fg-subtle)]">
                <span>📍 {profile.location}</span>
                <a href={`mailto:${profile.email}`} className="text-[var(--accent)] hover:underline">
                  ✉ {profile.email}
                </a>
                <span>📞 {profile.phone}</span>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  GitHub: Yashvardhan-4
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LinkedIn: yashvardhan-borude
                </a>
              </div>
            </div>

            {/* Section: Education */}
            <section className="space-y-3">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-[var(--fg)] border-b border-[var(--border)] pb-1.5 flex items-center justify-between">
                <span>01. Education</span>
                <span className="text-[var(--accent)] font-normal">CGPA 8.86 / 10.0</span>
              </h2>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <h3 className="text-sm font-semibold text-[var(--fg)]">
                    {profile.education.institution}
                  </h3>
                  <span className="font-mono text-xs text-[var(--fg-muted)]">
                    {profile.education.timeline}
                  </span>
                </div>
                <p className="text-xs text-[var(--fg-muted)] mt-0.5">
                  {profile.education.degree} in {profile.education.specialization} · Current Standing: {profile.education.standing}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {profile.education.coursework.map((course) => (
                    <span
                      key={course}
                      className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--fg-muted)]"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Section: Certifications & Honors */}
            <section className="space-y-3">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-[var(--fg)] border-b border-[var(--border)] pb-1.5 flex items-center justify-between">
                <span>02. Verified Certifications</span>
                <span className="text-emerald-500 font-normal">Elite + Silver</span>
              </h2>
              {profile.certifications.map((cert) => (
                <div key={cert.title}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="text-sm font-semibold text-[var(--fg)]">
                      {cert.title}
                    </h3>
                    <span className="font-mono text-xs text-[var(--fg-muted)]">
                      {cert.issuer} ({cert.timeline})
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[var(--accent)] mt-0.5">
                    Score: {cert.score}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {cert.topics.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--fg-muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Section: Competitive Programming */}
            <section className="space-y-3">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-[var(--fg)] border-b border-[var(--border)] pb-1.5 flex items-center justify-between">
                <span>03. Competitive Programming</span>
                <span className="text-[var(--accent)] font-normal">{profile.competitiveProgramming.totalSolved} Solved</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.competitiveProgramming.platforms.map((plat) => (
                  <div
                    key={plat.name}
                    className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[var(--fg)]">{plat.name}</span>
                      <span className="font-mono text-[10px] text-[var(--accent)]">{plat.ratingOrStatus}</span>
                    </div>
                    <p className="text-[11px] text-[var(--fg-muted)] mt-1">{plat.solved}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Experience */}
            <section className="space-y-4">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-[var(--fg)] border-b border-[var(--border)] pb-1.5">
                04. Professional Experience &amp; Contracts
              </h2>
              {profile.experience.map((exp) => (
                <div key={exp.company} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="text-sm font-semibold text-[var(--fg)]">
                      {exp.role} — <span className="text-[var(--accent)]">{exp.company}</span>
                    </h3>
                    <span className="font-mono text-xs text-[var(--fg-muted)]">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[var(--fg-muted)] leading-relaxed">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] text-[var(--fg-subtle)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Section: Technical Skills */}
            <section className="space-y-3">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-[var(--fg)] border-b border-[var(--border)] pb-1.5">
                05. Technical Proficiencies
              </h2>
              <div className="space-y-2 text-xs">
                {profile.skills.map((s) => (
                  <div key={s.category} className="flex flex-col sm:flex-row sm:gap-4">
                    <span className="font-mono text-[11px] text-[var(--fg)] w-36 shrink-0 font-medium">
                      {s.category}:
                    </span>
                    <span className="text-[var(--fg-muted)]">
                      {s.items.join(" · ")}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
