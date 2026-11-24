"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { ElasticDivider } from "@/components/ui/ElasticDivider";

/**
 * Active Theory × Locomotive Zoom-Through Aperture Interlude.
 * As the visitor scrolls through this calm breathing chamber, the central living
 * window smoothly scales edge-to-edge while the flanking display type parts,
 * dissolving organically into the Contact Postcard finale.
 */
export function AperturePortal() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const portalScale = useTransform(scrollYProgress, [0.05, 0.85], [0.92, 5.6]);
  const portalRadius = useTransform(scrollYProgress, [0.05, 0.75], ["9999px", "24px"]);
  const leftWordX = useTransform(scrollYProgress, [0.02, 0.45], ["0%", "-140%"]);
  const rightWordX = useTransform(scrollYProgress, [0.02, 0.45], ["0%", "140%"]);
  const wordOpacity = useTransform(scrollYProgress, [0.02, 0.36], [1, 0]);
  const innerCaptionOpacity = useTransform(scrollYProgress, [0.15, 0.45, 0.85], [0, 1, 1]);

  if (reducedMotion) {
    return (
      <section
        aria-label="Next Chapter Portal"
        className="relative w-full bg-[var(--bg)] py-20 px-6 text-center transition-colors duration-300"
      >
        <ElasticDivider fill="var(--bg)" className="-mt-20 mb-12 relative z-20" />
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent)] mb-3">
          05 · Final Chapter
        </p>
        <h2 className="font-serif text-4xl sm:text-6xl text-[var(--fg)] tracking-tight [text-wrap:balance]">
          Let&apos;s build something unforgettable.
        </h2>
        <a
          href="#contact"
          className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-[var(--accent)] hover:underline"
        >
          <span>Continue to Postcard</span>
          <ArrowDown className="h-3.5 w-3.5" />
        </a>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      aria-label="Aperture Portal Transition"
      className="relative w-full h-[165vh] bg-[var(--bg)] transition-colors duration-300"
    >
      <ElasticDivider fill="var(--bg)" className="-mt-10 sm:-mt-16 relative z-20" />

      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center px-5">
        <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-10 w-full max-w-7xl">
          {/* Left Flanking Word */}
          <motion.span
            style={{ x: leftWordX, opacity: wordOpacity }}
            className="hidden sm:block font-display text-4xl md:text-6xl lg:text-8xl font-semibold tracking-[-0.04em] text-[var(--fg)] select-none"
          >
            NEXT
          </motion.span>

          {/* Expanding Living Aperture */}
          <motion.div
            style={{ scale: portalScale, borderRadius: portalRadius }}
            data-cursor-label="SCROLL ↓"
            className="relative w-[220px] h-[290px] sm:w-[270px] sm:h-[360px] shrink-0 overflow-hidden border border-[var(--border)] shadow-2xl will-change-transform flex items-center justify-center"
          >
            {/* Light Mode Sunlit Conservatory / Dark Mode Obsidian Velvet Aura */}
            {isLight ? (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center scale-110"
                  style={{ backgroundImage: `url('/images/ghibli-countryside-summer.jpg')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 scale-110 bg-cover bg-center opacity-75"
                  style={{ backgroundImage: `url('/images/obsidian-purple-aesthetic.gif')` }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.28),rgba(5,5,8,0.75))]" />
              </>
            )}

            {/* Inverse Counter-Scaled Serene Interior Phrase */}
            <motion.div
              style={{ opacity: innerCaptionOpacity }}
              className="relative z-10 text-center px-4 py-2 rounded-full bg-black/25 backdrop-blur-[2px] border border-white/15 pointer-events-none select-none"
            >
              <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-white/90 mb-0.5">
                say hello
              </span>
              <span className="block font-serif italic text-lg sm:text-xl text-white drop-shadow-sm leading-tight">
                Your turn.
              </span>
            </motion.div>
          </motion.div>

          {/* Right Flanking Word */}
          <motion.span
            style={{ x: rightWordX, opacity: wordOpacity }}
            className="hidden sm:block font-display text-4xl md:text-6xl lg:text-8xl font-semibold tracking-[-0.04em] text-[var(--fg)] select-none"
          >
            CHAPTER
          </motion.span>
        </div>

        {/* Mobile Flanking Sub-caption */}
        <motion.p
          style={{ opacity: wordOpacity }}
          className="sm:hidden absolute bottom-12 inset-x-0 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg-muted)] pointer-events-none"
        >
          Keep scrolling to enter Contact
        </motion.p>
      </div>
    </section>
  );
}

export default AperturePortal;
