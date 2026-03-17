import { NextResponse } from "next/server";
import { DATA } from "@/data/resume";
import { getSupabaseServerClient } from "@/lib/supabase-server";

type ChatMessage = {
  text: string;
  sender?: "user" | "ai" | string;
};

function toChatRole(sender?: string) {
  if (sender === "ai") return "assistant";
  return "user";
}

function lastTurns(messages: ChatMessage[], maxTurns: number) {
  // Keep the most recent turns (user/ai), in order.
  const trimmed = messages.slice(-maxTurns);
  return trimmed;
}

function localAnswer(questionRaw: string) {
  const question = questionRaw.trim();
  const lower = question.toLowerCase();

  const fallbackText =
    `Hi! I'm ${DATA.name}'s portfolio assistant.\n\n` +
    `Ask me anything about my work, projects, learning journey, freelancing, or personal approach to building products.`;

  if (!question) return fallbackText;

  if (lower.includes("why") && lower.includes("hire")) {
    return (
      `You should hire ${DATA.name} because I blend fast execution with clean engineering.\n\n` +
      `- **Strengths**: full‑stack delivery, modern UI, performance, and AI integration\n` +
      `- **Mindset**: ownership, clarity, and consistent shipping\n` +
      `- **Focus**: practical solutions that help users and business outcomes`
    );
  }

  if (lower.includes("life") || lower.includes("journey") || lower.includes("brain") || lower.includes("mindset")) {
    return (
      `My approach (“my brain”):\n` +
      `- I break problems into small systems, ship iterations, then improve.\n` +
      `- I optimize for clarity: simple architecture, readable code, measurable results.\n` +
      `- I learn in public and use projects as proof.\n\n` +
      `If you want, ask: “What are you building right now?” or “How do you learn fast?”`
    );
  }

  if (lower.includes("contact") || lower.includes("email") || lower.includes("reach")) {
    return (
      `Contact me here:\n\n` +
      `- **Email**: ${DATA.contact.email}\n` +
      `- **Phone**: ${DATA.contact.tel}\n` +
      `- **GitHub**: ${DATA.contact.social.GitHub?.url}\n` +
      `- **LinkedIn**: ${DATA.contact.social.LinkedIn?.url}`
    );
  }

  const latest = (DATA as any).projects?.[0];
  if (lower.includes("project") && latest) {
    return `A recent featured project: **${latest.title}** — ${latest.description}`;
  }

  return (
    `You asked: “${question}”.\n\n` +
    `I can answer about my experience, projects, freelancing, AI building, learning process, and personal journey.\n` +
    `Try: “Tell me about your latest project” or “How do you think about building products?”`
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { messages?: ChatMessage[]; modelId?: string; conversationId?: string }
      | null;
    const messages = body?.messages ?? [];
    const modelId = body?.modelId ?? "v1";
    const conversationId = body?.conversationId ?? null;

    const systemPrompt =
      `You are an AI Assistant for ${DATA.name}'s professional portfolio.\n` +
      `You can answer ANY question, but you should anchor answers to ${DATA.name}'s real background when relevant.\n\n` +
      `About me (ground truth data):\n` +
      `${JSON.stringify(DATA, null, 2)}\n\n` +
      `Guidelines:\n` +
      `- Be friendly, confident, and helpful.\n` +
      `- If asked about personal life/brain/mindset: describe my approach to learning, building, freelancing, content creation.\n` +
      `- If a question is unrelated or unknown: answer generally, then steer back to portfolio context.\n` +
      `- Keep replies concise and structured.\n`;

    const turns = lastTurns(messages, 12);
    const lastMessage = turns[turns.length - 1]?.text ?? "";

    // If there's no message, return a friendly default.
    if (!lastMessage.trim()) {
      return NextResponse.json({
        text: localAnswer(""),
      });
    }

    const supabase = getSupabaseServerClient();

    async function logToSupabase(payload: {
      question: string;
      answer: string;
      model_id: string;
      conversation_id: string | null;
      ok: boolean;
      error?: string | null;
    }) {
      if (!supabase) return;
      // Table expected: chat_logs(conversation_id text, model_id text, question text, answer text, ok boolean, error text, created_at timestamptz default now())
      await supabase.from("chat_logs").insert({
        conversation_id: payload.conversation_id,
        model_id: payload.model_id,
        question: payload.question,
        answer: payload.answer,
        ok: payload.ok,
        error: payload.error ?? null,
      });
    }

    // Always-available free fallback (or user-selected)
    if (modelId === "local") {
      const text = localAnswer(lastMessage);
      await logToSupabase({
        question: lastMessage,
        answer: text,
        model_id: modelId,
        conversation_id: conversationId,
        ok: true,
      });
      return NextResponse.json({ text });
    }

    if (modelId === "v1") {
      // Google Gemini
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        const text = localAnswer(lastMessage);
        await logToSupabase({
          question: lastMessage,
          answer: text,
          model_id: modelId,
          conversation_id: conversationId,
          ok: false,
          error: "Missing GEMINI_API_KEY",
        });
        return NextResponse.json({ text });
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text:
                      systemPrompt +
                      "\n\nConversation so far:\n" +
                      turns
                        .map((m) => `${m.sender === "ai" ? "Assistant" : "User"}: ${m.text}`)
                        .join("\n") +
                      "\n\nAnswer as the assistant.",
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        console.error("Gemini API Error:", data);
        const text = localAnswer(lastMessage);
        await logToSupabase({
          question: lastMessage,
          answer: text,
          model_id: modelId,
          conversation_id: conversationId,
          ok: false,
          error: `Gemini: ${data?.error?.message || "Unknown error"}`,
        });
        return NextResponse.json({ text });
      }

      const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        localAnswer(lastMessage);
      await logToSupabase({
        question: lastMessage,
        answer: text,
        model_id: modelId,
        conversation_id: conversationId,
        ok: true,
      });
      return NextResponse.json({ text });
    }

    if (modelId === "v2") {
      // Groq (Llama 3)
      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) {
        const text = localAnswer(lastMessage);
        await logToSupabase({
          question: lastMessage,
          answer: text,
          model_id: modelId,
          conversation_id: conversationId,
          ok: false,
          error: "Missing GROQ_API_KEY",
        });
        return NextResponse.json({ text });
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            ...turns.map((m) => ({ role: toChatRole(m.sender), content: m.text })),
          ],
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        console.error("Groq API Error:", data);
        const text = localAnswer(lastMessage);
        await logToSupabase({
          question: lastMessage,
          answer: text,
          model_id: modelId,
          conversation_id: conversationId,
          ok: false,
          error: `Groq: ${data?.error?.message || "Unknown error"}`,
        });
        return NextResponse.json({ text });
      }

      const text = data.choices?.[0]?.message?.content || localAnswer(lastMessage);
      await logToSupabase({
        question: lastMessage,
        answer: text,
        model_id: modelId,
        conversation_id: conversationId,
        ok: true,
      });
      return NextResponse.json({ text });
    }

    if (modelId === "v3") {
      // OpenAI (optional; may not be free)
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        const text = localAnswer(lastMessage);
        await logToSupabase({
          question: lastMessage,
          answer: text,
          model_id: modelId,
          conversation_id: conversationId,
          ok: false,
          error: "Missing OPENAI_API_KEY",
        });
        return NextResponse.json({ text });
      }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...turns.map((m) => ({ role: toChatRole(m.sender), content: m.text })),
          ],
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        console.error("OpenAI API Error:", data);
        const text = localAnswer(lastMessage);
        await logToSupabase({
          question: lastMessage,
          answer: text,
          model_id: modelId,
          conversation_id: conversationId,
          ok: false,
          error: `OpenAI: ${data?.error?.message || "Unknown error"}`,
        });
        return NextResponse.json({ text });
      }

      const text = data.choices?.[0]?.message?.content || localAnswer(lastMessage);
      await logToSupabase({
        question: lastMessage,
        answer: text,
        model_id: modelId,
        conversation_id: conversationId,
        ok: true,
      });
      return NextResponse.json({ text });
    }

    // Unknown modelId -> fall back locally (never break chat)
    {
      const text = localAnswer(lastMessage);
      await logToSupabase({
        question: lastMessage,
        answer: text,
        model_id: modelId,
        conversation_id: conversationId,
        ok: false,
        error: "Unknown modelId",
      });
      return NextResponse.json({ text });
    }
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ text: "Internal Server Error" }, { status: 500 });
  }
}
