import { PostModel } from './post.model';
import { getLLM } from '../../shared/llm/llm.factory';
import { buildLinkedinPrompt } from '../../shared/prompts/linkedin.prompt';
import { AppError } from '../../shared/errors/AppError';


export async function generateFromEmail(email: string) {
  if (!email || email.trim() === '') {
    throw new AppError('Email is empty', 400);
  }

  if (email.length > 10000) {
    throw new AppError('Email is too long', 400);
  }
  
  try {
    const prompt = buildLinkedinPrompt(email);
    const llm = getLLM();
  
    const result = await llm.generatePost(prompt);
  
    const saved = await PostModel.create({
      emailOriginal: email,
      linkedinPost: result.content,
      tokensUsed: result.tokenUsed,
    });
  
    return saved;
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError('LLM service unavailable', 503);
    }
    throw error;
  }
}

export async function getAllPosts() {
  return PostModel.find().sort({ createdAt: -1 })
}
