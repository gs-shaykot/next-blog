import clientPromise from "lib/mongo";
import { NextResponse } from "next/server";

const client = await clientPromise;
const ParcenCollection = await client.db("next_Blog").collection("analytics_parcentage");

export async function GET(req) {
    try {
        const result = await ParcenCollection.find({}).toArray()

        return NextResponse.json(result, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}