"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface BlurredTextTickerProps {
  items: string[];
  interval?: number; // Time in ms between ticks (default: 3400)
  className?: string;
  itemClassName?: string;
  activeColor?: string;
  inactiveColor?: string;
  blurAmount?: number;
  highlightPeriod?: boolean;
  onHoverPause?: boolean;
}

export function BlurredTextTicker({
  items,
  interval = 3400,
  className = "",
  itemClassName = "",
  activeColor = "#EDEDEF",
  inactiveColor = "#64748B",
  blurAmount = 4,
  highlightPeriod = true,
  onHoverPause = false,
}: BlurredTextTickerProps) {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const cleanItems = useMemo(
    () => (items && items.length > 0 ? items : ["Text"]),
    [items]
  );
  const count = cleanItems.length;

  // Continuous auto-animation ticker (never gets stuck on accidental hover)
  useEffect(() => {
    if (prefersReduced || count <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, interval);

    return () => clearInterval(timer);
  }, [count, interval, prefersReduced]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden inline-flex flex-col select-none cursor-default ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
        height: "1.28em",
        verticalAlign: "middle",
      }}
    >
      <motion.div
        className="flex flex-col"
        animate={{ y: `-${index * 1.28}em` }}
        transition={{
          duration: prefersReduced ? 0.01 : 0.82,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {cleanItems.map((item, i) => {
          const distance = Math.abs(i - index);
          const isActive = distance === 0;
          const isAdjacent = distance === 1 || distance === count - 1;

          // Render item with optional glowing purple period
          const hasTrailingPeriod = item.endsWith(".");
          const displayContent = hasTrailingPeriod ? item.slice(0, -1) : item;

          return (
            <div
              key={`${item}-${i}`}
              className={`flex items-center whitespace-nowrap leading-[1.28em] h-[1.28em] transition-[filter,opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${itemClassName}`}
              style={{
                color: isActive ? activeColor : inactiveColor,
                filter: prefersReduced
                  ? "none"
                  : isActive
                  ? "blur(0px)"
                  : isAdjacent
                  ? `blur(${blurAmount}px)`
                  : `blur(${blurAmount * 1.6}px)`,
                opacity: isActive ? 1 : isAdjacent ? 0.28 : 0,
                transform: isActive
                  ? isHovered
                    ? "scale(1.015)"
                    : "scale(1)"
                  : "scale(0.98)",
              }}
            >
              <span className="transition-colors duration-300">
                {displayContent}
              </span>
              {hasTrailingPeriod && (
                <span
                  className={
                    highlightPeriod
                      ? `text-[#A855F7] ml-0.5 inline-block transition-all duration-300 ${
                          isHovered
                            ? "drop-shadow-[0_0_18px_rgba(168,85,247,0.95)] scale-110"
                            : "drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]"
                        } animate-[violetPulse_3.5s_ease-in-out_infinite]`
                      : ""
                  }
                >
                  .
                </span>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default BlurredTextTicker;
