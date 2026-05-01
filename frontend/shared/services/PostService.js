import postProvider from '../providers/PostProvider.js';

class PostService {
    constructor() {
        this.posts = [];
    }

    async loadPosts(renderCallback) {
        try {
            this.posts = await postProvider.getAllPosts();
            if (renderCallback) renderCallback(this.posts);
            return this.posts;
        } catch (error) {
            console.error('Failed to load posts:', error);
            throw error;
        }
    }

    async submitPost(postData, successCallback) {
        try {
            const newPost = await postProvider.createPost(postData);
            this.posts.unshift(newPost);
            if (successCallback) successCallback(newPost);
            return newPost;
        } catch (error) {
            console.error('Failed to submit post:', error);
            throw error;
        }
    }

    getPosts() {
        return this.posts;
    }
}

export default new PostService();
