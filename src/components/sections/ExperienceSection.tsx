"use client";

import React from "react";
import { profile } from "@/data/profile";
import { SectionCrosshairHeader } from "@/components/ui/GridHairline";
import { Briefcase, Calendar, MapPin, CheckCircle, Award } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="trajectory" className="border-b border-[var(--border)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 12-Column Header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-start mb-12">
          <div className="lg:col-span-4">
            <SectionCrosshairHeader
              index="05"
              tag="CAREER TRAJECTORY"
              title="Production Contracts & Engineering Sprints."
            />
          </div>

          <div className="lg:col-span-1 hidden lg:block" />

          <div className="lg:col-span-7 flex flex-col justify-between">
            <p className="max-w-prose text-base leading-[1.65] text-[var(--fg-muted)]">
              Documented production software delivery with real client transactions, alongside rapid-cadence hackathon
              sprints. Every milestone is supported by architectural verification and demonstrable outcomes.
            </p>
          </div>
        </div>

        {/* Exposed Hairline Timeline Ledger */}
        <div className="border border-[var(--border)] bg-[var(--border)] gap-px flex flex-col">
          {profile.experience.map((exp, idx) => (
            <div
              key={exp.company}
              className="bg-[var(--bg)] p-6 sm:p-8 flex flex-col gap-6 lg:flex-row lg:gap-10 hover:bg-[var(--surface)] transition-colors"
            >
              {/* Left Column: Role, Entity, Timeline */}
              <div className="lg:w-1/3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--accent)] mb-2">
                    <span>[RECORD-0{idx + 1}]</span>
                    <span className="border border-[var(--border)] bg-[var(--surface-raised)] px-2 py-0.5 text-[var(--fg)]">
                      {exp.type}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[var(--fg)]">
                    {exp.company}
                  </h3>

                  <div className="mt-1 font-mono text-sm text-[var(--accent)] font-medium">
                    {exp.role}
                  </div>

                  <div className="mt-4 flex flex-col gap-1.5 font-mono text-xs text-[var(--fg-muted)]">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-[var(--fg-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Detailed Engineering Highlights */}
              <div className="lg:w-2/3 flex flex-col justify-between border-t border-[var(--border)] pt-6 lg:border-t-0 lg:border-l lg:border-[var(--border)] lg:pl-10 lg:pt-0">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)] block mb-4">
                    Architectural Contributions & Deliverables
                  </span>
                  <ul className="flex flex-col gap-3.5">
                    {exp.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--fg-muted)]">
                        <CheckCircle className="h-4 w-4 text-[var(--accent)] mt-1 shrink-0" />
                        <span className="text-[var(--fg)]/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-[11px] text-[var(--fg-muted)]">
                  <span>OUTCOME STATUS: DEPLOYED & TESTED</span>
                  <span className="text-[var(--accent)]">&check; 100% VERIFIED</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
