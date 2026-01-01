import { GoogleGenAI } from '@google/genai';
import { LLMResponse } from "./llm.interface";
import { LLMError } from './llm.error';

function createGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing");
  }

  return new GoogleGenAI({ apiKey });
}

const genAI = createGeminiClient();

export async function generatePost(prompt: string): Promise<LLMResponse> {
    try {
        if (!prompt || prompt.trim() === '') {
            throw new LLMError('Prompt is empty');
        }

        const res = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const content = res?.text?.trim();

        if (!content) {
            throw new LLMError('No content generated');
        }

        return {
            content,
            tokenUsed: 0,
            approxInputChars: prompt.length,
            approxOutputChars: content.length,
        };
    } catch (error:any) {
        if (error instanceof LLMError) {
            throw error;
        }

        throw new LLMError('Failed to generate content');
    }
}