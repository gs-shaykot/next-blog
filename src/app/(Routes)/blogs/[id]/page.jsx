import Image from "next/image";
import { getSinglePost } from "../../../../../lib/posts";

export default async function SinglePostPage({ params }) {
    const post = await getSinglePost(params.id);

    if (!post) {
        return (
            <div className="mt-20 p-10 bg-red-100 text-center rounded-lg">
                ❌ Post not found
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-20 px-6">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-4">
                Home / Blog / <span className="text-gray-800">{post.category}</span>
            </div>

            {/* Category Tag */}
            <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                {post.category}
            </span>

            {/* Title */}
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {post.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-2 text-lg text-gray-600">{post.subtitle}</p>

            {/* Author Info + Meta */}
            <div className="flex items-center gap-3 mt-5">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                        src="https://i.pravatar.cc/150?img=8"
                        alt={post.author}
                        width={40}
                        height={40}
                        className="object-cover"
                    />
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-800">{post.author}</p>
                    <p className="text-xs text-gray-500">
                        {new Date(post.posted_date).toDateString()} • 8 min read
                    </p>
                </div>
                <div className="ml-auto flex items-center gap-5 text-gray-600 text-sm">
                    <span>❤️ {post.totalLikes}</span>
                    <button className="hover:text-blue-600">💾 Save</button>
                    <button className="hover:text-blue-600">🔗 Share</button>
                </div>
            </div>

            {/* Featured Image */}
            <div className="mt-6">
                <Image
                    src={post.post_image}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="rounded-lg w-full object-cover"
                />
            </div>

            {/* Blog Content */}
            <article className="prose prose-lg max-w-none mt-8">
                {post.content.split("\n").map((para, idx) => (
                    <p key={idx}>{para}</p>
                ))}
            </article>

            {/* Hashtags */}
            <div className="mt-6 flex flex-wrap gap-2">
                {post.hashtags.map((tag, idx) => (
                    <span
                        key={idx}
                        className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}