export type ProjectStatus =
  | "Production Software Contract"
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
    id: "shivkush-nursery-pwa",
    slug: "shivkush-nursery-pwa",
    index: "01",
    title: "Shivkush Nursery Management System",
    subtitle: "Production bilingual agricultural commerce engine with offline PWA caching & PostgreSQL RLS",
    status: "Production Software Contract",
    statusShort: "PRODUCTION",
    year: "2025–2026",
    category: "Agro-Commerce / WebGL / PWA",
    isFlagship: true,
    summary:
      "Solo production freelance contract commissioned to design, engineer, and deploy digital commerce infrastructure for an agricultural plant nursery in Ahilyanagar, India. Features bilingual catalog discovery, offline Service Worker persistence, and an administrative stock control portal.",
    brief:
      "Solo production freelance contract commissioned to design, engineer, and deploy digital commerce infrastructure for an agricultural plant nursery in Ahilyanagar, India.",
    coreProblem:
      "Rural agricultural clients and farmers frequently operate on constrained, high-latency 2G/3G mobile networks where standard heavy e-commerce stores fail to load. The business needed guaranteed offline catalog availability, direct order submission without complex mandatory account creation, and secure administrative inventory controls.",
    problem:
      "Rural agricultural clients and farmers frequently operate on constrained, high-latency 2G/3G mobile networks where standard heavy e-commerce stores fail to load.",
    architectureHighlights: [
      "PWA Service Worker (`sw.js`) with cache-first asset caching (`CACHE_NAME = 'shivkush-v1'`) and offline fallback document routing.",
      "Supabase PostgreSQL database secured with granular Row-Level Security (RLS) policies distinguishing anonymous customer orders from authenticated admin access.",
      "Interactive 3D WebGL hero canvas built with Three.js and lightweight 2D canvas particle systems.",
      "Administrative order portal supporting live inventory status updates and 1-tap direct WhatsApp routing for customer order fulfillment.",
    ],
    architecture: [
      "PWA Service Worker (`sw.js`) with cache-first asset caching (`CACHE_NAME = 'shivkush-v1'`) and offline fallback document routing.",
      "Supabase PostgreSQL database secured with granular Row-Level Security (RLS) policies distinguishing anonymous customer orders from authenticated admin access.",
      "Interactive 3D WebGL hero canvas built with Three.js and lightweight 2D canvas particle systems.",
      "Administrative order portal supporting live inventory status updates and 1-tap direct WhatsApp routing for customer order fulfillment.",
    ],
    keyConstraints: [
      "Under-2-second Time to Interactive on low-bandwidth rural cellular networks.",
      "Zero account creation barrier: farmers submit orders seamlessly via unauthenticated RLS public inserts while admin panels remain strictly protected.",
      "Resilient cart state synchronization persisting across browser reloads without server-side session overhead.",
    ],
    challenges: [
      "Under-2-second Time to Interactive on low-bandwidth rural cellular networks.",
      "Zero account creation barrier: farmers submit orders seamlessly via unauthenticated RLS public inserts while admin panels remain strictly protected.",
      "Resilient cart state synchronization persisting across browser reloads without server-side session overhead.",
    ],
    technologies: [
      "Next.js",
      "React.js",
      "Three.js",
      "WebGL",
      "Supabase",
      "PostgreSQL",
      "Row-Level Security (RLS)",
      "PWA / Service Workers",
      "Tailwind CSS",
    ],
    verificationNote:
      "Verified via production source code in `ShivkushNursery`, `setup-orders-table.sql`, `sw.js` cache definitions, and `manifest.json`. Registered client commercial contract.",
    metricsOrOutcome: "Production commercial contract serving active agricultural nursery clients with offline PWA ordering.",
    githubUrl: "https://github.com/Yashvardhan-4",
    diagramType: "shivkush-pwa",
  },
  {
    id: "pralayveer-disaster-response",
    slug: "pralayveer-disaster-response",
    index: "02",
    title: "PralayVeer — Rapid Disaster Preparedness",
    subtitle: "Emergency coordination & accessible shelter routing platform engineered for degraded networks",
    status: "National Hackathon MVP",
    statusShort: "HACKATHON MVP",
    year: "2024",
    category: "Civic Systems / Geospatial",
    isFlagship: false,
    summary:
      "Rapid-response civic emergency navigation platform engineered during the Smart India Hackathon (SIH 2024). Yashvardhan served as Lead Frontend Engineer, delivering an evaluated, working MVP within the national 24-hour competition sprint.",
    brief:
      "Rapid-response civic emergency navigation platform engineered during the Smart India Hackathon (SIH 2024). Yashvardhan served as Lead Frontend Engineer.",
    coreProblem:
      "During catastrophic natural disasters, cellular infrastructure degrades and commercial routing apps become unusable due to heavy tracking scripts and bandwidth demands. Citizens under extreme cognitive distress require instant, accessible evacuation routing and shelter coordinates.",
    problem:
      "During catastrophic natural disasters, cellular infrastructure degrades and commercial routing apps become unusable due to heavy tracking scripts and bandwidth demands.",
    architectureHighlights: [
      "Ultra-lightweight Leaflet geospatial mapping pipeline with zero heavy external telemetry or tracking scripts.",
      "High-contrast user interface strictly adhering to WCAG AA accessibility standards to ensure legibility in adverse daylight and distress conditions.",
      "Client-side asset optimization maximizing cache persistence under simulated 2G/3G network throttling.",
      "Multi-contributor Git sprint workflow with modular component separation completed within 24 hours.",
    ],
    architecture: [
      "Ultra-lightweight Leaflet geospatial mapping pipeline with zero heavy external telemetry or tracking scripts.",
      "High-contrast user interface strictly adhering to WCAG AA accessibility standards to ensure legibility in adverse daylight and distress conditions.",
      "Client-side asset optimization maximizing cache persistence under simulated 2G/3G network throttling.",
      "Multi-contributor Git sprint workflow with modular component separation completed within 24 hours.",
    ],
    keyConstraints: [
      "Strict 24-hour national hackathon timeline requiring immediate zero-defect code integration.",
      "Zero cognitive clutter: high-contrast alert hierarchy designed for non-technical citizens during emergency situations.",
    ],
    challenges: [
      "Strict 24-hour national hackathon timeline requiring immediate zero-defect code integration.",
      "Zero cognitive clutter: high-contrast alert hierarchy designed for non-technical citizens during emergency situations.",
    ],
    technologies: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "Leaflet API", "WCAG AA", "Git / GitHub"],
    verificationNote:
      "Verified via SIH 2024 national hackathon project records, `PralayVeer-main` source files, and primary resume certification.",
    metricsOrOutcome: "Evaluated functional MVP in Smart India Hackathon (SIH 2024) national sprint.",
    githubUrl: "https://github.com/Yashvardhan-4",
    diagramType: "pralayveer-geo",
  },
  {
    id: "startup-valuation-predictor",
    slug: "startup-valuation-predictor",
    index: "03",
    title: "Startup Valuation Predictor",
    subtitle: "End-to-end ML regression pipeline predicting venture capital valuations from historical funding rounds",
    status: "Machine Learning Pipeline",
    statusShort: "ML PIPELINE",
    year: "2024",
    category: "Machine Learning & Quantitative Analytics",
    isFlagship: false,
    summary:
      "End-to-end predictive machine learning regression pipeline that forecasts venture capital startup valuations using multi-round funding datasets, sector growth metrics, and cap-table variables.",
    brief:
      "End-to-end predictive machine learning regression pipeline that forecasts venture capital startup valuations using multi-round funding datasets.",
    coreProblem:
      "Early-stage venture valuations are notoriously subjective and skewed by extreme outliers in unicorn rounds. Standard naive linear models fail to capture non-linear relationships across funding stages, requiring rigorous data preprocessing and regularization.",
    problem:
      "Early-stage venture valuations are notoriously subjective and skewed by extreme outliers in unicorn rounds.",
    architectureHighlights: [
      "Automated data preprocessing pipeline with log-scaling for right-skewed funding valuations and sparse data imputation.",
      "Multi-model regression benchmarking with Scikit-Learn (Ridge, Lasso, Random Forest, Gradient Boosting) utilizing k-fold cross-validation.",
      "Multi-variable correlation analysis across thousands of historical venture funding transactions.",
      "Exploratory distribution and residual analysis visualizations rendered with Matplotlib and Seaborn.",
    ],
    architecture: [
      "Automated data preprocessing pipeline with log-scaling for right-skewed funding valuations and sparse data imputation.",
      "Multi-model regression benchmarking with Scikit-Learn (Ridge, Lasso, Random Forest, Gradient Boosting) utilizing k-fold cross-validation.",
      "Multi-variable correlation analysis across thousands of historical venture funding transactions.",
      "Exploratory distribution and residual analysis visualizations rendered with Matplotlib and Seaborn.",
    ],
    keyConstraints: [
      "Heavy skewness in late-stage valuations mitigated through logarithmic feature transformations.",
      "Sparse multi-stage funding indicators handled via robust imputation rather than naive row deletion.",
    ],
    challenges: [
      "Heavy skewness in late-stage valuations mitigated through logarithmic feature transformations.",
      "Sparse multi-stage funding indicators handled via robust imputation rather than naive row deletion.",
    ],
    technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    verificationNote:
      "Verified via machine learning coursework records and resume documentation (Oct 2024).",
    metricsOrOutcome: "Cross-validated regression models predicting multi-stage valuation benchmarks.",
    githubUrl: "https://github.com/Yashvardhan-4",
    diagramType: "valuation-ml",
  },
  {
    id: "algorithmic-graph-engine",
    slug: "algorithmic-graph-engine",
    index: "04",
    title: "Algorithmic Graph Theory & Systems Engine",
    subtitle: "High-performance computational library and interactive network flow complexity benchmark suite",
    status: "Computational Theory & Benchmark",
    statusShort: "SYSTEMS & ALGORITHMS",
    year: "2025",
    category: "Computational Theory / C++",
    isFlagship: false,
    summary:
      "Computational systems project implementing and benchmarking core graph theory algorithms. Derived from the rigorous 12-week NPTEL IIT Madras curriculum (Score: 77/100, Elite + Silver Certificate) and competitive programming practice.",
    brief:
      "Computational systems project implementing and benchmarking core graph theory algorithms.",
    coreProblem:
      "Theoretical algorithm analysis often abstracts away real-world cache locality and constant-factor execution costs. This suite benchmarks practical execution times of classical network flow and shortest-path algorithms across dense and sparse graph topologies.",
    problem:
      "Theoretical algorithm analysis often abstracts away real-world cache locality and constant-factor execution costs.",
    architectureHighlights: [
      "Ford-Fulkerson Maximum Flow with Edmonds-Karp BFS augmenting paths running in O(V · E²) time complexity.",
      "Dijkstra's Single-Source Shortest Path utilizing optimized adjacency lists and custom min-heap priority queues in O((V + E) log V).",
      "Cycle detection and topological sorting via Kahn's algorithm and depth-first search traversal.",
      "Comparative execution benchmark harness written in C++ and TypeScript evaluating memory efficiency.",
    ],
    architecture: [
      "Ford-Fulkerson Maximum Flow with Edmonds-Karp BFS augmenting paths running in O(V · E²) time complexity.",
      "Dijkstra's Single-Source Shortest Path utilizing optimized adjacency lists and custom min-heap priority queues in O((V + E) log V).",
      "Cycle detection and topological sorting via Kahn's algorithm and depth-first search traversal.",
      "Comparative execution benchmark harness written in C++ and TypeScript evaluating memory efficiency.",
    ],
    keyConstraints: [
      "Memory-efficient adjacency list representations minimizing pointer indirection overhead.",
      "Verifiable asymptotic correctness validated against 500+ competitive programming problem patterns.",
    ],
    challenges: [
      "Memory-efficient adjacency list representations minimizing pointer indirection overhead.",
      "Verifiable asymptotic correctness validated against 500+ competitive programming problem patterns.",
    ],
    technologies: ["C++", "TypeScript", "Graph Theory", "Algorithms", "Data Structures"],
    verificationNote:
      "Verified via NPTEL IIT Madras Elite + Silver Certificate (Score: 77/100, Jan–Apr 2025) and 500+ competitive programming records (Codeforces, LeetCode, CodeChef).",
    metricsOrOutcome: "NPTEL IIT Madras Elite + Silver coursework (Score: 77/100) and competitive programming benchmark suite.",
    githubUrl: "https://github.com/Yashvardhan-4",
    diagramType: "graph-flow",
  },
];

// Backward-compatible exports for archive pages
export type Project = ProjectData;
export const projects = selectedProjects;
