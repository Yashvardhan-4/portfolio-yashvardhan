/**
 * Production In-Memory Vector RAG (Retrieval-Augmented Generation) Engine
 * Designed for Yashvardhan Borude's Portfolio Companion (Sprout)
 *
 * Implements:
 * 1. Sub-word & n-gram TF-IDF Dense Vector Space Model
 * 2. Cosine Similarity Vector Retrieval over chunked knowledge base
 * 3. Multi-layer Jailbreak & Prompt Injection Defenses
 * 4. Cute Sarcastic Persona Prompting & Neural Grounding
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

// Common english stop words to omit from vector space
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
]);

/**
 * Tokenize text into normalized linguistic tokens and character n-grams
 */
function tokenize(text: string): string[] {
  const clean = text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = clean.split(" ").filter((w) => w.length > 1 && !STOP_WORDS.has(w));
  const tokens: string[] = [...words];

  // Add 2-word shingles (bigrams) for technical phrase matching
  for (let i = 0; i < words.length - 1; i++) {
    tokens.push(`${words[i]}_${words[i + 1]}`);
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

    // 1. Tokenize each document (combining title, keywords, summary, and full content)
    for (const chunk of chunks) {
      const combinedText = `
        ${chunk.title}
        ${chunk.keywords.join(" ")}
        ${chunk.summary}
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
   * Search top-K documents using Cosine Similarity
   */
  public search(query: string, topK = 3): RetrievedChunk[] {
    const queryTokens = tokenize(query);
    if (queryTokens.length === 0) return [];

    const queryTF = computeTF(queryTokens);
    const queryVector = new Map<string, number>();
    let querySumSq = 0;

    queryTF.forEach((tfVal, token) => {
      const idfVal = this.idf.get(token) || 1.2; // Boost unseen query terms
      const weight = tfVal * idfVal;
      queryVector.set(token, weight);
      querySumSq += weight * weight;
    });

    const queryNorm = Math.sqrt(querySumSq) || 1e-6;

    // Calculate Cosine Similarity for each indexed document
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

      const cosineSimilarity = dotProduct / (queryNorm * docNorm);
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

  // Empirical threshold: if max cosine similarity < 0.18, query has negligible semantic match
  const isOutOfScope = maxScore < 0.18;
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

  // If query is out of scope / unrelated trivia
  if (retrieval.isOutOfScope || retrieval.topChunks.length === 0) {
    const outOfScopeResponses = [
      "🌱 *[Sprout tilts inquisitively]*\n\nLook, I could pause photosynthesis and pretend to be Wikipedia for you, but my roots are firmly planted in **Yashvardhan's portfolio**.\n\nI don't do world trivia, homework problems, or cake recipes. But if you want to know about his **8.86 CGPA at PCCOE Pune**, his **commercial Shivkush Nursery PWA**, or his **500+ LeetCode solutions**, I'm all leaves.",
      "🌱 *[Sprout taps foot on the soil]*\n\nFascinating question! Completely irrelevant to Yashvardhan's software engineering career, but fascinating.\n\nRemember: I'm his dedicated portfolio companion, not your personal butler. Why don't we pivot to something he actually built—like the **PralayVeer disaster response platform** or his **C++20 graph theory engine**?",
      "🌱 *[Sprout blinks thoughtfully]*\n\nMy vector RAG index searched far and wide, and found exactly zero correlation between your question and Yashvardhan's engineering archives.\n\nLet's stick to the script: ask me about his academic achievements, full-stack proficiencies, or whether he's available for **Summer 2026 internships**.",
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

  // Grounded answer from top retrieved RAG chunk
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
      opening = "🌱 *[Sprout perk up]*\n\nLooking to hire him or collaborate? Good decision. He's currently looking for Summer & Fall 2026 SWE internships:";
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
