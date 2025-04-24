import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser } from '../../api/userApi';

const initialUser = {
  userID: '',
  name: '',
  userType: '',
  email: null,
  createdAt: '',
  updatedAt: '',
  deletedAt: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
    status: 'idle',
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = initialUser;
    },
    setLoading: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserAsync.rejected, (state) => {
        state.status = 'failed';
        state.user = initialUser;
        state.error = 'Failed to fetch user data';
      });
  },
});

export const { setUser, setLoading, setError, clearUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state) => state.user.user;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;

export const getUserAsync = createAsyncThunk('user/getUser', async () => {
  const response = await fetchUser();
  return response.data;
});
