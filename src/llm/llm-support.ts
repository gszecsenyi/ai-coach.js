
import { LanguageModelLike } from '@langchain/core/language_models/base';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { AzureChatOpenAI, AzureOpenAIEmbeddings } from "@langchain/openai";

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

    static define_AzureOpenAI(deploymentName: string, apiKey:string, apiVersion:string, instanceName:string, temperature = 0): LanguageModelLike {
        const llm = new AzureChatOpenAI({
            temperature: temperature,
            azureOpenAIApiDeploymentName: deploymentName,
            azureOpenAIApiKey: apiKey,
            azureOpenAIApiVersion: apiVersion,
            azureOpenAIApiInstanceName: instanceName,
          });

        return llm;
    }

    static define_AzureOpenAIEmbeddings(deploymentName: string, apiKey:string, apiVersion:string, instanceName:string): EmbeddingsInterface {
        const embeddings = new AzureOpenAIEmbeddings({
            apiKey: apiKey, 
            deploymentName: deploymentName, 
            azureOpenAIApiInstanceName: instanceName,
            openAIApiVersion: apiVersion})
        return embeddings;
    }

    static define_OpenAIEmbeddings(apiKey:string): EmbeddingsInterface {
        const embeddings = new OpenAIEmbeddings({openAIApiKey:apiKey});
        return embeddings;
    }

    
}
