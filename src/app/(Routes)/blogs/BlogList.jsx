"use client"
import BlogCards from '@/app/(Routes)/blogs/BlogCards';
import CategoryFilter from '@/app/(Routes)/blogs/CategoryFilter';
import React, { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useSelector } from 'react-redux';


export default function BlogList({ initialPosts, initialTotalPages }) {
    const [posts, setPosts] = useState(initialPosts);
    const [category, setCategory] = useState("All");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const [searchTerm, setSearchTerm] = useState("");

    const categories = ["All", "Technology", "Design", "Business", "Lifestyle", "Travel"];

    const themeMode = useSelector((mode) => mode.themeToggle.mode)

    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch(`/api/posts?limit=6&page=${page}&category=${category}`);
            const data = await res.json();

            setPosts(data.posts);
            setTotalPages(data.totalPages);
        }
        fetchPosts();
    }, [page, category]);

    const searchedPost = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (

        <div className='pt-16 mt-2'>
            {/* top banner */}
            <div className='py-20 bg-gradient-to-r from-blue-600 to-slate-700 flex flex-col justify-center items-center'>
                <h2
                    className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-400 to-gray-300 bg-clip-text text-transparent mb-5`}
                >
                    Explore Categories
                </h2>
                <p className='text-xl text-blue-100 max-w-3xl text-center'>Discover insightful articles, expert opinions, and creative stories from our community of writers</p>
            </div>

            {/* Search + Category Filter */}
            <div className={`max-w-7xl mx-auto ${themeMode === "dark" ? "bg-[#16202C] !text-white" : "bg-white !text-black"} flex flex-col md:flex-row justify-between items-center gap-4 p-10`}>
                {/* Search Bar */}
                <label
                    className={`w-full md:!w-4/12 !h-12 input rounded-lg mr-2 lg:flex ${themeMode === "dark" ? "bg-gray-800 !text-white" : "bg-white !text-black"}`}
                >
                    <CiSearch className="text-lg" />
                    <input
                        type="search"
                        required
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1);
                        }}
                        className={`bg-transparent outline-none ${themeMode === "dark" ? "placeholder-gray-400" : "placeholder-gray-600"
                            }`}
                    />
                </label>

                {/* Categories */}
                <CategoryFilter
                    categories={categories}
                    selected={category}
                    onSelect={(cat) => {
                        setCategory(cat);
                        setPage(1);
                    }}
                />
            </div>

            {/* Posts Grid */}
            <div className={`max-w-7xl mx-auto ${themeMode === "dark" ? "bg-gray-900 !text-white" : "bg-white !text-black"} place-items-center grid md:grid-cols-3 gap-4 pt-6`}>
                {searchedPost.length > 0 ? (
                    searchedPost.map((post) => <BlogCards key={post._id} post={post} />)
                ) : (
                    <p className="col-span-3 text-center text-gray-500">No articles found.</p>
                )}
            </div>
            <div
                className={`${themeMode === "dark"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-black"
                    } flex justify-center py-8 gap-2`}
            >
                <div className="join">
                    {/* Prev */}
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className={`${themeMode === "dark" ? "bg-[#16202c] text-white" : ""} join-item btn !shadow-none`}
                    >
                        «
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            onClick={() => setPage(num)}
                            className={`join-item btn !shadow-none ${page === num
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : themeMode === "dark"
                                    ? "bg-gray-800 text-white hover:bg-gray-600"
                                    : "bg-gray-200 text-black hover:bg-gray-300"
                                }`}
                        >
                            {num}
                        </button>
                    ))}

                    {/* Next */}
                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                        className={`${themeMode === "dark" ? "bg-[#16202c] text-white" : ""} join-item btn !shadow-none`}
                    >
                        »
                    </button>
                </div>
            </div>


        </div>
    );
}
