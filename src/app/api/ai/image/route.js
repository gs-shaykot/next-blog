

import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({});

export async function POST(req) {
    try {
        const { prompt, style, aspectRatio } = await req.json();
        console.log(prompt, style, aspectRatio);
        if (!prompt || !style || !aspectRatio) {
            return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
        }

        const fullPrompt = `Generate a high-quality blog thumbnail image based on the topic: "${prompt}". The style must be: "${style}".`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: fullPrompt,
            config: { 
                responseModalities: ["TEXT", "IMAGE"],
                imageGenerationConfig: {
                    aspectRatio: aspectRatio,  
                    numberOfImages: 1,
                }
            }
        });
        const imagePart = response.candidates[0].content.parts.find(
            (part) => part.inlineData && part.inlineData.mimeType.startsWith('image/')
        );

        if (!imagePart) {
            return NextResponse.json({ message: 'AI failed to generate an image part.' }, { status: 500 });
        }

        const base64Image = imagePart.inlineData.data;
        const mimeType = imagePart.inlineData.mimeType;

        return NextResponse.json({
            base64Image: base64Image,
            mimeType: mimeType
        }, { status: 200 });

    } catch (error) {
        console.error('Nano Banana Image API Error:', error);
        return NextResponse.json({ message: 'Failed to generate image.', error: error.message }, { status: 500 });
    }
}