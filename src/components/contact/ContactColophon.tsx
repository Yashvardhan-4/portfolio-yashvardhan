"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  Terminal,
  Check,
  Copy,
  ArrowUp,
  Sparkles,
  MapPin,
  Clock,
  Send,
} from "lucide-react";
import { SpiralFunnel } from "@/components/ui/SpiralFunnel";

export function ContactColophon() {
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const command = "npx yashvardhan";
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

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      aria-label="Contact and Channels"
      className="relative w-full border-t border-[#1E2430] bg-[#08090C] overflow-hidden scroll-mt-24 pt-16 sm:pt-24 pb-12 sm:pb-16"
    >
      {/* Living 3D Spiral Funnel Portal Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 z-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <SpiralFunnel
          lineCount={90}
          particleCount={200}
          height={5.0}
          speed={0.85}
          color="#A855F7"
          accentColor="#E879F9"
          floorColor="#6B21A8"
          opacity={0.8}
          interactive={true}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        {/* Header Invitation */}
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-[#A855F7] font-semibold">
            Let&apos;s Talk
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#EDEDEF]">
            Let&apos;s build something great together.
          </h2>
          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            Available for full-time software engineering roles, interesting projects, and collaborative teams. My inbox is always open.
          </p>
        </div>

        {/* Direct Contact Console */}
        <div className="my-10 max-w-2xl mx-auto rounded-2xl border border-[#A855F7]/35 bg-[#0E1015]/90 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.18)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-[#1E2430] pb-6">
            <div className="space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#94A3B8]">
                Direct Email
              </span>
              <p className="font-mono text-base sm:text-lg text-[#EDEDEF] font-semibold break-all">
                {email}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EDEDEF] text-[#08090B] font-sans text-xs font-semibold hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
              >
                <Send className="h-3.5 w-3.5 text-[#08090B]" />
                <span>Send Email</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#1E2430] bg-[#08090C] font-mono text-xs text-[#EDEDEF] hover:border-[#A855F7] hover:text-[#C084FC] transition-all"
                aria-label="Copy email address"
              >
                {emailCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#38BDF8]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-[#94A3B8]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Datum Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[#EDEDEF]">Open to Opportunities</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span>⚡</span>
              <span>Usually responds within 24 hours</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#A855F7]" />
              <span>Pune, India</span>
            </div>
          </div>
        </div>

        {/* Channels Grid & Interactive CLI */}
        <div className="max-w-3xl mx-auto pt-2 pb-8 border-b border-[#1E2430]/70 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="https://github.com/Yashvardhan-4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#1E2430] bg-[#0E1015]/80 font-mono text-xs text-[#94A3B8] hover:text-[#EDEDEF] hover:border-[#A855F7]/50 transition-all"
          >
            <Github className="h-4 w-4 text-[#C084FC]" />
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/yashvardhan-borude-8640a6319"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#1E2430] bg-[#0E1015]/80 font-mono text-xs text-[#94A3B8] hover:text-[#EDEDEF] hover:border-[#38BDF8]/50 transition-all"
          >
            <Linkedin className="h-4 w-4 text-[#38BDF8]" />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://leetcode.com/u/yashvardhan_4/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#1E2430] bg-[#0E1015]/80 font-mono text-xs text-[#94A3B8] hover:text-[#EDEDEF] hover:border-[#FFA116]/50 transition-all"
          >
            <Terminal className="h-4 w-4 text-[#FFA116]" />
            <span>LeetCode (315+)</span>
          </a>

          <a
            href="https://codeforces.com/profile/yashvardhanborude7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#1E2430] bg-[#0E1015]/80 font-mono text-xs text-[#94A3B8] hover:text-[#EDEDEF] hover:border-[#38BDF8]/50 transition-all"
          >
            <Terminal className="h-4 w-4 text-[#38BDF8]" />
            <span>Codeforces (Pupil)</span>
          </a>

          <button
            type="button"
            onClick={handleCopyCommand}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#1E2430] bg-[#0E1015]/80 font-mono text-xs text-[#94A3B8] hover:border-[#A855F7] hover:text-[#EDEDEF] transition-all"
            aria-label="Copy CLI command"
          >
            <Terminal className="h-4 w-4 text-[#A855F7]" />
            <span>{command}</span>
            {copied ? (
              <Check className="h-3 w-3 text-[#38BDF8]" />
            ) : (
              <Copy className="h-3 w-3 text-[#94A3B8]" />
            )}
          </button>
        </div>

        {/* Distinctive Editorial Finish & Sign-Off */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2.5">
            <span className="font-serif italic text-base text-[#EDEDEF]">YB</span>
            <span className="text-[#1E2430]">&bull;</span>
            <p>
              &copy; {new Date().getFullYear()} Yashvardhan Borude. Built with Next.js &amp; WebGL.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {currentTime && (
              <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
                <Clock className="h-3.5 w-3.5 text-[#A855F7]" />
                <span className="text-[#EDEDEF]">{currentTime}</span>
                <span>IST (UTC+5:30)</span>
              </div>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#1E2430] bg-[#0E1015] text-[#94A3B8] hover:text-[#EDEDEF] hover:border-[#A855F7] transition-all"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 text-[#A855F7]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ContactColophon;
