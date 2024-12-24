// actions/typingAction.ts
'use server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';
import { headers } from 'next/headers';

const dotenvConfig = config();
const API_KEY = process.env.GOOGLE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY!);

// In-memory rate limiter
const requestCounts = new Map<string, number>();
const TIME_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 request per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const count = requestCounts.get(ip) || 0;
  if (count > MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  requestCounts.set(ip, count + 1);
  setTimeout(() => requestCounts.delete(ip), TIME_WINDOW_MS); // Clear the count after the window passes
  return true;
}

export async function generateText() {
  try {
    // Get user IP from headers (adjust for your setup)
    const headersList = headers();
    const ip = (await headersList).get('x-forwarded-for') || 'unknown';

    if (!checkRateLimit(ip)) {
      console.warn('Rate limit exceeded for IP: ', ip);
      return 'Rate limit exceeded. Please wait before making another request.';
    }

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
