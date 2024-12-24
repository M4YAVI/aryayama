import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyANVGA-esolKCuROsdE6HAbVLPveYmY7ss');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function generateText() {
  const prompt =
    'Generate a random topic related to deep learning, covering everything  in detailed  in a blog-style with a human tone';
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
