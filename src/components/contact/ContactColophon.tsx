"use client";

import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Terminal,
  ArrowUp,
  MapPin,
  Clock,
  Mail,
  Sparkles,
  FileText,
} from "lucide-react";
import { profile } from "@/data/profile";
import { ConversationalInquiryForm } from "./ConversationalInquiryForm";
import { ScrollVelocity } from "@/components/ui/ScrollVelocity";
import { ElasticDivider } from "@/components/ui/ElasticDivider";
import { useTheme } from "@/context/ThemeContext";

export function ContactColophon() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      aria-label="Contact and Channels"
      className="relative w-full bg-[var(--bg)] overflow-hidden min-h-[100dvh] flex flex-col justify-between pb-5 sm:pb-6 transition-colors duration-300"
    >
      {/* Elastic Silk Arch Boundary */}
      <ElasticDivider fill="var(--bg)" className="relative z-20" />

      {/* Studio Ghibli Animated Rain Puddle Backdrop (Strictly Light Mode) */}
      {isLight && (
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-bottom opacity-20 mix-blend-multiply contrast-[1.12] brightness-[1.02]"
            style={{
              backgroundImage: `url('/images/ghibli-rain-puddle-ripples.gif')`,
              imageRendering: "-webkit-optimize-contrast",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-[var(--bg)] opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)]/80 via-transparent to-[var(--bg)]/80" />
        </div>
      )}

      {/* Subtle Giant Velocity Wordmark Marquee Behind Footer Content */}
      <div
        className="pointer-events-none select-none absolute inset-x-0 bottom-12 z-0 opacity-[0.07]"
        aria-hidden="true"
      >
        <ScrollVelocity
          texts={["YASHVARDHAN BORUDE  ·  OPEN FOR INTERNSHIPS  ·  SAY HELLO  · "]}
          velocity={36}
          skewWithVelocity={4}
          numCopies={4}
          className="font-display font-black text-[9vw] tracking-tight uppercase text-[var(--fg)] leading-none"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12 flex flex-col justify-between flex-grow pt-6 sm:pt-10">
        {/* Main Centerpiece: Tactile Postcard Inquiry */}
        <div className="my-auto py-4 sm:py-6">
          <ConversationalInquiryForm />
        </div>

        {/* Bottom Section: Availability Status & Unified HR/Social Links */}
        <div className="mt-4 sm:mt-6 space-y-3">
          <div className="max-w-5xl mx-auto pb-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[var(--fg-muted)] border-b border-[var(--border)]/70">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-[var(--fg)]">
                Open to Software Engineering &amp; AI-ML Internships
              </span>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-[var(--accent)]" />
                <span className="text-[var(--fg)] tabular-nums">
                  {currentTime || "Live IST"}
                </span>
                <span>IST</span>
              </div>

              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-[var(--accent)]" />
                <span>Pune, India</span>
              </div>
            </div>
          </div>

          {/* Complete Footer Channels Row (All Fixed & Verified Links) */}
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-2.5 font-mono text-[10.5px] sm:text-[11px] text-[var(--fg-muted)]">
            <p className="order-2 lg:order-1 text-[var(--fg)] font-medium whitespace-nowrap">
              &copy; {new Date().getFullYear()} Yashvardhan Borude
            </p>

            <nav
              aria-label="Footer Channels"
              className="order-1 lg:order-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 whitespace-nowrap"
            >
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-resume-modal"));
                  }
                }}
                className="group flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors cursor-pointer"
              >
                <FileText className="h-3 w-3 text-[var(--accent)]" />
                <span>Resume</span>
              </button>

              <span className="text-[var(--border)]" aria-hidden="true">•</span>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors"
              >
                <Linkedin className="h-3 w-3 text-[var(--accent)]" />
                <span>LinkedIn</span>
              </a>

              <span className="text-[var(--border)]" aria-hidden="true">•</span>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors"
              >
                <Github className="h-3 w-3 text-[var(--accent)]" />
                <span>GitHub</span>
              </a>

              <span className="text-[var(--border)]" aria-hidden="true">•</span>

              <a
                href={profile.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors"
              >
                <Terminal className="h-3 w-3 text-[#FFA116]" />
                <span>LeetCode</span>
              </a>

              <span className="text-[var(--border)]" aria-hidden="true">•</span>

              <a
                href={profile.codeforces}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors"
              >
                <Terminal className="h-3 w-3 text-[var(--accent)]" />
                <span>Codeforces</span>
              </a>

              <span className="text-[var(--border)]" aria-hidden="true">•</span>

              <a
                href={profile.codechef}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors"
              >
                <span>CodeChef</span>
              </a>

              <span className="text-[var(--border)]" aria-hidden="true">•</span>

              <a
                href={profile.hackerrank}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors"
              >
                <span>HackerRank</span>
              </a>

              <span className="text-[var(--border)]" aria-hidden="true">•</span>

              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors"
              >
                <Mail className="h-3 w-3 text-[var(--accent)]" />
                <span>Email</span>
              </a>

              <span className="text-[var(--border)]" aria-hidden="true">•</span>

              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("replay-preloader"));
                  }
                }}
                className="group flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors cursor-pointer"
                aria-label="Replay Intro Sequence (Shortcut: Shift + I)"
              >
                <Sparkles className="h-3 w-3 text-[var(--accent)] transition-transform group-hover:rotate-12" />
                <span>Replay Intro</span>
                <kbd className="hidden sm:inline-block text-[9px] px-1 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--fg-muted)] font-mono">
                  ⇧I
                </kbd>
              </button>

              <span className="text-[var(--border)]" aria-hidden="true">•</span>

              <button
                type="button"
                onClick={scrollToTop}
                className="group flex items-center gap-1 hover:text-[var(--fg)] transition-colors cursor-pointer"
                aria-label="Scroll to top of page"
              >
                <span>Back to Top</span>
                <ArrowUp className="h-3 w-3 text-[var(--accent)] transition-transform group-hover:-translate-y-0.5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ContactColophon;
