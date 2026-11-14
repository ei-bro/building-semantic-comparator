const { GoogleGenAI } = require('@google/genai');
const dotenv = require('dotenv');

dotenv.config();

const GEMINI_EMBEDDING_MODEL =
  process.env.GEMINI_EMBEDDING_MODEL || 'gemini-embedding-001';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is required');
}

// Initialize with your API Key
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

/**
 * Calculates Cosine Similarity between two vectors.
 * The math range is -1 to 1, but real embeddings use much less of it:
 * with gemini-embedding-001, unrelated text scores about 0.4-0.5 and close
 * matches about 0.75 and up. Compare scores with each other, not with 0.
 */
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}

async function compareTexts() {
  const text1 = 'what is html in web development?';
  const text2 = 'what is hyper text markup language?';
  const text3 = 'Nairobi is the capital of Kenya.';

  const question = 'some question?';
  try {
    const results = await ai.models.embedContent({
      model: GEMINI_EMBEDDING_MODEL,
      contents: [text1, text2, text3],
      config: {
        taskType: 'SEMANTIC_SIMILARITY',
      },
    });
    const [vector1, vector2, vector3] = results.embeddings;

    // console.log('vector1:', vector1.values);
    // console.log('vector2:', vector2.values);
    // console.log('vector3:', vector3.values);
    // console.log('vector3:', vector3.values);

    console.log(
      'cosine similarity between vector1 and vector3:',
      cosineSimilarity(vector1.values, vector3.values),
    );
  } catch (error) {
    console.error('Error comparing texts:', error.message);
  }
}

compareTexts();
