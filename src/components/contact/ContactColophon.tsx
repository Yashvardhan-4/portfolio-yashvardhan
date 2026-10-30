"use client";

import React, { useState } from "react";
import { ArrowUpRight, Mail, Github, Linkedin, Terminal, Check, Copy } from "lucide-react";
import { SpiralFunnel } from "@/components/ui/SpiralFunnel";
import { DodgeField } from "@/components/ui/DodgeField";

export function ContactColophon() {
  const [copied, setCopied] = useState(false);
  const command = "npx yashvardhan";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <footer
      id="contact"
      aria-label="Contact and Channels"
      className="relative w-full border-t border-[#1E2430] bg-[#08090C] overflow-hidden scroll-mt-24"
    >
      {/* Living 3D Spiral Funnel Portal Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0 flex items-center justify-center" aria-hidden="true">
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

      {/* Foreground Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-[#A855F7] font-semibold">
            Initiate Contact
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#EDEDEF]">
            Let&apos;s build something exceptional together.
          </h2>
          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            Available for full-time software engineering roles, high-throughput systems projects, and full-stack web platforms. My inbox is always open.
          </p>
        </div>

        {/* DodgeField Interactive Centerpiece */}
        <div className="my-10 max-w-xl mx-auto">
          <DodgeField
            taunts={[
              "Catch me",
              "Too slow!",
              "Almost got it",
              "Relenting...",
              "Okay, let's talk!",
            ]}
            onCatch={() => {
              window.location.href = "mailto:yashvardhanborude7@gmail.com";
            }}
            fieldHeight={180}
            reach={80}
            radius={130}
            notice="Hover or click to catch the direct contact pill"
          >
            <a
              href="mailto:yashvardhanborude7@gmail.com"
              className="dodge-field__pill flex items-center gap-2.5 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
            >
              <Mail className="h-4 w-4 text-[#A855F7]" />
              <span className="font-mono text-sm text-[#EDEDEF]">
                yashvardhanborude7@gmail.com
              </span>
              <ArrowUpRight className="h-4 w-4 text-[#C084FC]" />
            </a>
          </DodgeField>
        </div>

        {/* Minimalist Verified Channels & Command Copier */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 pt-4 border-t border-[#1E2430]/80">
          <a
            href="https://github.com/Yashvardhan-4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-[#94A3B8] hover:text-[#EDEDEF] transition-colors"
          >
            <Github className="h-4 w-4 text-[#C084FC]" />
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/yashvardhan-borude-8640a6319"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-[#94A3B8] hover:text-[#EDEDEF] transition-colors"
          >
            <Linkedin className="h-4 w-4 text-[#C084FC]" />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://leetcode.com/u/yashvardhan_4/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-[#94A3B8] hover:text-[#EDEDEF] transition-colors"
          >
            <Terminal className="h-4 w-4 text-[#C084FC]" />
            <span>LeetCode (315+)</span>
          </a>

          <a
            href="https://codeforces.com/profile/yashvardhanborude7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-[#94A3B8] hover:text-[#EDEDEF] transition-colors"
          >
            <Terminal className="h-4 w-4 text-[#C084FC]" />
            <span>Codeforces (200+ / 1227)</span>
          </a>

          <a
            href="https://www.codechef.com/users/cheer_swan_02"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-[#94A3B8] hover:text-[#EDEDEF] transition-colors"
          >
            <Terminal className="h-4 w-4 text-[#C084FC]" />
            <span>CodeChef (2★ 1434)</span>
          </a>

          <a
            href="https://hackerrank.com/profile/yashvardhanboru9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-[#94A3B8] hover:text-[#EDEDEF] transition-colors"
          >
            <Terminal className="h-4 w-4 text-[#C084FC]" />
            <span>HackerRank (5★ C++)</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-full border border-[#1E2430] bg-[#0E1015] px-3 py-1 font-mono text-xs text-[#94A3B8] hover:border-[#A855F7] hover:text-[#EDEDEF] transition-all"
            aria-label="Copy CLI command"
          >
            <span>{command}</span>
            {copied ? (
              <Check className="h-3 w-3 text-[#38BDF8]" />
            ) : (
              <Copy className="h-3 w-3 text-[#94A3B8]" />
            )}
          </button>
        </div>

        {/* Clean, Non-bloated Footer */}
        <div className="mt-12 pt-6 border-t border-[#1E2430]/60 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-[#94A3B8]">
          <p>
            &copy; {new Date().getFullYear()} Yashvardhan Borude. Engineered with Next.js &amp; WebGL.
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-pulse" />
            <span>Pune, India (IST / UTC+5:30)</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default ContactColophon;
