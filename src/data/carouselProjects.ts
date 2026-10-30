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
    id: "turboidm",
    title: "TurboIDM Download Accelerator",
    subtitle: "High-Speed Multi-Stream Download Engine",
    category: "Systems & Concurrency",
    src: "/projects/turboidm.png",
    alt: "TurboIDM Download Accelerator Live Website Preview",
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
    src: "/projects/inkless.png",
    alt: "Inkless Digital Diary Live Website Preview",
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
    id: "shivkush-consultancy",
    title: "Shivkush Nursery Digital Experience & ERP",
    subtitle: "Full-Stack Enterprise ERP & 3D Interactive Agro-Tech Platform",
    category: "Client Consultancy & Agro-Tech Enterprise",
    src: "/projects/shivkush.png",
    alt: "Shivkush Nursery Digital Experience Live Website Preview",
    description:
      "Comprehensive commercial agro-tech digital solution engineered for Shivkush Nursery. Unifies a high-performance 3D web platform with 83.9% Draco compression and a high-concurrency enterprise operational ERP eliminating inventory overselling via atomic PostgreSQL row locks.",
    metrics: [
      "18.5k+ Production LOC",
      "83.9% Draco 3D Geometry Compression",
      "0% Inventory Race Conditions",
    ],
    stack: [
      "Next.js 16",
      "Three.js",
      "Google Draco",
      "Supabase PostgreSQL",
      "Tailwind CSS",
      "HarfBuzz Devanagari",
    ],
    highlights: [
      "Pessimistic FOR UPDATE row-level locking across concurrent multi-batch seasonal dispatches.",
      "Interactive real-time 3D plant rendering optimized with Google Draco geometry compression.",
      "Browser-native HarfBuzz Devanagari billing engine generating bilingual Marathi/English invoices.",
    ],
    liveUrl: "https://shivkush-hi-tech-nursery.vercel.app/",
    githubUrl: "https://github.com/Yashvardhan-4",
  },
];
