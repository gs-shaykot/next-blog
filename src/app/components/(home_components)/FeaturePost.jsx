import axios from 'axios'
import Image from 'next/image'
import React from 'react'


export default function FeaturedPost(featurePosts) {
    return (
        <div>
            <div className="text-center my-10">
                <div className="inline-block">
                    <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-slate-800 bg-clip-text text-transparent">Featured Stories
                    </h2>
                    <div className="h-1 w-36 bg-gradient-to-r from-blue-600 to-slate-700 mx-auto rounded-full animate-pulse">
                    </div>
                </div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-5 leading-relaxed">
                    Our most popular and impactful articles, handpicked for you
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-5">
                <section className="grid md:grid-cols-5 gap-10">
                    {featurePosts.featurePosts.map((post, index) => (
                        <div
                            key={post._id}
                            className={`rounded-2xl overflow-hidden shadow hover:shadow-lg transition bg-white 
                            ${index === 0 ? "md:col-span-3" : "md:col-span-1"}`}
                        >
                            {/* Image */}
                            <div className="relative">
                                <Image
                                    width={500}
                                    height={300}
                                    src={post.post_image}
                                    alt={post.title}
                                    className={`w-full object-cover ${index === 0 ? "h-72" : "h-56"}`}
                                />
                                <span className="absolute top-3 left-3 bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                                    {post.category}
                                </span>
                            </div>

                            {/* Card Content */}
                            <div className="p-5 flex flex-col gap-4">
                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <Image
                                        src="https://i.pravatar.cc/40"
                                        alt={post.author}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <h4 className="font-medium">{post.author}</h4>
                                        <p className="text-sm text-gray-500">
                                            {new Date(post.posted_date).toISOString().split("T")[0]} • 8 min read
                                        </p>
                                    </div>
                                </div>

                                {/* Title */}
                                <h2
                                    className={`leading-snug font-semibold ${index === 0 ? "text-2xl" : "text-lg"
                                        }`}
                                >
                                    {post.title}
                                </h2>

                                {/* Short Content */}
                                <p className="text-gray-600 text-sm">
                                    {post.content.slice(0, index === 0 ? 200 : 100)}...
                                </p>

                                {/* Footer */}
                                <div className="flex justify-between items-center text-sm text-gray-500 mt-3">
                                    <div className="flex items-center gap-2">
                                        <span>❤️ {post.totalLikes}</span>
                                        <span>💬 28</span>
                                    </div>
                                    <a
                                        href={`/posts/${post._id}`}
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        Read More →
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>


        </div>
    )
}
