import React from 'react'

// use appropiate icon on the left of the h1, activity.
export default function RecentActivitiy({ activities }) {

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className='border-b border-gray-600'>
        <h2 className="font-semibold text-lg p-3">Recent Activites</h2>
      </div>
      {
        activities?.map((activity,idx) => ( 
          <div key={activity._id} className='px-3 mt-2'>
            <h1 className='text-xl'>{idx+1}: <span className='font-semibold'>{activity.userEmail}</span> has <span className='font-semibold'>{activity.type}</span> <span className='font-semibold'>{activity.postTitle}</span></h1>
          </div>
        ))
      }
    </div>
  )
}
