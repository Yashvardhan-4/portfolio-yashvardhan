"use client";

import React from "react";
import { Magnet } from "./Magnet";

interface MagneticPillProps {
  children: React.ReactNode;
  as?: "a" | "button";
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  variant?: "primary" | "secondary";
  className?: string;
  ariaLabel?: string;
  title?: string;
  cursorLabel?: string;
  disabled?: boolean;
}

/**
 * Dennis Snellenberg–style Liquid Bottom-Fill Magnetic Pill.
 * Combines tactile spring magnetism (`Magnet`) with an ascending curved fill sweep
 * and smooth vertical typographic swap on hover.
 */
export function MagneticPill({
  children,
  as = "button",
  href,
  target,
  rel,
  type = "button",
  onClick,
  variant = "primary",
  className = "",
  ariaLabel,
  title,
  cursorLabel,
  disabled = false,
}: MagneticPillProps) {
  const isPrimary = variant === "primary";

  const baseClasses = isPrimary
    ? "bg-[var(--fg)] text-[var(--bg)] border border-transparent hover:border-[var(--accent)]"
    : "bg-[var(--surface)] text-[var(--fg)] border border-[var(--border)] hover:border-[var(--accent)]";

  const fillClasses = isPrimary ? "bg-[var(--accent)]" : "bg-[var(--fg)]";

  const hoverTextClasses = isPrimary ? "text-white" : "text-[var(--bg)]";

  const content = (
    <>
      {/* Rising Curved Liquid Fill Layer */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 translate-y-[105%] group-hover:translate-y-0 rounded-[50%] group-hover:rounded-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${fillClasses}`}
      />

      {/* Vertical Text Swap Slot */}
      <span className="relative z-10 inline-flex items-center gap-2 overflow-hidden">
        <span className="inline-flex items-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[120%]">
          {children}
        </span>
        <span
          aria-hidden="true"
          className={`absolute inset-0 inline-flex items-center gap-2 translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 ${hoverTextClasses}`}
        >
          {children}
        </span>
      </span>
    </>
  );

  const sharedClasses = `group relative overflow-hidden inline-flex items-center justify-center rounded-full transition-shadow duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer select-none ${baseClasses} ${className}`;

  return (
    <Magnet padding={55} magnetStrength={3.2} maxOffset={12} scale={1.03} disabled={disabled}>
      {as === "a" ? (
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          aria-label={ariaLabel}
          title={title}
          data-cursor-label={cursorLabel}
          className={sharedClasses}
        >
          {content}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          aria-label={ariaLabel}
          title={title}
          data-cursor-label={cursorLabel}
          className={sharedClasses}
        >
          {content}
        </button>
      )}
    </Magnet>
  );
}

export default MagneticPill;
