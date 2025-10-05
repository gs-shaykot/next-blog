'use client'
import AdminDashboard from '@/app/(Routes)/dashboard/AdminDashboard';
import UserDashboard from '@/app/(Routes)/dashboard/UserDashboard';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function page() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const userDtl = session?.user;

    if (!session) {
        return <div className='mt-18'>Please login to access the dashboard</div>
    }
    
    return (
        <div>
            {userDtl?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
        </div>
    )
}
