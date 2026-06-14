import { createOpenAI } from "@ai-sdk/openai";
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

  const apiKey = process.env.MIMO_API_KEY;
  if (!apiKey) {
    return new Response(
      "API key not configured. Add MIMO_API_KEY to .env.local",
      { status: 500 }
    );
  }

  const mimo = createOpenAI({
    baseURL: "https://token-plan-sgp.xiaomimimo.com/v1",
    apiKey,
  });

  const result = streamText({
    model: mimo("mimo-v2.5"),
    system: SYSTEM_PROMPT,
    messages,
    temperature: 0.8,
    maxTokens: 1024,
  });

  return result.toTextStreamResponse();
}
