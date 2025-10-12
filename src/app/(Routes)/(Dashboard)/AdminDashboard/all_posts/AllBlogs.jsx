"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { CiSearch } from 'react-icons/ci';
import CategoryFilter from '@/app/(Routes)/blogs/CategoryFilter';
import BlogTable from '@/app/(Routes)/(Dashboard)/AdminDashboard/all_posts/BlogTable';

export default function AllBlogs({ AllPosts, allTotalPages }) {
    const [posts, setPosts] = useState(AllPosts);
    const [category, setCategory] = useState("All");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(allTotalPages);
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
        <div className={`${themeMode === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded`}>
            <div className={`max-w-7xl mx-auto ${themeMode === "dark" ? "bg-[#16202C] !text-white" : "bg-gray-100 !text-black"} flex flex-col md:flex-row justify-between items-center gap-4 p-10`}>
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

            {/* Posts table */}
            <div className={`max-w-7xl mx-auto ${themeMode === "dark" ? "bg-gray-900 !text-white" : "bg-white !text-black"} pt-6 overflow-x-auto rounded-lg`}>
                {searchedPost.length > 0 ? (
                    <table className="min-w-full border border-gray-300 text-sm text-left">
                        <thead className={`${themeMode === "dark" ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"}`}>
                            <tr>
                                <th className="py-3 px-4 border-b">Title</th>
                                <th className="py-3 px-4 border-b text-center">Likes</th>
                                <th className="py-3 px-4 border-b text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {searchedPost.map((post) => (
                                <BlogTable key={post._id} post={post} themeMode={themeMode} />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500 py-10">No articles found.</p>
                )}
            </div>


            {/* Pagination */}
            <div
                className={`${themeMode === "dark"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-black"
                    } flex justify-center py-8 gap-2`}
            >
                <div className="join">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className={`${themeMode === "dark" ? "bg-[#16202c] text-white" : ""} join-item btn !shadow-none`}
                    >
                        «
                    </button>

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
    )
}
