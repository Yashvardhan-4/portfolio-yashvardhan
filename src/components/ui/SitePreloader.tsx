"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";

interface SitePreloaderProps {
  onComplete?: () => void;
}

export function SitePreloader({ onComplete }: SitePreloaderProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [mounted, setMounted] = useState(false);
  const [percent, setPercent] = useState(0);
  const [telemetryStage, setTelemetryStage] = useState(0);
  const [isSplitting, setIsSplitting] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const dismiss = useCallback(() => {
    setIsSplitting(true);
    setTimeout(() => {
      setDismissed(true);
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("preloader_dismissed", "true");
        } catch {}
      }
      onComplete?.();
    }, 620);
  }, [onComplete]);

  useEffect(() => {
    setMounted(true);

    // Fast-path for returning visitors in the same tab session
    if (typeof window !== "undefined") {
      try {
        const seen = sessionStorage.getItem("preloader_dismissed");
        if (seen === "true") {
          setDismissed(true);
          onComplete?.();
          return;
        }
      } catch {}
    }

    // Escape key listener for immediate skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        dismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Smooth tabular percentage stepping (< 850ms total)
    const stepInterval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(stepInterval);
          return 100;
        }
        const delta = Math.floor(Math.random() * 18) + 12;
        return Math.min(100, prev + delta);
      });
    }, 90);

    // Telemetry sequencing
    const t1 = setTimeout(() => setTelemetryStage(1), 200);
    const t2 = setTimeout(() => setTelemetryStage(2), 440);
    const t3 = setTimeout(() => setTelemetryStage(3), 680);
    const tDone = setTimeout(() => {
      dismiss();
    }, 920);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tDone);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dismiss, onComplete]);

  if (!mounted || dismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading digital exhibition"
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden"
    >
      {/* Upper Curtain Shutter */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[var(--bg)] transition-transform duration-600 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isSplitting ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="absolute bottom-0 inset-x-0 h-px bg-[var(--border)]" />
      </div>

      {/* Lower Curtain Shutter */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[var(--bg)] transition-transform duration-600 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isSplitting ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="absolute top-0 inset-x-0 h-px bg-[var(--border)]" />
      </div>

      {/* Central Calibration Terminal Canvas */}
      <div
        className={`relative z-10 w-full h-full flex flex-col items-center justify-center p-6 transition-opacity duration-300 ${
          isSplitting ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Skip Affordance */}
        <button
          onClick={dismiss}
          className="absolute top-6 right-6 sm:top-8 sm:right-8 font-mono text-[10px] tracking-widest uppercase text-[var(--fg-subtle)] hover:text-[var(--accent)] transition-colors py-1 px-2.5 rounded border border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur"
          aria-label="Skip introduction animation"
        >
          [ Esc to Skip ]
        </button>

        {/* Archival Optical Calibration Box */}
        <div className="relative w-full max-w-[420px] p-8 sm:p-10 rounded-2xl border border-[var(--border)] bg-[var(--surface-card)]/90 backdrop-blur-xl shadow-2xl">
          {/* Micro-Crosshairs at Architectural Intersections */}
          <span className="absolute -top-1.5 -left-1.5 text-[11px] font-mono text-[var(--accent)]" aria-hidden="true">+</span>
          <span className="absolute -top-1.5 -right-1.5 text-[11px] font-mono text-[var(--accent)]" aria-hidden="true">+</span>
          <span className="absolute -bottom-1.5 -left-1.5 text-[11px] font-mono text-[var(--accent)]" aria-hidden="true">+</span>
          <span className="absolute -bottom-1.5 -right-1.5 text-[11px] font-mono text-[var(--accent)]" aria-hidden="true">+</span>

          {/* Header Coordinates & Specimen ID */}
          <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-[var(--fg-subtle)] pb-4 border-b border-[var(--border)]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span>SYS_INIT // 2026</span>
            </span>
            <span>18.5204° N · 73.8567° E</span>
          </div>

          {/* Focal Subject & Tabular Meter */}
          <div className="py-6 flex items-baseline justify-between">
            <div>
              <h2 className="font-serif italic text-2xl sm:text-3xl font-normal text-[var(--fg)] tracking-tight">
                Yashvardhan Borude
              </h2>
              <p className="font-mono text-[11px] text-[var(--fg-muted)] tracking-wider uppercase mt-1">
                Full Stack &amp; Systems Engineering
              </p>
            </div>
            <div className="font-mono tabular-nums text-2xl sm:text-3xl font-light text-[var(--accent)]">
              {percent.toString().padStart(2, "0")}
              <span className="text-xs text-[var(--fg-subtle)] ml-0.5">%</span>
            </div>
          </div>

          {/* Hairline Progress Meter */}
          <div className="w-full h-1 bg-[var(--border)] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-cyan)] transition-all duration-150 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>

          {/* Archival Telemetry Log */}
          <div className="mt-5 space-y-1.5 font-mono text-[10px] text-[var(--fg-subtle)] tracking-wider uppercase">
            <div className="flex justify-between items-center">
              <span>01 // OPTICAL CALIBRATION</span>
              <span className={telemetryStage >= 1 ? "text-[var(--accent)]" : "text-[var(--fg-subtle)]/40"}>
                {telemetryStage >= 1 ? "CALIBRATED" : "CHECKING"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>02 // HALFTONE POINT MATRIX</span>
              <span className={telemetryStage >= 2 ? "text-[var(--accent)]" : "text-[var(--fg-subtle)]/40"}>
                {telemetryStage >= 2 ? "4,387 PTS OK" : "MOUNTING"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>03 // CONSERVATORY ENVIRONMENT</span>
              <span className={telemetryStage >= 3 ? "text-[var(--accent)]" : "text-[var(--fg-subtle)]/40"}>
                {telemetryStage >= 3 ? (isLight ? "PETRICHOR ACTIVE" : "OBSIDIAN SYNCHRONIZED") : "ARMING"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SitePreloader;