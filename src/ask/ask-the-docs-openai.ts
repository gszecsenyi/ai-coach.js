import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { Document } from "@langchain/core/documents";
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { pull } from 'langchain/hub';
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export class AskTheDocs {
    // Property
    query: string;
    apiKey : string;
    model : string;
    embeddingsFilePath : string;

    constructor(query:string, apiKey:string, model:string = 'gpt-4o', embeddingsFilePath:string) 
    {
        this.query = query;
        this.apiKey = apiKey;
        this.model = model;
        this.embeddingsFilePath = embeddingsFilePath;

    }

    public async generateAnswer() :Promise<string> {
        const llm = new ChatOpenAI({
            model: this.model, 
            temperature: 0.9,
            apiKey: this.apiKey, // In Node.js defaults to process.env.OPENAI_API_KEY
          });
      
          const prompt = await pull<ChatPromptTemplate>('rlm/rag-prompt');
          const ragChain = await createStuffDocumentsChain({
            llm,
            prompt,
            outputParser: new StringOutputParser(),
          });
          const promptInput = `Based on the following information, provide a short answer on how to ${this.query}:\n\nGuide:`;
          const vectorStore = await MemoryVectorStore.fromTexts([],[], new OpenAIEmbeddings({openAIApiKey:this.apiKey}));
          const response = await fetch(this.embeddingsFilePath);
          const data = await response.json();
          const documents = data["documents"].map((entry: string) => new Document({ pageContent: entry }))
          vectorStore.addVectors(data["embeddings"], documents);
          const results = await vectorStore.similaritySearch(this.query, 5);
          
          const res = await ragChain.invoke({
            question: promptInput,
            context: results,
          });
          
          return res;
    }
}
