import { NextResponse } from "next/server"; 
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongo";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("next_Blog");

        const postsCollection = db.collection("blogs");
        const usersCollection = db.collection("users");

        // 1️.Total Posts
        const totalPosts = await postsCollection.countDocuments();

        // 2️.Total Views
        const viewsAgg = await postsCollection
            .aggregate([{ $group: { _id: null, totalViews: { $sum: "$totalViews" } } }])
            .toArray();
        const totalViews = viewsAgg[0]?.totalViews || 0;

        // 3️.Total Likes
        const likesAgg = await postsCollection
            .aggregate([{ $group: { _id: null, totalLikes: { $sum: "$totalLikes" } } }])
            .toArray();
        const totalLikes = likesAgg[0]?.totalLikes || 0;

        // 4️.Total Users
        const totalUsers = await usersCollection.countDocuments();

        // 5. POPULAR CATEGORIES 
        const popularCategories = await postsCollection
            .aggregate([
                {
                    $group: {
                        _id: "$category",
                        totalLikes: { $sum: "$totalLikes" },
                        postCount: { $sum: 1 },
                    },
                },
                { $sort: { totalLikes: -1 } },
                { $limit: 4 },
            ])
            .toArray();

        const categories = popularCategories.map((cat, i) => ({
            id: i + 1,
            category: cat._id,
            totalLikes: cat.totalLikes,
            postCount: cat.postCount,
        }));

        // 6. RECENT POSTS 
        const recentPosts = await postsCollection
            .find({})
            .sort({ posted_date: -1 })
            .limit(5)
            .project({
                _id: 1,
                title: 1,
                category: 1,
                posted_date: 1,
                post_image: 1,
                totalLikes: 1, 
            })
            .toArray();

        return NextResponse.json(
            {
                success: true,
                data: {
                    cards: {
                        totalPosts,
                        totalViews,
                        totalLikes,
                        totalUsers,
                    },
                    popularCategories: categories,
                    recentPosts,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Analytics API Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
