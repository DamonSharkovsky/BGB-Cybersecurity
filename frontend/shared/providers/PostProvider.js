import apiClient from '../apiClient.js';

class PostProvider {
    async getAllPosts() {
        return apiClient.get('/api/posts');
    }

    async getPostById(id) {
        return apiClient.get(`/api/posts/${id}`);
    }

    async createPost(postData) {
        return apiClient.post('/api/posts', postData);
    }
}

export default new PostProvider();
