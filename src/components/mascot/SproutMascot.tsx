"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";
import { SproutPixelArt } from "./SproutPixelArt";
import { LIGHT_PALETTE, DARK_PALETTE } from "./sprout-frames";
import { MascotState, FacingDirection, FloatingParticle, CardPerchAnchor } from "./sprout-types";
import "./SproutMascot.css";

const SLEEP_INACTIVITY_MS = 22000; // 22s of inactivity
const BLINK_INTERVAL_MS = 4000;
const WALK_SPEED = 2.1; // Autonomous pet walking speed (pixels per frame)
const RUN_SPEED = 3.6; // Running speed when user is far away

export function SproutMascot() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const palette = isDarkMode ? DARK_PALETTE : LIGHT_PALETTE;

  // Mascot display state
  const [mascotState, setMascotState] = useState<MascotState>("IDLE");
  const [facing, setFacing] = useState<FacingDirection>("right");
  const [hopY, setHopY] = useState(0);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [stepPhase, setStepPhase] = useState<0 | 1>(0);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // References for autonomous physics loop (zero React re-renders during motion)
  const posRef = useRef({ x: 140, y: 240 });
  const targetRef = useRef({ x: 140, y: 240 });
  const mouseRef = useRef({ x: 140, y: 240 });
  const lastActiveTime = useRef(Date.now());
  const rafId = useRef<number | null>(null);

  // Autonomous walking state
  const isWalkingRef = useRef(false);
  const walkDecisionTimer = useRef<NodeJS.Timeout | null>(null);
  const walkCycleStep = useRef(0);
  const currentSpeedRef = useRef(WALK_SPEED);
  const jumpVelocityRef = useRef(0);
  const jumpOffsetRef = useRef(0);
  const activePerchRef = useRef<CardPerchAnchor | null>(null);
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

  // Hardware capability check: only on devices with fine pointer & hover (desktop)
  useEffect(() => {
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setIsEnabled(hasFinePointer);
    setIsReducedMotion(prefersReduced);

    if (typeof window !== "undefined") {
      const initX = Math.min(window.innerWidth - 80, Math.max(60, window.innerWidth * 0.8));
      const initY = Math.min(window.innerHeight - 100, Math.max(120, window.innerHeight * 0.35));
      posRef.current = { x: initX, y: initY };
      targetRef.current = { x: initX, y: initY };
      mouseRef.current = { x: initX, y: initY };
    }
  }, []);

  // Theme switch reaction: Sprout does an excited celebratory bounce!
  useEffect(() => {
    const handleThemeChange = () => {
      setMascotState("HAPPY");
      jumpVelocityRef.current = -12;
      spawnParticle("leaf", 8, -22, isDarkMode ? "#80ED99" : "#47785E");
      setTimeout(() => {
        setMascotState("IDLE");
      }, 1200);
    };

    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, [isDarkMode, spawnParticle]);

  // Main interaction listeners: mouse tracking, card perching, button cheering, clicks
  useEffect(() => {
    if (!isEnabled) return;

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      lastActiveTime.current = Date.now();

      // Wake up if sleeping
      if (isSleepingRef.current) {
        isSleepingRef.current = false;
        setMascotState("WAKE_UP");
        jumpVelocityRef.current = -9;
        spawnParticle("exclamation", 0, -20);
        setTimeout(() => {
          setMascotState("IDLE");
        }, 500);
      }

      // If currently perching on a card, stay perching unless mouse moves far away (> 240px)
      if (activePerchRef.current) {
        const distFromPerch = Math.hypot(
          e.clientX - activePerchRef.current.x,
          e.clientY - activePerchRef.current.y
        );
        if (distFromPerch < 220) {
          return; // Continue sitting on the card happily!
        } else {
          activePerchRef.current = null; // Hop off ledge
        }
      }

      // Check distance between Sprout's current position and the mouse
      const distToMouse = Math.hypot(e.clientX - posRef.current.x, e.clientY - posRef.current.y);

      // PERSONAL SPACE BUBBLE:
      // If mouse is within 90px, Sprout DOES NOT walk! It stays in place and simply tracks with eyes.
      if (distToMouse < 90) {
        if (isWalkingRef.current && distToMouse < 60) {
          isWalkingRef.current = false;
          setMascotState("IDLE");
        }
        return;
      }

      // If mouse is farther away, Sprout starts walking after a brief natural hesitation
      if (!isWalkingRef.current) {
        if (walkDecisionTimer.current) clearTimeout(walkDecisionTimer.current);

        walkDecisionTimer.current = setTimeout(() => {
          if (isSleepingRef.current) return;

          // Target is beside the cursor (trailing side), never directly underneath it
          const isMouseRight = mouseRef.current.x >= posRef.current.x;
          const offsetX = isMouseRight ? -48 : 48;
          const offsetY = 32;

          targetRef.current = {
            x: Math.min(window.innerWidth - 56, Math.max(16, mouseRef.current.x + offsetX)),
            y: Math.min(window.innerHeight - 60, Math.max(20, mouseRef.current.y + offsetY)),
          };

          isWalkingRef.current = true;
        }, 220);
      } else {
        // While already walking, smoothly guide target destination near cursor
        const isMouseRight = e.clientX >= posRef.current.x;
        const offsetX = isMouseRight ? -48 : 48;
        const offsetY = 32;

        targetRef.current = {
          x: Math.min(window.innerWidth - 56, Math.max(16, e.clientX + offsetX)),
          y: Math.min(window.innerHeight - 60, Math.max(20, e.clientY + offsetY)),
        };
      }
    };

    // Click reaction: Sprout does an excited jump!
    const handlePointerDown = () => {
      lastActiveTime.current = Date.now();

      if (isSleepingRef.current) {
        isSleepingRef.current = false;
        setMascotState("WAKE_UP");
      } else {
        setMascotState("JUMP");
        jumpVelocityRef.current = -14;
        spawnParticle("exclamation", 0, -22);

        setTimeout(() => {
          setMascotState("HAPPY");
          setTimeout(() => {
            if (!isWalkingRef.current && !activePerchRef.current) {
              setMascotState("IDLE");
            }
          }, 700);
        }, 450);
      }
    };

    // SECTION & ELEMENT CONTEXTUAL INSPECTION / PERCHING:
    // When hovering over project cards, buttons, or inputs, Sprout perches on the edge or cheers!
    const handleElementHover = (e: MouseEvent) => {
      if (isSleepingRef.current) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. PROJECT CARDS: Perch cutely on the top edge/ledge of the card!
      const projectCard = target.closest(
        "article, .project-card, [data-project-card], [id^='project-']"
      ) as HTMLElement | null;

      if (projectCard && !projectCard.closest("header")) {
        const rect = projectCard.getBoundingClientRect();
        if (rect.width > 120 && rect.height > 100) {
          // Calculate top-edge perch coordinate (sitting right on top border)
          const perchX = Math.min(
            window.innerWidth - 60,
            Math.max(rect.left + 48, rect.left + rect.width * 0.4)
          );
          const perchY = Math.max(16, rect.top - 24); // sits on upper border line

          activePerchRef.current = {
            x: perchX,
            y: perchY,
            edge: "top",
            element: projectCard,
          };

          targetRef.current = { x: perchX, y: perchY };
          isWalkingRef.current = true;
          return;
        }
      }

      // 2. PRIMARY BUTTONS & CTAs: Stand adjacent and cheer!
      const button = target.closest("button, [role='button'], a.inline-flex") as HTMLElement | null;
      if (button && !button.closest("header") && !activePerchRef.current) {
        const rect = button.getBoundingClientRect();
        if (rect.width > 30) {
          // Position beside the button
          const isLeft = rect.left > 80;
          const cheerX = isLeft ? rect.left - 42 : rect.right + 12;
          const cheerY = Math.max(16, rect.top - 4);

          targetRef.current = { x: cheerX, y: cheerY };
          isWalkingRef.current = true;
          setMascotState("CHEER");
          return;
        }
      }

      // 3. CONTACT FORM INPUTS: Sit attentively at the top corner of the form
      const formInput = target.closest("input, textarea") as HTMLElement | null;
      if (formInput) {
        const form = formInput.closest("form") as HTMLElement | null;
        if (form) {
          const rect = form.getBoundingClientRect();
          const deskX = Math.min(window.innerWidth - 60, rect.right - 54);
          const deskY = Math.max(20, rect.top - 26);

          targetRef.current = { x: deskX, y: deskY };
          isWalkingRef.current = true;
          setMascotState("PERCH");
        }
      }
    };

    // Modal Inspection Event
    const handleModalInspect = (e: Event) => {
      const customEvent = e as CustomEvent<{ open: boolean; title?: string }>;
      if (customEvent.detail?.open) {
        isSleepingRef.current = false;
        lastActiveTime.current = Date.now();

        // Guide Sprout to perch on the top-right ledge of the modal window
        const modalX = Math.min(window.innerWidth - 64, window.innerWidth * 0.5 + 260);
        const modalY = Math.max(48, window.innerHeight * 0.12);
        targetRef.current = { x: modalX, y: modalY };
        isWalkingRef.current = true;

        setTimeout(() => {
          setMascotState("PERCH");
          spawnParticle("question", 0, -22);
        }, 350);
      } else {
        setMascotState("HAPPY");
        jumpVelocityRef.current = -12;
        spawnParticle("leaf", 0, -22);
        activePerchRef.current = null;
        setTimeout(() => {
          setMascotState("IDLE");
        }, 700);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("mouseover", handleElementHover, { passive: true });
    window.addEventListener("sprout-inspect-modal", handleModalInspect);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("mouseover", handleElementHover);
      window.removeEventListener("sprout-inspect-modal", handleModalInspect);
      if (walkDecisionTimer.current) clearTimeout(walkDecisionTimer.current);
    };
  }, [isEnabled, spawnParticle]);

  // Periodic Blink Timer
  useEffect(() => {
    if (!isEnabled) return;

    const interval = setInterval(() => {
      if (!isSleepingRef.current && !isWalkingRef.current && mascotState === "IDLE") {
        setMascotState("LOOK_AROUND");
        setTimeout(() => {
          if (!isSleepingRef.current && !isWalkingRef.current) setMascotState("IDLE");
        }, 220);
      }
    }, BLINK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isEnabled, mascotState]);

  // Sleep Z Particles Timer
  useEffect(() => {
    if (!isEnabled || mascotState !== "SLEEP") return;
    isSleepingRef.current = true;

    const interval = setInterval(() => {
      spawnParticle("z", 4, -20);
    }, 2400);

    return () => clearInterval(interval);
  }, [isEnabled, mascotState, spawnParticle]);

  // 60FPS AUTONOMOUS LOCOMOTION & PHYSICS ENGINE:
  // Decoupled from mouse speed — Sprout walks at its own steady pace with discrete step hops!
  useEffect(() => {
    if (!isEnabled) return;

    let prevTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min(50, currentTime - prevTime);
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
      if (inactiveMs > SLEEP_INACTIVITY_MS && !isSleepingRef.current && !isWalkingRef.current) {
        isSleepingRef.current = true;
        setMascotState("SLEEP");
      }

      // Update gaze pupils in real-time towards the mouse pointer
      const mouseDx = mouseRef.current.x - currentX;
      const mouseDy = mouseRef.current.y - currentY;
      const rawPupilX = Math.max(-1, Math.min(1, Math.round(mouseDx / 55)));
      const rawPupilY = Math.max(-1, Math.min(1, Math.round(mouseDy / 55)));
      const orientedPupilX = facing === "left" ? -rawPupilX : rawPupilX;
      setPupilOffset({ x: orientedPupilX, y: rawPupilY });

      // Handle vertical jump/cheer velocity
      if (jumpVelocityRef.current !== 0 || jumpOffsetRef.current < 0) {
        jumpOffsetRef.current += jumpVelocityRef.current;
        jumpVelocityRef.current += 0.85; // Gravity

        if (jumpOffsetRef.current >= 0) {
          jumpOffsetRef.current = 0;
          jumpVelocityRef.current = 0;
          setHopY(0);
        } else {
          setHopY(jumpOffsetRef.current);
        }
      }

      // AUTONOMOUS WALKING LOCOMOTION:
      // Sprout walks to target at fixed, capped speed with cute step cycles
      if (isWalkingRef.current && distance > 10) {
        // Face movement direction
        if (Math.abs(dx) > 2) {
          setFacing(dx > 0 ? "right" : "left");
        }

        // Running speed only if cursor is very far away (> 320px)
        const isRunning = distance > 320;
        currentSpeedRef.current = isRunning ? RUN_SPEED : WALK_SPEED;

        // Move a fixed step per frame (not dragging with mouse!)
        const moveRatio = Math.min(1, currentSpeedRef.current / distance);
        const nextX = currentX + dx * moveRatio;
        const nextY = currentY + dy * moveRatio;

        posRef.current = { x: nextX, y: nextY };

        // Discrete step-hop cadence (left foot, land, right foot, land)
        if (!isReducedMotion && jumpOffsetRef.current === 0) {
          walkCycleStep.current += dt * (isRunning ? 0.024 : 0.018);
          const hopHeight = isRunning ? 8 : 4.5;
          const currentHop = -Math.abs(Math.sin(walkCycleStep.current)) * hopHeight;
          setHopY(currentHop);

          // Alternating foot step frames
          const phase = Math.sin(walkCycleStep.current) >= 0 ? 0 : 1;
          setStepPhase(phase);

          if (mascotState !== "JUMP" && mascotState !== "HAPPY") {
            setMascotState(isRunning ? "RUN" : "FOLLOW");
          }
        }
      } else if (isWalkingRef.current && distance <= 10) {
        // ARRIVED AT DESTINATION!
        isWalkingRef.current = false;
        walkCycleStep.current = 0;
        setHopY(0);

        // If arrived at a card perch anchor, sit cutely on the ledge!
        if (activePerchRef.current) {
          setMascotState("PERCH");
        } else if (mascotState !== "SLEEP" && mascotState !== "HAPPY" && mascotState !== "JUMP") {
          setMascotState("IDLE");
        }
      }

      // Directly update container translation for silky 60fps performance
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isEnabled, isReducedMotion, mascotState, facing]);

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
                    color: isDarkMode ? "#80ED99" : "#47785E",
                    textShadow: "0 1px 2px rgba(0,0,0,0.5)",
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
                    fill: p.color || (isDarkMode ? "#80ED99" : "#47785E"),
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
          isDarkMode={isDarkMode}
          stepPhase={stepPhase}
        />
      </div>
    </aside>
  );
}

export default SproutMascot;
