
import { LanguageModelLike } from '@langchain/core/language_models/base';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { EmbeddingsInterface } from '@langchain/core/embeddings';
export class LLM {
    static define_ChatOpenAI(model: string, apiKey:string, temperature = 0): LanguageModelLike {
        const llm = new ChatOpenAI({
            model: model, 
            temperature: temperature,
            apiKey: apiKey, 
          });

          return llm;
    }

    static define_OpenAIEmbeddings(apiKey:string): EmbeddingsInterface {
        const embeddings = new OpenAIEmbeddings({openAIApiKey:apiKey});
        return embeddings;
    }

    
}
