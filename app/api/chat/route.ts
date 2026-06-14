import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { SYSTEM_PROMPT } from "@/lib/prompt";

export const runtime = "edge";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages?: ChatMessage[] };

  if (!messages?.length) {
    return new Response("Missing messages", { status: 400 });
  }

  if (!process.env.GROQ_API_KEY) {
    return new Response(
      "API key not configured. Add GROQ_API_KEY to .env.local",
      { status: 500 }
    );
  }

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: SYSTEM_PROMPT,
    messages,
    temperature: 0.8,
    maxTokens: 1024
  });

  return result.toTextStreamResponse();
}
