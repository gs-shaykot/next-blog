import clientPromise from "lib/mongo";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const client = await clientPromise;
        const activitiesCollection = client.db("next_Blog").collection("activities");

        const data = await activitiesCollection
            .find({})
            .sort({ timestamp: -1 })
            .limit(4)
            .toArray();

        return NextResponse.json(
            data,
            { status: 200 }
        );
    } catch (err) {
        console.error("Error fetching activities:", err);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
