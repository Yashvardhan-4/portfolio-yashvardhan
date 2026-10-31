"use client";

import React from "react";
import { LogoLoop, LogoItem } from "./LogoLoop";

// Authentic SVGs for Verified Technologies
const TECH_LOGOS: LogoItem[] = [
  {
    name: "TypeScript",
    ariaLabel: "TypeScript programming language",
    node: (
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#1E2430] bg-[#0E1015]/90 hover:border-[#3178C6] hover:shadow-[0_0_20px_rgba(49,120,198,0.3)] transition-all">
        <svg viewBox="0 0 128 128" className="h-6 w-6 fill-[#3178C6]">
          <path d="M1.5 63.5v63h125v-125h-125v62zm100.8 13.9c0 5.4-2 9.7-6 12.9-4 3.2-9.6 4.8-16.7 4.8-5.3 0-10.1-.9-14.4-2.6-4.3-1.8-7.8-4.4-10.4-8l8.3-9.5c2.1 2.9 4.7 5.1 7.7 6.6 3 1.5 6.3 2.3 9.8 2.3 3.6 0 6.3-.7 8.3-2 2-1.3 3-3.2 3-5.5 0-1.6-.5-3-1.6-4.1-1.1-1.1-2.7-2-4.8-2.8-2.1-.8-5.2-1.7-9.2-2.7-5.3-1.3-9.5-3.1-12.7-5.3-3.2-2.2-5.4-4.8-6.8-7.8-1.4-3-2.1-6.5-2.1-10.6 0-5.1 1.8-9.4 5.5-12.7 3.7-3.3 9-5 15.9-5 4.8 0 9.2.8 13.2 2.3 4 1.5 7.2 3.7 9.8 6.5l-7.9 9.5c-2.1-2.2-4.4-3.8-6.9-4.8-2.5-1-5.3-1.5-8.4-1.5-3.3 0-5.8.7-7.6 2-1.8 1.3-2.7 3-2.7 5.1 0 1.5.5 2.7 1.6 3.7 1.1 1 2.7 1.8 4.7 2.6 2 1.2 5 2.5 8.9 4.1 5.3 2.2 9.5 4.7 12.6 7.4 3 2.7 4.6 6.3 4.6 10.9zm-53.7-38.3h-19.6v63.7h-14.7v-63.7h-19.5v-12.4h53.8v12.4z" />
        </svg>
        <span className="font-mono text-xs font-semibold text-[#EDEDEF]">TypeScript</span>
      </div>
    ),
  },
  {
    name: "React 19",
    ariaLabel: "React library",
    node: (
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#1E2430] bg-[#0E1015]/90 hover:border-[#61DAFB] hover:shadow-[0_0_20px_rgba(97,218,251,0.3)] transition-all">
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="h-6 w-6 fill-[#61DAFB]">
          <circle cx="0" cy="0" r="2.05" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
        <span className="font-mono text-xs font-semibold text-[#EDEDEF]">React 19</span>
      </div>
    ),
  },
  {
    name: "Next.js 16",
    ariaLabel: "Next.js framework",
    node: (
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#1E2430] bg-[#0E1015]/90 hover:border-[#FFFFFF] hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all">
        <svg viewBox="0 0 180 180" className="h-6 w-6">
          <mask height="180" id="mask0" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}>
            <circle cx="90" cy="90" fill="black" r="90" />
          </mask>
          <g mask="url(#mask0)">
            <circle cx="90" cy="90" data-theme="dark" fill="black" r="90" stroke="#FFFFFF" strokeWidth="6" />
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
            <rect fill="white" height="72" width="12" x="115" y="54" />
          </g>
        </svg>
        <span className="font-mono text-xs font-semibold text-[#EDEDEF]">Next.js 16</span>
      </div>
    ),
  },
  {
    name: "C++",
    ariaLabel: "C++ programming language",
    node: (
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#1E2430] bg-[#0E1015]/90 hover:border-[#00599C] hover:shadow-[0_0_20px_rgba(0,89,156,0.3)] transition-all">
        <svg viewBox="0 0 128 128" className="h-6 w-6 fill-[#00599C]">
          <path d="M64 14L14 43v58l50 29 50-29V43L64 14zm35 63h-6v6h-6v-6h-6v-6h6v-6h6v6h6v6zm18-12h-6v6h-6v-6h-6v-6h6v-6h6v6h6v6zM64 34c16.5 0 30 13.5 30 30s-13.5 30-30 30-30-13.5-30-30 13.5-30 30-30zm0 14c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16z" />
        </svg>
        <span className="font-mono text-xs font-semibold text-[#EDEDEF]">C++</span>
      </div>
    ),
  },
  {
    name: "Three.js / WebGL",
    ariaLabel: "Three.js 3D library",
    node: (
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#1E2430] bg-[#0E1015]/90 hover:border-[#A855F7] hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
        <svg viewBox="0 0 128 128" className="h-6 w-6 fill-[#EDEDEF]">
          <path d="M64 10.5L14 39.4v57.8l50 28.9 50-28.9V39.4L64 10.5zm0 16.2l36 20.8L64 68.3 28 47.5l36-20.8zM24 54.4l35 20.2v40.5L24 94.9V54.4zm70 40.5L69 115.1V74.6l35-20.2v40.5z" />
        </svg>
        <span className="font-mono text-xs font-semibold text-[#EDEDEF]">Three.js</span>
      </div>
    ),
  },
  {
    name: "Supabase & Postgres",
    ariaLabel: "Supabase and PostgreSQL database",
    node: (
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#1E2430] bg-[#0E1015]/90 hover:border-[#3ECF8E] hover:shadow-[0_0_20px_rgba(62,207,142,0.3)] transition-all">
        <svg viewBox="0 0 109 113" className="h-6 w-6">
          <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0675L99.1936 40.0675C106.094 40.0675 109.967 48.0305 105.632 53.4895L63.7076 110.284Z" fill="#3ECF8E" />
          <path d="M45.317 2.07466C48.1765 -1.52627 53.9745 0.446844 54.0434 5.0449L54.3496 72.2917L9.83103 72.2917C2.93043 72.2917 -0.942737 64.3287 3.39233 58.8697L45.317 2.07466Z" fill="#3ECF8E" fillOpacity="0.75" />
        </svg>
        <span className="font-mono text-xs font-semibold text-[#EDEDEF]">PostgreSQL</span>
      </div>
    ),
  },
  {
    name: "Electron",
    ariaLabel: "Electron framework",
    node: (
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#1E2430] bg-[#0E1015]/90 hover:border-[#47848F] hover:shadow-[0_0_20px_rgba(71,132,143,0.3)] transition-all">
        <svg viewBox="0 0 128 128" className="h-6 w-6 fill-[#47848F]">
          <path d="M64 12C35.3 12 12 35.3 12 64s23.3 52 52 52 52-23.3 52-52-23.3-52-52-52zm0 8c24.3 0 44 19.7 44 44s-19.7 44-44 44-44-19.7-44-44 19.7-44 44-44zm0 18c-14.4 0-26 11.6-26 26s11.6 26 26 26 26-11.6 26-26-11.6-26-26-26zm0 8c9.9 0 18 8.1 18 18s-8.1 18-18 18-18-8.1-18-18 8.1-18 18-18z" />
        </svg>
        <span className="font-mono text-xs font-semibold text-[#EDEDEF]">Electron</span>
      </div>
    ),
  },
  {
    name: "Docker",
    ariaLabel: "Docker containerization",
    node: (
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#1E2430] bg-[#0E1015]/90 hover:border-[#2496ED] hover:shadow-[0_0_20px_rgba(36,150,237,0.3)] transition-all">
        <svg viewBox="0 0 128 128" className="h-6 w-6 fill-[#2496ED]">
          <path d="M121.2 59.4c-1.3-.9-3.9-1.4-6.4-1.1-.7-6.2-4.8-11.7-10.7-14.4-1.2-.6-2.5-1-3.9-1.2-1.3-4.5-4.4-8.2-8.6-10.3l-2.4 4.3c3.2 1.6 5.6 4.5 6.6 8 0 .2.1.3.1.5-2.2-.4-4.5-.3-6.6.3-5.5 1.5-9.6 5.7-11.2 11.1H5.8c-2.4 0-4.4 1.8-4.7 4.1C.2 68.8.8 77.2 4.1 84.8c4.6 10.6 13.8 18.2 24.8 20.8 15.6 3.7 39.4 3.9 57.6-6 10.1-5.5 17.5-14.9 20.7-26.3 7.8-.8 14.3-5.9 16.5-13.4.1-.2.1-.5.1-.7-.8.3-1.7.4-2.6.2zM21 53h10v10H21V53zm14 0h10v10H35V53zm14 0h10v10H49V53zm14 0h10v10H63V53zm-28-14h10v10H35V39zm14 0h10v10H49V39zm14 0h10v10H63V39zm0-14h10v10H63V25z" />
        </svg>
        <span className="font-mono text-xs font-semibold text-[#EDEDEF]">Docker</span>
      </div>
    ),
  },
  {
    name: "Python",
    ariaLabel: "Python language",
    node: (
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#1E2430] bg-[#0E1015]/90 hover:border-[#3776AB] hover:shadow-[0_0_20px_rgba(55,118,171,0.3)] transition-all">
        <svg viewBox="0 0 128 128" className="h-6 w-6">
          <path d="M63.2 2c-15.6 0-24.8 6.9-24.8 20.4V33h25.4v3.8H26.3C11.8 36.8 0 45.4 0 63.6c0 17.6 10.4 26.8 24.7 26.8h7.9v-11.3c0-12.7 10.6-23.3 23.3-23.3h25.6v-3.8H56.1V40.2c0-7.8 6.6-14.5 14.5-14.5h23.3V22.4C93.9 8.9 84.7 2 63.2 2zM52.3 9.4c3.4 0 6.2 2.8 6.2 6.2 0 3.4-2.8 6.2-6.2 6.2-3.4 0-6.2-2.8-6.2-6.2.1-3.4 2.8-6.2 6.2-6.2z" fill="#3776AB" />
          <path d="M64.8 126c15.6 0 24.8-6.9 24.8-20.4V95H64.2v-3.8h37.5c14.5 0 26.3-8.6 26.3-26.8 0-17.6-10.4-26.8-24.7-26.8h-7.9v11.3c0 12.7-10.6 23.3-23.3 23.3H46.5v3.8h25.4v11.8c0 7.8-6.6 14.5-14.5 14.5H34.1v3.3c0 13.5 9.2 20.4 30.7 20.4zm10.9-7.4c-3.4 0-6.2-2.8-6.2-6.2 0-3.4 2.8-6.2 6.2-6.2 3.4 0 6.2 2.8 6.2 6.2 0 3.4-2.8 6.2-6.2 6.2z" fill="#FFD43B" />
        </svg>
        <span className="font-mono text-xs font-semibold text-[#EDEDEF]">Python</span>
      </div>
    ),
  },
  {
    name: "Tailwind CSS",
    ariaLabel: "Tailwind CSS styling",
    node: (
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#1E2430] bg-[#0E1015]/90 hover:border-[#38BDF8] hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all">
        <svg viewBox="0 0 128 128" className="h-6 w-6 fill-[#38BDF8]">
          <path d="M64 32c-21.3 0-34.7 10.7-40 32 8-10.7 17.3-14.7 28-12 6.1 1.5 10.4 5.9 15.3 10.8C75.2 70.8 84.4 80 104 80c21.3 0 34.7-10.7 40-32-8 10.7-17.3 14.7-28 12-6.1-1.5-10.4-5.9-15.3-10.8C92.8 41.2 83.6 32 64 32zM24 64c-21.3 0-34.7 10.7-40 32 8-10.7 17.3-14.7 28-12 6.1 1.5 10.4 5.9 15.3 10.8C35.2 102.8 44.4 112 64 112c21.3 0 34.7-10.7 40-32-8 10.7-17.3 14.7-28 12-6.1-1.5-10.4-5.9-15.3-10.8C52.8 73.2 43.6 64 24 64z" />
        </svg>
        <span className="font-mono text-xs font-semibold text-[#EDEDEF]">Tailwind CSS</span>
      </div>
    ),
  },
];

export function TechStackLoop() {
  return (
    <section
      aria-label="Core Engineering Stack & Tooling"
      className="relative w-full border-t border-[#1E2430] bg-[#0A0C11] py-10 sm:py-14 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[#A855F7] font-semibold">
            Technical Stack
          </span>
          <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-normal text-[#EDEDEF]">
            Production Technologies &amp; Architecture
          </h2>
        </div>
      </div>

      <div className="w-full">
        <LogoLoop
          logos={TECH_LOGOS}
          speed={32}
          direction="left"
          gap={24}
          logoHeight={44}
          pauseOnHover={true}
          draggable={true}
          fadeOut={true}
          fadeOutWidth={80}
          className="py-2"
        />
      </div>
    </section>
  );
}

export default TechStackLoop;
