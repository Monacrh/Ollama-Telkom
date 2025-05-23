import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const apiAuthKey = import.meta.env.VITE_API_AUTH_KEY;

const apiClient = axios.create({
  baseURL: apiUrl,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['X-AUTH-KEY'] = token; // Use X-AUTH-KEY header here
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
