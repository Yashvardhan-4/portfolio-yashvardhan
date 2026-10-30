"use client";

import { motion, MotionConfig } from "framer-motion";
import { useEffect, useMemo, useRef, useState, CSSProperties } from "react";

const AXES: Record<string, [string, number]> = {
  top: ["y", -1],
  bottom: ["y", 1],
  left: ["x", -1],
  right: ["x", 1],
};

const EASE_OUT = [0.33, 1, 0.68, 1];
const EASE_IN_OUT = [0.65, 0, 0.35, 1];
const EASE_IN = [0.55, 0, 0.9, 0.45];
const CSS_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const MOVE_KEYS = ["x", "y", "scale", "rotateX", "rotateY", "skewX"];
const INSTANT = { duration: 0 };

const SR_ONLY: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
  userSelect: "none",
};

const PIECE_STYLE: CSSProperties = {
  display: "inline-block",
  willChange: "transform, filter, opacity",
};

const WORD_STYLE: CSSProperties = { display: "inline-flex" };

const blurTo = (px: number) => `blur(${Math.max(0, px)}px)`;

interface EffectDef {
  from: Record<string, any>;
  steps: Record<string, any>[];
  exit: Record<string, any>;
  times: number[];
  fade: any;
  bounce?: number | null;
  settle: number;
  origin?: Record<string, any>;
  exitEase: any;
}

const buildEffect = (
  effect: string,
  direction: string,
  blur: number,
  distance: number
): EffectDef => {
  const [axis, sign] = AXES[direction] || AXES.top;
  const b = Math.max(0, blur);
  const d = distance;

  if (effect === "zoom") {
    return {
      from: {
        filter: blurTo(b * 1.2),
        opacity: 0,
        scale: 1.4,
        [axis]: sign * d * 0.35,
      },
      steps: [
        { filter: blurTo(b * 0.2), opacity: 0.9, scale: 0.97, [axis]: -sign * d * 0.03 },
        { filter: blurTo(0), opacity: 1, scale: 1, [axis]: 0 },
      ],
      exit: { filter: blurTo(b), opacity: 0, scale: 0.82, [axis]: -sign * d * 0.2 },
      times: [0, 0.6, 1],
      fade: EASE_OUT,
      bounce: 0.25,
      settle: 0.5,
      exitEase: EASE_IN,
    };
  }

  if (effect === "focus") {
    const soft = { filter: blurTo(b * 1.4), opacity: 0.32, scale: 1.12 };
    return {
      from: soft,
      steps: [
        { filter: blurTo(b * 0.1), opacity: 0.95, scale: 0.995 },
        { filter: blurTo(0), opacity: 1, scale: 1 },
      ],
      exit: soft,
      times: [0, 0.72, 1],
      fade: EASE_IN_OUT,
      bounce: null,
      settle: 1,
      exitEase: EASE_IN_OUT,
    };
  }

  return {
    from: { filter: blurTo(b), opacity: 0, [axis]: sign * d },
    steps: [
      { filter: blurTo(b / 2), opacity: 0.5, [axis]: (-sign * d) / 10 },
      { filter: blurTo(0), opacity: 1, [axis]: 0 },
    ],
    exit: { filter: blurTo(b), opacity: 0, [axis]: -sign * d * 0.6 },
    times: [0, 0.5, 1],
    fade: "linear",
    bounce: 0.35,
    settle: 0.5,
    exitEase: EASE_IN,
  };
};

const buildKeyframes = (from: Record<string, any>, steps: Record<string, any>[]) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
  const keyframes: Record<string, any[]> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

const buildRanks = (count: number, staggerFrom: string, seedText: string) => {
  const ranks = Array.from({ length: count }, (_, i) => i);
  if (staggerFrom === "end") return ranks.map((i) => count - 1 - i);
  if (staggerFrom === "center") {
    const mid = (count - 1) / 2;
    const offset = count % 2 === 0 ? 0.5 : 0;
    return ranks.map((i) => Math.abs(i - mid) - offset);
  }
  return ranks;
};

export interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom" | "left" | "right";
  threshold?: number;
  rootMargin?: string;
  stepDuration?: number;
  blur?: number;
  distance?: number;
  effect?: "blur" | "zoom" | "focus";
  staggerFrom?: "start" | "end" | "center";
  trigger?: "view" | "hover" | "load";
  loop?: boolean;
  loopDelay?: number;
  color?: string;
  focusOnHover?: boolean;
}

export function BlurText({
  text = "",
  delay = 120,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  stepDuration = 0.35,
  blur = 12,
  distance = 36,
  effect = "blur",
  staggerFrom = "start",
  trigger = "view",
  loop = false,
  loopDelay = 2,
  color,
  focusOnHover = false,
}: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [phase, setPhase] = useState<"from" | "in" | "out" | "rest">(
    trigger === "load" ? "in" : trigger === "hover" ? "rest" : "from"
  );
  const firstPhase = useRef(phase).current;
  const [focusWord, setFocusWord] = useState(-1);
  const settledRef = useRef(phase === "rest");

  const fx = useMemo(
    () => buildEffect(effect, direction, blur, distance),
    [effect, direction, blur, distance]
  );

  const fromSnapshot = fx.from;
  const toSnapshots = fx.steps;
  const exitSnapshot = fx.exit;
  const restSnapshot = toSnapshots[toSnapshots.length - 1];

  const animateKeyframes = useMemo(
    () => buildKeyframes(fromSnapshot, [restSnapshot]),
    [fromSnapshot, restSnapshot]
  );

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const stagger = Math.max(0, delay) / 1000;
  const exitDuration = stepDuration * 1.3;
  const exitStagger = stagger * 0.4;

  const words = useMemo(() => text.split(" "), [text]);

  const pieces = useMemo(() => {
    const list: { word: number; content: string; key: string }[] = [];
    words.forEach((word, w) => {
      const isLast = w === words.length - 1;
      if (animateBy === "words") {
        list.push({
          word: w,
          content: isLast ? word : `${word}\u00A0`,
          key: `word-${w}`,
        });
        return;
      }
      Array.from(word).forEach((char, c) =>
        list.push({ word: w, content: char, key: `char-${w}-${c}` })
      );
      if (!isLast) list.push({ word: w, content: "\u00A0", key: `space-${w}` });
    });
    return list;
  }, [words, animateBy]);

  const groups = useMemo(() => {
    const list: number[][] = words.map(() => []);
    pieces.forEach((piece, index) => list[piece.word]?.push(index));
    return list;
  }, [words, pieces]);

  const ranks = useMemo(
    () => buildRanks(pieces.length, staggerFrom, text),
    [pieces.length, staggerFrom, text]
  );
  const maxRank = ranks.reduce((max, rank) => Math.max(max, rank), 0);
  const inTotal =
    (totalDuration * Math.max(1, fx.settle * 2.2) + maxRank * stagger) * 1000;

  useEffect(() => {
    if (phase !== "from") return undefined;
    if (trigger === "load") {
      setPhase("in");
      return undefined;
    }
    const element = ref.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("in");
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [phase, trigger, threshold, rootMargin]);

  useEffect(() => {
    let timer = 0;
    if (phase === "in") {
      settledRef.current = false;
      timer = window.setTimeout(() => {
        settledRef.current = true;
      }, inTotal);
    }
    return () => window.clearTimeout(timer);
  }, [phase, inTotal]);

  const replay = () => {
    if (phase === "out" || phase === "from") return;
    setPhase("out");
    setTimeout(() => setPhase("in"), 200);
  };

  const inTransition = (rank: number) => {
    const delayed = rank * stagger;
    const move = {
      type: "spring",
      visualDuration: totalDuration * fx.settle,
      bounce: fx.bounce ?? 0.25,
      delay: delayed,
    };
    return {
      duration: totalDuration,
      delay: delayed,
      ease: fx.fade,
      y: move,
      scale: move,
    };
  };

  const target =
    phase === "in"
      ? animateKeyframes
      : phase === "out"
      ? exitSnapshot
      : phase === "rest"
      ? restSnapshot
      : fromSnapshot;

  const dim = Math.min(6, Math.max(2, blur * 0.3));

  const renderPiece = (index: number) => {
    const piece = pieces[index];
    const rank = ranks[index];
    const transition =
      phase === "in"
        ? (inTransition(rank) as any)
        : phase === "out"
        ? { duration: exitDuration, ease: fx.exitEase, delay: rank * exitStagger }
        : INSTANT;

    return (
      <motion.span
        aria-hidden="true"
        key={piece.key}
        style={PIECE_STYLE}
        initial={firstPhase === "rest" ? false : fromSnapshot}
        animate={target}
        transition={transition}
      >
        {piece.content}
      </motion.span>
    );
  };

  const wordStyle = (w: number): CSSProperties => {
    if (!focusOnHover) return WORD_STYLE;
    const dimmed = focusWord !== -1 && focusWord !== w;
    return {
      ...WORD_STYLE,
      filter: dimmed ? `blur(${dim}px)` : "blur(0px)",
      opacity: dimmed ? 0.35 : 1,
      transition: `filter 0.4s ${CSS_EASE}, opacity 0.4s ${CSS_EASE}`,
    };
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={ref}
        className={className}
        style={{
          display: "flex",
          flexWrap: "wrap",
          color,
          cursor: trigger === "hover" ? "pointer" : undefined,
        }}
        onPointerEnter={trigger === "hover" ? replay : undefined}
      >
        <span style={SR_ONLY}>{text}</span>
        {groups.map((indices, w) => (
          <span
            key={`word-${w}`}
            style={wordStyle(w)}
            onPointerEnter={focusOnHover ? () => setFocusWord(w) : undefined}
            onPointerLeave={focusOnHover ? () => setFocusWord(-1) : undefined}
          >
            {indices.map(renderPiece)}
          </span>
        ))}
      </div>
    </MotionConfig>
  );
}

export default BlurText;
