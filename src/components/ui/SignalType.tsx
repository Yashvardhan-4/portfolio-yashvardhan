"use client";

import React, { useEffect, useState } from "react";
import "./SignalType.css";

export interface SignalTypeProps {
  text?: string;
  glowColor?: string;
  onColor?: string;
  offColor?: string;
  hazeColor?: string;
  showBeacon?: boolean;
  className?: string;
  delay?: number;
}

export function SignalType({
  text = "Open to High-Impact Engineering Roles",
  glowColor = "#A855F7",
  onColor = "#F3E8FF",
  offColor = "#64748B",
  hazeColor = "#7E22CE",
  showBeacon = true,
  className = "",
  delay = 400,
}: SignalTypeProps) {
  const [state, setState] = useState<"off" | "igniting" | "on">("off");

  useEffect(() => {
    const timerIgnite = setTimeout(() => {
      setState("igniting");
    }, delay);

    const timerOn = setTimeout(() => {
      setState("on");
    }, delay + 1850);

    return () => {
      clearTimeout(timerIgnite);
      clearTimeout(timerOn);
    };
  }, [delay]);

  return (
    <div
      className={`signal-type ${className}`}
      data-state={state}
      style={
        {
          "--signal-glow": glowColor,
          "--signal-on": onColor,
          "--signal-off": offColor,
          "--signal-haze": hazeColor,
        } as React.CSSProperties
      }
    >
      {showBeacon && <span className="signal-type__beacon" aria-hidden="true" />}
      <span className="signal-type__text">{text}</span>
    </div>
  );
}

export default SignalType;
