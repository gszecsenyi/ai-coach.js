# ai-coach.js
Javascript library for browser side AI solutions like AskTheDocs, etc. 

## Installation
```bash
npm install ai-coach.js
```

## Usage
```javascript
import { AskTheDocs } from 'ai-coach.js';

const askTheDocs = new AskTheDocs('My query here', 'My API key', 'Model name', 'Embedding file path for fetch');
askTheDocs.generateAnswer('How to install ai-coach.js?');
```
