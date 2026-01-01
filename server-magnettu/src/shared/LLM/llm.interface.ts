export interface LLMResponse {
    content: string;
    tokenUsed: number;
    approxInputChars?: number;
    approxOutputChars?: number;
}

export interface LLMService {
    generatePost(prompt: string): Promise<LLMResponse>;
}