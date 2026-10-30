"use client";

import React, { useState, useEffect, useRef, useId } from "react";

export interface EditorialTextMorphProps {
  phrases: string[];
  interval?: number; // Time between phrase transitions in ms (default: 3600)
  transitionDuration?: number; // Duration of the morph transition in ms (default: 800)
  className?: string;
  accentColor?: string;
  textColor?: string;
}

export interface MatchPair {
  prevIndex: number;
  nextIndex: number;
}

/**
 * Computes the Longest Common Subsequence (LCS) mapping between two strings.
 * Case-insensitive match, preserving sequential character ordering.
 */
function computeLCSMatches(prevStr: string, nextStr: string): MatchPair[] {
  const m = prevStr.length;
  const n = nextStr.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (prevStr[i - 1].toLowerCase() === nextStr[j - 1].toLowerCase()) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find matching index pairs: prevIndex -> nextIndex
  const matches: MatchPair[] = [];
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (prevStr[i - 1].toLowerCase() === nextStr[j - 1].toLowerCase()) {
      matches.unshift({ prevIndex: i - 1, nextIndex: j - 1 });
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return matches;
}

interface CharRenderItem {
  id: string;
  char: string;
  isShared: boolean;
  status: "entering" | "moving" | "exiting" | "stable";
  deltaX: number;
}

export function EditorialTextMorph({
  phrases,
  interval = 3600,
  transitionDuration = 850,
  className = "",
  accentColor = "#C5A880",
  textColor = "#EDE8DE",
}: EditorialTextMorphProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [charItems, setCharItems] = useState<CharRenderItem[]>(() => {
    const initial = phrases[0] || "";
    return initial.split("").map((c, i) => ({
      id: `char-0-${i}-${c}`,
      char: c,
      isShared: false,
      status: "stable",
      deltaX: 0,
    }));
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const prevPositionsRef = useRef<number[]>([]);
  const uid = useId();

  // Respect prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Record bounding rects of characters for FLIP transitions
  const recordPositions = () => {
    if (!containerRef.current) return [];
    const containerLeft = containerRef.current.getBoundingClientRect().left;
    return spanRefs.current.map((span) => (span ? span.getBoundingClientRect().left - containerLeft : 0));
  };

  useEffect(() => {
    if (phrases.length <= 1) return;

    const timer = setInterval(() => {
      // Step 1: Capture current positions of the active phrase
      const oldPositions = recordPositions();
      prevPositionsRef.current = oldPositions;

      const nextIdx = (currentIndex + 1) % phrases.length;
      const prevPhrase = phrases[currentIndex];
      const nextPhrase = phrases[nextIdx];

      if (prefersReducedMotion) {
        setCurrentIndex(nextIdx);
        setCharItems(
          nextPhrase.split("").map((c, i) => ({
            id: `static-${nextIdx}-${i}-${c}`,
            char: c,
            isShared: false,
            status: "stable",
            deltaX: 0,
          }))
        );
        return;
      }

      // Step 2: Compute LCS correspondence
      const matches = computeLCSMatches(prevPhrase, nextPhrase);

      // Construct next render items
      const nextItems: CharRenderItem[] = nextPhrase.split("").map((char, nextPos) => {
        const match = matches.find((m) => m.nextIndex === nextPos);
        const isShared = match !== undefined;
        return {
          id: `${uid}-c-${nextIdx}-${nextPos}-${char}`,
          char,
          isShared,
          status: isShared ? "moving" : "entering",
          deltaX: 0, // will compute after measurement
        };
      });

      // Prepare items in state and trigger morph cycle
      setIsTransitioning(true);
      setCurrentIndex(nextIdx);
      setCharItems(nextItems);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, phrases, interval, prefersReducedMotion, uid]);

  // Handle post-render layout FLIP calculation
  useEffect(() => {
    if (!isTransitioning || prefersReducedMotion) return;

    // Measure new positions in next phrase
    const newPositions = recordPositions();
    const prevPositions = prevPositionsRef.current;
    const prevPhrase = phrases[(currentIndex - 1 + phrases.length) % phrases.length];
    const nextPhrase = phrases[currentIndex];
    const matches = computeLCSMatches(prevPhrase, nextPhrase);

    // Compute deltaX for each shared character
    setCharItems((prev) =>
      prev.map((item, nextPos) => {
        const match = matches.find((m) => m.nextIndex === nextPos);
        const matchedPrevPos = match ? match.prevIndex : -1;

        if (matchedPrevPos !== -1 && prevPositions[matchedPrevPos] !== undefined && newPositions[nextPos] !== undefined) {
          const deltaX = prevPositions[matchedPrevPos] - newPositions[nextPos];
          return {
            ...item,
            deltaX,
            status: "moving",
          };
        }
        return item;
      })
    );

    // Settle transition after duration
    const settleTimeout = setTimeout(() => {
      setIsTransitioning(false);
      setCharItems((prev) =>
        prev.map((item) => ({
          ...item,
          deltaX: 0,
          status: "stable",
        }))
      );
    }, transitionDuration);

    return () => clearTimeout(settleTimeout);
  }, [currentIndex, isTransitioning, prefersReducedMotion, phrases, transitionDuration]);

  const currentPhrase = phrases[currentIndex] || "";

  return (
    <div className={`relative inline-flex items-baseline ${className}`}>
      {/* Accessible screen reader announcement */}
      <span className="sr-only" aria-live="polite">
        {currentPhrase}
      </span>

      {/* Visual letter-level morphing container */}
      <span
        ref={containerRef}
        aria-hidden="true"
        className="inline-flex flex-wrap items-baseline whitespace-pre select-none tracking-[-0.01em]"
      >
        {charItems.map((item, idx) => {
          const isSpace = item.char === " ";

          if (isSpace) {
            return (
              <span
                key={item.id}
                ref={(el) => {
                  spanRefs.current[idx] = el;
                }}
                className="inline-block w-[0.28em]"
              >
                {" "}
              </span>
            );
          }

          // Compute styles based on letter state
          let transform = "translate3d(0, 0, 0)";
          let opacity = 1;
          let filter = "blur(0px)";
          let color = textColor;
          let transition = `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${transitionDuration}ms ease-out, filter ${transitionDuration}ms ease-out, color ${transitionDuration}ms ease-out`;

          if (prefersReducedMotion) {
            transition = "none";
          } else if (isTransitioning) {
            if (item.status === "moving" && item.deltaX !== 0) {
              // Smooth gliding across baseline with subtle bronze highlight
              color = accentColor;
              transform = "translate3d(0, 0, 0)";
            } else if (item.status === "entering") {
              // Entering letters resolve from a soft blur
              opacity = 1;
              filter = "blur(0px)";
            }
          }

          return (
            <span
              key={item.id}
              ref={(el) => {
                spanRefs.current[idx] = el;
              }}
              style={{
                transform,
                opacity,
                filter,
                color,
                transition,
                willChange: isTransitioning ? "transform, opacity, filter" : "auto",
              }}
              className="inline-block relative"
            >
              {item.char}
            </span>
          );
        })}
      </span>
    </div>
  );
}

export default EditorialTextMorph;
