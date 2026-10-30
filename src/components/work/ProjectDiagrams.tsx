import React from "react";

/**
 * Verified SVG Architectural Schematics for Selected Work.
 * Hand-crafted with exact domain constraints, exposed hairlines, and restrained typography.
 */

export function ShivkushDiagram() {
  return (
    <div className="w-full border border-[#1E2536] bg-[#090C12] p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between border-b border-[#1E2536] pb-2 font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">
        <span>ARCHITECTURAL SCHEMATIC // SHIVKUSH PWA</span>
        <span className="text-[#00F5D4]">SUPABASE RLS & PWA CACHE</span>
      </div>
      <svg
        viewBox="0 0 540 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-[10px] font-mono"
        role="img"
        aria-label="Shivkush PWA System Architecture showing client service worker cache, Supabase Row-Level Security, and order fulfillment"
      >
        <title>Shivkush Nursery Architecture Diagram</title>

        {/* Background Grid Pattern */}
        <defs>
          <pattern id="grid-dots-shivkush" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.75" fill="#1E2536" />
          </pattern>
          <marker id="arrow-shivkush" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#00F5D4" />
          </marker>
          <marker id="arrow-dim-shivkush" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#4A4E58" />
          </marker>
        </defs>
        <rect width="540" height="270" fill="url(#grid-dots-shivkush)" opacity="0.6" />

        {/* COLUMN 1: Client PWA Tier */}
        <g transform="translate(15, 20)">
          <rect width="150" height="225" fill="#0E121A" stroke="#1E2536" strokeWidth="1" />
          <rect width="150" height="24" fill="#121622" stroke="#1E2536" strokeWidth="1" />
          <text x="10" y="16" fill="#F8FAFC" fontWeight="600">CLIENT PWA RUNTIME</text>

          {/* Sub block 1: UI */}
          <rect x="10" y="36" width="130" height="42" fill="#07080B" stroke="#1E2536" />
          <text x="16" y="52" fill="#00F5D4">Bilingual Interface</text>
          <text x="16" y="67" fill="#94A3B8">English / मराठी Catalog</text>

          {/* Sub block 2: Service Worker */}
          <rect x="10" y="88" width="130" height="58" fill="#07080B" stroke="#00F5D4" strokeDasharray="3 2" />
          <text x="16" y="104" fill="#F8FAFC" fontWeight="600">Service Worker (sw.js)</text>
          <text x="16" y="119" fill="#94A3B8">• Cache-First Assets</text>
          <text x="16" y="134" fill="#94A3B8">• Offline Fallback Doc</text>

          {/* Sub block 3: State */}
          <rect x="10" y="156" width="130" height="42" fill="#07080B" stroke="#1E2536" />
          <text x="16" y="172" fill="#00F5D4">Local Cart State</text>
          <text x="16" y="187" fill="#94A3B8">Persistent JSON Storage</text>

          <text x="10" y="218" fill="#4A4E58" fontSize="9">LOW-BANDWIDTH OPTIMIZED</text>
        </g>

        {/* CONNECTING ARROWS 1 -> 2 */}
        <path d="M 165 95 L 195 95" stroke="#00F5D4" strokeWidth="1.2" markerEnd="url(#arrow-shivkush)" />
        <text x="167" y="88" fill="#00F5D4" fontSize="8">ORDER</text>

        <path d="M 195 190 L 165 190" stroke="#4A4E58" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrow-dim-shivkush)" />
        <text x="167" y="184" fill="#94A3B8" fontSize="8">SYNC</text>

        {/* COLUMN 2: Database & Security Matrix */}
        <g transform="translate(195, 20)">
          <rect width="180" height="225" fill="#0E121A" stroke="#00F5D4" strokeWidth="1" />
          <rect width="180" height="24" fill="#1F1C18" stroke="#00F5D4" strokeWidth="1" />
          <text x="10" y="16" fill="#00F5D4" fontWeight="600">SUPABASE POSTGRESQL</text>

          {/* RLS Policy 1 */}
          <rect x="10" y="36" width="160" height="52" fill="#07080B" stroke="#1E2536" />
          <text x="16" y="52" fill="#F8FAFC">Policy: Public Insert</text>
          <text x="16" y="66" fill="#94A3B8">ROLE: anon</text>
          <text x="16" y="79" fill="#00F5D4">CHECK (true) — No Login Req</text>

          {/* RLS Policy 2 */}
          <rect x="10" y="98" width="160" height="52" fill="#07080B" stroke="#1E2536" />
          <text x="16" y="114" fill="#F8FAFC">Policy: Admin Access</text>
          <text x="16" y="128" fill="#94A3B8">ROLE: authenticated</text>
          <text x="16" y="141" fill="#94A3B8">SELECT / UPDATE permissions</text>

          {/* Table schema */}
          <rect x="10" y="160" width="160" height="52" fill="#07080B" stroke="#1E2536" />
          <text x="16" y="176" fill="#00F5D4">Table: orders</text>
          <text x="16" y="190" fill="#94A3B8">UUID, items JSONB, status</text>
          <text x="16" y="203" fill="#94A3B8">status: pending | confirmed</text>
        </g>

        {/* CONNECTING ARROWS 2 -> 3 */}
        <path d="M 375 125 L 405 125" stroke="#00F5D4" strokeWidth="1.2" markerEnd="url(#arrow-shivkush)" />
        <text x="378" y="118" fill="#00F5D4" fontSize="8">AUTH</text>

        {/* COLUMN 3: Operations & Fulfillment */}
        <g transform="translate(405, 20)">
          <rect width="120" height="225" fill="#0E121A" stroke="#1E2536" strokeWidth="1" />
          <rect width="120" height="24" fill="#121622" stroke="#1E2536" strokeWidth="1" />
          <text x="10" y="16" fill="#F8FAFC" fontWeight="600">OPERATIONS</text>

          {/* Admin Portal */}
          <rect x="8" y="36" width="104" height="64" fill="#07080B" stroke="#1E2536" />
          <text x="14" y="52" fill="#F8FAFC">Admin Portal</text>
          <text x="14" y="67" fill="#94A3B8">• Real-time stock</text>
          <text x="14" y="81" fill="#94A3B8">• Status toggles</text>
          <text x="14" y="93" fill="#94A3B8">• Threshold alert</text>

          {/* WhatsApp Routing */}
          <rect x="8" y="110" width="104" height="64" fill="#07080B" stroke="#00F5D4" />
          <text x="14" y="126" fill="#00F5D4">1-Tap WhatsApp</text>
          <text x="14" y="141" fill="#F8FAFC">Order Dispatch</text>
          <text x="14" y="156" fill="#94A3B8">Zero routing</text>
          <text x="14" y="168" fill="#94A3B8">friction flow</text>

          <text x="8" y="210" fill="#4A4E58" fontSize="8">LIVE IN AHILYANAGAR</text>
        </g>
      </svg>
    </div>
  );
}

export function PralayVeerDiagram() {
  return (
    <div className="w-full border border-[#1E2536] bg-[#090C12] p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between border-b border-[#1E2536] pb-2 font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">
        <span>SYSTEM SCHEMATIC // PRALAYVEER SIH 2024</span>
        <span className="text-[#00F5D4]">LEAFLET API & WCAG AA</span>
      </div>
      <svg
        viewBox="0 0 540 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-[10px] font-mono"
        role="img"
        aria-label="PralayVeer emergency response network showing low-bandwidth routing and WCAG AA high-contrast UI"
      >
        <title>PralayVeer Emergency Architecture</title>
        <defs>
          <pattern id="grid-dots-pv" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.75" fill="#1E2536" />
          </pattern>
          <marker id="arrow-pv" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#00F5D4" />
          </marker>
        </defs>
        <rect width="540" height="240" fill="url(#grid-dots-pv)" opacity="0.6" />

        {/* Tier 1: Constrained Cellular Environment */}
        <g transform="translate(15, 25)">
          <rect width="145" height="190" fill="#0E121A" stroke="#1E2536" strokeWidth="1" />
          <rect width="145" height="24" fill="#121622" stroke="#1E2536" />
          <text x="10" y="16" fill="#F8FAFC" fontWeight="600">DEGRADED NETWORK</text>

          <rect x="10" y="38" width="125" height="46" fill="#07080B" stroke="#1E2536" />
          <text x="16" y="54" fill="#00F5D4">2G / 3G Constraints</text>
          <text x="16" y="69" fill="#94A3B8">High latency & drops</text>

          <rect x="10" y="94" width="125" height="46" fill="#07080B" stroke="#1E2536" />
          <text x="16" y="110" fill="#F8FAFC">Payload Budget</text>
          <text x="16" y="125" fill="#94A3B8">Zero heavy trackers</text>

          <rect x="10" y="150" width="125" height="46" fill="#07080B" stroke="#1E2536" />
          <text x="16" y="166" fill="#94A3B8">Modular Bundle</text>
          <text x="16" y="181" fill="#4A4E58">Fast parse & execute</text>
        </g>

        {/* Arrow 1 -> 2 */}
        <path d="M 160 120 L 195 120" stroke="#00F5D4" strokeWidth="1.2" markerEnd="url(#arrow-pv)" />
        <text x="164" y="112" fill="#00F5D4" fontSize="8">TILES</text>

        {/* Tier 2: Leaflet Core & Accessibility */}
        <g transform="translate(195, 25)">
          <rect width="175" height="190" fill="#0E121A" stroke="#00F5D4" strokeWidth="1" />
          <rect width="175" height="24" fill="#1F1C18" stroke="#00F5D4" />
          <text x="10" y="16" fill="#00F5D4" fontWeight="600">GEOSPATIAL & ACCESSIBILITY</text>

          <rect x="10" y="38" width="155" height="46" fill="#07080B" stroke="#1E2536" />
          <text x="16" y="54" fill="#F8FAFC">Leaflet API Engine</text>
          <text x="16" y="69" fill="#94A3B8">Vector map tiles & caching</text>

          <rect x="10" y="94" width="155" height="46" fill="#07080B" stroke="#00F5D4" />
          <text x="16" y="110" fill="#00F5D4">WCAG AA Standard</text>
          <text x="16" y="125" fill="#F8FAFC">High-contrast daytime view</text>

          <rect x="10" y="150" width="155" height="46" fill="#07080B" stroke="#1E2536" />
          <text x="16" y="166" fill="#94A3B8">Cognitive Simplification</text>
          <text x="16" y="181" fill="#4A4E58">Zero clutter during crises</text>
        </g>

        {/* Arrow 2 -> 3 */}
        <path d="M 370 120 L 405 120" stroke="#00F5D4" strokeWidth="1.2" markerEnd="url(#arrow-pv)" />
        <text x="373" y="112" fill="#00F5D4" fontSize="8">ROUTE</text>

        {/* Tier 3: Civic Response */}
        <g transform="translate(405, 25)">
          <rect width="120" height="190" fill="#0E121A" stroke="#1E2536" strokeWidth="1" />
          <rect width="120" height="24" fill="#121622" stroke="#1E2536" />
          <text x="10" y="16" fill="#F8FAFC" fontWeight="600">CIVIC DISPATCH</text>

          <rect x="8" y="38" width="104" height="46" fill="#07080B" stroke="#1E2536" />
          <text x="14" y="54" fill="#F8FAFC">Shelter Pins</text>
          <text x="14" y="69" fill="#94A3B8">Proximity sorting</text>

          <rect x="8" y="94" width="104" height="46" fill="#07080B" stroke="#1E2536" />
          <text x="14" y="110" fill="#00F5D4">Evacuation</text>
          <text x="14" y="125" fill="#94A3B8">Safe zone vectors</text>

          <rect x="8" y="150" width="104" height="46" fill="#07080B" stroke="#1E2536" />
          <text x="14" y="166" fill="#F8FAFC">Offline SOS</text>
          <text x="14" y="181" fill="#4A4E58">Emergency contact</text>
        </g>
      </svg>
    </div>
  );
}

export function ValuationDiagram() {
  return (
    <div className="w-full border border-[#1E2536] bg-[#090C12] p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between border-b border-[#1E2536] pb-2 font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">
        <span>ML PIPELINE SCHEMATIC // VALUATION PREDICTOR</span>
        <span className="text-[#00F5D4]">SCIKIT-LEARN & LOG-SCALING</span>
      </div>
      <svg
        viewBox="0 0 540 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-[10px] font-mono"
        role="img"
        aria-label="Startup Valuation Predictor machine learning regression pipeline from feature ingestion to model prediction"
      >
        <title>Machine Learning Regression Pipeline Diagram</title>
        <defs>
          <pattern id="grid-dots-ml" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.75" fill="#1E2536" />
          </pattern>
          <marker id="arrow-ml" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#00F5D4" />
          </marker>
        </defs>
        <rect width="540" height="240" fill="url(#grid-dots-ml)" opacity="0.6" />

        {/* Phase 1: Feature Engineering */}
        <g transform="translate(15, 25)">
          <rect width="145" height="190" fill="#0E121A" stroke="#1E2536" strokeWidth="1" />
          <rect width="145" height="24" fill="#121622" stroke="#1E2536" />
          <text x="10" y="16" fill="#F8FAFC" fontWeight="600">DATA PREPROCESSING</text>

          <rect x="10" y="38" width="125" height="46" fill="#07080B" stroke="#1E2536" />
          <text x="16" y="54" fill="#F8FAFC">Venture Rounds</text>
          <text x="16" y="69" fill="#94A3B8">Historical funding records</text>

          <rect x="10" y="94" width="125" height="46" fill="#07080B" stroke="#00F5D4" />
          <text x="16" y="110" fill="#00F5D4">Log-Scale Transform</text>
          <text x="16" y="125" fill="#F8FAFC">log(1+x) for right-skew</text>

          <rect x="10" y="150" width="125" height="46" fill="#07080B" stroke="#1E2536" />
          <text x="16" y="166" fill="#94A3B8">Imputation Matrix</text>
          <text x="16" y="181" fill="#4A4E58">Sparse stage handling</text>
        </g>

        {/* Arrow 1 -> 2 */}
        <path d="M 160 120 L 195 120" stroke="#00F5D4" strokeWidth="1.2" markerEnd="url(#arrow-ml)" />
        <text x="163" y="112" fill="#00F5D4" fontSize="8">CLEAN</text>

        {/* Phase 2: Model Benchmarking */}
        <g transform="translate(195, 25)">
          <rect width="175" height="190" fill="#0E121A" stroke="#00F5D4" strokeWidth="1" />
          <rect width="175" height="24" fill="#1F1C18" stroke="#00F5D4" />
          <text x="10" y="16" fill="#00F5D4" fontWeight="600">REGRESSION MODELS</text>

          <rect x="10" y="38" width="155" height="46" fill="#07080B" stroke="#1E2536" />
          <text x="16" y="54" fill="#F8FAFC">Scikit-Learn Pipeline</text>
          <text x="16" y="69" fill="#94A3B8">Ridge & Lasso Regularized</text>

          <rect x="10" y="94" width="155" height="46" fill="#07080B" stroke="#00F5D4" />
          <text x="16" y="110" fill="#00F5D4">Random Forest & GBDT</text>
          <text x="16" y="125" fill="#F8FAFC">Non-linear feature cross</text>

          <rect x="10" y="150" width="155" height="46" fill="#07080B" stroke="#1E2536" />
          <text x="16" y="166" fill="#94A3B8">K-Fold Cross-Val</text>
          <text x="16" y="181" fill="#4A4E58">Generalization validation</text>
        </g>

        {/* Arrow 2 -> 3 */}
        <path d="M 370 120 L 405 120" stroke="#00F5D4" strokeWidth="1.2" markerEnd="url(#arrow-ml)" />
        <text x="375" y="112" fill="#00F5D4" fontSize="8">EVAL</text>

        {/* Phase 3: Analytics & Output */}
        <g transform="translate(405, 25)">
          <rect width="120" height="190" fill="#0E121A" stroke="#1E2536" strokeWidth="1" />
          <rect width="120" height="24" fill="#121622" stroke="#1E2536" />
          <text x="10" y="16" fill="#F8FAFC" fontWeight="600">INFERENCE</text>

          <rect x="8" y="38" width="104" height="46" fill="#07080B" stroke="#1E2536" />
          <text x="14" y="54" fill="#F8FAFC">Valuation Band</text>
          <text x="14" y="69" fill="#94A3B8">Projected range</text>

          <rect x="8" y="94" width="104" height="46" fill="#07080B" stroke="#1E2536" />
          <text x="14" y="110" fill="#00F5D4">Residual Plots</text>
          <text x="14" y="125" fill="#94A3B8">Matplotlib / Seaborn</text>

          <rect x="8" y="150" width="104" height="46" fill="#07080B" stroke="#1E2536" />
          <text x="14" y="166" fill="#F8FAFC">Feature Weights</text>
          <text x="14" y="181" fill="#4A4E58">Sector CAGR metrics</text>
        </g>
      </svg>
    </div>
  );
}

export function GraphEngineDiagram() {
  return (
    <div className="w-full border border-[#1E2536] bg-[#090C12] p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between border-b border-[#1E2536] pb-2 font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">
        <span>THEORY & COMPLEXITY BENCHMARK // NETWORK FLOW</span>
        <span className="text-[#00F5D4]">FORD-FULKERSON & O(V · E²)</span>
      </div>
      <svg
        viewBox="0 0 540 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-[10px] font-mono"
        role="img"
        aria-label="Graph Theory network flow topology diagram showing Ford-Fulkerson augmenting paths and asymptotic complexity"
      >
        <title>Network Flow & Graph Algorithm Topology</title>
        <defs>
          <pattern id="grid-dots-graph" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.75" fill="#1E2536" />
          </pattern>
          <marker id="arrow-graph" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#00F5D4" />
          </marker>
          <marker id="arrow-dim-graph" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#4A4E58" />
          </marker>
        </defs>
        <rect width="540" height="240" fill="url(#grid-dots-graph)" opacity="0.6" />

        {/* Network Flow Diagram: S -> V1, V2 -> V3, V4 -> T */}
        {/* Source S */}
        <circle cx="50" cy="90" r="22" fill="#0E121A" stroke="#00F5D4" strokeWidth="1.5" />
        <text x="44" y="94" fill="#00F5D4" fontWeight="700" fontSize="13">S</text>
        <text x="32" y="125" fill="#94A3B8" fontSize="9">SOURCE</text>

        {/* Node V1 */}
        <circle cx="170" cy="50" r="18" fill="#0E121A" stroke="#1E2536" strokeWidth="1" />
        <text x="163" y="54" fill="#F8FAFC" fontWeight="600">v₁</text>

        {/* Node V2 */}
        <circle cx="170" cy="130" r="18" fill="#0E121A" stroke="#1E2536" strokeWidth="1" />
        <text x="163" y="134" fill="#F8FAFC" fontWeight="600">v₂</text>

        {/* Node V3 */}
        <circle cx="310" cy="50" r="18" fill="#0E121A" stroke="#1E2536" strokeWidth="1" />
        <text x="303" y="54" fill="#F8FAFC" fontWeight="600">v₃</text>

        {/* Node V4 */}
        <circle cx="310" cy="130" r="18" fill="#0E121A" stroke="#1E2536" strokeWidth="1" />
        <text x="303" y="134" fill="#F8FAFC" fontWeight="600">v₄</text>

        {/* Sink T */}
        <circle cx="430" cy="90" r="22" fill="#0E121A" stroke="#00F5D4" strokeWidth="1.5" />
        <text x="425" y="94" fill="#00F5D4" fontWeight="700" fontSize="13">T</text>
        <text x="418" y="125" fill="#94A3B8" fontSize="9">SINK</text>

        {/* Flow Edges with (flow/capacity) */}
        {/* S -> v1 */}
        <line x1="70" y1="80" x2="152" y2="55" stroke="#00F5D4" strokeWidth="1.5" markerEnd="url(#arrow-graph)" />
        <text x="96" y="60" fill="#00F5D4" fontSize="9">10/14</text>

        {/* S -> v2 */}
        <line x1="70" y1="100" x2="152" y2="125" stroke="#4A4E58" strokeWidth="1" markerEnd="url(#arrow-dim-graph)" />
        <text x="96" y="125" fill="#94A3B8" fontSize="9">4/12</text>

        {/* v1 -> v3 */}
        <line x1="188" y1="50" x2="292" y2="50" stroke="#00F5D4" strokeWidth="1.5" markerEnd="url(#arrow-graph)" />
        <text x="230" y="44" fill="#00F5D4" fontSize="9">10/12</text>

        {/* v1 -> v4 */}
        <line x1="185" y1="60" x2="295" y2="120" stroke="#4A4E58" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#arrow-dim-graph)" />
        <text x="242" y="85" fill="#4A4E58" fontSize="8">0/4</text>

        {/* v2 -> v4 */}
        <line x1="188" y1="130" x2="292" y2="130" stroke="#4A4E58" strokeWidth="1" markerEnd="url(#arrow-dim-graph)" />
        <text x="230" y="145" fill="#94A3B8" fontSize="9">4/8</text>

        {/* v3 -> T */}
        <line x1="328" y1="55" x2="410" y2="80" stroke="#00F5D4" strokeWidth="1.5" markerEnd="url(#arrow-graph)" />
        <text x="365" y="60" fill="#00F5D4" fontSize="9">10/16</text>

        {/* v4 -> T */}
        <line x1="328" y1="125" x2="410" y2="100" stroke="#4A4E58" strokeWidth="1" markerEnd="url(#arrow-dim-graph)" />
        <text x="365" y="125" fill="#94A3B8" fontSize="9">4/10</text>

        {/* Bottom Complexity Ledger Box */}
        <g transform="translate(15, 175)">
          <rect width="510" height="50" fill="#0E121A" stroke="#1E2536" />
          <text x="14" y="20" fill="#F8FAFC" fontWeight="600">EDMONDS-KARP BFS AUGMENTING PATHS</text>
          <text x="14" y="38" fill="#94A3B8">Upper Bound: <tspan fill="#00F5D4">O(V · E²)</tspan>  |  Dijkstra: <tspan fill="#00F5D4">O((V + E) log V)</tspan></text>
          <text x="360" y="20" fill="#4A4E58" fontSize="9">IIT MADRAS NPTEL</text>
          <text x="360" y="38" fill="#00F5D4" fontSize="9">SCORE: 77/100 (ELITE)</text>
        </g>
      </svg>
    </div>
  );
}

export function ProjectDiagram({ type }: { type: "shivkush-pwa" | "pralayveer-geo" | "valuation-ml" | "graph-flow" }) {
  switch (type) {
    case "shivkush-pwa":
      return <ShivkushDiagram />;
    case "pralayveer-geo":
      return <PralayVeerDiagram />;
    case "valuation-ml":
      return <ValuationDiagram />;
    case "graph-flow":
      return <GraphEngineDiagram />;
    default:
      return null;
  }
}
