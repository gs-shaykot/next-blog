"use client";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import Swal from "sweetalert2";

export default function BlogTable({ post, themeMode }) {
  const isDark = themeMode === "dark";
  const [deleting, setDeleting] = useState(false);

  // Handle Delete
  const handleDelete = async (id) => {
    // Show confirmation alert
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

    // If user cancels, stop here
    if (!result.isConfirmed) return;

    try {
      setDeleting(true);

      const res = await fetch(`/api/posts?id=${id}`, {
        method: "DELETE",
      });
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

        // Refresh the page or call refetch
        window.location.reload(); // Replace with router.refresh() if using App Router
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
      console.error("Error deleting post:", error);
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
    <tr className={`${isDark ? "hover:bg-gray-800" : "hover:bg-gray-50"} transition-all`}>
      {/* Title */}
      <td className="py-3 px-4 border-b break-words max-w-xs">{post.title}</td>

      {/* Total Likes */}
      <td className="py-3 px-4 border-b text-center">{post.totalLikes}</td>

      {/* Actions */}
      <td className="py-3 px-4 border-b text-center">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => console.log("Edit", post._id)}
            className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all"
          >
            <FiEdit size={16} />
          </button>

          <button
            onClick={() => handleDelete(post._id)}
            disabled={deleting}
            className={`p-2 rounded-lg text-white transition-all ${
              deleting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
