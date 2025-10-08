import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import removeMd from 'remove-markdown'
import { FaStar } from "react-icons/fa6";

export default function BlogCards({ post }) {
  const themeMode = useSelector((mode) => mode.themeToggle.mode) 
  
  return (
    <div
      className={`group relative top-0 transition-all duration-300 ease-out hover:-top-2 hover:shadow-xl card bg-base-100 shadow-lg w-full sm:w-80 md:w-96 max-h-[480px] overflow-hidden rounded-2xl ${themeMode === "dark"
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
        }`}
    >
      {/* Image & Badges */}
      <figure className="relative w-full h-48 overflow-hidden">
        <Image
          width={400}
          height={250}
          src={post.post_image}
          alt="post image"
          className="w-full h-full object-cover transform duration-300 ease-out group-hover:scale-105"
        />
        <div>
          <span className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
          {post.isFeatured && (
            <span className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex justify-center items-center gap-1">
              <FaStar className="text-xs" />
              Featured
            </span>
          )}
        </div>
      </figure>

      {/* Author Section */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <Image
          src="https://i.pravatar.cc/40"
          alt={post.author}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h4 className="font-medium text-sm md:text-base">{post.author}</h4>
          <p className="text-xs text-gray-400">
            {new Date(post.posted_date).toISOString().split("T")[0]} • 8 min read
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col justify-between h-[260px] px-4 py-3">
        {/* Title & Content */}
        <div>
          <h2 className="card-title text-lg md:text-xl group-hover:text-blue-700 line-clamp-2 leading-snug">
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-3">
            {removeMd(post.content).slice(0, 95)}...
          </p>
        </div>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {post.hashtags.slice(0, 3).map((hashtag, index) => (
            <span
              key={index}
              className={`${themeMode === "dark"
                  ? "bg-gray-900 text-gray-200"
                  : "bg-gray-200 text-gray-600"
                } px-2 py-1 rounded-lg text-xs`}
            >
              {hashtag}
            </span>
          ))}
        </div>

        {/* Like & Read More */}
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          <div className="flex items-center gap-3">
            <span>👍 {post.totalLikes}</span>
            <span>💬 28</span>
          </div>
          <Link
            href={`/blogs/${post._id}`}
            className="px-3 py-1 rounded-md text-blue-600 font-medium hover:bg-blue-50 dark:hover:bg-gray-700 transition"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );

}
