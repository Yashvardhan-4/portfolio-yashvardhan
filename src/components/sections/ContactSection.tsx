"use client";

import React, { useState } from "react";
import { profile } from "@/data/profile";
import { SectionCrosshairHeader } from "@/components/ui/GridHairline";
import { Mail, Phone, MapPin, Copy, Check, ArrowUpRight, Github, Linkedin, Code2 } from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="border-b border-[var(--border)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 12-Column Header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-start mb-12">
          <div className="lg:col-span-4">
            <SectionCrosshairHeader
              index="08"
              tag="INITIALIZE PROTOCOL"
              title="Direct Contact & Engineering Channels."
            />
          </div>

          <div className="lg:col-span-1 hidden lg:block" />

          <div className="lg:col-span-7 flex flex-col justify-between">
            <p className="max-w-prose text-base leading-[1.65] text-[var(--fg-muted)]">
              Currently available for software engineering internships, junior developer roles, high-impact freelance
              contracts, and competitive programming collaborations. Reach out directly via authenticated channels.
            </p>
          </div>
        </div>

        {/* Exposed Hairline Contact Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
          {/* Email Channel */}
          <div className="bg-[var(--bg)] p-6 sm:p-8 flex flex-col justify-between hover:bg-[var(--surface)] transition-colors">
            <div>
              <div className="flex items-center justify-between font-mono text-[11px] text-[var(--fg-muted)] mb-3">
                <span className="text-[var(--accent)]">[PRIMARY COMM]</span>
                <Mail className="h-4 w-4 text-[var(--accent)]" />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)]">
                Email Dispatch
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-[var(--fg)] mt-1 break-all">
                {profile.email}
              </h3>
              <p className="text-xs text-[var(--fg-muted)] mt-2">
                Fastest response for engineering queries, hiring evaluations, and code reviews.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 border border-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1.5 font-mono text-xs text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#08090a] transition-all"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}</span>
              </button>

              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1 border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-mono text-xs text-[var(--fg)] hover:border-[var(--accent)]"
              >
                <span>OPEN MAIL CLIENT</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent)]" />
              </a>
            </div>
          </div>

          {/* Direct Telephony & Location */}
          <div className="bg-[var(--bg)] p-6 sm:p-8 flex flex-col justify-between hover:bg-[var(--surface)] transition-colors">
            <div>
              <div className="flex items-center justify-between font-mono text-[11px] text-[var(--fg-muted)] mb-3">
                <span className="text-[var(--accent)]">[TELEPHONY]</span>
                <Phone className="h-4 w-4 text-[var(--accent)]" />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)]">
                Direct Line
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-[var(--fg)] mt-1">
                {profile.phone}
              </h3>
              <div className="mt-3 flex items-center gap-2 font-mono text-xs text-[var(--fg-muted)]">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>{profile.location} (IST / UTC+5:30)</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)]">
              <a
                href={`tel:${profile.phone.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-1.5 border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-mono text-xs text-[var(--fg)] hover:border-[var(--accent)]"
              >
                <span>VOICE CALL / WHATSAPP</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent)]" />
              </a>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="bg-[var(--bg)] p-6 sm:p-8 flex flex-col justify-between md:col-span-2 lg:col-span-1 hover:bg-[var(--surface)] transition-colors">
            <div>
              <div className="flex items-center justify-between font-mono text-[11px] text-[var(--fg-muted)] mb-3">
                <span className="text-[var(--accent)]">[PUBLIC REPOSITORIES]</span>
                <Github className="h-4 w-4 text-[var(--accent)]" />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)]">
                Identity Indexes
              </span>
              <h3 className="font-display text-xl font-semibold text-[var(--fg)] mt-1">
                Verified Handles
              </h3>

              <div className="mt-4 flex flex-col gap-2 font-mono text-xs">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5 text-[var(--fg)] hover:text-[var(--accent)]"
                >
                  <span className="flex items-center gap-2">
                    <Github className="h-3.5 w-3.5" />
                    <span>GitHub: Yashvardhan-4</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5 text-[var(--fg)] hover:text-[var(--accent)]"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="h-3.5 w-3.5" />
                    <span>LinkedIn: yashvardhan-borude</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>

                <a
                  href={profile.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5 text-[var(--fg)] hover:text-[var(--accent)]"
                >
                  <span className="flex items-center gap-2">
                    <Code2 className="h-3.5 w-3.5" />
                    <span>LeetCode: yashvardhan_4</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)] font-mono text-[10px] text-[var(--fg-muted)] flex items-center justify-between">
              <span>SECURITY: ZERO TRACKERS</span>
              <span className="text-[var(--accent)]">&check; AUTHENTICATED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
