"use client";
import PopularCategory from "@/app/(Routes)/(Dashboard)/AdminDashboard/(components)/PopularCategory";
import RecentActivitiy from "@/app/(Routes)/(Dashboard)/AdminDashboard/(components)/RecentActivitiy";
import RecentPosts from "@/app/(Routes)/(Dashboard)/AdminDashboard/(components)/RecentPosts";
import StatsCards from "@/app/(Routes)/(Dashboard)/AdminDashboard/(components)/StatsCards";
import { useActivityQuery } from "lib/useActivityQuery";
import { useAnalyticsData } from "lib/useAnalyticsQuery";
import { FileText, Eye, Heart, Users } from "lucide-react";

export default function AdminDashboard() {
    const { data, isLoading, } = useAnalyticsData();
    const { data: activities } = useActivityQuery();
    if (isLoading) return <p className="text-center mt-10">Loading analytics...</p>;

    const { cards, popularCategories, recentPosts } = data.data || {};

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
            <StatsCards cardItems={cardItems} />

            {/* Categories + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Popular Categories */}
                <PopularCategory popularCategories={popularCategories} />

                {/* Recent Activity */}
                <RecentActivitiy activities={activities} />
            </div>

            {/* Recent Posts */}
            <RecentPosts recentPosts={recentPosts} />
        </div>
    );
}
