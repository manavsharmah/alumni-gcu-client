import axios from 'axios';

// Axios instance with credentials
const axiosInstance = axios.create({
  withCredentials: true
});

// Interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && error.response.data.message === 'Token expired' && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axiosInstance.post('http://localhost:5000/api/auth/refresh-token', {}, { withCredentials: true });
        return axiosInstance(originalRequest);
      } catch(refreshError) {
        console.error(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

