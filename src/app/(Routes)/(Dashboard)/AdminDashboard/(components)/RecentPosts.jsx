import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';

export default function RecentPosts({ recentPosts }) {

  const themeMode = useSelector((mode) => mode.themeToggle.mode);

    return (
        <div className={`${themeMode === 'dark' ? 'bg-gray-700 !text-white' : 'bg-white'} rounded-xl shadow-sm p-6`}>
            <h2 className="font-semibold text-lg mb-4">Recent Posts</h2>
            <div className="space-y-4">
                {recentPosts?.map((post) => (
                    <div key={post._id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Image
                                src={post.post_image}
                                alt={post.title}
                                width={60}
                                height={60}
                                className="rounded-md object-cover"
                            />
                            <div>
                                <h3 className="font-medium">{post.title}</h3>
                                <p className={`${themeMode === 'dark' ? 'text-gray-300' : 'text-gray-500'} text-xs`}>
                                    {post.posted_date} · {post.category}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Link href={`/blogs/${post._id}`}>
                                <button className="text-gray-500 hover:text-blue-500 cursor-pointer">
                                    <FaExternalLinkAlt />
                                </button>
                            </Link>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
