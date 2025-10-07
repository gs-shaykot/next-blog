"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { FaShareAlt } from "react-icons/fa";
import axios from "axios";

export default function SharePostButton({ id, postTitle }) {
    const { data: session } = useSession();
    const userEmail = session?.user?.email;
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        try { 
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
 
            if (userEmail) {
                await axios.post("/api/share", {
                    userEmail,
                    postId: id,
                    postTitle,
                });
            }
        } catch (err) {
            console.error("Failed to copy/share link:", err);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={handleShare}
                className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors"
            >
                <FaShareAlt /> Share
            </button>

            {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm w-24 h-8 flex justify-center items-center rounded-md shadow">
                    Link Copied!
                </span>
            )}
        </div>
    );
}
