"use client";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";

export default function ProfileSidebar() {

  const themeMode = useSelector((mode) => mode.themeToggle.mode);
  return (
    <div> 
      <div className={`${themeMode === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white'} mb-4 rounded-xl shadow p-5 relative group`}>
        <h3 className="text-lg font-semibold mb-4">Statistics</h3>
 
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="relative">
            <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              Static - but can be dynamic
              <div className="absolute -bottom-1 right-6 w-2 h-2 bg-gray-800 transform rotate-45"></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-orange-600">📋</span>
              </div>
              <span className="text-sm  ">Published</span>
            </div>
            <span className="font-semibold  ">47</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600">👁️</span>
              </div>
              <span className="text-sm  ">Total Views</span>
            </div>
            <span className="font-semibold  ">125K</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600">👥</span>
              </div>
              <span className="text-sm  ">Followers</span>
            </div>
            <span className="font-semibold  ">2.3K</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600">🔖</span>
              </div>
              <span className="text-sm  ">Saved Posts</span>
            </div>
            <span className="font-semibold  ">89</span>
          </div>
        </div>
      </div>
 
      <div className={`${themeMode === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white'} mb-4 rounded-xl shadow p-5 relative group`}>
        <h3 className="text-lg font-semibold mb-4">Achievements</h3>

        {/* Tooltip */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="relative">
            <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              Static - but can be dynamic
              <div className="absolute -bottom-1 right-6 w-2 h-2 bg-gray-800 transform rotate-45"></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🏆</span>
            </div>
            <div>
              <h4 className={`${themeMode === 'dark' ? 'text-white' : 'text-gray-900'} text-sm font-semibold `}>Top Writer</h4>
              <p className="text-xs text-gray-500">Technology category</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">✓</span>
            </div>
            <div>
              <h4 className={`${themeMode === 'dark' ? 'text-white' : 'text-gray-900'} text-sm font-semibold `}>Verified Author</h4>
              <p className="text-xs text-gray-500">Trusted contributor</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <h4 className={`${themeMode === 'dark' ? 'text-white' : 'text-gray-900'} text-sm font-semibold `}>Community Leader</h4>
              <p className="text-xs text-gray-500">1000+ helpful comments</p>
            </div>
          </div>
        </div>
      </div>
 
      <div className={`${themeMode === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white'} mb-4 rounded-xl shadow p-5 relative group`}>
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
 
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="relative">
            <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              Static - but can be dynamic
              <div className="absolute -bottom-1 right-6 w-2 h-2 bg-gray-800 transform rotate-45"></div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button className={`${themeMode === 'dark' ? 'bg-gray-600 text-gray-400' : 'bg-blue-50 hover:bg-blue-100 text-gray-900'} w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left`}>
            <span className="text-blue-600">➕</span>
            <span className="text-sm font-medium">Create New Post</span>
          </button>

          <button className={`${themeMode === 'dark' ? 'bg-gray-600 text-gray-400' : 'bg-gray-50 hover:bg-gray-100'} w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left`}>
            <span className="text-green-600">📝</span>
            <span className="text-sm font-medium">View Drafts</span>
          </button>

          <button className={`${themeMode === 'dark' ? 'bg-gray-600 text-gray-400' : 'bg-gray-50 hover:bg-gray-100'} w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left`}>
            <span className="text-purple-600">⚙️</span>
            <span className="text-sm font-medium">Account Settings</span>
          </button>
        </div>
      </div>
    </div >
  )
} 