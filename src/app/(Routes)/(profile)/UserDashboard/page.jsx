"use client"
import ProfileBanner from '@/app/components/(Profile_components)/ProfileBanner';
import ProfileTabs from '@/app/components/(Profile_components)/ProfileTabs';
import ProfileSidebar from '@/app/components/(Profile_components)/SidebarSection';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


export default function UserDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === "loading") return;

        if (status === 'unauthenticated') {
            const redirectUrl = `/login?callbackUrl=${pathname}`;
            router.push(redirectUrl);
        }
    }, [status, pathname, router]);

    const userDtl = session?.user;
    const userEmail = session?.user?.email;

    const themeMode = useSelector((mode) => mode.themeToggle.mode);

    const [savedPosts, setSavedPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            if (!userEmail) return;
            try {
                const res = await axios.get(`/api/register?email=${userEmail}`);
                const { savedPosts: savedIds = [], likedPosts: likedIds = [] } = res.data || {};

                const saved = await Promise.all(
                    savedIds.map(async (id) => {
                        const postRes = await axios.get(`/api/posts/${id}`);
                        return postRes.data;
                    })
                );

                const liked = await Promise.all(
                    likedIds.map(async (id) => {
                        const postRes = await axios.get(`/api/posts/${id}`);
                        return postRes.data;
                    })
                );

                setSavedPosts(saved);
                setLikedPosts(liked);
            } catch (err) {
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [userEmail]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen mt-18 ${themeMode === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-gray-50 text-gray-800'}`}>
            <ProfileBanner userDtl={userDtl} />

            <div className="flex flex-col lg:flex-row gap-6 mt-6 px-4 md:px-6 lg:px-10 pb-10">
                {/* Sidebar */}
                <aside className="lg:w-80 w-full space-y-4">
                    <ProfileSidebar />
                </aside>

                {/* Main Content */}
                <main className={`flex-1 ${themeMode === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
                    <ProfileTabs
                        loading={loading}
                        savedPosts={savedPosts}
                        likedPosts={likedPosts}
                    />
                </main>
            </div>
        </div>
    )
}