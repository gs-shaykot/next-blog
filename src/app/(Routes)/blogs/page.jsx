import BlogList from '@/app/(Routes)/blogs/BlogList';
import axios from 'axios'
import React from 'react'

async function getPosts() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?limit=6&page=1`, {
    cache: "no-store",
  });

  return res.data
}

export default async function page() {

  const initialPosts = await getPosts()
  const { totalPages, posts } = initialPosts

  return (
    <div>
      <BlogList initialPosts={posts} initialTotalPages={totalPages} />
    </div>
  )
}
