import axios from 'axios';

const API_URL = 'https://blog.mnmercan.com/api/v1';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor - her istekte token ekle
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - token süresi dolmuşsa logout
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403 || error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default {
    // Auth
    login(credentials) {
        return apiClient.post('/login', credentials);
    },

    register(userData) {
        return apiClient.post('/register', userData);
    },

    // Posts
    getPosts() {
        return apiClient.get('/posts');
    },

    getPostById(id) {
        return apiClient.get(`/posts/${id}`);
    },

    createPost(postData) {
        return apiClient.post('/posts', postData);
    },

    updatePost(id, postData) {
        return apiClient.put(`/posts/${id}`, postData);
    },

    deletePost(id) {
        return apiClient.delete(`/posts/${id}`);
    }
};