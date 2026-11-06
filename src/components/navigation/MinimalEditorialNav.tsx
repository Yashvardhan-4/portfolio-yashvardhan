"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatedSVGUnderline } from "@/components/ui/AnimatedSVGUnderline";
import { useTheme } from "@/context/ThemeContext";

export function MinimalEditorialNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const accentColor = theme === "light" ? "#47785E" : "#A855F7";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)] shadow-[0_4px_30px_rgba(0,0,0,0.08)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Clean, Small Cool Typography for Name */}
        <a
          href="#"
          className="group flex flex-col focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] rounded py-1"
          aria-label="Yashvardhan Borude - Home"
        >
          <span className="font-display text-sm sm:text-base font-semibold tracking-[-0.02em] text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
            Yashvardhan Borude
          </span>
          <span className="font-mono text-[10px] text-[var(--fg-subtle)] tracking-wider uppercase">
            Software &amp; Systems
          </span>
        </a>

        {/* Center / Desktop Links with Animated SVG Underlines */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-[var(--fg-muted)]"
        >
          <a
            href="#work"
            className="hover:text-[var(--fg)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
          >
            <AnimatedSVGUnderline strokeColor={accentColor}>Work</AnimatedSVGUnderline>
          </a>
          <a
            href="#about"
            className="hover:text-[var(--fg)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
          >
            <AnimatedSVGUnderline strokeColor={accentColor}>Education</AnimatedSVGUnderline>
          </a>
          <a
            href="#contact"
            className="hover:text-[var(--fg)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
          >
            <AnimatedSVGUnderline strokeColor={accentColor}>Contact</AnimatedSVGUnderline>
          </a>
        </nav>

        {/* Right: Theme Switcher & Direct Let's Talk CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Tactile Ghibli Petrichor Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono font-medium transition-all duration-300 active:scale-95 ${
              theme === "light"
                ? "border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] hover:border-[var(--accent)] shadow-sm"
                : "border-[#1E2430] bg-[#0E1015]/80 text-[#8E95A5] hover:border-[#A855F7] hover:text-[#EDEDEF]"
            }`}
            aria-label={`Switch to ${theme === "dark" ? "Petrichor Light Mode" : "Obsidian Dark Mode"}`}
          >
            <span className="text-xs transition-transform duration-300 group-hover:rotate-12">
              {theme === "light" ? "🌿" : "✦"}
            </span>
            <span className="tracking-wider text-[11px]">
              {theme === "light" ? "Petrichor" : "Obsidian"}
            </span>
          </button>

          <a
            href="#contact"
            className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono font-medium tracking-wider transition-all duration-300 active:scale-[0.98] ${
              theme === "light"
                ? "border-[var(--border)] bg-[var(--surface-card)] text-[var(--fg)] hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] shadow-sm"
                : "border-[#1E2430] bg-[#0E1015]/80 text-[#EDEDEF] hover:border-[#A855F7]/80 hover:bg-[#A855F7]/10 shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
            }`}
            aria-label="Navigate to contact section"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-nature)] animate-pulse" aria-hidden="true" />
            <span>LET&apos;S TALK</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Controls: Theme Toggle & Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className={`flex h-10 px-3 items-center gap-1.5 rounded-xl border text-xs font-mono font-medium transition-all ${
              theme === "light"
                ? "border-[var(--border)] bg-[var(--surface)] text-[var(--fg)]"
                : "border-[#1E2430] bg-[#0E1015] text-[#EDEDEF]"
            }`}
            aria-label="Toggle theme"
          >
            <span>{theme === "light" ? "🌿" : "✦"}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
              theme === "light"
                ? "border-[#D2DBC9] bg-[#FFFFFF] text-[#17231C]"
                : "border-[#1E2430] bg-[#0E1015] text-[#EDEDEF]"
            }`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--bg)]/98 px-5 py-6 backdrop-blur-2xl">
          <div className="flex flex-col gap-4 font-mono text-sm">
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[var(--fg-muted)] hover:text-[var(--fg)] py-1 flex items-center justify-between"
            >
              <span>Work</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[var(--fg-subtle)]" />
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[var(--fg-muted)] hover:text-[var(--fg)] py-1 flex items-center justify-between"
            >
              <span>Education</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[var(--fg-subtle)]" />
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[var(--fg-muted)] hover:text-[var(--fg)] py-1 flex items-center justify-between"
            >
              <span>Contact</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[var(--fg-subtle)]" />
            </a>
            <a
              href="mailto:yashvardhanborude7@gmail.com"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--fg)] text-[var(--bg)] text-xs font-semibold"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default MinimalEditorialNav;
