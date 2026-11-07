"use client";

import { useEffect } from "react";

/**
 * DevTools & Code Protection Guard
 * - Suppresses right-click context menu (inspect element)
 * - Blocks common DevTools hotkeys (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U)
 * - Automatically clears and guards the browser console
 */
export function DevToolsProtection() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    // 1. Clear console and emit copyright guard
    try {
      console.clear();
      console.log(
        "%c🔒 Protected Intellectual Property — Yashvardhan Borude\nAll rights reserved. Source code obfuscated.",
        "font-size: 14px; font-weight: bold; color: #a855f7; padding: 4px;"
      );
    } catch {}

    // 2. Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 3. Block DevTools keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I (DevTools), Ctrl+Shift+J (Console), Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) {
        e.preventDefault();
        return false;
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && (e.key === "U" || e.key === "u")) {
        e.preventDefault();
        return false;
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
