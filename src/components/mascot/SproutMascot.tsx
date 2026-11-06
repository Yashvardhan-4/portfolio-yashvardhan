"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";
import { SproutPixelArt } from "./SproutPixelArt";
import { LIGHT_PALETTE, DARK_PALETTE } from "./sprout-frames";
import { MascotState, FacingDirection, FloatingParticle } from "./sprout-types";
import "./SproutMascot.css";

const SLEEP_INACTIVITY_MS = 22000; // 22 seconds of inactivity triggers sleep
const BLINK_INTERVAL_MS = 3800; // Blink rhythm

export function SproutMascot() {
  const { theme } = useTheme();
  const palette = theme === "light" ? LIGHT_PALETTE : DARK_PALETTE;

  // Mascot state
  const [mascotState, setMascotState] = useState<MascotState>("IDLE");
  const [facing, setFacing] = useState<FacingDirection>("right");
  const [hopY, setHopY] = useState(0);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // References for 60fps RAF loop without React re-renders
  const posRef = useRef({ x: 120, y: 220 });
  const targetRef = useRef({ x: 120, y: 220 });
  const mouseRef = useRef({ x: 120, y: 220 });
  const lastMousePos = useRef({ x: 120, y: 220 });
  const lastActiveTime = useRef(Date.now());
  const rafId = useRef<number | null>(null);
  const hopPhaseRef = useRef(0);
  const jumpVelocityRef = useRef(0);
  const jumpOffsetRef = useRef(0);
  const inspectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sleepZTimerRef = useRef<NodeJS.Timeout | null>(null);
  const blinkTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isSleepingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particleIdCounter = useRef(0);

  // Spawn floating particle helper
  const spawnParticle = useCallback(
    (type: FloatingParticle["type"], offsetX = 0, offsetY = -18, color?: string) => {
      const id = ++particleIdCounter.current;
      const newParticle: FloatingParticle = {
        id,
        type,
        x: offsetX,
        y: offsetY,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.6,
        opacity: 1,
        scale: 1,
        rotation: 0,
        life: 0,
        maxLife: type === "z" ? 2800 : 1300,
        color,
      };

      setParticles((prev) => [...prev.slice(-6), newParticle]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, newParticle.maxLife);
    },
    []
  );

  // Check hardware capability: fine pointer & hover (desktop / laptop mice)
  useEffect(() => {
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setIsEnabled(hasFinePointer);
    setIsReducedMotion(prefersReduced);

    // Initial position on screen
    if (typeof window !== "undefined") {
      const initX = Math.min(window.innerWidth - 80, Math.max(60, window.innerWidth * 0.75));
      const initY = Math.min(window.innerHeight - 100, Math.max(120, window.innerHeight * 0.4));
      posRef.current = { x: initX, y: initY };
      targetRef.current = { x: initX, y: initY };
      mouseRef.current = { x: initX, y: initY };
    }
  }, []);

  // Theme switch listener: Sprout does a happy celebrate hop
  useEffect(() => {
    const handleThemeChange = () => {
      setMascotState("HAPPY");
      jumpVelocityRef.current = -12;
      spawnParticle("leaf", 10, -22, theme === "light" ? "#47785E" : "#4E9B70");
      setTimeout(() => {
        setMascotState("IDLE");
      }, 1400);
    };

    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, [theme, spawnParticle]);

  // Main interaction listeners: mouse move, clicks, element inspections
  useEffect(() => {
    if (!isEnabled) return;

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const distFromLast = Math.hypot(
        e.clientX - lastMousePos.current.x,
        e.clientY - lastMousePos.current.y
      );

      // Wake up from sleep if cursor moved meaningfully
      if (isSleepingRef.current && distFromLast > 8) {
        isSleepingRef.current = false;
        setMascotState("WAKE_UP");
        jumpVelocityRef.current = -10;
        spawnParticle("exclamation", 0, -20);
        setTimeout(() => {
          setMascotState("IDLE");
        }, 600);
      }

      lastActiveTime.current = Date.now();
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      // Calculate companion offset:
      // Sprout travels beside the cursor (trailing side) without covering the pointer
      const isMovingRight = e.clientX >= posRef.current.x;
      const offsetX = isMovingRight ? -38 : 38;
      const offsetY = 28;

      targetRef.current = {
        x: Math.min(window.innerWidth - 56, Math.max(16, e.clientX + offsetX)),
        y: Math.min(window.innerHeight - 60, Math.max(20, e.clientY + offsetY)),
      };
    };

    const handlePointerDown = () => {
      lastActiveTime.current = Date.now();

      // If sleeping, immediately wake up
      if (isSleepingRef.current) {
        isSleepingRef.current = false;
        setMascotState("WAKE_UP");
      } else {
        // Perform excited surprise jump on user click!
        setMascotState("JUMP");
        jumpVelocityRef.current = -15;
        spawnParticle("exclamation", 0, -22);

        setTimeout(() => {
          setMascotState("HAPPY");
          setTimeout(() => {
            setMascotState("IDLE");
          }, 800);
        }, 500);
      }
    };

    // Inspect hovered interactive elements (project cards, CTAs, links)
    const handleElementHover = (e: MouseEvent) => {
      if (isSleepingRef.current) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const card = target.closest(
        "a, button, [role='button'], .project-card, article, #work, #about, #contact"
      );

      if (card && card !== target.closest("header")) {
        const rect = card.getBoundingClientRect();
        // Check if card is visible
        if (rect.width > 20 && rect.height > 20) {
          // Guide Sprout to peek curiously near the corner of the hovered element
          const peekX = Math.min(
            window.innerWidth - 56,
            Math.max(16, rect.right > window.innerWidth / 2 ? rect.left - 36 : rect.right + 12)
          );
          const peekY = Math.min(window.innerHeight - 60, Math.max(20, rect.top + 8));

          targetRef.current = { x: peekX, y: peekY };

          if (inspectTimeoutRef.current) clearTimeout(inspectTimeoutRef.current);
          setMascotState("INSPECT");
          spawnParticle("question", 0, -22);

          inspectTimeoutRef.current = setTimeout(() => {
            setMascotState("IDLE");
          }, 2400);
        }
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("mouseover", handleElementHover, { passive: true });

    const handleModalInspect = (e: Event) => {
      const customEvent = e as CustomEvent<{ open: boolean; title?: string }>;
      if (customEvent.detail?.open) {
        isSleepingRef.current = false;
        lastActiveTime.current = Date.now();

        // Guide Sprout to peek over the top-right edge of the modal
        const modalX = Math.min(window.innerWidth - 64, Math.max(20, window.innerWidth * 0.5 + 260));
        const modalY = Math.max(48, window.innerHeight * 0.12);
        targetRef.current = { x: modalX, y: modalY };

        setMascotState("INSPECT");
        spawnParticle("question", 0, -22);
      } else {
        setMascotState("HAPPY");
        jumpVelocityRef.current = -12;
        spawnParticle("leaf", 0, -22);
        setTimeout(() => {
          setMascotState("IDLE");
        }, 800);
      }
    };

    window.addEventListener("sprout-inspect-modal", handleModalInspect);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("mouseover", handleElementHover);
      window.removeEventListener("sprout-inspect-modal", handleModalInspect);
      if (inspectTimeoutRef.current) clearTimeout(inspectTimeoutRef.current);
    };
  }, [isEnabled, spawnParticle]);

  // Periodic Blink Timer
  useEffect(() => {
    if (!isEnabled) return;

    const scheduleBlink = () => {
      blinkTimerRef.current = setTimeout(() => {
        if (!isSleepingRef.current && mascotState === "IDLE") {
          setMascotState("LOOK_AROUND");
          setTimeout(() => {
            if (!isSleepingRef.current) setMascotState("IDLE");
          }, 200);
        }
        scheduleBlink();
      }, BLINK_INTERVAL_MS + Math.random() * 2000);
    };

    scheduleBlink();
    return () => {
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
    };
  }, [isEnabled, mascotState]);

  // Periodic Sleep Z Particle Spawner
  useEffect(() => {
    if (!isEnabled) return;

    if (mascotState === "SLEEP") {
      isSleepingRef.current = true;
      const interval = setInterval(() => {
        spawnParticle("z", 4, -20);
      }, 2400);
      sleepZTimerRef.current = interval as unknown as NodeJS.Timeout;
      return () => clearInterval(interval);
    }
  }, [isEnabled, mascotState, spawnParticle]);

  // 60FPS Physics & Animation Tick Loop
  useEffect(() => {
    if (!isEnabled) return;

    let prevTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min(64, currentTime - prevTime);
      prevTime = currentTime;

      const currentX = posRef.current.x;
      const currentY = posRef.current.y;
      const targetX = targetRef.current.x;
      const targetY = targetRef.current.y;

      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const distance = Math.hypot(dx, dy);

      // Check sleep timeout
      const inactiveMs = Date.now() - lastActiveTime.current;
      if (inactiveMs > SLEEP_INACTIVITY_MS && !isSleepingRef.current) {
        isSleepingRef.current = true;
        setMascotState("SLEEP");
      }

      // Smooth spring lerp for movement
      const lerpFactor = isReducedMotion ? 0.05 : 0.085;
      const nextX = currentX + dx * lerpFactor;
      const nextY = currentY + dy * lerpFactor;

      posRef.current = { x: nextX, y: nextY };

      // Update facing orientation
      if (Math.abs(dx) > 3) {
        setFacing(dx > 0 ? "right" : "left");
      }

      // Calculate dynamic pupil offset based on mouse pointer position
      const mouseDx = mouseRef.current.x - nextX;
      const mouseDy = mouseRef.current.y - nextY;
      const rawPupilX = Math.max(-1, Math.min(1, Math.round(mouseDx / 55)));
      const rawPupilY = Math.max(-1, Math.min(1, Math.round(mouseDy / 55)));

      // When flipped horizontally (facing left), adjust pupil X direction
      const orientedPupilX = dx < 0 ? -rawPupilX : rawPupilX;
      setPupilOffset({ x: orientedPupilX, y: rawPupilY });

      // Handle vertical jump & gravity physics
      if (jumpVelocityRef.current !== 0 || jumpOffsetRef.current < 0) {
        jumpOffsetRef.current += jumpVelocityRef.current;
        jumpVelocityRef.current += 0.85; // Gravity

        // Landing on ground plane
        if (jumpOffsetRef.current >= 0) {
          jumpOffsetRef.current = 0;
          jumpVelocityRef.current = 0;
          setHopY(0);
        } else {
          setHopY(jumpOffsetRef.current);
        }
      } else if (!isSleepingRef.current) {
        // Natural bouncy hops while walking / running
        if (distance > 10 && !isReducedMotion) {
          hopPhaseRef.current += dt * (distance > 140 ? 0.024 : 0.016);
          const hopHeight = distance > 140 ? 9 : 5;
          const currentHop = -Math.abs(Math.sin(hopPhaseRef.current)) * hopHeight;
          setHopY(currentHop);

          // State updates during locomotion
          if (mascotState !== "JUMP" && mascotState !== "HAPPY" && mascotState !== "INSPECT") {
            setMascotState(distance > 140 ? "RUN" : "FOLLOW");
          }
        } else {
          // Settled on ground
          hopPhaseRef.current = 0;
          setHopY(0);

          if (
            mascotState !== "SLEEP" &&
            mascotState !== "HAPPY" &&
            mascotState !== "JUMP" &&
            mascotState !== "INSPECT"
          ) {
            setMascotState("IDLE");
          }
        }
      }

      // Apply transform directly to container element for optimal 60fps performance
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isEnabled, isReducedMotion, mascotState]);

  // If touch device or disabled, render nothing
  if (!isEnabled) {
    return null;
  }

  return (
    <aside
      aria-label="Interactive Mascot Companion Sprout"
      className="fixed top-0 left-0 z-50 pointer-events-none select-none transition-opacity duration-300"
      style={{ willChange: "transform" }}
    >
      <div
        ref={containerRef}
        className="absolute top-0 left-0 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`,
        }}
      >
        {/* Floating Particles (Zzz, !, ?, Floating Leaf) */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p) => {
            if (p.type === "z") {
              return (
                <span
                  key={p.id}
                  className="absolute font-mono font-bold text-xs uppercase animate-sprout-z"
                  style={{
                    left: `calc(50% + ${p.x}px)`,
                    top: `${p.y}px`,
                    color: theme === "light" ? "#47785E" : "#B9D8C4",
                    textShadow: "0 1px 2px rgba(0,0,0,0.4)",
                  }}
                >
                  Z
                </span>
              );
            }

            if (p.type === "exclamation") {
              return (
                <div
                  key={p.id}
                  className="absolute left-1/2 -translate-x-1/2 font-mono font-black text-sm text-[#EAA69D] animate-sprout-pop"
                  style={{ top: `${p.y}px` }}
                >
                  !
                </div>
              );
            }

            if (p.type === "question") {
              return (
                <div
                  key={p.id}
                  className="absolute left-1/2 -translate-x-1/2 font-mono font-bold text-xs text-[#A9BDA8] animate-sprout-pop"
                  style={{ top: `${p.y}px` }}
                >
                  ?
                </div>
              );
            }

            if (p.type === "leaf") {
              return (
                <svg
                  key={p.id}
                  viewBox="0 0 10 10"
                  className="absolute w-3.5 h-3.5 animate-sprout-leaf"
                  style={{
                    left: `calc(50% + ${p.x}px)`,
                    top: `${p.y}px`,
                    fill: p.color || (theme === "light" ? "#47785E" : "#4E9B70"),
                  }}
                >
                  <path d="M5,1 C8,1 9,4 9,7 C9,9 7,9 5,9 C3,9 1,7 1,4 C1,2 3,1 5,1 Z" />
                </svg>
              );
            }

            return null;
          })}
        </div>

        {/* Master Sprout Character Art */}
        <SproutPixelArt
          state={mascotState}
          palette={palette}
          facing={facing}
          pupilOffset={pupilOffset}
          size={46}
          hopY={hopY}
          isSleeping={mascotState === "SLEEP"}
        />
      </div>
    </aside>
  );
}

export default SproutMascot;
