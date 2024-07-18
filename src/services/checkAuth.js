import api from "./api";

const checkAuth = async () => {
  try {
    const response = await api.get('/user/check-auth');
    return response.data;
  } catch (error) {
    console.error('Not authenticated', error);
    return { isAuthenticated: false, role: null };
  }
};

export default checkAuth;
