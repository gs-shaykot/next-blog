import { NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongo';
import { getPaginatedPosts } from '../../../../lib/posts';
import { ObjectId } from 'mongodb';

const client = await clientPromise 
const postsCollection = await client.db("next_Blog").collection("blogs");

export async function POST(req) {
    try {
        const body = await req.json();
        const today = new Date().toISOString().split("T")[0]
        const result = await postsCollection.insertOne({ ...body, posted_date: today, totalLikes: 0 });
        return NextResponse.json(
            { success: true, id: result.insertId },
            { status: 200 }
        )
    }
    catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url); 
        const limit = parseInt(searchParams.get("limit")) || 100;
        const page = parseInt(searchParams.get("page"));
        const category = searchParams.get("category");

        const data = await getPaginatedPosts(limit, page, category)

        return NextResponse.json(data, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        const { id, ...updateFields } = await req.json(); 

        const result = await postsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFields }
        )
        return NextResponse.json(
            { success: true, modifiedCount: result.modifiedCount },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")
        const result = await postsCollection.deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json(
            { success: true, deletedCount: result.deletedCount },
            { status: 200 }
        )
    }
    catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}