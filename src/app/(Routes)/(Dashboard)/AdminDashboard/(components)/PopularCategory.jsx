import React from 'react'
import { FaThumbsUp } from 'react-icons/fa'

export default function PopularCategory({ popularCategories }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm ">
            <div className='border-b border-gray-600'>
                <h2 className="font-semibold text-lg p-3">Popular Categories</h2>
            </div>
            <ul className="space-y-3 p-3">
                {popularCategories?.map((cat, index) => (
                    <li
                        key={cat.id}
                        className="flex justify-between items-center border-b pb-2 last:border-b-0"
                    >
                        <div className="flex items-center space-x-3">
                            <span
                                className={`w-6 h-6 flex items-center justify-center text-white rounded-full text-sm font-semibold ${index === 0
                                    ? "bg-blue-500"
                                    : index === 1
                                        ? "bg-pink-500"
                                        : index === 2
                                            ? "bg-purple-500"
                                            : "bg-indigo-500"
                                    }`}
                            >
                                {index + 1}
                            </span>
                            <div>
                                <p className="font-medium">{cat.category}</p>
                                <p className="text-xs text-gray-500">{cat.postCount} posts</p>
                            </div>
                        </div>
                        <div className="text-right flex justify-center items-center gap-1 text-green-700">
                            <FaThumbsUp />
                            <p className="text-sm font-semibold">
                                {cat.totalLikes.toLocaleString()}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
