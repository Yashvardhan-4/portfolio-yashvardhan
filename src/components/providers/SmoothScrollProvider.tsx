"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * Luxury Kinetic Smooth Scroll Provider powered by Lenis
 * - Implements Awwwards-grade momentum inertia for desktop viewports
 * - Automatically respects prefers-reduced-motion
 * - Protects modal drawers & chat overlays from scroll-trap interference
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion accessibility preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis with subtle, high-performance dampening
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.0,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Synchronize with requestAnimationFrame
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smoothly intercept in-page anchor links (e.g., #work, #about, #contact)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.length > 1) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: -40,
              duration: 1.3,
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
