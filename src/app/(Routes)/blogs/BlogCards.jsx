import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import removeMd from 'remove-markdown'

export default function BlogCards({ post }) {
  const themeMode = useSelector((mode) => mode.themeToggle.mode)

  return (
    <div
      className={`group transition-transform duration-300 hover:cursor-pointer hover:scale-105 hover:shadow-xl card bg-base-100 shadow-lg relative w-full sm:w-80 md:w-96 flex flex-col justify-between min-h-[500px] 
    ${themeMode === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
    >

      <figure>
        <Image
          width={400}
          height={250}
          src={post.post_image}
          alt="post image"
          className={`transform duration-300 group-hover:scale-105 w-full h-48 object-cover`}
        />
      </figure>

      {/* Author */}
      <div className="flex items-center gap-3 px-4 py-2">
        <Image
          src="https://i.pravatar.cc/40"
          alt={post.author}
          width={40}
          height={40}
          className={`w-10 h-10 rounded-full`}
        />
        <div>
          <h4 className="font-medium">{post.author}</h4>
          <p className="text-sm text-gray-400">
            {new Date(post.posted_date).toISOString().split("T")[0]} • 8 min read
          </p>
        </div>
      </div>

      <div className="card-body !pt-2">
        {/* titles & contents */}
        <h2 className="card-title text-lg md:text-xl group-hover:text-blue-700">{post.title}</h2>
        <p className="text-gray-600 whitespace-pre-line">
          {removeMd(post.content).slice(0, 95)}...
        </p>

        {/* Hash tags */}
        <div>
          {
            post.hashtags.slice(0, 3).map((hashtag, index) => (
              <span key={index} className="mr-2 text-gray-500 p-1 bg-gray-200 text-xs">
                {hashtag}
              </span>
            ))
          }
        </div>

        {/* like & read more buttons */}
        <div className="card-actions justify-between items-center">
          <div className="flex justify-between items-center text-sm text-gray-500 mt-3 w-full">
            <div className="flex items-center gap-2">
              <span>👍 {post.totalLikes}</span>
              <span>💬 28</span>
            </div>
            <Link href={`/blogs/${post._id}`} className="px-2 py-1 rounded-md group-hover:bg-blue-100 group-hover:text-[#2563eb] bg-transparent border-0 shadow-none text-gray-600">
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
