"use client";

import React from "react";

interface BouncingDotsLoaderProps {
  dotCount?: number;
  dotSize?: number;
  bounceHeight?: number;
  animationDuration?: number;
  dotSpacing?: number;
  showRipple?: boolean;
  showShadow?: boolean;
  className?: string;
}

// Unified Brand Harmonic Palette: Starlight Pearl -> Lavender -> Royal Purple -> Deep Amethyst
const BRAND_DOT_PALETTES = [
  {
    start: "#FFFFFF",
    end: "#DDD6FE",
    glow: "rgba(221, 214, 254, 0.75)",
    ripple: "rgba(192, 132, 252, 0.35)",
    shadow: "rgba(168, 85, 247, 0.3)",
  },
  {
    start: "#C084FC",
    end: "#A855F7",
    glow: "rgba(168, 85, 247, 0.85)",
    ripple: "rgba(168, 85, 247, 0.4)",
    shadow: "rgba(168, 85, 247, 0.45)",
  },
  {
    start: "#A855F7",
    end: "#7C3AED",
    glow: "rgba(124, 58, 237, 0.85)",
    ripple: "rgba(124, 58, 237, 0.4)",
    shadow: "rgba(124, 58, 237, 0.45)",
  },
  {
    start: "#7C3AED",
    end: "#6B21A8",
    glow: "rgba(107, 33, 168, 0.8)",
    ripple: "rgba(107, 33, 168, 0.35)",
    shadow: "rgba(107, 33, 168, 0.4)",
  },
];

export function BouncingDotsLoader({
  dotCount = 4,
  dotSize = 28,
  bounceHeight = 56,
  animationDuration = 1.35,
  dotSpacing = 18,
  showRipple = true,
  showShadow = true,
  className = "",
}: BouncingDotsLoaderProps) {
  const containerHeight = bounceHeight + dotSize + 36;

  return (
    <div
      className={`flex items-center justify-center overflow-visible select-none ${className}`}
      style={{ minHeight: containerHeight }}
    >
      <div
        className="flex items-end justify-center"
        style={{ gap: dotSpacing, height: containerHeight }}
      >
        {Array.from({ length: dotCount }).map((_, i) => {
          const palette = BRAND_DOT_PALETTES[i % BRAND_DOT_PALETTES.length];
          const delay = `${i * 0.16}s`;

          return (
            <div
              key={i}
              className="relative flex flex-col items-center justify-end h-full"
              style={{ width: dotSize + 4 }}
            >
              {/* Bouncing Dot Container */}
              <div
                className="relative z-10"
                style={{
                  width: dotSize,
                  height: dotSize,
                  animation: `bdot-gravity-bounce ${animationDuration}s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite`,
                  animationDelay: delay,
                  willChange: "transform",
                }}
              >
                {/* Rubber Morphing Sphere with 3D Radial Glow */}
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `linear-gradient(to bottom, ${palette.start}, ${palette.end})`,
                    boxShadow: `0 0 20px ${palette.glow}, 0 0 40px ${palette.glow.replace(
                      /[\d.]+\)$/g,
                      "0.35)"
                    )}`,
                    animation: `bdot-rubber-morph ${animationDuration}s linear infinite`,
                    animationDelay: delay,
                    willChange: "transform",
                  }}
                />

                {/* 3D Specular Highlight Bead */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    top: Math.max(3, dotSize * 0.14),
                    left: Math.max(3, dotSize * 0.14),
                    width: Math.max(5, dotSize * 0.22),
                    height: Math.max(5, dotSize * 0.22),
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    filter: "blur(0.4px)",
                  }}
                />
              </div>

              {/* Water-like Concentric Ripple on Impact */}
              {showRipple && (
                <div
                  className="absolute bottom-0 rounded-full opacity-0 pointer-events-none"
                  style={{
                    width: dotSize * 2.2,
                    height: 12,
                    border: `1.5px solid ${palette.ripple}`,
                    animation: `bdot-ripple-expand ${animationDuration}s linear infinite`,
                    animationDelay: delay,
                  }}
                />
              )}

              {/* Dynamic Breathing Contact Shadow */}
              {showShadow && (
                <div
                  className="absolute bottom-[-3px] rounded-full pointer-events-none"
                  style={{
                    width: dotSize,
                    height: 6,
                    backgroundColor: palette.shadow,
                    filter: "blur(4px)",
                    animation: `bdot-shadow-breathe ${animationDuration}s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite`,
                    animationDelay: delay,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes bdot-gravity-bounce {
          0% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
          }
          50% {
            transform: translateY(-${bounceHeight}px);
            animation-timing-function: cubic-bezier(0.32, 0, 0.67, 0);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes bdot-rubber-morph {
          0% {
            transform: scale(1.35, 0.65);
          }
          6% {
            transform: scale(0.9, 1.12);
          }
          15% {
            transform: scale(1, 1);
          }
          50% {
            transform: scale(1, 1);
          }
          85% {
            transform: scale(0.92, 1.1);
          }
          100% {
            transform: scale(1.35, 0.65);
          }
        }

        @keyframes bdot-shadow-breathe {
          0% {
            transform: scale(1.4);
            opacity: 0.65;
          }
          50% {
            transform: scale(0.45);
            opacity: 0.12;
          }
          100% {
            transform: scale(1.4);
            opacity: 0.65;
          }
        }

        @keyframes bdot-ripple-expand {
          0% {
            transform: scale(0.45);
            opacity: 0;
            border-width: 3px;
          }
          6% {
            opacity: 0.85;
          }
          32% {
            transform: scale(1.55);
            opacity: 0;
            border-width: 0.5px;
          }
          100% {
            transform: scale(1.55);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default BouncingDotsLoader;
