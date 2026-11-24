export type ProjectStatus =
  | "Deep Learning Research & App"
  | "Financial Crime Intelligence"
  | "Production Software Contract"
  | "Systems & Desktop Product"
  | "Local-First Web Product"
  | "National Hackathon MVP"
  | "Machine Learning Pipeline"
  | "Computational Theory & Benchmark";

export interface ProjectData {
  id: string;
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  statusShort: string;
  year: string;
  category: string;
  isFlagship?: boolean;
  summary: string;
  brief: string;
  coreProblem: string;
  problem: string;
  architectureHighlights: string[];
  architecture: string[];
  keyConstraints: string[];
  challenges: string[];
  technologies: string[];
  verificationNote: string;
  metricsOrOutcome?: string;
  isPlaceholder?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  diagramType: "shivkush-pwa" | "pralayveer-geo" | "valuation-ml" | "graph-flow";
}

export const selectedProjects: ProjectData[] = [
  {
    id: "cardiomamba-em",
    slug: "cardiomamba-em",
    index: "01",
    title: "CardioMamba-EM — Deep Learning Cardiac Screening",
    subtitle: "AI that listens to synchronized heartbeats & heart sounds to detect silent cardiac risks at 98.49% accuracy",
    status: "Deep Learning Research & App",
    statusShort: "AI & HEALTHCARE",
    year: "2026 – Present",
    category: "PyTorch / BiMamba SSM / FastAPI",
    isFlagship: true,
    summary:
      "A bidirectional BiMamba Selective State-Space Model over synchronized 500 Hz ECG and phonocardiogram heart sounds, outperforming prior benchmarks on PhysioNet CinC 2016 and distilled into a lightweight 448 KB FastAPI + React clinical tool.",
    brief:
      "Designed a compact deep learning screening assistant combining electrical heart rhythms and acoustic heart sounds so subtle conditions are caught reliably without slow cloud hardware.",
    coreProblem:
      "Single-channel screening tests frequently miss early cardiac anomalies, while heavy transformer architectures are far too slow or memory-hungry for lightweight point-of-care devices.",
    problem:
      "Single-channel screening tests frequently miss early cardiac anomalies, while heavy sequence transformers scale quadratically on long biosignals.",
    architectureHighlights: [
      "Bidirectional BiMamba SSM architecture processing synchronized ECG/PCG biosignals at 500 Hz with linear O(L) sequence complexity.",
      "Outperformed published benchmarks (HPA-Net & PACFNet) on PhysioNet CinC 2016: 98.49% accuracy and 99.56% sensitivity.",
      "Patient-independent 5-fold cross-validation across 360 patients (91.57% AUROC, bootstrap CI, DeLong statistical testing), reducing missed cases by 66.7% (18 down to 6).",
      "Distilled to just 112K parameters (448 KB weights, ~160ms response latency) wrapped in an approachable FastAPI + React web interface.",
    ],
    architecture: [
      "Bidirectional BiMamba SSM architecture processing synchronized ECG/PCG biosignals at 500 Hz with linear O(L) sequence complexity.",
      "Outperformed published benchmarks (HPA-Net & PACFNet) on PhysioNet CinC 2016: 98.49% accuracy and 99.56% sensitivity.",
      "Patient-independent 5-fold cross-validation across 360 patients (91.57% AUROC, bootstrap CI, DeLong statistical testing), cutting missed cases by 66.7% (18 to 6).",
      "Distilled to 112K parameters (448 KB, ~160ms) in a FastAPI + React web application.",
    ],
    keyConstraints: [
      "Strict patient-independent cross-validation splits ensuring zero data leakage between folds.",
      "Must remain compact (<500 KB) and fast (~160ms) for accessible point-of-care deployment.",
    ],
    challenges: [
      "Strict patient-independent cross-validation splits ensuring zero data leakage between folds.",
      "Distilling multimodal electromechanical accuracy into a 112K-parameter model without sacrificing sensitivity.",
    ],
    technologies: ["PyTorch", "Mamba SSM", "SciPy", "Python", "FastAPI", "React"],
    verificationNote: "Verified on PhysioNet CinC 2016 & 360-patient 5-fold CV benchmark suite.",
    metricsOrOutcome: "98.49% benchmark accuracy, 99.56% sensitivity, 66.7% fewer missed detections (448 KB distilled).",
    githubUrl: "https://github.com/Yashvardhan-4",
    diagramType: "valuation-ml",
  },
  {
    id: "trace-x",
    slug: "trace-x",
    index: "02",
    title: "TRACE-X — Financial Crime & Insider Risk Engine",
    subtitle: "Interactive AML & insider-risk studio connecting off-hours permission overrides to downstream money trails",
    status: "Financial Crime Intelligence",
    statusShort: "FINCRIME & GRAPH",
    year: "Sep 2026",
    category: "FastAPI / Next.js 14 / NetworkX / Docker",
    isFlagship: true,
    summary:
      "A 7-engine anti-money-laundering and insider-risk investigative studio built with FastAPI, SQLAlchemy, NetworkX, React Flow, and Docker — complete with counterfactual 'what-if' edge removal and a 7-scenario banking twin.",
    brief:
      "Interactive investigative workspace helping compliance teams uncover coordinated financial crime rings and unusual internal access patterns.",
    coreProblem:
      "Alert fatigue overwhelms financial investigators because traditional rule engines examine transactions in isolation rather than tracing human access changes across downstream money flows.",
    problem:
      "Legacy financial rules evaluate transfers in isolation, missing coordinated structuring rings triggered after off-hours permission changes.",
    architectureHighlights: [
      "7-engine AML + insider-risk backend built in FastAPI, SQLAlchemy, and NetworkX.",
      "Correlates off-hours IAM privilege overrides with downstream transfers using regulatory structuring checks, directed cycle detection, and exponential time-decay scoring.",
      "Interactive React Flow attack-graph studio enabling analysts to test counterfactual edge-removal 'what-if' scenarios live.",
      "Validated with a 7-scenario banking twin benchmark; deployed live on Vercel with a containerized Docker Compose architecture.",
    ],
    architecture: [
      "7-engine AML + insider-risk backend built in FastAPI, SQLAlchemy, and NetworkX.",
      "Correlates off-hours IAM privilege overrides with downstream transfers via threshold structuring checks, directed cycles, and exponential time-decay scoring.",
      "Interactive React Flow attack-graph studio with live counterfactual edge-removal sandbox and 7-scenario banking twin benchmark.",
      "Live deployment on Vercel backed by Docker Compose container orchestration.",
    ],
    keyConstraints: [
      "Explainable risk scoring so human compliance analysts see why every alert fired.",
      "Reproducible multi-scenario synthetic banking twin for verifiable validation.",
    ],
    challenges: [
      "Combining internal IAM identity signals cleanly with temporal transaction graph structures.",
      "Keeping interactive React Flow graph exploration smooth and readable for non-technical analysts.",
    ],
    technologies: ["FastAPI", "Next.js 14", "NetworkX", "SQLAlchemy", "React Flow", "Docker", "Vercel"],
    verificationNote: "Live deployed prototype on Vercel + full containerized Docker Compose source repository on GitHub.",
    metricsOrOutcome: "7 investigative engines live with counterfactual graph studio and 7-scenario banking twin.",
    liveUrl: "https://frontend-chi-pied-40.vercel.app",
    githubUrl: "https://github.com/Yashvardhan-4/TRACE-X",
    diagramType: "graph-flow",
  },
  {
    id: "shivkush-nursery-pwa",
    slug: "shivkush-nursery-pwa",
    index: "03",
    title: "Shivkush Nursery — Enterprise ERP & Bilingual 3D PWA",
    subtitle: "Paid client production ERP (SNMS) with append-only financial ledger, row locking & offline-first 3D plant storefront",
    status: "Production Software Contract",
    statusShort: "PAID CLIENT CONTRACT",
    year: "Dec 2025 – May 2026",
    category: "Next.js 16 / PostgreSQL ACID / Three.js PWA",
    isFlagship: true,
    summary:
      "Sole full-stack contract engineered for Shivkush Hi-Tech Nursery: shipped both their daily-operations ERP (18.5K+ LOC, 18 migrations, 8 stored procedures) and an offline-first English/Marathi 3D customer storefront.",
    brief:
      "Commissioned as sole engineer to modernize daily nursery billing, inventory, staff operations, and rural customer ordering from scratch.",
    coreProblem:
      "Rural agricultural clients browse over weak 2G/3G networks while seasonal inventory dispatches require airtight financial accountability across cash, UPI, and split payments.",
    problem:
      "The nursery needed zero-overselling inventory guarantees alongside an offline-capable bilingual website that loads fast over rural mobile data.",
    architectureHighlights: [
      "Operations ERP (SNMS) covering billing, bookings, inventory, and staff in Next.js 16, TypeScript, and PostgreSQL (18.5K+ LOC, 18 migrations, 8 stored procedures).",
      "Eliminated overselling race conditions via atomic dispatches using SELECT ... FOR UPDATE row locks and granular Row-Level Security (RLS).",
      "Replaced mutable balances with an append-only payment ledger & vw_daily_cashbook reconciling cash, UPI, and split payments (100% cash-on-hand accuracy) plus <300ms 10,000-row Excel exports and bilingual receipts.",
      "Shipped an offline-first customer PWA slashing image payloads by 93.9% (WebP) and 3D plant assets by 83.9% (Google Draco compression).",
    ],
    architecture: [
      "Operations ERP (SNMS) covering billing, bookings, inventory, and staff in Next.js 16, TypeScript, and PostgreSQL (18.5K+ LOC, 18 migrations, 8 stored procedures).",
      "Eliminated overselling via atomic dispatches with SELECT ... FOR UPDATE pessimistic row locking and Row-Level Security.",
      "Append-only payment ledger & daily cashbook view achieving 100% cash-on-hand reconciliation, paired with <300ms 10,000-row Excel exports and bilingual receipts.",
      "Offline-first customer PWA cutting image weight by 93.9% (WebP) and 3D previews by 83.9% (Draco compression).",
    ],
    keyConstraints: [
      "Zero overselling tolerance across concurrent billing and dispatch desks.",
      "Sub-2-second browsing over constrained rural 2G/3G connections without forced customer logins.",
    ],
    challenges: [
      "Maintaining 100% cash-on-hand reconciliation across seasonal multi-batch bookings and split payments.",
      "Serving smooth 60 FPS interactive 3D plants inside an ultra-lightweight mobile web budget.",
    ],
    technologies: ["Next.js 16", "TypeScript", "PostgreSQL 15+", "PL/pgSQL", "Supabase RLS", "Three.js", "Draco", "PWA"],
    verificationNote: "Delivered paid production commercial engagement (Dec 2025 – May 2026) in Ahilyanagar, India.",
    metricsOrOutcome: "100% cashbook reconciliation, 0 overselling, <300ms 10K-row Excel exports, 93.9%/83.9% payload savings.",
    liveUrl: "https://shivkush-hi-tech-nursery.vercel.app/",
    githubUrl: "https://github.com/Yashvardhan-4",
    diagramType: "shivkush-pwa",
  },
  {
    id: "turboidm",
    slug: "turboidm",
    index: "04",
    title: "TurboIDM — Multi-Stream Download Accelerator",
    subtitle: "Cross-platform desktop download accelerator delivering up to 8x faster transfers with zero end-of-download merge wait",
    status: "Systems & Desktop Product",
    statusShort: "DESKTOP & SYSTEMS",
    year: "Jun 2026",
    category: "Node.js / Electron / React 19 / GitHub Actions",
    isFlagship: true,
    summary:
      "Desktop download manager built with Node.js, Electron, React 19, and Chrome MV3 that accelerates throttled downloads up to 8x using 32 parallel HTTP Range streams, work-stealing scheduling, and direct pre-allocated offset writes.",
    brief:
      "Cross-platform download manager accelerating throttled downloads up to 8x without annoying completion stalls.",
    coreProblem:
      "Single-stream downloads crawl under server throttling, while multi-part downloaders freeze disks while stitching gigabytes of temporary chunk files together at 100%.",
    problem:
      "Throttled server connections slow down downloads, and post-download chunk concatenation introduces heavy completion delays.",
    architectureHighlights: [
      "Accelerates throttled transfers up to 8x across 32 concurrent HTTP Range byte streams.",
      "Dynamic work-stealing scheduler continuously splits slow byte ranges across faster idle workers to eliminate tail latency.",
      "Writes each stream straight into its pre-allocated byte offset on disk (POSIX ftruncate) for instant 0.00s completion with zero merge step.",
      "Automated Windows, macOS, and Linux multi-OS releases via GitHub Actions + Chrome MV3 browser extension companion.",
    ],
    architecture: [
      "32 concurrent HTTP Range streams paired with an adaptive work-stealing byte scheduler.",
      "Direct pre-allocated disk offset writing (POSIX file descriptors / ftruncate) cutting merge delay to zero.",
      "Chrome MV3 companion extension capturing authenticated download contexts seamlessly over local bridge.",
      "Automated cross-OS desktop releases (Windows/macOS/Linux) via GitHub Actions.",
    ],
    keyConstraints: [
      "Zero temporary chunk merging step even on multi-gigabyte archives.",
      "Dynamic rebalancing whenever one TCP connection stalls mid-transfer.",
    ],
    challenges: [
      "Preventing tail-latency straggler workers from bottlenecking overall transfer completion.",
      "Safe concurrent file-descriptor offset coordination across Windows, macOS, and Linux.",
    ],
    technologies: ["Node.js", "Electron", "React 19", "TypeScript", "Chrome MV3", "GitHub Actions"],
    verificationNote: "Published multi-platform releases under TurboIDM-Releases on GitHub + showcase portal.",
    metricsOrOutcome: "Up to 8x speedup, 32 concurrent streams, 0.00s merge latency across Win/macOS/Linux.",
    liveUrl: "https://turbo-idm.vercel.app/",
    githubUrl: "https://github.com/Yashvardhan-4/TurboIDM-Releases",
    diagramType: "shivkush-pwa",
  },
  {
    id: "inkless",
    slug: "inkless",
    index: "05",
    title: "Inkless — Local-First Journal & Cloud Sync",
    subtitle: "Sub-5ms atomic local-first writing sanctuary with block-level cloud sync and RLS-protected PostgreSQL",
    status: "Local-First Web Product",
    statusShort: "LOCAL-FIRST WEB",
    year: "Sep 2026",
    category: "Next.js 16 / TypeScript / IndexedDB / PostgreSQL",
    isFlagship: true,
    summary:
      "A distraction-free digital journal engineered on Next.js 16, TypeScript, IndexedDB, and PostgreSQL — committing edits atomically locally in <5ms with a transactional outbox and block-level Last-Write-Wins sync.",
    brief:
      "Offline-first writing space that never waits on a network request and preserves fluid creative atmosphere.",
    coreProblem:
      "Cloud-dependent note apps drop unsaved changes or introduce perceptible typing lag whenever mobile or Wi-Fi connectivity drops.",
    problem:
      "Waiting on cloud round-trips slows writing down and risks data loss whenever connections fluctuate.",
    architectureHighlights: [
      "Commits every edit atomically to IndexedDB alongside a transactional outbox in under 5ms (zero offline data loss).",
      "Background synchronization worker performs clean block-level Last-Write-Wins (LWW) reconciliation into RLS-protected PostgreSQL.",
      "Pairs resilient local-first storage architecture with fluid interactive Three.js / custom GLSL visual backdrops.",
    ],
    architecture: [
      "Atomic IndexedDB commits paired with a transactional outbox queue delivering <5ms local writes.",
      "Background worker executing block-level Last-Write-Wins (LWW) reconciliation against RLS-protected PostgreSQL.",
      "Smooth GPU-driven shader backdrop layered quietly behind minimal editorial typography.",
    ],
    keyConstraints: [
      "Zero lost edits across abrupt offline disconnects or tab refreshes.",
      "Predictable conflict resolution across multi-device sessions.",
    ],
    challenges: [
      "Keeping IndexedDB transactional outbox writes atomic across rapid keystrokes.",
      "Reconciling concurrent block edits safely upon reconnection.",
    ],
    technologies: ["Next.js 16", "TypeScript", "React 19", "IndexedDB", "PostgreSQL", "GLSL"],
    verificationNote: "Deployed live on Vercel with full source repository on GitHub.",
    metricsOrOutcome: "<5ms atomic saves, zero offline loss, conflict-safe block-level Postgres sync.",
    liveUrl: "https://inkless-ashen.vercel.app/",
    githubUrl: "https://github.com/Yashvardhan-4/Inkless",
    diagramType: "shivkush-pwa",
  },
  {
    id: "pralayveer-disaster-response",
    slug: "pralayveer-disaster-response",
    index: "06",
    title: "PralayVeer — Rapid Disaster Preparedness",
    subtitle: "Emergency coordination & accessible shelter routing platform built in 24h for Smart India Hackathon 2024",
    status: "National Hackathon MVP",
    statusShort: "SIH 2024 MVP",
    year: "2024",
    category: "Civic Systems / Geospatial",
    isFlagship: false,
    summary:
      "Rapid-response civic emergency navigation platform engineered during Smart India Hackathon (SIH 2024), delivering an evaluated working MVP within a 24-hour sprint.",
    brief:
      "Emergency shelter locator and evacuation guidance engineered for low-bandwidth degraded cellular networks.",
    coreProblem:
      "During natural disasters, cellular networks degrade and heavy consumer apps fail when citizens urgently need nearby shelters.",
    problem:
      "During disasters, commercial routing apps become unusable on degraded cellular networks.",
    architectureHighlights: [
      "Ultra-lightweight Leaflet geospatial mapping pipeline free of heavy tracking scripts.",
      "High-contrast UI adhering strictly to WCAG AA accessibility standards for urgent legibility.",
      "Delivered a functional, judge-evaluated MVP inside a strict 24-hour SIH 2024 sprint.",
    ],
    architecture: [
      "Ultra-lightweight Leaflet geospatial mapping pipeline free of heavy tracking scripts.",
      "High-contrast UI adhering strictly to WCAG AA accessibility standards for urgent legibility.",
      "Delivered a functional, judge-evaluated MVP inside a strict 24-hour SIH 2024 sprint.",
    ],
    keyConstraints: [
      "Strict 24-hour national hackathon deadline.",
      "Clear accessibility under stress and weak connectivity.",
    ],
    challenges: [
      "Fast multi-contributor integration within 24 hours.",
      "Designing zero-clutter evacuation affordances.",
    ],
    technologies: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "Leaflet API", "WCAG AA", "Git"],
    verificationNote: "Delivered in Smart India Hackathon (SIH 2024) 24-hour sprint.",
    metricsOrOutcome: "Delivered functional rapid-response MVP in 24h national SIH 2024 sprint.",
    githubUrl: "https://github.com/Yashvardhan-4",
    diagramType: "pralayveer-geo",
  },
  {
    id: "startup-valuation-predictor",
    slug: "startup-valuation-predictor",
    index: "07",
    title: "Startup Valuation Predictor",
    subtitle: "ML regression pipeline forecasting venture valuations across historical funding rounds",
    status: "Machine Learning Pipeline",
    statusShort: "ML PIPELINE",
    year: "2024",
    category: "Machine Learning & Quantitative Analytics",
    isFlagship: false,
    summary:
      "Predictive machine learning pipeline forecasting startup valuations from multi-round funding history and growth metrics.",
    brief:
      "Predictive regression pipeline built to model non-linear venture capital valuations across historical rounds.",
    coreProblem:
      "Early-stage venture valuations contain heavy outlier skew across funding stages, breaking naive linear assumptions.",
    problem:
      "Early-stage venture valuations contain heavy outlier skew across funding stages.",
    architectureHighlights: [
      "Automated preprocessing with logarithmic scaling and sparse funding-stage imputation.",
      "Cross-validated regression benchmarking across Ridge, Lasso, Random Forest, and Gradient Boosting.",
    ],
    architecture: [
      "Automated preprocessing with logarithmic scaling and sparse funding-stage imputation.",
      "Cross-validated regression benchmarking across Ridge, Lasso, Random Forest, and Gradient Boosting.",
    ],
    keyConstraints: ["Heavy right-skewness in unicorn round datasets."],
    challenges: ["Regularizing variance across sparse historical indicators."],
    technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    verificationNote: "Cross-validated regression models predicting multi-stage benchmarks.",
    metricsOrOutcome: "Cross-validated regression suite modeling venture funding valuation bands.",
    githubUrl: "https://github.com/Yashvardhan-4",
    diagramType: "valuation-ml",
  },
  {
    id: "algorithmic-graph-engine",
    slug: "algorithmic-graph-engine",
    index: "08",
    title: "Algorithmic Graph Theory & Systems Engine",
    subtitle: "High-performance C++ graph algorithms and network flow benchmark suite",
    status: "Computational Theory & Benchmark",
    statusShort: "SYSTEMS & ALGORITHMS",
    year: "2025",
    category: "Computational Theory / C++",
    isFlagship: false,
    summary:
      "Computational graph theory suite benchmarking core shortest-path and maximum-flow algorithms, built alongside NPTEL Elite + Silver (77/100) coursework and 600+ competitive programming problems.",
    brief:
      "C++ and TypeScript benchmark suite studying practical performance of classical network flow and routing algorithms.",
    coreProblem:
      "Asymptotic bounds rarely show constant-factor and cache-locality differences across dense vs. sparse topologies.",
    problem:
      "Evaluating real-world cache efficiency of classical shortest-path and max-flow algorithms.",
    architectureHighlights: [
      "Ford-Fulkerson Maximum Flow with Edmonds-Karp BFS augmenting paths.",
      "Optimized Dijkstra shortest path using compact adjacency lists.",
      "Validated across 600+ algorithmic problem patterns on LeetCode, Codeforces, and CodeChef.",
    ],
    architecture: [
      "Ford-Fulkerson Maximum Flow with Edmonds-Karp BFS augmenting paths.",
      "Optimized Dijkstra shortest path using compact adjacency lists.",
      "Validated across 600+ algorithmic problem patterns.",
    ],
    keyConstraints: ["Memory-efficient adjacency representation minimizing pointer overhead."],
    challenges: ["Benchmarking empirical scaling cleanly across sparse and dense random graphs."],
    technologies: ["C++", "TypeScript", "Graph Theory", "Algorithms", "Data Structures"],
    verificationNote: "Companion to NPTEL IIT Madras/Kharagpur Elite + Silver (77/100) and 600+ solved problems.",
    metricsOrOutcome: "Built alongside NPTEL Elite + Silver (77/100) and 600+ solved DSA problems.",
    githubUrl: "https://github.com/Yashvardhan-4",
    diagramType: "graph-flow",
  },
];

// Backward-compatible exports for archive pages
export type Project = ProjectData;
export const projects = selectedProjects;
