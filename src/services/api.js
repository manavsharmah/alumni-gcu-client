import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This ensures cookies are sent with requests
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/refresh-token`, {}, {
      withCredentials: true,
    });
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
    const decodeToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    if(decodeToken.exp - currentTime < 10) {
      try {
        const newAccessToken = await refreshAccessToken();
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } catch (error) {
        console.error('Error refreshing access token:', error);
        // Handle token refresh error (e.g., logout user)
      }
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
}, 
(error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('401 error detected. Attempting to refresh token...');
      originalRequest._retry = true;
      
      try {
        // Get new token
        console.log('Calling refreshAccessToken() function');
        const newToken = await refreshAccessToken();
        console.log('Token refreshed successfully');
        
        // Update the authorization header
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        console.log('Updated Authorization header with new token');
        
        // Retry the original request with the new token
        console.log('Retrying original request');
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log and propagate the error
        console.error('Token refresh failed in response interceptor:', refreshError);
        
        // If refresh token is expired or invalid, you might want to redirect to login
        if (refreshError.response?.status === 401) {
          console.log('Refresh token unauthorized. User needs to log in again.');
          // Optionally redirect to login or dispatch a logout action
          // window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    // For errors other than 401, or if we've already tried to refresh
    return Promise.reject(error);
  }
);

export default api;
