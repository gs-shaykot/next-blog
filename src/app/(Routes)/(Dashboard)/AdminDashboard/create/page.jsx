"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function CreatePage() {
  const { content, imageUrl } = useSelector((state) => state.editor);
  console.log(content, imageUrl)
  const editor = useRef(null);
  const [Jodcontent, setContent] = useState("");

  const config = {
    readonly: false,
    placeholder: "Start writing your content here...",
    height: 400,
    toolbarAdaptive: false,
    uploader: { insertImageAsBase64URI: true },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Generated content:", Jodcontent);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">📝 Create New Post</h1>
      <p>{content}</p>
      <p>{imageUrl}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Post Title</label>
          <input
            type="text"
            placeholder="Enter your title..."
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Content</label>
          <JoditEditor
            ref={editor}
            value={Jodcontent}
            config={config}
            onBlur={(newContent) => setContent(newContent)} // preferred: triggers on focus loss
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}
