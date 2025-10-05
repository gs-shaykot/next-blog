import { NextResponse } from 'next/server'
import React from 'react'
import clientPromise from '../../../../../lib/mongo';
import { getHomeData } from '../../../../../lib/posts';
const client = await clientPromise
export async function GET() {
    try {
        const data = await getHomeData();
        return NextResponse(dara, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
