import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const apiAuthKey = import.meta.env.VITE_API_AUTH_KEY;

const apiClient = axios.create({
  baseURL: apiUrl,
});

apiClient.interceptors.request.use(
  (config) => {
    if (apiAuthKey) {
      config.headers['X-AUTH-KEY'] = apiAuthKey;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
