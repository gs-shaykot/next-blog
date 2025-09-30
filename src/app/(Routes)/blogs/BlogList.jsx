"use client"
import BlogCards from '@/app/(Routes)/blogs/BlogCards';
import CategoryFilter from '@/app/(Routes)/blogs/CategoryFilter';
import React, { useState, useEffect } from 'react';

export default function BlogList({ initialPosts, initialTotalPages }) {
    const [posts, setPosts] = useState(initialPosts);
    const [category, setCategory] = useState("All");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(initialTotalPages);

    const categories = ["All", "Technology", "Design", "Business", "Lifestyle", "Travel"];

    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch(`/api/posts?limit=6&page=${page}&category=${category}`);
            const data = await res.json();

            setPosts(data.posts);
            setTotalPages(data.totalPages);
        }
        fetchPosts();
    }, [page, category]);

    return (

        <div className='py-16 mt-10'>
            {/* top banner */}
            <div className='py-20 bg-gradient-to-r from-blue-600 to-slate-700 flex flex-col justify-center items-center'>
                <h2
                    className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-400 to-gray-300 bg-clip-text text-transparent mb-5`}
                >
                    Explore Categories
                </h2>
                <p className='text-xl text-blue-100 max-w-3xl text-center'>Discover insightful articles, expert opinions, and creative stories from our community of writers</p>
            </div>

            <CategoryFilter
                categories={categories}
                selected={category}
                onSelect={(cat) => {
                    setCategory(cat);
                    setPage(1);
                }}
            />
            
            {/* Posts Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
                {posts.map((post) => (
                    <BlogCards key={post._id} post={post} />
                ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2">
                {/* Prev */}
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded border bg-gray-100 disabled:opacity-50"
                >
                    ‹ Prev
                </button>
                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                        key={num}
                        onClick={() => setPage(num)}
                        className={`px-4 py-2 rounded border ${page === num ? "bg-blue-600 text-white" : "bg-gray-100"
                            }`}
                    >
                        {num}
                    </button>
                ))}
                {/* Next */}
                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded border bg-gray-100 disabled:opacity-50"
                >
                    Next ›
                </button>
            </div>
        </div>
    );
}
