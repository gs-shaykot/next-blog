'use client';

import axios from 'axios';
import Swal from 'sweetalert2';
import { FaRegBookmark } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

export default function SavePostButton({ post }) {

  const { data: session } = useSession();
  const userDtl = session?.user;

  const handleSavePost = async () => {
    try {
      if (!userDtl) {
        return
      }

      const postDtl = {
        ...post,
        userEmail: userDtl?.email,
      }

      const res = await axios.post('/api/savedPosts', postDtl);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Post Saved successfully',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to save the post',
        text: error.message,
      });
    }
  };

  return (
    <button
      onClick={handleSavePost}
      className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-600"
    >
      <FaRegBookmark /> Save
    </button>
  );
}
