"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover";
}

const DEFAULT_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`";

export function DecryptedText({
  text,
  speed = 40,
  maxIterations = 12,
  sequential = true,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = DEFAULT_CHARS,
  className = "",
  parentClassName = "",
  encryptedClassName = "text-[#00F0FF] opacity-80",
  animateOn = "hover",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLSpanElement>(null);

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(""))).filter((c) => c !== " ")
    : characters.split("");

  const shuffleText = (
    originalText: string,
    currentRevealed: Set<number>
  ): string => {
    return originalText
      .split("")
      .map((char, i) => {
        if (char === " ") return " ";
        if (currentRevealed.has(i)) return originalText[i];
        return availableChars[Math.floor(Math.random() * availableChars.length)];
      })
      .join("");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let iteration = 0;

    if (isScrambling) {
      interval = setInterval(() => {
        setRevealedIndices((prevRevealed) => {
          if (sequential) {
            if (prevRevealed.size < text.length) {
              const nextIndex = getNextIndex(prevRevealed);
              const nextSet = new Set(prevRevealed);
              nextSet.add(nextIndex);
              setDisplayText(shuffleText(text, nextSet));
              return nextSet;
            } else {
              clearInterval(interval);
              setIsScrambling(false);
              setDisplayText(text);
              return prevRevealed;
            }
          } else {
            setDisplayText(shuffleText(text, prevRevealed));
            iteration++;
            if (iteration >= maxIterations) {
              clearInterval(interval);
              setIsScrambling(false);
              setDisplayText(text);
            }
            return prevRevealed;
          }
        });
      }, speed);
    } else {
      setDisplayText(text);
    }

    return () => clearInterval(interval);
  }, [isScrambling, text, speed, maxIterations, sequential]);

  const getNextIndex = (revealedSet: Set<number>): number => {
    const textLength = text.length;
    switch (revealDirection) {
      case "start":
        return revealedSet.size;
      case "end":
        return textLength - 1 - revealedSet.size;
      case "center": {
        const middle = Math.floor(textLength / 2);
        const offset = Math.floor(revealedSet.size / 2);
        const nextIndex =
          revealedSet.size % 2 === 0 ? middle + offset : middle - offset;
        if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
          return nextIndex;
        }
        for (let i = 0; i < textLength; i++) {
          if (!revealedSet.has(i)) return i;
        }
        return 0;
      }
      default:
        return revealedSet.size;
    }
  };

  useEffect(() => {
    if (animateOn === "view") {
      setIsScrambling(true);
      setRevealedIndices(new Set());
    }
  }, [animateOn]);

  const handleMouseEnter = () => {
    if (animateOn === "hover" && !isScrambling) {
      setIsHovering(true);
      setIsScrambling(true);
      setRevealedIndices(new Set());
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovering(false)}
      className={`inline-block whitespace-pre-wrap cursor-pointer ${parentClassName}`}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealed =
            revealedIndices.has(index) || !isScrambling || char === " ";
          return (
            <span
              key={index}
              className={isRevealed ? className : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
