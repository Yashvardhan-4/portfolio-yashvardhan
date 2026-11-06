"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Copy, RotateCcw, Mail, Sparkles, Briefcase, MessageSquare, AlertCircle } from "lucide-react";

type InquiryMode = "project" | "role" | "hello";

export function ConversationalInquiryForm() {
  const [mode, setMode] = useState<InquiryMode>("project");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");

  // Mode: Project
  const [projectCategory, setProjectCategory] = useState("Web Application");
  const [projectTimeline, setProjectTimeline] = useState("1–3 Months");
  const [projectBrief, setProjectBrief] = useState("");

  // Mode: Role
  const [roleType, setRoleType] = useState("Full-Time Role");
  const [roleSpecialty, setRoleSpecialty] = useState("Frontend & Systems");
  const [roleDetails, setRoleDetails] = useState("");

  // Mode: Hello
  const [helloMessage, setHelloMessage] = useState("");

  // Submission & Validation States
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recipientEmail = "yashvardhanborude7@gmail.com";

  const projectCategories = [
    "Web Application",
    "Full-Stack Platform",
    "Developer Tool",
    "High-Performance UI",
  ];

  const projectTimelines = [
    "Under 1 Month",
    "1–3 Months",
    "Ongoing / Flexible",
  ];

  const roleTypes = [
    "Full-Time Role",
    "Contract / Freelance",
    "Founding Engineer",
  ];

  const roleSpecialties = [
    "Frontend & Systems",
    "Full-Stack Engineering",
    "Performance & Architecture",
  ];

  const generateEmailDraft = () => {
    let subject = "";
    let body = "";

    if (mode === "project") {
      subject = `Project Inquiry: ${name || "New Client"} (${company || "Independent"})`;
      body = `Hello Yashvardhan,

My name is ${name} from ${company || "Independent"}.
I'm interested in building a ${projectCategory}.

Expected Timeline / Scope:
${projectTimeline}

Project Brief & Requirements:
${projectBrief || "Not provided in initial inquiry."}

You can reach me back at: ${email}
`;
    } else if (mode === "role") {
      subject = `Engineering Opportunity: ${roleType} at ${company || "Our Team"}`;
      body = `Hello Yashvardhan,

My name is ${name} from ${company || "Our Team"}.
We'd like to discuss an opportunity for a ${roleType} focusing on ${roleSpecialty}.

Role Details & Tech Stack:
${roleDetails || "Not provided in initial inquiry."}

You can reach me back at: ${email}
`;
    } else {
      subject = `Hello from ${name || "Visitor"}`;
      body = `Hello Yashvardhan,

My name is ${name}${company ? ` from ${company}` : ""}.

Message:
${helloMessage}

You can reach me back at: ${email}
`;
    }

    return { subject, body };
  };

  const validateForm = (): boolean => {
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address so I can get back to you.");
      return false;
    }

    if (mode === "role" && !company.trim()) {
      setErrorMessage("Please enter your company or organization name.");
      return false;
    }

    if (mode === "hello" && !helloMessage.trim()) {
      setErrorMessage("Please enter a short message before sending.");
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const { subject, body } = generateEmailDraft();
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Copy to clipboard as reliable fallback
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(body);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch {
      // Ignore clipboard permission failures
    }

    // Trigger mail client
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const handleCopyAgain = () => {
    const { body } = generateEmailDraft();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setCompany("");
    setEmail("");
    setProjectBrief("");
    setRoleDetails("");
    setHelloMessage("");
    setErrorMessage(null);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Precision Structural Crosshairs */}
      <span className="absolute -top-2.5 -left-2.5 font-mono text-xs text-[var(--accent)]/40 pointer-events-none select-none" aria-hidden="true">+</span>
      <span className="absolute -top-2.5 -right-2.5 font-mono text-xs text-[var(--accent)]/40 pointer-events-none select-none" aria-hidden="true">+</span>
      <span className="absolute -bottom-2.5 -left-2.5 font-mono text-xs text-[var(--accent)]/40 pointer-events-none select-none" aria-hidden="true">+</span>
      <span className="absolute -bottom-2.5 -right-2.5 font-mono text-xs text-[var(--accent)]/40 pointer-events-none select-none" aria-hidden="true">+</span>

      {/* Ticket Cutout Notches (Lazarev Awwwards Ticket Aesthetic) */}
      <div
        className="hidden sm:block absolute top-1/2 -left-3.5 -translate-y-1/2 w-7 h-7 rounded-full bg-[var(--bg)] border border-[var(--border)] z-20 pointer-events-none transition-colors"
        aria-hidden="true"
      />
      <div
        className="hidden sm:block absolute top-1/2 -right-3.5 -translate-y-1/2 w-7 h-7 rounded-full bg-[var(--bg)] border border-[var(--border)] z-20 pointer-events-none transition-colors"
        aria-hidden="true"
      />

      {/* Bespoke Editorial Card Container with Multi-Layered Material Depth */}
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] p-4 sm:p-6 lg:p-7 shadow-2xl transition-all duration-300">
        {/* Ambient Top Radial Accent Luminance */}
        <div 
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-40 bg-[var(--accent-glow)] rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Corner Precision Optical Brackets */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[var(--accent)]/40 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[var(--accent)]/40 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[var(--accent)]/40 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[var(--accent)]/40 pointer-events-none" aria-hidden="true" />

        {/* Header: Purpose Segmented Control */}
        <div className="relative z-10 border-b border-[var(--border)]/80 pb-3 mb-3.5 sm:mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] font-semibold block">
              Inquiry Purpose
            </span>
            <span className="font-mono text-[10px] text-[var(--fg-muted)]">
              Step 01 / Mode
            </span>
          </div>

          <div
            className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[var(--surface)] border border-[var(--border)]"
            role="group"
            aria-label="Inquiry Purpose"
          >
            <button
              type="button"
              onClick={() => {
                setMode("project");
                setErrorMessage(null);
              }}
              className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg font-mono text-[11px] font-medium transition-all duration-200 ${
                mode === "project"
                  ? "bg-[var(--accent)] text-white shadow-md font-semibold"
                  : "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              <Sparkles className="h-3 w-3" />
              <span>Make a Project</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("role");
                setErrorMessage(null);
              }}
              className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg font-mono text-[11px] font-medium transition-all duration-200 ${
                mode === "role"
                  ? "bg-[var(--accent)] text-white shadow-md font-semibold"
                  : "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              <Briefcase className="h-3 w-3" />
              <span>Discuss a Role</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("hello");
                setErrorMessage(null);
              }}
              className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg font-mono text-[11px] font-medium transition-all duration-200 ${
                mode === "hello"
                  ? "bg-[var(--accent)] text-white shadow-md font-semibold"
                  : "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              <MessageSquare className="h-3 w-3" />
              <span>Just Say Hello</span>
            </button>
          </div>
        </div>

        {/* Content: Form vs Success State */}
        {submitted ? (
          <div className="relative z-10 py-4 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-muted)] border border-[var(--accent)]/30 font-mono text-xs text-[var(--accent)]">
              <Check className="h-3.5 w-3.5" />
              <span>Inquiry Draft Prepared &amp; Copied</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[var(--fg)]">
              Thank you, {name || "friend"}.
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed max-w-xl">
              Your note was compiled into an email addressed to{" "}
              <strong className="text-[var(--fg)]">{recipientEmail}</strong>. If your email client did not open automatically, your message was copied to your clipboard so you can paste it directly.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`mailto:${recipientEmail}?subject=${encodeURIComponent(
                  generateEmailDraft().subject
                )}&body=${encodeURIComponent(generateEmailDraft().body)}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold hover:opacity-90 transition-all active:scale-[0.98]"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Open Email Client ↗</span>
              </a>

              <button
                type="button"
                onClick={handleCopyAgain}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] font-mono text-xs text-[var(--fg)] hover:border-[var(--accent)] transition-all"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[var(--accent-nature)]" />
                    <span>Copied Note</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-[var(--fg-muted)]" />
                    <span>Copy Note</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] font-mono text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Draft another</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10 space-y-3.5 sm:space-y-4">
            {/* COMPACT SECTION 1: INTRODUCTION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="inquiry-sender-name" className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-subtle)] block">
                  My Name is <span className="text-[var(--accent)]">*</span>
                </label>
                <input
                  id="inquiry-sender-name"
                  name="senderName"
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  aria-label="Your full name"
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--accent)] text-[var(--fg)] placeholder:text-[var(--fg-subtle)]/60 font-sans text-sm sm:text-base py-1 outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="inquiry-sender-company" className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-subtle)] block">
                  {mode === "role" ? (
                    <>Company / Organization <span className="text-[var(--accent)]">*</span></>
                  ) : (
                    "Company / Website (Optional)"
                  )}
                </label>
                <input
                  id="inquiry-sender-company"
                  name="senderCompany"
                  type="text"
                  placeholder={mode === "role" ? "Acme Technologies" : "Acme Inc. or acme.dev"}
                  value={company}
                  aria-label={mode === "role" ? "Company or organization name" : "Company or website"}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--accent)] text-[var(--fg)] placeholder:text-[var(--fg-subtle)]/60 font-sans text-sm sm:text-base py-1 outline-none transition-colors"
                />
              </div>
            </div>

            {/* COMPACT SECTION 2: ADAPTIVE PARAMETERS */}
            {mode === "project" && (
              <div className="space-y-3 pt-1">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-subtle)] block">
                    I&apos;m interested in building:
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2" role="group" aria-label="Project Category">
                    {projectCategories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setProjectCategory(cat)}
                        className={`text-[11px] sm:text-xs font-sans font-medium px-3 py-1 rounded-full transition-all duration-200 border ${
                          projectCategory === cat
                            ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)] font-semibold shadow-sm"
                            : "border-[var(--border)] bg-[var(--surface)] text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--fg)]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-subtle)] block">
                    Expected timeline:
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2" role="group" aria-label="Project Timeline">
                    {projectTimelines.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setProjectTimeline(time)}
                        className={`text-[11px] sm:text-xs font-sans font-medium px-3 py-1 rounded-full transition-all duration-200 border ${
                          projectTimeline === time
                            ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)] font-semibold shadow-sm"
                            : "border-[var(--border)] bg-[var(--surface)] text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--fg)]"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="inquiry-project-brief" className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-subtle)] block">
                    Project Brief &amp; Requirements (Optional)
                  </label>
                  <input
                    id="inquiry-project-brief"
                    name="projectBrief"
                    type="text"
                    value={projectBrief}
                    aria-label="Project brief and requirements"
                    onChange={(e) => setProjectBrief(e.target.value)}
                    placeholder="Describe what you want to build, core features, or preferred stack..."
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 font-sans text-xs sm:text-sm text-[var(--fg)] placeholder:text-[var(--fg-subtle)]/60 focus:border-[var(--accent)] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {mode === "role" && (
              <div className="space-y-3 pt-1">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-subtle)] block">
                    Opportunity Type:
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2" role="group" aria-label="Role Type">
                    {roleTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setRoleType(type)}
                        className={`text-[11px] sm:text-xs font-sans font-medium px-3 py-1 rounded-full transition-all duration-200 border ${
                          roleType === type
                            ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)] font-semibold shadow-sm"
                            : "border-[var(--border)] bg-[var(--surface)] text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--fg)]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-subtle)] block">
                    Specializing In:
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2" role="group" aria-label="Role Specialty">
                    {roleSpecialties.map((spec) => (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => setRoleSpecialty(spec)}
                        className={`text-[11px] sm:text-xs font-sans font-medium px-3 py-1 rounded-full transition-all duration-200 border ${
                          roleSpecialty === spec
                            ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)] font-semibold shadow-sm"
                            : "border-[var(--border)] bg-[var(--surface)] text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--fg)]"
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="inquiry-role-details" className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-subtle)] block">
                    Role Context, Team &amp; Stack (Optional)
                  </label>
                  <input
                    id="inquiry-role-details"
                    name="roleDetails"
                    type="text"
                    value={roleDetails}
                    aria-label="Role context, team structure, and stack"
                    onChange={(e) => setRoleDetails(e.target.value)}
                    placeholder="Details on team structure, core technologies, location (remote/onsite), or job link..."
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 font-sans text-xs sm:text-sm text-[var(--fg)] placeholder:text-[var(--fg-subtle)]/60 focus:border-[var(--accent)] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {mode === "hello" && (
              <div className="space-y-2 pt-1">
                <label htmlFor="inquiry-hello-message" className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-subtle)] block">
                  Your Message <span className="text-[var(--accent)]">*</span>
                </label>
                <textarea
                  id="inquiry-hello-message"
                  name="helloMessage"
                  rows={2}
                  value={helloMessage}
                  aria-label="Your message"
                  onChange={(e) => {
                    setHelloMessage(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Share an idea, ask a question, or say hello..."
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] p-2.5 font-sans text-xs sm:text-sm text-[var(--fg)] placeholder:text-[var(--fg-subtle)]/60 focus:border-[var(--accent)] focus:outline-none transition-colors resize-none"
                  required
                />
              </div>
            )}

            {/* COMPACT SECTION 3: RETURN EMAIL */}
            <div className="pt-2 border-t border-[var(--border)]/70 space-y-1">
              <label htmlFor="inquiry-sender-email" className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-subtle)] block">
                You can reach me back at <span className="text-[var(--accent)]">*</span>
              </label>
              <input
                id="inquiry-sender-email"
                name="senderEmail"
                type="email"
                placeholder="jane@example.com"
                value={email}
                aria-label="Your email address"
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                className="w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--accent)] text-[var(--fg)] placeholder:text-[var(--fg-subtle)]/60 font-sans text-sm sm:text-base py-1 outline-none transition-colors"
                required
              />
            </div>

            {/* Validation Notice */}
            {errorMessage && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 dark:text-red-400 font-mono text-[11px]">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* COMPACT ACTION BAR (Lazarev prominent submit design) */}
            <div className="pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[var(--border)]/70">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--fg-muted)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-nature)] animate-pulse" />
                <span>Pre-compiles into direct email &amp; copies to clipboard</span>
              </div>

              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[var(--accent)] hover:opacity-90 text-white font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                <span>Dispatch Inquiry</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ConversationalInquiryForm;
