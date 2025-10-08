
export const dynamic = "force-dynamic";
import BlogList from '@/app/(Routes)/blogs/BlogList'; 
import React from 'react'
import { getPaginatedPosts } from '../../../../lib/posts';

export default async function page() {

  const { posts, totalPages } = await getPaginatedPosts(6, 1);

  return (
    <div>
      <BlogList initialPosts={posts} initialTotalPages={totalPages} />
    </div>
  )
}
