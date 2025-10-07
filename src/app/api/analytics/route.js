import clientPromise from "lib/mongo";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("next_Blog");

        const postsCollection = db.collection("blogs");
        const usersCollection = db.collection("users");
        const analyticsCollection = db.collection("analytics_parcentage");
 
        const totalPosts = await postsCollection.countDocuments();

        const viewsAgg = await postsCollection
            .aggregate([{ $group: { _id: null, totalViews: { $sum: "$totalViews" } } }])
            .toArray();
        const totalViews = viewsAgg[0]?.totalViews || 0;

        const likesAgg = await postsCollection
            .aggregate([{ $group: { _id: null, totalLikes: { $sum: "$totalLikes" } } }])
            .toArray();
        const totalLikes = likesAgg[0]?.totalLikes || 0;

        const totalUsers = await usersCollection.countDocuments();
 
        const snapshots = await analyticsCollection
            .find()
            .sort({ month: -1 })
            .limit(2)
            .toArray();

        const [currentMonth, previousMonth] = snapshots;

        const calcPercentChange = (current, previous) =>
            previous ? ((current - previous) / previous) * 100 : 0;

        const cards = {
            totalPosts,
            totalPostsPercent: calcPercentChange(totalPosts, previousMonth?.totalPosts),
            totalViews,
            totalViewsPercent: calcPercentChange(totalViews, previousMonth?.totalViews),
            totalLikes,
            totalLikesPercent: calcPercentChange(totalLikes, previousMonth?.totalLikes),
            totalUsers,
            totalUsersPercent: calcPercentChange(totalUsers, previousMonth?.totalUsers),
        };
 
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
                    cards,
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
