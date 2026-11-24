export interface KnowledgeChunk {
  id: string;
  category: "about" | "projects" | "education" | "skills" | "competitive-programming" | "contact";
  title: string;
  keywords: string[];
  summary: string;
  fullContent: string;
  actions?: {
    label: string;
    href: string;
    isExternal?: boolean;
  }[];
}

export interface SemanticResponse {
  content: string;
  reasoningSteps: string[];
  actions: Array<{
    label: string;
    href: string;
    isExternal?: boolean;
  }>;
}

export const AI_KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  {
    id: "about-yashvardhan",
    category: "about",
    title: "About Yashvardhan Borude",
    keywords: ["who", "about", "bio", "background", "introduce", "yashvardhan", "borude", "profile", "overview", "what do you do"],
    summary: "Software Engineering undergraduate (PCCOE Pune, Batch of 2028) specializing in AI-ML, Data Systems, and Full Stack Web.",
    fullContent:
      "Yashvardhan Borude is a B.Tech Computer Engineering undergraduate at PCCOE Pune (CGPA: 8.86/10, Expected May 2028). He shipped a paid commercial ERP + offline PWA for Shivkush Hi-Tech Nursery around PostgreSQL ACID transactions and Row-Level Security, builds clinical cardiac deep learning models (CardioMamba-EM, 98.49% benchmark accuracy), financial-crime graph analytics (TRACE-X), desktop download acceleration (TurboIDM), and local-first creative web software (Inkless). He ranked Global Top 1,500 in Google BigCode 2026 and solved 600+ algorithmic problems.",
    actions: [
      { label: "View Selected Work", href: "/#work" },
      { label: "Contact Yashvardhan", href: "/#contact" },
      { label: "GitHub Profile ↗", href: "https://github.com/Yashvardhan-4", isExternal: true },
    ],
  },
  {
    id: "project-cardiomamba",
    category: "projects",
    title: "CardioMamba-EM — Deep Learning Cardiac Screening",
    keywords: [
      "cardiomamba", "cardio", "mamba", "heart", "ecg", "pcg", "ssm", "pytorch",
      "physionet", "medical", "healthcare", "auroc", "deep learning", "ml", "ai"
    ],
    summary: "Bidirectional BiMamba SSM for synchronized 500 Hz ECG & heart-sound screening (98.49% accuracy, 99.56% sensitivity).",
    fullContent:
      "CardioMamba-EM combines electrical heart rhythms (ECG) and acoustic heart sounds (500 Hz PCG) inside an O(L) bidirectional BiMamba Selective State-Space Model. It outperformed published literature (HPA-Net & PACFNet) on PhysioNet CinC 2016 with **98.49% accuracy** and **99.56% sensitivity**. Validated via patient-independent 5-fold CV (360 patients, 91.57% AUROC, DeLong statistical testing), it reduced missed cardiac cases by **66.7%** (from 18 down to 6) and was distilled into a tiny **112K-parameter (448 KB, ~160ms)** model served with FastAPI + React.",
    actions: [
      { label: "Read Case Study →", href: "/projects/cardiomamba-em" },
      { label: "Explore Showcase", href: "/#work" },
    ],
  },
  {
    id: "project-tracex",
    category: "projects",
    title: "TRACE-X — Financial Crime & Insider Risk Engine",
    keywords: [
      "trace", "tracex", "trace-x", "aml", "fincrime", "financial crime", "fraud",
      "insider", "risk", "networkx", "fastapi", "react flow", "docker", "iam", "banking"
    ],
    summary: "7-engine AML & insider-risk engine with interactive React Flow counterfactual attack-graph studio.",
    fullContent:
      "TRACE-X is a 7-engine anti-money-laundering (AML) and insider-risk prototype built with **FastAPI, SQLAlchemy, NetworkX, Next.js 14, React Flow, and Docker**. It correlates off-hours IAM privilege overrides directly with downstream transfers using regulatory structuring checks, directed cycle detection, and exponential time-decay scoring. Features an interactive counterfactual edge-removal sandbox and a 7-scenario banking twin benchmark deployed live on Vercel.",
    actions: [
      { label: "Live Demo ↗", href: "https://frontend-chi-pied-40.vercel.app", isExternal: true },
      { label: "GitHub Repo ↗", href: "https://github.com/Yashvardhan-4/TRACE-X", isExternal: true },
      { label: "Read Case Study →", href: "/projects/trace-x" },
    ],
  },
  {
    id: "project-shivkush",
    category: "projects",
    title: "Shivkush Nursery — Enterprise ERP (SNMS) & Bilingual PWA",
    keywords: [
      "shivkush", "snms", "erp", "nursery", "pwa", "ecommerce", "commercial", "agriculture",
      "supabase", "freelance", "contract", "offline", "for update", "ledger", "excel", "draco"
    ],
    summary: "Paid solo contract: Next.js 16 + PostgreSQL ERP (18.5K+ LOC, 18 migrations, append-only ledger) + offline bilingual 3D PWA.",
    fullContent:
      "Commissioned as sole engineer for Shivkush Hi-Tech Nursery (Dec 2025 – May 2026), Yashvardhan shipped both their daily-operations ERP (SNMS) and client storefront:\n- **Operations ERP (SNMS):** 18.5K+ LOC, 18 migrations, and 8 PostgreSQL stored procedures eliminating overselling via `SELECT ... FOR UPDATE` row locks and Row-Level Security.\n- **Audit & Speed:** Append-only payment ledger + `vw_daily_cashbook` delivering **100% cash-on-hand reconciliation** and **10,000-row Excel exports in <300ms**.\n- **Customer PWA:** Offline-first English/Marathi platform cutting image weight by **93.9%** (WebP) and 3D plant size by **83.9%** (Google Draco).",
    actions: [
      { label: "Live Storefront ↗", href: "https://shivkush-hi-tech-nursery.vercel.app/", isExternal: true },
      { label: "Explore Case Study →", href: "/projects/shivkush-nursery-pwa" },
    ],
  },
  {
    id: "project-turboidm",
    category: "projects",
    title: "TurboIDM — Multi-Stream Download Accelerator",
    keywords: [
      "turboidm", "download", "accelerator", "electron", "http range", "work stealing",
      "ftruncate", "posix", "chrome", "mv3", "extension", "streams"
    ],
    summary: "Up to 8x faster cross-platform download manager using 32 HTTP Range streams, work-stealing scheduler, and 0.00s merge.",
    fullContent:
      "TurboIDM is a desktop download manager built with **Node.js, Electron, React 19, Chrome MV3, and GitHub Actions**. It accelerates throttled transfers by **up to 8x** across 32 concurrent HTTP Range streams with a dynamic work-stealing scheduler that splits slow byte ranges across idle workers. Each stream writes straight to its pre-allocated byte offset on disk (POSIX `ftruncate`), eliminating post-download merge stalls across Windows, macOS, and Linux.",
    actions: [
      { label: "GitHub Releases ↗", href: "https://github.com/Yashvardhan-4/TurboIDM-Releases", isExternal: true },
      { label: "Live Website ↗", href: "https://turbo-idm.vercel.app/", isExternal: true },
      { label: "Read Case Study →", href: "/projects/turboidm" },
    ],
  },
  {
    id: "project-inkless",
    category: "projects",
    title: "Inkless — Local-First Journal & Cloud Sync",
    keywords: [
      "inkless", "journal", "diary", "local first", "offline", "indexeddb", "dexie",
      "outbox", "lww", "last write wins", "glsl", "shader"
    ],
    summary: "Sub-5ms atomic local IndexedDB journal with transactional outbox and block-level Postgres sync.",
    fullContent:
      "Inkless is an offline-first distraction-free journal built with **Next.js 16, TypeScript, IndexedDB, and RLS-protected PostgreSQL**. Every edit commits atomically to IndexedDB + a transactional outbox in **under 5ms** (zero offline loss), synchronized cleanly in the background via block-level Last-Write-Wins (LWW) reconciliation alongside custom GLSL shaders.",
    actions: [
      { label: "Live App ↗", href: "https://inkless-ashen.vercel.app/", isExternal: true },
      { label: "GitHub Repo ↗", href: "https://github.com/Yashvardhan-4/Inkless", isExternal: true },
    ],
  },
  {
    id: "project-pralayveer",
    category: "projects",
    title: "PralayVeer — Smart India Hackathon 2024 MVP",
    keywords: ["pralayveer", "disaster", "hackathon", "sih", "smart india", "evacuation", "shelter", "leaflet"],
    summary: "Rapid disaster preparedness & shelter locator delivered inside a 24-hour SIH 2024 sprint.",
    fullContent:
      "PralayVeer is a rapid-response disaster preparedness MVP engineered during Smart India Hackathon (SIH 2024) in a strict 24-hour sprint, offering high-contrast WCAG AA shelter mapping via Leaflet API designed to stay legible on weak networks.",
    actions: [{ label: "Read Case Study →", href: "/projects/pralayveer-disaster-response" }],
  },
  {
    id: "education-academics",
    category: "education",
    title: "Education & Academic Standing",
    keywords: ["education", "college", "pccoe", "cgpa", "gpa", "degree", "btech", "graduation", "2028", "coursework"],
    summary: "B.Tech Computer Engineering at PCCOE Pune (Batch of 2028) with 8.86 / 10.0 CGPA.",
    fullContent:
      "Yashvardhan is pursuing his **Bachelor of Technology (B.Tech) in Computer Engineering** at **Pimpri Chinchwad College of Engineering (PCCOE), Pune** (Expected **May 2028**). He holds a **CGPA of 8.86 / 10.0** (till Semester 4). Core coursework includes Data Structures & Algorithms, DBMS, Object-Oriented Programming, Operating Systems, Computer Networks, and Machine Learning.",
    actions: [{ label: "View Milestones", href: "/#about" }],
  },
  {
    id: "certifications-nptel",
    category: "education",
    title: "NPTEL National Certifications (IIT Kharagpur & IIT Madras)",
    keywords: ["nptel", "certification", "certificate", "iot", "internet of things", "topper", "top 5%", "91", "graph theory", "iit", "silver", "elite"],
    summary: "NPTEL Elite Top 5% Topper in IoT (91/100 across 82,864 learners) + Elite+Silver in Graph Theory (77/100).",
    fullContent:
      "Yashvardhan holds two top-tier national IIT certifications via NPTEL:\n- **NPTEL Elite (Top 5% National Topper) — Internet of Things** (IIT Kharagpur, Jul–Oct 2026): Scored **91 / 100** placing in the Top 5% out of **82,864 learners**.\n- **NPTEL Elite + Silver — Algorithmic Graph Theory & DSA** (IIT Madras / IIT Kharagpur, Jan–Apr 2025): Scored **77 / 100** covering network flows, shortest paths, matching, and NP-completeness.",
    actions: [
      { label: "View Milestones & Seals", href: "/#about" },
      { label: "View Resume PDF ↗", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
    ],
  },
  {
    id: "competitive-programming",
    category: "competitive-programming",
    title: "Competitive Programming & Google BigCode 2026",
    keywords: ["leetcode", "codeforces", "codechef", "hackerrank", "dsa", "competitive", "problems", "600+", "315+", "bigcode", "pupil"],
    summary: "Google BigCode 2026 Global Top 1,500 & 600+ DSA problems solved across LeetCode (315+), Codeforces, CodeChef, HackerRank.",
    fullContent:
      "Yashvardhan brings strong algorithmic foundations with **Google BigCode 2026 Global Top 1,500** recognition and **600+ DSA problems solved**:\n- **LeetCode:** 315+ Solved (`yashvardhan_4`)\n- **Codeforces:** Pupil (Max Rating **1227**, 200+ solved, `yashvardhanborude7`)\n- **CodeChef:** 2-Star (Peak Rating **1434**, `cheer_swan_02`)\n- **HackerRank:** 5-Star in C++ (`yashvardhanboru9`)",
    actions: [
      { label: "LeetCode ↗", href: "https://leetcode.com/u/yashvardhan_4/", isExternal: true },
      { label: "Codeforces ↗", href: "https://codeforces.com/profile/yashvardhanborude7", isExternal: true },
    ],
  },
  {
    id: "skills-techstack",
    category: "skills",
    title: "Technical Skills & Stack",
    keywords: ["skills", "tech stack", "languages", "frameworks", "python", "c++", "java", "pytorch", "fastapi", "postgresql", "react", "next.js", "docker"],
    summary: "Python, C++, TypeScript, SQL/PostgreSQL, Java, PyTorch, Mamba SSM, NetworkX, FastAPI, React 19, Next.js 16, Three.js, Docker.",
    fullContent:
      "Verified skills from Yashvardhan's production and research stack:\n- **Languages:** Python, C++, SQL (PostgreSQL, PL/pgSQL), TypeScript, JavaScript, Java, HTML5/CSS3.\n- **AI-ML & Data Science:** PyTorch, Mamba (SSMs), Scikit-Learn, Pandas, NumPy, SciPy, NetworkX.\n- **Databases:** PostgreSQL 15+, Stored Procedures, ACID Transactions, Row Locking, SQL Views, Indexing, IndexedDB.\n- **Full Stack & Cloud:** React 19, Next.js 16, FastAPI, SQLAlchemy, Node.js, Express.js, Three.js, Docker, GitHub Actions, Supabase, Vercel, Electron.",
    actions: [{ label: "View All Projects", href: "/#work" }],
  },
  {
    id: "contact-availability",
    category: "contact",
    title: "Contact & Internship Availability",
    keywords: ["hire", "contact", "email", "phone", "internship", "intern", "available", "availability", "job", "opportunity", "collaborate"],
    summary: "Available for Software Engineering & AI-ML Internships. Based in Pune, India.",
    fullContent:
      "Yashvardhan is actively **available for Software Engineering, AI-ML, Data, and Full Stack Internships** (based in Pune, India, and open to in-person, hybrid, or remote collaborations).\n- **Email:** yashvardhanborude7@gmail.com\n- **Phone:** +91-7058230773\n- **LinkedIn:** linkedin.com/in/yashvardhan-borude-8640a6319",
    actions: [
      { label: "Send Email", href: "mailto:yashvardhanborude7@gmail.com" },
      { label: "Open Resume PDF ↗", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
      { label: "Open Contact Postcard", href: "/#contact" },
    ],
  },
];

export const STARTER_PROMPTS = [
  "Tell me about CardioMamba-EM (98.49% AI)",
  "What is TRACE-X financial crime engine?",
  "Tell me about his paid Shivkush ERP contract",
  "What awards & NPTEL topper ranks does he hold?",
  "Is he available for internships right now?",
];

export function classifyIntentAndSynthesize(query: string): SemanticResponse {
  const q = query.trim().toLowerCase();

  if (/^(hi|hello|hey|hola|yo|good morning|good afternoon|good evening|howdy|sup)\b/i.test(q)) {
    return {
      content:
        "Hello! I'm **Sprout AI**, Yashvardhan's portfolio guide. Everything here matches his verified work: **CardioMamba-EM** cardiac AI (98.49%), **TRACE-X** fraud analytics, a **paid client ERP & PWA** for Shivkush Nursery, **IIT Kharagpur IoT Top 5%**, and **600+ coding problems solved**.\n\nWhat would you like to explore?",
      reasoningSteps: ["Greeted visitor", "Summarized updated portfolio milestones"],
      actions: [
        { label: "Explore Work →", href: "/#work" },
        { label: "View Official Resume ↗", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
      ],
    };
  }

  if (q.includes("cardiomamba") || q.includes("heart") || q.includes("ecg") || q.includes("cardio") || q.includes("mamba")) {
    return {
      content: AI_KNOWLEDGE_CHUNKS[1].fullContent,
      reasoningSteps: ["Matched CardioMamba-EM cardiac deep learning chunk"],
      actions: AI_KNOWLEDGE_CHUNKS[1].actions || [],
    };
  }

  if (q.includes("trace") || q.includes("fraud") || q.includes("aml") || q.includes("fincrime") || q.includes("insider")) {
    return {
      content: AI_KNOWLEDGE_CHUNKS[2].fullContent,
      reasoningSteps: ["Matched TRACE-X financial crime engine chunk"],
      actions: AI_KNOWLEDGE_CHUNKS[2].actions || [],
    };
  }

  if (q.includes("turboidm") || q.includes("download") || q.includes("electron") || q.includes("stream")) {
    return {
      content: AI_KNOWLEDGE_CHUNKS[4].fullContent,
      reasoningSteps: ["Matched TurboIDM desktop downloader chunk"],
      actions: AI_KNOWLEDGE_CHUNKS[4].actions || [],
    };
  }

  if (q.includes("inkless") || q.includes("journal") || q.includes("diary") || q.includes("indexeddb")) {
    return {
      content: AI_KNOWLEDGE_CHUNKS[5].fullContent,
      reasoningSteps: ["Matched Inkless local-first journal chunk"],
      actions: AI_KNOWLEDGE_CHUNKS[5].actions || [],
    };
  }

  if (q.includes("shivkush") || q.includes("snms") || q.includes("erp") || q.includes("nursery") || q.includes("freelance") || q.includes("client")) {
    return {
      content: AI_KNOWLEDGE_CHUNKS[3].fullContent,
      reasoningSteps: ["Matched Shivkush Nursery commercial ERP & PWA chunk"],
      actions: AI_KNOWLEDGE_CHUNKS[3].actions || [],
    };
  }

  if (q.includes("nptel") || q.includes("iot") || q.includes("topper") || q.includes("top 5") || q.includes("certif") || q.includes("iit") || q.includes("award")) {
    return {
      content: AI_KNOWLEDGE_CHUNKS[8].fullContent,
      reasoningSteps: ["Matched NPTEL national certifications chunk (IoT 91/100 Top 5% + Graph Theory 77/100)"],
      actions: AI_KNOWLEDGE_CHUNKS[8].actions || [],
    };
  }

  if (q.includes("cgpa") || q.includes("gpa") || q.includes("college") || q.includes("pccoe") || q.includes("education") || q.includes("2028")) {
    return {
      content: AI_KNOWLEDGE_CHUNKS[7].fullContent,
      reasoningSteps: ["Matched PCCOE Pune academic chunk (8.86 CGPA, Batch of 2028)"],
      actions: AI_KNOWLEDGE_CHUNKS[7].actions || [],
    };
  }

  if (q.includes("leetcode") || q.includes("codeforces") || q.includes("codechef") || q.includes("hackerrank") || q.includes("bigcode") || q.includes("dsa") || q.includes("600")) {
    return {
      content: AI_KNOWLEDGE_CHUNKS[9].fullContent,
      reasoningSteps: ["Matched Competitive Programming & Google BigCode Top 1,500 chunk"],
      actions: AI_KNOWLEDGE_CHUNKS[9].actions || [],
    };
  }

  if (q.includes("hire") || q.includes("intern") || q.includes("avail") || q.includes("contact") || q.includes("email")) {
    return {
      content: AI_KNOWLEDGE_CHUNKS[11].fullContent,
      reasoningSteps: ["Matched availability & contact chunk (Open to Internships)"],
      actions: AI_KNOWLEDGE_CHUNKS[11].actions || [],
    };
  }

  if (q.includes("resume") || q.includes("cv") || q.includes("pdf")) {
    return {
      content:
        "You can inspect or download Yashvardhan's **latest November 2026 Resume** directly inside the portfolio (including ATS plaintext copy), covering CardioMamba-EM, TRACE-X, Shivkush ERP & PWA, TurboIDM, Inkless, NPTEL IoT Top 5% (91/100), and 600+ DSA problems solved.",
      reasoningSteps: ["Retrieved latest PDF Resume reference"],
      actions: [{ label: "Open Resume PDF ↗", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true }],
    };
  }

  const matched = matchKnowledgeChunk(query);
  if (matched) {
    return {
      content: matched.chunk.fullContent,
      reasoningSteps: [`Semantic match: ${matched.chunk.title}`],
      actions: matched.chunk.actions || [{ label: "Explore Work", href: "/#work" }],
    };
  }

  return {
    content: AI_KNOWLEDGE_CHUNKS[0].fullContent,
    reasoningSteps: ["Provided verified overview"],
    actions: AI_KNOWLEDGE_CHUNKS[0].actions || [],
  };
}

export function matchKnowledgeChunk(query: string): { chunk: KnowledgeChunk; score: number } | null {
  const normalizedQuery = query.toLowerCase();
  const queryTokens = normalizedQuery.split(/\W+/).filter(Boolean);

  let bestChunk: KnowledgeChunk | null = null;
  let highestScore = 0;

  for (const chunk of AI_KNOWLEDGE_CHUNKS) {
    let score = 0;
    if (normalizedQuery.includes(chunk.title.toLowerCase())) score += 15;
    for (const kw of chunk.keywords) {
      if (normalizedQuery.includes(kw.toLowerCase())) score += 8;
      for (const token of queryTokens) {
        if (token === kw.toLowerCase() || (token.length > 3 && kw.toLowerCase().includes(token))) score += 4;
      }
    }
    const summaryLower = chunk.summary.toLowerCase();
    for (const token of queryTokens) {
      if (summaryLower.includes(token)) score += 2;
    }
    if (score > highestScore) {
      highestScore = score;
      bestChunk = chunk;
    }
  }

  if (highestScore > 0 && bestChunk) return { chunk: bestChunk, score: highestScore };
  return { chunk: AI_KNOWLEDGE_CHUNKS[0], score: 1 };
}
