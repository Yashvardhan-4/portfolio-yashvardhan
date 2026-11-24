"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * Quiet Morphing Cursor Pill (Dennis Snellenberg / Studio Freight signature).
 * Renders a restrained translucent dot at rest and expands smoothly into a
 * minimal contextual badge only over elements carrying `data-cursor-label`.
 * Automatically disables on touch screens and reduced-motion preferences.
 */
export function SpatialCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, { stiffness: 460, damping: 34, mass: 0.35 });
  const smoothY = useSpring(mouseY, { stiffness: 460, damping: 34, mass: 0.35 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const isEligible = () =>
      window.innerWidth >= 768 && pointerQuery.matches && !motionQuery.matches;

    const syncEligibility = () => {
      const ok = isEligible();
      setEnabled(ok);
      if (!ok) {
        setVisible(false);
        setLabel(null);
      }
    };

    syncEligibility();

    const updateLabelAt = (clientX: number, clientY: number) => {
      const el = document.elementFromPoint(clientX, clientY) as HTMLElement | null;
      const tagged = el?.closest("[data-cursor-label]") as HTMLElement | null;
      setLabel(tagged ? tagged.getAttribute("data-cursor-label") : null);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !isEligible()) {
        setVisible(false);
        setLabel(null);
        return;
      }
      setEnabled(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
      updateLabelAt(e.clientX, e.clientY);
    };

    const onScroll = () => {
      if (!isEligible()) return;
      const cx = mouseX.get();
      const cy = mouseY.get();
      if (cx >= 0 && cy >= 0) {
        updateLabelAt(cx, cy);
      }
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      setVisible(false);
      setLabel(null);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", syncEligibility, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    pointerQuery.addEventListener("change", syncEligibility);
    motionQuery.addEventListener("change", syncEligibility);
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", syncEligibility);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      pointerQuery.removeEventListener("change", syncEligibility);
      motionQuery.removeEventListener("change", syncEligibility);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [mouseX, mouseY]);

  if (!enabled || !visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 select-none"
      style={{ x: smoothX, y: smoothY }}
    >
      <AnimatePresence mode="wait">
        {label ? (
          <motion.div
            key={`pill-${label}`}
            initial={{ scale: 0.72, opacity: 0 }}
            animate={{ scale: pressed ? 0.92 : 1, opacity: 1 }}
            exit={{ scale: 0.72, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="px-3.5 py-1.5 rounded-full bg-[var(--fg)] text-[var(--bg)] shadow-lg backdrop-blur-md font-mono text-[10px] uppercase tracking-[0.12em] font-semibold whitespace-nowrap border border-[var(--border)]/30"
          >
            {label}
          </motion.div>
        ) : (
          <motion.div
            key="dot"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: pressed ? 0.75 : 1, opacity: 0.7 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-2.5 h-2.5 rounded-full border border-[var(--accent)] bg-[var(--accent)]/15 backdrop-blur-[1px]"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default SpatialCursor;
