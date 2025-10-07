import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongo";

export async function POST(req) {
    try {
        const { userEmail, postId, postTitle } = await req.json();

        const client = await clientPromise;
        const db = client.db("next_Blog");

        if (!userEmail || !postId || !postTitle) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        await db.collection("activities").insertOne({
            type: "share",
            userEmail,
            postId,
            postTitle,
            timestamp: new Date(),
        });

        return NextResponse.json(
            { success: true, message: "Share activity recorded" },
            { status: 201 }
        );
    } catch (err) {
        console.error("Share API Error:", err);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
