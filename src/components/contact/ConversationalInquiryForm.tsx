"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Copy, RotateCcw, Mail, MapPin, Sparkles, AlertCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ConversationalInquiryForm() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  const generateEmailDraft = () => {
    const subject = `Inquiry: ${name || "Visitor"}`;
    const body = `Hello Yashvardhan,

My name is ${name || "A visitor"}.

Message:
${message || "I would like to connect regarding an opportunity or project."}

You can reach me back at: ${email}
`;
    return { subject, body };
  };

  const validateForm = (): boolean => {
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
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
    setEmail("");
    setMessage("");
    setErrorMessage(null);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Minimalist Split Architectural Card */}
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] shadow-xl transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          
          {/* =========================================================
              LEFT APERTURE: THEMATIC CINEMATIC LOOP (GIF)
              Light Mode: Ghibli Mossy Waterfall
              Dark Mode: Giphy Purple Aesthetic Loop
              ========================================================= */}
          <div className="md:col-span-5 relative min-h-[220px] md:min-h-[380px] overflow-hidden flex flex-col justify-between p-5 sm:p-6 border-b md:border-b-0 md:border-r border-[var(--border)]">
            {/* Thematic Background Looping GIF */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                isLight ? "opacity-90 contrast-[1.05]" : "opacity-80 contrast-[1.1]"
              }`}
              style={{
                backgroundImage: isLight
                  ? `url('/images/ghibli-mossy-waterfall.gif')`
                  : `url('/images/obsidian-purple-aesthetic.gif')`,
              }}
              aria-hidden="true"
            />

            {/* Cinematic Vignette Overlay ensuring readability */}
            <div
              className={`absolute inset-0 pointer-events-none transition-colors duration-300 ${
                isLight
                  ? "bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/40 to-transparent"
                  : "bg-gradient-to-t from-[#0A0A0D] via-[#0A0A0D]/50 to-transparent"
              }`}
            />

            {/* Top Atmospheric Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-md bg-black/35 text-white/90 border border-white/15">
                {isLight ? "✦ Petrichor Cascade" : "✦ Obsidian Horizon"}
              </span>
              <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
            </div>

            {/* Bottom Aperture Info Card: Direct Email Pill */}
            <div className="relative z-10 space-y-2.5">
              <button
                type="button"
                onClick={handleCopyDirectEmail}
                className="group flex items-center justify-between w-full px-3 py-2 rounded-xl backdrop-blur-md bg-[var(--surface-card)]/90 border border-[var(--border)] text-left hover:border-[var(--accent)] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                aria-label="Copy direct email address to clipboard"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Mail className="h-3.5 w-3.5 text-[var(--accent)] shrink-0" />
                  <span className="font-mono text-[11px] text-[var(--fg)] truncate">
                    {recipientEmail}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[var(--fg-muted)] group-hover:text-[var(--accent)] shrink-0 ml-1.5 transition-colors">
                  {copiedEmail ? "✓ Copied" : "Copy"}
                </span>
              </button>

              <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--fg-muted)]">
                <MapPin className="h-3 w-3 text-[var(--accent)] shrink-0" />
                <span>Pune, India · Remote Friendly</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT PANE: MINIMALIST CONVERSATION CANVAS
              ========================================================= */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            {submitted ? (
              /* Success / Prepared Draft State */
              <div className="my-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-muted)] border border-[var(--accent)]/30 font-mono text-xs text-[var(--accent)] font-medium">
                  <Check className="h-3.5 w-3.5" />
                  <span>Draft Prepared &amp; Copied</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[var(--fg)] tracking-tight">
                  Thank you, {name || "friend"}.
                </h3>

                <p className="font-sans text-xs text-[var(--fg-muted)] leading-relaxed">
                  Your message has been formatted for{" "}
                  <strong className="text-[var(--fg)]">{recipientEmail}</strong> and copied to your clipboard.
                </p>

                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <a
                    href={`mailto:${recipientEmail}?subject=${encodeURIComponent(
                      generateEmailDraft().subject
                    )}&body=${encodeURIComponent(generateEmailDraft().body)}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold hover:opacity-90 transition-all active:scale-[0.98]"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Open Email App ↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyAgain}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-mono text-xs text-[var(--fg)] hover:border-[var(--accent)] transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[var(--accent)]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[var(--fg-muted)]" />
                        <span>Copy Draft</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition-all"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>New Note</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Minimal Form State */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Header */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] font-semibold">
                      Get In Touch
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl text-[var(--fg)] tracking-tight leading-tight">
                    Let&apos;s start a{" "}
                    <em className="italic font-normal text-[var(--accent)]">
                      real conversation
                    </em>
                    .
                  </h2>

                  <p className="font-sans text-xs text-[var(--fg-muted)] leading-relaxed">
                    Have an interesting idea, an engineering opportunity, or simply want to connect? Send a note below.
                  </p>
                </div>

                {/* Streamlined Inputs */}
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="inquiry-name" className="font-mono text-[10px] text-[var(--fg-subtle)] block">
                        Your name <span className="text-[var(--accent)]">*</span>
                      </label>
                      <input
                        id="inquiry-name"
                        type="text"
                        placeholder="Jane Doe"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errorMessage) setErrorMessage(null);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs font-sans text-[var(--fg)] placeholder-[var(--fg-subtle)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="inquiry-email" className="font-mono text-[10px] text-[var(--fg-subtle)] block">
                        Email address <span className="text-[var(--accent)]">*</span>
                      </label>
                      <input
                        id="inquiry-email"
                        type="email"
                        placeholder="jane@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMessage) setErrorMessage(null);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs font-sans text-[var(--fg)] placeholder-[var(--fg-subtle)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="inquiry-message" className="font-mono text-[10px] text-[var(--fg-subtle)] block">
                      Message or brief <span className="text-[var(--accent)]">*</span>
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={3}
                      placeholder="Tell me about what you want to build, key goals, or ideas..."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs font-sans text-[var(--fg)] placeholder-[var(--fg-subtle)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 font-mono text-[11px]"
                    role="alert"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-5 rounded-xl bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] group"
                  >
                    <span>Send Note</span>
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
