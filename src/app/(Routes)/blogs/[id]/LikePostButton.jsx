"use client"
import axios from 'axios'
import React, { useState } from 'react'
import { FaRegHeart } from 'react-icons/fa'

export default function LikePostButton({ postId, initialLikes }) {
    const [likes, setLikes] = useState(initialLikes)
    const [isLiked, setIsLiked] = useState(false)

    const handleLike = async () => {
        const updatedLikes = likes + (!isLiked ? 1 : -1)
        setIsLiked(!isLiked)
        setLikes(updatedLikes)
        try {
            const res = await axios.patch('/api/posts', { id: postId, totalLikes: updatedLikes })
            if (res.data.modifiedCount === 1) {
                
            }

        } catch (error) {
            console.error("error: ", error)
        }
    }

    return (
        <button
            onClick={handleLike}
            className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-600">
            <FaRegHeart /> {likes}
        </button>
    )
}
