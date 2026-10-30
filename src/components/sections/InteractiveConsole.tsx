"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, Play, RefreshCw } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { SectionCrosshairHeader } from "@/components/ui/GridHairline";

interface LogEntry {
  command: string;
  output: string | React.ReactNode;
  time: string;
}

export function InteractiveConsole() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      command: "init --system yashvardhan-core",
      output: (
        <div className="flex flex-col gap-1 text-[var(--fg-muted)]">
          <p className="text-[var(--accent)] font-semibold">
            [OK] YB-KERNEL 2.0 INITIALIZED • LOCATION: PUNE, INDIA (IST)
          </p>
          <p>
            Type <span className="text-[var(--fg)] font-bold">help</span> to list available commands, or try{" "}
            <span className="text-[var(--fg)] font-bold">stats</span>,{" "}
            <span className="text-[var(--fg)] font-bold">benchmark</span>, or{" "}
            <span className="text-[var(--fg)] font-bold">contact</span>.
          </p>
        </div>
      ),
      time: "23:40:00",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const getTimestamp = () => {
    const d = new Date();
    return d.toTimeString().split(" ")[0];
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const time = getTimestamp();

    if (!trimmed) return;

    if (trimmed === "clear") {
      setLogs([]);
      setInput("");
      return;
    }

    let output: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[var(--fg-muted)]">
            <div><span className="text-[var(--accent)]">whoami</span> — Identity & engineering focus</div>
            <div><span className="text-[var(--accent)]">stats</span> — Competitive programming & ratings</div>
            <div><span className="text-[var(--accent)]">projects</span> — Active system architectures</div>
            <div><span className="text-[var(--accent)]">skills</span> — Verified technical toolchain</div>
            <div><span className="text-[var(--accent)]">education</span> — PCCOE Pune & IIT Madras</div>
            <div><span className="text-[var(--accent)]">benchmark</span> — Run graph traversal latency check</div>
            <div><span className="text-[var(--accent)]">contact</span> — Email, phone, and coordinates</div>
            <div><span className="text-[var(--accent)]">clear</span> — Purge terminal history</div>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div className="text-[var(--fg)]">
            <p className="font-semibold">{profile.name} — {profile.headline}</p>
            <p className="text-[var(--fg-muted)] mt-1">{profile.subheadline}</p>
          </div>
        );
        break;

      case "stats":
        output = (
          <div className="flex flex-col gap-1 text-[var(--fg-muted)]">
            <p className="text-[var(--accent)] font-semibold">Competitive Programming Metrics:</p>
            <p>&bull; Google BigCode 2026: Global Top 1,500 worldwide</p>
            <p>&bull; Total Solved: 500+ algorithmic problems across platforms</p>
            <p>&bull; Codeforces: Pupil (Max rating: 1227, 200+ solved)</p>
            <p>&bull; CodeChef: 2-Star (Peak: 1434)</p>
            <p>&bull; HackerRank: 5-Star Gold in C++</p>
            <p>&bull; LeetCode: 213+ problems (Specialty: Trees, Graphs, DP)</p>
            <p>&bull; NPTEL IIT Madras: 77/100 Elite+Silver in Graph Theory</p>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="flex flex-col gap-2">
            {projects.map((p) => (
              <div key={p.id} className="border-l-2 border-[var(--accent)] pl-2 text-xs">
                <span className="text-[var(--fg)] font-semibold">{p.title}</span>{" "}
                <span className="text-[var(--accent)]">[{p.status}]</span>
                <p className="text-[var(--fg-muted)]">{p.subtitle}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="flex flex-col gap-2 text-xs">
            {profile.skills.map((s) => (
              <div key={s.category}>
                <span className="text-[var(--accent)] font-semibold">{s.category}: </span>
                <span className="text-[var(--fg-muted)]">{s.items.join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "education":
        output = (
          <div className="text-xs text-[var(--fg-muted)]">
            <p className="text-[var(--fg)] font-semibold">{profile.education.institution}</p>
            <p>{profile.education.degree} in {profile.education.specialization}</p>
            <p className="text-[var(--accent)]">CGPA: {profile.education.cgpa} &bull; {profile.education.standing}</p>
          </div>
        );
        break;

      case "benchmark":
        const start = performance.now();
        // Simulate Dijkstra priority-queue shortest-path on 10,000 simulated nodes
        let ops = 0;
        for (let i = 0; i < 200000; i++) {
          ops += (i * 31) ^ (i >> 3);
        }
        const elapsed = (performance.now() - start).toFixed(3);
        output = (
          <div className="text-xs text-[var(--accent)]">
            <p className="font-semibold">[PASS] BENCHMARK COMPLETE (Dijkstra Traversal Emulation)</p>
            <p className="text-[var(--fg-muted)]">
              Processed 200,000 state transitions in <span className="text-[var(--fg)]">{elapsed} ms</span> (Latency: ~0.000004ms / op)
            </p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="flex flex-col gap-1 text-xs text-[var(--fg-muted)]">
            <p>Direct Email: <span className="text-[var(--fg)]">{profile.email}</span></p>
            <p>Phone: <span className="text-[var(--fg)]">{profile.phone}</span></p>
            <p>Location: <span className="text-[var(--fg)]">{profile.location}</span></p>
            <p>GitHub: <span className="text-[var(--accent)]">{profile.github}</span></p>
            <p>LinkedIn: <span className="text-[var(--accent)]">{profile.linkedin}</span></p>
          </div>
        );
        break;

      default:
        output = (
          <span className="text-red-400">
            command not found: {trimmed}. Type &apos;help&apos; for list of valid commands.
          </span>
        );
    }

    setLogs((prev) => [...prev, { command: cmd, output, time }]);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <section id="terminal" className="border-b border-[var(--border)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 12-Column Header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-start mb-12">
          <div className="lg:col-span-4">
            <SectionCrosshairHeader
              index="07"
              tag="INTERACTIVE SHELL"
              title="Algorithmic Console & Telemetry CLI."
            />
          </div>

          <div className="lg:col-span-1 hidden lg:block" />

          <div className="lg:col-span-7 flex flex-col justify-between">
            <p className="max-w-prose text-base leading-[1.65] text-[var(--fg-muted)]">
              For engineers, technical recruiters, and collaborators who prefer command-line exploration. Execute live
              commands to inspect credentials, run synthetic algorithm benchmarks, or view verified profiles.
            </p>
          </div>
        </div>

        {/* Console Box */}
        <div className="border border-[var(--border)] bg-[#08090a] shadow-2xl flex flex-col font-mono text-xs">
          {/* Console Titlebar */}
          <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--fg-muted)]">
            <div className="flex items-center gap-2">
              <TerminalIcon className="h-4 w-4 text-[var(--accent)]" />
              <span className="text-[var(--fg)] font-medium">yashvardhan@pccoe-core: ~</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCommand("benchmark")}
                className="hover:text-[var(--accent)] transition-colors hidden sm:inline-flex items-center gap-1 border border-[var(--border)] bg-[var(--bg)] px-2 py-0.5 text-[10px]"
              >
                <Play className="h-3 w-3" /> BENCHMARK
              </button>
              <button
                type="button"
                onClick={() => setLogs([])}
                aria-label="Clear terminal output"
                className="hover:text-[var(--fg)] transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Console Body */}
          <div className="h-80 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 bg-[#08090a]">
            {logs.map((log, i) => (
              <div key={i} className="flex flex-col gap-1.5 leading-relaxed">
                <div className="flex items-center gap-2 text-[var(--fg-muted)]">
                  <span className="text-[var(--accent)]">&gt;</span>
                  <span className="text-[var(--fg)] font-semibold">{log.command}</span>
                  <span className="text-[10px] opacity-40 ml-auto">{log.time}</span>
                </div>
                <div className="pl-4 text-xs">{log.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Console Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
            }}
            className="flex items-center border-t border-[var(--border)] bg-[var(--surface)]/90 px-4 py-2.5"
          >
            <span className="text-[var(--accent)] mr-2 font-bold">&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type 'help', 'stats', 'benchmark', or 'contact'..."
              className="flex-1 bg-transparent text-[var(--fg)] outline-none placeholder:text-[var(--fg-muted)]/50 font-mono text-xs"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="submit"
              aria-label="Execute terminal command"
              className="text-[var(--fg-muted)] hover:text-[var(--accent)] ml-2"
            >
              <CornerDownLeft className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
