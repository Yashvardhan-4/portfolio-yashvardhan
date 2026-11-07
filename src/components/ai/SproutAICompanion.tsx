"use client";

import React, { useState, useEffect } from "react";
import { SproutAITrigger } from "./SproutAITrigger";
import { SproutChatDrawer } from "./SproutChatDrawer";

export function SproutAICompanion() {
  const [isOpen, setIsOpen] = useState(false);

  // Global keyboard shortcut (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleOpenCustom = () => setIsOpen(true);
    const handleCloseCustom = () => setIsOpen(false);
    const handleToggleCustom = () => setIsOpen((prev) => !prev);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-sprout-ai", handleOpenCustom);
    window.addEventListener("close-sprout-ai", handleCloseCustom);
    window.addEventListener("toggle-sprout-ai", handleToggleCustom);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-sprout-ai", handleOpenCustom);
      window.removeEventListener("close-sprout-ai", handleCloseCustom);
      window.removeEventListener("toggle-sprout-ai", handleToggleCustom);
    };
  }, []);

  return (
    <>
      <SproutAITrigger isOpen={isOpen} onToggle={() => setIsOpen((prev) => !prev)} />
      <SproutChatDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default SproutAICompanion;
