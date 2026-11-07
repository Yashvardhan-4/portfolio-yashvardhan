"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { STARTER_PROMPTS } from "@/data/ai-knowledge";

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  actions?: Array<{
    label: string;
    href: string;
    isExternal?: boolean;
  }>;
}

interface SproutChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SproutChatDrawer({ isOpen, onClose }: SproutChatDrawerProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-welcome",
      role: "model",
      content:
        "Hello! I'm Sprout, Yashvardhan's AI companion. I'm strictly grounded in his verified projects, academic records at PCCOE (CGPA 8.86), NPTEL Elite+Silver certification, and competitive programming achievements. How can I assist you today?",
      actions: [
        { label: "Shivkush PWA Case Study →", href: "/projects/shivkush-nursery-pwa" },
        { label: "Contact Yashvardhan", href: "/#contact" },
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Submit message
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isStreaming) return;

    const userMessageId = `user-${Date.now()}`;
    const newUserMessage: ChatMessage = {
      id: userMessageId,
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsStreaming(true);

    const assistantMessageId = `model-${Date.now()}`;
    const initialAssistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: "model",
      content: "",
    };

    setMessages((prev) => [...prev, initialAssistantMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-5).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedText = "";
      let parsedActions: ChatMessage["actions"] = undefined;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        // Check for metadata delimiter
        if (accumulatedText.includes("__METADATA__")) {
          const [visibleContent, metadataStr] = accumulatedText.split("__METADATA__");
          try {
            const parsedMeta = JSON.parse(metadataStr);
            parsedActions = parsedMeta.actions;
          } catch {
            // Keep parsing as more arrives
          }

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
                    content: visibleContent.trim(),
                    actions: parsedActions,
                  }
                : msg
            )
          );
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
                    content: accumulatedText,
                  }
                : msg
            )
          );
        }
      }
    } catch (err) {
      console.error("Chat communication error:", err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content:
                  "I encountered a temporary connection issue. You can explore Yashvardhan's verified projects directly in the portfolio or reach out to him via email.",
                actions: [
                  { label: "View Projects", href: "/#work" },
                  { label: "Email Directly", href: "mailto:yashvardhanborude7@gmail.com" },
                ],
              }
            : msg
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "cleared-welcome",
        role: "model",
        content:
          "History reset. Ask me about Yashvardhan's production applications, NPTEL graph theory ranking, or engineering coursework at PCCOE Pune.",
        actions: [
          { label: "Shivkush PWA", href: "/projects/shivkush-nursery-pwa" },
          { label: "Academics", href: "/#about" },
        ],
      },
    ]);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.72)" : "rgba(31, 36, 33, 0.35)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Canvas */}
      <aside
        id="sprout-ai-drawer"
        role="dialog"
        aria-label="Sprout AI Companion Drawer"
        aria-modal="true"
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[460px] flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${
          isDarkMode
            ? "bg-[#090C12] text-[#F1F4F9] border-l border-[#1E2638] shadow-[-12px_0_36px_rgba(0,0,0,0.8)]"
            : "bg-[#FAFBF7] text-[#1F2421] border-l border-[#DFE2D2] shadow-[-8px_0_24px_rgba(0,0,0,0.08)]"
        }`}
      >
        {/* Drawer Header */}
        <header className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`relative w-9 h-9 rounded-full flex items-center justify-center border ${
                isDarkMode
                  ? "bg-[#111722] border-[#00F0FF]/40 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                  : "bg-[#EDF0E8] border-[#3E6B52]/40 text-[#2D4F3C]"
              }`}
            >
              {/* Mascot Mini Glyph */}
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                <path
                  d="M12 8 C11 4, 7 3, 6 5 C5 7, 8 9, 12 8 Z"
                  fill={isDarkMode ? "#00FFA3" : "#3E6B52"}
                />
                <path
                  d="M12 8 C14 4, 18 3, 19 5 C20 7, 17 9, 12 8 Z"
                  fill={isDarkMode ? "#00F0FF" : "#558A6D"}
                />
                <rect
                  x="7"
                  y="11"
                  width="10"
                  height="8"
                  rx="4"
                  fill={isDarkMode ? "#172030" : "#FAFBF7"}
                  stroke={isDarkMode ? "#00F0FF" : "#3E6B52"}
                  strokeWidth="1.2"
                />
                <circle cx="10" cy="14" r="1" fill={isDarkMode ? "#00FFA3" : "#2D4F3C"} />
                <circle cx="14" cy="14" r="1" fill={isDarkMode ? "#00F0FF" : "#2D4F3C"} />
              </svg>
              {/* Green Active Dot */}
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[var(--bg)]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold tracking-tight">Sprout AI</h2>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase tracking-wider ${
                    isDarkMode
                      ? "bg-cyan-950/60 text-cyan-300 border-cyan-800/60"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200"
                  }`}
                >
                  Grounded
                </span>
              </div>
              <p className="text-[11px] text-[var(--fg-muted)] tracking-wide font-mono">
                PCCOE Pune · 8.86 CGPA · NPTEL
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleClearHistory}
              title="Clear conversation"
              className="p-2 rounded-lg text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface)] transition-colors text-xs font-mono"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={onClose}
              title="Close drawer (Esc)"
              aria-label="Close Sprout AI Drawer"
              className="p-2 rounded-lg text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface)] transition-colors"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </header>

        {/* Drawer Messages Stream */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Quick Starter Chips */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--fg-muted)] block">
              Suggested Questions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isStreaming}
                  className={`text-left text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                    isDarkMode
                      ? "bg-[#111722] hover:bg-[#182130] border-[#1E2638] hover:border-cyan-500/50 text-[#D1D7E0]"
                      : "bg-[#FFFFFF] hover:bg-[#F2F4ED] border-[#DFE2D2] hover:border-[#3E6B52]/50 text-[#2D332F]"
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[var(--border)] pt-3 space-y-4">
            {messages.map((message) => {
              const isAssistant = message.role === "model";
              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${isAssistant ? "items-start" : "items-end"} space-y-1`}
                >
                  <span className="text-[10px] font-mono tracking-wider text-[var(--fg-muted)]">
                    {isAssistant ? "Sprout AI" : "You"}
                  </span>

                  <div
                    className={`max-w-[88%] text-[13px] leading-relaxed rounded-xl p-3.5 border ${
                      isAssistant
                        ? isDarkMode
                          ? "bg-[#101520] border-[#1C2436] text-[#E5E9F0]"
                          : "bg-[#FFFFFF] border-[#E2E6D8] text-[#1F2421]"
                        : isDarkMode
                        ? "bg-cyan-950/40 border-cyan-800/50 text-cyan-100"
                        : "bg-[#EAEFE8] border-[#C8D3C4] text-[#1E3025]"
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">{message.content}</div>

                    {/* Interactive Action Chips */}
                    {message.actions && message.actions.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex flex-wrap gap-1.5">
                        {message.actions.map((act) => {
                          const isResumeAction = act.href === "/resume.pdf" || act.label.toLowerCase().includes("resume");
                          if (isResumeAction) {
                            return (
                              <button
                                key={act.label}
                                type="button"
                                onClick={() => {
                                  onClose();
                                  if (typeof window !== "undefined") {
                                    window.dispatchEvent(new CustomEvent("open-resume-modal"));
                                  }
                                }}
                                className={`inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                                  isDarkMode
                                    ? "bg-[#161E2E] hover:bg-cyan-900/40 border-[#26354E] hover:border-cyan-400 text-cyan-300"
                                    : "bg-[#F3F5EE] hover:bg-[#E3E8DC] border-[#CFD6C4] hover:border-[#3E6B52] text-[#2C4A37]"
                                }`}
                              >
                                <span>{act.label}</span>
                              </button>
                            );
                          }

                          const isAnchor = act.href.startsWith("http") || act.href.startsWith("mailto");
                          if (isAnchor) {
                            return (
                              <a
                                key={act.label}
                                href={act.href}
                                target={act.isExternal ? "_blank" : undefined}
                                rel={act.isExternal ? "noopener noreferrer" : undefined}
                                className={`inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-md border transition-colors ${
                                  isDarkMode
                                    ? "bg-[#161E2E] hover:bg-cyan-900/40 border-[#26354E] hover:border-cyan-400 text-cyan-300"
                                    : "bg-[#F3F5EE] hover:bg-[#E3E8DC] border-[#CFD6C4] hover:border-[#3E6B52] text-[#2C4A37]"
                                }`}
                              >
                                <span>{act.label}</span>
                              </a>
                            );
                          }
                          return (
                            <Link
                              key={act.label}
                              href={act.href}
                              onClick={onClose}
                              className={`inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-md border transition-colors ${
                                isDarkMode
                                  ? "bg-[#161E2E] hover:bg-cyan-900/40 border-[#26354E] hover:border-cyan-400 text-cyan-300"
                                  : "bg-[#F3F5EE] hover:bg-[#E3E8DC] border-[#CFD6C4] hover:border-[#3E6B52] text-[#2C4A37]"
                              }`}
                            >
                              <span>{act.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Live Typing / Streaming Indicator */}
            {isStreaming && (
              <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--fg-muted)] pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>Thinking & retrieving grounded context...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Drawer Input Section */}
        <footer className="p-4 border-t border-[var(--border)] shrink-0 bg-[var(--bg)]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="space-y-2"
          >
            <div
              className={`relative flex items-center rounded-xl border transition-all ${
                isDarkMode
                  ? "bg-[#0E131C] border-[#1E2638] focus-within:border-cyan-500/80"
                  : "bg-[#FFFFFF] border-[#DFE2D2] focus-within:border-[#3E6B52]"
              }`}
            >
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask about projects, coursework, DSA, availability..."
                className="w-full resize-none bg-transparent px-3.5 py-3 text-xs placeholder:text-[var(--fg-muted)] focus:outline-none max-h-24"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isStreaming}
                aria-label="Send message"
                className={`mr-2 p-2 rounded-lg transition-all ${
                  inputValue.trim() && !isStreaming
                    ? isDarkMode
                      ? "bg-cyan-500 text-[#090C12] hover:bg-cyan-400"
                      : "bg-[#3E6B52] text-white hover:bg-[#2D4F3C]"
                    : "opacity-40 cursor-not-allowed text-[var(--fg-muted)]"
                }`}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[var(--fg-muted)] px-1">
              <span>Zero-hallucination verified model</span>
              <span>Press ↵ to send</span>
            </div>
          </form>
        </footer>
      </aside>
    </>
  );
}
