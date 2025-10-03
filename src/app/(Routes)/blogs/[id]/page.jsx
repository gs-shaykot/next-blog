import Image from "next/image";
import { getSinglePost } from "../../../../../lib/posts";
import { FaRegHeart, FaRegBookmark, FaShareAlt } from "react-icons/fa";
import { FaXTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import axios from "axios";
import Swal from "sweetalert2";
import SavePostButton from "./SavePostButton";
import SharePostButton from "@/app/(Routes)/blogs/[id]/SharePostButton";

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
            <div className="text-sm text-gray-500 font-semibold mb-10">
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
                    <button className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-600">
                        <FaRegBookmark /> {post.totalLikes}
                    </button>
                    <SavePostButton post={{
                        title: post.title,
                        post_image: post.post_image,
                        category: post.category,
                        author: post.author,
                        posted_date: post.posted_date,
                        totalLikes: post.totalLikes,
                        content: post.content,
                    }} />
                    <SharePostButton />

                </div>
            </div>

            {/* Featured Image */}
            <div className="mt-6">
                <Image
                    src={post.post_image}
                    alt={post.title}
                    width={800}
                    height={300}
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
            <div className="my-6 flex flex-wrap gap-2">
                {post.hashtags.map((tag, idx) => (
                    <span
                        key={idx}
                        className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Social Share Buttons */}
            <div className="border-t border-b border-gray-200 py-6 mb-12">
                <div className="flex items-center justify-between">
                    <p className="text-gray-600 font-medium">
                        Share this article:
                    </p>
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
                            <FaXTwitter />
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors cursor-pointer">
                            <FaFacebookF />
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors cursor-pointer">
                            <FaLinkedinIn />
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors cursor-pointer">
                            <FaShareAlt />
                        </button>
                    </div>
                </div>
            </div>

            {/* author info */}
            <div className="bg-gray-50 rounded-xl p-8 mb-12">
                <div className="flex items-start space-x-6">
                    <Image width={80} height={80} alt="Sarah Johnson" className="rounded-full object-cover object-top" src="https://i.pravatar.cc/40" />
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">About {post.author}</h3>
                        <p className="text-gray-600 mb-4">Senior Web Developer and Technology Writer with over 8 years of experience in building scalable web applications. Passionate about sharing knowledge and helping developers stay current with the latest trends and best practices.</p>
                        <div className="flex items-center space-x-4">
                            <button className="text-blue-600 hover:text-blue-700 cursor-pointer">
                                <i className="ri-twitter-line mr-1"></i>Follow on Twitter
                            </button>
                            <button className="text-blue-600 hover:text-blue-700 cursor-pointer">
                                <i className="ri-linkedin-line mr-1"></i>Connect on LinkedIn</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}