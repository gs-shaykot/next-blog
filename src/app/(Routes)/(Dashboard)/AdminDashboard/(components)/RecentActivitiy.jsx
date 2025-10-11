import React from "react";

export default function RecentActivity({ activities }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="border-b border-gray-600">
        <h2 className="font-semibold text-lg p-3">Recent Activities</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
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
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
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
