import apiClient from '@/api/apiClient'

export const postProvider = {
  getAllPosts: () => apiClient.get('/api/posts'),
  getPostById: (id) => apiClient.get(`/api/posts/${id}`),
  createPost: (postData) => apiClient.post('/api/posts', postData),
}
