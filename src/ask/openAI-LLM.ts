
import { LanguageModelLike } from '@langchain/core/language_models/base';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { EmbeddingsInterface } from '@langchain/core/embeddings';
export class LLM {
    static define_ChatOpenAI(model: string, apiKey:string, temperature = 0): LanguageModelLike {
        const llm = new ChatOpenAI({
            model: model, 
            temperature: temperature,
            apiKey: apiKey, // In Node.js defaults to process.env.OPENAI_API_KEY
          });

          return llm;
    }

    static define_OpenAIEmbeddings(apiKey:string): EmbeddingsInterface {
        const embeddings = new OpenAIEmbeddings({openAIApiKey:apiKey});
        return embeddings;
    }
}
