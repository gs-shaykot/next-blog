'use client';

import axios from 'axios';
import Swal from 'sweetalert2';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function SavePostButton({ id }) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserSavedPosts = async () => {
      if (!userEmail) return;
      try {
        const res = await axios.get(`/api/register?email=${userEmail}`);
        const saved = res.data?.savedPosts?.includes(id);
        setIsSaved(saved);
      } catch (error) {
        console.error("Failed to fetch saved posts:", error);
      }
    };
    fetchUserSavedPosts();
  }, [userEmail, id]);

  const handleSavePost = async () => {
    try {
      if (!userEmail) {
        const redirectUrl = `/login?callbackUrl=${pathname}`;
        router.push(redirectUrl);
        return;
      }

      const newSavedState = !isSaved;
      setIsSaved(newSavedState);

      const res = await axios.patch('/api/register', {
        email: userEmail,
        postId: id,
        isSaved: newSavedState,
      });

      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: newSavedState ? 'Post saved successfully' : 'Post unsaved',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      setIsSaved(!newSavedState);
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
      {isSaved ? <FaBookmark className="text-blue-600" /> : <FaRegBookmark />}
      {isSaved ? 'Saved' : 'Save'}
    </button>
  );
}