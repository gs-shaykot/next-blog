import { ObjectId } from "mongodb";
import clientPromise from "./mongo";

export async function getHomeData() {
    const client = await clientPromise;

    const postsCollection = await client.db("next_Blog").collection("blogs");

    const featurePosts = await postsCollection.find({ isFeatured: true }).limit(3).toArray();
    const latestPosts = await postsCollection.find().sort({ _id: -1 }).limit(4).toArray();
    const categoriAgg = await postsCollection.aggregate([
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 },
            }
        },
        {
            $sort: { count: -1 },
        },
        { $limit: 5 },
    ]).toArray();

    const serialized = (posts) => posts.map((p) => ({ ...p, _id: String(p._id) }));
    return {
        featurePosts: serialized(featurePosts),
        latestPosts: serialized(latestPosts),
        categories: categoriAgg.map(c => ({ name: c._id, count: c.count })),
    }
}

export async function getPaginatedPosts(limit = 6, page = 1, category) {
    const client = await clientPromise;

    const postsCollection = await client.db("next_Blog").collection("blogs");

    const query = category && category !== "All" ? { category } : {};


    const totalPosts = await postsCollection.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await postsCollection
        .find(query)
        .sort({ posted_date: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();

    const serialized = posts.map((p) => ({ ...p, _id: String(p._id) }));

    return {
        posts: serialized,
        totalPages
    }
}


export async function getSinglePost(id) {
    const client = await clientPromise;

    if (!ObjectId.isValid(id)) {
        return null;
    }

    const postsCollection = await client.db("next_Blog").collection("blogs");

    const post = await postsCollection.findOne({ _id: ObjectId.createFromHexString(id) });

    if (!post) return null;
    return { ...post, _id: post._id.toString() };
}

