require('dotenv').config(); // import dotenv from 'dotenv/config';
const { GoogleGenAI } = require('@google/genai');

const GEMINI_EMBEDDING_MODEL =
  process.env.GEMINI_EMBEDDING_MODEL || 'gemini-embedding-001';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is required');
}

// 1. Initialize the SDK
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function generateEmbedding() {
  // gemini-embedding-001 accepts up to 2,048 tokens per text.
  // Longer documents must be split into smaller chunks first (week 4).
  const text = 'Hello, this is a test for vector embeddings.';

  try {
    // 2. Generate the embedding
    const result = await ai.models.embedContent({
      model: GEMINI_EMBEDDING_MODEL,
      contents: text,
      // config: {
      //   outputDimensionality: 64,
      // },
    });

    console.log(result.embeddings[0].values); // [0.0001, 0.0002, 0.0003, ...]
    console.log(result.embeddings[0].values.length); // 3072
  } catch (error) {
    console.error('Error generating embedding:', error.message);
  }
}

generateEmbedding();
