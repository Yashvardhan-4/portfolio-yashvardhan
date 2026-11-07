"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { profile } from "@/data/profile";
import { showToast } from "./TactileToast";

const RESUME_PDF_URL = "/Resume/Yashvardhan_Borude_Resume.pdf";
const RESUME_FILENAME = "Yashvardhan_Borude_Resume.pdf";

export function ResumeModal() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"pdf" | "ats">("pdf");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setActiveTab("pdf");
    };
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
Relevant Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, OOP, Machine Learning.

HONORS & CERTIFICATIONS
NPTEL Elite + Silver Certificate — Algorithmic Graph Theory & Data Structures
Issuer: IIT Madras / IIT Kharagpur | Score: 77/100 (Top Percentile Nationwide)
Topics: Graph Traversals, Dijkstra, Bellman-Ford, Ford-Fulkerson Max Flow, Dinic's Algorithm, Bipartite Matching.

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
          backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.88)" : "rgba(25, 30, 27, 0.55)",
          backdropFilter: "blur(8px)",
        }}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Yashvardhan Borude Resume / Curriculum Vitae"
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
      >
        <div
          data-lenis-prevent
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-5xl h-[94vh] sm:h-[92vh] flex flex-col rounded-2xl border transition-all duration-300 shadow-2xl overflow-hidden ${
            isDarkMode
              ? "bg-[#0A0D14] text-[#F1F4F9] border-[#1E2638] shadow-[0_25px_70px_rgba(0,0,0,0.95)]"
              : "bg-[#FFFFFF] text-[#1F2421] border-[#DFE2D2] shadow-[0_25px_60px_rgba(0,0,0,0.2)]"
          }`}
        >
          {/* Modal Header Toolbar */}
          <header className="px-3 sm:px-5 py-3 border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-2 shrink-0 bg-[var(--surface)]">
            {/* Left: Identity & Document Label */}
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div className="flex items-center gap-2 truncate">
                <span className="text-xs font-mono font-semibold tracking-wider uppercase text-[var(--fg)] truncate">
                  Yashvardhan Borude · CV
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--fg-muted)]">
                  PDF 2026
                </span>
              </div>
            </div>

            {/* Middle: Tab Switcher (PDF / ATS) */}
            <div className="flex items-center p-0.5 rounded-lg border border-[var(--border)] bg-[var(--bg)]">
              <button
                type="button"
                onClick={() => setActiveTab("pdf")}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "pdf"
                    ? "bg-[var(--surface)] text-[var(--fg)] font-semibold shadow-sm border border-[var(--border)]"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                }`}
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>PDF Document</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("ats")}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "ats"
                    ? "bg-[var(--surface)] text-[var(--fg)] font-semibold shadow-sm border border-[var(--border)]"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                }`}
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 7 4 4 20 4 20 7" />
                  <line x1="9" y1="20" x2="15" y2="20" />
                  <line x1="12" y1="4" x2="12" y2="20" />
                </svg>
                <span>ATS Text</span>
              </button>
            </div>

            {/* Right: Actions (Download, Open New Tab, Copy, Close) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Direct Download Button */}
              <a
                href={RESUME_PDF_URL}
                download={RESUME_FILENAME}
                className="px-2.5 py-1.5 rounded-lg border border-[var(--border)] text-xs font-mono text-[var(--fg)] hover:bg-[var(--surface-hover)] transition-all flex items-center gap-1.5"
                title="Download official PDF resume"
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span className="hidden sm:inline">Download</span>
                <span className="sm:hidden">PDF</span>
              </a>

              {/* Open in New Window Tab */}
              <a
                href={RESUME_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-[var(--border)] text-xs font-mono text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-hover)] transition-all flex items-center gap-1.5"
                title="Open PDF in new browser tab"
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                <span className="hidden md:inline">Open Tab</span>
              </a>

              {/* Copy ATS Text Shortcut */}
              <button
                type="button"
                onClick={handleCopyATS}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCopied
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold"
                    : "border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-hover)]"
                }`}
                title="Copy clean plaintext for ATS submission"
              >
                {isCopied && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                <span className="hidden sm:inline">{isCopied ? "Copied ✓" : "Copy ATS"}</span>
                <span className="sm:hidden">{isCopied ? "✓" : "Copy"}</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Resume Modal"
                className="p-1.5 rounded-lg text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer ml-1"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </header>

          {/* Modal Body */}
          <div className="flex-1 w-full h-full min-h-0 overflow-hidden relative bg-[var(--bg)]">
            {/* VIEW 1: Directly Embedded Official PDF */}
            {activeTab === "pdf" && (
              <div className="w-full h-full flex flex-col">
                <object
                  data={`${RESUME_PDF_URL}#toolbar=1&navpanes=0&view=FitH`}
                  type="application/pdf"
                  className="w-full h-full flex-1 border-0"
                  aria-label="Yashvardhan Borude Resume PDF"
                >
                  <iframe
                    src={`${RESUME_PDF_URL}#toolbar=1&navpanes=0&view=FitH`}
                    className="w-full h-full flex-1 border-0"
                    title="Yashvardhan Borude Resume PDF"
                  >
                    {/* Fallback for devices without inline PDF viewer plugins */}
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
                      <div className="w-14 h-14 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--accent)]">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>

                      <div className="max-w-md">
                        <h3 className="text-base font-semibold text-[var(--fg)]">
                          Yashvardhan Borude — Official Resume
                        </h3>
                        <p className="text-xs text-[var(--fg-muted)] mt-1.5 leading-relaxed">
                          Your browser or mobile device doesn't support embedded PDF preview. You can open the PDF directly or switch to the ATS Text view.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <a
                          href={RESUME_PDF_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-xs font-mono font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                          <span>Open PDF in Fullscreen</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => setActiveTab("ats")}
                          className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] text-xs font-mono hover:bg-[var(--surface-hover)] transition-colors"
                        >
                          Switch to Text View
                        </button>
                      </div>
                    </div>
                  </iframe>
                </object>
              </div>
            )}

            {/* VIEW 2: Clean ATS Plaintext View */}
            {activeTab === "ats" && (
              <div className="w-full h-full overflow-y-auto p-4 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                  <div>
                    <h3 className="text-sm font-mono font-semibold text-[var(--fg)] uppercase tracking-wider">
                      ATS Plaintext Transcript
                    </h3>
                    <p className="text-xs text-[var(--fg-muted)] mt-0.5">
                      Optimized for automated resume parsers, applicant tracking systems, and terminal copying.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyATS}
                    className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs font-mono text-[var(--fg)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-all flex items-center gap-1.5"
                  >
                    <span>{isCopied ? "Copied ✓" : "Copy to Clipboard"}</span>
                  </button>
                </div>

                <div className="p-4 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 font-mono text-xs leading-relaxed text-[var(--fg)] overflow-x-auto whitespace-pre-wrap selection:bg-[var(--accent)] selection:text-white">
{`YASHVARDHAN SHASHIKANT BORUDE
Full Stack Software Engineer & Algorithmic Developer
Pune, Maharashtra, India | +91-7058230773 | yashvardhanborude7@gmail.com
GitHub: https://github.com/Yashvardhan-4 | LinkedIn: https://linkedin.com/in/yashvardhan-borude
LeetCode: https://leetcode.com/u/yashvardhan_4/ | Codeforces: https://codeforces.com/profile/yashvardhan_4

================================================================================
EDUCATION
================================================================================
Pimpri Chinchwad College of Engineering (PCCOE), Pune
Bachelor of Technology in Computer Engineering
Timeline: 2024 – 2028 (Expected May 2028)
Academic Performance: CGPA 8.86 / 10.0 (Till Semester 4)
Core Coursework:
- Data Structures & Algorithms
- Database Management Systems (PostgreSQL)
- Operating Systems & Linux Concurrency
- Computer Networks & Protocols
- Object-Oriented Programming (C++)
- Machine Learning Foundations

================================================================================
HONORS & CERTIFICATIONS
================================================================================
NPTEL Elite + Silver Certificate — Algorithmic Graph Theory & Data Structures
- Issuer: IIT Madras / IIT Kharagpur
- Score: 77/100 (Top Percentile Nationwide)
- Topics: Graph Traversals (DFS/BFS), Shortest Paths (Dijkstra, Bellman-Ford),
  Network Flows (Ford-Fulkerson, Dinic's Algorithm), Bipartite Matching,
  Spanning Trees (Kruskal, Prim).

================================================================================
COMPETITIVE PROGRAMMING & ALGORITHMIC DISTINCTION
================================================================================
- 500+ Algorithmic Problems Solved Across Verified Competitive Platforms
- LeetCode: 213+ Solved (Specialized in Trees, Dynamic Programming, and Graph Theory)
- Codeforces: Pupil Rank (Peak Rating: 1227, 200+ Contest Problems Solved)
- CodeChef: 2-Star (Peak Rating: 1434)
- HackerRank: 5-Star Gold Badge in C++
- Google BigCode 2026: Ranked in Global Top 1,500

================================================================================
PROFESSIONAL EXPERIENCE & COMMERCIAL CONTRACTS
================================================================================
Shivkush Hi-Tech Nursery — Full Stack Software Developer (Commercial Freelance Contract)
Timeline: Dec 2025 – May 2026 | Location: Pune, India
- Engineered and deployed a production bilingual (English/Marathi) agricultural e-commerce PWA.
- Architected offline service worker caching with 100% Lighthouse PWA audit compliance.
- Secured Supabase PostgreSQL backend with granular Row-Level Security (RLS) policies for anonymous ordering.
- Integrated interactive 3D WebGL hero canvas using Three.js and dynamic particle systems.

Smart India Hackathon (SIH 2024) — Lead Frontend Engineer (PralayVeer Platform)
Timeline: Aug 2024 | Location: Pune, India
- Architected rapid-response disaster preparedness platform for low-bandwidth rural networks.
- Built accessible evacuation mapping using Leaflet API adhering to WCAG AA contrast standards.

================================================================================
TECHNICAL PROFICIENCIES
================================================================================
- Languages: C++, TypeScript, JavaScript (ES6+), Python, SQL (PostgreSQL), HTML5, CSS3
- Frontend: Next.js (App Router), React.js, Three.js, WebGL, Canvas API, Tailwind CSS, PWAs
- Backend: Node.js, Express.js, PostgreSQL, Supabase, Row-Level Security (RLS), REST APIs
- Tools & Systems: Git, GitHub, Linux, Bash, Docker (Basics), Postman, Figma, Vercel`}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ResumeModal;
