import Image from "next/image";
import { getSinglePost } from "../../../../../lib/posts";
import { FaRegHeart, FaRegBookmark, FaShareAlt } from "react-icons/fa";
import { FaXTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import axios from "axios";
import Swal from "sweetalert2";
import SavePostButton from "./SavePostButton";
import SharePostButton from "@/app/(Routes)/blogs/[id]/SharePostButton";
import { useSelector } from "react-redux";
import BlogDetails from "@/app/(Routes)/blogs/[id]/BlogDetails";

export default async function SinglePostPage({ params }) {
    const { id } = await params;
    const post = await getSinglePost(id);

    if (!post) {
        return (
            <div className="mt-20 p-10 bg-red-100 text-center rounded-lg">
                ❌ Post not found
            </div>
        );
    }

    return (
        <BlogDetails post={post} />
    );
}