"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { flushSync } from "react-dom";

export type Theme = "dark" | "light";

export interface ThemeTransitionOrigin {
  x: number;
  y: number;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: (origin?: ThemeTransitionOrigin) => void;
  isMounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
  isMounted: false,
});

function applyDomTheme(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);
  if (next === "light") {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  } else {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("yashvardhan-theme") as Theme | null;
    const initialTheme: Theme =
      stored === "light" || stored === "dark"
        ? stored
        : ((document.documentElement.getAttribute("data-theme") as Theme | null) || "dark");

    setThemeState(initialTheme);
    applyDomTheme(initialTheme);
    setIsMounted(true);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("yashvardhan-theme", newTheme);
      applyDomTheme(newTheme);
      window.dispatchEvent(new CustomEvent("theme-change", { detail: { theme: newTheme } }));
      window.dispatchEvent(new CustomEvent("sprout-theme-flip", { detail: { theme: newTheme } }));
    } catch {
      // Storage safety
    }
  }, []);

  const toggleTheme = useCallback(
    (origin?: ThemeTransitionOrigin) => {
      const next: Theme = theme === "dark" ? "light" : "dark";
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => {
          ready: Promise<void>;
        };
      };

      if (!doc.startViewTransition || prefersReducedMotion || typeof window === "undefined") {
        setTheme(next);
        return;
      }

      const x = origin?.x ?? window.innerWidth * 0.85;
      const y = origin?.y ?? 36;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = doc.startViewTransition(() => {
        flushSync(() => {
          setTheme(next);
        });
      });

      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 720,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {
          // Safe fallback if view transition is interrupted
        });
    },
    [theme, setTheme]
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isMounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
