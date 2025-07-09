// ✅ src/services/api.js
import axios from 'axios';

// ✅ Create Axios Instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // ✅ Send cookies with every request
});

// ✅ Post Service
export const postService = {
  getAllPosts: async () => {
    const response = await api.get('/posts');
    return response.data;
  },

  getPost: async (postId) => {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  },

  createPost: async (postData) => {
    const response = await api.post('/posts', postData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  updatePost: async (postId, updateData) => {
    const response = await api.put(`/posts/${postId}`, updateData);
    return response.data;
  },

  deletePost: async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  },

  addComment: async (postId, commentData) => {
    const response = await api.post(`/posts/${postId}/comments`, commentData);
    return response.data;
  }
};

// ✅ Auth Service (uses cookies, not token)
export const authService = {
  login: async (credentials) => {
    const payload = {
      email: credentials.email.trim(),
      password: credentials.password.trim()
    };

    const response = await api.post('/auth/login', payload);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  }
};

// ✅ User Service
export const userService = {
  getUserProfile: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  updateUserProfile: async (userId, profileData) => {
    const response = await api.put(`/users/${userId}`, profileData);
    return response.data;
  },

  deleteUserAccount: async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  }
};
