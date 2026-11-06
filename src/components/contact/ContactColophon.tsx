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

export function ContactColophon() {
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
      className="relative w-full border-t border-[#1E2430] bg-[#060709] overflow-hidden scroll-mt-20 pt-20 sm:pt-28 pb-8 sm:pb-10"
    >
      {/* Colossal Monumental Name in the Background */}
      <div
        className="pointer-events-none select-none absolute inset-x-0 bottom-8 sm:bottom-6 flex justify-center items-end overflow-hidden z-0 opacity-[0.035] sm:opacity-[0.045]"
        aria-hidden="true"
      >
        <span className="font-display font-black text-[14vw] tracking-tighter uppercase whitespace-nowrap text-[#EDEDEF] leading-none">
          YASHVARDHAN BORUDE
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#A855F7] font-semibold block">
            Initiate Contact
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#EDEDEF] tracking-tight leading-[1.04]">
            Start a project or talk about a role.
          </h2>

          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#8E95A5] max-w-xl mx-auto">
            Whether you want to build an application, accelerate an engineering team, or discuss a full-time role, let&apos;s start the conversation.
          </p>
        </div>

        {/* Single Unified Conversational Inquiry Form */}
        <div className="mb-14 sm:mb-16">
          <ConversationalInquiryForm />
        </div>

        {/* Live Status & Telemetry Strip */}
        <div className="max-w-4xl mx-auto pb-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8E95A5] border-b border-[#1E2430]/70">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[#EDEDEF]">Open to Software Engineering Roles &amp; Select Projects</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#A855F7]" />
              <span className="text-[#EDEDEF] tabular-nums">{currentTime || "Live IST"}</span>
              <span>IST</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#A855F7]" />
              <span>Pune, India</span>
            </div>
          </div>
        </div>

        {/* All Links in Bottom of Footer in One Single Unified Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 font-mono text-[11px] sm:text-xs text-[#8E95A5]">
          <p className="text-[#8E95A5] tracking-tight whitespace-nowrap">
            &copy; {new Date().getFullYear()} Yashvardhan Borude
          </p>

          <nav
            aria-label="Footer Channels"
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-5"
          >
            <a
              href="https://github.com/Yashvardhan-4"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 hover:text-[#EDEDEF] transition-colors focus-visible:outline-none focus-visible:text-[#C084FC]"
            >
              <Github className="h-3 w-3 text-[#C084FC] transition-transform group-hover:scale-110" />
              <span>GitHub</span>
            </a>

            <span className="text-[#2C3545]" aria-hidden="true">•</span>

            <a
              href="https://linkedin.com/in/yashvardhan-borude-8640a6319"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 hover:text-[#EDEDEF] transition-colors focus-visible:outline-none focus-visible:text-[#38BDF8]"
            >
              <Linkedin className="h-3 w-3 text-[#38BDF8] transition-transform group-hover:scale-110" />
              <span>LinkedIn</span>
            </a>

            <span className="text-[#2C3545]" aria-hidden="true">•</span>

            <a
              href="https://leetcode.com/u/yashvardhan_4/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 hover:text-[#EDEDEF] transition-colors focus-visible:outline-none focus-visible:text-[#FFA116]"
            >
              <Terminal className="h-3 w-3 text-[#FFA116] transition-transform group-hover:scale-110" />
              <span>LeetCode</span>
            </a>

            <span className="text-[#2C3545]" aria-hidden="true">•</span>

            <a
              href="https://codeforces.com/profile/yashvardhanborude7"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 hover:text-[#EDEDEF] transition-colors focus-visible:outline-none focus-visible:text-[#38BDF8]"
            >
              <Terminal className="h-3 w-3 text-[#38BDF8] transition-transform group-hover:scale-110" />
              <span>Codeforces</span>
            </a>

            <span className="text-[#2C3545]" aria-hidden="true">•</span>

            <a
              href={`mailto:${email}`}
              className="group flex items-center gap-1.5 hover:text-[#EDEDEF] transition-colors focus-visible:outline-none focus-visible:text-[#A855F7]"
            >
              <Mail className="h-3 w-3 text-[#A855F7] transition-transform group-hover:scale-110" />
              <span>Email</span>
            </a>

            <span className="text-[#2C3545]" aria-hidden="true">•</span>

            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-1 hover:text-[#EDEDEF] transition-colors focus-visible:outline-none focus-visible:text-[#A855F7]"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3 w-3 text-[#A855F7] transition-transform group-hover:-translate-y-0.5" />
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default ContactColophon;
