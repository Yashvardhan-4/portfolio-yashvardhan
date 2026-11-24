"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import {
  Briefcase,
  Award,
  GraduationCap,
  Trophy,
  Zap,
  ArrowUpRight,
  RotateCw,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { profile } from "@/data/profile";
import { CountUp } from "@/components/ui/CountUp";
import { ElasticDivider } from "@/components/ui/ElasticDivider";
import { useTheme } from "@/context/ThemeContext";

interface KeepsakeItem {
  id: string;
  badge: string;
  sealTone: "gold" | "silver" | "neutral";
  eyebrow: string;
  title: string;
  subtitle: string;
  metricNumber?: number;
  metricDecimals?: number;
  metricSuffix?: string;
  footerNote: string;
  restAngle: number;
  backHeadline: string;
  backStory: string;
  backBullets: string[];
  links?: { label: string; href: string }[];
  icon: "briefcase" | "gold" | "silver" | "grad" | "trophy" | "zap";
}

const KEEPSAKES: KeepsakeItem[] = [
  {
    id: "shivkush-contract",
    badge: "Paid Commercial Client",
    sealTone: "neutral",
    eyebrow: "Paid Client",
    title: "Shivkush Hi-Tech Nursery",
    subtitle: "Dec 2025 – May 2026 · Ahilyanagar",
    metricNumber: 100,
    metricDecimals: 0,
    metricSuffix: "% Ledger Accuracy",
    footerNote: "Click to flip · Drag on desk",
    restAngle: -3.2,
    backHeadline: "Real Business Software Under Pressure",
    backStory:
      "Hired on a paid freelance contract as sole engineer to build both a complete daily-operations ERP (billing, bookings, inventory, staff) and an offline-ready English/Marathi 3D storefront for rural farmers.",
    backBullets: [
      "18.5K+ lines of production Next.js 16 & PostgreSQL code across 18 migrations",
      "Instant <300ms 10,000-row Excel exports & zero inventory overselling",
      "93.9% lighter WebP images & 83.9% lighter interactive 3D plant models",
    ],
    links: [{ label: "Visit Live Storefront", href: "https://shivkush-hi-tech-nursery.vercel.app/" }],
    icon: "briefcase",
  },
  {
    id: "nptel-iot",
    badge: "Top 5% Topper",
    sealTone: "gold",
    eyebrow: "IIT Kharagpur",
    title: "Internet of Things",
    subtitle: "NPTEL Elite Topper · Jul–Oct 2026",
    metricNumber: 91,
    metricDecimals: 0,
    metricSuffix: "/ 100 Score",
    footerNote: "Top 5% of 82,864 Learners",
    restAngle: 2.6,
    backHeadline: "Ranked Top 5% Out of 82,864 Learners",
    backStory:
      "Awarded NPTEL Elite Top 5% National Topper certification by IIT Kharagpur after proctored national examination scoring 91/100.",
    backBullets: [
      "Score: 91 / 100 nationwide ranking in Top 5%",
      "Covered connected sensor networks, MQTT/CoAP & edge architectures",
      "82,864 participating learners across India",
    ],
    icon: "gold",
  },
  {
    id: "nptel-graph",
    badge: "Elite + Silver",
    sealTone: "silver",
    eyebrow: "IIT Madras",
    title: "Algorithmic Graph Theory",
    subtitle: "12-Week IIT Curriculum · Jan–Apr 2025",
    metricNumber: 77,
    metricDecimals: 0,
    metricSuffix: "/ 100 · Silver Medal",
    footerNote: "Click for curriculum details",
    restAngle: -2.1,
    backHeadline: "Foundational Rigor in Networks & Flow",
    backStory:
      "Completed an intensive 12-week IIT Madras & IIT Kharagpur curriculum mastering routing, flows, bipartite matching, and computational limits.",
    backBullets: [
      "Elite + Silver proctored national certification (77 / 100)",
      "Inspired both my C++ suite and TRACE-X financial network analysis",
      "Bridges clean mathematical modeling with real product engineering",
    ],
    icon: "silver",
  },
  {
    id: "pccoe-btech",
    badge: "Batch of 2028",
    sealTone: "neutral",
    eyebrow: "B.Tech CSE",
    title: "PCCOE Pune",
    subtitle: "Third Year · Expected May 2028",
    metricNumber: 8.86,
    metricDecimals: 2,
    metricSuffix: "/ 10.0 CGPA",
    footerNote: "Consistent Dean-level standing",
    restAngle: 3.1,
    backHeadline: "Academic Standing & Coursework",
    backStory:
      "Pursuing a Bachelor of Technology in Computer Engineering at Pimpri Chinchwad College of Engineering (PCCOE), Pune with an 8.86 CGPA through Semester 4.",
    backBullets: [
      "Expected Graduation: May 2028 · Pune, India",
      "Coursework: DSA, DBMS, OOP, Operating Systems, Networks & ML",
      "Balancing strong academics with real freelance production shipping",
    ],
    icon: "grad",
  },
  {
    id: "competitive-bigcode",
    badge: "Global Top 1,500",
    sealTone: "gold",
    eyebrow: "BigCode & CP",
    title: "Problem Solving Record",
    subtitle: "Google BigCode 2026 Global Top 1,500",
    metricNumber: 600,
    metricDecimals: 0,
    metricSuffix: "+ Problems Solved",
    footerNote: "Flip for verified coding profiles",
    restAngle: -1.8,
    backHeadline: "Verified Competitive Engineering Profiles",
    backStory:
      "Ranked among the Global Top 1,500 in Google BigCode 2026 alongside 600+ algorithmic problems solved across major global platforms.",
    backBullets: [
      "LeetCode: 315+ solved · Codeforces: Pupil (Max 1227, 200+ solved)",
      "CodeChef: 2-Star (Peak 1434) · HackerRank: 5-Star in C++",
    ],
    links: [
      { label: "LeetCode", href: profile.leetcode },
      { label: "Codeforces", href: profile.codeforces },
      { label: "CodeChef", href: profile.codechef },
      { label: "HackerRank", href: profile.hackerrank },
    ],
    icon: "trophy",
  },
  {
    id: "sih-2024",
    badge: "24h National Sprint",
    sealTone: "neutral",
    eyebrow: "SIH 2024",
    title: "PralayVeer MVP",
    subtitle: "Emergency Disaster Response · Aug 2024",
    metricNumber: 24,
    metricDecimals: 0,
    metricSuffix: "Hour Build Sprint",
    footerNote: "High-contrast accessible civic web",
    restAngle: 2.4,
    backHeadline: "Calm Design Under National Competition Pressure",
    backStory:
      "Qualified and built a working rapid-response disaster preparedness MVP in just 24 hours — focused on helping everyday people locate shelters over degraded mobile networks.",
    backBullets: [
      "High-contrast accessible interface legible in high-stress conditions",
      "Lightweight geospatial routing built for low-bandwidth 2G/3G zones",
      "Delivered tested judge-evaluated prototype within 24 hours",
    ],
    icon: "zap",
  },
];

function KeepsakeIcon({ kind, tone }: { kind: KeepsakeItem["icon"]; tone: KeepsakeItem["sealTone"] }) {
  const colorClass =
    tone === "gold"
      ? "text-amber-500"
      : tone === "silver"
      ? "text-slate-400"
      : "text-[var(--accent)]";

  switch (kind) {
    case "briefcase":
      return <Briefcase className={`h-4 w-4 ${colorClass}`} />;
    case "gold":
    case "silver":
      return <Award className={`h-4 w-4 ${colorClass}`} />;
    case "grad":
      return <GraduationCap className={`h-4 w-4 ${colorClass}`} />;
    case "trophy":
      return <Trophy className={`h-4 w-4 ${colorClass}`} />;
    case "zap":
      return <Zap className={`h-4 w-4 ${colorClass}`} />;
  }
}

interface KeepsakeCardProps {
  item: KeepsakeItem;
  index: number;
  viewMode: "desk" | "grid";
  isDesktop: boolean;
  deskRef: React.RefObject<HTMLDivElement | null>;
}

function KeepsakeCard({ item, index, viewMode, isDesktop, deskRef }: KeepsakeCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [foilPos, setFoilPos] = useState({ x: 50, y: 50, active: false });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const pointerDownPos = useRef({ x: 0, y: 0 });

  const isDeskInteractive = viewMode === "desk" && isDesktop;

  // Smoothly return cards cleanly when toggled to Neat Grid
  useEffect(() => {
    if (viewMode === "grid") {
      animate(x, 0, { type: "spring", stiffness: 260, damping: 24 });
      animate(y, 0, { type: "spring", stiffness: 260, damping: 24 });
    }
  }, [viewMode, x, y]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Allow clicking links inside flipped card without flipping back unintentionally
    if ((e.target as HTMLElement).closest("a")) return;
    const dist = Math.hypot(
      e.clientX - pointerDownPos.current.x,
      e.clientY - pointerDownPos.current.y
    );
    if (dist > 7) return; // Ignore drag release

    setFlipped((prev) => !prev);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sprout-chapter-react"));
    }
  };

  const handleFoilMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (item.sealTone === "neutral") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setFoilPos({ x: px, y: py, active: true });
  };

  const foilGradient =
    item.sealTone === "gold"
      ? `radial-gradient(circle at ${foilPos.x}% ${foilPos.y}%, rgba(251, 191, 36, 0.22), rgba(217, 119, 6, 0.05) 45%, transparent 72%)`
      : item.sealTone === "silver"
      ? `radial-gradient(circle at ${foilPos.x}% ${foilPos.y}%, rgba(226, 232, 240, 0.22), rgba(148, 163, 184, 0.05) 45%, transparent 72%)`
      : "none";

  return (
    <motion.div
      drag={isDeskInteractive}
      dragConstraints={deskRef}
      dragElastic={0.14}
      dragMomentum={false}
      whileDrag={{ scale: 1.04, zIndex: 40, rotate: 0 }}
      initial={{ opacity: 0, y: 28, rotate: 0 }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: isDeskInteractive ? item.restAngle : 0,
      }}
      animate={{
        rotate: isDeskInteractive ? item.restAngle : 0,
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        x,
        y,
        perspective: 1200,
      }}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      onPointerMove={handleFoilMove}
      onPointerLeave={() => setFoilPos((p) => ({ ...p, active: false }))}
      data-cursor-label={isDeskInteractive ? (flipped ? "FLIP BACK" : "DRAG OR FLIP") : "FLIP CARD"}
      className={`relative min-h-[345px] select-none ${
        isDeskInteractive
          ? "cursor-grab active:cursor-grabbing rounded-2xl shadow-[0_14px_40px_rgba(0,0,0,0.14)]"
          : "cursor-pointer"
      }`}
    >
      {/* 3D Two-Sided Keepsake Inner */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full min-h-[345px]"
      >
        {/* FRONT FACE */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className={`absolute inset-0 p-7 sm:p-8 flex flex-col justify-between bg-[var(--surface-card)] border border-[var(--border)] overflow-hidden transition-colors duration-300 hover:border-[var(--accent)]/60 ${
            viewMode === "desk" ? "rounded-2xl" : ""
          }`}
        >
          {/* Mouse-reactive metallic foil sheen for Gold/Silver IIT seals */}
          {item.sealTone !== "neutral" && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: foilPos.active ? 1 : 0.45,
                background: foilGradient,
              }}
            />
          )}

          {/* Header Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-[var(--border)] pb-3.5">
            <div className="flex items-center gap-2 min-w-0">
              <KeepsakeIcon kind={item.icon} tone={item.sealTone} />
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-muted)] truncate">
                {item.eyebrow}
              </span>
            </div>

            <span
              className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full border shrink-0 font-semibold ${
                item.sealTone === "gold"
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-500"
                  : item.sealTone === "silver"
                  ? "border-slate-400/40 bg-slate-400/10 text-slate-400"
                  : "border-[var(--accent)]/35 bg-[var(--accent-muted)] text-[var(--accent)]"
              }`}
            >
              {item.badge}
            </span>
          </div>

          {/* Center Stamp */}
          <div className="relative z-10 my-auto py-4">
            <h3 className="font-serif text-2xl sm:text-3xl text-[var(--fg)] leading-tight">
              {item.title}
            </h3>
            <p className="mt-1 font-mono text-[11px] text-[var(--fg-muted)]">
              {item.subtitle}
            </p>

            {item.metricNumber !== undefined && (
              <div className="mt-4 flex items-baseline gap-2 border-t border-[var(--border)]/70 pt-3.5">
                <span className="tabular-nums font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[var(--fg)]">
                  <CountUp
                    to={item.metricNumber}
                    decimals={item.metricDecimals ?? 0}
                    duration={1.8}
                  />
                </span>
                <span className="font-mono text-xs text-[var(--fg-muted)]">
                  {item.metricSuffix}
                </span>
              </div>
            )}
          </div>

          {/* Bottom Micro-Affordance */}
          <div className="relative z-10 flex items-center justify-between border-t border-[var(--border)]/70 pt-3 font-mono text-[10px] text-[var(--fg-subtle)]">
            <span>{item.footerNote}</span>
            <span className="inline-flex items-center gap-1 text-[var(--accent)]">
              <RotateCw className="h-3 w-3" />
              <span>Flip</span>
            </span>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className={`absolute inset-0 p-6 sm:p-7 flex flex-col justify-between bg-[var(--bg)] border border-[var(--accent)]/50 overflow-y-auto ${
            viewMode === "desk" ? "rounded-2xl" : ""
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] font-semibold">
                Verified Story
              </span>
              <span className="font-mono text-[10px] text-[var(--fg-muted)] inline-flex items-center gap-1">
                <RotateCw className="h-3 w-3" /> Flip Back
              </span>
            </div>

            <h4 className="font-serif text-lg sm:text-xl text-[var(--fg)] leading-snug">
              {item.backHeadline}
            </h4>

            <p className="font-sans text-xs text-[var(--fg-muted)] leading-relaxed">
              {item.backStory}
            </p>

            <ul className="space-y-1.5 pt-1 font-sans text-[11px] text-[var(--fg)]/90">
              {item.backBullets.map((b, bIdx) => (
                <li key={bIdx} className="flex items-start gap-1.5 leading-snug">
                  <span className="text-[var(--accent)] mt-0.5 shrink-0">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {item.links && item.links.length > 0 && (
            <div className="pt-3 border-t border-[var(--border)] flex flex-wrap gap-2">
              {item.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] font-mono text-[10px] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-2.5 w-2.5" />
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AboutPhilosophy() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const deskRef = useRef<HTMLDivElement | null>(null);
  const [viewMode, setViewMode] = useState<"desk" | "grid">("desk");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="about"
      aria-label="Milestones, Experience, Education, and Honors"
      className="relative w-full bg-[var(--surface)] pb-24 sm:pb-36 overflow-hidden scroll-mt-20 transition-colors duration-300"
    >
      {/* Elastic Silk Arch Transition */}
      <ElasticDivider fill="var(--surface)" className="-mt-10 sm:-mt-16 relative z-20" />

      {/* Studio Ghibli Herbarium Landscape Backdrop (Light Mode Only) */}
      {isLight && (
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-bottom opacity-20 mix-blend-multiply"
            style={{ backgroundImage: `url('/images/ghibli-countryside-summer.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface)] via-transparent to-[var(--surface)] opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface)]/85 via-transparent to-[var(--surface)]/85" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-16 pt-12 sm:pt-16">
        {/* Section Header + Desk / Neat Grid Switch */}
        <div className="mb-12 sm:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end border-b border-[var(--border)] pb-8">
          <div className="lg:col-span-7">
            <span className="font-mono text-[11px] text-[var(--accent)] tracking-[0.14em] uppercase font-semibold flex items-center gap-2">
              {isLight && <span aria-hidden="true">🍃</span>}
              04 · Milestones &amp; Keepsakes
            </span>
            <h2 className="mt-2.5 font-serif text-4xl sm:text-5xl lg:text-[4rem] font-normal text-[var(--fg)] tracking-[-0.03em] leading-[0.98] [text-wrap:balance]">
              Moments worth keeping.
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col justify-end lg:items-end gap-4">
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[var(--fg-muted)] max-w-prose [text-wrap:pretty]">
              Click any keepsake to flip it over for the full story — or drag them freely across the table.
            </p>

            {/* Tactile Desk <-> Neat Grid Switch */}
            <div
              role="group"
              aria-label="Choose milestone display layout"
              className="hidden md:inline-flex items-center p-1 rounded-full border border-[var(--border)] bg-[var(--bg)] font-mono text-[11px] self-start lg:self-end"
            >
              <button
                type="button"
                onClick={() => setViewMode("desk")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === "desk"
                    ? "bg-[var(--fg)] text-[var(--bg)] font-semibold"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                }`}
              >
                <Sparkles className="h-3 w-3" />
                <span>Desk View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-[var(--fg)] text-[var(--bg)] font-semibold"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                }`}
              >
                <LayoutGrid className="h-3 w-3" />
                <span>Neat Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Playful Exhibition Desk OR Crisp Exposed Hairline Grid */}
        <div
          ref={deskRef}
          className={
            viewMode === "desk" && isDesktop
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 py-4"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]"
          }
        >
          {KEEPSAKES.map((item, idx) => (
            <KeepsakeCard
              key={item.id}
              item={item}
              index={idx}
              viewMode={viewMode}
              isDesktop={isDesktop}
              deskRef={deskRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutPhilosophy;
