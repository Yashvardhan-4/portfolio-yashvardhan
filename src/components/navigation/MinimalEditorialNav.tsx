"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatedSVGUnderline } from "@/components/ui/AnimatedSVGUnderline";

export function MinimalEditorialNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08090C]/90 backdrop-blur-xl border-b border-[#1E2430]/80 shadow-[0_4px_30px_rgba(0,0,0,0.7)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Clean, Small Cool Typography for Name (No YB Badge) */}
        <a
          href="#"
          className="group flex flex-col focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A855F7] rounded py-1"
          aria-label="Yashvardhan Borude - Home"
        >
          <span className="font-display text-sm sm:text-base font-semibold tracking-[-0.02em] text-[#EDEDEF] group-hover:text-white transition-colors">
            Yashvardhan Borude
          </span>
          <span className="font-mono text-[10px] text-[#64748B] tracking-wider uppercase">
            Software &amp; Systems
          </span>
        </a>

        {/* Center / Desktop Links with Animated SVG Underlines */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-[#8E95A5]"
        >
          <a
            href="#work"
            className="text-[#8E95A5] hover:text-[#EDEDEF] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A855F7]"
          >
            <AnimatedSVGUnderline strokeColor="#A855F7">Work</AnimatedSVGUnderline>
          </a>
          <a
            href="#about"
            className="text-[#8E95A5] hover:text-[#EDEDEF] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A855F7]"
          >
            <AnimatedSVGUnderline strokeColor="#A855F7">Education</AnimatedSVGUnderline>
          </a>
          <a
            href="#contact"
            className="text-[#8E95A5] hover:text-[#EDEDEF] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A855F7]"
          >
            <AnimatedSVGUnderline strokeColor="#A855F7">Contact</AnimatedSVGUnderline>
          </a>
        </nav>

        {/* Right: Direct Let's Talk CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1E2430] bg-[#0E1015]/80 hover:border-[#A855F7]/80 hover:bg-[#A855F7]/10 text-xs font-mono font-medium tracking-wider text-[#EDEDEF] transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.5)] active:scale-[0.98]"
            aria-label="Navigate to contact section"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" aria-hidden="true" />
            <span>LET&apos;S TALK</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#8E95A5] group-hover:text-[#C084FC] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-[#1E2430] bg-[#0E1015] text-[#EDEDEF] hover:border-[#A855F7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A855F7]"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1E2430] bg-[#08090C]/98 px-5 py-6 backdrop-blur-2xl">
          <div className="flex flex-col gap-4 font-mono text-sm">
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#8E95A5] hover:text-white py-1 flex items-center justify-between"
            >
              <span>Work</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#64748B]" />
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#8E95A5] hover:text-white py-1 flex items-center justify-between"
            >
              <span>Education</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#64748B]" />
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#8E95A5] hover:text-white py-1 flex items-center justify-between"
            >
              <span>Contact</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#64748B]" />
            </a>
            <a
              href="mailto:yashvardhanborude7@gmail.com"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#EDEDEF] text-[#08090C] text-xs font-semibold"
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
