"use client";

import React, { useMemo, useEffect, useState } from "react";
import { SPROUT_FRAMES } from "./sprout-frames";
import { MascotPalette, MascotState, FacingDirection } from "./sprout-types";

interface SproutPixelArtProps {
  state: MascotState;
  palette: MascotPalette;
  facing: FacingDirection;
  pupilOffset: { x: number; y: number };
  size?: number;
  hopY?: number;
  isSleeping?: boolean;
  isDarkMode?: boolean;
  stepPhase?: number; // 0 or 1 for alternating walk steps
}

export function SproutPixelArt({
  state,
  palette,
  facing,
  pupilOffset,
  size = 46,
  hopY = 0,
  isSleeping = false,
  isDarkMode = false,
  stepPhase = 0,
}: SproutPixelArtProps) {
  // Firefly spore orbit time for dark mode
  const [orbitAngle, setOrbitAngle] = useState(0);

  useEffect(() => {
    if (!isDarkMode) return;
    let animId: number;
    let start = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - start) * 0.0018;
      setOrbitAngle(elapsed);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isDarkMode]);

  // Frame mapping
  const frameKey = useMemo(() => {
    switch (state) {
      case "SLEEP":
        return "SLEEP";
      case "HAPPY":
        return "HAPPY";
      case "JUMP":
        return "JUMP";
      case "PERCH":
        return "PERCH";
      case "CHEER":
        return "CHEER";
      case "RUN":
        return "RUN_DASH";
      case "FOLLOW":
        return stepPhase === 0 ? "WALK_STEP_1" : "WALK_STEP_2";
      case "LOOK_AROUND":
      case "INSPECT":
        return "LOOK_SIDE";
      case "IDLE":
      default:
        return "IDLE";
    }
  }, [state, stepPhase]);

  const rawGrid = SPROUT_FRAMES[frameKey] || SPROUT_FRAMES.IDLE;

  // Build grouped SVG path data for crispEdges rendering
  const {
    outlinePath,
    bodyPath,
    bodyShadePath,
    bodyHighlightPath,
    leavesPath,
    leafHighlightPath,
    leafTipPath,
    blushPath,
    eyesPath,
    eyeShinePath,
    mouthPath,
    pawsPath,
  } = useMemo(() => {
    const paths: Record<string, string[]> = {
      O: [],
      B: [],
      S: [],
      H: [],
      L: [],
      G: [],
      T: [],
      P: [],
      E: [],
      W: [],
      M: [],
      K: [],
    };

    const hasDynamicPupils = frameKey !== "SLEEP" && frameKey !== "HAPPY";

    const pX = hasDynamicPupils ? Math.round(pupilOffset.x) : 0;
    const pY = hasDynamicPupils ? Math.round(pupilOffset.y) : 0;

    for (let r = 0; r < rawGrid.length; r++) {
      const rowStr = rawGrid[r];
      for (let c = 0; c < rowStr.length; c++) {
        const char = rowStr[c];
        if (char === "." || char === " ") continue;

        let drawX = c;
        let drawY = r;

        // In dark mode, upper leaf tips glow with leafTip color
        if (isDarkMode && char === "G" && r <= 4) {
          paths.T.push(`M${drawX},${drawY}h1v1h-1z`);
          continue;
        }

        // Apply pupil offset to eyes and eye shines only
        if (hasDynamicPupils && (char === "E" || char === "W")) {
          drawX = Math.max(7, Math.min(21, c + pX));
          drawY = Math.max(13, Math.min(18, r + pY));
        }

        if (paths[char]) {
          paths[char].push(`M${drawX},${drawY}h1v1h-1z`);
        }
      }
    }

    return {
      outlinePath: paths.O.join(" "),
      bodyPath: paths.B.join(" "),
      bodyShadePath: paths.S.join(" "),
      bodyHighlightPath: paths.H.join(" "),
      leavesPath: paths.L.join(" "),
      leafHighlightPath: paths.G.join(" "),
      leafTipPath: paths.T.join(" "),
      blushPath: paths.P.join(" "),
      eyesPath: paths.E.join(" "),
      eyeShinePath: paths.W.join(" "),
      mouthPath: paths.M.join(" "),
      pawsPath: paths.K.join(" "),
    };
  }, [rawGrid, frameKey, pupilOffset, isDarkMode]);

  // Ground shadow parameters reacting to hop/jump height
  const jumpHeight = Math.max(0, -hopY);
  const shadowScale = Math.max(0.35, 1 - jumpHeight / 48);
  const shadowOpacity = Math.max(0.1, 0.42 - jumpHeight / 80);

  // Bioluminescent firefly spore coordinates for dark mode
  const sporeX = Math.round(13 + Math.cos(orbitAngle) * 13);
  const sporeY = Math.round(9 + Math.sin(orbitAngle * 1.3) * 7);

  return (
    <div
      className="relative select-none pointer-events-none"
      style={{
        width: size,
        height: size,
        filter: palette.ambientGlow !== "none" ? `drop-shadow(${palette.ambientGlow})` : undefined,
      }}
      aria-hidden="true"
    >
      {/* 1. Ground Shadow (anchored to ground plane) */}
      <div
        className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 rounded-full transition-transform duration-75"
        style={{
          width: size * 0.72,
          height: size * 0.18,
          backgroundColor: palette.shadow,
          transform: `translateX(-50%) scale(${shadowScale})`,
          opacity: isSleeping ? 0.65 : shadowOpacity,
          filter: "blur(0.5px)",
        }}
      />

      {/* 2. Character Sprite (hops vertically and flips horizontally) */}
      <div
        className="absolute inset-0 transition-transform duration-75 origin-bottom"
        style={{
          transform: `translate3d(0, ${hopY}px, 0) scaleX(${facing === "left" ? -1 : 1})`,
        }}
      >
        <svg
          viewBox="0 0 26 26"
          width="100%"
          height="100%"
          style={{
            shapeRendering: "crispEdges",
            imageRendering: "pixelated",
          }}
        >
          <defs>
            {isDarkMode && (
              <filter id="sprout-neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            )}
          </defs>

          {/* Base Body Shading */}
          {bodyShadePath && <path d={bodyShadePath} fill={palette.bodyShade} />}

          {/* Main Body */}
          {bodyPath && <path d={bodyPath} fill={palette.body} />}

          {/* Body Highlights */}
          {bodyHighlightPath && <path d={bodyHighlightPath} fill={palette.bodyHighlight} />}

          {/* Leaves Base */}
          {leavesPath && <path d={leavesPath} fill={palette.leaves} />}

          {/* Leaf Highlights */}
          {leafHighlightPath && <path d={leafHighlightPath} fill={palette.leafHighlight} />}

          {/* Dark Mode Luminous Leaf Tips */}
          {leafTipPath && (
            <path
              d={leafTipPath}
              fill={palette.leafTip}
              filter={isDarkMode ? "url(#sprout-neon-glow)" : undefined}
            />
          )}

          {/* Cheeks Blush */}
          {blushPath && <path d={blushPath} fill={palette.blush} />}

          {/* Eyes (Dark Ink in Light, Neon Cyan Glow in Dark) */}
          {eyesPath && (
            <path
              d={eyesPath}
              fill={palette.eyes}
              filter={isDarkMode ? "url(#sprout-neon-glow)" : undefined}
            />
          )}

          {/* Specular White Eye Shine */}
          {eyeShinePath && <path d={eyeShinePath} fill={palette.eyeShine} />}

          {/* Mouth (if visible) */}
          {mouthPath && <path d={mouthPath} fill={palette.mouth} />}

          {/* Perch Paws resting on card ledge */}
          {pawsPath && (
            <path
              d={pawsPath}
              fill={isDarkMode ? palette.leafTip : palette.bodyHighlight}
            />
          )}

          {/* Forest Ink / Obsidian Contour Outline */}
          {outlinePath && <path d={outlinePath} fill={palette.outline} />}

          {/* 3. Dark Mode Bioluminescent Firefly Spore */}
          {isDarkMode && !isSleeping && (
            <g className="transition-opacity duration-300">
              {/* Soft glow halo */}
              <circle
                cx={sporeX}
                cy={sporeY}
                r="2.5"
                fill={palette.sporeColor}
                opacity="0.45"
                filter="url(#sprout-neon-glow)"
              />
              {/* Spore core pixel */}
              <rect
                x={sporeX}
                y={sporeY}
                width="1"
                height="1"
                fill="#FFFFFF"
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

export default SproutPixelArt;
