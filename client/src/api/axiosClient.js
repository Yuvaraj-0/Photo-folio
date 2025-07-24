import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://your-backend-url.onrender.com/api/stats', // your API base URL
});

// Add token to every request if present
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
