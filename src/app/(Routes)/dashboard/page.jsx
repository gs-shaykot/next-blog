'use client'
import AdminDashboard from '@/app/(Routes)/dashboard/AdminDashboard';
import AdminDashboardLayout from './AdminDashboardLayout';
import UserDashboard from '@/app/(Routes)/dashboard/UserDashboard';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


export default function page() {
    const { data: session, status } = useSession();
    const userDtl = session?.user;

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === 'unauthenticated') {
            const redirectUrl = `/login?callbackUrl=${pathname}`;
            router.push(redirectUrl);
        }
    }, [status, pathname, router]);

    if (status === 'loading') return <p>Loading...</p>;
    if (!userDtl) return null;
    // Render admin layout if role is admin
    if (userDtl.role === 'admin') {
        return (
            <AdminDashboardLayout>
                <AdminDashboard />
            </AdminDashboardLayout>
        );
    }

    return <UserDashboard />;
}
