import apiClient from "./index.js";

export const fetchUser = async () => {
  try {
    const response = await apiClient.get('/user/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const fetchListStudents = async () => {
  try {
    const response = await apiClient.get('/user/students');
    return response.data;
  } catch (error) {
    console.error('Error fetching students list:', error);
    throw error;
  }
}

export const fetchListLecturers = async () => {
  try {
    const response = await apiClient.get('/user/lecturer');
    return response.data;
  } catch (error) {
    console.error('Error fetching lecturers list:', error);
    throw error;
  }
}

export const fetchListModels = async () => {
  try {
    const response = await apiClient.get('/user/models');
    return response.data;
  } catch (error) {
    console.error('Error fetching models list:', error);
    throw error;
  }
}

export const updateUser = async (userData) => {
  try {
    const response = await apiClient.put('/user/profile', userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
}
