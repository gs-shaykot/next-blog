"use client"
import axios from "axios"
import React, { useEffect, useState } from "react"

export default function Profile() {
  const [savedPosts, setSavedPosts] = useState([])

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const res = await axios.get("/api/savedPosts")
        console.log(res.data) 
        setSavedPosts(res.data)  
      } catch (err) {
        console.error("Error fetching saved posts:", err)
      }
    }

    fetchSavedPosts()
  }, [])

  return (
    <div className="mt-20">
      <h1>heda heda</h1>
      <pre>{JSON.stringify(savedPosts, null, 2)}</pre>
    </div>
  )
}

