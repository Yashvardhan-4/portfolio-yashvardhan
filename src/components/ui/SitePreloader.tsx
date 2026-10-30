"use client";

import React, { useEffect, useState } from "react";
import { MagicRings } from "./MagicRings";
import { LatticeLoader } from "./LatticeLoader";

interface SitePreloaderProps {
  onComplete?: () => void;
}

export function SitePreloader({ onComplete }: SitePreloaderProps) {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"working" | "done">("working");
  const [fadeOut, setFadeOut] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    setMounted(true);

    const timerDone = setTimeout(() => {
      setStatus("done");
    }, 1150);

    const timerFade = setTimeout(() => {
      setFadeOut(true);
    }, 1650);

    const timerRemove = setTimeout(() => {
      setRemoved(true);
      onComplete?.();
    }, 2250);

    return () => {
      clearTimeout(timerDone);
      clearTimeout(timerFade);
      clearTimeout(timerRemove);
    };
  }, [onComplete]);

  if (!mounted || removed) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#08090C] select-none transition-opacity duration-700 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 1. Magic Rings Ambient WebGL Background */}
      <div className="absolute inset-0 pointer-events-none opacity-85 z-0 flex items-center justify-center">
        <MagicRings
          color="#A855F7"
          colorTwo="#38BDF8"
          ringCount={7}
          motion="pulse"
          speed={1.2}
          lineThickness={2}
          glow={1.4}
          baseRadius={0.28}
          radiusStep={0.09}
          expansion={0.12}
          taper={1.4}
          dispersion={0.25}
          grain={0.06}
          opacity={0.9}
          followMouse={true}
          theme="dark"
          className="w-full h-full"
        />
      </div>

      {/* 2. Centerpiece LatticeLoader and System Status */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-8 rounded-2xl border border-[#1E2430]/60 bg-[#0E1015]/75 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.22)]">
        <LatticeLoader
          label="Initializing Workspace"
          doneLabel="Initialized in"
          status={status}
          pattern="orbit"
          grid={3}
          shape="round"
          color="#C084FC"
          glowColor="#A855F7"
          doneColor="#38BDF8"
          cellSize={7}
          gap={3}
          fontSize={13}
          glow={true}
          showTimer={true}
          className="font-mono text-xs uppercase tracking-widest text-[#EDEDEF]"
        />

        <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#64748B] uppercase">
          <span>Yashvardhan Borude</span>
          <span>&bull;</span>
          <span>Systems & Full-Stack</span>
        </div>
      </div>
    </div>
  );
}

export default SitePreloader;
