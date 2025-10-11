"use client";

import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const themeMode = useSelector((mode) => mode.themeToggle.mode);
  const isDark = themeMode === "dark";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the user!",
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
      const res = await fetch(`/api/users?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok && data.success) {
        setUsers(users.filter((user) => user._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: isDark ? "#1e293b" : "#fff",
          color: isDark ? "#fff" : "#000",
        });
      } else {
        Swal.fire("Error", "Failed to delete user.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong while deleting!", "error");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading users...</div>;
  }

  return (
    <div className={`p-6 rounded-xl shadow-sm ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h2 className="text-xl font-semibold mb-4">👥 All Registered Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg">
          <thead>
            <tr className={`${isDark ? "bg-gray-800" : "bg-gray-100"} text-left`}>
              <th className="py-3 px-4 border-b">Photo</th>
              <th className="py-3 px-4 border-b">Full Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b text-center">Role</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user._id}
                className={`${isDark ? "hover:bg-gray-800" : "hover:bg-gray-50"} transition-all`}
              >
                <td className="py-3 px-4 border-b">
                  <Image
                    src={user.photoUrl}
                    alt='user photo'
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                </td>
                <td className="py-3 px-4 border-b">{user.fullname}</td>
                <td className="py-3 px-4 border-b">{user.email}</td>
                <td className="py-3 px-4 border-b text-center capitalize">
                  {user.role || "user"}
                </td>
                <td className="py-3 px-4 border-b text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
