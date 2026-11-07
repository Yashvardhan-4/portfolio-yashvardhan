"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { SproutPixelArt } from "@/components/mascot/SproutPixelArt";
import { LIGHT_PALETTE, DARK_PALETTE } from "@/components/mascot/sprout-frames";
import { MascotState } from "@/components/mascot/sprout-types";
import { showToast } from "@/components/ui/TactileToast";

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  telemetry?: {
    vectors: number;
    cosTheta: number;
    latencyMs: number;
    topDoc?: string;
    securityWarning?: string;
  };
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

const SUGGESTED_QUESTIONS = [
  "What has Yashvardhan built?",
  "Tell me about Shivkush Nursery.",
  "Why should I hire him?",
  "What are his academic metrics?",
  "Replay the Genesis intro ✦",
];

export function SproutChatDrawer({ isOpen, onClose }: SproutChatDrawerProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const palette = isDarkMode ? DARK_PALETTE : LIGHT_PALETTE;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [mascotState, setMascotState] = useState<MascotState>("HAPPY");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom smoothly
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
    }
  }, [isOpen, messages]);

  // Mascot state transitions
  useEffect(() => {
    if (isStreaming) {
      setMascotState("INSPECT"); // Thinking/inspecting state
    } else if (messages.length === 0) {
      setMascotState("HAPPY");
    } else {
      setMascotState("LOOK_AROUND");
    }
  }, [isStreaming, messages.length]);

  // Handle escape key and outside click for options menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (showMenu) {
          setShowMenu(false);
        } else {
          onClose();
        }
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, showMenu]);

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isStreaming) return;

    setShowMenu(false);

    // Client-side instant command interception for intro replay
    const lower = text.toLowerCase();
    if (
      (lower.includes("replay") && (lower.includes("intro") || lower.includes("preloader") || lower.includes("duality"))) ||
      lower.includes("genesis intro") ||
      lower === "intro" ||
      lower === "preloader"
    ) {
      setMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          role: "user",
          content: text,
        },
        {
          id: `sprout-${Date.now() + 1}`,
          role: "model",
          content: "Re-initiating the Genesis intro and realm chamber right now. Choose your realm wisely...",
        },
      ]);
      setInputValue("");
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("replay-preloader"));
        }, 250);
      }, 750);
      return;
    }

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

      if (response.status === 429) {
        const errorData = await response.json().catch(() => ({}));
        const rateLimitMsg =
          errorData.error ||
          "🌱 Sprout is catching its breath! Please wait a minute before asking another question.";

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content: rateLimitMsg,
                }
              : msg
          )
        );
        setIsStreaming(false);
        return;
      }

      if (!response.ok || !response.body) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedRaw = "";
      let parsedActions: ChatMessage["actions"] = undefined;
      let parsedTelemetry: ChatMessage["telemetry"] = undefined;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedRaw += chunk;

        let displayContent = accumulatedRaw;

        // Parse Vector RAG Telemetry if present
        if (displayContent.includes("__RAG_TELEMETRY__")) {
          const splitTelemetry = displayContent.split("__RAG_TELEMETRY__")[1];
          const endIdx = splitTelemetry.indexOf("\n\n");
          if (endIdx !== -1) {
            const telemetryJson = splitTelemetry.substring(0, endIdx);
            try {
              parsedTelemetry = JSON.parse(telemetryJson);
            } catch {}
            displayContent = splitTelemetry.substring(endIdx + 2);
          } else {
            // Wait for full telemetry header
            displayContent = "";
          }
        }

        // Backward compatibility for reasoning tag if any
        if (displayContent.includes("__REASONING__")) {
          const splitReasoning = displayContent.split("__REASONING__")[1];
          const endBracketIdx = splitReasoning.indexOf("]\n\n");
          if (endBracketIdx !== -1) {
            displayContent = splitReasoning.substring(endBracketIdx + 3);
          } else {
            displayContent = "";
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
                  telemetry: parsedTelemetry || msg.telemetry,
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
                  "🌱 *[Sprout shrugs politely]*\n\nOops, my synaptic roots got slightly tangled! You can browse Yashvardhan's projects directly or inspect his verified resume.",
                actions: [
                  { label: "View Projects", href: "/#work" },
                  { label: "View PDF Resume", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
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
    setMessages([]);
    setShowMenu(false);
    setMascotState("HAPPY");
    showToast("Conversation cleared");
  };

  const handleCopyTranscript = () => {
    if (messages.length === 0) {
      showToast("No messages to copy yet");
      setShowMenu(false);
      return;
    }

    const transcript = messages
      .map((m) => `${m.role === "user" ? "You" : "Sprout"}:\n${m.content}\n`)
      .join("\n---\n\n");

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(transcript);
        showToast("Conversation copied to clipboard ✓");
      }
    } catch {}
    setShowMenu(false);
  };

  const handleCopyMessage = (id: string, text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        showToast("Copied to clipboard ✓");
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch {}
  };

  const handleActionClick = (action: { label: string; href: string; isExternal?: boolean }) => {
    if (action.href.includes("Resume") || action.label.toLowerCase().includes("resume")) {
      window.dispatchEvent(new CustomEvent("open-resume-modal"));
    } else if (action.href === "#intro" || action.label.toLowerCase().includes("intro")) {
      onClose();
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("replay-preloader"));
      }, 250);
    }
  };

  // High-fidelity, quiet markdown formatter
  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");

    return lines.map((line, idx) => {
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }

      // Bullet points
      if (line.trim().startsWith("- ") || line.trim().startsWith("• ") || line.trim().startsWith("* ")) {
        const itemText = line.trim().replace(/^[-•*]\s*/, "");
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                isDarkMode ? "bg-purple-400" : "bg-emerald-600"
              }`}
            />
            <span className="flex-1">{renderInlineStyles(itemText)}</span>
          </div>
        );
      }

      return (
        <p key={idx} className="my-1 text-[13.5px] leading-relaxed">
          {renderInlineStyles(line)}
        </p>
      );
    });
  };

  const renderInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\`.*?\`|\[.*?\]\(.*?\))/g);

    return parts.map((part, i) => {
      // Bold
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong
            key={i}
            className={`font-semibold ${isDarkMode ? "text-purple-300" : "text-[#20352B]"}`}
          >
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Inline code
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className={`px-1.5 py-0.5 rounded text-[11px] font-mono border ${
              isDarkMode
                ? "bg-[#1C152F] border-[#36275A] text-purple-200"
                : "bg-[#E5EBDD] border-[#D5DEC9] text-[#20352B]"
            }`}
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      // Markdown Link: [text](url)
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const [, label, url] = linkMatch;
        return (
          <a
            key={i}
            href={url}
            target={url.startsWith("http") ? "_blank" : undefined}
            rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`underline underline-offset-2 transition-colors font-medium ${
              isDarkMode
                ? "text-purple-400 hover:text-purple-300"
                : "text-emerald-700 hover:text-emerald-800"
            }`}
          >
            {label}
          </a>
        );
      }

      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <div
      id="sprout-chat-companion"
      role="dialog"
      aria-label="Sprout Portfolio Companion"
      className="fixed inset-0 z-50 pointer-events-none select-none flex items-end sm:items-end justify-end sm:p-6"
    >
      {/* Light subtle backdrop overlay on mobile only */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/30 sm:hidden pointer-events-auto"
        aria-hidden="true"
      />

      {/* Companion Window: Obsidian Royal Purple / Serene Ghibli Garden */}
      <div
        className={`pointer-events-auto select-text relative w-full sm:w-[440px] md:w-[460px] h-[92vh] sm:h-[600px] max-h-[84vh] rounded-t-2xl sm:rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden shadow-2xl ${
          isDarkMode
            ? "bg-[#0C0A14] border-[#2A1E45] text-[#F3E8FF]"
            : "bg-[#FCFBF8] border-[#D5DEC9] text-[#20352B]"
        }`}
        style={{
          boxShadow: isDarkMode
            ? "0 24px 60px rgba(0, 0, 0, 0.95), 0 0 25px rgba(168, 85, 247, 0.16), 0 0 1px 1px rgba(168, 85, 247, 0.35)"
            : "0 20px 48px rgba(71, 120, 94, 0.16), 0 0 1px 1px rgba(213, 222, 201, 0.8)",
        }}
      >
        {/* Header: Compact, Elegant, Grounded in Sprout Persona */}
        <header
          className={`h-14 px-4 shrink-0 flex items-center justify-between border-b ${
            isDarkMode ? "border-[#221838] bg-[#0E0B18]" : "border-[#D5DEC9] bg-[#FCFBF8]"
          }`}
        >
          {/* Left: Sprout Mascot Identity */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <SproutPixelArt
                state={mascotState}
                palette={palette}
                facing="right"
                pupilOffset={{ x: 0, y: 0 }}
                size={30}
                isDarkMode={isDarkMode}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-medium text-sm tracking-tight text-[var(--fg)]">
                  Sprout
                </span>
                <span
                  className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded border uppercase font-semibold ${
                    isDarkMode
                      ? "bg-purple-950/70 text-purple-300 border-purple-500/40"
                      : "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                  }`}
                  title="In-Memory Vector RAG Engine active"
                >
                  Vector RAG
                </span>
              </div>
              <span
                className={`text-[11px] mt-0.5 tracking-normal ${
                  isDarkMode ? "text-[#A79BBF]" : "text-[#627768]"
                }`}
              >
                Grounded portfolio companion
              </span>
            </div>
          </div>

          {/* Right: Discreet Actions & Close */}
          <div className="flex items-center gap-1 relative" ref={menuRef}>
            {/* Options Dropdown Trigger */}
            <button
              type="button"
              onClick={() => setShowMenu((prev) => !prev)}
              aria-label="Companion Options"
              className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors text-xs ${
                isDarkMode
                  ? "hover:bg-[#1C152F] text-[#A79BBF] hover:text-[#F3E8FF]"
                  : "hover:bg-[#E5EBDD] text-[#627768] hover:text-[#20352B]"
              }`}
            >
              •••
            </button>

            {/* Subtle Options Menu */}
            {showMenu && (
              <div
                className={`absolute right-8 top-0 w-44 rounded-lg border py-1 shadow-xl z-20 text-xs ${
                  isDarkMode
                    ? "bg-[#130E24] border-[#2E1F4D] text-[#F3E8FF]"
                    : "bg-[#FFFFFF] border-[#D5DEC9] text-[#20352B]"
                }`}
              >
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className={`w-full text-left px-3 py-1.5 transition-colors flex items-center gap-2 ${
                    isDarkMode ? "hover:bg-[#1E1738]" : "hover:bg-[#F3F3E9]"
                  }`}
                >
                  <span>⟲</span> Clear conversation
                </button>
                <button
                  type="button"
                  onClick={handleCopyTranscript}
                  className={`w-full text-left px-3 py-1.5 transition-colors flex items-center gap-2 ${
                    isDarkMode ? "hover:bg-[#1E1738]" : "hover:bg-[#F3F3E9]"
                  }`}
                >
                  <span>📋</span> Copy transcript
                </button>
                <div className={`my-1 border-t ${isDarkMode ? "border-[#2E1F4D]" : "border-[#E5EBDD]"}`} />
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    onClose();
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent("replay-preloader"));
                    }, 250);
                  }}
                  className={`w-full text-left px-3 py-1.5 transition-colors flex items-center gap-2 ${
                    isDarkMode ? "hover:bg-[#1E1738] text-purple-300" : "hover:bg-[#F3F3E9] text-emerald-800"
                  }`}
                >
                  <span>✦</span> Replay Genesis Intro
                </button>
              </div>
            )}

            {/* Discreet Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Sprout (Esc)"
              className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors text-xs ${
                isDarkMode
                  ? "hover:bg-[#1C152F] text-[#A79BBF] hover:text-[#F3E8FF]"
                  : "hover:bg-[#E5EBDD] text-[#627768] hover:text-[#20352B]"
              }`}
            >
              ✕
            </button>
          </div>
        </header>

        {/* Conversation Body: Editorial Canvas */}
        <div
          tabIndex={0}
          aria-label="Conversation messages"
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4 focus:outline-none"
        >
          {/* Welcome State: Warm, Personal, Non-Generic Introduction */}
          {messages.length === 0 ? (
            <div className="py-3 space-y-4">
              {/* Sprout Mascot Intro Card */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  isDarkMode
                    ? "bg-[#130E24]/80 border-[#2A1E45]"
                    : "bg-[#F3F3E9]/80 border-[#D5DEC9]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    <SproutPixelArt
                      state="HAPPY"
                      palette={palette}
                      facing="right"
                      pupilOffset={{ x: 0, y: 0 }}
                      size={38}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p
                        className={`text-xs font-mono tracking-tight font-semibold ${
                          isDarkMode ? "text-purple-300" : "text-emerald-700"
                        }`}
                      >
                        Sprout · Vector RAG Companion
                      </p>
                      <span
                        className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded border uppercase tracking-wider font-semibold ${
                          isDarkMode
                            ? "bg-[#1F1538] border-purple-500/40 text-purple-300"
                            : "bg-[#E5EBDD] border-emerald-700/30 text-emerald-800"
                        }`}
                      >
                        Cosine θ Rank
                      </span>
                    </div>
                    <p
                      className={`text-[13px] leading-relaxed ${
                        isDarkMode ? "text-[#D4CBE5]" : "text-[#3D4C42]"
                      }`}
                    >
                      Hey, I&apos;m Sprout! I&apos;m Yashvardhan&apos;s tiny, delightfully opinionated portfolio companion. Grounded strictly in his verified engineering archives via an in-memory Vector RAG index. Ask me about his projects, academic metrics, or why you should hire him!
                    </p>
                  </div>
                </div>
              </div>

              {/* Suggested Questions Grid (Natural 2-column wrapping layout) */}
              <div className="space-y-2 pt-1">
                <span
                  className={`text-[11px] font-mono uppercase tracking-wider block ${
                    isDarkMode ? "text-[#A79BBF]" : "text-[#627768]"
                  }`}
                >
                  Suggested explorations
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SUGGESTED_QUESTIONS.map((question, qIdx) => (
                    <button
                      key={qIdx}
                      type="button"
                      onClick={() => {
                        setMascotState("CHEER");
                        handleSendMessage(question);
                      }}
                      className={`text-left p-2.5 rounded-lg border text-[12.5px] leading-snug transition-all duration-200 group flex items-center justify-between ${
                        isDarkMode
                          ? "bg-[#140F26] hover:bg-[#1E1738] border-[#261B40] hover:border-purple-500/50 text-[#F3E8FF]"
                          : "bg-[#FFFFFF] hover:bg-[#F3F3E9] border-[#D5DEC9] hover:border-emerald-700/40 text-[#20352B]"
                      }`}
                    >
                      <span>{question}</span>
                      <span
                        className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5 ml-1.5 shrink-0 ${
                          isDarkMode ? "text-purple-400" : "text-emerald-600"
                        }`}
                      >
                        →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Active Conversation Threads
            messages.map((message) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1.5`}
                >
                  {/* Message Bubble */}
                  <div
                    className={`relative max-w-[92%] sm:max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed transition-all group ${
                      isUser
                        ? isDarkMode
                          ? "bg-[#261642] border border-[#3E246A] text-[#FFFFFF] rounded-tr-sm"
                          : "bg-[#E5EBDD] border border-[#D5DEC9] text-[#20352B] rounded-tr-sm"
                        : isDarkMode
                        ? "bg-[#120E22] border border-[#261B40] text-[#F3E8FF] rounded-tl-sm w-full"
                        : "bg-[#FFFFFF] border border-[#D5DEC9] text-[#20352B] rounded-tl-sm w-full"
                    }`}
                  >
                    {/* Assistant Message Header Identity */}
                    {!isUser && (
                      <div className="flex items-center justify-between mb-1 pb-1 border-b border-inherit opacity-75">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isDarkMode ? "bg-purple-400" : "bg-emerald-600"
                            }`}
                          />
                          <span
                            className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                              isDarkMode ? "text-purple-300" : ""
                            }`}
                          >
                            Sprout
                          </span>
                        </div>
                        {/* Discreet Copy Message Action */}
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(message.id, message.content)}
                          aria-label="Copy message text"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] hover:underline"
                        >
                          {copiedId === message.id ? "Copied ✓" : "Copy"}
                        </button>
                      </div>
                    )}

                    {/* Formatted Content */}
                    <div>
                      {message.content ? (
                        renderFormattedContent(message.content)
                      ) : (
                        // Subtle Thinking Feedback
                        <div className="flex items-center gap-2 py-1">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isDarkMode ? "bg-purple-400" : "bg-emerald-500"
                            } animate-bounce`}
                          />
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isDarkMode ? "bg-purple-400" : "bg-emerald-500"
                            } animate-bounce [animation-delay:150ms]`}
                          />
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isDarkMode ? "bg-purple-400" : "bg-emerald-500"
                            } animate-bounce [animation-delay:300ms]`}
                          />
                          <span
                            className={`text-xs ml-1 font-mono italic ${
                              isDarkMode ? "text-[#A79BBF]" : "text-[#627768]"
                            }`}
                          >
                            Sprout is querying vector index...
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Vector RAG Telemetry Pill */}
                    {!isUser && message.telemetry && (
                      <div
                        className={`mt-2.5 pt-1.5 flex items-center justify-between text-[10.5px] font-mono border-t border-inherit ${
                          message.telemetry.securityWarning
                            ? "text-amber-400 font-medium"
                            : isDarkMode
                            ? "text-purple-300/90"
                            : "text-emerald-700/90"
                        }`}
                      >
                        {message.telemetry.securityWarning ? (
                          <span className="flex items-center gap-1.5">
                            <span>🛡️</span>
                            <span>Anti-Jailbreak Guard Active · Injection Deflected</span>
                          </span>
                        ) : (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center gap-1 font-semibold">
                              <span
                                className={`w-1.5 h-1.5 rounded-full inline-block animate-pulse ${
                                  isDarkMode ? "bg-purple-400" : "bg-emerald-500"
                                }`}
                              />
                              <span>Vector RAG</span>
                            </span>
                            <span className="opacity-40">|</span>
                            <span>{message.telemetry.vectors} chunks retrieved</span>
                            <span className="opacity-40">|</span>
                            <span>cos θ {message.telemetry.cosTheta}</span>
                            <span className="opacity-40">|</span>
                            <span className="tabular-nums">{message.telemetry.latencyMs}ms</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Interactive Contextual Action Pills */}
                    {!isUser && message.actions && message.actions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-inherit">
                        {message.actions.map((action, aIdx) => {
                          const isPdfResume =
                            action.href.includes("Resume") ||
                            action.label.toLowerCase().includes("resume");

                          if (isPdfResume) {
                            return (
                              <button
                                key={aIdx}
                                type="button"
                                onClick={() => handleActionClick(action)}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                                  isDarkMode
                                    ? "bg-[#1B1433] hover:bg-[#251B44] border-[#37265E] text-purple-200 hover:text-white"
                                    : "bg-[#E5EBDD] hover:bg-[#D5DEC9] border-[#D5DEC9] text-emerald-800"
                                }`}
                              >
                                <span>📄</span>
                                <span>{action.label}</span>
                              </button>
                            );
                          }

                          return (
                            <Link
                              key={aIdx}
                              href={action.href}
                              target={action.isExternal ? "_blank" : undefined}
                              rel={action.isExternal ? "noopener noreferrer" : undefined}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                                isDarkMode
                                  ? "bg-[#1B1433] hover:bg-[#251B44] border-[#37265E] text-purple-200 hover:text-white"
                                  : "bg-[#E5EBDD] hover:bg-[#D5DEC9] border-[#D5DEC9] text-emerald-800"
                              }`}
                            >
                              <span>↗</span>
                              <span>{action.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Composer: Clean, Integrated, Anchored */}
        <footer
          className={`p-3 shrink-0 border-t ${
            isDarkMode ? "border-[#221838] bg-[#0E0B18]" : "border-[#D5DEC9] bg-[#FCFBF8]"
          }`}
        >
          <div
            className={`relative flex items-center rounded-xl border transition-all ${
              isDarkMode
                ? "bg-[#140F26] border-[#261B40] focus-within:border-purple-500/60"
                : "bg-[#FFFFFF] border-[#D5DEC9] focus-within:border-emerald-700/50"
            }`}
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isStreaming}
              placeholder="Ask Sprout about Yashvardhan's work..."
              aria-label="Ask Sprout a question"
              className="flex-1 bg-transparent px-3 py-2 text-[13px] outline-none resize-none leading-relaxed placeholder:text-neutral-400 disabled:opacity-60 max-h-24"
              style={{ minHeight: "38px" }}
            />

            <div className="pr-1.5 flex items-center">
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isStreaming}
                aria-label="Send question"
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  inputValue.trim() && !isStreaming
                    ? isDarkMode
                      ? "bg-purple-600 hover:bg-purple-500 text-white font-bold active:scale-95 shadow-[0_0_12px_rgba(168,85,247,0.45)]"
                      : "bg-[#47785E] text-white font-bold hover:bg-[#3B664F] active:scale-95"
                    : "opacity-30 cursor-not-allowed text-neutral-400"
                }`}
              >
                ↑
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default SproutChatDrawer;
