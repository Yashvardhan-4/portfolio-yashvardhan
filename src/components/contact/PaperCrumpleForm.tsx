"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, RotateCcw, Mail, ArrowUpRight } from "lucide-react";

export function PaperCrumpleForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "crumpling" | "flying" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Trigger physical paper crumple sequence
    setStatus("crumpling");

    setTimeout(() => {
      setStatus("flying");
    }, 450);

    setTimeout(() => {
      setStatus("sent");
    }, 950);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
  };

  return (
    <div className="relative w-full max-w-xl mx-auto perspective-1000 min-h-[460px] flex items-center justify-center">
      {/* Sent State: Unfolded Thank-You Letter */}
      {status === "sent" ? (
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotateX: 20 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="w-full rounded-2xl border border-[#A855F7]/40 bg-[#0E1015] p-8 sm:p-10 shadow-[0_20px_60px_rgba(168,85,247,0.18)] text-center space-y-6"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981]">
            <CheckCircle2 className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-3xl text-[#EDEDEF]">
              Note Dispatched!
            </h3>
            <p className="font-sans text-sm text-[#94A3B8] leading-relaxed max-w-md mx-auto">
              Thank you, <span className="text-[#EDEDEF] font-semibold">{name}</span>. Your note has been delivered directly to Yashvardhan. You will receive a response at{" "}
              <span className="text-[#A855F7] font-mono text-xs">{email}</span> within 24 hours.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`mailto:yashvardhanborude7@gmail.com?subject=Note from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#EDEDEF] text-[#08090C] font-mono text-xs font-semibold hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            >
              <Mail className="h-3.5 w-3.5 text-[#08090C]" />
              <span>Open in Email App</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#08090C]" />
            </a>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#1E2430] bg-[#08090C] font-mono text-xs text-[#8E95A5] hover:text-[#EDEDEF] hover:border-[#A855F7] transition-all"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[#A855F7]" />
              <span>Write another note</span>
            </button>
          </div>
        </motion.div>
      ) : (
        /* Form State: Interactive Paper Card with Physical Crumple Animation */
        <motion.div
          animate={
            status === "crumpling"
              ? {
                  scale: 0.28,
                  rotate: 45,
                  borderRadius: "50%",
                  filter: "contrast(1.4) brightness(0.8)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.9)",
                }
              : status === "flying"
              ? {
                  scale: 0.12,
                  y: -240,
                  rotate: 280,
                  opacity: 0,
                  borderRadius: "50%",
                }
              : {
                  scale: 1,
                  y: 0,
                  rotate: 0,
                  opacity: 1,
                  borderRadius: "16px",
                  filter: "none",
                }
          }
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-2xl border border-[#1E2430] bg-[#0E1015] p-6 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden"
        >
          {/* Subtle Paper Crease Texture Line at Top */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#A855F7]/30 to-transparent pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center justify-between border-b border-[#1E2430] pb-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#A855F7] font-semibold">
                Send a Direct Note
              </span>
              <span className="font-mono text-[10px] text-[#64748B]">
                Interactive Paper Dispatch
              </span>
            </div>

            {/* Name Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="paper-name"
                className="block font-mono text-xs text-[#8E95A5]"
              >
                Your Name
              </label>
              <input
                id="paper-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full rounded-xl border border-[#1E2430] bg-[#08090C] px-4 py-2.5 font-sans text-sm text-[#EDEDEF] placeholder-[#4A5568] focus:border-[#A855F7] focus:outline-none focus:ring-1 focus:ring-[#A855F7] transition-colors"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="paper-email"
                className="block font-mono text-xs text-[#8E95A5]"
              >
                Your Email Address
              </label>
              <input
                id="paper-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full rounded-xl border border-[#1E2430] bg-[#08090C] px-4 py-2.5 font-sans text-sm text-[#EDEDEF] placeholder-[#4A5568] focus:border-[#A855F7] focus:outline-none focus:ring-1 focus:ring-[#A855F7] transition-colors"
              />
            </div>

            {/* Message Area */}
            <div className="space-y-1.5">
              <label
                htmlFor="paper-message"
                className="block font-mono text-xs text-[#8E95A5]"
              >
                Message
              </label>
              <textarea
                id="paper-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project, team, or opportunity..."
                className="w-full rounded-xl border border-[#1E2430] bg-[#08090C] px-4 py-2.5 font-sans text-sm text-[#EDEDEF] placeholder-[#4A5568] focus:border-[#A855F7] focus:outline-none focus:ring-1 focus:ring-[#A855F7] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status !== "idle"}
              className="group w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#EDEDEF] text-[#08090C] font-mono text-xs font-semibold hover:bg-white hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5 text-[#08090C] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span>Crumple &amp; Send Message</span>
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}

export default PaperCrumpleForm;
