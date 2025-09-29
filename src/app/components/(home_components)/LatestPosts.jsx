import React from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import removeMd from 'remove-markdown';
import Image from 'next/image';

export default function LatestPosts({ latestPosts }) {
    return (
        <div className='max-w-7xl mx-auto px-5 py-10'>
            <div className="text-center my-10">
                <div className="inline-block">
                    <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-slate-800 bg-clip-text text-transparent">Latest Articles
                    </h2>
                    <div className="h-1 w-36 bg-gradient-to-r from-blue-600 to-indigo-700 mx-auto rounded-full animate-pulse">
                    </div>
                </div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-5 leading-relaxed">
                    Our most popular and impactful articles, handpicked for you
                </p>
            </div>
            <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 md:gap-10">
                {latestPosts.map((post, idx) => (
                    <div
                        key={idx}
                        className={`group transition-transform duration-300 hover:scale-105 hover:shadow-xl card bg-base-100 shadow-lg relative 
        w-full sm:w-80 md:w-96 ${idx % 2 === 0 ? 'top-0' : 'top-5'}`}
                    >
                        <figure>
                            <img
                                src={post.post_image}
                                alt="post image"
                                className="w-full h-48 object-cover"
                            />
                        </figure>

                        {/* Author */}
                        <div className="flex items-center gap-3 px-4 py-2">
                            <Image
                                src="https://i.pravatar.cc/40"
                                alt={post.author}
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h4 className="font-medium">{post.author}</h4>
                                <p className="text-sm text-gray-400">
                                    {new Date(post.posted_date).toISOString().split("T")[0]} • 8 min read
                                </p>
                            </div>
                        </div>

                        <div className="card-body !pt-2">
                            <h2 className="card-title text-lg md:text-xl">{post.title}</h2>
                            <p className="text-gray-600 whitespace-pre-line">
                                {removeMd(post.content).slice(0, 80)}...
                            </p>
                            <div className="card-actions justify-between items-center">
                                <div className="flex justify-between items-center text-sm text-gray-500 mt-3 w-full">
                                    <div className="flex items-center gap-2">
                                        <span>👍 {post.totalLikes}</span>
                                        <span>💬 28</span>
                                    </div>
                                    <button className="px-2 py-1 rounded-md group-hover:bg-blue-100 group-hover:text-[#2563eb] bg-transparent border-0 shadow-none text-gray-600">
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full flex justify-center items-center  mt-16">
                <button
                    className='px-4 py-2 bg-gradient-to-r from-blue-600 hover:from-blue-700 to-indigo-700 hover:to-indigo-800 text-white transform hover:scale-105 transition duration-200 rounded-md shadow-lg'>
                    View All Posts →
                </button>
            </div>

        </div>
    )
}
