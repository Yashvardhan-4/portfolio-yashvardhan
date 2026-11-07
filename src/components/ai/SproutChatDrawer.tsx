"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { STARTER_PROMPTS } from "@/data/ai-knowledge";
import { showToast } from "@/components/ui/TactileToast";

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  reasoning?: string[];
  isReasoningExpanded?: boolean;
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
        "Hello! I'm **Sprout AI**, Yashvardhan's interactive portfolio companion. I'm strictly grounded in his verified projects, academic records at PCCOE Pune (CGPA 8.86/10.0), NPTEL Elite+Silver certification, and competitive programming achievements.\n\nHow can I assist your review today?",
      reasoning: [
        "Verified engineering archives initialized",
        "Grounded in PCCOE Pune academic records, Shivkush PWA contract, and competitive profiles",
      ],
      isReasoningExpanded: false,
      actions: [
        { label: "Shivkush PWA Case Study →", href: "/projects/shivkush-nursery-pwa" },
        { label: "View Verified Resume PDF", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
        { label: "Contact Yashvardhan", href: "/#contact" },
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
      isReasoningExpanded: true,
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
      let accumulatedRaw = "";
      let parsedReasoning: string[] | undefined = undefined;
      let parsedActions: ChatMessage["actions"] = undefined;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedRaw += chunk;

        // Parse Reasoning Trace if present
        let displayContent = accumulatedRaw;

        if (displayContent.includes("__REASONING__")) {
          const splitReasoning = displayContent.split("__REASONING__")[1];
          const endBracketIdx = splitReasoning.indexOf("]\n\n");
          if (endBracketIdx !== -1) {
            try {
              const jsonStr = splitReasoning.substring(0, endBracketIdx + 1);
              parsedReasoning = JSON.parse(jsonStr);
              displayContent = splitReasoning.substring(endBracketIdx + 3);
            } catch {}
          }
        }

        // Parse Action Metadata if present
        if (displayContent.includes("__METADATA__")) {
          const [contentPart, metaPart] = displayContent.split("__METADATA__");
          displayContent = contentPart.trim();
          try {
            const meta = JSON.parse(metaPart);
            parsedActions = meta.actions;
          } catch {}
        }

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content: displayContent,
                  reasoning: parsedReasoning || msg.reasoning,
                  actions: parsedActions || msg.actions,
                }
              : msg
          )
        );
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
          "Conversation reset. Ask me about Yashvardhan's production applications, NPTEL graph theory ranking, or engineering coursework at PCCOE Pune.",
        actions: [
          { label: "Shivkush PWA", href: "/projects/shivkush-nursery-pwa" },
          { label: "Academic Credentials", href: "/#about" },
        ],
      },
    ]);
    showToast("Chat history cleared");
  };

  const handleCopyTranscript = () => {
    const transcript = messages
      .map((m) => `${m.role === "user" ? "You" : "Sprout AI"}:\n${m.content}\n`)
      .join("\n---\n\n");

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(transcript);
        showToast("Full conversation copied to clipboard ✓");
      }
    } catch {}
  };

  const handleCopyMessage = (id: string, text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        showToast("Message copied to clipboard ✓");
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch {}
  };

  const toggleReasoning = (messageId: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, isReasoningExpanded: !m.isReasoningExpanded } : m
      )
    );
  };

  // Helper: Simple high-fidelity markdown parser for styled rendering
  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");

    return lines.map((line, idx) => {
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Bullet points
      if (line.trim().startsWith("• ") || line.trim().startsWith("- ")) {
        const bulletText = line.trim().replace(/^[•\-]\s*/, "");
        return (
          <div key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] leading-relaxed my-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
            <div>{parseInlineMarkdown(bulletText)}</div>
          </div>
        );
      }

      // Standard text line
      return (
        <p key={idx} className="text-xs sm:text-[13px] leading-relaxed my-1">
          {parseInlineMarkdown(line)}
        </p>
      );
    });
  };

  // Helper for bold and inline code styling
  const parseInlineMarkdown = (text: string): React.ReactNode => {
    // Regex for **bold** and `code` and [link](url)
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);

    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-[var(--fg)]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[var(--surface)] text-[var(--accent)] border border-[var(--border)]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          const [, label, url] = match;
          return (
            <a
              key={i}
              href={url}
              target={url.startsWith("http") ? "_blank" : undefined}
              rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-[var(--accent)] hover:underline inline-flex items-center gap-0.5 font-medium"
            >
              {label}
            </a>
          );
        }
      }
      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.82)" : "rgba(25, 30, 27, 0.5)",
          backdropFilter: "blur(8px)",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Command Island Modal */}
      <div
        role="dialog"
        id="sprout-ai-command-hud"
        aria-modal="true"
        aria-label="Sprout AI Companion Command HUD"
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-3xl h-[88vh] max-h-[760px] flex flex-col rounded-2xl border transition-all duration-300 shadow-2xl overflow-hidden backdrop-blur-2xl ${
            isDarkMode
              ? "bg-[#090C12]/95 text-[#F1F4F9] border-[#1E2638] shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
              : "bg-[#FFFFFF]/95 text-[#1F2421] border-[#DFE2D2] shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
          }`}
        >
          {/* Header Toolbar */}
          <header className="px-4 sm:px-6 py-3.5 border-b border-[var(--border)] flex items-center justify-between shrink-0 bg-[var(--surface)]/80 backdrop-blur-md">
            {/* Left: Persona Identity & Scope Badge */}
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                  isDarkMode
                    ? "bg-[#10141D] border-[#1E2638] text-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                    : "bg-[#FAFBF7] border-[#DFE2D2] text-emerald-700"
                }`}
              >
                <span className="font-mono text-sm font-bold">✦</span>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--fg)]">
                    Sprout AI
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--fg-muted)]">
                    PCCOE 2028
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[var(--fg-muted)] truncate">
                  Strictly Grounded in Verified Engineering Records
                </p>
              </div>
            </div>

            {/* Right: Actions Toolbar */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={handleCopyTranscript}
                title="Copy conversation transcript"
                className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg border border-[var(--border)] text-xs font-mono text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-hover)] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span className="hidden md:inline">Transcript</span>
              </button>

              <button
                type="button"
                onClick={handleClearHistory}
                title="Clear conversation history"
                className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg border border-[var(--border)] text-xs font-mono text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-hover)] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                <span className="hidden md:inline">Reset</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close Sprout AI Companion"
                className="p-1.5 rounded-lg border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer ml-1"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </header>

          {/* Conversation Thread (shadcn Message Scroller) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {messages.map((message) => {
              const isUser = message.role === "user";

              if (isUser) {
                return (
                  <div key={message.id} className="flex justify-end">
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-2xl rounded-tr-sm border text-xs sm:text-sm leading-relaxed ${
                        isDarkMode
                          ? "bg-[#141A26] border-[#222E42] text-[#F1F4F9]"
                          : "bg-[#EDEFEA] border-[#D6DDD0] text-[#1F2421]"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                );
              }

              // Assistant Message with Reasoning Trace & Action Cards
              return (
                <div key={message.id} className="flex flex-col items-start space-y-2.5 max-w-[95%] sm:max-w-[90%]">
                  {/* Persona Indicator */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isDarkMode ? "bg-cyan-400 shadow-[0_0_6px_#00F0FF]" : "bg-emerald-600"
                      }`}
                    />
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--fg)]">
                      Sprout AI
                    </span>
                  </div>

                  {/* Collapsible Reasoning Trace (shadcn Trace / Reasoning Primitive) */}
                  {message.reasoning && message.reasoning.length > 0 && (
                    <div className="w-full">
                      <button
                        type="button"
                        onClick={() => toggleReasoning(message.id)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg border text-[11px] font-mono flex items-center justify-between transition-colors cursor-pointer ${
                          isDarkMode
                            ? "bg-[#0E131C] border-[#1C2536] text-cyan-300/80 hover:text-cyan-200"
                            : "bg-[#F3F5F0] border-[#DFE3D8] text-emerald-800/80 hover:text-emerald-900"
                        }`}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <span>✦</span>
                          <span>
                            Reasoning · Verified {message.reasoning.length} knowledge record
                            {message.reasoning.length > 1 ? "s" : ""}
                          </span>
                        </span>
                        <span className="text-[10px] opacity-70">
                          {message.isReasoningExpanded ? "▲ Hide" : "▼ Expand"}
                        </span>
                      </button>

                      {message.isReasoningExpanded && (
                        <div
                          className={`mt-1.5 p-3 rounded-lg border text-[11px] font-mono space-y-1.5 leading-relaxed ${
                            isDarkMode
                              ? "bg-[#0A0E16]/80 border-[#1A2332] text-[#8C9BB0]"
                              : "bg-[#FAFAF7] border-[#DFE2D2] text-[#556053]"
                          }`}
                        >
                          {message.reasoning.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-2">
                              <span className="text-emerald-500 shrink-0">✓</span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Message Body Bubble (shadcn Bubble Primitive) */}
                  <div
                    className={`w-full p-4 sm:p-5 rounded-2xl rounded-tl-sm border shadow-sm ${
                      isDarkMode
                        ? "bg-[#10141D] border-[#1E2638] text-[#E4E9F2]"
                        : "bg-[#FAFBF7] border-[#DFE2D2] text-[#242926]"
                    }`}
                  >
                    {renderFormattedContent(message.content)}

                    {/* Interactive Contextual Action Cards */}
                    {message.actions && message.actions.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-wrap gap-2">
                        {message.actions.map((act) => {
                          const isResumeAction =
                            act.href.toLowerCase().includes("resume") ||
                            act.label.toLowerCase().includes("resume");

                          if (isResumeAction) {
                            return (
                              <button
                                key={act.label}
                                type="button"
                                onClick={() => {
                                  window.dispatchEvent(new CustomEvent("open-resume-modal"));
                                }}
                                className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                                  isDarkMode
                                    ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
                                    : "bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                                }`}
                              >
                                <span>{act.label}</span>
                                <span>↗</span>
                              </button>
                            );
                          }

                          if (act.isExternal) {
                            return (
                              <a
                                key={act.label}
                                href={act.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
                                  isDarkMode
                                    ? "bg-[#141B26] border-[#222E42] text-[#CCD6E4] hover:border-cyan-400/40 hover:text-white"
                                    : "bg-white border-[#DFE2D2] text-[#333B36] hover:border-emerald-600 hover:text-emerald-950"
                                }`}
                              >
                                <span>{act.label}</span>
                                <span className="opacity-70">↗</span>
                              </a>
                            );
                          }

                          return (
                            <Link
                              key={act.label}
                              href={act.href}
                              onClick={() => onClose()}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
                                isDarkMode
                                  ? "bg-[#141B26] border-[#222E42] text-[#CCD6E4] hover:border-cyan-400/40 hover:text-white"
                                  : "bg-white border-[#DFE2D2] text-[#333B36] hover:border-emerald-600 hover:text-emerald-950"
                              }`}
                            >
                              <span>{act.label}</span>
                              <span className="opacity-70">→</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Message Toolbar: Copy response */}
                  <div className="flex items-center gap-2 pl-1">
                    <button
                      type="button"
                      onClick={() => handleCopyMessage(message.id, message.content)}
                      className="text-[11px] font-mono text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>{copiedId === message.id ? "Copied ✓" : "Copy"}</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Active Streaming Indicator */}
            {isStreaming && (
              <div className="flex items-center gap-2 py-2 text-xs font-mono text-[var(--fg-muted)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Sprout is reasoning and synthesizing response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Context Suggestion Chips Carousel */}
          <div className="px-4 sm:px-6 py-2 border-t border-[var(--border)] bg-[var(--surface)]/50 shrink-0 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              <span className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-wider shrink-0 mr-1">
                Suggested:
              </span>
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={isStreaming}
                  onClick={() => handleSendMessage(prompt)}
                  className={`px-2.5 py-1 rounded-full border text-[11px] font-mono transition-all whitespace-nowrap cursor-pointer ${
                    isDarkMode
                      ? "bg-[#10141D] border-[#1E2638] text-[#9BA8BA] hover:text-cyan-300 hover:border-cyan-500/40"
                      : "bg-[#FAFBF7] border-[#DFE2D2] text-[#4A544E] hover:text-emerald-800 hover:border-emerald-500/50"
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input Group (shadcn InputGroup Primitive) */}
          <footer className="p-3 sm:p-5 border-t border-[var(--border)] bg-[var(--surface)] shrink-0">
            <div
              className={`relative rounded-xl border transition-all duration-200 flex flex-col focus-within:ring-2 ${
                isDarkMode
                  ? "bg-[#0A0D14] border-[#1E2638] focus-within:border-cyan-500/50 focus-within:ring-cyan-500/20"
                  : "bg-white border-[#DFE2D2] focus-within:border-emerald-600/50 focus-within:ring-emerald-600/20"
              }`}
            >
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Sprout about projects, CGPA, tech stack, or hiring..."
                rows={2}
                disabled={isStreaming}
                className="w-full px-4 pt-3 pb-2 text-xs sm:text-sm bg-transparent resize-none focus:outline-none placeholder:text-[var(--fg-muted)]/60 text-[var(--fg)] font-sans leading-relaxed"
              />

              <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
                <span className="text-[10px] font-mono text-[var(--fg-muted)]">
                  Press <kbd className="px-1 py-0.5 rounded border border-[var(--border)] bg-[var(--surface)]">↵</kbd> to send
                </span>

                <div className="flex items-center gap-2">
                  {inputValue.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setInputValue("")}
                      className="text-[11px] font-mono text-[var(--fg-muted)] hover:text-[var(--fg)] px-1.5 py-0.5 rounded cursor-pointer"
                    >
                      Clear
                    </button>
                  )}

                  <button
                    type="button"
                    disabled={!inputValue.trim() || isStreaming}
                    onClick={() => handleSendMessage()}
                    aria-label="Send message to Sprout AI"
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      inputValue.trim() && !isStreaming
                        ? isDarkMode
                          ? "bg-cyan-400 text-black shadow-[0_0_12px_rgba(0,240,255,0.4)] hover:brightness-110 active:scale-95"
                          : "bg-emerald-700 text-white shadow-sm hover:bg-emerald-800 active:scale-95"
                        : "opacity-40 cursor-not-allowed bg-[var(--border)] text-[var(--fg-muted)]"
                    }`}
                  >
                    <span>Send</span>
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default SproutChatDrawer;
