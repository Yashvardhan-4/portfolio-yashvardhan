"use client";

import React from "react";
import { profile } from "@/data/profile";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[#08090a] py-12 font-mono text-xs text-[var(--fg-muted)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[var(--border-subtle)]">
          <div className="flex flex-col gap-1">
            <span className="font-display text-lg font-semibold text-[var(--fg)] tracking-tight">
              {profile.legalName}
            </span>
            <span className="text-[11px] text-[var(--fg-muted)]">
              Pune, Maharashtra, India &bull; Coordinates: 18.5204&deg; N, 73.8567&deg; E
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors"
            >
              GITHUB
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors"
            >
              LINKEDIN
            </a>
            <a
              href={profile.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors"
            >
              LEETCODE
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              <span>TOP</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] text-[var(--fg-muted)]">
          <div>
            &copy; {new Date().getFullYear()} Yashvardhan Borude. Designed and engineered with precision.
          </div>
          <div className="flex items-center gap-3">
            <span>DISCIPLINE: ZERO-SLOP ART DIRECTION</span>
            <span className="text-[var(--accent)] font-semibold">&bull; 100% LIGHTHOUSE READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
