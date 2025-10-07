import clientPromise from "lib/mongo";



export default async function snapshotAnalytics() {
    try {
        const client = await clientPromise;
        const db = client.db("next_Blog");

        const postsCollection = db.collection("blogs");
        const usersCollection = db.collection("users");
        const analyticsCollection = db.collection("analytics_parcentage");

        const totalPosts = await postsCollection.countDocuments();

        const totalViewsAgg = await postsCollection
            .aggregate([{ $group: { _id: null, totalViews: { $sum: "$totalViews" } } }])
            .toArray();

        const totalViews = totalViewsAgg[0]?.totalViews || 0;

        const totalLikesAgg = await postsCollection
            .aggregate([{ $group: { _id: null, totalLikes: { $sum: "$totalLikes" } } }])
            .toArray();
        const totalLikes = totalLikesAgg[0]?.totalLikes || 0;

        const totalUsers = await usersCollection.countDocuments();

        await analyticsCollection.insertOne({
            month: new Date().toISOString().slice(0, 7),
            totalPosts,
            totalViews,
            totalLikes,
            totalUsers,
        });
 
    } catch (error) {
        console.error("Error creating monthly analytics snapshot:", error);
    }
}
