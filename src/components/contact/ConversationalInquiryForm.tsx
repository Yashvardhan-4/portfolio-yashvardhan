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
      <span className="absolute -top-2.5 -left-2.5 font-mono text-xs text-[#A855F7]/40 pointer-events-none select-none" aria-hidden="true">+</span>
      <span className="absolute -top-2.5 -right-2.5 font-mono text-xs text-[#A855F7]/40 pointer-events-none select-none" aria-hidden="true">+</span>
      <span className="absolute -bottom-2.5 -left-2.5 font-mono text-xs text-[#A855F7]/40 pointer-events-none select-none" aria-hidden="true">+</span>
      <span className="absolute -bottom-2.5 -right-2.5 font-mono text-xs text-[#A855F7]/40 pointer-events-none select-none" aria-hidden="true">+</span>

      {/* Bespoke Editorial Card Container with Multi-Layered Material Depth */}
      <div className="relative overflow-hidden rounded-2xl border border-[#222B3D]/80 bg-gradient-to-b from-[#111624] via-[#0A0D15] to-[#06080D] p-4 sm:p-6 lg:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.07),0_0_40px_rgba(168,85,247,0.05)] transition-all">
        {/* Ambient Top Radial Violet Luminance */}
        <div 
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-40 bg-[#A855F7]/12 rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Tactile Micro-Grid Texture */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(#2A344A_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Corner Precision Optical Brackets */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#A855F7]/40 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#A855F7]/40 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#A855F7]/40 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#A855F7]/40 pointer-events-none" aria-hidden="true" />

        {/* Header: Purpose Segmented Control */}
        <div className="relative z-10 border-b border-[#1E2430]/80 pb-3 mb-3.5 sm:mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#A855F7] font-semibold block">
              Inquiry Purpose
            </span>
            <span className="font-mono text-[10px] text-[#8E95A5]">
              Step 01 / Mode
            </span>
          </div>

          <div
            className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[#090C13]/90 border border-[#1E2536]"
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
                  ? "bg-[#A855F7] text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                  : "text-[#8E95A5] hover:text-[#EDEDEF] hover:bg-[#131924]"
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
                  ? "bg-[#A855F7] text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                  : "text-[#8E95A5] hover:text-[#EDEDEF] hover:bg-[#131924]"
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
                  ? "bg-[#A855F7] text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                  : "text-[#8E95A5] hover:text-[#EDEDEF] hover:bg-[#131924]"
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 font-mono text-xs text-[#10B981]">
              <Check className="h-3.5 w-3.5" />
              <span>Inquiry Draft Prepared &amp; Copied</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#EDEDEF]">
              Thank you, {name || "friend"}.
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#8E95A5] leading-relaxed max-w-xl">
              Your note was compiled into an email addressed to{" "}
              <strong className="text-[#EDEDEF]">{recipientEmail}</strong>. If your email client did not open automatically, your message was copied to your clipboard so you can paste it directly.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`mailto:${recipientEmail}?subject=${encodeURIComponent(
                  generateEmailDraft().subject
                )}&body=${encodeURIComponent(generateEmailDraft().body)}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EDEDEF] text-[#08090C] font-mono text-xs font-semibold hover:bg-white transition-all active:scale-[0.98]"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Open Email Client ↗</span>
              </a>

              <button
                type="button"
                onClick={handleCopyAgain}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#1E2430] bg-[#0E121A] font-mono text-xs text-[#EDEDEF] hover:border-[#A855F7] transition-all"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#10B981]" />
                    <span>Copied Note</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-[#8E95A5]" />
                    <span>Copy Note</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#1E2430] bg-[#0E121A] font-mono text-xs text-[#8E95A5] hover:text-[#EDEDEF] transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Draft another</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10 space-y-4 sm:space-y-5">
            {/* COMPACT SECTION 1: INTRODUCTION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="inquiry-sender-name" className="font-mono text-[10px] uppercase tracking-wider text-[#8E95A5] block">
                  My Name is <span className="text-[#A855F7]">*</span>
                </label>
                <input
                  id="inquiry-sender-name"
                  name="senderName"
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full bg-transparent border-b border-[#263144] focus:border-[#A855F7] text-[#EDEDEF] placeholder:text-[#4A5568] font-sans text-sm sm:text-base py-1.5 outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="inquiry-sender-company" className="font-mono text-[10px] uppercase tracking-wider text-[#8E95A5] block">
                  {mode === "role" ? (
                    <>Company / Organization <span className="text-[#A855F7]">*</span></>
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
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-transparent border-b border-[#263144] focus:border-[#A855F7] text-[#EDEDEF] placeholder:text-[#4A5568] font-sans text-sm sm:text-base py-1.5 outline-none transition-colors"
                />
              </div>
            </div>

            {/* COMPACT SECTION 2: ADAPTIVE PARAMETERS */}
            {mode === "project" && (
              <div className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#8E95A5] block">
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
                            ? "border-[#A855F7] bg-[#A855F7]/20 text-[#F3E8FF] shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                            : "border-[#1E2536] bg-[#0A0E17] text-[#8E95A5] hover:border-[#384256] hover:text-[#EDEDEF]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#8E95A5] block">
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
                            ? "border-[#A855F7] bg-[#A855F7]/20 text-[#F3E8FF] shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                            : "border-[#1E2536] bg-[#0A0E17] text-[#8E95A5] hover:border-[#384256] hover:text-[#EDEDEF]"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="inquiry-project-brief" className="font-mono text-[10px] uppercase tracking-wider text-[#8E95A5] block">
                    Project Brief &amp; Requirements (Optional)
                  </label>
                  <input
                    id="inquiry-project-brief"
                    name="projectBrief"
                    type="text"
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    placeholder="Describe what you want to build, core features, or preferred stack..."
                    className="w-full rounded-lg border border-[#1E2536] bg-[#080B12] px-3 py-2 font-sans text-xs sm:text-sm text-[#EDEDEF] placeholder:text-[#4A5568] focus:border-[#A855F7] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {mode === "role" && (
              <div className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#8E95A5] block">
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
                            ? "border-[#A855F7] bg-[#A855F7]/20 text-[#F3E8FF] shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                            : "border-[#1E2536] bg-[#0A0E17] text-[#8E95A5] hover:border-[#384256] hover:text-[#EDEDEF]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#8E95A5] block">
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
                            ? "border-[#A855F7] bg-[#A855F7]/20 text-[#F3E8FF] shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                            : "border-[#1E2536] bg-[#0A0E17] text-[#8E95A5] hover:border-[#384256] hover:text-[#EDEDEF]"
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="inquiry-role-details" className="font-mono text-[10px] uppercase tracking-wider text-[#8E95A5] block">
                    Role Context, Team &amp; Stack (Optional)
                  </label>
                  <input
                    id="inquiry-role-details"
                    name="roleDetails"
                    type="text"
                    value={roleDetails}
                    onChange={(e) => setRoleDetails(e.target.value)}
                    placeholder="Details on team structure, core technologies, location (remote/onsite), or job link..."
                    className="w-full rounded-lg border border-[#1E2536] bg-[#080B12] px-3 py-2 font-sans text-xs sm:text-sm text-[#EDEDEF] placeholder:text-[#4A5568] focus:border-[#A855F7] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {mode === "hello" && (
              <div className="space-y-2 pt-1">
                <label htmlFor="inquiry-hello-message" className="font-mono text-[10px] uppercase tracking-wider text-[#8E95A5] block">
                  Your Message <span className="text-[#A855F7]">*</span>
                </label>
                <textarea
                  id="inquiry-hello-message"
                  name="helloMessage"
                  rows={2}
                  value={helloMessage}
                  onChange={(e) => {
                    setHelloMessage(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Share an idea, ask a question, or say hello..."
                  className="w-full rounded-lg border border-[#1E2536] bg-[#080B12] p-3 font-sans text-xs sm:text-sm text-[#EDEDEF] placeholder:text-[#4A5568] focus:border-[#A855F7] focus:outline-none transition-colors resize-none"
                  required
                />
              </div>
            )}

            {/* COMPACT SECTION 3: RETURN EMAIL */}
            <div className="pt-2 border-t border-[#1E2430]/60 space-y-1">
              <label htmlFor="inquiry-sender-email" className="font-mono text-[10px] uppercase tracking-wider text-[#8E95A5] block">
                You can reach me back at <span className="text-[#A855F7]">*</span>
              </label>
              <input
                id="inquiry-sender-email"
                name="senderEmail"
                type="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                className="w-full bg-transparent border-b border-[#263144] focus:border-[#A855F7] text-[#EDEDEF] placeholder:text-[#4A5568] font-sans text-sm sm:text-base py-1.5 outline-none transition-colors"
                required
              />
            </div>

            {/* Validation Notice */}
            {errorMessage && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[11px]">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* COMPACT ACTION BAR */}
            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#1E2430]/70">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#8E95A5]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                <span>Pre-compiles into direct email &amp; copies to clipboard</span>
              </div>

              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-[0.98]"
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
