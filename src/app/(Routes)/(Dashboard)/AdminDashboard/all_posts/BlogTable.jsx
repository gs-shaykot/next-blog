"use client";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import EditModal from "../(components)/EditModal"; 

export default function BlogTable({ post, themeMode }) {
    const isDark = themeMode === "dark";
    const [deleting, setDeleting] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // Handle Delete
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action will permanently delete the post!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            background: isDark ? "#1e293b" : "#fff",
            color: isDark ? "#fff" : "#000",
        });

        if (!result.isConfirmed) return;

        try {
            setDeleting(true);

            const res = await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
            const data = await res.json();

            if (res.ok && data.success) {
                await Swal.fire({
                    title: "Deleted!",
                    text: "Your post has been deleted.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                    background: isDark ? "#1e293b" : "#fff",
                    color: isDark ? "#fff" : "#000",
                });
                window.location.reload();
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to delete the post.",
                    icon: "error",
                    background: isDark ? "#1e293b" : "#fff",
                    color: isDark ? "#fff" : "#000",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Something went wrong while deleting!",
                icon: "error",
                background: isDark ? "#1e293b" : "#fff",
                color: isDark ? "#fff" : "#000",
            });
        } finally {
            setDeleting(false);
        }
    };

    return (
        <> 
            <tr className={`${isDark ? "hover:bg-gray-800" : "hover:bg-gray-50"} transition-all`}> 
                <td className="py-3 px-4 border-b break-words max-w-xs">{post.title}</td>
 
                <td className="py-3 px-4 border-b text-center">{post.totalLikes}</td>
 
                <td className="py-3 px-4 border-b text-center">
                    <div className="flex items-center justify-center gap-3">
                        {/* Edit */}
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all"
                        >
                            <FiEdit size={16} />
                        </button>

                        {/* Delete */}
                        <button
                            onClick={() => handleDelete(post._id)}
                            disabled={deleting}
                            className={`p-2 rounded-lg text-white transition-all ${deleting ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                                }`}
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </div>
                </td>
            </tr>

            {/* Edit Modal */}
            {showEditModal && (
                <EditModal
                    post={post}
                    themeMode={themeMode}
                    onClose={() => setShowEditModal(false)}
                />
            )}
        </>
    );
}
