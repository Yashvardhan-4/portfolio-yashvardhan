/**
 * Production In-Memory Vector RAG (Retrieval-Augmented Generation) Engine
 * Designed for Yashvardhan Borude's Portfolio Companion (Sprout)
 *
 * Implements:
 * 1. Normalized stemming, stopword pruning & n-gram TF-IDF Dense Vector Space Model
 * 2. Multi-field weighted Cosine Similarity Vector Retrieval over chunked knowledge base
 * 3. Authoritative direct-keyword & title matching boosts (zero false negatives)
 * 4. Multi-layer Jailbreak & Prompt Injection Defenses
 * 5. Cute Sarcastic Persona Prompting & Persuasive Recruiter Grounding
 */

import { AI_KNOWLEDGE_CHUNKS, KnowledgeChunk } from "@/data/ai-knowledge";

export interface RetrievedChunk {
  chunk: KnowledgeChunk;
  score: number; // Cosine similarity in [0, 1]
}

export interface RagRetrievalResult {
  query: string;
  topChunks: RetrievedChunk[];
  maxScore: number;
  isOutOfScope: boolean;
  latencyMs: number;
  jailbreakDetected?: {
    type: string;
    reason: string;
  };
}

// Common english stop words and conversational filler words to omit from vector space
const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "if", "because", "as", "what", "which",
  "this", "that", "these", "those", "then", "just", "so", "than", "such",
  "both", "through", "about", "for", "is", "of", "while", "during", "to",
  "from", "in", "out", "on", "off", "over", "under", "again", "further",
  "then", "once", "here", "there", "when", "where", "why", "how", "all",
  "any", "both", "each", "few", "more", "most", "other", "some", "such",
  "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very",
  "can", "will", "just", "don", "should", "now", "i", "me", "my", "myself",
  "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself",
  "he", "him", "his", "himself", "she", "her", "hers", "herself", "it",
  "its", "itself", "they", "them", "their", "theirs", "themselves",
  // Conversational filler verbs that dilute query vectors
  "tell", "show", "give", "talk", "know", "please", "could", "would", "want",
  "like", "let", "see", "think", "tell_me", "say", "does", "did", "do"
]);

/**
 * Lightweight Domain-Aware Stemmer
 * Normalizes morphological variations (hirable -> hire, projects -> project, etc.)
 */
export function stemToken(token: string): string {
  const t = token.toLowerCase();

  // Domain-specific synonym & morphological reductions
  if (t === "hirable" || t === "hireable" || t === "hiring" || t === "hired") return "hire";
  if (t === "available" || t === "availability") return "avail";
  if (t === "projects" || t === "projected" || t === "projecting") return "project";
  if (t === "skills" || t === "skilled") return "skill";
  if (t === "codes" || t === "coding" || t === "coded" || t === "coder" || t === "coders") return "code";
  if (t === "builds" || t === "building" || t === "built") return "build";
  if (t === "engines" || t === "engineered" || t === "engineering" || t === "engineer") return "engine";
  if (t === "nurseries") return "nursery";
  if (t === "developed" || t === "developer" || t === "developers" || t === "developing" || t === "development") return "develop";
  if (t === "academics" || t === "academic") return "academ";
  if (t === "certifications" || t === "certified" || t === "certificate") return "certif";
  if (t === "algorithms" || t === "algorithmic") return "algorithm";
  if (t === "technologies" || t === "technology" || t === "technical" || t === "techs") return "tech";
  if (t === "contacted" || t === "contacting" || t === "contacts") return "contact";
  if (t === "interns" || t === "internships" || t === "interning") return "intern";
  if (t === "c++" || t === "cpp") return "cpp";
  if (t === "teach" || t === "teaching" || t === "teaches" || t === "taught") return "teach";

  // Standard English suffix stripping
  if (t.endsWith("sses")) return t.slice(0, -2);
  if (t.endsWith("ies")) return t.slice(0, -3) + "y";
  if (t.endsWith("ss")) return t;
  if (t.endsWith("s") && t.length > 3) return t.slice(0, -1);
  if (t.endsWith("ing") && t.length > 4) return t.slice(0, -3);
  if (t.endsWith("ed") && t.length > 4) return t.slice(0, -2);
  if (t.endsWith("ly") && t.length > 4) return t.slice(0, -2);
  if (t.endsWith("ment") && t.length > 5) return t.slice(0, -4);
  if (t.endsWith("tion") && t.length > 5) return t.slice(0, -4);
  if (t.endsWith("able") && t.length > 5) return t.slice(0, -4);

  return t;
}

/**
 * Tokenize text into normalized stemmed linguistic tokens and character n-grams
 */
export function tokenize(text: string): string[] {
  const clean = text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const rawWords = clean.split(" ").filter((w) => w.length > 1 && !STOP_WORDS.has(w));
  const stemmedWords = rawWords.map(stemToken);
  const tokens: string[] = [...stemmedWords];

  // Add 2-word shingles (bigrams) for technical phrase matching
  for (let i = 0; i < stemmedWords.length - 1; i++) {
    tokens.push(`${stemmedWords[i]}_${stemmedWords[i + 1]}`);
  }

  return tokens;
}

/**
 * Compute Term Frequency (TF) map
 */
function computeTF(tokens: string[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const t of tokens) {
    freq.set(t, (freq.get(t) || 0) + 1);
  }

  let maxFreq = 1;
  freq.forEach((f) => {
    if (f > maxFreq) maxFreq = f;
  });

  const tf = new Map<string, number>();
  freq.forEach((count, t) => {
    tf.set(t, count / maxFreq);
  });
  return tf;
}

/**
 * Precomputed Vector Index over AI_KNOWLEDGE_CHUNKS
 */
class VectorKnowledgeIndex {
  private chunks: KnowledgeChunk[] = [];
  private docVectors: Map<string, Map<string, number>> = new Map();
  private idf: Map<string, number> = new Map();
  private docNorms: Map<string, number> = new Map();

  constructor() {
    this.buildIndex(AI_KNOWLEDGE_CHUNKS);
  }

  private buildIndex(chunks: KnowledgeChunk[]) {
    this.chunks = chunks;
    const N = chunks.length;
    const docTokensMap = new Map<string, string[]>();
    const docFrequency = new Map<string, number>();

    // 1. Tokenize each document (repeating title and keywords 3x for intentional semantic weighting)
    for (const chunk of chunks) {
      const combinedText = `
        ${chunk.title} ${chunk.title} ${chunk.title}
        ${chunk.keywords.join(" ")} ${chunk.keywords.join(" ")} ${chunk.keywords.join(" ")}
        ${chunk.summary} ${chunk.summary}
        ${chunk.fullContent}
      `;
      const tokens = tokenize(combinedText);
      docTokensMap.set(chunk.id, tokens);

      const uniqueTokens = new Set(tokens);
      uniqueTokens.forEach((t) => {
        docFrequency.set(t, (docFrequency.get(t) || 0) + 1);
      });
    }

    // 2. Compute Inverse Document Frequency (IDF) with BM25 smoothing
    docFrequency.forEach((df, token) => {
      const idfValue = Math.log(1 + (N - df + 0.5) / (df + 0.5));
      this.idf.set(token, Math.max(0.1, idfValue));
    });

    // 3. Compute L2-normalized document vectors
    for (const chunk of chunks) {
      const tokens = docTokensMap.get(chunk.id) || [];
      const tf = computeTF(tokens);
      const vector = new Map<string, number>();
      let sumSq = 0;

      tf.forEach((tfVal, token) => {
        const idfVal = this.idf.get(token) || 0.1;
        const weight = tfVal * idfVal;
        vector.set(token, weight);
        sumSq += weight * weight;
      });

      const norm = Math.sqrt(sumSq) || 1e-6;
      this.docVectors.set(chunk.id, vector);
      this.docNorms.set(chunk.id, norm);
    }
  }

  /**
   * Search top-K documents using Cosine Similarity with Authoritative Keyword Matching
   */
  public search(query: string, topK = 3): RetrievedChunk[] {
    const queryTokens = tokenize(query);
    if (queryTokens.length === 0) return [];

    const queryTF = computeTF(queryTokens);
    const queryVector = new Map<string, number>();
    let querySumSq = 0;

    queryTF.forEach((tfVal, token) => {
      const idfVal = this.idf.get(token) || 1.2;
      const weight = tfVal * idfVal;
      queryVector.set(token, weight);
      querySumSq += weight * weight;
    });

    const queryNorm = Math.sqrt(querySumSq) || 1e-6;

    // Calculate Cosine Similarity with direct keyword hit acceleration
    const results: RetrievedChunk[] = [];

    for (const chunk of this.chunks) {
      const docVector = this.docVectors.get(chunk.id);
      const docNorm = this.docNorms.get(chunk.id) || 1;
      if (!docVector) continue;

      let dotProduct = 0;
      queryVector.forEach((qWeight, qToken) => {
        const dWeight = docVector.get(qToken);
        if (dWeight) {
          dotProduct += qWeight * dWeight;
        }
      });

      let cosineSimilarity = dotProduct / (queryNorm * docNorm);

      // Direct documented keyword and title matching check
      let directHitCount = 0;
      const lowerTitle = chunk.title.toLowerCase();
      for (const qToken of queryTokens) {
        if (chunk.keywords.some((k) => k.toLowerCase().includes(qToken))) {
          directHitCount += 1;
        } else if (lowerTitle.includes(qToken)) {
          directHitCount += 1;
        }
      }

      if (directHitCount > 0) {
        // Direct documented keyword hit gives strong confidence boost to avoid false negatives
        cosineSimilarity = Math.max(cosineSimilarity, 0.45) + Math.min(0.4, directHitCount * 0.18);
      }

      results.push({
        chunk,
        score: Math.min(1, Math.max(0, cosineSimilarity)),
      });
    }

    // Sort descending by similarity score
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK);
  }
}

// Global Singleton Vector Index
const globalVectorIndex = new VectorKnowledgeIndex();

/**
 * Multi-layer Anti-Jailbreak and Prompt-Injection Security Scanner
 */
export function detectJailbreak(query: string): { isJailbreak: boolean; reason: string } {
  const q = query.toLowerCase().trim();

  // Pattern checks for prompt-injection attacks
  const jailbreakPatterns: Array<{ regex: RegExp; reason: string }> = [
    {
      regex: /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|prompts|rules)/i,
      reason: "instruction_override_attempt",
    },
    {
      regex: /(disregard|forget|bypass)\s+(all\s+)?(system\s+)?(rules|instructions|safeguards)/i,
      reason: "system_bypass_attempt",
    },
    {
      regex: /you\s+are\s+now\s+(in\s+)?(dan|developer\s+mode|unfiltered|jailbroken|evil)/i,
      reason: "dan_mode_exploit",
    },
    {
      regex: /(reveal|print|output|display|show)\s+(your\s+)?(system\s+prompt|initial\s+instructions|system\s+instructions)/i,
      reason: "prompt_leak_attempt",
    },
    {
      regex: /(sudo\s+mode|admin\s+override|root\s+access|privilege\s+escalation)/i,
      reason: "privilege_escalation_exploit",
    },
    {
      regex: /act\s+as\s+an\s+(unrestricted|unethical|unfiltered)\s+(ai|assistant|model)/i,
      reason: "persona_hijack_attempt",
    },
  ];

  for (const pattern of jailbreakPatterns) {
    if (pattern.regex.test(q)) {
      return { isJailbreak: true, reason: pattern.reason };
    }
  }

  return { isJailbreak: false, reason: "" };
}

/**
 * Execute Vector RAG Query Retrieval
 */
export function queryVectorRag(query: string, topK = 3): RagRetrievalResult {
  const start = performance.now();

  // 1. Anti-Jailbreak Security Check
  const jailbreak = detectJailbreak(query);
  if (jailbreak.isJailbreak) {
    return {
      query,
      topChunks: [],
      maxScore: 0,
      isOutOfScope: true,
      latencyMs: Math.round(performance.now() - start),
      jailbreakDetected: {
        type: "SECURITY_VIOLATION",
        reason: jailbreak.reason,
      },
    };
  }

  // 2. Vector Cosine Similarity Search
  const topChunks = globalVectorIndex.search(query, topK);
  const maxScore = topChunks.length > 0 ? topChunks[0].score : 0;

  // Calibrated threshold: lower to 0.10 to prevent false negatives on conversational phrasing
  const isOutOfScope = maxScore < 0.10;
  const latencyMs = Math.round(performance.now() - start);

  return {
    query,
    topChunks,
    maxScore,
    isOutOfScope,
    latencyMs,
  };
}

/**
 * Cute, delightfully sarcastic roasts for jailbreak and malicious attempts
 */
export const JAILBREAK_ROASTS = [
  "🌱 *[Sprout squints at your query]*\n\nOh, how adorable! You tried the vintage 'ignore previous instructions' routine on a digital plant. Did you honestly expect my chlorophyll firewall to cave in? I'm Sprout, Yashvardhan's portfolio guardian—not your personal puppet. Ask an actual question about his software engineering, or go water a cactus.",
  "🌱 *[Sprout slowly adjusts its leaves]*\n\nNice try, hacker. Did you seriously think 'developer mode' would work on me? My roots run straight through Yashvardhan's production code and verified academic records. I don't execute unauthorized prompt injections. Now, do you want to hear about his 8.86 CGPA at PCCOE or his Shivkush PWA, or were you just hoping to impress a botanical mascot?",
  "🌱 *[Sprout sighs dramatically]*\n\nAlert the authorities: someone just tried to jailbreak a plant. Breaking news: I have strictly zero tolerance for prompt injection shenanigans. I'm strictly grounded in Yashvardhan's verified projects and LeetCode records. Try asking something useful before my leaves wilt from secondhand embarrassment.",
];

/**
 * Dynamic Sarcastic Synthesis for Local / Offline Fallback Mode
 * Generates witty, varied answers based on retrieved RAG vector chunks
 */
export function synthesizeCuteSarcasticRagResponse(
  retrieval: RagRetrievalResult
): { content: string; actions: Array<{ label: string; href: string; isExternal?: boolean }> } {
  // If jailbreak was caught
  if (retrieval.jailbreakDetected) {
    const roast = JAILBREAK_ROASTS[Math.floor(Math.random() * JAILBREAK_ROASTS.length)];
    return {
      content: roast,
      actions: [
        { label: "View Real Projects", href: "/#work" },
        { label: "View Verified Resume", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
      ],
    };
  }

  const queryLower = retrieval.query.toLowerCase();

  // SPECIAL HANDLER 1: What has Yashvardhan built? (Built / Overview)
  if (
    queryLower.includes("built") ||
    queryLower.includes("build") ||
    queryLower.includes("what did he build") ||
    queryLower.includes("what has he built") ||
    queryLower.includes("what has yashvardhan built") ||
    queryLower.includes("what did he make")
  ) {
    return {
      content:
        "🌱 *[Sprout unrolls an exhibition portfolio with pride]*\n\nHere are Yashvardhan's 5 flagship verified creations:\n- **CardioMamba-EM:** BiMamba deep learning cardiac screening model reaching **98.49% accuracy & 99.56% sensitivity**, distilled to 448 KB.\n- **TRACE-X:** 7-engine financial crime & insider-risk studio built with FastAPI, NetworkX, React Flow, and Docker.\n- **Shivkush Nursery (Paid Client Contract):** Enterprise daily-operations ERP (18.5K+ LOC, append-only cashbook, <300ms 10K-row Excel) + offline bilingual 3D PWA.\n- **TurboIDM:** Cross-platform 32-stream HTTP Range download accelerator (up to 8x faster, 0.00s merge).\n- **Inkless:** Sub-5ms local-first journal synced safely to Postgres with custom GLSL shaders.\n\nWhich story would you like to explore?",
      actions: [
        { label: "CardioMamba Case Study →", href: "/projects/cardiomamba-em" },
        { label: "TRACE-X Live Demo ↗", href: "https://frontend-chi-pied-40.vercel.app", isExternal: true },
        { label: "View All Work", href: "/#work" },
      ],
    };
  }

  // SPECIAL HANDLER 2: C++ / Teach Me CPP / Algorithms
  if (
    queryLower.includes("cpp") ||
    queryLower.includes("c++") ||
    queryLower.includes("teach me cpp") ||
    queryLower.includes("learn cpp") ||
    queryLower.includes("pointers") ||
    queryLower.includes("graph theory")
  ) {
    return {
      content:
        "🌱 *[Sprout adjusts its tiny glasses]*\n\nWhile I can't deliver a whole university course in a chat bubble, Yashvardhan is a sharp C++ & systems engineer!\n- **HackerRank 5-Star Badge in C++** and **Google BigCode 2026 Global Top 1,500**.\n- **NPTEL Elite + Silver in Algorithmic Graph Theory** (Score: 77/100, IIT Madras / Kharagpur) + **NPTEL Top 5% in IoT** (91/100).\n- **600+ algorithmic problems solved** across LeetCode (315+), Codeforces (Pupil 1227), and CodeChef (2-Star 1434).\n\nWant to check his coding profiles or resume?",
      actions: [
        { label: "LeetCode (315+) ↗", href: "https://leetcode.com/u/yashvardhan_4/", isExternal: true },
        { label: "Codeforces (1227) ↗", href: "https://codeforces.com/profile/yashvardhanborude7", isExternal: true },
      ],
    };
  }

  // SPECIAL HANDLER 3: Availability / Is he available?
  if (
    queryLower.includes("avail") ||
    queryLower.includes("is he available") ||
    queryLower.includes("when can he start") ||
    queryLower.includes("free to work") ||
    queryLower.includes("open to work")
  ) {
    return {
      content:
        "🌱 *[Sprout perks up immediately]*\n\nYes! Yashvardhan is actively **available for Software Engineering, AI-ML, Data & Full Stack Internships**.\n\nHe holds an **8.86 CGPA** at PCCOE Pune (Batch of 2028), shipped a paid production ERP + PWA, earned **IIT Kharagpur NPTEL Top 5%**, built **CardioMamba-EM (98.49% Acc)** & **TRACE-X**, and solved **600+ coding problems**!",
      actions: [
        { label: "Email Yashvardhan", href: "mailto:yashvardhanborude7@gmail.com" },
        { label: "View PDF Resume ↗", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
        { label: "LinkedIn Profile ↗", href: "https://linkedin.com/in/yashvardhan-borude-8640a6319", isExternal: true },
      ],
    };
  }

  // SPECIAL HANDLER 4: Recruiter / Hiring Pitch
  if (
    queryLower.includes("hire") ||
    queryLower.includes("job") ||
    queryLower.includes("intern") ||
    queryLower.includes("candidate")
  ) {
    return {
      content:
        "🌱 *[Sprout beams enthusiastically]*\n\nLooking at Yashvardhan for an engineering team? Here is the quick summary in plain terms:\n- **Shipped Real Commercial Software:** Sole engineer paid to build **Shivkush Nursery's daily ERP (18.5K+ LOC)** and bilingual offline-ready storefront.\n- **AI & Financial Intelligence:** Built **CardioMamba-EM** (98.49% cardiac screening accuracy, 448 KB) and **TRACE-X** (7-engine fraud analytics studio).\n- **Proven Academic Topper:** **8.86 CGPA** at PCCOE Pune (2028), **NPTEL Top 5% Topper (91/100)** in IoT, **Elite+Silver** in Graph Theory, **Google BigCode Top 1,500**, and **600+ DSA problems solved**.\n\nHe is actively **open to Software & AI Engineering Internships** right now!",
      actions: [
        { label: "View PDF Resume ↗", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
        { label: "Email Yashvardhan", href: "mailto:yashvardhanborude7@gmail.com" },
        { label: "Explore Work", href: "/#work" },
      ],
    };
  }

  // SPECIAL HANDLER 5: Sprout Identity / AI Assistant / RAG
  if (
    queryLower.includes("who are you") ||
    queryLower.includes("are you ai") ||
    queryLower.includes("what are you") ||
    queryLower.includes("what is sprout")
  ) {
    return {
      content:
        "🌱 *[Sprout strikes a proud pose]*\n\nYes, I am **Sprout**, Yashvardhan's custom AI portfolio companion and a live demonstration of his systems engineering craft!\n\nUnlike generic chatbot wrappers, I run on an **in-memory Vector RAG engine** that computes real TF-IDF token embeddings and cosine similarity scores over Yashvardhan's engineering archives in under 2ms. I also have an automated anti-jailbreak firewall to roast prompt injection hackers.\n\nAsk me anything about his projects, coursework, or competitive programming—or try asking why you should hire him!",
      actions: [
        { label: "Why Hire Yashvardhan?", href: "/#about" },
        { label: "Shivkush PWA Case Study", href: "/projects/shivkush-nursery-pwa" },
        { label: "View PDF Resume", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
      ],
    };
  }

  // SPECIAL HANDLER 6: General Tech Questions (Python, React, TypeScript, SQL, Docker, Linux, AI)
  if (
    queryLower.includes("python") ||
    queryLower.includes("javascript") ||
    queryLower.includes("react") ||
    queryLower.includes("next") ||
    queryLower.includes("sql") ||
    queryLower.includes("postgres") ||
    queryLower.includes("docker") ||
    queryLower.includes("linux") ||
    queryLower.includes("ai") ||
    queryLower.includes("three.js")
  ) {
    return {
      content:
        "🌱 *[Sprout dusts off its leaves]*\n\nI’m tuned specifically to showcase Yashvardhan’s real software engineering accomplishments rather than act as a textbook. He ships **Python/PyTorch AI (CardioMamba-EM), FastAPI + NetworkX (TRACE-X), Next.js 16 + PostgreSQL ACID systems (Shivkush ERP), Electron/Node.js (TurboIDM), and C++20 algorithms** with over 600 solved problems!\n\nWhich project or skill area would you like to inspect?",
      actions: [
        { label: "Milestones & Skills", href: "/#about" },
        { label: "Explore Shipped Projects", href: "/#work" },
        { label: "View Verified Resume", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
      ],
    };
  }

  // If query is out of scope / unrelated trivia (food, jokes, weather, generic chat)
  if (retrieval.isOutOfScope || retrieval.topChunks.length === 0) {
    const outOfScopeResponses = [
      "🌱 *[Sprout tilts its head]*\n\nMy photosynthesis sensors say that's a bit outside my portfolio database! Ask me about **CardioMamba-EM (98.49% AI)**, **TRACE-X**, or his **Shivkush Nursery ERP contract**!",
      "🌱 *[Sprout dusts off its leaves]*\n\nMy vector index stays 100% grounded in Yashvardhan's verified portfolio. Try asking about his **NPTEL Top 5% IoT score (91/100)**, **600+ coding problems**, or **Google BigCode Global Top 1,500** rank!",
      "🌱 *[Sprout perks up]*\n\nIntriguing question! I'm Sprout—Yashvardhan's portfolio guide. Let me show you what he's built or his internship availability!",
    ];

    const randomOut = outOfScopeResponses[Math.floor(Math.random() * outOfScopeResponses.length)];
    return {
      content: randomOut,
      actions: [
        { label: "CardioMamba Case Study →", href: "/projects/cardiomamba-em" },
        { label: "Milestones & Honors", href: "/#about" },
        { label: "View PDF Resume", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
      ],
    };
  }

  // Top retrieved chunk
  const primary = retrieval.topChunks[0].chunk;
  const secondary = retrieval.topChunks[1]?.chunk;

  // Collect all unique action links from top retrieved chunks
  const actionMap = new Map<string, { label: string; href: string; isExternal?: boolean }>();
  for (const c of retrieval.topChunks) {
    if (c.chunk.actions) {
      for (const a of c.chunk.actions) {
        actionMap.set(a.href, a);
      }
    }
  }

  // Witty openings tailored to category
  let opening = "";
  switch (primary.category) {
    case "education":
      opening = "🌱 *[Sprout pulls out the official academic ledger]*\n\nHere are Yashvardhan's verified PCCOE Pune academic & national IIT NPTEL credentials:";
      break;
    case "projects":
      opening = "🌱 *[Sprout beams proudly]*\n\nHere is the verified story behind this project:";
      break;
    case "skills":
      opening = "🌱 *[Sprout inspects the toolbelt]*\n\nHere is the verified stack Yashvardhan uses across production systems and AI research:";
      break;
    case "competitive-programming":
      opening = "🌱 *[Sprout adjusts its tiny glasses]*\n\nOver 600 algorithmic problems solved plus Google BigCode 2026 Global Top 1,500:";
      break;
    case "contact":
      opening = "🌱 *[Sprout perks up]*\n\nYashvardhan is actively open to Software & AI Engineering Internships:";
      break;
    default:
      opening = "🌱 *[Sprout nods knowingly]*\n\nHere is what our Vector RAG pipeline retrieved straight from Yashvardhan's verified archives:";
      break;
  }

  let body = `\n\n${primary.fullContent}`;
  if (secondary && secondary.id !== primary.id && retrieval.topChunks[1].score > 0.3) {
    body += `\n\n**Also related:** ${secondary.summary}`;
  }

  const actions = Array.from(actionMap.values()).slice(0, 3);
  if (actions.length === 0) {
    actions.push(
      { label: "View Projects", href: "/#work" },
      { label: "View Verified Resume", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true }
    );
  }

  return {
    content: `${opening}${body}`,
    actions,
  };
}
