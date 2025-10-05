"use client"
import React from 'react'
import Image from "next/image";
import { FaRegHeart, FaRegBookmark, FaShareAlt } from "react-icons/fa";
import { FaXTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import SavePostButton from "./SavePostButton";
import SharePostButton from "@/app/(Routes)/blogs/[id]/SharePostButton";
import { useSelector } from "react-redux";
import LikePostButton from '@/app/(Routes)/blogs/[id]/LikePostButton';

export default function BlogDetails({ post }) {

    const themeMode = useSelector((mode) => mode.themeToggle.mode)

    return (
        <div className={`${themeMode === "dark" ? "bg-gray-900 !text-white" : "bg-white !text-black"}`}>
            <div className="max-w-4xl mx-auto mt-18 p-6">

                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 font-semibold py-5">
                    Home / Blog / <span className={`${themeMode === "dark" ? "!text-gray-400" : "! text-gray-600"}`}>{post.category}</span>
                </div>

                {/* Category Tag */}
                <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                    {post.category}
                </span>

                {/* Title */}
                <h1 className={`mt-3 text-3xl md:text-4xl font-bold  ${themeMode === "dark" ? "!text-white" : "!text-black"}  text-gray-900 leading-tight`}>
                    {post.title}
                </h1>

                {/* Subtitle */}
                <p className={`${themeMode === "dark" ? "!text-gray-400" : "!text-gray-600"} mt-2 text-lg `}>{post.subtitle}</p>

                {/* Author Info + like-share-save */}
                <div className={`flex items-center border-y ${themeMode === "dark" ? "border-gray-700" : "border-gray-200"}  gap-3 my-6 py-5`}>
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
                        <p className={`${themeMode === "dark" ? "text-gray-200" : "text-gray-800"} text-sm font-semibold`}>{post.author}</p>
                        <p className={`${themeMode === "dark" ? "text-gray-400" : "text-gray-800"} text-xs`}>
                            {new Date(post.posted_date).toDateString()} • 8 min read
                        </p>
                    </div>

                    <div className={`ml-auto flex items-center gap-5 ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                        <LikePostButton postId={post._id} initialLikes={post.totalLikes} />

                        <SavePostButton id={post._id} />

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
                            className={`px-3 py-1 text-xs ${themeMode === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-700'}  rounded-full`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Social Share Buttons */}
                <div className="border-y border-gray-200 py-6 mb-12">
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
                <div className={`${themeMode === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-8 mb-12`}>
                    <div className="flex items-start space-x-6">
                        <Image width={80} height={80} alt="Sarah Johnson" className="rounded-full object-cover object-top" src="https://i.pravatar.cc/40" />
                        <div className="flex-1">
                            <h3 className={`${themeMode === 'dark' ? 'text-white' : 'text-gray-900'} text-xl font-bold mb-2`}>About {post.author}</h3>
                            <p className={`${themeMode === 'dark' ? 'text-gray-400':'text-gray-600'} mb-4`}>Senior Web Developer and Technology Writer with over 8 years of experience in building scalable web applications. Passionate about sharing knowledge and helping developers stay current with the latest trends and best practices.</p>
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
        </div>
    )
}
