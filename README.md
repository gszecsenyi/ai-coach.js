![NPM Version](https://img.shields.io/npm/v/ai-coach.js)


# ai-coach.js
Javascript library for browser side AI solutions like AskTheDocs, etc. 

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
