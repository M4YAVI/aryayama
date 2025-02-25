import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.KLUSTERAI_API_KEY, baseURL: "https://api.kluster.ai/v1" });

export async function POST(request: Request) {
  const { messages, style } = await request.json();
  const apiMessages = [{ role: "system", content: style }, ...messages];
  try {
    const completion = await client.chat.completions.create({
      model: "klusterai/Meta-Llama-3.3-70B-Instruct-Turbo",
      max_completion_tokens: 4000,
      temperature: 0.6,
      top_p: 1,
      messages: apiMessages,
    });
    const assistantMessage = completion.choices[0].message.content;
    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
  }
}