// import axios from 'axios';

// // Function to get the token from local storage
// const getToken = () => {
//   return localStorage.getItem('token');
// };

// // Function to create an Axios instance with the Authorization header
// const createAxiosInstance = () => {
//   const token = getToken();

//   const instance = axios.create({
//     baseURL: 'http://localhost:5000/api',
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   });

//   return instance;
// };

// // Export the Axios instance
// export const api = createAxiosInstance();


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
    if (error.response.status === 401 && !originalRequest._retry) {
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
