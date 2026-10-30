export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  src: string;
  alt: string;
  image?: string;
  description: string;
  metrics: string[];
  stack: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const carouselPlaceholderProjects: ProjectItem[] = [
  {
    id: "shivkush-erp",
    title: "Shivkush Hi-Tech ERP (SNMS)",
    subtitle: "Enterprise Nursery Operations & Inventory Backbone",
    category: "Full-Stack Enterprise ERP",
    src:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' width='600' height='400'><defs><linearGradient id='g1' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%231e1035'/><stop offset='100%' stop-color='%2308090c'/></linearGradient></defs><rect width='600' height='400' fill='url(%23g1)'/><circle cx='300' cy='180' r='90' fill='none' stroke='%23a855f7' stroke-width='2' stroke-dasharray='6 6'/><path d='M250 200 L300 140 L350 200 L300 260 Z' fill='none' stroke='%23c084fc' stroke-width='2.5'/><text x='300' y='320' font-family='sans-serif' font-size='16' font-weight='600' fill='%23EDEDEF' text-anchor='middle'>SHIVKUSH ERP (SNMS)</text><text x='300' y='345' font-family='monospace' font-size='11' fill='%23A855F7' text-anchor='middle'>18+ Migrations • Pessimistic Row Locking</text></svg>",
    alt: "Shivkush ERP Architecture",
    description:
      "Enterprise operational backbone for Shivkush Hi-Tech Nursery. Eliminates 100% of inventory overselling race conditions via atomic PostgreSQL stored procedures with FOR UPDATE row-level locking.",
    metrics: [
      "18+ Migrations • 18.5k+ LOC",
      "100% Cash-on-hand audit accuracy",
      "0% Inventory race conditions",
    ],
    stack: [
      "Next.js 16",
      "TypeScript",
      "Supabase PostgreSQL",
      "Tailwind CSS",
      "HarfBuzz Devanagari Engine",
    ],
    highlights: [
      "Pessimistic FOR UPDATE row-level locking across concurrent multi-batch seasonal dispatches.",
      "Append-only event-driven financial cashbook ledger (vw_daily_cashbook).",
      "Browser-native Devanagari HarfBuzz print engine for bilingual invoices.",
    ],
    liveUrl: "https://shivkush-hi-tech-nursery.vercel.app/",
    githubUrl: "https://github.com/Yashvardhan-4",
  },
  {
    id: "turboidm",
    title: "TurboIDM Download Accelerator",
    subtitle: "High-Speed Multi-Stream Download Engine",
    category: "Systems & Concurrency",
    src:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' width='600' height='400'><defs><linearGradient id='g2' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%230f1c30'/><stop offset='100%' stop-color='%2308090c'/></linearGradient></defs><rect width='600' height='400' fill='url(%23g2)'/><circle cx='300' cy='180' r='90' fill='none' stroke='%2338bdf8' stroke-width='2' stroke-dasharray='4 8'/><path d='M260 160 L340 160 L340 220 L260 220 Z' fill='none' stroke='%2338bdf8' stroke-width='2'/><path d='M300 130 L300 250' stroke='%23c084fc' stroke-width='3'/><text x='300' y='320' font-family='sans-serif' font-size='16' font-weight='600' fill='%23EDEDEF' text-anchor='middle'>TURBO IDM</text><text x='300' y='345' font-family='monospace' font-size='11' fill='%2338BDF8' text-anchor='middle'>32-Stream Multiplexing • Zero-Copy Merge</text></svg>",
    alt: "TurboIDM Download Accelerator Architecture",
    description:
      "Cross-platform download manager accelerating throughput up to 8x through 32-stream HTTP Range multiplexing and dynamic work-stealing algorithms.",
    metrics: [
      "Up to 8x Download Throughput",
      "0.00s Merge Latency",
      "32 Concurrent Range Sockets",
    ],
    stack: [
      "Node.js",
      "Electron",
      "React 19",
      "Chrome MV3",
      "POSIX File Descriptors",
    ],
    highlights: [
      "Dynamic work-stealing algorithm (_checkAndStealWork) bisecting straggler byte ranges.",
      "Zero-copy direct-offset sparse disk writing via fs.ftruncateSync & fs.writeSync.",
      "Companion Chrome Manifest V3 extension with local REST/WebSocket daemon on 127.0.0.1:9292.",
    ],
    liveUrl: "https://turbo-idm.vercel.app/",
    githubUrl: "https://github.com/Yashvardhan-4",
  },
  {
    id: "inkless",
    title: "Inkless Digital Diary",
    subtitle: "Local-First Offline Journal & WebGL Shader Canvas",
    category: "Local-First & WebGL Graphics",
    src:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' width='600' height='400'><defs><linearGradient id='g3' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%2328103c'/><stop offset='100%' stop-color='%2308090c'/></linearGradient></defs><rect width='600' height='400' fill='url(%23g3)'/><circle cx='300' cy='180' r='85' fill='none' stroke='%23c084fc' stroke-width='1.5'/><circle cx='300' cy='180' r='55' fill='none' stroke='%23e879f9' stroke-width='2' stroke-dasharray='12 6'/><text x='300' y='320' font-family='sans-serif' font-size='16' font-weight='600' fill='%23EDEDEF' text-anchor='middle'>INKLESS CANVAS</text><text x='300' y='345' font-family='monospace' font-size='11' fill='%23C084FC' text-anchor='middle'>&lt;5ms Write Latency • 7k Particle Field</text></svg>",
    alt: "Inkless Digital Diary Canvas Architecture",
    description:
      "Local-first document platform on IndexedDB delivering <5ms local write latency, zero data loss via transactional outbox, and a 60/120 FPS WebGL shader canvas.",
    metrics: [
      "< 5ms Local Write Latency",
      "0% Keystroke Data Loss",
      "7,000 Particle Vector Field @ 120 FPS",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "Dexie.js (IndexedDB)",
      "Supabase",
      "GLSL Shaders",
      "Three.js",
    ],
    highlights: [
      "Block-Level Last-Write-Wins (LWW) conflict resolver in PostgreSQL/Supabase.",
      "Mutable ref GPU-uniform pipeline bypassing React re-renders for fluid 120 FPS rendering.",
      "Dynamic virtual reflow pagination engine automatically cascading overflowing text blocks.",
    ],
    liveUrl: "https://inkless-ashen.vercel.app/",
    githubUrl: "https://github.com/Yashvardhan-4/Inkless",
  },
  {
    id: "shivkush-web",
    title: "Shivkush 3D Web & AI Diagnostics",
    subtitle: "High-Performance 3D Canvas & Multimodal Diagnosis",
    category: "3D Graphics & AI Platform",
    src:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' width='600' height='400'><defs><linearGradient id='g4' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23131c2e'/><stop offset='100%' stop-color='%2308090c'/></linearGradient></defs><rect width='600' height='400' fill='url(%23g4)'/><polygon points='300,105 375,235 225,235' fill='none' stroke='%2338bdf8' stroke-width='2'/><circle cx='300' cy='190' r='30' fill='none' stroke='%23a855f7' stroke-width='2'/><text x='300' y='320' font-family='sans-serif' font-size='16' font-weight='600' fill='%23EDEDEF' text-anchor='middle'>SHIVKUSH 3D &amp; AI</text><text x='300' y='345' font-family='monospace' font-size='11' fill='%2338BDF8' text-anchor='middle'>83.9% Draco Compression • Gemini 2.5 Flash</text></svg>",
    alt: "Shivkush 3D Web and AI Platform Architecture",
    description:
      "Client-facing web platform featuring real-time Three.js 3D plant rendering with 83.9% Draco compression, edge-proxied Gemini 2.5 Flash multimodal vision, and Marathi voice ordering.",
    metrics: [
      "83.9% Asset Size Reduction",
      "60 FPS on 3G Mobile Networks",
      "Sub-400ms Vision Diagnostics",
    ],
    stack: [
      "Next.js 16",
      "Three.js",
      "Google Draco",
      "Gemini 2.5 Flash",
      "Web Speech API",
    ],
    highlights: [
      "Google Draco geometry compression slashing 3D assets from 26.1MB down to 4.19MB.",
      "Edge-proxied multimodal diagnostic engine with zero credential leakage.",
      "Bilingual voice order processing (Marathi/English) optimized for rural connectivity.",
    ],
    liveUrl: "https://shivkush-hi-tech-nursery.vercel.app/",
    githubUrl: "https://github.com/Yashvardhan-4",
  },
];
