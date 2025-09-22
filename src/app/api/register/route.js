import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongo";
import { hashPass } from "../../../../utils/hash";

const client = await clientPromise
export async function POST(req) {
    try {
        const { fullname, email, password, photoUrl } = await req.json()
        const usersCollection = await client.db("next_Blog").collection("users");
        const isUserExist = await usersCollection.findOne({ email })
        if (isUserExist) {
            return NextResponse.json({ message: "User Already Existed" }, { status: 400 });
        }
        const hashed = await hashPass(password);
        const data = {
            fullname, email, password: hashed, photoUrl
        }
        console.log(data, "unEncrypted Pass: ", password)
        const res = await usersCollection.insertOne(data)
        return NextResponse.json({ message: "User saved to DB successfully" }, { status: 201 });
    }
    catch (err) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
export async function GET() {
    try {
        const usersCollection = await client.db("next_Blog").collection("users");

        const users = await usersCollection.find().toArray();

        return NextResponse.json(users, { status: 200 });

    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}