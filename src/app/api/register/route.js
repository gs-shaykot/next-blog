import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongo";
import { hashPass } from "../../../../utils/hash";
import { ObjectId } from "mongodb";

const client = await clientPromise
export async function POST(req) {
    try {
        const { fullname, email, password, photoUrl } = await req.json();
        const usersCollection = await client.db("next_Blog").collection("users");
        const isUserExist = await usersCollection.findOne({ email });

        if (isUserExist) {
            return NextResponse.json(
                { message: "User Already Existed" },
                { status: 400 }
            );
        }

        const hashed = await hashPass(password);
        const data = { fullname, email, password: hashed, photoUrl, likedPosts: [], savedPosts: [], role: "user" };
        const res = await usersCollection.insertOne(data);
        await client.db("next_Blog").collection("activities").insertOne({
            type: "registered",
            fullname,
            userEmail: email,
            timestamp: new Date(),
        });

        return NextResponse.json(
            { message: "User saved to DB successfully" },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PATCH(req) {
    try {
        const { email, postId, isLiked, isSaved } = await req.json();

        const usersCollection = await client.db("next_Blog").collection("users");
        let updateOp = {};

        if (isLiked !== undefined) {
            updateOp = isLiked
                ? { $addToSet: { likedPosts: postId } }
                : { $pull: { likedPosts: postId } };
        }

        if (isSaved !== undefined) {
            updateOp = isSaved
                ? { $addToSet: { savedPosts: postId } }
                : { $pull: { savedPosts: postId } };
        }

        const result = await usersCollection.updateOne({ email }, updateOp);

        if (isLiked) {
            const post = await client.db("next_Blog").collection("blogs").findOne({ _id: new ObjectId(postId) });
            await client.db("next_Blog").collection("activities").insertOne({
                type: "liked",
                userEmail: email,
                postId,
                postTitle: post.title,
                timestamp: new Date(),
            });
        }

        return NextResponse.json(
            { success: true, modifiedCount: result.modifiedCount },
            { status: 200 }
        );
    } catch (error) {
        console.error("User update error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        const usersCollection = await client.db("next_Blog").collection("users");
        const user = await usersCollection.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });

    } catch (err) {
        console.error("GET /api/register error:", err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
 
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        const usersCollection = await client.db("next_Blog").collection("users");
        const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json(
            { success: true, deletedCount: result.deletedCount },
            { status: 200 }
        )
    }
    catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}