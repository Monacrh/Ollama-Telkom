import apiClient from "./index.js";

export const login = async (userData) => {
  try {
    const response = await apiClient.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    console.error('Error login:', error);
    throw error;
  }
};

export const registration = async (userData) => {
  try {
    const response = await apiClient.get('/auth/registration', userData);
    return response.data;
  } catch (error) {
    console.error('Error registration:', error);
    throw error;
  }
}
