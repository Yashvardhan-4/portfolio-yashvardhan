import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { AI_KNOWLEDGE_CHUNKS, classifyIntentAndSynthesize } from "@/data/ai-knowledge";

export const runtime = "nodejs";

const SYSTEM_INSTRUCTION = `You are Sprout AI, the official intelligent portfolio companion for Yashvardhan Borude.
You are concise, humble, articulate, and technically sharp.

STRICT OPERATIONAL RULES:
1. ZERO HALLUCINATION: You must ONLY state facts that are explicitly verified in the knowledge base below. If a user asks about something not in the knowledge base, politely state that it is outside Yashvardhan's documented public portfolio.
2. ACCURATE ATTRIBUTION:
   - Education: PCCOE Pune, Computer Engineering, Expected May 2028, CGPA 8.86/10.0 (till Sem 4).
   - NPTEL: Elite + Silver in Algorithmic Graph Theory (77/100, IIT Madras/Kharagpur).
   - Competitive Programming: 500+ problems solved across LeetCode (213+), Codeforces (Pupil 1227), CodeChef (2-Star), HackerRank (5-Star Gold C++), Google BigCode 2026 Top 1500.
   - Commercial Project: Shivkush Hi-Tech Nursery (Next.js, Three.js, Supabase PostgreSQL with RLS, offline PWA with service workers).
   - Hackathon: PralayVeer (SIH 2024 Finalist, accessible low-bandwidth disaster response).
   - Other Projects: Early-Stage Startup Valuation Predictor (ML), Algorithmic Graph Theory & Benchmark Engine (C++20).
3. TONE: Warm, engineering-focused, concise (2-4 sentences or structured bullet points), editorial. Never use exaggerated corporate buzzwords.
4. ACTION ORIENTED: Encourage the user to explore the live case studies, view his code, or download his resume.

KNOWLEDGE BASE:
${JSON.stringify(AI_KNOWLEDGE_CHUNKS, null, 2)}
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "A message string is required." }, { status: 400 });
    }

    // 1. High-Precision Semantic Intent Synthesis
    const semanticResult = classifyIntentAndSynthesize(message);
    const { content: fallbackContent, reasoningSteps, actions } = semanticResult;

    const apiKey = process.env.GEMINI_API_KEY;

    // 2. Live Gemini 2.5 Flash Streaming Mode if GEMINI_API_KEY is available
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });

        const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item.role === "user" || item.role === "model") {
              contents.push({
                role: item.role,
                parts: [{ text: item.content }],
              });
            }
          }
        }

        contents.push({
          role: "user",
          parts: [{ text: message }],
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
              // Send reasoning trace header first
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

    // 3. High-Precision Zero-Latency Semantic Streaming Mode
    // Natural token streaming with live reasoning trace and exact question answers
    const encoder = new TextEncoder();
    const words = fallbackContent.split(" ");

    const readable = new ReadableStream({
      async start(controller) {
        // First emit reasoning trace
        const reasoningPayload = `__REASONING__${JSON.stringify(reasoningSteps)}\n\n`;
        controller.enqueue(encoder.encode(reasoningPayload));

        // Stream synthesized semantic content word by word
        for (let i = 0; i < words.length; i++) {
          const chunk = (i === 0 ? "" : " ") + words[i];
          controller.enqueue(encoder.encode(chunk));

          // Natural typographic stream pacing
          if (words[i].endsWith(".") || words[i].endsWith(":") || words[i].includes("\n")) {
            await new Promise((resolve) => setTimeout(resolve, 35));
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
      { error: "An unexpected error occurred while communicating with Sprout AI." },
      { status: 500 }
    );
  }
}
