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
      className="relative w-full border-t border-[#1E2430] bg-[#060709] overflow-hidden scroll-mt-12 min-h-[100dvh] flex flex-col justify-between pt-6 sm:pt-8 pb-4 sm:pb-6"
    >
      {/* Refined Background Architectural Wordmark (Subtle Depth Behind Footer) */}
      <div
        className="pointer-events-none select-none absolute inset-x-0 bottom-2 sm:bottom-3 flex justify-center items-end overflow-hidden z-0 opacity-[0.02] sm:opacity-[0.03]"
        aria-hidden="true"
      >
        <span className="font-display font-black text-[11vw] sm:text-[9vw] tracking-tight uppercase whitespace-nowrap text-[#EDEDEF] leading-none">
          YASHVARDHAN
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12 flex flex-col justify-between flex-grow">
        {/* Compact Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-1 mb-2.5 sm:mb-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#A855F7] font-semibold block">
            Initiate Contact
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#EDEDEF] tracking-tight leading-[1.1]">
            Start a project or talk about a role.
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#8E95A5] max-w-lg mx-auto">
            Have an idea, an opportunity, or simply something worth discussing? I&apos;d like to hear about it.
          </p>
        </div>

        {/* Structured Conversational Inquiry Form Card */}
        <div className="my-auto py-1">
          <ConversationalInquiryForm />
        </div>

        {/* Bottom Section: Telemetry Bar & All Links in One Single Line */}
        <div className="mt-3 sm:mt-4 space-y-2.5">
          {/* Availability Status & Location Telemetry Bar */}
          <div className="max-w-4xl mx-auto pb-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[#8E95A5] border-b border-[#1E2430]/70">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[#EDEDEF]">Open to Software Engineering Roles &amp; Select Projects</span>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-[#A855F7]" />
                <span className="text-[#EDEDEF] tabular-nums">{currentTime || "Live IST"}</span>
                <span>IST</span>
              </div>

              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-[#A855F7]" />
                <span>Pune, India</span>
              </div>
            </div>
          </div>

          {/* All Links in Bottom of Footer in One Single Clean Line */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[11px] text-[#8E95A5]">
            <p className="order-2 md:order-1 text-[#8E95A5] whitespace-nowrap">
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
      </div>
    </footer>
  );
}

export default ContactColophon;
