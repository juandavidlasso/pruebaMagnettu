import { LLMService } from './llm.interface'
import { generatePost } from './llm.service'

export function getLLM(): LLMService {
    return { generatePost };
}