"use client"
import React, { useState } from 'react'
import { FaShareAlt } from 'react-icons/fa'

export default function SharePostButton() {

    const [copied, setCopied] = useState(false)

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setCopied(true)

            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy link:", err)
        }
    }

    return (
        <div className="relative">
            <button
                onClick={handleShare}
                className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-600"
            >
                <FaShareAlt /> Share
            </button>

            {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm w-24 h-8 flex justify-center items-center rounded-md shadow">
                    Link Copied!
                </span>
            )}
        </div>
    )
}
