import { NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongo';
import { getPaginatedPosts } from '../../../../lib/posts';

const client = await clientPromise

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get("limit")) || 100;
        const page = parseInt(searchParams.get("page"));
        const category = searchParams.get("category");

        const data = await getPaginatedPosts(limit, page, category)
        
        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
