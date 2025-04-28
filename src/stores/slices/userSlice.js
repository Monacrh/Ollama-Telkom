import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser, fetchListStudents, fetchListLecturers, fetchListModels, updateUser } from '../../api/userApi';

const initialUser = {
  userID: '',
  name: '',
  userType: '',
  email: null,
  createdAt: '',
  updatedAt: '',
  deletedAt: null,
};

const initialStudents = [];
const initialLecturers = [];
const initialModels = [];

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
    students: initialStudents,
    lecturers: initialLecturers,
    models: initialModels,
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
      })

      .addCase(getListStudentsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getListStudentsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.students = action.payload;
        state.error = null;
      })
      .addCase(getListStudentsAsync.rejected, (state) => {
        state.status = 'failed';
        state.students = initialStudents;
        state.error = 'Failed to fetch user data';
      })

      .addCase(getListLecturersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getListLecturersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.lecturers = action.payload;
        state.error = null;
      })
      .addCase(getListLecturersAsync.rejected, (state) => {
        state.status = 'failed';
        state.lecturers = initialLecturers;
        state.error = 'Failed to fetch user data';
      })

      .addCase(getListModelsAsync.pending, (state) => {
        state.status = 'loading';
      })
      // .addCase(getListStudentsAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.models = action.payload;
      //   state.error = null;
      // })
      // .addCase(getListStudentsAsync.rejected, (state) => {
      //   state.status = 'failed';
      //   state.models = initialModels;
      //   state.error = 'Failed to fetch user data';
      // });
      .addCase(getListModelsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.models = action.payload;
        state.error = null;
      })
      .addCase(getListModelsAsync.rejected, (state) => {
        state.status = 'failed';
        state.models = initialModels;
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

export const getListStudentsAsync = createAsyncThunk('user/getListStudents', async () => {
  const response = await fetchListStudents();
  return response.data;
});

export const getListLecturersAsync = createAsyncThunk('user/getListLecturers', async () => {
  const response = await fetchListLecturers();
  return response.data;
});

export const getListModelsAsync = createAsyncThunk('user/getListModels', async () => {
  const response = await fetchListModels();
  return response.data;
});

export const updateUserAsync = createAsyncThunk('user/updateUser', async (userData) => {
  const response = await updateUser(userData);
  return response.data;
});
