import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const API_URL =  process.env.REACT_APP_API_URL ||'http://localhost:5000/api';
// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This ensures cookies are sent with requests
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post('${API_URL}/auth/refresh-token', {}, {
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

export default api;
