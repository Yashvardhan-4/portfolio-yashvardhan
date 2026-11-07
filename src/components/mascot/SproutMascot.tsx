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

  // Parking & Habitat State
  const [isParked, setIsParked] = useState(false);
  const [isReturningHome, setIsReturningHome] = useState(false);
  const isParkedRef = useRef(false);
  const isReturningHomeRef = useRef(false);
  const houseBtnRef = useRef<HTMLButtonElement | null>(null);

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

  // Helper: compute exact pixel coordinates for Sprout nestled on the house rooftop
  const getHousePosition = useCallback(() => {
    if (houseBtnRef.current) {
      const rect = houseBtnRef.current.getBoundingClientRect();
      return {
        x: Math.round(rect.left + (rect.width - 46) / 2),
        y: Math.round(rect.top - 24),
      };
    }
    return {
      x: 25,
      y: typeof window !== "undefined" ? window.innerHeight - 76 : 600,
    };
  }, []);

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
      let savedParked = false;
      try {
        savedParked = localStorage.getItem("sprout_mascot_parked") === "true";
      } catch {}

      if (savedParked) {
        setIsParked(true);
        isParkedRef.current = true;
        isSleepingRef.current = true;
        setMascotState("SLEEP");

        // Initial approximate coordinates near bottom-left
        const fallbackY = window.innerHeight - 76;
        posRef.current = { x: 25, y: fallbackY };
        targetRef.current = { x: 25, y: fallbackY };
        mouseRef.current = { x: 25, y: fallbackY };

        // Snap precisely onto the house button once layout is rendered
        requestAnimationFrame(() => {
          const hp = getHousePosition();
          posRef.current = hp;
          targetRef.current = hp;
          if (containerRef.current) {
            containerRef.current.style.transform = `translate3d(${hp.x}px, ${hp.y}px, 0)`;
          }
        });
      } else {
        const initX = Math.min(window.innerWidth - 80, Math.max(60, window.innerWidth * 0.8));
        const initY = Math.min(window.innerHeight - 100, Math.max(120, window.innerHeight * 0.35));
        posRef.current = { x: initX, y: initY };
        targetRef.current = { x: initX, y: initY };
        mouseRef.current = { x: initX, y: initY };
      }
    }
  }, [getHousePosition]);

  // Keep Sprout docked to the house button across browser resizes
  useEffect(() => {
    if (!isEnabled) return;
    const handleResize = () => {
      if (isParkedRef.current) {
        const hp = getHousePosition();
        posRef.current = hp;
        targetRef.current = hp;
        if (containerRef.current) {
          containerRef.current.style.transform = `translate3d(${hp.x}px, ${hp.y}px, 0)`;
        }
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [isEnabled, getHousePosition]);

  // Theme switch reaction: Sprout does an excited celebratory bounce (if not asleep in house)
  useEffect(() => {
    const handleThemeChange = () => {
      if (isParkedRef.current) return; // Keep undisturbed if parked
      setMascotState("HAPPY");
      jumpVelocityRef.current = -12;
      spawnParticle("leaf", 8, -22, isDarkMode ? "#00FFA3" : "#47785E");
      setTimeout(() => {
        if (!isParkedRef.current && !isWalkingRef.current) {
          setMascotState("IDLE");
        }
      }, 1200);
    };

    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, [isDarkMode, spawnParticle]);

  // Handle clicking the Mascot House / Terrarium button (Toggle Park / Wake)
  const handleTogglePark = useCallback(() => {
    // 1. If currently parked in the house -> Wake Sprout up and release to roam!
    if (isParkedRef.current) {
      setIsParked(false);
      isParkedRef.current = false;
      isSleepingRef.current = false;
      isReturningHomeRef.current = false;
      setIsReturningHome(false);
      try {
        localStorage.setItem("sprout_mascot_parked", "false");
      } catch {}

      setMascotState("JUMP");
      jumpVelocityRef.current = -13;
      spawnParticle("exclamation", 0, -22, isDarkMode ? "#C084FC" : "#EAA69D");

      setTimeout(() => {
        setMascotState("HAPPY");
        spawnParticle("leaf", 0, -22, isDarkMode ? "#A855F7" : "#47785E");
        setTimeout(() => {
          if (!isParkedRef.current && !isWalkingRef.current) {
            setMascotState("IDLE");
          }
        }, 700);
      }, 450);
      return;
    }

    // 2. If en route home -> Cancel walk and resume roaming
    if (isReturningHomeRef.current) {
      setIsReturningHome(false);
      isReturningHomeRef.current = false;
      isWalkingRef.current = false;
      setMascotState("HAPPY");
      jumpVelocityRef.current = -10;
      spawnParticle("leaf", 0, -22, isDarkMode ? "#A855F7" : "#47785E");
      setTimeout(() => {
        if (!isParkedRef.current) setMascotState("IDLE");
      }, 600);
      return;
    }

    // 3. Sprout is roaming -> Guide Sprout home to park & sleep
    setIsReturningHome(true);
    isReturningHomeRef.current = true;
    activePerchRef.current = null;
    isSleepingRef.current = false;

    const housePos = getHousePosition();
    targetRef.current = housePos;
    isWalkingRef.current = true;
    spawnParticle("question", 0, -20, isDarkMode ? "#C084FC" : "#A9BDA8");
  }, [getHousePosition, isDarkMode, spawnParticle]);

  // Main interaction listeners: mouse tracking, card perching, button cheering, clicks
  useEffect(() => {
    if (!isEnabled) return;

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      lastActiveTime.current = Date.now();

      // If parked or returning home, do not track mouse or roam!
      if (isParkedRef.current || isReturningHomeRef.current) {
        return;
      }

      // Wake up if sleeping elsewhere on page
      if (isSleepingRef.current) {
        isSleepingRef.current = false;
        setMascotState("WAKE_UP");
        jumpVelocityRef.current = -9;
        spawnParticle("exclamation", 0, -20, isDarkMode ? "#C084FC" : "#EAA69D");
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
      // If mouse is within 90px, Sprout stays in place and simply tracks with eyes.
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
          if (isSleepingRef.current || isParkedRef.current || isReturningHomeRef.current) return;

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

    // Click reaction: Sprout does an excited jump (unless parked)
    const handlePointerDown = (e: PointerEvent) => {
      // If click originated from the house button, ignore here
      if (houseBtnRef.current && houseBtnRef.current.contains(e.target as Node)) {
        return;
      }

      // If parked or returning home, do not disturb
      if (isParkedRef.current || isReturningHomeRef.current) {
        return;
      }

      lastActiveTime.current = Date.now();

      if (isSleepingRef.current) {
        isSleepingRef.current = false;
        setMascotState("WAKE_UP");
      } else {
        setMascotState("JUMP");
        jumpVelocityRef.current = -14;
        spawnParticle("exclamation", 0, -22, isDarkMode ? "#C084FC" : "#EAA69D");

        setTimeout(() => {
          setMascotState("HAPPY");
          setTimeout(() => {
            if (!isWalkingRef.current && !activePerchRef.current && !isParkedRef.current) {
              setMascotState("IDLE");
            }
          }, 700);
        }, 450);
      }
    };

    // SECTION & ELEMENT CONTEXTUAL INSPECTION / PERCHING
    const handleElementHover = (e: MouseEvent) => {
      if (isSleepingRef.current || isParkedRef.current || isReturningHomeRef.current) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. PROJECT CARDS: Perch cutely on the top edge/ledge of the card!
      const projectCard = target.closest(
        "article, .project-card, [data-project-card], [id^='project-']"
      ) as HTMLElement | null;

      if (projectCard && !projectCard.closest("header")) {
        const rect = projectCard.getBoundingClientRect();
        if (rect.width > 120 && rect.height > 100) {
          const perchX = Math.min(
            window.innerWidth - 60,
            Math.max(rect.left + 48, rect.left + rect.width * 0.4)
          );
          const perchY = Math.max(16, rect.top - 24);

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
      if (isParkedRef.current || isReturningHomeRef.current) return;

      const customEvent = e as CustomEvent<{ open: boolean; title?: string }>;
      if (customEvent.detail?.open) {
        isSleepingRef.current = false;
        lastActiveTime.current = Date.now();

        const modalX = Math.min(window.innerWidth - 64, window.innerWidth * 0.5 + 260);
        const modalY = Math.max(48, window.innerHeight * 0.12);
        targetRef.current = { x: modalX, y: modalY };
        isWalkingRef.current = true;

        setTimeout(() => {
          setMascotState("PERCH");
          spawnParticle("question", 0, -22, isDarkMode ? "#C084FC" : "#A9BDA8");
        }, 350);
      } else {
        setMascotState("HAPPY");
        jumpVelocityRef.current = -12;
        spawnParticle("leaf", 0, -22, isDarkMode ? "#A855F7" : "#47785E");
        activePerchRef.current = null;
        setTimeout(() => {
          if (!isParkedRef.current) setMascotState("IDLE");
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
  }, [isEnabled, isDarkMode, spawnParticle]);

  // Periodic Blink Timer (only when awake and idle)
  useEffect(() => {
    if (!isEnabled) return;

    const interval = setInterval(() => {
      if (
        !isSleepingRef.current &&
        !isWalkingRef.current &&
        !isParkedRef.current &&
        mascotState === "IDLE"
      ) {
        setMascotState("LOOK_AROUND");
        setTimeout(() => {
          if (!isSleepingRef.current && !isWalkingRef.current && !isParkedRef.current) {
            setMascotState("IDLE");
          }
        }, 220);
      }
    }, BLINK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isEnabled, mascotState]);

  // Sleep Z Particles Timer (works both for napping and while parked in house)
  useEffect(() => {
    if (!isEnabled || mascotState !== "SLEEP") return;
    isSleepingRef.current = true;

    const interval = setInterval(() => {
      spawnParticle("z", 4, -20, isDarkMode ? "#C084FC" : "#47785E");
    }, 2400);

    return () => clearInterval(interval);
  }, [isEnabled, mascotState, isDarkMode, spawnParticle]);

  // 60FPS AUTONOMOUS LOCOMOTION & PHYSICS ENGINE
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

      // Check sleep timeout for inactive roaming (skip if parked)
      const inactiveMs = Date.now() - lastActiveTime.current;
      if (
        inactiveMs > SLEEP_INACTIVITY_MS &&
        !isSleepingRef.current &&
        !isWalkingRef.current &&
        !isParkedRef.current &&
        !isReturningHomeRef.current
      ) {
        isSleepingRef.current = true;
        setMascotState("SLEEP");
      }

      // Update gaze pupils in real-time towards the mouse pointer (only if awake & not parked)
      if (!isParkedRef.current && !isSleepingRef.current) {
        const mouseDx = mouseRef.current.x - currentX;
        const mouseDy = mouseRef.current.y - currentY;
        const rawPupilX = Math.max(-1, Math.min(1, Math.round(mouseDx / 55)));
        const rawPupilY = Math.max(-1, Math.min(1, Math.round(mouseDy / 55)));
        const orientedPupilX = facing === "left" ? -rawPupilX : rawPupilX;
        setPupilOffset({ x: orientedPupilX, y: rawPupilY });
      } else {
        setPupilOffset({ x: 0, y: 0 });
      }

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

      // AUTONOMOUS WALKING LOCOMOTION
      if (isWalkingRef.current && distance > 10) {
        // Face movement direction
        if (Math.abs(dx) > 2) {
          setFacing(dx > 0 ? "right" : "left");
        }

        // Running speed if target is far away (> 320px)
        const isRunning = distance > 320;
        currentSpeedRef.current = isRunning ? RUN_SPEED : WALK_SPEED;

        // Move a steady step per frame
        const moveRatio = Math.min(1, currentSpeedRef.current / distance);
        const nextX = currentX + dx * moveRatio;
        const nextY = currentY + dy * moveRatio;

        posRef.current = { x: nextX, y: nextY };

        // Discrete step-hop cadence
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

        // A. If Sprout arrived at the house -> PARK & GO TO SLEEP
        if (isReturningHomeRef.current) {
          isReturningHomeRef.current = false;
          setIsReturningHome(false);
          setIsParked(true);
          isParkedRef.current = true;
          isSleepingRef.current = true;
          try {
            localStorage.setItem("sprout_mascot_parked", "true");
          } catch {}

          const hp = getHousePosition();
          posRef.current = hp;
          targetRef.current = hp;

          setMascotState("SLEEP");
          spawnParticle("z", 4, -20, isDarkMode ? "#C084FC" : "#47785E");
          return;
        }

        // B. If arrived at a card perch anchor -> sit cutely on the ledge
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
  }, [isEnabled, isReducedMotion, mascotState, facing, isDarkMode, getHousePosition, spawnParticle]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      {/* 1. Mascot Habitat / Greenhouse House Button (Fixed Bottom-Left) */}
      <aside
        aria-label="Mascot companion habitat controls"
        className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 select-none group"
      >
        {/* Tooltip Monospace Pill */}
        <div
          className="absolute bottom-full left-0 mb-2 pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0"
          role="tooltip"
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-md shadow-lg text-[11px] font-mono tracking-wider whitespace-nowrap text-[var(--fg)]">
            <span
              className="w-1.5 h-1.5 rounded-full inline-block shrink-0 transition-colors duration-300"
              style={{
                backgroundColor: isParked
                  ? isDarkMode
                    ? "#C084FC"
                    : "#47785E"
                  : isReturningHome
                  ? "#F59E0B"
                  : "#10B981",
              }}
            />
            <span>
              {isParked
                ? "Sprout asleep · Click to wake up"
                : isReturningHome
                ? "Sprout is heading home..."
                : "Park Sprout in House"}
            </span>
            <kbd className="text-[9px] px-1 py-0.5 rounded bg-[var(--surface)] text-[var(--fg-muted)] border border-[var(--border)] font-mono ml-0.5">
              {isParked ? "WAKE" : "PARK"}
            </kbd>
          </div>
        </div>

        {/* House Button Trigger */}
        <button
          ref={houseBtnRef}
          type="button"
          onClick={handleTogglePark}
          aria-label={
            isParked
              ? "Mascot Sprout is asleep in house. Click to wake up and roam."
              : isReturningHome
              ? "Mascot Sprout is returning to house. Click to cancel."
              : "Click to send mascot Sprout to house to sleep."
          }
          aria-pressed={isParked}
          className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 active:scale-95 cursor-pointer pointer-events-auto border ${
            isDarkMode
              ? "bg-[#10141D]/90 border-[#1E2638] hover:border-[#A855F7]/50 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:shadow-[0_0_16px_rgba(168,85,247,0.25)]"
              : "bg-[#FAFBF7]/90 border-[#DFE2D2] hover:border-[#47785E]/50 shadow-sm hover:shadow-md"
          } backdrop-blur-md`}
        >
          {/* Terrarium / House SVG Graphic */}
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="transition-transform duration-300 group-hover:scale-105"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Dome Arch */}
            <path
              d="M3 20V10a9 9 0 0 1 18 0v10"
              stroke={
                isDarkMode
                  ? isParked
                    ? "#C084FC"
                    : "#243247"
                  : isParked
                  ? "#47785E"
                  : "#718E7B"
              }
              fill={
                isDarkMode
                  ? isParked
                    ? "rgba(168, 85, 247, 0.08)"
                    : "rgba(16, 20, 29, 0.6)"
                  : isParked
                  ? "rgba(71, 120, 94, 0.08)"
                  : "rgba(243, 243, 233, 0.5)"
              }
            />
            {/* Base Foundation */}
            <path
              d="M2 20h20"
              stroke={isDarkMode ? "#A855F7" : "#47785E"}
              strokeWidth="2"
            />
            {/* Doorway / Entrance Arch */}
            <path
              d="M9 20v-5a3 3 0 0 1 6 0v5"
              stroke={
                isDarkMode
                  ? isParked
                    ? "#C084FC"
                    : "#32435F"
                  : isParked
                  ? "#47785E"
                  : "#A9BDA8"
              }
              fill={
                isDarkMode
                  ? isParked
                    ? "rgba(168, 85, 247, 0.18)"
                    : "rgba(8, 11, 18, 0.7)"
                  : isParked
                  ? "rgba(71, 120, 94, 0.18)"
                  : "rgba(223, 226, 210, 0.4)"
              }
            />
            {/* Interior Plant / Sprout Symbol */}
            <path
              d="M12 11c0-2 1.5-3 3-3-1 2-2 3-3 3z"
              fill={isDarkMode ? "#A855F7" : "#47785E"}
              stroke="none"
            />
            <path
              d="M12 11c0-1.8-1.2-2.8-2.5-2.8.8 1.8 1.8 2.8 2.5 2.8z"
              fill={isDarkMode ? "#C084FC" : "#6AA885"}
              stroke="none"
            />
          </svg>

          {/* Live Status Pill Beacon */}
          <span
            className={`absolute top-1 right-1 w-2 h-2 rounded-full ring-2 ${
              isDarkMode ? "ring-[#10141D]" : "ring-[#FAFBF7]"
            } ${
              isParked
                ? isDarkMode
                  ? "bg-[#A855F7] shadow-[0_0_6px_#A855F7]"
                  : "bg-[#47785E]"
                : isReturningHome
                ? "bg-amber-400 animate-ping"
                : "bg-emerald-500 animate-pulse"
            }`}
          />
        </button>
      </aside>

      {/* 2. Interactive Mascot Companion Sprout Layer */}
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
                      color: p.color || (isDarkMode ? "#C084FC" : "#47785E"),
                      textShadow: isDarkMode
                        ? "0 0 8px rgba(192, 132, 252, 0.7)"
                        : "0 1px 2px rgba(0,0,0,0.5)",
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
                    className="absolute left-1/2 -translate-x-1/2 font-mono font-black text-sm animate-sprout-pop"
                    style={{
                      top: `${p.y}px`,
                      color: p.color || (isDarkMode ? "#C084FC" : "#EAA69D"),
                      textShadow: isDarkMode ? "0 0 8px rgba(192, 132, 252, 0.7)" : undefined,
                    }}
                  >
                    !
                  </div>
                );
              }

              if (p.type === "question") {
                return (
                  <div
                    key={p.id}
                    className="absolute left-1/2 -translate-x-1/2 font-mono font-bold text-xs animate-sprout-pop"
                    style={{
                      top: `${p.y}px`,
                      color: p.color || (isDarkMode ? "#00FFA3" : "#A9BDA8"),
                      textShadow: isDarkMode ? "0 0 6px rgba(0, 255, 163, 0.6)" : undefined,
                    }}
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
                      fill: p.color || (isDarkMode ? "#00FFA3" : "#47785E"),
                      filter: isDarkMode
                        ? "drop-shadow(0 0 4px rgba(0, 255, 163, 0.7))"
                        : undefined,
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
    </>
  );
}

export default SproutMascot;
