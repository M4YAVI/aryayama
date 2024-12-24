import { generateTextFromGoogleAI } from '@/lib/google-ai';
import { ratelimit, redis } from '@/lib/upstash'; // Optional
import { NextResponse } from 'next/server';

const CACHE_KEY_PREFIX = 'sentence:';
const CACHE_TTL = 60 * 60 * 24; // 24 hours

export async function POST(req: Request) {
  try {
    if (ratelimit) {
      const identifier = 'api_generate'; // Or use user IP, etc.
      const result = await ratelimit.limit(identifier);
      if (!result.success) {
        return new NextResponse('Rate limit exceeded', { status: 429 });
      }
    }

    const { prompt } = await req.json();

    let sentence = '';
    if (redis) {
      const cachedSentence = await redis.get<string>(
        `${CACHE_KEY_PREFIX}${prompt}`
      );
      if (cachedSentence) {
        return NextResponse.json({ sentence: cachedSentence });
      }
    }

    // Generate sentence using Google AI
    sentence = await generateTextFromGoogleAI(prompt);

    // Cache the sentence (optional)
    if (redis) {
      await redis.set(`${CACHE_KEY_PREFIX}${prompt}`, sentence, {
        ex: CACHE_TTL,
      });
    }

    return NextResponse.json({ sentence });
  } catch (error) {
    console.error('Error generating sentence:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
