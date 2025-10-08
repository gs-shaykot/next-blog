import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({});

export async function POST(req) {
    try {
        const { title, tone, length } = await req.json();

        if (!title || !tone || !length) {
            return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
        }

        // Modified prompt and systemInstruction as required
        const prompt = `
                    Write a comprehensive and well-structured blog post about "${title}".
                    The blog must begin with a creative and clear title related to "${title}" at the very top.
                    At the end of the post, include exactly 4 relevant hashtags.
                    Ensure that no more than 2 consecutive line breaks appear anywhere in the content.
                    `;

        const systemInstruction = `
                    You are a professional blog content creator. Write a high-quality, engaging, and SEO-friendly blog post.
                    The tone must be ${tone}, and the length should be approximately ${length} words.
                    Use markdown formatting (##, ###, lists) sparingly—only where it enhances clarity.
                    Keep the structure natural and avoid more than 2 consecutive line breaks throughout the text.
                    Make sure the content feels authentic, flows smoothly, and maintains reader interest.`;

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
