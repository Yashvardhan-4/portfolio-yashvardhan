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
Software Engineering Intern | AI-ML, Data & Full Stack
Pune, India | +91-7058230773 | yashvardhanborude7@gmail.com
LinkedIn: https://linkedin.com/in/yashvardhan-borude-8640a6319 | GitHub: https://github.com/Yashvardhan-4
Coding Profiles: LeetCode 315+ Solved (https://leetcode.com/u/yashvardhan_4/) | Codeforces Pupil 1227 (https://codeforces.com/profile/yashvardhanborude7) | CodeChef 2-Star 1434 (https://www.codechef.com/users/cheer_swan_02) | HackerRank 5-Star C++ (https://www.hackerrank.com/profile/yashvardhanboru9)

SUMMARY
Computer Engineering undergraduate (CGPA: 8.86/10, PCCOE Pune, Batch of 2028) who shipped a production ERP for a paying client around ACID transactions, an append-only financial ledger, and role-based access control. Builds deep learning models (PyTorch, 98.49% benchmark accuracy), financial-crime graph analytics (FastAPI, NetworkX), and full-stack TypeScript/Python systems. Google BigCode 2026 Top 1,500; 600+ DSA problems solved. Available for Software & AI Engineering Internships.

TECHNICAL SKILLS
Languages: Python, C++, SQL (PostgreSQL, PL/pgSQL), TypeScript, JavaScript (ES2023+), Java (Core OOP), HTML5, CSS3
AI-ML & Data Science: PyTorch, Mamba (SSMs), Scikit-Learn, Pandas, NumPy, SciPy, NetworkX, Statistical Validation
Data & Databases: PostgreSQL 15+, Stored Procedures, ACID Transactions, Row Locking, SQL Views, Indexing, IndexedDB
Full Stack: React 19, Next.js 16, Node.js, Express.js, FastAPI, SQLAlchemy, Pydantic, REST APIs, WebSockets, Tailwind CSS
Cloud & Automation: Docker, GitHub Actions, Supabase, Vercel, Netlify Functions, Electron, Linux/Bash, Git, Postman

WORK EXPERIENCE
Shivkush Hi-Tech Nursery — Full Stack Software Engineer (Paid Freelance Contract) | Ahilyanagar, India | Dec 2025 – May 2026
- Built the client's daily-operations ERP (SNMS: billing, bookings, inventory, staff) in Next.js 16, TypeScript, and PostgreSQL (18.5K+ LOC, 18 migrations, 8 stored procedures); eliminated overselling via atomic dispatches with SELECT ... FOR UPDATE row locks and Row-Level Security.
- Replaced mutable balances with an append-only payment ledger and daily cashbook view reconciling cash, UPI, and split payments (100% cash-on-hand reconciliation), paired with a hub exporting 10,000-row Excel reports in <300ms and bilingual receipts.
- Shipped the client's offline-first customer website (PWA) for low-bandwidth rural users, reducing image payloads by 93.9% (WebP) and 3D asset size by 83.9% (Draco compression).

PROJECTS
CardioMamba-EM — Deep Learning for Cardiac Screening | PyTorch, Mamba SSM, SciPy, FastAPI | 2026 – Present
- Designed a bidirectional BiMamba SSM over synchronized ECG/heart-sound signals (500 Hz) with O(L) scaling, surpassing HPA-Net and PACFNet on PhysioNet CinC 2016 (98.49% accuracy, 99.56% sensitivity).
- Validated via patient-independent 5-fold CV (360 patients, 91.57% AUROC, bootstrap CI, DeLong test), cutting missed cases by 66.7% (18 to 6); distilled to 112K params (448 KB, ~160ms) in a FastAPI + React UI.

TRACE-X — Financial Crime & Insider Risk Engine | FastAPI, Next.js 14, NetworkX, Docker | Sep 2026
- Built a 7-engine AML + insider-risk prototype (FastAPI, SQLAlchemy, NetworkX) correlating off-hours IAM privilege overrides with downstream transfers via regulatory threshold structuring checks, directed cycle detection, and exponential time-decay scoring.
- Implemented an interactive React Flow attack-graph studio, counterfactual edge-removal sandbox, and 7-scenario banking twin benchmark deployed on Vercel with containerized Docker Compose setup.

TurboIDM — Download Accelerator | Node.js, Electron, React 19, GitHub Actions | Jun 2026
- Built a desktop download manager accelerating throttled transfers by up to 8x using 32 parallel HTTP Range streams and a work-stealing scheduler that splits slow byte ranges across idle workers.
- Wrote each stream directly to its pre-allocated byte offset (zero merge delay) and automated Win/macOS/Linux builds via GitHub Actions.

Inkless — Local-First Journal with Cloud Sync | Next.js 16, TypeScript, IndexedDB, PostgreSQL | Sep 2026
- Committed every edit to IndexedDB and a transactional outbox atomically (<5ms saves, zero offline loss), with a background sync worker performing block-level last-write-wins reconciliation into RLS-protected PostgreSQL.

EDUCATION
Pimpri Chinchwad College of Engineering (PCCOE), Pune | Bachelor of Technology in Computer Engineering | CGPA: 8.86 / 10.0 (Till Semester 4) | Expected May 2028
Coursework: Data Structures & Algorithms, DBMS, OOP, Operating Systems, Computer Networks, Machine Learning.

CERTIFICATIONS
- NPTEL Elite (Top 5% Topper) — Internet of Things (IIT Kharagpur, 91/100; 82,864 learners) | Jul–Oct 2026
- NPTEL Elite + Silver — Algorithmic Graph Theory & DSA (IIT Madras / Kharagpur, 77/100) | Jan–Apr 2025

ACHIEVEMENTS & HONORS
- Google BigCode 2026: Ranked in the Global Top 1,500 participants; Smart India Hackathon (SIH 2024): Delivered disaster-preparedness MVP in 24h sprint.
- Competitive Programming: 600+ problems solved; LeetCode 315+, CodeChef 2-Star (Peak 1434), Codeforces Pupil (Max 1227), HackerRank 5-Star (C++).
- Paid Client Engagement: Sole engineer for Shivkush Hi-Tech Nursery's ERP and customer website, from requirements to production (2025–2026).
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
Software Engineering Intern | AI-ML, Data & Full Stack
Pune, Maharashtra, India | +91-7058230773 | yashvardhanborude7@gmail.com
GitHub: https://github.com/Yashvardhan-4 | LinkedIn: https://linkedin.com/in/yashvardhan-borude-8640a6319
LeetCode: https://leetcode.com/u/yashvardhan_4/ (315+) | Codeforces: https://codeforces.com/profile/yashvardhanborude7 (Pupil 1227)
CodeChef: https://www.codechef.com/users/cheer_swan_02 (2-Star 1434) | HackerRank: https://www.hackerrank.com/profile/yashvardhanboru9 (5-Star C++)

================================================================================
PROFESSIONAL SUMMARY
================================================================================
Computer Engineering undergraduate (CGPA: 8.86/10, PCCOE Pune, Batch of 2028) who shipped
a production ERP for a paying client around ACID transactions, an append-only financial
ledger, and role-based access control. Builds deep learning models (PyTorch, 98.49%
benchmark accuracy), financial-crime graph analytics (FastAPI, NetworkX), and full-stack
TypeScript/Python systems. Google BigCode 2026 Top 1,500; 600+ DSA problems solved.
Available for Software & AI Engineering Internships.

================================================================================
WORK EXPERIENCE (PAID COMMERCIAL CONTRACT)
================================================================================
Shivkush Hi-Tech Nursery — Full Stack Software Engineer | Ahilyanagar, India
Timeline: Dec 2025 – May 2026
- Built daily-operations ERP (SNMS: billing, bookings, inventory, staff) in Next.js 16,
  TypeScript, and PostgreSQL (18.5K+ LOC, 18 migrations, 8 stored procedures); eliminated
  overselling via atomic dispatches with SELECT ... FOR UPDATE row locks & Row-Level Security.
- Replaced mutable balances with an append-only payment ledger & daily cashbook reconciling
  cash, UPI, and split payments (100% cash-on-hand accuracy), exporting 10,000-row Excel
  reports in <300ms with bilingual receipts.
- Shipped offline-first customer PWA cutting image payloads by 93.9% (WebP) and 3D assets
  by 83.9% (Draco compression).

================================================================================
FLAGSHIP PROJECTS
================================================================================
1. CardioMamba-EM — Deep Learning for Cardiac Screening (2026 – Present)
   PyTorch, Mamba SSM, SciPy, FastAPI
   - Bidirectional BiMamba SSM over synchronized 500 Hz ECG/PCG signals with O(L) scaling;
     98.49% accuracy & 99.56% sensitivity on PhysioNet CinC 2016 (beating HPA-Net & PACFNet).
   - 5-fold patient-independent CV (360 patients, 91.57% AUROC), cutting missed cases by
     66.7% (18 to 6); distilled to 112K params (448 KB, ~160ms) in FastAPI + React UI.

2. TRACE-X — Financial Crime & Insider Risk Engine (Sep 2026)
   FastAPI, Next.js 14, NetworkX, SQLAlchemy, React Flow, Docker
   - 7-engine AML + insider-risk prototype correlating off-hours IAM overrides with downstream
     transfers via structuring checks, directed cycle detection & time-decay scoring.
   - Interactive React Flow attack-graph studio, counterfactual edge-removal sandbox, and
     7-scenario banking twin deployed on Vercel + Docker Compose.

3. TurboIDM — Download Accelerator (Jun 2026)
   Node.js, Electron, React 19, GitHub Actions
   - Up to 8x faster transfers via 32 parallel HTTP Range streams & work-stealing scheduler.
   - Direct pre-allocated byte offset writes (0.00s merge delay) & Win/macOS/Linux CI builds.

4. Inkless — Local-First Journal with Cloud Sync (Sep 2026)
   Next.js 16, TypeScript, IndexedDB, PostgreSQL
   - <5ms atomic local IndexedDB + transactional outbox commits (zero offline loss) and
     background block-level LWW reconciliation into RLS-protected PostgreSQL.

================================================================================
EDUCATION & CERTIFICATIONS
================================================================================
Pimpri Chinchwad College of Engineering (PCCOE), Pune (Expected May 2028)
- B.Tech Computer Engineering | CGPA: 8.86 / 10.0 (Till Semester 4)
- NPTEL Elite (Top 5% Topper) — Internet of Things (IIT Kharagpur, 91/100; 82,864 learners)
- NPTEL Elite + Silver — Algorithmic Graph Theory & DSA (IIT Madras / Kharagpur, 77/100)

================================================================================
HONORS & TECHNICAL SKILLS
================================================================================
- Google BigCode 2026: Global Top 1,500 | SIH 2024: Delivered 24h disaster-response MVP
- Competitive Programming: 600+ solved (LeetCode 315+, Codeforces 1227, CodeChef 1434, HackerRank 5-Star)
- Languages: Python, C++, SQL (PostgreSQL, PL/pgSQL), TypeScript, JavaScript, Java, HTML5, CSS3
- AI/ML & Data: PyTorch, Mamba SSMs, Scikit-Learn, Pandas, NumPy, SciPy, NetworkX, PostgreSQL 15+
- Web & Cloud: React 19, Next.js 16, Node.js, FastAPI, SQLAlchemy, Three.js, Docker, GitHub Actions, Vercel`}
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
