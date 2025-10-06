import React from 'react'

export default function ProfileDashboard({ children }) {
    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-12'>
                {children}
            </div>
        </div>
    )
}
