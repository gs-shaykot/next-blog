import React from "react";
import { useSelector } from "react-redux";

export default function RecentActivity({ activities }) {

  const themeMode = useSelector((mode) => mode.themeToggle.mode);

  return (
    <div className={`${themeMode === 'dark' ? 'bg-gray-700 !text-white' : 'bg-white'} rounded-xl shadow-sm`}>
      <div className="border-b border-gray-600">
        <h2 className="font-semibold text-lg p-3">Recent Activities</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className={`${themeMode === 'dark' ? 'bg-gray-400 !text-white' : 'bg-gray-100 text-gray-700'}`}>
              <th className="px-4 py-2 border-b border-gray-300">#</th>
              <th className="px-4 py-2 border-b border-gray-300">User Email</th>
              <th className="px-4 py-2 border-b border-gray-300">Action</th>
              <th className="px-4 py-2 border-b border-gray-300">Post Title</th>
            </tr>
          </thead>
          <tbody>
            {activities?.map((activity, idx) => (
              <tr
                key={activity._id || idx} 
              >
                <td className="px-4 py-2 border-b border-gray-200">{idx + 1}</td>
                <td className="px-4 py-2 border-b border-gray-200 font-medium">
                  {activity.userEmail}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {activity.type}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {activity.postTitle
                    ? activity.postTitle.length > 20
                      ? activity.postTitle.slice(0, 20) + "..."
                      : activity.postTitle
                    : "-"}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
