"use client";

import React from "react";
import { profile } from "@/data/profile";
import { SectionCrosshairHeader } from "@/components/ui/GridHairline";
import { GraduationCap, Award, BookOpen, Check } from "lucide-react";

export function EducationSection() {
  const { education, certifications } = profile;

  return (
    <section className="border-b border-[var(--border)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 12-Column Header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-start mb-12">
          <div className="lg:col-span-4">
            <SectionCrosshairHeader
              index="06"
              tag="ACADEMIC ACCREDITATION"
              title="Education & Formal Certifications."
            />
          </div>

          <div className="lg:col-span-1 hidden lg:block" />

          <div className="lg:col-span-7 flex flex-col justify-between">
            <p className="max-w-prose text-base leading-[1.65] text-[var(--fg-muted)]">
              Formal education provides the mathematical bedrock for systems engineering. Current academic standing
              combines a 8.86/10.0 CGPA at PCCOE Pune with an Elite+Silver credential from IIT Madras in Advanced Graph Theory.
            </p>
          </div>
        </div>

        {/* Exposed Hairline Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)]">
          {/* Institutional Degree */}
          <div className="bg-[var(--bg)] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between font-mono text-[11px] text-[var(--fg-muted)] mb-3">
                <span className="text-[var(--accent)]">[DEGREE CANDIDATE]</span>
                <span className="border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-[var(--fg)]">
                  CGPA: {education.cgpa}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <GraduationCap className="h-5 w-5 text-[var(--accent)]" />
                <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[var(--fg)]">
                  {education.institution}
                </h3>
              </div>

              <p className="mt-2 font-mono text-sm text-[var(--fg)]">
                {education.degree} in {education.specialization}
              </p>

              <div className="mt-3 flex items-center gap-4 font-mono text-xs text-[var(--fg-muted)]">
                <span>{education.standing}</span>
                <span>&bull;</span>
                <span>{education.timeline}</span>
              </div>

              {/* Coursework Specimen */}
              <div className="mt-6 border-t border-[var(--border-subtle)] pt-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)] block mb-3">
                  Core Computer Science Coursework
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                  {education.coursework.map((course) => (
                    <div key={course} className="flex items-center gap-2 text-[var(--fg-muted)]">
                      <span className="h-1 w-1 bg-[var(--accent)]" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-[10px] text-[var(--fg-muted)]">
              <span>LOCATION: PUNE, INDIA</span>
              <span className="text-[var(--accent)]">ACTIVE ENROLLMENT</span>
            </div>
          </div>

          {/* Certifications (IIT Madras) */}
          <div className="bg-[var(--bg)] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between font-mono text-[11px] text-[var(--fg-muted)] mb-3">
                <span className="text-[var(--accent)]">[PREMIER ACCREDITATION]</span>
                <span className="border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-2 py-0.5 text-[var(--accent)]">
                  ELITE + SILVER
                </span>
              </div>

              {certifications.map((cert) => (
                <div key={cert.title}>
                  <div className="flex items-center gap-2.5">
                    <Award className="h-5 w-5 text-[var(--accent)]" />
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[var(--fg)]">
                      {cert.issuer}
                    </h3>
                  </div>

                  <p className="mt-2 font-mono text-sm text-[var(--fg)]">
                    {cert.title}
                  </p>

                  <div className="mt-2 font-mono text-xs text-[var(--accent)] font-medium">
                    {cert.score}
                  </div>

                  <p className="mt-1 font-mono text-xs text-[var(--fg-muted)]">
                    Timeline: {cert.timeline}
                  </p>

                  {/* Certified Topics */}
                  <div className="mt-6 border-t border-[var(--border-subtle)] pt-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)] block mb-3">
                      Demonstrated Theoretical Mastery
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                      {cert.topics.map((topic) => (
                        <div key={topic} className="flex items-center gap-2 text-[var(--fg-muted)]">
                          <Check className="h-3.5 w-3.5 text-[var(--accent)] shrink-0" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-[10px] text-[var(--fg-muted)]">
              <span>CURRICULUM: 12-WEEK IIT ADVANCED</span>
              <span className="text-[var(--accent)]">AUTHENTICATED CREDENTIAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
