"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Copy, RotateCcw, Mail, Sparkles, Briefcase, MessageSquare } from "lucide-react";

type IntentType = "project" | "hire" | "general";

export function ConversationalInquiryForm() {
  const [intent, setIntent] = useState<IntentType>("project");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  
  // Project specific
  const [projectType, setProjectType] = useState("Web Application");
  const [timeline, setTimeline] = useState("1–3 Months");
  const [projectBrief, setProjectBrief] = useState("");

  // Hire specific
  const [roleType, setRoleType] = useState("Full-Time Role");
  const [roleSpecialty, setRoleSpecialty] = useState("Frontend & Systems");
  const [roleDetails, setRoleDetails] = useState("");

  // General specific
  const [generalNote, setGeneralNote] = useState("");

  // Submission state
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const recipientEmail = "yashvardhanborude7@gmail.com";

  const buildCompiledMessage = () => {
    let subject = "";
    let body = "";

    if (intent === "project") {
      subject = `Project Inquiry: ${name || "New Client"} (${company || "Independent"})`;
      body = `Hello Yashvardhan,

My name is ${name || "[Name]"} from ${company || "[Company/Website]"}.
I'd like to discuss building a ${projectType}.

Target Timeline / Scope:
${timeline}

Project Brief & Context:
${projectBrief || "Not provided in initial inquiry."}

Please reach me back at: ${email || "[Email]"}
`;
    } else if (intent === "hire") {
      subject = `Engineering Opportunity: ${roleType} at ${company || "Our Team"}`;
      body = `Hello Yashvardhan,

My name is ${name || "[Name]"} from ${company || "[Company/Organization]"}.
We have an open ${roleType} focused on ${roleSpecialty}.

Role Details & Context:
${roleDetails || "Not provided in initial inquiry."}

Please reach me back at: ${email || "[Email]"}
`;
    } else {
      subject = `Inquiry from ${name || "Visitor"}`;
      body = `Hello Yashvardhan,

My name is ${name || "[Name]"} from ${company || "[Independent]"}.

Message:
${generalNote || "Not provided in initial inquiry."}

Please reach me back at: ${email || "[Email]"}
`;
    }

    return { subject, body };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setValidationError("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setValidationError("Please enter a valid email address so I can reply.");
      return;
    }

    setValidationError(null);
    const { subject, body } = buildCompiledMessage();

    // Trigger mailto dispatch
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Copy formatted text to clipboard
    try {
      navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Clipboard write fallback
    }

    // Launch mail client
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setCompany("");
    setEmail("");
    setProjectBrief("");
    setRoleDetails("");
    setGeneralNote("");
    setValidationError(null);
  };

  const handleManualCopy = () => {
    const { body } = buildCompiledMessage();
    navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Precision Decorative Crosshairs */}
      <span className="absolute -top-3 -left-3 font-mono text-sm text-[#A855F7]/40 pointer-events-none select-none" aria-hidden="true">+</span>
      <span className="absolute -top-3 -right-3 font-mono text-sm text-[#A855F7]/40 pointer-events-none select-none" aria-hidden="true">+</span>
      <span className="absolute -bottom-3 -left-3 font-mono text-sm text-[#A855F7]/40 pointer-events-none select-none" aria-hidden="true">+</span>
      <span className="absolute -bottom-3 -right-3 font-mono text-sm text-[#A855F7]/40 pointer-events-none select-none" aria-hidden="true">+</span>

      <div className="border border-[#1E2430] bg-[#0A0D14]/90 backdrop-blur-md rounded-2xl p-6 sm:p-10 lg:p-12 shadow-2xl transition-all">
        {/* Intent Switcher Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2430] pb-6 mb-8">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#A855F7] font-semibold block">
              Interactive Inquiry
            </span>
            <p className="font-sans text-xs sm:text-sm text-[#8E95A5] mt-1">
              Select your objective to customize the sentence parameters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Inquiry Intent">
            <button
              type="button"
              onClick={() => {
                setIntent("project");
                setValidationError(null);
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs font-medium transition-all duration-200 ${
                intent === "project"
                  ? "bg-[#A855F7] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : "border border-[#202736] bg-[#0E121A] text-[#8E95A5] hover:border-[#384256] hover:text-[#EDEDEF]"
              }`}
            >
              <Sparkles className="h-3 w-3" />
              <span>Make a Project</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIntent("hire");
                setValidationError(null);
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs font-medium transition-all duration-200 ${
                intent === "hire"
                  ? "bg-[#A855F7] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : "border border-[#202736] bg-[#0E121A] text-[#8E95A5] hover:border-[#384256] hover:text-[#EDEDEF]"
              }`}
            >
              <Briefcase className="h-3 w-3" />
              <span>Hire for a Role</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIntent("general");
                setValidationError(null);
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs font-medium transition-all duration-200 ${
                intent === "general"
                  ? "bg-[#A855F7] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : "border border-[#202736] bg-[#0E121A] text-[#8E95A5] hover:border-[#384256] hover:text-[#EDEDEF]"
              }`}
            >
              <MessageSquare className="h-3 w-3" />
              <span>Say Hello</span>
            </button>
          </div>
        </div>

        {/* Dynamic State: Dispatched Confirmation vs Active Conversational Form */}
        {submitted ? (
          <div className="py-8 space-y-6 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 font-mono text-xs text-[#10B981]">
              <Check className="h-3.5 w-3.5" />
              <span>Note Compiled &amp; Opened in Mail Client</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl text-[#EDEDEF]">
              Thank you, {name || "there"}.
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#8E95A5] leading-relaxed max-w-2xl">
              Your message was structured into an email addressed to{" "}
              <strong className="text-[#EDEDEF]">{recipientEmail}</strong>. If your email client did not open automatically, you can copy the pre-formatted text or reopen it directly below.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`mailto:${recipientEmail}?subject=${encodeURIComponent(
                  buildCompiledMessage().subject
                )}&body=${encodeURIComponent(buildCompiledMessage().body)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EDEDEF] text-[#08090C] font-mono text-xs font-semibold hover:bg-white transition-all active:scale-[0.98]"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Reopen in Email Client ↗</span>
              </a>

              <button
                type="button"
                onClick={handleManualCopy}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#1E2430] bg-[#0E121A] font-mono text-xs text-[#EDEDEF] hover:border-[#A855F7] transition-all"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#10B981]" />
                    <span>Copied Note</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-[#8E95A5]" />
                    <span>Copy Note to Clipboard</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#1E2430] bg-[#0E121A] font-mono text-xs text-[#8E95A5] hover:text-[#EDEDEF] transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Draft another note</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* The Conversational Mad-Libs Sentence Body */}
            <div className="font-serif text-xl sm:text-2xl md:text-3xl text-[#EDEDEF] leading-[2.1] sm:leading-[2.4] tracking-normal">
              <span>Hello Yashvardhan, my name is </span>
              <input
                type="text"
                placeholder="your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                className="border-b-2 border-[#2C3545] focus:border-[#A855F7] text-[#C084FC] placeholder:text-[#4A5568] bg-transparent outline-none font-sans text-lg sm:text-2xl px-2 py-0.5 inline-block min-w-[140px] sm:min-w-[190px] transition-colors"
                aria-label="Your full name"
                required
              />
              <span> from </span>
              <input
                type="text"
                placeholder="company or website"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="border-b-2 border-[#2C3545] focus:border-[#A855F7] text-[#C084FC] placeholder:text-[#4A5568] bg-transparent outline-none font-sans text-lg sm:text-2xl px-2 py-0.5 inline-block min-w-[150px] sm:min-w-[210px] transition-colors"
                aria-label="Your company, organization, or website"
              />
              <span>. </span>

              {/* BRANCH 1: PROJECT INQUIRY */}
              {intent === "project" && (
                <>
                  <span>I would like to collaborate with you on building a </span>
                  <div className="inline-flex flex-wrap items-center gap-2 align-middle my-1 mx-1.5" role="group" aria-label="Project Type">
                    {[
                      "Web Application",
                      "Full-Stack Platform",
                      "Developer Tool / Extension",
                      "High-Performance UI",
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setProjectType(type)}
                        className={`text-xs sm:text-sm font-sans font-medium px-3.5 py-1 rounded-full transition-all duration-200 border ${
                          projectType === type
                            ? "border-[#A855F7] bg-[#A855F7]/20 text-[#F3E8FF] shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                            : "border-[#202736] bg-[#0E121A] text-[#8E95A5] hover:border-[#384256] hover:text-[#EDEDEF]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <span>. Our target timeline / scope is </span>
                  <div className="inline-flex flex-wrap items-center gap-2 align-middle my-1 mx-1.5" role="group" aria-label="Project Timeline">
                    {["< 1 Month", "1–3 Months", "Ongoing / Flexible"].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setTimeline(time)}
                        className={`text-xs sm:text-sm font-sans font-medium px-3.5 py-1 rounded-full transition-all duration-200 border ${
                          timeline === time
                            ? "border-[#A855F7] bg-[#A855F7]/20 text-[#F3E8FF] shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                            : "border-[#202736] bg-[#0E121A] text-[#8E95A5] hover:border-[#384256] hover:text-[#EDEDEF]"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <span>.</span>
                </>
              )}

              {/* BRANCH 2: HIRE INQUIRY */}
              {intent === "hire" && (
                <>
                  <span>I would like to discuss hiring you for a </span>
                  <div className="inline-flex flex-wrap items-center gap-2 align-middle my-1 mx-1.5" role="group" aria-label="Role Type">
                    {["Full-Time Role", "Contract / Freelance", "Founding Engineer"].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setRoleType(role)}
                        className={`text-xs sm:text-sm font-sans font-medium px-3.5 py-1 rounded-full transition-all duration-200 border ${
                          roleType === role
                            ? "border-[#A855F7] bg-[#A855F7]/20 text-[#F3E8FF] shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                            : "border-[#202736] bg-[#0E121A] text-[#8E95A5] hover:border-[#384256] hover:text-[#EDEDEF]"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>

                  <span> specializing in </span>
                  <div className="inline-flex flex-wrap items-center gap-2 align-middle my-1 mx-1.5" role="group" aria-label="Engineering Specialty">
                    {["Frontend & Systems", "Full-Stack Engineering", "Performance & Architecture"].map((spec) => (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => setRoleSpecialty(spec)}
                        className={`text-xs sm:text-sm font-sans font-medium px-3.5 py-1 rounded-full transition-all duration-200 border ${
                          roleSpecialty === spec
                            ? "border-[#A855F7] bg-[#A855F7]/20 text-[#F3E8FF] shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                            : "border-[#202736] bg-[#0E121A] text-[#8E95A5] hover:border-[#384256] hover:text-[#EDEDEF]"
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                  <span>.</span>
                </>
              )}

              {/* Common Return Email */}
              <span> You can reach me back at </span>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                className="border-b-2 border-[#2C3545] focus:border-[#A855F7] text-[#C084FC] placeholder:text-[#4A5568] bg-transparent outline-none font-sans text-lg sm:text-2xl px-2 py-0.5 inline-block min-w-[210px] sm:min-w-[280px] transition-colors"
                aria-label="Your return email address"
                required
              />
              <span>.</span>
            </div>

            {/* Optional Context Field (Brief or Role Specifics) */}
            <div className="space-y-2 pt-2">
              <label htmlFor="inquiry-context" className="font-mono text-[11px] uppercase tracking-wider text-[#8E95A5] block">
                {intent === "project"
                  ? "Project Brief & Objectives (Optional)"
                  : intent === "hire"
                  ? "Role Context & Team Stack (Optional)"
                  : "Your Note or Question (Optional)"}
              </label>

              <textarea
                id="inquiry-context"
                rows={3}
                value={
                  intent === "project"
                    ? projectBrief
                    : intent === "hire"
                    ? roleDetails
                    : generalNote
                }
                onChange={(e) => {
                  if (intent === "project") setProjectBrief(e.target.value);
                  else if (intent === "hire") setRoleDetails(e.target.value);
                  else setGeneralNote(e.target.value);
                }}
                placeholder={
                  intent === "project"
                    ? "Briefly describe the core problem, features, or design vision..."
                    : intent === "hire"
                    ? "Details on team structure, core technologies, location or job link..."
                    : "Write your message or thoughts here..."
                }
                className="w-full rounded-xl border border-[#1E2430] bg-[#0E121A] p-4 font-sans text-sm sm:text-base text-[#EDEDEF] placeholder:text-[#4A5568] focus:border-[#A855F7] focus:outline-none transition-colors resize-y min-h-[90px]"
              />
            </div>

            {/* Validation Notification */}
            {validationError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs">
                {validationError}
              </div>
            )}

            {/* Action Bar with Prominent Submit Button */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#1E2430]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8E95A5]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                <span>Pre-compiles into direct email &amp; copies to clipboard</span>
              </div>

              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] active:scale-[0.98]"
              >
                <span>Dispatch Inquiry</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ConversationalInquiryForm;
