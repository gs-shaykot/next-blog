import React from 'react'
import clientPromise from '../../../../lib/mongo';
export async function POST(req) {
    try {
        const client = await clientPromise;
        const savedPostCollection = client.db("next_Blog").collection("savedPosts");
        const data = await req.json();

        const result = await savedPostCollection.insertOne(data);

        return new Response(
            JSON.stringify({ success: true, id: String(result.insertedId) }),
            {
                status: 200
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }),
            {
                status: 500
            }
        );
    }
}

export async function GET() {
    try {
        const client = await clientPromise;
        const savedPostCollection = client.db("next_Blog").collection("savedPosts");
        const savedPosts = await savedPostCollection.find().toArray();

        // 🔥 serialize all ObjectIds
        const serializedPosts = savedPosts.map(post => ({
            ...post,
            _id: String(post._id),
        }));

        return new Response(JSON.stringify(serializedPosts), {
            status: 200
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }),
            {
                status: 500
            }
        );
    }
}
