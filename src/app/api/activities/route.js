import clientPromise from "lib/mongo";
import { NextResponse } from "next/server";

const client = await clientPromise;
const activitiesCollection = await client.db("next_Blog").collection("activities");

export async function GET(req) {
    try {
        const result = await activitiesCollection.find({}).toArray()

        return NextResponse.json(result, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}