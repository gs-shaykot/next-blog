import { getSinglePost } from "../../../../../lib/posts"; 
import BlogDetails from "@/app/(Routes)/blogs/[id]/BlogDetails";

export default async function SinglePostPage({ params }) {
    const { id } = await params;
    const post = await getSinglePost(id);

    if (!post) {
        return (
            <div className="mt-20 p-10 bg-red-100 text-center rounded-lg">
                ❌ Post not found
            </div>
        );
    }

    return (
        <BlogDetails post={post} />
    );
}