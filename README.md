![NPM Version](https://img.shields.io/npm/v/ai-coach.js)


# ai-coach.js
The AICoach class provides a business solution for context-specific, step-by-step guidance and decision support using AI. Its purpose is to act as a virtual coach or advisor, helping users navigate complex tasks or workflows by breaking them down into actionable recommendations. Here’s how it could add value in a business setting:

#### Key Business Use Cases
- Personalized Coaching and Training: For companies that offer complex products or services (e.g., SaaS applications, financial services, or consulting), AICoach can guide users on the next best steps based on their unique context and goals. The AI can act as an on-demand coach, providing structured advice to help users effectively use the product, saving time and reducing the need for human support.
- Process Optimization and Guidance: Many business processes, like project management, customer onboarding, or compliance, involve multiple steps that are often challenging to follow consistently. By tailoring its guidance to the user’s current context, AICoach can suggest optimal actions, helping teams or users move forward smoothly, minimizing delays, and improving productivity.
- Decision Support: For roles requiring expert decision-making (such as business analysts, project managers, or consultants), AICoach provides data-driven suggestions by retrieving and summarizing relevant knowledge from past documentation or embedded knowledge bases. This gives users rapid access to high-value information and insights that can guide more effective decisions.
- Contextual Knowledge Retrieval: Many organizations have vast internal knowledge bases that can be difficult to navigate. The AICoach can search these resources, find relevant documents, and bring forward useful insights in response to specific questions, making it easier for users to get the information they need without extensive searching.
  
####  Core Benefits to Business
- Enhanced User Experience: The AICoach offers users a supportive, intuitive experience, guiding them in a conversational way. This can improve customer satisfaction, reduce friction, and increase the adoption of complex tools.
Reduced Support Costs: By automating common support and guidance functions, AICoach reduces the need for customer service teams to handle routine inquiries, saving on operational costs.
- Improved Productivity: Employees can focus on higher-value work instead of searching for information or managing complex workflows manually. The AI’s contextual guidance helps streamline tasks and ensure consistency across the organization.
Consistency in Knowledge Sharing: The AI can ensure that advice given to users remains consistent with company standards, reducing the risk of errors or miscommunication in task execution.
####  Example Scenarios
- Product Onboarding: For a CRM or project management software, the AICoach can guide new users through setup steps, show them how to integrate tools, and advise on best practices to get started.
- Internal Knowledge Management: In consulting firms or large organizations, employees often need specific information from extensive internal documentation. AICoach can surface the most relevant insights, documents, or previous cases that apply to a new project.
Compliance and Process Assurance: In sectors like finance or healthcare, where compliance is critical, AICoach can offer step-by-step guidance on how to meet regulatory requirements, ensuring employees follow the correct procedures.
In short, AICoach provides tailored, AI-powered guidance to streamline decision-making, enhance user experiences, and drive operational efficiency across business processes.


The package supports that if you have a python based vector database, such as chroma, you can export the embedded data into the appropriate json structure and run Ask-The-Docs usecaset in your node application on javascript basis. 

The README contains a short description of how to export data from chroma using Python. Then you need to copy this file into the assets directory of your application and pass the path when defining the class. 

If you don't have an existing vector database, make an incident on github and I'll make a description on how to make it. 

## Installation
```bash
npm install ai-coach.js
```

## Prepare the embedding file from Chroma Vector Database with Python
```python
import json

# Define the path to the Chroma vectorstore directory
chroma_db_directory = "./chroma_db"

# Initialize the OpenAI embeddings
embeddings = OpenAIEmbeddings(api_key=openai_api_key)

# Initialize the Chroma vectorstore
vectorstore = Chroma(persist_directory=chroma_db_directory, embedding_function=embeddings)

# Write the data to a JSON file
with open("data.json", 'w') as file:
    json.dump(vectorstore.get(), file, indent=4) 
```

## Create the embedding file manualy

If you manually create the embedding JSON file, its structure is as follows:
```python
{ ids:[], embeddings:[[]], documents:[]}
```


## Usage
```javascript
import { AskTheDocs } from 'ai-coach.js';

const askTheDocs = new AskTheDocs(
    'My query here', 
    'My API key', 
    'Model name', 
    'Embedding file path for fetch'
    );
askTheDocs.generateAnswer('How to install ai-coach.js?');
```
