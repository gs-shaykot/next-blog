import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; 
import clientPromise from "lib/mongo";

export async function GET(req) {
    try {
        const client = await clientPromise;
        const usersCollection = client.db("next_Blog").collection("users");

        const users = await usersCollection.find({}).sort({ createdAt: -1 }).toArray();
        return NextResponse.json(users, { status: 200 });

    } catch (err) {
        console.error("GET /api/register error:", err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        const client = await clientPromise;
        const usersCollection = client.db("next_Blog").collection("users");

        const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, deletedCount: result.deletedCount }, { status: 200 });

    } catch (error) {
        console.error("DELETE /api/register error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        const { id, ...updateFields } = await req.json();

        const client = await clientPromise;
        const usersCollection = client.db("next_Blog").collection("users");
        const result = await usersCollection.updateOne(
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