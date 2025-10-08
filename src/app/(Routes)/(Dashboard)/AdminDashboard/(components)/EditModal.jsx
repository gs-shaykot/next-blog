"use client";
import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";

export default function EditModal({ post, onClose, themeMode }) {
    const isDark = themeMode === "dark";
    const editor = useRef(null);

    const [title, setTitle] = useState(post.title || "");
    const [postImage, setPostImage] = useState(post.post_image || "");
    const [hashtags, setHashtags] = useState(post.hashtags?.join(", ") || "");
    const [content, setContent] = useState(post.content || "");
    const [updating, setUpdating] = useState(false);

    const config = {
        readonly: false,
        placeholder: "Edit your post content...",
        height: 400,
        toolbarAdaptive: false,
        uploader: { insertImageAsBase64URI: true },
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            Swal.fire("Missing Fields", "Title and content are required!", "warning");
            return;
        }

        const formattedHashtags = hashtags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
            .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));

        const updatedPost = {
            id: post._id,
            title,
            post_image: postImage,
            content,
            hashtags: formattedHashtags,
        };

        try {
            setUpdating(true);
            const res = await fetch("/api/posts", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedPost),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                await Swal.fire({
                    title: "Updated!",
                    text: "Your post has been updated successfully.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
                window.location.reload();
            } else {
                Swal.fire("Error", "Failed to update post.", "error");
            }
        } catch (err) {
            Swal.fire("Error", "Something went wrong while updating.", "error");
            console.error(err);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-3xl rounded-lg p-6 shadow-lg overflow-y-auto max-h-[90vh] ${isDark ? "bg-gray-800 text-white" : "bg-white text-black"
                    }`}
            >
                <h2 className="text-xl font-semibold mb-4">✏️ Edit Post</h2>

                <form onSubmit={handleUpdate} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block font-medium mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block font-medium mb-2">Post Image URL</label>
                        <input
                            type="text"
                            value={postImage}
                            onChange={(e) => setPostImage(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {postImage && (
                            <img
                                src={postImage}
                                alt="preview"
                                className="mt-3 rounded-lg w-full max-h-60 object-cover"
                            />
                        )}
                    </div>

                    {/* Hashtags */}
                    <div>
                        <label className="block font-medium mb-2">Hashtags (comma-separated)</label>
                        <input
                            type="text"
                            value={hashtags}
                            onChange={(e) => setHashtags(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block font-medium mb-2">Content</label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}
                            onBlur={(newContent) => setContent(newContent)}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={updating}
                            className={`px-4 py-2 rounded-lg text-white transition-all ${updating ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {updating ? "Updating..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
