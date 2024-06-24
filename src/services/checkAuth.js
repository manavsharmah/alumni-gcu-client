import axiosInstance from "./api";

const checkAuth = async () => {
  try {
    const response = await axiosInstance.get('http://localhost:5000/api/auth/check-auth');
    return response.data;
  } catch (error) {
    console.error('Not authenticated', error);
    return { isAuthenticated: false, role: null };
  }
};

export default checkAuth;
