import { NextResponse } from 'next/server'
import React from 'react'
import clientPromise from '../../../../lib/mongo';

const client = await clientPromise
export async function GET() {
    try {
        const postsCollection = await client.db("next_Blog").collection("blogs");
        const posts = await postsCollection.find().toArray();
        const serialized = posts.map(p => ({ ...p, _id: String(p._id) }));
        return NextResponse.json(serialized, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
