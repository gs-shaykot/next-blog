import {
  RiDashboardLine,
  RiArticleLine,
  RiAddLine,
  RiRobotLine,
  RiFolderLine,
  RiChat3Line,
  RiBarChartLine,
  RiSettingsLine
} from 'react-icons/ri';

export default function Sidebar() {
  return (
    <div className="mt-18">
      <nav className="bg-white rounded-lg shadow-sm p-4">
        <button className="w-full flex items-center px-4 py-3 text-left rounded-lg mb-2 transition-all cursor-pointer whitespace-nowrap bg-blue-600 text-white">
          <RiDashboardLine className="mr-3" /> Dashboard
        </button>

        <button className="w-full flex items-center px-4 py-3 text-left rounded-lg mb-2 transition-all cursor-pointer whitespace-nowrap text-gray-700 hover:bg-gray-100">
          <RiArticleLine className="mr-3" /> Posts
        </button>

        <button className="w-full flex items-center px-4 py-3 text-left rounded-lg mb-2 transition-all cursor-pointer whitespace-nowrap text-gray-700 hover:bg-gray-100">
          <RiAddLine className="mr-3" /> Create Post
        </button>

        <button className="w-full flex items-center px-4 py-3 text-left rounded-lg mb-2 transition-all cursor-pointer whitespace-nowrap text-gray-700 hover:bg-gray-100">
          <RiRobotLine className="mr-3" /> AI Content Creator
        </button>

        <button className="w-full flex items-center px-4 py-3 text-left rounded-lg mb-2 transition-all cursor-pointer whitespace-nowrap text-gray-700 hover:bg-gray-100">
          <RiFolderLine className="mr-3" /> Categories
        </button>

        <button className="w-full flex items-center px-4 py-3 text-left rounded-lg mb-2 transition-all cursor-pointer whitespace-nowrap text-gray-700 hover:bg-gray-100">
          <RiChat3Line className="mr-3" /> Comments
        </button>

        <button className="w-full flex items-center px-4 py-3 text-left rounded-lg mb-2 transition-all cursor-pointer whitespace-nowrap text-gray-700 hover:bg-gray-100">
          <RiBarChartLine className="mr-3" /> Analytics
        </button>

        <button className="w-full flex items-center px-4 py-3 text-left rounded-lg mb-2 transition-all cursor-pointer whitespace-nowrap text-gray-700 hover:bg-gray-100">
          <RiSettingsLine className="mr-3" /> Settings
        </button>
      </nav>
    </div>
  );
}
