import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;

// Function to refresh token
const refreshToken = async () => {
  const response = await api.post('/auth/refresh');
  const { access_token } = response.data;
  localStorage.setItem('access_token', access_token);
  return access_token;
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && originalRequest) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await refreshToken();
          isRefreshing = false;
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          // Clear tokens on refresh failure
          localStorage.removeItem('access_token');
          return Promise.reject(refreshError);
        }
      } else {
        // If already refreshing, reject to avoid queue
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;