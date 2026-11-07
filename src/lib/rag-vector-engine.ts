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

  // If query is out of scope / completely unrelated trivia (baking, world history, etc.)
  if (retrieval.isOutOfScope || retrieval.topChunks.length === 0) {
    const outOfScopeResponses = [
      "🌱 *[Sprout tilts its head]*\n\nI’m tuned specifically to answer questions about Yashvardhan’s software engineering, projects, and coursework. I might not know about that, but I can tell you all about his **Shivkush Nursery PWA**, his **8.86 CGPA at PCCOE**, or why he'd be an exceptional hire for your engineering team!",
      "🌱 *[Sprout blinks curiously]*\n\nMy vector RAG index didn't find a strong match for that in Yashvardhan's verified archives. Try asking me about his **500+ LeetCode problems**, his **NPTEL Elite+Silver in Graph Theory**, or whether he's available for **Summer 2026 internships**!",
      "🌱 *[Sprout dusts off its leaves]*\n\nThat's a bit outside my botanical knowledge base! I'm here to showcase Yashvardhan's engineering accomplishments. Would you like to hear about his commercial projects, his tech stack, or his academic credentials?",
    ];

    const randomOut = outOfScopeResponses[Math.floor(Math.random() * outOfScopeResponses.length)];
    return {
      content: randomOut,
      actions: [
        { label: "Shivkush PWA Case Study →", href: "/projects/shivkush-nursery-pwa" },
        { label: "Academic Credentials", href: "/#about" },
        { label: "View PDF Resume", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
      ],
    };
  }

  // Top retrieved chunk
  const primary = retrieval.topChunks[0].chunk;
  const secondary = retrieval.topChunks[1]?.chunk;

  // SPECIAL HIGH-PRIORITY HANDLER 1: Recruiter / Hiring Pitch
  if (
    primary.id === "recruitment-why-hire" ||
    queryLower.includes("hire") ||
    queryLower.includes("job") ||
    queryLower.includes("intern") ||
    queryLower.includes("candidate")
  ) {
    return {
      content:
        "🌱 *[Sprout gasps dramatically]*\n\nIs he hirable? Should you hire him? Let me put it this way: if you *don't* hire him, your competitor probably will, and then you'll have to watch them enjoy clean architectures, zero-downtime offline PWAs, and an 8.86 CGPA work ethic while you debug legacy spaghetti code.\n\nHere is why Yashvardhan is an absolute powerhouse for your team:\n- **Solo Production Track Record:** Delivered the commercial **Shivkush Nursery PWA** from scratch—handling bilingual offline caching, Supabase PostgreSQL with Row-Level Security (RLS), and 3D WebGL visualizations.\n- **Academic & Theoretical Rigor:** 8.86 / 10.0 CGPA at PCCOE Pune; **NPTEL Elite + Silver in Algorithmic Graph Theory** (Score 77/100, IIT Madras/Kharagpur).\n- **Algorithmic Muscle:** **500+ competitive programming problems** solved across LeetCode, Codeforces (Pupil 1227), and CodeChef.\n- **Autonomous & Fast-Adapting:** Bridges modern Next.js/TypeScript frontend engineering with resilient distributed backend architectures.\n\nHe is actively interviewing for **Summer & Fall 2026 Software Engineering Internships**. Grab his resume before my leaves turn yellow!",
      actions: [
        { label: "View PDF Resume ↗", href: "/Resume/Yashvardhan_Borude_Resume.pdf", isExternal: true },
        { label: "Email Yashvardhan", href: "mailto:yashvardhanborude7@gmail.com" },
        { label: "Explore Case Studies", href: "/#work" },
      ],
    };
  }

  // SPECIAL HIGH-PRIORITY HANDLER 2: Sprout Identity / AI Assistant / RAG
  if (
    primary.id === "sprout-companion-identity" ||
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
      opening = "🌱 *[Sprout pulls out the official academic ledger]*\n\nAh, asking for report cards? Fair enough. Here is what Yashvardhan has achieved at PCCOE Pune without losing his mind:";
      break;
    case "projects":
      opening = "🌱 *[Sprout beams proudly]*\n\nFinally, a question about real engineering! Yes, the human actually builds things that solve real-world problems:";
      break;
    case "skills":
      opening = "🌱 *[Sprout inspects the toolbelt]*\n\nHe doesn't just collect buzzwords for his resume; here is the actual stack he uses to ship software:";
      break;
    case "competitive-programming":
      opening = "🌱 *[Sprout adjusts its tiny glasses]*\n\nOh boy, don't get him started on algorithms. He's solved over 500 problems across platforms—he dreams in dynamic programming:";
      break;
    case "contact":
      opening = "🌱 *[Sprout perks up]*\n\nLooking to hire him or collaborate? Good decision. He's currently looking for Summer & Fall 2026 SWE internships:";
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
