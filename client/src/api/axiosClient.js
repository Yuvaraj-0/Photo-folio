import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3002', // your API base URL
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
