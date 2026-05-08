import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
  baseURL: 'https://schoolfee-now-backend.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Determine error message
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    
    // Globally catch non-auth errors
    if (error.response?.status !== 401) {
      toast.error(`Error: ${message}`);
    }
    
    return Promise.reject(error);
  }
);

export default api;
