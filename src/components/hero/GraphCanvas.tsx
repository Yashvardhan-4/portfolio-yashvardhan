"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface Node {
  id: number;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  radius: number;
  distance: number;
  visited: boolean;
  highlightTime: number;
}

interface Edge {
  source: number;
  target: number;
  weight: number;
  activeTime: number;
}

export function GraphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  const [nodeCount, setNodeCount] = useState(24);
  const [edgeCount, setEdgeCount] = useState(36);
  const [showWeights, setShowWeights] = useState(false);
  const [lastTraversed, setLastTraversed] = useState<string>("v0");
  const [fps, setFps] = useState(60);

  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  // Initialize graph topology
  const initTopology = useCallback((width: number, height: number) => {
    const nodes: Node[] = [];
    const count = 24;
    const padding = 60;

    // Create distributed nodes
    for (let i = 0; i < count; i++) {
      const col = i % 6;
      const row = Math.floor(i / 6);
      const colWidth = (width - padding * 2) / 5;
      const rowHeight = (height - padding * 2) / 3;

      const baseX = padding + col * colWidth + (Math.random() - 0.5) * (colWidth * 0.45);
      const baseY = padding + row * rowHeight + (Math.random() - 0.5) * (rowHeight * 0.45);

      nodes.push({
        id: i,
        label: `v${i}`,
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 5,
        distance: Infinity,
        visited: false,
        highlightTime: 0,
      });
    }

    // Connect edges based on proximity (Delaunay-like minimal graph)
    const edges: Edge[] = [];
    const edgeSet = new Set<string>();

    for (let i = 0; i < count; i++) {
      const distances: { target: number; dist: number }[] = [];
      for (let j = 0; j < count; j++) {
        if (i === j) continue;
        const dx = nodes[i].baseX - nodes[j].baseX;
        const dy = nodes[i].baseY - nodes[j].baseY;
        distances.push({ target: j, dist: Math.hypot(dx, dy) });
      }
      distances.sort((a, b) => a.dist - b.dist);

      // Connect to 2 or 3 closest neighbors
      const neighbors = distances.slice(0, 3);
      for (const n of neighbors) {
        const u = Math.min(i, n.target);
        const v = Math.max(i, n.target);
        const key = `${u}-${v}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edges.push({
            source: u,
            target: v,
            weight: Math.round(n.dist / 20) + 1,
            activeTime: 0,
          });
        }
      }
    }

    nodesRef.current = nodes;
    edgesRef.current = edges;
    setNodeCount(nodes.length);
    setEdgeCount(edges.length);
  }, []);

  // Run BFS / Dijkstra Traversal from a root node
  const runTraversal = useCallback((startNodeId: number) => {
    const nodes = nodesRef.current;
    const edges = edgesRef.current;
    if (!nodes[startNodeId]) return;

    // Reset state
    nodes.forEach((n) => {
      n.distance = Infinity;
      n.visited = false;
      n.highlightTime = 0;
    });
    edges.forEach((e) => {
      e.activeTime = 0;
    });

    nodes[startNodeId].distance = 0;
    nodes[startNodeId].visited = true;
    nodes[startNodeId].highlightTime = Date.now();
    setLastTraversed(`v${startNodeId}`);

    // Standard BFS queue
    const queue: number[] = [startNodeId];
    let step = 0;

    const traverseInterval = setInterval(() => {
      if (queue.length === 0 || step > 20) {
        clearInterval(traverseInterval);
        return;
      }

      const curr = queue.shift()!;
      step++;

      // Find all neighbors
      for (const edge of edges) {
        let neighbor = -1;
        if (edge.source === curr) neighbor = edge.target;
        else if (edge.target === curr) neighbor = edge.source;

        if (neighbor !== -1 && !nodes[neighbor].visited) {
          nodes[neighbor].visited = true;
          nodes[neighbor].distance = nodes[curr].distance + edge.weight;
          nodes[neighbor].highlightTime = Date.now();
          edge.activeTime = Date.now();
          queue.push(neighbor);
        }
      }
    }, 70);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    initTopology(width, height);

    // Initial traversal from node 0
    setTimeout(() => runTraversal(0), 400);

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          canvas.width = w * dpr;
          canvas.height = h * dpr;
          ctx.scale(dpr, dpr);
          width = w;
          height = h;
          initTopology(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Intersection observer to freeze canvas when out of viewport
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    intersectionObserver.observe(container);

    // Render loop
    let lastTime = performance.now();
    let frameCounter = 0;
    let fpsTimer = performance.now();

    const render = (time: number) => {
      if (!isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // FPS tracking
      frameCounter++;
      if (time - fpsTimer > 1000) {
        setFps(Math.round((frameCounter * 1000) / (time - fpsTimer)));
        frameCounter = 0;
        fpsTimer = time;
      }

      const now = Date.now();
      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      // Background clear
      ctx.fillStyle = "#08090a";
      ctx.fillRect(0, 0, width, height);

      // Draw subtle coordinate grid
      ctx.strokeStyle = "#16181d";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = gridSize; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = gridSize; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Physics: Spring to base and mouse repulsion
      for (const node of nodes) {
        const dx = node.baseX - node.x;
        const dy = node.baseY - node.y;
        node.vx += dx * 0.04;
        node.vy += dy * 0.04;

        // Mouse interaction
        if (mouseRef.current.active) {
          const mdx = node.x - mouseRef.current.x;
          const mdy = node.y - mouseRef.current.y;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < 140 && mdist > 0) {
            const force = (140 - mdist) / 140;
            node.vx += (mdx / mdist) * force * 1.5;
            node.vy += (mdy / mdist) * force * 1.5;
          }
        }

        // Dampening
        node.vx *= 0.88;
        node.vy *= 0.88;
        node.x += node.vx;
        node.y += node.vy;
      }

      // Draw edges
      for (const edge of edges) {
        const u = nodes[edge.source];
        const v = nodes[edge.target];
        if (!u || !v) continue;

        const age = now - edge.activeTime;
        const isPulse = age < 1200;

        ctx.beginPath();
        ctx.moveTo(u.x, u.y);
        ctx.lineTo(v.x, v.y);

        if (isPulse) {
          const pulseIntensity = 1 - age / 1200;
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.4 + pulseIntensity * 0.6})`;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Traveling beam pulse
          const t = (age % 600) / 600;
          const bx = u.x + (v.x - u.x) * t;
          const by = u.y + (v.y - u.y) * t;
          ctx.fillStyle = "#10b981";
          ctx.beginPath();
          ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = "#1f232b";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Optional weight labels
        if (showWeights) {
          const mx = (u.x + v.x) / 2;
          const my = (u.y + v.y) / 2;
          ctx.font = "9px 'JetBrains Mono', monospace";
          ctx.fillStyle = isPulse ? "#10b981" : "#5b606e";
          ctx.fillText(`w:${edge.weight}`, mx + 3, my - 3);
        }
      }

      // Draw vertices / nodes
      for (const node of nodes) {
        const age = now - node.highlightTime;
        const isHighlight = age < 2000;

        // Outer glow on traverse
        if (isHighlight) {
          const glowAlpha = Math.max(0, 1 - age / 2000) * 0.35;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 185, 129, ${glowAlpha})`;
          ctx.fill();
        }

        // Core vertex circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHighlight ? node.radius + 1.5 : node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isHighlight ? "#10b981" : "#111317";
        ctx.fill();
        ctx.strokeStyle = isHighlight ? "#34d399" : "#282c35";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Node label
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.fillStyle = isHighlight ? "#f4f4f5" : "#6f7482";
        ctx.fillText(node.label, node.x + 8, node.y - 6);

        // Distance indicator if reached
        if (node.visited && node.distance < Infinity) {
          ctx.font = "9px 'JetBrains Mono', monospace";
          ctx.fillStyle = "#10b981";
          ctx.fillText(`d=${node.distance}`, node.x + 8, node.y + 6);
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    // Mouse handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Find closest node
      let closestId = 0;
      let minDist = Infinity;
      nodesRef.current.forEach((n) => {
        const d = Math.hypot(n.x - clickX, n.y - clickY);
        if (d < minDist) {
          minDist = d;
          closestId = n.id;
        }
      });

      runTraversal(closestId);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
    };
  }, [initTopology, runTraversal, showWeights]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[380px] sm:h-[420px] md:h-[480px] w-full flex-col border border-[var(--border)] bg-[#08090a]"
    >
      {/* Canvas Header / Technical Telemetry */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)]/70 px-3.5 py-2 font-mono text-[11px] text-[var(--fg-muted)]">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          <span className="text-[var(--fg)] font-medium">GRAPH_THEORY_SIMULATION</span>
          <span className="hidden sm:inline text-[9px] uppercase tracking-wider text-[var(--fg-muted)]">
            [IIT MADRAS ELITE+SILVER SPECIMEN]
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="tabular-nums text-[var(--accent)]">
            |V|={nodeCount} |E|={edgeCount}
          </span>
          <span className="hidden md:inline tabular-nums">ROOT:{lastTraversed}</span>
          <span className="tabular-nums text-xs">{fps} FPS</span>
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-crosshair touch-none"
        aria-label="Interactive Algorithmic Graph Canvas demonstrating topological nodes and Dijkstra / BFS shortest path traversals"
      />

      {/* Interactive Control Dock */}
      <div className="flex flex-wrap items-center justify-between border-t border-[var(--border)] bg-[var(--surface)]/90 px-3.5 py-2 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const randomNode = Math.floor(Math.random() * nodeCount);
              runTraversal(randomNode);
            }}
            className="border border-[var(--accent)]/50 bg-[var(--accent)]/10 px-2.5 py-1 text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[#08090a]"
          >
            TRAVERSE (BFS/DIJKSTRA)
          </button>
          <button
            type="button"
            onClick={() => setShowWeights(!showWeights)}
            className={`border px-2.5 py-1 transition-colors ${
              showWeights
                ? "border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)]"
            }`}
          >
            {showWeights ? "WEIGHTS: ON" : "WEIGHTS: OFF"}
          </button>
        </div>

        <span className="text-[10px] text-[var(--fg-muted)] hidden sm:inline">
          CLICK ANY VERTEX TO INITIALIZE SHORTEST PATH SEARCH
        </span>
      </div>
    </div>
  );
}
