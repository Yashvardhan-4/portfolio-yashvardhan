export interface ProfileData {
  name: string;
  legalName: string;
  headline: string;
  subheadline: string;
  location: string;
  availability: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  leetcode: string;
  codeforces: string;
  codechef: string;
  hackerrank: string;
  education: {
    institution: string;
    shortName: string;
    degree: string;
    specialization: string;
    cgpa: string;
    standing: string;
    timeline: string;
    coursework: string[];
  };
  certifications: {
    id: string;
    title: string;
    shortTitle: string;
    issuer: string;
    timeline: string;
    score: string;
    badge: string;
    sealTone: "gold" | "silver";
    summary: string;
    topics: string[];
  }[];
  competitiveProgramming: {
    totalSolved: string;
    bigCodeRank: string;
    platforms: {
      name: string;
      handle: string;
      ratingOrStatus: string;
      solved: string;
      url: string;
    }[];
  };
  experience: {
    company: string;
    role: string;
    type: string;
    period: string;
    location: string;
    humanSummary: string;
    highlights: string[];
    tags: string[];
  }[];
  skills: {
    category: string;
    description: string;
    items: string[];
  }[];
}

export const profile: ProfileData = {
  name: "Yashvardhan Borude",
  legalName: "Yashvardhan Shashikant Borude",
  headline: "Software Engineer — AI-ML, Systems & Full Stack",
  subheadline:
    "Computer Engineering undergraduate at PCCOE Pune shipping production business software, cardiac deep learning models, financial intelligence tools, and tactile digital experiences.",
  location: "Pune, Maharashtra, India",
  availability: "Open to Software & AI Internships",
  email: "yashvardhanborude7@gmail.com",
  phone: "+91-7058230773",
  github: "https://github.com/Yashvardhan-4",
  linkedin: "https://linkedin.com/in/yashvardhan-borude-8640a6319",
  leetcode: "https://leetcode.com/u/yashvardhan_4/",
  codeforces: "https://codeforces.com/profile/yashvardhanborude7",
  codechef: "https://www.codechef.com/users/cheer_swan_02",
  hackerrank: "https://www.hackerrank.com/profile/yashvardhanboru9",
  education: {
    institution: "Pimpri Chinchwad College of Engineering (PCCOE)",
    shortName: "PCCOE Pune",
    degree: "Bachelor of Technology (B.Tech)",
    specialization: "Computer Engineering",
    cgpa: "8.86 / 10.0 (Till Semester 4)",
    standing: "Third Year · Batch of 2028",
    timeline: "Expected May 2028",
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Object-Oriented Programming",
      "Operating Systems",
      "Computer Networks",
      "Machine Learning",
    ],
  },
  certifications: [
    {
      id: "nptel-iot",
      title: "NPTEL Elite (Top 5% Topper) — Internet of Things",
      shortTitle: "Internet of Things · Top 5%",
      issuer: "IIT Kharagpur",
      timeline: "Jul 2026 – Oct 2026",
      score: "91 / 100 · Top 5% of 82,864 Learners",
      badge: "Top 5% National Topper",
      sealTone: "gold",
      summary:
        "Ranked in the top 5% nationally out of 82,864 certified learners across connected sensors, edge telemetry, and embedded IoT protocols.",
      topics: [
        "Sensor Networks",
        "IoT Protocols (MQTT / CoAP)",
        "Edge Architecture",
        "Cloud Telemetry",
      ],
    },
    {
      id: "nptel-graph",
      title: "NPTEL Elite + Silver — Algorithmic Graph Theory & DSA",
      shortTitle: "Algorithmic Graph Theory",
      issuer: "IIT Madras / IIT Kharagpur",
      timeline: "Jan 2025 – Apr 2025",
      score: "77 / 100 · Elite + Silver Medal",
      badge: "Elite + Silver",
      sealTone: "silver",
      summary:
        "Completed a rigorous 12-week IIT curriculum covering network flows, shortest paths, matching problems, and computational complexity.",
      topics: [
        "Dijkstra & Bellman-Ford",
        "Ford-Fulkerson Max Flow",
        "Bipartite Matching",
        "NP-Completeness",
      ],
    },
  ],
  competitiveProgramming: {
    totalSolved: "600+",
    bigCodeRank: "Global Top 1,500 (Google BigCode 2026)",
    platforms: [
      {
        name: "LeetCode",
        handle: "yashvardhan_4",
        ratingOrStatus: "315+ Solved",
        solved: "Trees, Dynamic Programming, and Graph problem solving",
        url: "https://leetcode.com/u/yashvardhan_4/",
      },
      {
        name: "Codeforces",
        handle: "yashvardhanborude7",
        ratingOrStatus: "Pupil (Peak 1227)",
        solved: "200+ competitive contest problems solved",
        url: "https://codeforces.com/profile/yashvardhanborude7",
      },
      {
        name: "CodeChef",
        handle: "cheer_swan_02",
        ratingOrStatus: "2-Star (Peak 1434)",
        solved: "Regular rated contest participant",
        url: "https://www.codechef.com/users/cheer_swan_02",
      },
      {
        name: "HackerRank",
        handle: "yashvardhanboru9",
        ratingOrStatus: "5-Star in C++",
        solved: "Core data structures, algorithms, and OOP mastery",
        url: "https://www.hackerrank.com/profile/yashvardhanboru9",
      },
    ],
  },
  experience: [
    {
      company: "Shivkush Hi-Tech Nursery",
      role: "Full Stack Software Engineer",
      type: "Paid Freelance Contract",
      period: "Dec 2025 – May 2026",
      location: "Ahilyanagar, India",
      humanSummary:
        "Sole engineer hired to take a real agricultural business from paper notebooks to a rock-solid daily operations platform and fast bilingual customer storefront.",
      highlights: [
        "Built the client's daily-operations ERP (SNMS: billing, bookings, inventory, staff) in Next.js 16, TypeScript, and PostgreSQL (18.5K+ LOC, 18 migrations, 8 stored procedures); eliminated overselling via atomic dispatches with SELECT ... FOR UPDATE row locks and Row-Level Security.",
        "Replaced mutable balances with an append-only payment ledger and daily cashbook view reconciling cash, UPI, and split payments (100% cash-on-hand reconciliation), paired with a hub exporting 10,000-row Excel reports in <300ms and bilingual receipts.",
        "Shipped the client's offline-first customer website (PWA) for low-bandwidth rural users, reducing image payloads by 93.9% (WebP) and 3D asset size by 83.9% (Draco compression).",
      ],
      tags: ["Next.js 16", "TypeScript", "PostgreSQL", "Row-Level Security", "Three.js", "PWA"],
    },
    {
      company: "Smart India Hackathon (SIH 2024)",
      role: "Lead Frontend Engineer — PralayVeer",
      type: "National 24-Hour Sprint",
      period: "Aug 2024",
      location: "India",
      humanSummary:
        "Delivered a calm, high-contrast disaster response interface inside a high-pressure 24-hour national sprint so everyday citizens can find shelters even on weak mobile networks.",
      highlights: [
        "Built a rapid-response disaster preparedness MVP engineered specifically for degraded 2G/3G networks and high-stress emergency navigation.",
        "Crafted high-contrast, WCAG AA accessible shelter maps and evacuation routes using Leaflet API for clarity under pressure.",
        "Coordinated modular React sprints to ship a tested, judge-evaluated working product in 24 hours.",
      ],
      tags: ["React", "Tailwind CSS", "Leaflet API", "WCAG AA", "Git"],
    },
  ],
  skills: [
    {
      category: "Languages",
      description: "Core programming and query foundations",
      items: ["Python", "C++", "SQL (PostgreSQL, PL/pgSQL)", "TypeScript", "JavaScript (ES2023+)", "Java", "HTML5", "CSS3"],
    },
    {
      category: "AI-ML & Data Science",
      description: "Neural sequence modeling, signal analysis, and graph intelligence",
      items: ["PyTorch", "Mamba (SSMs)", "Scikit-Learn", "Pandas", "NumPy", "SciPy", "NetworkX", "Statistical Validation"],
    },
    {
      category: "Data & Databases",
      description: "Transactional correctness, auditability, and local-first storage",
      items: ["PostgreSQL 15+", "Stored Procedures", "ACID Transactions", "Row Locking", "SQL Views", "Indexing", "IndexedDB"],
    },
    {
      category: "Full Stack & Interactive Web",
      description: "Modern frameworks, tactile animation, and API design",
      items: ["React 19", "Next.js 16", "Three.js / WebGL", "FastAPI", "SQLAlchemy", "Node.js", "Express.js", "Tailwind CSS"],
    },
    {
      category: "Cloud & Automation",
      description: "Containers, builds, desktop packaging, and shipping pipelines",
      items: ["Docker", "GitHub Actions", "Supabase", "Vercel", "Netlify Functions", "Electron", "Chrome MV3", "Linux / Bash"],
    },
  ],
};
