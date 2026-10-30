"use client";

import React from "react";
import { ScrollVelocity } from "@/components/ui/ScrollVelocity";

export function KineticTicker() {
  const row1 = [
    "DISTRIBUTED SYSTEMS //",
    "RECURSIVE HEURISTICS //",
    "HIGH-CONCURRENCY WORKERS //",
    "LOW-LATENCY IPC //",
  ];

  const row2 = [
    "NEXT.JS 15 //",
    "WEBGL2 COMPUTE //",
    "POSTGRESQL ACID RIGOR //",
    "C++ SYSTEMS ENGINE //",
    "ALGORITHMIC COMPLEXITY //",
  ];

  return (
    <div
      aria-label="Systems Engineering Competencies Kinetic Marquee"
      className="relative w-full border-y border-[#1C2029] bg-[#07080B] py-6 overflow-hidden z-20"
    >
      <div className="flex flex-col gap-3 font-mono text-sm sm:text-base tracking-[0.14em] uppercase">
        <ScrollVelocity
          texts={row1}
          velocity={45}
          skewWithVelocity={6}
          scaleWithVelocity={0.03}
          draggable={true}
          pauseOnHover={true}
          fadeEdges={true}
          numCopies={4}
          gap={32}
          color="#8E95A5"
          className="text-xs sm:text-sm font-semibold tracking-widest text-[#8E95A5] transition-colors hover:text-[#EDEDEF]"
        />
        <ScrollVelocity
          texts={row2}
          velocity={-40}
          skewWithVelocity={-6}
          scaleWithVelocity={0.03}
          draggable={true}
          pauseOnHover={true}
          fadeEdges={true}
          outlineAlternate={true}
          numCopies={4}
          gap={32}
          color="#00D2FF"
          className="text-xs sm:text-sm font-semibold tracking-widest text-[#00D2FF]"
        />
      </div>
    </div>
  );
}

export default KineticTicker;
