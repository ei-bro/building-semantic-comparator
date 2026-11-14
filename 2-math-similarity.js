// The "Ruler" of AI: Cosine Similarity
// This function measures how "parallel" two vectors are.
// If they point in the same direction, similarity is 1.0 (Identical meaning).
// If they are perpendicular (90 degrees), similarity is 0.0 (Unrelated).
// If they point in opposite directions, similarity is -1.0 (Opposite meaning).

function cosineSimilarity(vecA, vecB) {
  // validate input
  //   if (vecA.length !== vecB.length) {
  //     throw new Error('Vectors must be the same length');
  //   }

  // 1. Dot Product (multiply matching components and sum)

  //   let dotProduct = 0;
  //   // (A · B)
  //   for (let i = 0; i < vecA.length; i++) {
  //     dotProduct += vecA[i] * vecB[i];
  //   }

  //   // 2. Magnitude of A (square, add, square root)
  //   // ‖A‖ = √(A₁² + A₂² + A₃² + ...)
  //   let magnitudeA = 0;
  //   for (let i = 0; i < vecA.length; i++) {
  //     magnitudeA += vecA[i] * vecA[i];
  //   }
  //   magnitudeA = Math.sqrt(magnitudeA);

  //   // 3. Magnitude of B (square, add, square root)
  //   // ‖B‖ = √(B₁² + B₂² + B₃² + ...)
  //   let magnitudeB = 0;
  //   for (let i = 0; i < vecB.length; i++) {
  //     magnitudeB += vecB[i] * vecB[i];
  //   }
  //   magnitudeB = Math.sqrt(magnitudeB);

  // //  refactored code:

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

  // 4. Divide (dot product by magnitudes)
  return dotProduct / (magnitudeA * magnitudeB);
}

// Example 1: Identical direction (Scaled up)
const vector1 = [1, 2, 3];
const vector2 = [2, 4, 6]; // Same direction, just longer
console.log(
  'Similarity (Identical):',
  cosineSimilarity(vector1, vector2).toFixed(4),
); // 1.0000

// Example 2: Orthogonal (Unrelated)
const vector3 = [1, 0, 0]; // Points along X-axis
const vector4 = [0, 1, 0]; // Points along Y-axis
console.log(
  'Similarity (Orthogonal):',
  cosineSimilarity(vector3, vector4).toFixed(4),
); // 0.0000

// Example 3: Opposite (pure math only: real embeddings never point opposite,
// even for opposite meanings like "I love coding" vs "I hate coding", which score about 0.80)
const vector5 = [1, 1, 1];
const vector6 = [-1, -1, -1];

console.log(
  'Similarity (Opposite):',
  cosineSimilarity(vector5, vector6).toFixed(4),
); // -1.0000
