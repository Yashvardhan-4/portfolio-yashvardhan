"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Terminal } from "lucide-react";
import { profile } from "@/data/profile";

export function Navbar() {
  const [time, setTime] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Indian Standard Time (UTC+5:30)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(now.toLocaleTimeString("en-GB", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: "INDEX", href: "#overview", num: "01" },
    { label: "ALGORITHMS", href: "#algorithms", num: "02" },
    { label: "PROJECTS", href: "#projects", num: "03" },
    { label: "SYSTEMS", href: "#systems", num: "04" },
    { label: "TRAJECTORY", href: "#trajectory", num: "05" },
    { label: "TERMINAL", href: "#terminal", num: "06" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[#08090a]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Monogram */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-[var(--fg)]"
          >
            <span className="flex h-6 w-6 items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[10px] font-semibold text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]">
              YB
            </span>
            <span className="font-semibold tracking-normal text-[var(--fg)]">
              Yashvardhan Borude
            </span>
          </Link>

          <span className="hidden h-3 w-px bg-[var(--border)] md:block" />

          {/* Location & Time telemetry */}
          <div className="hidden items-center gap-2 font-mono text-[11px] text-[var(--fg-muted)] md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span>PUNE, IN</span>
            <span className="tabular-nums text-[var(--fg)]">{time || "IST"}</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
            >
              <span className="text-[9px] text-[var(--accent)] opacity-60 group-hover:opacity-100">
                {item.num}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Actions & Links */}
        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 font-mono text-[11px] text-[var(--fg-muted)] transition-all hover:border-[var(--accent)] hover:text-[var(--fg)]"
          >
            <span>GITHUB</span>
            <ArrowUpRight className="h-3 w-3 text-[var(--accent)]" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 border border-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1 font-mono text-[11px] font-medium text-[var(--accent)] transition-all hover:bg-[var(--accent)] hover:text-[#08090a]"
          >
            <span>INITIATE CONTACT</span>
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile navigation menu"
            className="flex h-9 w-9 items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-b border-[var(--border)] bg-[var(--bg)] px-4 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <span className="font-mono text-[11px] text-[var(--fg-muted)]">SYSTEM TIME:</span>
              <span className="font-mono text-xs tabular-nums text-[var(--accent)]">{time} IST</span>
            </div>
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 font-mono text-xs tracking-wider text-[var(--fg)] hover:text-[var(--accent)]"
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-[var(--accent)]">[{item.num}]</span>
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-[var(--border)] bg-[var(--surface)] p-2.5 font-mono text-xs text-[var(--fg)]"
              >
                <span>GITHUB REPOSITORY PROFILE</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent)]" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-[var(--border)] bg-[var(--surface)] p-2.5 font-mono text-xs text-[var(--fg)]"
              >
                <span>LINKEDIN IDENTITY</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent)]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
