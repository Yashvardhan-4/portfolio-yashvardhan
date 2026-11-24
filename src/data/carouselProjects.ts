export interface ProjectItem {
  id: string;
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  roleOrType: string;
  src: string;
  alt: string;
  /** Warm plain-English 1-line hook written for recruiters & humans */
  humanHook: string;
  /** Conversational story focused on why the work matters */
  humanStory: string;
  /** Clear, accessible proof points without acronym walls */
  humanMetrics: { label: string; value: string }[];
  /** Verified resume engineering notes displayed inside "Under the Hood" */
  engineeringHighlights: string[];
  /** Subtle ambient glow color shifts as visitor scrolls into this chapter */
  moodDark: string;
  moodLight: string;
  stack: string[];
  /** Backward-compatible summary fields */
  description: string;
  metrics: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface ArchiveWorkItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  outcome: string;
  summary: string;
  previewImage: string;
  accentTone: string;
}

export const carouselPlaceholderProjects: ProjectItem[] = [
  {
    id: "cardiomamba-em",
    slug: "cardiomamba-em",
    index: "01",
    title: "CardioMamba-EM",
    subtitle: "AI that listens to heartbeats to catch silent risks early",
    category: "AI & Healthcare Screening",
    year: "2026 – Present",
    roleOrType: "Deep Learning Research & App",
    src: "/projects/cardiomamba.png",
    alt: "Sculptural translucent glass and warm crimson acoustic ribbon artwork representing CardioMamba-EM cardiac AI",
    humanHook:
      "Helping doctors spot hidden heart abnormalities by listening to electrical and acoustic signals together.",
    humanStory:
      "Routine screenings often miss subtle heart warning signs unless specialists check multiple sensors side by side. CardioMamba-EM listens to a patient's heartbeat and ECG rhythm simultaneously, cutting missed cases by two-thirds — while staying compact enough (just 448 KB) to run comfortably in everyday clinical tools.",
    humanMetrics: [
      { label: "Screening Accuracy", value: "98.49%" },
      { label: "Sensitivity Rate", value: "99.56%" },
      { label: "Missed Cases Cut", value: "-66.7%" },
    ],
    engineeringHighlights: [
      "Designed a bidirectional BiMamba Selective State-Space Model over synchronized ECG & heart-sound signals (500 Hz) with strict O(L) linear scaling.",
      "Surpassed published baselines (HPA-Net & PACFNet) on PhysioNet CinC 2016 with 98.49% accuracy and 99.56% sensitivity.",
      "Validated via patient-independent 5-fold cross-validation across 360 patients (91.57% AUROC, bootstrap CI & DeLong test), reducing missed cases from 18 down to 6.",
      "Distilled cleanly down to 112K parameters (448 KB footprint, ~160ms inference) served through a FastAPI + React interface.",
    ],
    moodDark: "rgba(225, 29, 72, 0.14)",
    moodLight: "rgba(190, 95, 95, 0.14)",
    description:
      "An AI cardiac screening system combining synchronized heartbeats and electrical rhythms to achieve 98.49% benchmark accuracy and two-thirds fewer missed detections.",
    metrics: ["98.49% Accuracy", "99.56% Sensitivity", "448 KB Distilled Model"],
    stack: ["PyTorch", "Mamba SSM", "SciPy", "FastAPI", "React", "Python"],
    highlights: [
      "Reaches 98.49% accuracy and 99.56% sensitivity on standard clinical heart-screening benchmarks.",
      "Cuts missed detections by 66.7% across 360 patients using rigorous 5-fold validation.",
      "Shrunk to a tiny 448 KB model (~160ms response time) ready for real clinical interfaces.",
    ],
    githubUrl: "https://github.com/Yashvardhan-4",
  },
  {
    id: "trace-x",
    slug: "trace-x",
    index: "02",
    title: "TRACE-X",
    subtitle: "A visual detective studio exposing hidden financial crime",
    category: "Financial Crime Intelligence",
    year: "Sep 2026",
    roleOrType: "Full Stack & Graph Analytics",
    src: "/projects/tracex.png",
    alt: "Smoked-emerald glass prisms refracting warm amber light threads representing TRACE-X financial crime clarity",
    humanHook:
      "Turning tangled banking logs and late-night permission overrides into an interactive visual story investigators can explore.",
    humanStory:
      "Sophisticated financial fraud rarely hides in one place — it splits into small transfers after suspicious off-hours staff changes. TRACE-X brings 7 investigative checks into a single interactive visual map where analysts can click away suspected links to immediately test 'what-if' scenarios.",
    humanMetrics: [
      { label: "Detection Engines", value: "7 Engines" },
      { label: "Banking Scenarios", value: "7 Benchmarks" },
      { label: "Interactive Mode", value: "What-If Sandbox" },
    ],
    engineeringHighlights: [
      "Engineered a 7-engine AML + insider-risk prototype using FastAPI, SQLAlchemy, and NetworkX.",
      "Correlates off-hours IAM privilege overrides with downstream transfers via regulatory threshold structuring checks, directed cycle detection, and exponential time-decay scoring.",
      "Built an interactive React Flow attack-graph studio featuring a counterfactual edge-removal sandbox and 7-scenario banking twin benchmark.",
      "Deployed live frontend on Vercel alongside a fully containerized Docker Compose backend workflow.",
    ],
    moodDark: "rgba(16, 185, 129, 0.14)",
    moodLight: "rgba(42, 108, 78, 0.14)",
    description:
      "A 7-engine financial crime and insider-risk studio connecting unusual permission overrides to downstream money trails through an interactive visual map.",
    metrics: ["7 Detection Engines", "What-If Sandbox", "Live & Containerized"],
    stack: ["FastAPI", "Next.js 14", "NetworkX", "SQLAlchemy", "React Flow", "Docker"],
    highlights: [
      "Connects off-hours access changes directly to suspicious downstream transfer patterns.",
      "Interactive React Flow visual canvas lets investigators test removing links in real time.",
      "Deployed live online with a reproducible containerized banking benchmark.",
    ],
    liveUrl: "https://frontend-chi-pied-40.vercel.app",
    githubUrl: "https://github.com/Yashvardhan-4/TRACE-X",
  },
  {
    id: "shivkush-consultancy",
    slug: "shivkush-nursery-pwa",
    index: "03",
    title: "Shivkush Nursery",
    subtitle: "Business operations platform & bilingual storefront for a real client",
    category: "Paid Client Contract",
    year: "Dec 2025 – May 2026",
    roleOrType: "Sole Full Stack Engineer",
    src: "/projects/shivkush.png",
    alt: "Shivkush Hi-Tech Nursery bilingual customer storefront and operations platform",
    humanHook:
      "Helping a rural agricultural business run billing, stock, and 3D plant orders reliably — even on patchy countryside mobile networks.",
    humanStory:
      "Hired directly by Shivkush Hi-Tech Nursery as their sole engineer, I replaced scattered manual tracking with an end-to-end daily operations ERP and a warm English/Marathi customer storefront. Every order stays mathematically balanced to the last rupee, Excel reports generate in a blink, and farmers browsing over weak 2G/3G signals can still explore 3D plant previews offline.",
    humanMetrics: [
      { label: "Cashbook Audit", value: "100% Reconciled" },
      { label: "Image & 3D Savings", value: "93.9% / 83.9%" },
      { label: "10K-Row Export", value: "< 300ms" },
    ],
    engineeringHighlights: [
      "Delivered a complete operations ERP (SNMS: billing, bookings, inventory, staff) across 18.5K+ lines of code, 18 database migrations, and 8 PostgreSQL stored procedures.",
      "Eliminated inventory overselling race conditions via atomic dispatches using SELECT ... FOR UPDATE pessimistic row locking and Row-Level Security.",
      "Replaced mutable balances with an append-only payment ledger & daily cashbook SQL view reconciling cash, UPI, and split payments to 100% accuracy, plus <300ms 10,000-row Excel exports and bilingual receipts.",
      "Compressed customer imagery by 93.9% (WebP) and interactive 3D Draco models by 83.9% paired with an offline-first PWA.",
    ],
    moodDark: "rgba(34, 197, 94, 0.13)",
    moodLight: "rgba(71, 120, 94, 0.15)",
    description:
      "A paid client contract: an end-to-end daily operations ERP and offline-ready English/Marathi 3D plant platform built from the ground up.",
    metrics: ["100% Ledger Accuracy", "<300ms 10K Reports", "93.9% Lighter Media"],
    stack: ["Next.js 16", "TypeScript", "PostgreSQL", "Supabase RLS", "Three.js", "Draco 3D", "PWA"],
    highlights: [
      "Zero overselling and 100% reconciled daily cashbooks across cash, UPI, and split payments.",
      "Exports 10,000-row bilingual business reports in under 300 milliseconds.",
      "Offline-ready storefront with compressed WebP media (93.9% smaller) and 3D previews (83.9% smaller).",
    ],
    liveUrl: "https://shivkush-hi-tech-nursery.vercel.app/",
    githubUrl: "https://github.com/Yashvardhan-4",
  },
  {
    id: "turboidm",
    slug: "turboidm",
    index: "04",
    title: "TurboIDM",
    subtitle: "Desktop download manager engineered to be up to 8x faster",
    category: "Desktop App & Browser Tool",
    year: "Jun 2026",
    roleOrType: "Systems & Desktop Product",
    src: "/projects/turboidm.png",
    alt: "TurboIDM fast desktop download accelerator and browser extension visual",
    humanHook:
      "Making sluggish file downloads finish in seconds — with zero awkward stalling once the progress bar hits 100%.",
    humanStory:
      "Most downloaders get stuck waiting on one slow server lane or freeze while stitching temporary pieces together at the end. TurboIDM opens 32 smart parallel lanes, redistributes slow parts automatically to faster idle workers, and saves files cleanly across Windows, macOS, and Linux.",
    humanMetrics: [
      { label: "Speed Boost", value: "Up to 8x" },
      { label: "Parallel Lanes", value: "32 Streams" },
      { label: "End Merge Wait", value: "0.00s" },
    ],
    engineeringHighlights: [
      "Accelerates throttled downloads up to 8x using 32 concurrent HTTP Range streams paired with a work-stealing scheduler that splits slow byte ranges across idle workers.",
      "Writes every incoming stream straight to its pre-allocated byte offset on disk (POSIX ftruncate), eliminating post-download file merge delays.",
      "Automated Windows, macOS, and Linux multi-architecture releases via GitHub Actions alongside a Chrome MV3 companion extension.",
    ],
    moodDark: "rgba(56, 189, 248, 0.14)",
    moodLight: "rgba(65, 130, 165, 0.14)",
    description:
      "A cross-platform desktop download accelerator that speeds up transfers up to 8x using 32 adaptive streams and instant file completion.",
    metrics: ["Up to 8x Faster", "32 Smart Streams", "0.00s Final Merge"],
    stack: ["Node.js", "Electron", "React 19", "Chrome MV3", "GitHub Actions"],
    highlights: [
      "Up to 8x faster transfers via 32 parallel HTTP Range streams with automatic slow-lane balancing.",
      "Direct pre-allocated disk writing finishes files instantaneously with zero merge wait.",
      "Cross-platform Windows, macOS, and Linux installers built automatically via GitHub Actions.",
    ],
    liveUrl: "https://turbo-idm.vercel.app/",
    githubUrl: "https://github.com/Yashvardhan-4/TurboIDM-Releases",
  },
  {
    id: "inkless",
    slug: "inkless",
    index: "05",
    title: "Inkless",
    subtitle: "Quiet offline-first writing space wrapped in responsive liquid visuals",
    category: "Product Craft & Creative Web",
    year: "Sep 2026",
    roleOrType: "Local-First Web App",
    src: "/projects/inkless.png",
    alt: "Inkless calm offline-first digital journal and interactive canvas preview",
    humanHook:
      "A calm place to think that saves every word instantly to your device — never losing a single sentence even when Wi-Fi vanishes.",
    humanStory:
      "Creative flow breaks the instant an app lags or spins waiting on the cloud. Inkless saves every keystroke right on your device in under 5 milliseconds, catches up gracefully in the background whenever you reconnect, and pairs the page with silky custom graphics that react softly to your presence.",
    humanMetrics: [
      { label: "Local Save Speed", value: "< 5ms" },
      { label: "Offline Reliability", value: "Zero Loss" },
      { label: "Canvas Motion", value: "Fluid Shader" },
    ],
    engineeringHighlights: [
      "Commits every edit atomically to IndexedDB and a transactional outbox (<5ms saves, zero offline data loss).",
      "Background synchronization worker performs block-level Last-Write-Wins (LWW) conflict reconciliation into Row-Level Security protected PostgreSQL.",
      "Pairs crisp Next.js 16 + TypeScript journaling with tactile Three.js / GLSL shader backdrops.",
    ],
    moodDark: "rgba(168, 85, 247, 0.14)",
    moodLight: "rgba(180, 130, 85, 0.14)",
    description:
      "An offline-first personal journal saving notes atomically in under 5ms with conflict-safe cloud sync and tranquil interactive shaders.",
    metrics: ["< 5ms Local Saves", "Offline-Safe Sync", "Row-Level Security"],
    stack: ["Next.js 16", "TypeScript", "IndexedDB", "PostgreSQL", "GLSL Shaders"],
    highlights: [
      "Saves every note locally in under 5 milliseconds with zero offline data loss.",
      "Reconciles edits block-by-block safely once connectivity returns.",
      "Combines calm editorial typography with responsive real-time visual art.",
    ],
    liveUrl: "https://inkless-ashen.vercel.app/",
    githubUrl: "https://github.com/Yashvardhan-4/Inkless",
  },
];

export const archiveProjects: ArchiveWorkItem[] = [
  {
    id: "pralayveer-disaster-response",
    slug: "pralayveer-disaster-response",
    title: "PralayVeer — Smart India Hackathon",
    category: "24-Hour National Sprint MVP",
    year: "2024",
    outcome: "Emergency shelter finder for weak mobile networks",
    summary:
      "Accessible disaster evacuation & shelter locator engineered in a 24-hour national competition.",
    previewImage: "/projects/shivkush.png",
    accentTone: "#10B981",
  },
  {
    id: "algorithmic-graph-engine",
    slug: "algorithmic-graph-engine",
    title: "Algorithmic Graph Theory Suite",
    category: "IIT Madras NPTEL Companion · C++20",
    year: "2025",
    outcome: "High-speed routing & network flow benchmarks",
    summary:
      "Companion C++20 benchmark suite built alongside the IIT Madras IIT Kharagpur Elite + Silver course.",
    previewImage: "/projects/tracex.png",
    accentTone: "#A855F7",
  },
  {
    id: "startup-valuation-predictor",
    slug: "startup-valuation-predictor",
    title: "Startup Valuation Predictor",
    category: "Machine Learning Regression · Python",
    year: "2024",
    outcome: "Forecasting early-stage venture valuations",
    summary:
      "Cross-validated regression pipeline studying funding round history and sector momentum.",
    previewImage: "/projects/cardiomamba.png",
    accentTone: "#38BDF8",
  },
];
