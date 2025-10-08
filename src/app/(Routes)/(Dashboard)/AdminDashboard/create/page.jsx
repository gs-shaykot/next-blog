"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import axios from "axios";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

export default function CreatePage() {
  const { data: session } = useSession();
  const { content, imageUrl } = useSelector((state) => state.editor);

  const editor = useRef(null);
  const [Jodcontent, setJodContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [hashtags, setHashtags] = useState("");
  const [postImage, setPostImage] = useState("");

  const config = {
    readonly: false,
    placeholder: "Start writing your content here...",
    height: 400,
    toolbarAdaptive: false,
    uploader: { insertImageAsBase64URI: true },
  };

  // 🔁 Convert Markdown-like AI content (##, ###, etc.) to HTML for Jodit
  const formatAIContent = (text) => {
    if (!text) return "";
    return text
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\n\n\n/g, "<br><br>")
      .replace(/\n/g, "<br>")
      .trim();
  };

  useEffect(() => {
    if (content || imageUrl) {
      const formattedContent = formatAIContent(content);
      let combined = formattedContent;

      if (imageUrl) {
        combined =
          `<div style="text-align:center;margin-bottom:20px;">` +
          `<img src="${imageUrl}" alt="AI generated" style="max-width:100%;border-radius:10px;" />` +
          `</div>` +
          combined;
        setPostImage(imageUrl);
      }

      setJodContent(combined);
      Swal.fire("Loaded!", "AI-generated content imported into editor.", "success");
    }
  }, [content, imageUrl]);

  // 🧠 Helper: Extract first <img> from content (if user inserted one)
  const extractFirstImage = (html) => {
    const match = html.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postTitle.trim() || !Jodcontent.trim()) {
      Swal.fire("Missing Fields", "Please fill in both title and content.", "warning");
      return;
    }

    const image =
      postImage || extractFirstImage(Jodcontent) ||
      "https://images.unsplash.com/photo-1521791136064-7986c2920216";

    const formattedHashtags = hashtags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag)
      .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));

    const newPost = {
      isFeatured: false,
      category,
      title: postTitle,
      subtitle: `A detailed guide on ${postTitle}`,
      author: session?.user?.name || "Anonymous",
      totalLikes: 0,
      totalViews: 0,
      post_image: image,
      content: Jodcontent,
      hashtags: formattedHashtags,
    };
    
    try {
      const res = await axios.post("/api/posts", newPost);
      if (res.data.success) {
        Swal.fire("Success!", "Your post has been published.", "success");
        setPostTitle("");
        setJodContent("");
        setHashtags("");
      }
      else {
        Swal.fire("Error", "Failed to publish post.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong while publishing.", "error");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">📝 Create New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium mb-2">Post Title</label>
          <input
            type="text"
            placeholder="Enter your title..."
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {["Technology", "Design", "Business", "Lifestyle", "Travel"].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Hashtags */}
        <div>
          <label className="block font-medium mb-2">Hashtags (comma-separated)</label>
          <input
            type="text"
            placeholder="#React, #NextJS, #WebDev"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-medium mb-2">Content</label>
          <JoditEditor
            ref={editor}
            value={Jodcontent}
            config={config}
            onBlur={(newContent) => setJodContent(newContent)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}