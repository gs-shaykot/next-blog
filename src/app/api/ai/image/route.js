import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { prompt, style, aspectRatio } = await req.json();

        if (!prompt || !style || !aspectRatio) {
            return NextResponse.json(
                { message: 'Missing required fields: prompt, style, or aspectRatio.' },
                { status: 400 }
            );
        }

        const enhancedPrompt = `${prompt}, in a Bangladeshi context, reflecting local culture and environment. Ensure people are well-dressed, representing Bangladeshi boys or girls, with Muslim or Christian cultural influences if relevant. Do not include Hindu cultural elements. The image should look natural, realistic, cinematic, ultra-detailed, 8K or 16K quality. Style: ${style}`;


        const dimensionMap = {
            '1:1': { width: 1024, height: 1024 },
            '16:9': { width: 1344, height: 768 },
            '4:3': { width: 1152, height: 896 }
        };
        const { width, height } = dimensionMap[aspectRatio] || { width: 1344, height: 768 };

        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=${width}&height=${height}&nologo=true&enhance=true`;
        const response = await fetch(imageUrl);

        if (!response.ok) {
            return NextResponse.json(
                { message: 'Failed to generate image from Pollinations.ai' },
                { status: response.status }
            );
        }

        const arrayBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');

        return NextResponse.json({
            base64Image: base64Image,
            mimeType: 'image/jpeg'
        }, { status: 200 });

    } catch (error) {
        console.error('Image Generation Error:', error);
        return NextResponse.json(
            { message: 'Failed to generate image.', error: error.message },
            { status: 500 }
        );
    }
}