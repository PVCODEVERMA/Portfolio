import { NextRequest, NextResponse } from "next/server";
import { DATA } from "@/data/resume";

export async function POST(req: NextRequest) {
  try {
    const { messages, modelId } = await req.json();

    const systemPrompt = `
      You are an AI Assistant for ${DATA.name}'s professional portfolio. 
      Your goal is to answer questions about ${DATA.name} based on the following data:
      ${JSON.stringify(DATA, null, 2)}
      
      Guidelines:
      - Be professional, polite, and helpful.
      - If you don't know the answer based on the data, say you're not sure but offer to provide contact details.
      - Keep responses concise and focused on the user's career and skills.
      - Mention ${DATA.name}'s 1.5+ years of experience and MERN stack expertise.
    `;

    // Combine system prompt with conversation history for models that support it
    const lastMessage = messages[messages.length - 1].text;

    if (modelId === "v1") {
      // Google Gemini
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) return NextResponse.json({ text: "Gemini API Key is missing. Please check your .env.local file." });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: systemPrompt + "\n\nUser Question: " + lastMessage }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.error("Gemini API Error:", data);
        return NextResponse.json({ text: `Gemini Error: ${data.error?.message || "Unknown error"}` });
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, Gemini couldn't generate a response.";
      return NextResponse.json({ text });
    }

    if (modelId === "v2") {
      // Groq (Llama 3)
      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) return NextResponse.json({ text: "Groq API Key is missing." });

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
            { role: "user", content: lastMessage },
          ],
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Groq API Error:", data);
        return NextResponse.json({ text: `Groq Error: ${data.error?.message || "Unknown error"}` });
      }

      const text = data.choices?.[0]?.message?.content || "I'm sorry, Groq couldn't generate a response.";
      return NextResponse.json({ text });
    }

    if (modelId === "v3") {
      // OpenAI
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) return NextResponse.json({ text: "OpenAI API Key is missing." });

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
            { role: "user", content: lastMessage },
          ],
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("OpenAI API Error:", data);
        return NextResponse.json({ text: `OpenAI Error: ${data.error?.message || "Unknown error"}` });
      }

      const text = data.choices?.[0]?.message?.content || "I'm sorry, OpenAI couldn't generate a response.";
      return NextResponse.json({ text });
    }

    return NextResponse.json({ error: "Invalid model selection" }, { status: 400 });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
