import { useState, useEffect, useCallback } from 'react'
import { postProvider } from '@/api/providers/postProvider'

export const usePosts = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPosts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await postProvider.getAllPosts()
      setPosts(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch posts')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const addPost = async (postData) => {
    try {
      const newPost = await postProvider.createPost(postData)
      // Optimistic update (optional, but good practice)
      setPosts((prev) => [newPost, ...prev])
      return newPost
    } catch (err) {
      throw err.message || 'Failed to create post'
    }
  }

  return { posts, isLoading, error, refreshPosts: fetchPosts, addPost }
}
