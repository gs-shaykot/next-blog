"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function LikePostButton({ postId, initialLikes }) {
    const { data: session } = useSession();
    const userEmail = session?.user?.email;

    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();


    useEffect(() => {
        const fetchUserLikedPosts = async () => {
            if (!userEmail) return;
            try {
                const res = await axios.get(`/api/register?email=${userEmail}`);
                const liked = res.data?.likedPosts?.includes(postId);
                setIsLiked(liked);
            } catch (error) {
                console.error("Failed to fetch liked posts:", error);
            }
        };
        fetchUserLikedPosts();
    }, [userEmail, postId]);


    const handleLike = async () => {
        if (!userEmail) {
            const redirectUrl = `/login?callbackUrl=${pathname}`;
            router.push(redirectUrl);
            return;
        }

        const newLikedState = !isLiked;
        const updatedLikes = likes + (newLikedState ? 1 : -1); 

        setIsLiked(newLikedState);
        setLikes(updatedLikes);
        setIsLoading(true);

        try {
            const res = await axios.patch("/api/posts", {
                id: postId,
                totalLikes: updatedLikes,
            }); 

            await axios.patch("/api/register", {
                email: userEmail,
                postId,
                isLiked: newLikedState,
            });
        } catch (error) {
            console.error("Error updating like:", error);
            setIsLiked(!newLikedState);
            setLikes(likes);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleLike}
            disabled={isLoading}
            className="flex justify-center items-center gap-2 cursor-pointer transition-colors duration-200"
        >
            {isLiked ? (
                <FaHeart className="text-red-500" />
            ) : (
                <FaRegHeart className="text-gray-500 hover:text-red-400" />
            )}
            <span>{likes}</span>
        </button>
    );
}
