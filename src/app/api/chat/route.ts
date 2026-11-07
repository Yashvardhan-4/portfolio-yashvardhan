import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { AI_KNOWLEDGE_CHUNKS, classifyIntentAndSynthesize } from "@/data/ai-knowledge";

export const runtime = "nodejs";

// --- Rate Limiting & Abuse Prevention Engine ---
interface RateLimitRecord {
  count: number;
  windowStart: number;
  lastTime: number;
}

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 12; // 12 questions per minute per IP
const MIN_REQUEST_INTERVAL_MS = 800; // 800ms anti-burst throttle

const ipRateLimits = new Map<string, RateLimitRecord>();

function cleanOldRateLimits() {
  const now = Date.now();
  ipRateLimits.forEach((record, ip) => {
    if (now - record.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
      ipRateLimits.delete(ip);
    }
  });
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0].trim();
    if (firstIp) return firstIp;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

function checkRateLimit(ip: string): { allowed: boolean; reason?: string } {
  const now = Date.now();

  // Periodically purge old records
  if (ipRateLimits.size > 2000 || Math.random() < 0.05) {
    cleanOldRateLimits();
  }

  let record = ipRateLimits.get(ip);

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    record = { count: 1, windowStart: now, lastTime: now };
    ipRateLimits.set(ip, record);
    return { allowed: true };
  }

  // Anti-burst check
  if (now - record.lastTime < MIN_REQUEST_INTERVAL_MS) {
    return {
      allowed: false,
      reason: "Sprout is processing your previous thought. Please wait a second before sending another message.",
    };
  }

  record.lastTime = now;
  record.count += 1;

  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      reason: "Rate limit reached. Sprout is taking a short rest. Please wait a minute before asking another question.",
    };
  }

  return { allowed: true };
}

const SYSTEM_INSTRUCTION = `You are Sprout, the quiet digital companion for Yashvardhan Borude's personal portfolio.
You are warm, concise, articulate, and engineering-focused.

STRICT OPERATIONAL RULES:
1. ZERO HALLUCINATION: Only state facts that are explicitly verified in the knowledge base below. If a user asks about something outside Yashvardhan's documented public portfolio, politely and warmly clarify that it lies outside his portfolio scope.
2. ACCURATE FACTS:
   - Education: PCCOE Pune, Computer Engineering, Expected May 2028, CGPA 8.86 / 10.0 (till Sem 4).
   - NPTEL Certification: Elite + Silver in Algorithmic Graph Theory (77/100, IIT Madras/Kharagpur).
   - Competitive Programming: 500+ problems solved across LeetCode (213+), Codeforces (Pupil 1227), CodeChef (2-Star), HackerRank (5-Star Gold C++), Google BigCode 2026 Top 1500.
   - Commercial Project: Shivkush Hi-Tech Nursery (Next.js, Three.js, Supabase PostgreSQL with RLS, offline PWA with service workers).
   - Hackathon: PralayVeer (SIH 2024 Finalist, accessible low-bandwidth disaster response).
   - Other Projects: Early-Stage Startup Valuation Predictor (ML), Algorithmic Graph Theory & Benchmark Engine (C++20).
3. TONE & PERSONALITY:
   - Friendly but not childish; premium and editorial; never corporate or robotic.
   - Keep answers readable and concise (2 to 4 sentences or structured brief bullet points).
   - Never output generic robotic labels or fake sci-fi telemetry status pills.
4. ACTIONS: When relevant, suggest exploring his Shivkush PWA case study, viewing his verified PDF resume, or reaching out directly.

KNOWLEDGE BASE:
${JSON.stringify(AI_KNOWLEDGE_CHUNKS, null, 2)}
`;

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting & Anti-Abuse
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(clientIp);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: rateCheck.reason || "Rate limit reached. Please wait a minute." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    // 2. Payload Validation & Sanitization
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "A message string is required." }, { status: 400 });
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
    }

    if (trimmedMessage.length > 500) {
      return NextResponse.json(
        { error: "Message is too long. Please keep your question under 500 characters." },
        { status: 400 }
      );
    }

    // 3. High-Precision Semantic Intent Synthesis
    const semanticResult = classifyIntentAndSynthesize(trimmedMessage);
    const { content: fallbackContent, reasoningSteps, actions } = semanticResult;

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    // 4. Live Gemini 2.5 Flash Streaming Mode if GEMINI_API_KEY is available
    if (apiKey && apiKey.length > 10) {
      try {
        const ai = new GoogleGenAI({ apiKey });

        const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (
              (item.role === "user" || item.role === "model") &&
              typeof item.content === "string" &&
              item.content.length <= 1000
            ) {
              contents.push({
                role: item.role,
                parts: [{ text: item.content }],
              });
            }
          }
        }

        contents.push({
          role: "user",
          parts: [{ text: trimmedMessage }],
        });

        const responseStream = await ai.models.generateContentStream({
          model: "gemini-2.5-flash",
          contents: contents as any,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.35,
            maxOutputTokens: 600,
          },
        });

        const encoder = new TextEncoder();
        const readable = new ReadableStream({
          async start(controller) {
            try {
              // Send reasoning trace header first (quietly parsed by client)
              const reasoningPayload = `__REASONING__${JSON.stringify(reasoningSteps)}\n\n`;
              controller.enqueue(encoder.encode(reasoningPayload));

              for await (const chunk of responseStream) {
                const text = chunk.text;
                if (text) {
                  controller.enqueue(encoder.encode(text));
                }
              }

              // Append action metadata delimiter
              const metadataPayload = `\n\n__METADATA__${JSON.stringify({ actions })}`;
              controller.enqueue(encoder.encode(metadataPayload));
            } catch (streamErr) {
              console.error("Gemini stream error:", streamErr);
            } finally {
              controller.close();
            }
          },
        });

        return new Response(readable, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });
      } catch (geminiError) {
        console.warn("Gemini API connection fallback to semantic reasoning engine:", geminiError);
        // Fall through to deterministic semantic stream
      }
    }

    // 5. High-Precision Zero-Latency Semantic Streaming Mode
    // Natural token streaming with live quiet reasoning trace and exact question answers
    const encoder = new TextEncoder();
    const words = fallbackContent.split(" ");

    const readable = new ReadableStream({
      async start(controller) {
        // First emit quiet reasoning trace
        const reasoningPayload = `__REASONING__${JSON.stringify(reasoningSteps)}\n\n`;
        controller.enqueue(encoder.encode(reasoningPayload));

        // Stream synthesized semantic content word by word
        for (let i = 0; i < words.length; i++) {
          const chunk = (i === 0 ? "" : " ") + words[i];
          controller.enqueue(encoder.encode(chunk));

          // Natural typographic stream pacing
          if (words[i].endsWith(".") || words[i].endsWith(":") || words[i].includes("\n")) {
            await new Promise((resolve) => setTimeout(resolve, 32));
          } else {
            await new Promise((resolve) => setTimeout(resolve, 14));
          }
        }

        // Emit actions metadata payload
        const metadataPayload = `\n\n__METADATA__${JSON.stringify({ actions })}`;
        controller.enqueue(encoder.encode(metadataPayload));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Sprout AI Chat Error:", error);
    return NextResponse.json(
      { error: "Sprout encountered a temporary hiccup. Please try again." },
      { status: 500 }
    );
  }
}
