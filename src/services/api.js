import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your API base URL
  withCredentials: true, // This ensures cookies are sent with requests
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const response = await api.get('/refresh-token');
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

// Add a request interceptor
api.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const { exp } = jwtDecode(accessToken);

    // Check if the token is expired or about to expire
    if (Date.now() >= exp * 1000) {
      accessToken = await refreshAccessToken();
    }

    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor to handle token expiry
api.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const newAccessToken = await refreshAccessToken();
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      // Handle refresh token expiration or invalid refresh token
      // e.g., redirect to login page
    }
  }

  return Promise.reject(error);
});

export default api;
