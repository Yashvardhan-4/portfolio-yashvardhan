"use client";

import React from "react";
import { profile } from "@/data/profile";
import { SectionCrosshairHeader } from "@/components/ui/GridHairline";
import { Code, Database, Layout, Server, Terminal, Shield } from "lucide-react";

export function TechStackSection() {
  const stackGroups = [
    {
      title: "Core Languages",
      role: "SYSTEMS & ALGORITHMS",
      icon: Terminal,
      context:
        "C++ is my primary weapon for competitive programming and graph theory algorithms. TypeScript and Python drive web backends, automation pipelines, and machine learning models. SQL powers strict relational schemas.",
      technologies: [
        { name: "C++", role: "Competitive Programming, STL, Memory Management", status: "Primary Competitive" },
        { name: "TypeScript", role: "Strict Type Systems, Next.js, API Contracts", status: "Full Production" },
        { name: "JavaScript (ES6+)", role: "Async I/O, WebGL, DOM Architecture", status: "Full Production" },
        { name: "Python", role: "Machine Learning, Scripting, Data Analytics", status: "Active" },
        { name: "SQL (PostgreSQL)", role: "Relational Modeling, Query Optimization", status: "Production" },
      ],
    },
    {
      title: "Frontend & Graphics Architecture",
      role: "INTERFACES & RENDERING",
      icon: Layout,
      context:
        "Building deterministic, accessible client interfaces. Skilled in Three.js and Canvas 2D for tactile graphics, combined with Next.js App Router for server rendering and offline progressive web apps (PWAs).",
      technologies: [
        { name: "Next.js (App Router)", role: "Server Components, Streaming SSR, Routing", status: "Production" },
        { name: "React.js", role: "Component Architecture, Reactive State", status: "Production" },
        { name: "Three.js & WebGL", role: "3D Viewports, Shaders, Spatial Rendering", status: "Applied" },
        { name: "Canvas API", role: "High-Frequency 60FPS Dynamic Particle Systems", status: "Applied" },
        { name: "Tailwind CSS", role: "Deterministic Styling, Design Systems", status: "Production" },
        { name: "Progressive Web Apps", role: "Offline Service Workers, Manifest Caching", status: "100% Audit" },
      ],
    },
    {
      title: "Backend Engines & Data Integrity",
      role: "SERVERS & SECURITY",
      icon: Server,
      context:
        "Designing modular REST APIs, stateful service worker caching, and database schemas protected with PostgreSQL Row-Level Security (RLS) to enforce zero-trust access control at the data layer.",
      technologies: [
        { name: "Node.js & Express", role: "RESTful Service Endpoints, Middleware Chains", status: "Production" },
        { name: "PostgreSQL", role: "ACID Transactions, Foreign Keys, Indexing", status: "Production" },
        { name: "Supabase & RLS", role: "Granular Row-Level Security, Real-Time Data", status: "Production" },
        { name: "MongoDB", role: "Document Storage, Aggregation Pipelines", status: "Applied" },
        { name: "Service Workers", role: "Background Sync, Cache-First Stategies", status: "Production" },
      ],
    },
    {
      title: "Foundational Computer Science",
      role: "THEORETICAL RIGOR",
      icon: Shield,
      context:
        "Trained through PCCOE Pune computer engineering coursework and IIT Madras Algorithmic Graph Theory. Focused on asymptotic complexity analysis, graph traversals, and concurrency models.",
      technologies: [
        { name: "Data Structures & Algorithms", role: "Graphs, Trees, Dynamic Programming", status: "500+ Solved" },
        { name: "Graph Theory", role: "Max Flow, Shortest Path, Eulerian/Hamiltonian", status: "IIT Madras 77%" },
        { name: "Object-Oriented Design", role: "Inheritance, Polymorphism, SOLID", status: "Academic & Applied" },
        { name: "Database Management (DBMS)", role: "Relational Algebra, Normalization", status: "Academic & Applied" },
        { name: "Operating Systems", role: "Process Concurrency, Threading, Memory", status: "Academic" },
      ],
    },
  ];

  return (
    <section id="systems" className="border-b border-[var(--border)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 12-Column Header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-start mb-12">
          <div className="lg:col-span-4">
            <SectionCrosshairHeader
              index="04"
              tag="SYSTEMS IN CONTEXT"
              title="Technical Stack & Engineering Disciplines."
            />
          </div>

          <div className="lg:col-span-1 hidden lg:block" />

          <div className="lg:col-span-7 flex flex-col justify-between">
            <p className="max-w-prose text-base leading-[1.65] text-[var(--fg-muted)]">
              Rather than an unstructured list of logos, this matrix maps technologies directly to production roles:
              where they are deployed, how they are constrained, and what architectural guarantees they provide.
            </p>
          </div>
        </div>

        {/* Exposed Hairline Grid for Tech Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)]">
          {stackGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div key={group.title} className="bg-[var(--bg)] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] text-[var(--fg-muted)] mb-3">
                    <span className="text-[var(--accent)]">[DOMAIN-0{idx + 1}]</span>
                    <span className="border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-[var(--fg-muted)]">
                      {group.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Icon className="h-5 w-5 text-[var(--accent)]" />
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[var(--fg)]">
                      {group.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
                    {group.context}
                  </p>

                  {/* Itemized spec list */}
                  <div className="mt-6 flex flex-col divide-y divide-[var(--border-subtle)] border-t border-[var(--border-subtle)]">
                    {group.technologies.map((tech) => (
                      <div key={tech.name} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                          <span className="font-mono font-medium text-[var(--fg)]">{tech.name}</span>
                          <span className="text-[11px] text-[var(--fg-muted)]">&bull; {tech.role}</span>
                        </div>
                        <span className="font-mono text-[10px] text-[var(--accent)] shrink-0 border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-2 py-0.5">
                          {tech.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-[10px] text-[var(--fg-muted)]">
                  <span>DISCIPLINE: RIGOR & CONSTRAINTS</span>
                  <span>VERIFIED PROFICIENCY</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
