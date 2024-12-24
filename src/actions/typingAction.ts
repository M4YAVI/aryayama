'use server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';

const dotenvConfig = config();
const API_KEY = process.env.GOOGLE_AI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY!);
export async function generateText() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt =
      'Please create random paragraph from famous, underrated books for typing practice.';
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating text:', error);
    return null;
  }
}
