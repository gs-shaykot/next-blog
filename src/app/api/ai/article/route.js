import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({});
 
export async function POST(req) {
    try {
        const { title, tone, length } = await req.json();

        if (!title || !tone || !length) {
            return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
        }

        const systemInstruction = `You are a professional blog content creator. Write a high-quality, engaging, and well-structured blog post. The tone must be ${tone} and the length must be approximately ${length} words. Use appropriate markdown (##, ###, lists) for formatting but use less, don't use more than one line break.`;

        const prompt = `Write a comprehensive blog post titled: "${title}"`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.8,
            },
        });
        const generatedArticle = response.text;
        return NextResponse.json({ article: generatedArticle }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to generate article content.', error: error.message }, { status: 500 });
    }
}