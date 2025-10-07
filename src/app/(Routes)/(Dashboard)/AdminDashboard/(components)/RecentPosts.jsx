import Image from 'next/image'
import React from 'react'

export default function RecentPosts({ recentPosts }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
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
                                <p className="text-xs text-gray-500">
                                    {post.posted_date} · {post.category}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="text-gray-500 hover:text-blue-500">
                                ✏️
                            </button>
                            <button className="text-gray-500 hover:text-red-500">
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
