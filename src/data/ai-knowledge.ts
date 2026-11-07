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

export const AI_KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  {
    id: "about-yashvardhan",
    category: "about",
    title: "About Yashvardhan Borude",
    keywords: ["who", "about", "bio", "background", "introduce", "yashvardhan", "borude", "profile", "overview", "what do you do"],
    summary: "Full Stack Software Engineer & Competitive Programmer from Pune, India.",
    fullContent:
      "Yashvardhan Borude is a Computer Engineering undergraduate at Pimpri Chinchwad College of Engineering (PCCOE) Pune (Class of 2028). He specializes in high-performance web systems, production PostgreSQL architectures with Row-Level Security (RLS), and algorithmic problem-solving. He has authored production applications including a commercial bilingual PWA for Shivkush Hi-Tech Nursery, built national hackathon finalists (PralayVeer for SIH 2024), and holds an NPTEL Elite+Silver certification in Algorithmic Graph Theory.",
    actions: [
      { label: "View Experience", href: "/#work" },
      { label: "Contact Yashvardhan", href: "/#contact" },
      { label: "GitHub Profile", href: "https://github.com/Yashvardhan-4", isExternal: true },
    ],
  },
  {
    id: "project-shivkush",
    category: "projects",
    title: "Shivkush Nursery Management System",
    keywords: ["shivkush", "nursery", "pwa", "ecommerce", "commercial", "agriculture", "plants", "supabase", "freelance", "contract"],
    summary: "Production bilingual agricultural commerce engine with offline PWA caching & PostgreSQL RLS.",
    fullContent:
      "Shivkush Nursery Management System is a solo commercial software contract engineered by Yashvardhan for an agricultural plant nursery in Ahilyanagar, India (Dec 2025 – May 2026). It solves low-bandwidth 2G/3G connectivity constraints for rural farmers using an offline-first Service Worker architecture (`sw.js` with `CACHE_NAME = 'shivkush-v1'`). Key technical achievements include:\n- Bilingual catalog (English / Marathi) with zero-account-barrier ordering.\n- Supabase PostgreSQL database secured with granular Row-Level Security (RLS) policies allowing public inserts while restricting administrative management.\n- Interactive 3D WebGL plant visualization using Three.js and lightweight 2D canvas particle systems.\n- 1-tap direct WhatsApp routing for customer order fulfillment.",
    actions: [
      { label: "Explore Case Study", href: "/projects/shivkush-nursery-pwa" },
      { label: "Source Verification", href: "https://github.com/Yashvardhan-4", isExternal: true },
    ],
  },
  {
    id: "project-pralayveer",
    category: "projects",
    title: "PralayVeer — Rapid Disaster Preparedness",
    keywords: ["pralayveer", "disaster", "hackathon", "sih", "smart india", "evacuation", "shelter", "leaflet", "emergency"],
    summary: "Emergency coordination & accessible shelter routing platform engineered for degraded networks (SIH 2024 Finalist).",
    fullContent:
      "PralayVeer is a rapid-response disaster preparedness platform built for the Smart India Hackathon (SIH 2024), where Yashvardhan served as Lead Frontend Engineer. Engineered specifically for high-stress emergency communication and low-bandwidth networks, it provides real-time evacuation routing and accessible shelter mapping via Leaflet API, adhering strictly to WCAG AA contrast standards.",
    actions: [
      { label: "Explore Case Study", href: "/projects/pralayveer-disaster-response" },
    ],
  },
  {
    id: "project-valuation",
    category: "projects",
    title: "Early-Stage Startup Valuation Predictor",
    keywords: ["startup", "valuation", "machine learning", "predictor", "xgboost", "random forest", "finance", "venture capital"],
    summary: "Supervised regression pipeline predicting pre-money valuations for early-stage tech ventures.",
    fullContent:
      "A machine learning pipeline engineered with Python, Scikit-Learn, and XGBoost to predict pre-money startup valuations based on founder pedigree, market size, funding stages, and traction metrics. It features rigorous cross-validation and feature importance analysis.",
    actions: [
      { label: "Explore Case Study", href: "/projects/startup-valuation-predictor" },
    ],
  },
  {
    id: "project-graph-engine",
    category: "projects",
    title: "Algorithmic Graph Theory & Benchmark Engine",
    keywords: ["graph", "engine", "algorithms", "dijkstra", "ford fulkerson", "bfs", "dfs", "benchmark", "c++", "max flow"],
    summary: "High-performance C++20 graph algorithms suite with empirical benchmark visualizer.",
    fullContent:
      "A high-performance algorithmic suite implemented in C++20 featuring optimized implementations of Dijkstra's, Bellman-Ford, Ford-Fulkerson Maximum Flow, and Dinic's Algorithm. Benchmarked across dense and sparse random graphs with interactive execution trace visualizers.",
    actions: [
      { label: "Explore Case Study", href: "/projects/algorithmic-graph-engine" },
    ],
  },
  {
    id: "education-academics",
    category: "education",
    title: "Education & Academic Standing",
    keywords: ["education", "college", "pccoe", "cgpa", "degree", "marks", "grade", "university", "btech", "computer engineering"],
    summary: "B.Tech in Computer Engineering at PCCOE Pune with CGPA 8.86 / 10.0.",
    fullContent:
      "Yashvardhan is pursuing his Bachelor of Technology (B.Tech) in Computer Engineering at Pimpri Chinchwad College of Engineering (PCCOE), Pune (Expected graduation: May 2028). He maintains a cumulative CGPA of 8.86 / 10.0 (till Semester 4, currently in 3rd Year / Semester 5). Core coursework includes Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, OOP, and Machine Learning.",
    actions: [
      { label: "View Academic Timeline", href: "/#about" },
    ],
  },
  {
    id: "certifications-nptel",
    category: "education",
    title: "NPTEL Certification — Algorithmic Graph Theory",
    keywords: ["nptel", "certification", "graph theory", "iit", "silver", "elite", "score", "certificate", "madras", "kharagpur"],
    summary: "NPTEL Elite + Silver Certificate in Algorithmic Graph Theory (Score: 77/100, Top Tier).",
    fullContent:
      "Yashvardhan earned the prestigious NPTEL Elite + Silver Certificate in Algorithmic Graph Theory & Data Structures (issued by IIT Madras / Kharagpur, Jan 2025 – Apr 2025) with a proctored score of 77/100, placing him in the top percentile nationwide. The certification validates rigorous theoretical mastery in network flows, bipartite matching, shortest paths, and NP-completeness reductions.",
    actions: [
      { label: "Explore Graph Engine Project", href: "/projects/algorithmic-graph-engine" },
    ],
  },
  {
    id: "competitive-programming",
    category: "competitive-programming",
    title: "Competitive Programming & Problem Solving",
    keywords: ["leetcode", "codeforces", "dsa", "competitive programming", "codechef", "hackerrank", "rating", "solved", "bigcode"],
    summary: "500+ problems solved across LeetCode, Codeforces (Pupil 1227), CodeChef (2-Star), and HackerRank (5-Star Gold).",
    fullContent:
      "Yashvardhan is an active competitive programmer with 500+ algorithmic problems solved across platforms:\n- LeetCode: 213+ problems solved (handle: yashvardhan_4), focusing heavily on Trees, Dynamic Programming, and Graph algorithms.\n- Codeforces: Pupil rank (Peak Rating: 1227, handle: yashvardhan_4), 200+ contest problems solved.\n- CodeChef: 2-Star (Peak Rating: 1434, handle: yashvardhan_4).\n- HackerRank: 5-Star Gold Badge in C++.\n- Google BigCode 2026: Ranked in the Global Top 1,500.",
    actions: [
      { label: "LeetCode Profile ↗", href: "https://leetcode.com/u/yashvardhan_4/", isExternal: true },
      { label: "Codeforces Profile ↗", href: "https://codeforces.com/profile/yashvardhan_4", isExternal: true },
    ],
  },
  {
    id: "skills-techstack",
    category: "skills",
    title: "Technical Stack & Engineering Capabilities",
    keywords: ["skills", "tech stack", "languages", "frameworks", "technologies", "next.js", "react", "typescript", "c++", "postgresql"],
    summary: "C++, TypeScript, Next.js, React, Three.js, Node.js, PostgreSQL (Supabase RLS), Linux, Docker basics.",
    fullContent:
      "Core Technical Proficiencies:\n- Languages: C++, TypeScript, JavaScript (ES6+), Python, SQL (PostgreSQL), HTML5/CSS3.\n- Frontend: Next.js (App Router), React.js, Three.js (WebGL), Canvas API, Tailwind CSS, Progressive Web Apps (PWAs).\n- Backend & Databases: Node.js, Express.js, PostgreSQL, Supabase, Row-Level Security (RLS), RESTful APIs, Service Workers.\n- Engineering Tools: Git, GitHub, Linux/Bash, Docker (Basics), Postman, Figma, Vercel.",
    actions: [
      { label: "View All Projects", href: "/#work" },
    ],
  },
  {
    id: "contact-availability",
    category: "contact",
    title: "Contact & Availability",
    keywords: ["hire", "contact", "email", "phone", "internship", "availability", "job", "opportunity", "reach out", "connect", "collaborate"],
    summary: "Open to Software Engineering Internships and Full-Stack development roles for Summer/Fall 2026.",
    fullContent:
      "Yashvardhan is actively open to Software Engineering Internships and collaborative software development opportunities for Summer and Fall 2026. He is based in Pune, Maharashtra, India, and open to hybrid or remote arrangements.\n- Email: yashvardhanborude7@gmail.com\n- Phone: +91-7058230773\n- Location: Pune, Maharashtra, India",
    actions: [
      { label: "Send Email", href: "mailto:yashvardhanborude7@gmail.com" },
      { label: "LinkedIn Profile ↗", href: "https://linkedin.com/in/yashvardhan-borude", isExternal: true },
      { label: "Download Resume", href: "/resume.pdf", isExternal: true },
    ],
  },
];

export const STARTER_PROMPTS = [
  "Tell me about the Shivkush Nursery PWA",
  "What is Yashvardhan's CGPA & NPTEL score?",
  "What is his competitive programming standing?",
  "What technologies does he specialize in?",
  "Is he available for Summer 2026 internships?",
];

/**
 * Fast semantic keyword and token matcher for offline zero-latency RAG response.
 */
export function matchKnowledgeChunk(query: string): { chunk: KnowledgeChunk; score: number } | null {
  const normalizedQuery = query.toLowerCase();
  const queryTokens = normalizedQuery.split(/\W+/).filter(Boolean);

  let bestChunk: KnowledgeChunk | null = null;
  let highestScore = 0;

  for (const chunk of AI_KNOWLEDGE_CHUNKS) {
    let score = 0;

    // Check title match
    if (normalizedQuery.includes(chunk.title.toLowerCase())) {
      score += 15;
    }

    // Check keywords
    for (const kw of chunk.keywords) {
      if (normalizedQuery.includes(kw.toLowerCase())) {
        score += 8;
      }
      for (const token of queryTokens) {
        if (token === kw.toLowerCase() || (token.length > 3 && kw.toLowerCase().includes(token))) {
          score += 4;
        }
      }
    }

    // Check summary and content
    const summaryLower = chunk.summary.toLowerCase();
    for (const token of queryTokens) {
      if (summaryLower.includes(token)) {
        score += 2;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestChunk = chunk;
    }
  }

  if (highestScore > 0 && bestChunk) {
    return { chunk: bestChunk, score: highestScore };
  }

  // Fallback to about chunk if query is general
  return { chunk: AI_KNOWLEDGE_CHUNKS[0], score: 1 };
}
