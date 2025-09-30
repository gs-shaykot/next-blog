import { NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongo';

const client = await clientPromise

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get("limit")) || 6;
        const page = parseInt(searchParams.get("page")) || 1;
        const category = searchParams.get("category");

        const postsCollection = await client.db("next_Blog").collection("blogs");

        const query = category && category !== "All" ? { category } : {};

        const totalPosts = await postsCollection.countDocuments(query);
        const totalPages = Math.ceil(totalPosts / limit);

        const posts = await postsCollection
            .find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray();

        const serialized = posts.map((p) => ({ ...p, _id: String(p._id) }));

        return NextResponse.json({ posts: serialized, totalPages }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
