import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
    getPosts() {
        return apiClient.get('/posts');
    },
    getPostById(id) {
        return apiClient.get(`/posts/${id}`);
    },

    // User
    register(userData) {
        return apiClient.post('/register', userData);
    }
}