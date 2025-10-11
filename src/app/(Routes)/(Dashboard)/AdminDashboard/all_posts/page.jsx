import AllBlogs from '@/app/(Routes)/(Dashboard)/AdminDashboard/all_posts/AllBlogs';
import { getPaginatedPosts } from 'lib/posts';
import React from 'react'

export default async function page() {

  const { posts, totalPages } = await getPaginatedPosts(6, 1);

  return (
    <div>
      <AllBlogs AllPosts={posts} allTotalPages={totalPages} />
    </div>
  )
}
