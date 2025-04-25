import apiClient from './index.js';

export const chatAPI = {
  createChat: async (chatTitle) => {
    const response = await apiClient.post('/chat/session', { chatTitle });
    return response.data.data;
  },

  getChats: async () => {
    const response = await apiClient.get('/chat/session');
    return response.data.data;
  },

  getChatItems: async (chatID) => {
    const response = await apiClient.get(`/chat/session/${chatID}/items`);
    return response.data.data;
  },

  // sendMessage: async (chatID, message) => {
  //   const response = await apiClient.post(`/chat/session/${chatID}/items`, { message });
  //   return response.data.data;
  // }
  sendMessage: (chatID, message) => 
  apiClient.post('/chat/session/item', { 
    chatID,    
    message   
  }),

  getSelectedChats: async (chatID) => {
    const response = await apiClient.get(`/chat/session/${chatID}`);
    return response.data.data;
  }
};

// ApiChat.js
// import axios from 'axios';

// const API_BASE = 'http://localhost:3000/api/v1/chat';

// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return {
//     'x-auth-key': token,
//     'Content-Type': 'application/json'
//   };
// };

// export const chatAPI = {
//   createChat: async (chatTitle) => {
//     const response = await axios.post(`${API_BASE}/session`, { chatTitle }, { headers: getAuthHeaders() });
//     return response.data.data;
//   },

//   getChats: async () => {
//     const response = await axios.get(`${API_BASE}/session`, { headers: getAuthHeaders() });
//     return response.data.data;
//   },

//   getChatItems: async (chatID) => {
//     const response = await axios.get(`${API_BASE}/session/${chatID}/items`, { headers: getAuthHeaders() });
//     return response.data.data;
//   },

//   sendMessage: async (chatID, message) => {
//     const response = await axios.post(
//       `${API_BASE}/session/${chatID}/items`,
//       { message },
//       { headers: getAuthHeaders() }
//     );
//     return response.data.data;
//   }
// };