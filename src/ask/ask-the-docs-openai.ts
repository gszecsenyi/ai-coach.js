import { LanguageModelLike } from '@langchain/core/language_models/base';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { Document } from "@langchain/core/documents";
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { pull } from 'langchain/hub';
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { EmbeddingsInterface } from '@langchain/core/embeddings';


export class AskTheDocs {
    // Property
    query: string;
    apiKey : string;
    model : string;
    embeddingsFilePath : string;
    llm : LanguageModelLike;
    embedding : EmbeddingsInterface;

    constructor(query:string, embeddingsFilePath:string, llm : LanguageModelLike, embedding: EmbeddingsInterface) 
    {
        this.query = query;
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
          const promptInput = `Based on the following information, provide a short answer on how to ${this.query}:\n\nGuide:`;
          const vectorStore = await MemoryVectorStore.fromTexts([],[], this.embedding);
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
