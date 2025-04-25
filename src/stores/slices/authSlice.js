import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, registration } from '../../api/authApi';

const initialUserLogin = {
    userID: "",
    password: "",
};

const initialUserRegistration = {
    userID: "",
    password: "",
    name: "",
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userLogin: initialUserLogin,
    userRegistration: initialUserRegistration,
    status: 'idle',
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userLogin = action.payload;
        state.error = null;
      })
      .addCase(postLogin.rejected, (state) => {
        state.status = 'failed';
        state.userLogin = initialUserLogin;
        state.error = 'Failed to fetch user data';
      })

      .addCase(postRegistration.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postRegistration.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userRegistration = action.payload;
        state.error = null;
      })
      .addCase(postRegistration.rejected, (state) => {
        state.status = 'failed';
        state.userRegistration = initialUserRegistration;
        state.error = 'Failed to fetch user data';
      })
  },
});

export const { setLoading, setError } = authSlice.actions;

export default authSlice.reducer;

export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;

export const postLogin = createAsyncThunk('user/login', async () => {
  const response = await login();
  return response.data;
});

export const postRegistration = createAsyncThunk('auth/registration', async (userData) => {
  const response = await registration(userData);
  return response.data;
});
