"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
} from "framer-motion";

interface ElasticDividerProps {
  /** Target fill color of the next section (CSS color or CSS variable) */
  fill?: string;
  /** Flip curve vertically when exiting vs entering */
  flip?: boolean;
  className?: string;
}

/**
 * Dennis Snellenberg–inspired Elastic Silk Curved Arch Transition.
 * Bows subtly in response to Lenis scroll progress and velocity so adjacent
 * chapters flow like sculpted physical fabric instead of flat straight cuts.
 */
export function ElasticDivider({
  fill = "var(--bg)",
  flip = false,
  className = "",
}: ElasticDividerProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothVelocity = useSpring(useVelocity(scrollYProgress), {
    stiffness: 180,
    damping: 28,
  });

  // Gentle arch curve depth driven smoothly by viewport passage + velocity impulse
  const rawDepth = useTransform(scrollYProgress, [0, 0.5, 1], [62, 16, 48]);
  const velocityBoost = useTransform(smoothVelocity, [-1.5, 0, 1.5], [-16, 0, 16]);
  const curveDepth = useSpring(
    useTransform([rawDepth, velocityBoost], ([d, v]) =>
      Math.max(4, Math.min(76, (d as number) + (v as number)))
    ),
    { stiffness: 220, damping: 26 }
  );

  const dPath = useTransform(curveDepth, (depth) =>
    flip
      ? `M0,80 Q720,${80 - depth} 1440,80 L1440,0 L0,0 Z`
      : `M0,0 Q720,${depth} 1440,0 L1440,80 L0,80 Z`
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none select-none w-full h-10 sm:h-16 overflow-hidden leading-none ${className}`}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        <motion.path d={dPath} fill={fill} />
      </svg>
    </div>
  );
}

export default ElasticDivider;
