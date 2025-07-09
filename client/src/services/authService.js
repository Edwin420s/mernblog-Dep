import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const authService = {
  // Login a user
  login: async (credentials) => {
    const res = await axios.post(`${API_URL}/login`, credentials, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Store user info in localStorage
    localStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data;
  },

  // Register a new user
  register: async (userData) => {
    const res = await axios.post(`${API_URL}/register`, userData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Store user info in localStorage
    localStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data;
  },

  // Logout a user
  logout: async () => {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    localStorage.removeItem('user');
  },

  // Get currently logged-in user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }
};
