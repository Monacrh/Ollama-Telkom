import apiClient from './index.js';

export const fetchClassrooms = async () => {
  try {
    const response = await apiClient.get('/classroom/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching classrooms data:', error);
    throw error;
  }
};

export const fetchClassroom = async (classID) => {
  try {
    const response = await apiClient.get(`/classroom/detail/${classID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching classroom data:', error);
    throw error;
  }
};

export const createClassroom = async (classData) => {
  try {
    const response = await apiClient.post('/classroom/create', classData);
    return response.data;
  } catch (error) {
    console.error('Error creating classroom:', error);
    throw error;
  }
}
