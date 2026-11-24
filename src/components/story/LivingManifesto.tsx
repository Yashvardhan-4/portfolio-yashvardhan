"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ElasticDivider } from "@/components/ui/ElasticDivider";
import { ScrollVelocity } from "@/components/ui/ScrollVelocity";
import { useTheme } from "@/context/ThemeContext";

interface StoryWordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  italic?: boolean;
}

function StoryWord({ children, progress, range, italic = false }: StoryWordProps) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const y = useTransform(progress, range, [6, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block transition-colors duration-200 will-change-[opacity,transform] ${
        italic ? "italic text-[var(--accent)]" : ""
      }`}
    >
      {children}
    </motion.span>
  );
}

interface LivingCapsuleProps {
  kind: "pune" | "botanical" | "heartbeat";
  isLight: boolean;
}

function LivingCapsule({ kind, isLight }: LivingCapsuleProps) {
  if (kind === "pune") {
    return (
      <span
        data-cursor-label="18.52°N · PUNE"
        className="group inline-flex items-center gap-1.5 align-middle mx-1.5 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface-card)] font-mono text-[11px] uppercase tracking-widest text-[var(--fg)] shadow-sm transition-transform duration-300 hover:scale-105 cursor-default select-none"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
        </span>
        <span>Pune, IN</span>
      </span>
    );
  }

  if (kind === "botanical") {
    return (
      <span
        data-cursor-label="REAL IMPACT"
        className="group inline-flex items-center justify-center align-middle mx-1.5 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface-card)] shadow-sm transition-transform duration-300 hover:scale-110 cursor-default select-none"
      >
        <svg
          viewBox="0 0 28 18"
          className="w-6 h-4 transition-transform duration-500 ease-out group-hover:rotate-12"
          aria-hidden="true"
        >
          <path
            d="M3 14 C7 14, 12 10, 24 3 C21 12, 14 16, 4 15 Z"
            fill={isLight ? "#2A5741" : "#10B981"}
          />
          <path
            d="M4 14 Q14 9 23 4"
            stroke={isLight ? "#FAF6F0" : "#050508"}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  }

  return (
    <span
      data-cursor-label="98.5% AI"
      className="group inline-flex items-center gap-0.5 align-middle mx-1.5 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-card)] shadow-sm transition-transform duration-300 hover:scale-110 cursor-default select-none"
    >
      <span className="w-0.5 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
      <span className="w-0.5 h-3.5 rounded-full bg-[var(--accent)] animate-pulse [animation-delay:120ms]" />
      <span className="w-0.5 h-2.5 rounded-full bg-[var(--accent-warm,var(--accent))] animate-pulse [animation-delay:240ms]" />
      <span className="w-0.5 h-3 rounded-full bg-[var(--accent)] animate-pulse [animation-delay:360ms]" />
      <span className="w-0.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse [animation-delay:480ms]" />
    </span>
  );
}

const STATEMENT_TOKENS: Array<{
  type: "word" | "capsule";
  text?: string;
  italic?: boolean;
  capsule?: "pune" | "botanical" | "heartbeat";
}> = [
  { type: "word", text: "I'm" },
  { type: "word", text: "Yashvardhan", italic: true },
  { type: "word", text: "—" },
  { type: "word", text: "a" },
  { type: "word", text: "computer" },
  { type: "word", text: "engineering" },
  { type: "word", text: "student" },
  { type: "word", text: "in" },
  { type: "word", text: "Pune" },
  { type: "capsule", capsule: "pune" },
  { type: "word", text: "who" },
  { type: "word", text: "ships" },
  { type: "word", text: "software" },
  { type: "word", text: "for" },
  { type: "word", text: "real" },
  { type: "word", text: "businesses" },
  { type: "capsule", capsule: "botanical" },
  { type: "word", text: "teaches" },
  { type: "word", text: "AI" },
  { type: "word", text: "to" },
  { type: "word", text: "listen" },
  { type: "word", text: "to" },
  { type: "word", text: "heartbeats" },
  { type: "capsule", capsule: "heartbeat" },
  { type: "word", text: "and" },
  { type: "word", text: "turns" },
  { type: "word", text: "ambitious" },
  { type: "word", text: "ideas" },
  { type: "word", text: "into" },
  { type: "word", text: "products", italic: true },
  { type: "word", text: "people" },
  { type: "word", text: "love" },
  { type: "word", text: "using." },
];

export function LivingManifesto() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "center 0.38"],
  });

  const wordTokens = STATEMENT_TOKENS.filter((t) => t.type === "word");
  const totalWords = wordTokens.length;

  let wordCursor = 0;

  return (
    <section
      ref={sectionRef}
      aria-label="Engineering Story & Craft"
      className="relative w-full bg-[var(--surface)] text-[var(--fg)] transition-colors duration-300"
    >
      {/* Elastic Silk Arch Boundary flowing smoothly from Hero */}
      <ElasticDivider fill="var(--surface)" className="-mt-10 sm:-mt-16 relative z-20" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16 pt-20 sm:pt-28 pb-14 sm:pb-20">
        {/* 12-Column Asymmetric Exhibition Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Index Gutter (Columns 1–3) */}
          <div className="lg:col-span-3 space-y-3 pt-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)] font-semibold block">
              02 · The Human Story
            </span>
            <p className="font-sans text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed max-w-[26ch]">
              Engineering with empathy, taste, and measurable craft across every layer.
            </p>
          </div>

          {/* Right Scroll-Illuminated Manifesto (Columns 4–12) */}
          <div className="lg:col-span-9">
            <p className="font-serif text-3xl sm:text-5xl lg:text-[3.4rem] leading-[1.2] tracking-[-0.02em] text-[var(--fg)] [text-wrap:balance]">
              {STATEMENT_TOKENS.map((token, idx) => {
                if (token.type === "capsule" && token.capsule) {
                  return <LivingCapsule key={`cap-${idx}`} kind={token.capsule} isLight={isLight} />;
                }

                const currentWordIdx = wordCursor++;
                const start = (currentWordIdx / totalWords) * 0.82;
                const end = Math.min(1, start + 0.18);

                return (
                  <React.Fragment key={`w-${idx}`}>
                    <StoryWord progress={scrollYProgress} range={[start, end]} italic={token.italic}>
                      {token.text}
                    </StoryWord>{" "}
                  </React.Fragment>
                );
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Sculptural Velocity Craft Ribbon */}
      <div className="border-t border-[var(--border)] pt-7 sm:pt-9 pb-20 sm:pb-28 overflow-hidden">
        <ScrollVelocity
          texts={[
            "AI & Healthcare  ·  Full-Stack Products  ·  Financial Intelligence  ·  Interactive 3D Web  ·  Desktop Systems  · ",
            "PyTorch  ·  Next.js 16  ·  PostgreSQL  ·  FastAPI  ·  Three.js  ·  TypeScript  ·  Electron  · ",
          ]}
          velocity={48}
          skewWithVelocity={5}
          scaleWithVelocity={0.03}
          outlineAlternate={true}
          fadeEdges={true}
          draggable={true}
          className="font-display text-2xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.03em] text-[var(--fg)]/80 py-1.5"
        />
      </div>
    </section>
  );
}

export default LivingManifesto;
