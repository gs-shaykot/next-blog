import { getSinglePost } from "../../../../../lib/posts";



export default async function SinglePostPage({ params }) {
    const post = await getSinglePost(params.id);

    if (!post) {
        return (
            <div className="mt-18 p-10 bg-red-100">
                ❌ Post not found
            </div>
        );
    }

    return (
        <div className="mt-18 p-10 bg-gray-100">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="mt-4">{post.content}</p>
            <span className="text-sm text-gray-600">Category: {post.category}</span>
        </div>
    );
}
