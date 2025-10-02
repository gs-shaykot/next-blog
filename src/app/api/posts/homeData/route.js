import { NextResponse } from 'next/server'
import React from 'react'
import clientPromise from '../../../../../lib/mongo';
import { getHomeData } from '../../../../../lib/posts';
const client = await clientPromise
export async function GET() {
    try {
        // const postsCollection = await client.db("next_Blog").collection("blogs");

        // const featurePosts = await postsCollection.find({ isFeatured: true }).limit(3).toArray();
        // const latestPosts = await postsCollection.find().sort({ _id: -1 }).limit(4).toArray();
        // const categoriAgg = await postsCollection.aggregate([
        //     {
        //         $group: {
        //             _id: "$category",
        //             count: { $sum: 1 },
        //         }
        //     },
        //     {
        //         $sort: { count: -1 },
        //     },
        //     { $limit: 5 },
        // ]).toArray();

        // const serialized = (posts) => posts.map((p) => ({ ...p, _id: String(p._id) }));
        // return NextResponse.json({
        //     featurePosts: serialized(featurePosts),
        //     latestPosts: serialized(latestPosts),
        //     categories: categoriAgg.map(c => ({ name: c._id, count: c.count })),
        // }, { status: 200 });

        const data = await getHomeData();
        return NextResponse(dara, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
