"use client"
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux';
import removeMd from "remove-markdown";

export default function FeaturedPost(featurePosts) {

    const themeMode = useSelector((mode) => mode.themeToggle.mode)
    return (
        <div className={`${themeMode === "dark" ? "bg-gray-900" : "bg-white"}`}>
            <div className={`max-w-7xl mx-auto px-5 ${themeMode === "dark" ? "!text-white" : "!text-black"}`}>
                <div className="text-center py-10">
                    <div className="inline-block">
                        <h2
                            className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent
                            ${themeMode === "dark"
                                    ? "from-white via-blue-400 to-gray-300"
                                    : "from-gray-900 via-blue-800 to-slate-800"
                                }`}
                        >
                            Featured Stories
                        </h2>
                        <div className="h-1 w-36 bg-gradient-to-r from-blue-600 to-indigo-700 mx-auto rounded-full animate-pulse">
                        </div>
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-5 leading-relaxed">
                        Our most popular and impactful articles, handpicked for you
                    </p>
                </div>
                <div className="max-w-7xl mx-auto px-5">
                    <section className="grid md:grid-cols-12 gap-10 pb-10">
                        {featurePosts.featurePosts.map((post, index) => (
                            <div
                                key={post._id}
                                className={`group rounded-2xl overflow-hidden shadow cursor-pointer
                                hover:shadow-lg active:shadow-lg
                                transition-all transform duration-300
                                hover:scale-105 active:scale-[1.02]
                                ${index === 0 ? "md:col-span-6" : "md:col-span-3"}
                                ${themeMode === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
                            >
                                {/* Image */}
                                <div className="relative">
                                    <Image
                                        width={500}
                                        height={300}
                                        src={post.post_image}
                                        alt={post.title}
                                        className={`transform duration-300 group-hover:scale-105 group-active:scale-105 w-full object-cover ${index === 0 ? "h-72" : "h-56"}`}
                                    />
                                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                                        {post.category}
                                    </span>
                                </div>
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
                                            <p className={`text-sm ${themeMode === "dark" ? "text-gray-300" : "text-gray-500"}`}>
                                                {new Date(post.posted_date).toISOString().split("T")[0]} • 8 min read
                                            </p>
                                        </div>
                                    </div>
                                    {/* Title */}
                                    <h2
                                        className={`font-semibold group-hover:text-hoverTxt ${index === 0 ? "text-2xl" : "text-lg"}`}
                                    >
                                        {post.title}
                                    </h2>
                                    <p className="text-black-300 whitespace-pre-line">
                                        {removeMd(post.content).slice(0, 120)}...
                                    </p>
                                    <div className="flex justify-between items-center text-sm text-gray-500 mt-3">
                                        <div className="flex items-center gap-2">
                                            <span>👍 {post.totalLikes}</span>
                                            <span>💬 28</span>
                                        </div>
                                        <Link href={`/blogs/${post._id}`} className="px-2 py-1 rounded-md group-hover:bg-blue-100 group-active:bg-blue-100 group-hover:text-black bg-transparent border-0 shadow-none text-gray-600">
                                            Read More →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    )
}
