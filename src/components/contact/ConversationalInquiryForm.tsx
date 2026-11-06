"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Copy, RotateCcw, Mail, MapPin, Sparkles, Briefcase, MessageSquare, AlertCircle } from "lucide-react";

type InquiryChoice = "project" | "role" | "hello";

export function ConversationalInquiryForm() {
  const [choice, setChoice] = useState<InquiryChoice>("project");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  // Submission & Validation States
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recipientEmail = "yashvardhanborude7@gmail.com";

  const handleCopyDirectEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(recipientEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    }
  };

  const getPlaceholder = () => {
    switch (choice) {
      case "project":
        return "Tell me about what you want to build, key goals, or timeline...";
      case "role":
        return "Share details about the role, team mission, and tech stack...";
      case "hello":
      default:
        return "What's on your mind? Ideas, tech, or coffee chats are welcome...";
    }
  };

  const generateEmailDraft = () => {
    let subject = "";
    let body = "";

    if (choice === "project") {
      subject = `Project Inquiry: ${name || "Client"}${company ? ` (${company})` : ""}`;
      body = `Hello Yashvardhan,

My name is ${name}${company ? ` from ${company}` : ""}.
I'd like to discuss building a project with you.

Details & Scope:
${message || "No initial notes provided."}

You can reach me back at: ${email}
`;
    } else if (choice === "role") {
      subject = `Engineering Opportunity: ${company || "New Role"} for Yashvardhan`;
      body = `Hello Yashvardhan,

My name is ${name}${company ? ` from ${company}` : ""}.
We would like to discuss an engineering opportunity with you.

Role Details:
${message || "No initial notes provided."}

You can reach me back at: ${email}
`;
    } else {
      subject = `Hello from ${name || "Visitor"}`;
      body = `Hello Yashvardhan,

My name is ${name}${company ? ` from ${company}` : ""}.

Message:
${message || "Just wanted to say hello!"}

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

    if (!message.trim()) {
      setErrorMessage("Please include a brief note or message.");
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
    setMessage("");
    setErrorMessage(null);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Editorial Card Container Inspired by Fathom Studio Reference */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6 lg:p-7 shadow-xl transition-all duration-300">
        
        {/* Organic Botanical Ivy Foliage Branch Illustration (Bottom Right Corner) */}
        <div 
          className="absolute -bottom-3 -right-3 w-40 sm:w-56 h-40 sm:h-56 pointer-events-none select-none opacity-20 sm:opacity-25 transition-opacity"
          aria-hidden="true"
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Main curved vine stem */}
            <path
              d="M195 195C165 170 140 150 115 125C90 100 75 65 70 25"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M140 150C130 135 105 130 90 140"
              stroke="var(--accent)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M115 125C125 105 150 100 165 110"
              stroke="var(--accent)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M90 100C75 90 70 70 80 55"
              stroke="var(--accent)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />

            {/* Natural variegated ivy leaves */}
            {/* Leaf 1 (Large base) */}
            <path
              d="M115 125C105 115 95 117 85 125C75 133 77 145 87 150C97 155 110 147 115 125Z"
              fill="var(--accent)"
              fillOpacity="0.45"
              stroke="var(--accent)"
              strokeWidth="1"
            />
            {/* Leaf 2 (Right branch) */}
            <path
              d="M165 110C175 103 183 107 187 117C191 127 183 135 173 133C163 131 159 119 165 110Z"
              fill="var(--accent)"
              fillOpacity="0.38"
              stroke="var(--accent)"
              strokeWidth="1"
            />
            {/* Leaf 3 (Center upper) */}
            <path
              d="M90 100C85 87 93 77 103 75C113 73 121 81 119 91C117 101 103 107 90 100Z"
              fill="var(--accent)"
              fillOpacity="0.5"
              stroke="var(--accent)"
              strokeWidth="1"
            />
            {/* Leaf 4 (Left sprig) */}
            <path
              d="M90 140C77 137 71 145 73 155C75 165 85 169 93 163C101 157 99 145 90 140Z"
              fill="var(--accent)"
              fillOpacity="0.35"
              stroke="var(--accent)"
              strokeWidth="1"
            />
            {/* Leaf 5 (Tip sprout) */}
            <path
              d="M70 25C63 15 69 7 77 5C85 3 93 10 91 19C89 28 79 33 70 25Z"
              fill="var(--accent)"
              fillOpacity="0.4"
              stroke="var(--accent)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Two-Column Split Layout */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: Editorial Invitation & Metadata */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5">
            <div className="space-y-3">
              {/* Micro Status Label */}
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] font-semibold">
                  Get In Touch
                </span>
              </div>

              {/* Editorial Headline */}
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--fg)] leading-[1.08] tracking-tight">
                Let&apos;s start a{" "}
                <em className="italic font-normal text-[var(--accent)]">
                  real conversation
                </em>
                .
              </h2>

              <p className="font-sans text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed">
                Have an interesting idea, an engineering opportunity, or simply want to connect? I&apos;d love to hear from you.
              </p>
            </div>

            {/* Direct Contact Links */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleCopyDirectEmail}
                className="group flex items-center gap-2.5 text-xs font-mono text-[var(--fg)] hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] rounded p-1 -ml-1 text-left"
                aria-label="Copy direct email address to clipboard"
              >
                <div className="p-1.5 rounded-lg bg-[var(--bg)] border border-[var(--border)] group-hover:border-[var(--accent)] transition-colors">
                  <Mail className="h-3.5 w-3.5 text-[var(--accent)]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-[11px] sm:text-xs">{recipientEmail}</span>
                  <span className="text-[10px] text-[var(--fg-subtle)]">
                    {copiedEmail ? "✓ Copied to clipboard!" : "Click to copy email"}
                  </span>
                </div>
              </button>

              <div className="flex items-center gap-2.5 text-xs font-mono text-[var(--fg-muted)] p-1 -ml-1">
                <div className="p-1.5 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                  <MapPin className="h-3.5 w-3.5 text-[var(--fg-subtle)]" />
                </div>
                <span className="text-[11px] sm:text-xs">Pune, India · Remote Friendly</span>
              </div>
            </div>

            {/* Fathom-Style Response Metadata Strip */}
            <div className="border-t border-[var(--border)] pt-3 space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between items-center text-[var(--fg-muted)]">
                <span className="text-[var(--fg-subtle)]">Response time</span>
                <span className="text-[var(--fg)] tabular-nums">Within 24 hours</span>
              </div>
              <div className="flex justify-between items-center text-[var(--fg-muted)]">
                <span className="text-[var(--fg-subtle)]">Availability</span>
                <span className="text-[var(--fg)]">Open to Collaboration</span>
              </div>
              <div className="flex justify-between items-center text-[var(--fg-muted)]">
                <span className="text-[var(--fg-subtle)]">Working hours</span>
                <span className="text-[var(--fg)]">Mon–Fri, IST</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Clean, Human Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 space-y-3.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-muted)] border border-[var(--accent)]/30 font-mono text-xs text-[var(--accent)] font-medium">
                  <Check className="h-3.5 w-3.5" />
                  <span>Draft Prepared &amp; Copied</span>
                </div>

                <h3 className="font-serif text-2xl text-[var(--fg)]">
                  Thank you, {name || "friend"}.
                </h3>

                <p className="font-sans text-xs text-[var(--fg-muted)] leading-relaxed">
                  Your message was formatted into an email addressed to{" "}
                  <strong className="text-[var(--fg)]">{recipientEmail}</strong>. It was also copied to your clipboard so you can paste it directly into your preferred email client.
                </p>

                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <a
                    href={`mailto:${recipientEmail}?subject=${encodeURIComponent(
                      generateEmailDraft().subject
                    )}&body=${encodeURIComponent(generateEmailDraft().body)}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold hover:opacity-90 transition-all active:scale-[0.98]"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Open Email App ↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyAgain}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] font-mono text-xs text-[var(--fg)] hover:border-[var(--accent)] transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[var(--accent)]" />
                        <span>Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[var(--fg-muted)]" />
                        <span>Copy Draft Note</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full font-mono text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition-all"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Draft another</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                
                {/* 1. Name & Email Inputs (Recessed Pills) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="inquiry-name" className="font-mono text-[10px] sm:text-[11px] text-[var(--fg-subtle)] block">
                      Your name <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      aria-label="Your name"
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs sm:text-sm font-sans text-[var(--fg)] placeholder-[var(--fg-subtle)]/60 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="inquiry-email" className="font-mono text-[10px] sm:text-[11px] text-[var(--fg-subtle)] block">
                      Email address <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      placeholder="jane@example.com"
                      value={email}
                      aria-label="Your email address"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs sm:text-sm font-sans text-[var(--fg)] placeholder-[var(--fg-subtle)]/60 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                    />
                  </div>
                </div>

                {/* 2. Simple Inquiry Choices */}
                <div className="space-y-1">
                  <span className="font-mono text-[10px] sm:text-[11px] text-[var(--fg-subtle)] block">
                    What would you like to discuss?
                  </span>
                  <div className="grid grid-cols-3 gap-2" role="group" aria-label="Discussion Topic">
                    <button
                      type="button"
                      onClick={() => setChoice("project")}
                      className={`flex items-center justify-center gap-1.5 px-2 py-1.5 sm:py-2 rounded-xl font-mono text-[10px] sm:text-[11px] transition-all duration-200 border ${
                        choice === "project"
                          ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-sm font-medium"
                          : "bg-[var(--bg)] border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--border-subtle)]"
                      }`}
                    >
                      <Sparkles className="h-3 w-3" />
                      <span className="truncate">Make a Project</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setChoice("role")}
                      className={`flex items-center justify-center gap-1.5 px-2 py-1.5 sm:py-2 rounded-xl font-mono text-[10px] sm:text-[11px] transition-all duration-200 border ${
                        choice === "role"
                          ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-sm font-medium"
                          : "bg-[var(--bg)] border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--border-subtle)]"
                      }`}
                    >
                      <Briefcase className="h-3 w-3" />
                      <span className="truncate">Discuss a Role</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setChoice("hello")}
                      className={`flex items-center justify-center gap-1.5 px-2 py-1.5 sm:py-2 rounded-xl font-mono text-[10px] sm:text-[11px] transition-all duration-200 border ${
                        choice === "hello"
                          ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-sm font-medium"
                          : "bg-[var(--bg)] border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--border-subtle)]"
                      }`}
                    >
                      <MessageSquare className="h-3 w-3" />
                      <span className="truncate">Just Say Hello</span>
                    </button>
                  </div>
                </div>

                {/* 3. Company / Organization (Optional) */}
                <div className="space-y-1">
                  <label htmlFor="inquiry-company" className="font-mono text-[10px] sm:text-[11px] text-[var(--fg-subtle)] block">
                    Company, studio, or website <span className="text-[var(--fg-subtle)]/70">(Optional)</span>
                  </label>
                  <input
                    id="inquiry-company"
                    type="text"
                    placeholder="Acme Inc. or acme.dev"
                    value={company}
                    aria-label="Company or website"
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs sm:text-sm font-sans text-[var(--fg)] placeholder-[var(--fg-subtle)]/60 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                  />
                </div>

                {/* 4. Message / Project Details Textarea */}
                <div className="space-y-1">
                  <label htmlFor="inquiry-message" className="font-mono text-[10px] sm:text-[11px] text-[var(--fg-subtle)] block">
                    Message or project brief <span className="text-[var(--accent)]">*</span>
                  </label>
                  <textarea
                    id="inquiry-message"
                    rows={2}
                    placeholder={getPlaceholder()}
                    value={message}
                    aria-label="Message or project brief"
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs sm:text-sm font-sans text-[var(--fg)] placeholder-[var(--fg-subtle)]/60 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all resize-none"
                  />
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 font-mono text-xs animate-in fade-in duration-200"
                    role="alert"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* 5. Submit CTA Button */}
                <div className="pt-0.5">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-6 rounded-2xl bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.99] group"
                  >
                    <span>Let&apos;s work together</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationalInquiryForm;
