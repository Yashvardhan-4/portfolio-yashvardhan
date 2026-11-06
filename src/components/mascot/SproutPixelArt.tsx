"use client";

import React, { useMemo } from "react";
import { SPROUT_FRAMES } from "./sprout-frames";
import { MascotPalette, MascotState, FacingDirection } from "./sprout-types";

interface SproutPixelArtProps {
  state: MascotState;
  palette: MascotPalette;
  facing: FacingDirection;
  pupilOffset: { x: number; y: number };
  size?: number;
  hopY?: number; // Jump / hop vertical offset in pixels
  isSleeping?: boolean;
}

export function SproutPixelArt({
  state,
  palette,
  facing,
  pupilOffset,
  size = 46,
  hopY = 0,
  isSleeping = false,
}: SproutPixelArtProps) {
  // Determine which frame to draw based on state
  const frameKey = useMemo(() => {
    switch (state) {
      case "SLEEP":
        return "SLEEP";
      case "HAPPY":
        return "HAPPY";
      case "JUMP":
        return "JUMP";
      case "INSPECT":
        return "INSPECT";
      case "RUN":
        return "RUN_DASH";
      case "FOLLOW":
        return "WALK_HOP";
      case "LOOK_AROUND":
        return "LOOK_SIDE";
      case "IDLE":
      default:
        return "IDLE";
    }
  }, [state]);

  const rawGrid = SPROUT_FRAMES[frameKey] || SPROUT_FRAMES.IDLE;

  // Build grouped SVG path data for crispEdges rendering
  const {
    outlinePath,
    bodyPath,
    bodyShadePath,
    bodyHighlightPath,
    leavesPath,
    leafHighlightPath,
    blushPath,
    eyesPath,
    eyeShinePath,
    mouthPath,
  } = useMemo(() => {
    const paths: Record<string, string[]> = {
      O: [],
      B: [],
      S: [],
      H: [],
      L: [],
      G: [],
      P: [],
      E: [],
      W: [],
      M: [],
    };

    const hasDynamicPupils =
      frameKey !== "SLEEP" && frameKey !== "HAPPY";

    const pX = hasDynamicPupils ? Math.round(pupilOffset.x) : 0;
    const pY = hasDynamicPupils ? Math.round(pupilOffset.y) : 0;

    for (let r = 0; r < rawGrid.length; r++) {
      const rowStr = rawGrid[r];
      for (let c = 0; c < rowStr.length; c++) {
        const char = rowStr[c];
        if (char === "." || char === " ") continue;

        let drawX = c;
        let drawY = r;

        // Apply pupil offset to eyes and eye shines only
        if (hasDynamicPupils && (char === "E" || char === "W")) {
          // Clamp pupil within eye socket bounds (c between 8 and 20, r between 13 and 18)
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
      blushPath: paths.P.join(" "),
      eyesPath: paths.E.join(" "),
      eyeShinePath: paths.W.join(" "),
      mouthPath: paths.M.join(" "),
    };
  }, [rawGrid, frameKey, pupilOffset]);

  // Shadow parameters reacting to height above ground
  const jumpHeight = Math.max(0, -hopY);
  const shadowScale = Math.max(0.4, 1 - jumpHeight / 50);
  const shadowOpacity = Math.max(0.12, 0.45 - jumpHeight / 90);

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
      {/* 1. Ground Shadow (stays on the ground plane even when Sprout hops/jumps) */}
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

          {/* Cheeks Blush */}
          {blushPath && <path d={blushPath} fill={palette.blush} />}

          {/* Dark Eyes */}
          {eyesPath && <path d={eyesPath} fill={palette.eyes} />}

          {/* Specular White Eye Shine */}
          {eyeShinePath && <path d={eyeShinePath} fill={palette.eyeShine} />}

          {/* Mouth (if visible) */}
          {mouthPath && <path d={mouthPath} fill={palette.mouth} />}

          {/* Forest Ink Contour Outline */}
          {outlinePath && <path d={outlinePath} fill={palette.outline} />}
        </svg>
      </div>
    </div>
  );
}
