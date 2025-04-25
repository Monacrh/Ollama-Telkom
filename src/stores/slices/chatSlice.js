// sliceChat.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { chatAPI } from '../../api/chatApi';
import apiClient from '../../api';

const initialState = {
  chats: [],
  currentChatItems: [],
  loading: false,
  error: null
};

export const createChat = createAsyncThunk(
  'chat/create',
  async (chatTitle, { rejectWithValue }) => {
    try {
      const response = await chatAPI.createChat(chatTitle);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create chat');
    }
  }
);

export const fetchChats = createAsyncThunk(
  'chat/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await chatAPI.getChats();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch chats');
    }
  }
);

export const fetchChatItems = createAsyncThunk(
  'chat/fetchItems',
  async (chatID, { rejectWithValue }) => {
    try {
      const response = await chatAPI.getChatItems(chatID);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch chat messages');
    }
  }
);

export const sendChatMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ chatID, message }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/chat/session/item', { chatID, message });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchSelectedChats = createAsyncThunk(
  'chat/fetchSelected',
  async (chatID, { rejectWithValue }) => {
    try {
      const response = await chatAPI.getSelectedChats(chatID);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch chats');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearCurrentChatItems: (state) => {
      state.currentChatItems = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Chat
      .addCase(createChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.length > 0) {
          state.chats.unshift(action.payload[0]);
        }
      })
      .addCase(createChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Chats
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Selected Chats
      .addCase(fetchSelectedChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSelectedChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(fetchSelectedChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Chat Items
      .addCase(fetchChatItems.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentChatItems = [];
      })
      .addCase(fetchChatItems.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChatItems = action.payload;
      })
      .addCase(fetchChatItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Send Message
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChatItems.push(action.payload);
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentChatItems } = chatSlice.actions;
export default chatSlice.reducer;