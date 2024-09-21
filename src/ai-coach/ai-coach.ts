import { LanguageModelLike } from '@langchain/core/language_models/base';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { Document } from "@langchain/core/documents";
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { pull } from 'langchain/hub';
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { EmbeddingsInterface } from '@langchain/core/embeddings';


export class AICoach {
    context: string;
    apiKey : string;
    model : string;
    embeddingsFilePath : string;
    llm : LanguageModelLike;
    embedding : EmbeddingsInterface;

    constructor(context:string, embeddingsFilePath:string, llm : LanguageModelLike, embedding: EmbeddingsInterface) 
    {
        this.context = context;
        this.embeddingsFilePath = embeddingsFilePath;
        this.llm = llm;
        this.embedding = embedding;

    }

    public async generateAnswer() :Promise<string> {

      
          const prompt = await pull<ChatPromptTemplate>('rlm/rag-prompt');
          const ragChain = await createStuffDocumentsChain({
            llm: this.llm,
            prompt,
            outputParser: new StringOutputParser(),
          });
          const promptInput = `You are an AI coach, this is the current context: ${this.context}\n\nWhat is the next step, what should be done next? 
          Please response is JSON Format. For example {"advice_short": "create Business Vault objects", "advice_long": "To proceed, use the wizard to 
          create Business Vault objects from your existing Raw Vault objects. This will help in transforming raw data into business-friendly structures."}`;
          const vectorStore = await MemoryVectorStore.fromTexts([],[], this.embedding);
          const response = await fetch(this.embeddingsFilePath);
          const data = await response.json();
          const documents = data["documents"].map((entry: string) => new Document({ pageContent: entry }))
          vectorStore.addVectors(data["embeddings"], documents);
                    
          const res = await ragChain.invoke({
            question: promptInput,
            context: [],
          });
          
          const top_documents = await vectorStore.similaritySearch(res["advice_short"], 5);

          const prompt_v2 = `Explain please in 1-3 sentences, how to use the app to ${res["advice_short"]} step by step with a well formatted output. `; 
          
          const ragChain2 = await createStuffDocumentsChain({
            llm: this.llm,
            prompt,
            outputParser: new StringOutputParser(),
          });

          const result = await ragChain2.invoke({
            question: prompt_v2,
            context: top_documents,
          });

          return result;
    }
}
