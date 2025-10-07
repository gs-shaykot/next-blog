"use client"
import { useState, useEffect } from 'react';
import { FiFileText, FiEye, FiMessageSquare, FiUsers, FiTrendingUp, FiEdit2, FiTrash2, FiHeart } from 'react-icons/fi'; 

export default function AdminDashboardPage() {
  const [allAnalysis, setAllAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/analytics");
        const data = await res.json();
        setAllAnalysis(data.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Technology: '1',
      Design: '2',
      Business: '3',
      Lifestyle: '4',
      Travel: '5'
    };
    return icons[category] || '•';
  };

  const getCategoryColor = (category) => {
    const colors = {
      Technology: 'bg-blue-500',
      Design: 'bg-purple-500',
      Business: 'bg-indigo-500',
      Lifestyle: 'bg-pink-500',
      Travel: 'bg-green-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (!allAnalysis) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 bg-gray-50">
        Failed to load analytics data. Please Check Your internet or Reload
      </div>
    );
  }

  const { cards, popularCategories, recentPosts } = allAnalysis;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition">
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Posts Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-blue-100 text-sm mb-1">Total Posts</p>
                <h2 className="text-4xl font-bold">{cards.totalPosts}</h2>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <FiFileText className="w-6 h-6 text-black" />
              </div>
            </div>
            <p className="text-blue-100 text-sm">
              <FiTrendingUp className="w-3 h-3 inline mr-1" />
              12% this month
            </p>
          </div>

          {/* Total Views Card */}
          <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-100 text-sm mb-1">Total Views</p>
                <h2 className="text-4xl font-bold">{formatNumber(cards.totalViews)}</h2>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <FiEye className="w-6 h-6 text-black" />
              </div>
            </div>
            <p className="text-gray-100 text-sm">
              <FiTrendingUp className="w-3 h-3 inline mr-1" />
              8% this month
            </p>
          </div>

          {/* Comments/Likes Card */}
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-indigo-100 text-sm mb-1">Likes</p>
                <h2 className="text-4xl font-bold">{formatNumber(cards.totalLikes)}</h2>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <FiHeart className="w-6 h-6 text-black" />
              </div>
            </div>
            <p className="text-indigo-100 text-sm">
              <FiTrendingUp className="w-3 h-3 inline mr-1" />
              15% this month
            </p>
          </div>

          {/* Subscribers Card */}
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-100 text-sm mb-1">Subscribers</p>
                <h2 className="text-4xl font-bold">{formatNumber(cards.totalUsers)}</h2>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <FiUsers className="w-6 h-6 text-black" />
              </div>
            </div>
            <p className="text-gray-100 text-sm">
              <FiTrendingUp className="w-3 h-3 inline mr-1" />
              22% this month
            </p>
          </div>
        </div>

        {/* Popular Categories and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Popular Categories */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Categories</h2>
            <div className="space-y-4">
              {popularCategories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`${getCategoryColor(cat.category)} w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold`}>
                      {getCategoryIcon(cat.category)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{cat.category}</p>
                      <p className="text-sm text-gray-500">{cat.postCount} posts</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatNumber(cat.totalLikes)}</p>
                    <p className="text-sm text-green-600">+37%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentPosts.slice(0, 4).map((post, index) => {
                const activities = [
                  { icon: FiMessageSquare, text: 'New comment on', color: 'text-blue-600' },
                  { icon: FiUsers, text: 'Post liked by 15 users', color: 'text-red-600' },
                  { icon: FiUsers, text: 'New subscriber', color: 'text-green-600' },
                  { icon: FiTrendingUp, text: 'Post shared', color: 'text-purple-600' }
                ];
                const activity = activities[index % activities.length];
                const Icon = activity.icon;

                return (
                  <div key={post._id} className="flex items-start space-x-3">
                    <div className={`${activity.color} mt-1`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="text-gray-600">{activity.text}</span> {post.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{formatDate(post.posted_date)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Posts</h2>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post._id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition">
                <div className="flex items-center space-x-4 flex-1">
                  <img
                    src={post.post_image}
                    alt={post.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>
                    <p className="text-sm text-gray-500">
                      {post.posted_date} • {post.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}