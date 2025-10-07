// here is the useAnalyticsData()
"use client";

import { useAnalyticsData } from "lib/useAnalyticsQuery";
import { FileText, Eye, Heart, Users } from "lucide-react";
import Image from "next/image";
import { FaThumbsUp } from "react-icons/fa";

export default function AdminDashboard() {
    const { data, isLoading, refetch } = useAnalyticsData();

    if (isLoading) return <p className="text-center mt-10">Loading analytics...</p>;

    const { cards, popularCategories, recentPosts } = data.data || {};
    console.log(data.data)

    const cardItems = [
        {
            title: "Total Posts",
            value: cards?.totalPosts,
            percent: cards?.totalPostsPercent.toFixed(2),
            icon: <FileText className="w-6 h-6" />,
            color: "bg-blue-600",
        },
        {
            title: "Total Views",
            value: cards?.totalViews.toLocaleString(),
            percent: cards?.totalViewsPercent.toFixed(2),
            icon: <Eye className="w-6 h-6" />,
            color: "bg-gray-700",
        },
        {
            title: "Likes",
            value: cards?.totalLikes.toLocaleString(),
            percent: cards?.totalLikesPercent.toFixed(2),
            icon: <Heart className="w-6 h-6" />,
            color: "bg-indigo-600",
        },
        {
            title: "Subscribers",
            value: cards?.totalUsers,
            percent: cards?.totalUsersPercent.toFixed(2),
            icon: <Users className="w-6 h-6" />,
            color: "bg-gray-900",
        },
    ];

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cardItems.map((card, i) => (
                    <div
                        key={i}
                        className={`p-6 text-white rounded-xl shadow-sm ${card.color}`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <p>{card.title}</p>
                            {card.icon}
                        </div>
                        <h2 className="text-3xl font-bold">{card.value}</h2>
                        <p className="text-sm opacity-80 mt-1">↗ {card.percent}% this month</p>
                    </div>
                ))}
            </div>

            {/* Categories + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Popular Categories */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <h2 className="font-semibold text-lg mb-4">Popular Categories</h2>
                    <ul className="space-y-3">
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

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <h2 className="font-semibold text-lg mb-4">Recent Activity</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start space-x-3 text-sm">
                            <FileText className="w-4 h-4 text-blue-500 mt-1" />
                            <p>
                                New comment on <b>Understanding AI-Powered Coding Tools</b>
                                <br />
                                <span className="text-gray-500 text-xs">1 month ago</span>
                            </p>
                        </li>
                        <li className="flex items-start space-x-3 text-sm">
                            <Heart className="w-4 h-4 text-pink-500 mt-1" />
                            <p>
                                Post liked by 15 users <b>Top Marketing Strategies in 2025</b>
                                <br />
                                <span className="text-gray-500 text-xs">1 month ago</span>
                            </p>
                        </li>
                        <li className="flex items-start space-x-3 text-sm">
                            <Users className="w-4 h-4 text-green-500 mt-1" />
                            <p>
                                New subscriber <b>Cultural Experiences Around the World</b>
                                <br />
                                <span className="text-gray-500 text-xs">3 months ago</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Recent Posts */}
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
        </div>
    );
}
