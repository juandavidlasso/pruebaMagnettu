import { LLMResponse } from "./llm.interface";
import { LLMError } from "./llm.error";

async function createGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  const mod = await import("@google/genai");
  const { GoogleGenAI } = mod;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing");
  }

  return new GoogleGenAI({ apiKey });
}

export async function generatePost(prompt: string): Promise<LLMResponse> {
  try {
    if (!prompt || prompt.trim() === "") {
      throw new LLMError("Prompt is empty");
    }
    const genAI = await createGeminiClient();

    const res = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const content = res?.text?.trim();

    if (!content) {
      throw new LLMError("No content generated");
    }

    return {
      content,
      tokenUsed: 0,
      approxInputChars: prompt.length,
      approxOutputChars: content.length,
    };
  } catch (error: any) {
    if (error instanceof LLMError) {
      throw error;
    }

    throw new LLMError("Failed to generate content");
  }
}
