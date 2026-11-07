"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export function showToast(message: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("tactile-toast", { detail: { message } }));
  }
}

export function TactileToast() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string }>;
      setToastMessage(customEvent.detail.message);
      setIsVisible(true);

      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 2600);
    };

    window.addEventListener("tactile-toast", handleToast);
    return () => {
      window.removeEventListener("tactile-toast", handleToast);
      clearTimeout(timer);
    };
  }, []);

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
      }`}
    >
      <div
        className={`flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-mono tracking-wide backdrop-blur-md shadow-xl ${
          isDarkMode
            ? "bg-[#0B0E14]/95 border-[#1E2638] text-[#F1F4F9] shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
            : "bg-[#FFFFFF]/95 border-[#DFE2D2] text-[#1F2421] shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
