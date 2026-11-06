"use client";

import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Terminal,
  Check,
  Copy,
  ArrowUp,
  MapPin,
  Clock,
  Send,
  Mail,
} from "lucide-react";
import { PaperCrumpleForm } from "./PaperCrumpleForm";

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
      className="relative w-full border-t border-[#1E2430] bg-[#060709] overflow-hidden scroll-mt-20 pt-20 sm:pt-28 pb-12 sm:pb-16"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        {/* Section Header: Pure Editorial Typography (No AI Slashes, No Numbers) */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#A855F7] font-semibold block">
            Get in Touch
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#EDEDEF] tracking-tight leading-[1.02]">
            Ready to build something impactful?
          </h2>

          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#8E95A5] max-w-xl mx-auto">
            Available for full-time software engineering roles, high-performance tooling, and interesting projects. My inbox is always open.
          </p>
        </div>

        {/* Tactile Paper Crumple Contact Form */}
        <div className="my-12">
          <PaperCrumpleForm />
        </div>

        {/* Quick Contact & Terminal Strip */}
        <div className="max-w-3xl mx-auto border border-[#1E2430] bg-[#0E1015] p-6 sm:p-8 shadow-2xl mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2430] pb-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#8E95A5] block">
                Direct Email
              </span>
              <p className="font-mono text-sm sm:text-base text-[#EDEDEF] font-semibold">
                {email}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EDEDEF] text-[#08090C] font-mono text-xs font-semibold hover:bg-white transition-all active:scale-[0.98]"
              >
                <Mail className="h-3.5 w-3.5 text-[#08090C]" />
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
                    <Check className="h-3.5 w-3.5 text-[#10B981]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-[#8E95A5]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Terminal Command Row */}
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2430] pb-6">
            <div className="flex items-center gap-2 font-mono text-sm text-[#EDEDEF]">
              <Terminal className="h-4 w-4 text-[#A855F7]" />
              <span>{command}</span>
            </div>

            <button
              type="button"
              onClick={handleCopyCommand}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#1E2430] bg-[#08090C] font-mono text-xs text-[#8E95A5] hover:text-[#EDEDEF] hover:border-[#A855F7] transition-all"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#10B981]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Command</span>
                </>
              )}
            </button>
          </div>

          {/* Telemetry Datum Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8E95A5]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[#EDEDEF]">Open to Software Engineering Roles</span>
            </div>

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

        {/* Social Networks Row */}
        <div className="max-w-3xl mx-auto pt-2 pb-14 border-b border-[#1E2430] flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="https://github.com/Yashvardhan-4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#1E2430] bg-[#0E1015] font-mono text-xs text-[#8E95A5] hover:text-[#EDEDEF] hover:border-[#A855F7] transition-all"
          >
            <Github className="h-4 w-4 text-[#C084FC]" />
            <span>GitHub Profile</span>
          </a>

          <a
            href="https://linkedin.com/in/yashvardhan-borude-8640a6319"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#1E2430] bg-[#0E1015] font-mono text-xs text-[#8E95A5] hover:text-[#EDEDEF] hover:border-[#38BDF8] transition-all"
          >
            <Linkedin className="h-4 w-4 text-[#38BDF8]" />
            <span>LinkedIn Profile</span>
          </a>

          <a
            href="https://leetcode.com/u/yashvardhan_4/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#1E2430] bg-[#0E1015] font-mono text-xs text-[#8E95A5] hover:text-[#EDEDEF] hover:border-[#FFA116] transition-all"
          >
            <Terminal className="h-4 w-4 text-[#FFA116]" />
            <span>LeetCode (315+ Solved)</span>
          </a>

          <a
            href="https://codeforces.com/profile/yashvardhanborude7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#1E2430] bg-[#0E1015] font-mono text-xs text-[#8E95A5] hover:text-[#EDEDEF] hover:border-[#38BDF8] transition-all"
          >
            <Terminal className="h-4 w-4 text-[#38BDF8]" />
            <span>Codeforces (Pupil)</span>
          </a>
        </div>

        {/* Monumental Name Typography across Footer */}
        <div className="pt-14 pb-8 text-center select-none overflow-hidden">
          <h2 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-9xl tracking-tight text-[#EDEDEF] uppercase opacity-95 transition-all">
            Yashvardhan Borude
          </h2>
        </div>

        {/* Distinctive Minimal Editorial Colophon & Sign-Off (No YB Logo) */}
        <div className="pt-8 border-t border-[#1E2430] flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8E95A5]">
          <p>
            &copy; {new Date().getFullYear()} Yashvardhan Borude. Built with Next.js &amp; WebGL.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1E2430] bg-[#0E1015] text-[#8E95A5] hover:text-[#EDEDEF] hover:border-[#A855F7] transition-all active:scale-[0.98]"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 text-[#A855F7]" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default ContactColophon;
