export interface ProfileData {
  name: string;
  legalName: string;
  headline: string;
  subheadline: string;
  location: string;
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
    degree: string;
    specialization: string;
    cgpa: string;
    standing: string;
    timeline: string;
    coursework: string[];
  };
  certifications: {
    title: string;
    issuer: string;
    timeline: string;
    score: string;
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
  headline: "Full Stack Software Engineer & Competitive Programmer",
  subheadline:
    "Undergraduate engineer at PCCOE Pune combining high-performance web systems, production PostgreSQL architectures, and algorithmic rigor.",
  location: "Pune, Maharashtra, India",
  email: "yashvardhanborude7@gmail.com",
  phone: "+91-7058230773",
  github: "https://github.com/Yashvardhan-4",
  linkedin: "https://linkedin.com/in/yashvardhan-borude",
  leetcode: "https://leetcode.com/u/yashvardhan_4/",
  codeforces: "https://codeforces.com/profile/yashvardhan_4",
  codechef: "https://www.codechef.com/users/yashvardhan_4",
  hackerrank: "https://www.hackerrank.com/profile/yashvardhanborude",
  education: {
    institution: "Pimpri Chinchwad College of Engineering (PCCOE)",
    degree: "Bachelor of Technology",
    specialization: "Computer Engineering",
    cgpa: "8.86 / 10.0 (Till Semester 4)",
    standing: "Third Year (Semester 5)",
    timeline: "Expected May 2028",
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Object-Oriented Programming",
      "Operating Systems",
      "Computer Networks",
      "Machine Learning",
      "Generative AI",
    ],
  },
  certifications: [
    {
      title: "Algorithmic Graph Theory & Data Structures",
      issuer: "NPTEL (IIT Madras / Kharagpur)",
      timeline: "Jan 2025 – Apr 2025",
      score: "77/100 (Elite + Silver Certificate, Top Tier)",
      topics: [
        "Graph Traversals (BFS/DFS)",
        "Shortest Paths (Dijkstra, Bellman-Ford)",
        "Ford-Fulkerson Maximum Flow",
        "Bipartite Matching & Network Flow",
        "Eulerian / Hamiltonian Paths",
        "NP-Completeness Reductions",
      ],
    },
  ],
  competitiveProgramming: {
    totalSolved: "500+",
    bigCodeRank: "Global Top 1,500 (Google BigCode 2026)",
    platforms: [
      {
        name: "LeetCode",
        handle: "yashvardhan_4",
        ratingOrStatus: "213+ Solved",
        solved: "Specialized in Trees, Dynamic Programming, and Graph algorithms",
        url: "https://leetcode.com/u/yashvardhan_4/",
      },
      {
        name: "Codeforces",
        handle: "yashvardhan_4",
        ratingOrStatus: "Pupil (Max 1227)",
        solved: "200+ Competitive algorithmic problems solved",
        url: "https://codeforces.com/profile/yashvardhan_4",
      },
      {
        name: "CodeChef",
        handle: "yashvardhan_4",
        ratingOrStatus: "2-Star (Peak 1434)",
        solved: "Active contest participant",
        url: "https://www.codechef.com/users/yashvardhan_4",
      },
      {
        name: "HackerRank",
        handle: "yashvardhanborude",
        ratingOrStatus: "5-Star Gold in C++",
        solved: "Object-oriented programming and core algorithmic mechanics",
        url: "https://www.hackerrank.com/profile/yashvardhanborude",
      },
    ],
  },
  experience: [
    {
      company: "Shivkush Hi-Tech Nursery",
      role: "Full Stack Software Developer",
      type: "Paid Freelance Contract",
      period: "Dec 2025 – May 2026",
      location: "Ahilyanagar, India",
      highlights: [
        "Architected and deployed a production bilingual (English/Marathi) e-commerce PWA from scratch, serving active agricultural clients with end-to-end catalog browsing, shopping cart state persistence, and real-time order scheduling.",
        "Engineered interactive 3D WebGL hero canvas using Three.js and dynamic particle systems via Canvas API; achieved 100% Lighthouse PWA audit rating with offline service worker caching and direct mobile installation.",
        "Constructed secure backend architecture on Supabase (PostgreSQL) enforcing granular Row-Level Security (RLS) policies; built responsive administrative portal providing real-time inventory management, stock threshold alerts, and revenue metrics.",
        "Integrated automated customer acquisition tools including 1-tap WhatsApp ordering, dynamic CMS-driven emergency notice ticker, and OpenGraph/Twitter Card metadata, boosting organic mobile discovery and zeroing order routing friction.",
      ],
      tags: ["React.js", "Next.js", "Three.js", "WebGL", "Supabase", "PostgreSQL", "RLS", "PWA"],
    },
    {
      company: "Smart India Hackathon (SIH 2024)",
      role: "Lead Frontend Engineer — PralayVeer",
      type: "National Hackathon Finalist",
      period: "Aug 2024",
      location: "India",
      highlights: [
        "Architected rapid-response front-end disaster preparedness platform engineered specifically for low-bandwidth networks and high-stress emergency communication.",
        "Designed high-contrast, accessible UI adhering to WCAG standards for non-technical citizens navigating critical evacuation alerts and emergency shelter locators.",
        "Led collaborative multi-contributor Git/GitHub sprint workflow, executing code reviews, component modularization, and delivering a functional, judge-evaluated MVP within the 24-hour hackathon deadline.",
      ],
      tags: ["React.js", "JavaScript", "Tailwind CSS", "Leaflet API", "Git", "WCAG AA"],
    },
  ],
  skills: [
    {
      category: "Languages",
      description: "Core programming and query languages used in daily development",
      items: ["C++", "TypeScript", "JavaScript (ES6+)", "Python", "SQL (PostgreSQL)", "HTML5", "CSS3"],
    },
    {
      category: "Frontend & Interfaces",
      description: "Modern client architectures, graphics rendering, and reactive state",
      items: ["Next.js (App Router)", "React.js", "Three.js", "WebGL", "Canvas API", "Tailwind CSS", "Progressive Web Apps (PWAs)"],
    },
    {
      category: "Backend & Systems",
      description: "Resilient server engines, relational databases, and authorization layers",
      items: ["Node.js", "Express.js", "PostgreSQL", "Supabase", "Row-Level Security (RLS)", "MongoDB", "REST APIs", "Service Workers"],
    },
    {
      category: "Tools & DevOps",
      description: "Version control, container basics, testing, and deployment workflows",
      items: ["Git", "GitHub", "Linux / Bash", "Docker (Basics)", "Postman", "Figma", "Vercel", "CI/CD Workflows"],
    },
    {
      category: "Core Computer Science",
      description: "Foundational theory and algorithmic problem-solving",
      items: ["Data Structures & Algorithms (DSA)", "Graph Theory", "Object-Oriented Programming (OOP)", "Database Management Systems (DBMS)", "Operating Systems"],
    },
  ],
};
