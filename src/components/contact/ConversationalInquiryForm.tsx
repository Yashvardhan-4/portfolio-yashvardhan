"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Check, Copy, RotateCcw, Mail, MapPin, Sparkles, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticPill } from "@/components/ui/MagneticPill";
import { useTheme } from "@/context/ThemeContext";

export function ConversationalInquiryForm() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [stampTime, setStampTime] = useState("PUNE · IN");

  const recipientEmail = "yashvardhanborude7@gmail.com";

  useEffect(() => {
    const updateStamp = () => {
      try {
        const t = new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        setStampTime(`PUNE · ${t} IST`);
      } catch {}
    };
    updateStamp();
    const timer = setInterval(updateStamp, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyDirectEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(recipientEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    }
  };

  const generateEmailDraft = () => {
    const subject = `Inquiry: ${name || "Visitor"}`;
    const body = `Hello Yashvardhan,\n\nMy name is ${name || "A visitor"}.\n\nMessage:\n${
      message || "I would like to connect regarding an internship or project."
    }\n\nYou can reach me back at: ${email}\n`;
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

    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(body);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch {}

    window.location.href = mailtoUrl;
    setSubmitted(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sprout-postcard-sent"));
    }
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
      {/* Physical Split Exhibition Postcard */}
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] shadow-2xl transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* LEFT APERTURE: CINEMATIC LOOP + POSTAGE STAMP */}
          <div className="md:col-span-5 relative min-h-[240px] md:min-h-[400px] overflow-hidden flex flex-col justify-between p-5 sm:p-6 border-b md:border-b-0 md:border-r border-[var(--border)]">
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

            <div
              className={`absolute inset-0 pointer-events-none transition-colors duration-300 ${
                isLight
                  ? "bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/40 to-transparent"
                  : "bg-gradient-to-t from-[#0A0A0D] via-[#0A0A0D]/50 to-transparent"
              }`}
            />

            {/* Top Stamp Row: Realm Tag + Perforated Postage Stamp */}
            <div className="relative z-10 flex items-start justify-between gap-2">
              <span className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-md bg-black/40 text-white/90 border border-white/15">
                {isLight ? "✦ Petrichor Cascade" : "✦ Obsidian Horizon"}
              </span>

              <div
                aria-label="Pune Postage Stamp"
                className="border-2 border-dashed border-white/60 bg-black/35 backdrop-blur-md px-2.5 py-1.5 text-right text-white font-mono select-none"
              >
                <span className="block text-[8px] uppercase tracking-widest text-white/70">
                  AIR MAIL
                </span>
                <span className="block text-[10px] font-bold tracking-wider tabular-nums">
                  {stampTime}
                </span>
              </div>
            </div>

            {/* Bottom Email Sticker */}
            <div className="relative z-10 space-y-2.5">
              <button
                type="button"
                onClick={handleCopyDirectEmail}
                data-cursor-label="COPY EMAIL"
                className="group flex items-center justify-between w-full px-3 py-2 rounded-xl backdrop-blur-md bg-[var(--surface-card)]/90 border border-[var(--border)] text-left hover:border-[var(--accent)] transition-all shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
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
                <span>Pune, India · Remote &amp; In-Person Open</span>
              </div>
            </div>
          </div>

          {/* RIGHT PANE: POSTCARD CORRESPONDENCE */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between relative">
            {submitted ? (
              <div className="my-auto space-y-5 relative">
                {/* Tactile Ink Postmark Stamp Animation */}
                <motion.div
                  initial={{ scale: 2.3, opacity: 0, rotate: -24 }}
                  animate={{ scale: 1, opacity: 0.9, rotate: -10 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="hidden sm:flex absolute -top-2 right-0 w-24 h-24 rounded-full border-2 border-dashed border-[var(--accent)] items-center justify-center text-center p-2 pointer-events-none select-none"
                >
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[var(--accent)] leading-tight">
                    DISPATCHED
                    <br />
                    PUNE ✦
                  </span>
                </motion.div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-muted)] border border-[var(--accent)]/30 font-mono text-xs text-[var(--accent)] font-medium">
                  <Check className="h-3.5 w-3.5" />
                  <span>Postcard Prepared &amp; Copied</span>
                </div>

                <h3 className="font-serif text-3xl text-[var(--fg)] tracking-tight">
                  Thank you, {name || "friend"}.
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed max-w-md">
                  Your note has been formatted for{" "}
                  <strong className="text-[var(--fg)]">{recipientEmail}</strong> and copied straight to your clipboard.
                </p>

                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <a
                    href={`mailto:${recipientEmail}?subject=${encodeURIComponent(
                      generateEmailDraft().subject
                    )}&body=${encodeURIComponent(generateEmailDraft().body)}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold hover:opacity-90 transition-all"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Open Email App ↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyAgain}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] font-mono text-xs text-[var(--fg)] hover:border-[var(--accent)] transition-all cursor-pointer"
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
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full font-mono text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition-all cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Write Another</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] font-semibold">
                      Postcard · Get In Touch
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-[var(--fg)] tracking-tight leading-tight">
                    Write a{" "}
                    <em className="italic font-normal text-[var(--accent)]">
                      quick note
                    </em>
                    .
                  </h2>

                  <p className="font-sans text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed">
                    Hiring for an internship, building something ambitious, or just want to say hello? Drop a note below.
                  </p>
                </div>

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
                        placeholder="jane@company.com"
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
                      Message <span className="text-[var(--accent)]">*</span>
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={3}
                      placeholder="Tell me about the role, team, or idea you'd like to discuss..."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs font-sans text-[var(--fg)] placeholder-[var(--fg-subtle)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all resize-none"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 font-mono text-[11px]"
                    role="alert"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="pt-1 flex justify-stretch">
                  <MagneticPill
                    as="button"
                    type="submit"
                    variant="primary"
                    cursorLabel="SEND POSTCARD"
                    className="w-full py-2.5 px-6 font-mono text-xs font-semibold tracking-wider"
                  >
                    <span>Send Postcard</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </MagneticPill>
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
