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
} from "lucide-react";
import { ConversationalInquiryForm } from "./ConversationalInquiryForm";
import { useTheme } from "@/context/ThemeContext";

export function ContactColophon() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [currentTime, setCurrentTime] = useState("");

  const email = "yashvardhanborude7@gmail.com";

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
      className="relative w-full border-t border-[var(--border)] bg-[var(--bg)] overflow-hidden min-h-[100dvh] md:h-[100dvh] flex flex-col justify-between pt-16 sm:pt-20 pb-3 sm:pb-4 transition-colors duration-300"
    >
      {/* Studio Ghibli Twilight Rain Reflection Ambient Layer (Strictly Light Mode Only) */}
      {isLight && (
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none transition-opacity duration-700"
          aria-hidden="true"
        >
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[900px] h-[340px] bg-no-repeat bg-contain opacity-[0.08] mix-blend-multiply blur-[0.5px]"
            style={{ backgroundImage: `url('/images/ghibli-rain-puddle-ripples.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-[var(--bg)]" />
        </div>
      )}

      {/* Background Architectural Name Wordmark Behind Footer Content */}
      <div
        className="pointer-events-none select-none absolute inset-x-0 bottom-1 flex justify-center items-end overflow-hidden z-0 opacity-[0.028] sm:opacity-[0.038]"
        aria-hidden="true"
      >
        <span className="font-display font-black text-[12vw] sm:text-[10vw] tracking-tight uppercase whitespace-nowrap text-[var(--fg)] leading-none">
          YASHVARDHAN
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12 flex flex-col justify-between flex-grow">
        
        {/* Main Centerpiece: Fathom-Inspired Human Contact Card */}
        <div className="my-auto py-2 sm:py-4">
          <ConversationalInquiryForm />
        </div>

        {/* Bottom Section: Availability Telemetry & All Links in Single Line */}
        <div className="mt-3 sm:mt-4 space-y-2.5">
          {/* Availability Status & Location Telemetry Bar */}
          <div className="max-w-5xl mx-auto pb-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[var(--fg-muted)] border-b border-[var(--border)]/70">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-[var(--fg)]">Open to Software Engineering Roles &amp; Select Projects</span>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-[var(--accent)]" />
                <span className="text-[var(--fg)] tabular-nums">{currentTime || "Live IST"}</span>
                <span>IST</span>
              </div>

              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-[var(--accent)]" />
                <span>Pune, India</span>
              </div>
            </div>
          </div>

          {/* All Links in Bottom of Footer in One Single Clean Line */}
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[11px] text-[var(--fg-muted)]">
            <p className="order-2 md:order-1 text-[var(--fg-muted)] whitespace-nowrap">
              &copy; {new Date().getFullYear()} Yashvardhan Borude
            </p>

            <nav
              aria-label="Footer Channels"
              className="order-1 md:order-2 flex flex-wrap items-center justify-center gap-3 sm:gap-5"
            >
              <a
                href="https://github.com/Yashvardhan-4"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors focus-visible:outline-none focus-visible:text-[var(--accent)]"
              >
                <Github className="h-3 w-3 text-[var(--accent)] transition-transform group-hover:scale-110" />
                <span>GitHub</span>
              </a>

              <span className="text-[var(--border)]" aria-hidden="true">•</span>

              <a
                href="https://linkedin.com/in/yashvardhan-borude-8640a6319"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors focus-visible:outline-none focus-visible:text-[var(--accent)]"
              >
                <Linkedin className="h-3 w-3 text-[var(--accent)] transition-transform group-hover:scale-110" />
                <span>LinkedIn</span>
              </a>

              <span className="text-[var(--border)]" aria-hidden="true">•</span>

              <a
                href="https://leetcode.com/u/yashvardhan_4/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors focus-visible:outline-none focus-visible:text-[#FFA116]"
              >
                <Terminal className="h-3 w-3 text-[#FFA116] transition-transform group-hover:scale-110" />
                <span>LeetCode</span>
              </a>

              <span className="text-[var(--border)]" aria-hidden="true">•</span>

              <a
                href="https://codeforces.com/profile/yashvardhanborude7"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors focus-visible:outline-none focus-visible:text-[var(--accent)]"
              >
                <Terminal className="h-3 w-3 text-[var(--accent)] transition-transform group-hover:scale-110" />
                <span>Codeforces</span>
              </a>

              <span className="text-[var(--border)]" aria-hidden="true">•</span>

              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors focus-visible:outline-none focus-visible:text-[var(--accent)]"
              >
                <Mail className="h-3 w-3 text-[var(--accent)] transition-transform group-hover:scale-110" />
                <span>Email</span>
              </a>

              <span className="text-[var(--border)]" aria-hidden="true">•</span>

              <button
                type="button"
                onClick={scrollToTop}
                className="group flex items-center gap-1 hover:text-[var(--fg)] transition-colors focus-visible:outline-none focus-visible:text-[var(--accent)]"
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
