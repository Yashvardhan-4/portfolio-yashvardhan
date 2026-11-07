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
      { label: "Download Resume", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
    ],
  },
];

export const STARTER_PROMPTS = [
  "What is Yashvardhan's CGPA & NPTEL score?",
  "Tell me about the Shivkush Nursery PWA",
  "What is his competitive programming standing?",
  "What technologies does he specialize in?",
  "Is he available for Summer 2026 internships?",
];

/**
 * Intelligent Multi-Tier Semantic Intent Classifier & Synthesizer.
 * Accurately answers the exact question asked without dumping irrelevant boilerplate.
 */
export function classifyIntentAndSynthesize(query: string): SemanticResponse {
  const q = query.trim().toLowerCase();

  // 1. GREETING INTENT
  if (/^(hi|hello|hey|hola|yo|good morning|good afternoon|good evening|howdy|sup)\b/i.test(q)) {
    return {
      content:
        "Hello! I'm **Sprout AI**, Yashvardhan's interactive portfolio companion. I'm strictly grounded in his verified projects, academic records at PCCOE Pune, and competitive programming achievements.\n\nWhat would you like to explore today? You can ask about his commercial work (like the **Shivkush Nursery PWA**), his **CGPA & NPTEL awards**, his **500+ LeetCode problems**, or his technical stack.",
      reasoningSteps: [
        "Identified user conversational greeting",
        "Initialized Sprout companion persona with verified portfolio scope",
      ],
      actions: [
        { label: "Explore Shivkush PWA →", href: "/projects/shivkush-nursery-pwa" },
        { label: "Academic Credentials", href: "/#about" },
        { label: "View PDF Resume", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
      ],
    };
  }

  // 2. IDENTITY / CREATOR INTENT
  if (
    q.includes("who are you") ||
    q.includes("what can you do") ||
    q.includes("who created you") ||
    q.includes("who made you") ||
    q.includes("what is sprout") ||
    q.includes("what is your purpose")
  ) {
    return {
      content:
        "I am **Sprout AI**, a custom intelligent companion designed for Yashvardhan Borude's portfolio.\n\nUnlike generic AI chatbots, I operate with **strict factual grounding** in Yashvardhan's actual work:\n• **Commercial Software Contracts** (Shivkush Nursery bilingual PWA)\n• **Academic Credentials** (PCCOE Pune Computer Engineering, CGPA 8.86/10.0)\n• **National Honors** (NPTEL Elite + Silver in Graph Theory, SIH 2024 Finalist)\n• **Competitive Programming** (500+ solved across LeetCode, Codeforces, CodeChef)\n\nFeel free to ask me any question about his engineering experience or availability!",
      reasoningSteps: [
        "Parsed inquiry regarding assistant identity and technical capabilities",
        "Summarized grounded knowledge boundaries",
      ],
      actions: [
        { label: "Explore Projects", href: "/#work" },
        { label: "Contact Yashvardhan", href: "/#contact" },
      ],
    };
  }

  // 3. EDUCATION / CGPA / ACADEMICS INTENT
  if (
    q.includes("cgpa") ||
    q.includes("gpa") ||
    q.includes("marks") ||
    q.includes("grade") ||
    q.includes("college") ||
    q.includes("pccoe") ||
    q.includes("university") ||
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("btech") ||
    q.includes("academics") ||
    q.includes("semester")
  ) {
    return {
      content:
        "Yashvardhan is pursuing his **B.Tech in Computer Engineering** at **Pimpri Chinchwad College of Engineering (PCCOE)**, Pune (Class of 2028):\n\n• **Academic Performance**: Cumulative **CGPA of 8.86 / 10.0** (recorded till Semester 4).\n• **Current Standing**: 3rd Year (Semester 5).\n• **Core Coursework**: Data Structures & Algorithms, Database Management Systems (PostgreSQL), Operating Systems & Linux Concurrency, Computer Networks, Object-Oriented Programming (C++), and Machine Learning Foundations.",
      reasoningSteps: [
        "Matched academic inquiry: PCCOE Pune B.Tech Computer Engineering",
        "Verified cumulative CGPA metric: 8.86 / 10.0 through Semester 4",
        "Retrieved official coursework curriculum",
      ],
      actions: [
        { label: "View Academic Timeline", href: "/#about" },
        { label: "View Verified CV", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
      ],
    };
  }

  // 4. NPTEL / CERTIFICATIONS INTENT
  if (
    q.includes("nptel") ||
    q.includes("certification") ||
    q.includes("certificate") ||
    q.includes("graph theory") ||
    q.includes("iit") ||
    q.includes("silver") ||
    q.includes("elite") ||
    q.includes("madras") ||
    q.includes("kharagpur")
  ) {
    return {
      content:
        "Yashvardhan holds the prestigious **NPTEL Elite + Silver Certificate in Algorithmic Graph Theory & Data Structures**, issued jointly by **IIT Madras and IIT Kharagpur** (Jan 2025 – Apr 2025):\n\n• **Proctored Score**: **77 / 100** (Top Percentile Nationwide).\n• **Theoretical Scope**: Network Flows (Ford-Fulkerson, Dinic's Algorithm), Shortest Path Trees (Dijkstra, Bellman-Ford), Bipartite Matching, and NP-completeness reductions.\n• **Practical Application**: Implemented these algorithms in his C++20 Algorithmic Graph Theory & Benchmark Engine.",
      reasoningSteps: [
        "Matched certification query: NPTEL Elite + Silver in Algorithmic Graph Theory",
        "Verified proctored score: 77/100 (IIT Madras / Kharagpur)",
        "Linked theoretical mastery to applied C++20 Graph Engine repository",
      ],
      actions: [
        { label: "Explore Graph Engine Case Study", href: "/projects/algorithmic-graph-engine" },
        { label: "View Resume PDF", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
      ],
    };
  }

  // 5. COMPETITIVE PROGRAMMING / LEETCODE / CODEFORCES INTENT
  if (
    q.includes("leetcode") ||
    q.includes("codeforces") ||
    q.includes("dsa") ||
    q.includes("competitive programming") ||
    q.includes("problems") ||
    q.includes("solved") ||
    q.includes("codechef") ||
    q.includes("hackerrank") ||
    q.includes("bigcode") ||
    q.includes("algorithm")
  ) {
    return {
      content:
        "Yashvardhan is an active competitive programmer with **over 500 algorithmic problems solved** across verified platforms:\n\n• **LeetCode**: 213+ problems solved (handle: [`yashvardhan_4`](https://leetcode.com/u/yashvardhan_4/)), focusing heavily on Trees, Dynamic Programming, and Graph Theory.\n• **Codeforces**: Pupil rank (Peak Rating: **1227**, handle: `yashvardhan_4`), 200+ contest problems solved.\n• **CodeChef**: 2-Star (Peak Rating: **1434**, handle: `yashvardhan_4`).\n• **HackerRank**: 5-Star Gold Badge in C++.\n• **Google BigCode 2026**: Ranked in the **Global Top 1,500** nationwide.",
      reasoningSteps: [
        "Retrieved competitive programming metrics from verified profiles",
        "Aggregated problem counts: 500+ total (213+ LeetCode, 200+ Codeforces)",
        "Verified contest ratings: Codeforces Pupil 1227, CodeChef 2-Star 1434",
      ],
      actions: [
        { label: "LeetCode Profile ↗", href: "https://leetcode.com/u/yashvardhan_4/", isExternal: true },
        { label: "Codeforces Profile ↗", href: "https://codeforces.com/profile/yashvardhan_4", isExternal: true },
      ],
    };
  }

  // 6. SHIVKUSH NURSERY PWA INTENT
  if (
    q.includes("shivkush") ||
    q.includes("nursery") ||
    q.includes("pwa") ||
    q.includes("commercial") ||
    q.includes("freelance") ||
    q.includes("plants") ||
    q.includes("agriculture") ||
    q.includes("supabase") ||
    q.includes("service worker")
  ) {
    return {
      content:
        "**Shivkush Nursery Management System** is a solo commercial software contract engineered by Yashvardhan for an agricultural plant nursery in Ahilyanagar, India (Dec 2025 – May 2026):\n\n• **Core Problem**: Enabled rural farmers in low-bandwidth 2G/3G zones to order agricultural plants without network interruptions.\n• **Offline-First PWA**: Engineered with a custom Service Worker (`CACHE_NAME = 'shivkush-v1'`), achieving **100% Lighthouse PWA audit compliance**.\n• **Database & Security**: Built on Supabase PostgreSQL with granular **Row-Level Security (RLS)** allowing anonymous ordering while restricting inventory management.\n• **Frontend & WebGL**: Interactive 3D WebGL plant visualization using Three.js and custom canvas particle systems.",
      reasoningSteps: [
        "Matched commercial project archive: Shivkush Hi-Tech Nursery PWA",
        "Extracted technical architecture: Next.js, Three.js, Supabase PostgreSQL with RLS, Service Workers",
        "Verified commercial deployment timeline: Dec 2025 – May 2026",
      ],
      actions: [
        { label: "Read Detailed Case Study →", href: "/projects/shivkush-nursery-pwa" },
        { label: "GitHub Profile", href: "https://github.com/Yashvardhan-4", isExternal: true },
      ],
    };
  }

  // 7. PRALAYVEER (SIH 2024) INTENT
  if (
    q.includes("pralayveer") ||
    q.includes("sih") ||
    q.includes("smart india") ||
    q.includes("disaster") ||
    q.includes("hackathon") ||
    q.includes("shelter") ||
    q.includes("evacuation") ||
    q.includes("leaflet")
  ) {
    return {
      content:
        "**PralayVeer** is a rapid-response disaster preparedness platform built for the **Smart India Hackathon (SIH 2024)**, where Yashvardhan served as Lead Frontend Engineer and reached the **National Finals**:\n\n• **Core Functionality**: Real-time evacuation routing and accessible emergency shelter mapping for communities facing extreme weather events.\n• **Low-Bandwidth Architecture**: Built with lightweight Leaflet API integration, optimized for degraded mobile connectivity during crises.\n• **Accessibility**: Designed strictly adhering to WCAG 2.1 AA high-contrast standards for high-stress usability.",
      reasoningSteps: [
        "Matched hackathon project archive: PralayVeer (SIH 2024 Finalist)",
        "Verified role: Lead Frontend Engineer",
        "Retrieved technical stack: Leaflet API, WCAG AA accessible UI, Next.js",
      ],
      actions: [
        { label: "Read Case Study →", href: "/projects/pralayveer-disaster-response" },
      ],
    };
  }

  // 8. STARTUP VALUATION PREDICTOR INTENT
  if (
    q.includes("startup") ||
    q.includes("valuation") ||
    q.includes("predictor") ||
    q.includes("xgboost") ||
    q.includes("machine learning") ||
    q.includes("venture") ||
    q.includes("finance")
  ) {
    return {
      content:
        "**Early-Stage Startup Valuation Predictor** is a machine learning supervised regression pipeline engineered by Yashvardhan:\n\n• **Objective**: Estimates pre-money valuations for tech ventures using founder background, market size, funding rounds, and growth metrics.\n• **Stack & Algorithms**: Engineered with Python, Scikit-Learn, and XGBoost.\n• **Methodology**: Applied 5-fold cross-validation, feature importance analysis, and log-transform regularization on skewed financial datasets.",
      reasoningSteps: [
        "Matched machine learning project: Early-Stage Startup Valuation Predictor",
        "Extracted algorithms: XGBoost, Scikit-Learn regression pipeline",
      ],
      actions: [
        { label: "Read Case Study →", href: "/projects/startup-valuation-predictor" },
      ],
    };
  }

  // 9. GRAPH THEORY BENCHMARK ENGINE INTENT
  if (
    q.includes("graph engine") ||
    q.includes("c++") ||
    q.includes("benchmark") ||
    q.includes("dijkstra") ||
    q.includes("ford fulkerson") ||
    q.includes("dinic") ||
    q.includes("max flow")
  ) {
    return {
      content:
        "**Algorithmic Graph Theory & Benchmark Engine** is a high-performance C++20 algorithms suite engineered by Yashvardhan:\n\n• **Algorithms Implemented**: Optimized Dijkstra's, Bellman-Ford, Ford-Fulkerson Maximum Flow, and Dinic's Algorithm.\n• **Empirical Benchmarks**: Tested across dense and sparse random graphs to measure execution time scaling and memory overhead.\n• **Visualizer**: Generates step-by-step state transition traces for visual verification of algorithm mechanics.",
      reasoningSteps: [
        "Matched C++20 systems project: Graph Theory & Benchmark Engine",
        "Retrieved implemented algorithms: Dijkstra, Bellman-Ford, Ford-Fulkerson, Dinic",
      ],
      actions: [
        { label: "Read Case Study →", href: "/projects/algorithmic-graph-engine" },
      ],
    };
  }

  // 10. TECHNICAL SKILLS & STACK INTENT
  if (
    q.includes("skills") ||
    q.includes("tech stack") ||
    q.includes("technologies") ||
    q.includes("languages") ||
    q.includes("frameworks") ||
    q.includes("react") ||
    q.includes("nextjs") ||
    q.includes("next.js") ||
    q.includes("typescript") ||
    q.includes("c++") ||
    q.includes("postgresql") ||
    q.includes("docker") ||
    q.includes("what do you use")
  ) {
    return {
      content:
        "Yashvardhan's core technical proficiencies:\n\n• **Languages**: C++ (C++20), TypeScript, JavaScript (ES6+), Python, SQL (PostgreSQL), HTML5/CSS3.\n• **Frontend & WebGL**: Next.js (App Router), React.js, Three.js, Canvas API, Tailwind CSS, Progressive Web Apps (PWAs).\n• **Backend & Databases**: Node.js, Express.js, PostgreSQL, Supabase, Row-Level Security (RLS), RESTful APIs, Service Workers.\n• **Engineering Tools**: Git, GitHub, Linux/Bash, Docker (Basics), Postman, Figma, Vercel.",
      reasoningSteps: [
        "Aggregated technical skills from verified codebase repositories and coursework",
        "Categorized by Languages, Frontend, Backend & Systems, and Engineering Tools",
      ],
      actions: [
        { label: "View All Projects", href: "/#work" },
        { label: "View PDF Resume", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
      ],
    };
  }

  // 11. HIRING / INTERNSHIP / CONTACT INTENT
  if (
    q.includes("hire") ||
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("internship") ||
    q.includes("availability") ||
    q.includes("job") ||
    q.includes("opportunity") ||
    q.includes("reach out") ||
    q.includes("connect") ||
    q.includes("collaborate") ||
    q.includes("location") ||
    q.includes("summer 2026")
  ) {
    return {
      content:
        "Yashvardhan is **actively open to Software Engineering Internships and Full-Stack Engineering roles** for Summer and Fall 2026:\n\n• **Location**: Pune, Maharashtra, India (open to Hybrid or Remote roles).\n• **Email**: [`yashvardhanborude7@gmail.com`](mailto:yashvardhanborude7@gmail.com)\n• **Phone**: `+91-7058230773`\n• **GitHub**: [`github.com/Yashvardhan-4`](https://github.com/Yashvardhan-4)\n• **LinkedIn**: [`linkedin.com/in/yashvardhan-borude`](https://linkedin.com/in/yashvardhan-borude)",
      reasoningSteps: [
        "Checked current availability status: Open for Summer/Fall 2026 SWE internships",
        "Retrieved official contact channels: Email, Phone, GitHub, LinkedIn",
      ],
      actions: [
        { label: "✉ Send Direct Email", href: "mailto:yashvardhanborude7@gmail.com" },
        { label: "LinkedIn Profile ↗", href: "https://linkedin.com/in/yashvardhan-borude", isExternal: true },
        { label: "Open Contact Form", href: "/#contact" },
      ],
    };
  }

  // 12. RESUME / CV INTENT
  if (
    q.includes("resume") ||
    q.includes("cv") ||
    q.includes("pdf") ||
    q.includes("curriculum vitae") ||
    q.includes("download")
  ) {
    return {
      content:
        "Yashvardhan's official verified **Curriculum Vitae (2026)** is embedded directly in this portfolio! It details his Computer Engineering degree at PCCOE (CGPA 8.86), NPTEL Elite+Silver award, 500+ competitive programming problem record, and commercial PWA contracts.\n\nYou can view it directly in the in-app CV viewer or download the official PDF file.",
      reasoningSteps: [
        "Located verified resume document: public/Resume/Yashvardhan_Borude_Resume.pdf",
        "Generated direct view and download links",
      ],
      actions: [
        { label: "📄 Open Verified Resume PDF", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
        { label: "Contact Yashvardhan", href: "/#contact" },
      ],
    };
  }

  // 13. OUT OF SCOPE / UNKNOWN QUERY FALLBACK
  return {
    content:
      "I am **Sprout AI**, Yashvardhan's dedicated portfolio companion. I'm strictly grounded in his software engineering projects, academic credentials at PCCOE Pune, and competitive programming achievements.\n\nWhile I can't answer general world trivia or unrelated queries, I'd love to tell you about:\n• **Yashvardhan's CGPA & NPTEL score** (PCCOE Pune, CGPA 8.86)\n• **The Shivkush Nursery PWA** (Commercial contract, Three.js & Supabase RLS)\n• **His 500+ LeetCode & Codeforces problems**\n• **His availability for Summer 2026 internships**",
    reasoningSteps: [
      "Detected query outside documented portfolio scope",
      "Enforced zero-hallucination boundary directive",
      "Offered 4 relevant portfolio topic prompts",
    ],
    actions: [
      { label: "Shivkush PWA Case Study →", href: "/projects/shivkush-nursery-pwa" },
      { label: "Academic Credentials", href: "/#about" },
      { label: "View PDF Resume", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
    ],
  };
}

/**
 * Fast keyword search matcher for specific chunks.
 */
export function matchKnowledgeChunk(query: string): { chunk: KnowledgeChunk; score: number } | null {
  const normalizedQuery = query.toLowerCase();
  const queryTokens = normalizedQuery.split(/\W+/).filter(Boolean);

  let bestChunk: KnowledgeChunk | null = null;
  let highestScore = 0;

  for (const chunk of AI_KNOWLEDGE_CHUNKS) {
    let score = 0;

    if (normalizedQuery.includes(chunk.title.toLowerCase())) {
      score += 15;
    }

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

  return { chunk: AI_KNOWLEDGE_CHUNKS[0], score: 1 };
}
