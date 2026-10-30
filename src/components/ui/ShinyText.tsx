"use client";

import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = "",
}: ShinyTextProps) {
  return (
    <span
      className={`inline-block ${
        disabled
          ? ""
          : "bg-clip-text text-transparent bg-[linear-gradient(110deg,#EDEDEF_40%,#00D2FF_50%,#EDEDEF_60%)] bg-[length:200%_100%] animate-[shine_4s_linear_infinite]"
      } ${className}`}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}

export default ShinyText;
