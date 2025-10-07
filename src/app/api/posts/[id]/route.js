import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongo";

export async function GET(req, { params }) {
    try {
        const { id } = await params;

        const client = await clientPromise;
        const postsCollection = client.db("next_Blog").collection("blogs");

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
        }

        const post = await postsCollection.findOne({ _id: new ObjectId(id) });

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ ...post, _id: post._id.toString() }, { status: 200 });
    } catch (err) {
        console.error("Error fetching post:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    try {
        const { id } = params;

        const client = await clientPromise;
        const postsCollection = client.db("next_Blog").collection("blogs");

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
        }
 
        const updatedPost = await postsCollection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $inc: { totalViews: 1 } },
            { returnDocument: "after" }  
        );

        if (!updatedPost.value) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "View count updated", post: updatedPost.value },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error updating totalViews:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}