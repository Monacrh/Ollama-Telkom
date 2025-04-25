import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchClassrooms, fetchClassroom, createClassroom } from '../../api/classroomsApi';

const initialClassrooms = [
  {
    classID: "",
    className: "",
    classNickname: "",
    classDescription: ""
  }
];

const initialClassroom = {
  className: "",
  classDescription: "",
  classNickname: "",
  listOfLecturer: [
    {
      userID: "",
      name: "",
      password: "",
      userType: "",
      email: null,
      createdAt: "",
      updatedAt: "",
      deletedAt: null
    }
  ],
  listOfStudent: [],
  classID: "",
  chat: {
      chatID: "",
      chatTitle: ""
  }
};

export const classroomSlice = createSlice({
  name: 'classroom',
  initialState: {
    classrooms: initialClassrooms,
    selectedClassroom: initialClassroom,
    status: 'idle',
    error: null,
  },
  reducers: {
    setClassrooms: (state, action) => {
      state.classrooms = action.payload;
    },
    setSelectedClassroom: (state, action) => {
      state.selectedClassroom = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearClassroom: (state) => {
      state.selectedClassroom = initialClassroom;
    },
    clearClassrooms: (state) => {
      state.classrooms = initialClassrooms;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClassroomsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getClassroomsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.classrooms = action.payload;
        state.error = null;
      })
      .addCase(getClassroomsAsync.rejected, (state) => {
        state.status = 'failed';
        state.classrooms = initialClassrooms;
        state.error = 'Failed to fetch classrooms data';
      })
      .addCase(getClassroomAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getClassroomAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedClassroom = action.payload;
        state.error = null;
      })
      .addCase(getClassroomAsync.rejected, (state) => {
        state.status = 'failed';
        state.selectedClassroom = initialClassroom;
        state.error = 'Failed to fetch classroom data';
      })
      .addCase(createClassroomAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createClassroomAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.error = null;
      })
      .addCase(createClassroomAsync.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch classroom data';
      });
  },
});

export const { setClassrooms, setSelectedClassroom, clearClassroom, clearClassrooms,setError, setStatus } = classroomSlice.actions;

export default classroomSlice.reducer;

export const selectClassrooms = (state) => state.classroom.classrooms;
export const selectSelectedClassroom = (state) => state.classroom.selectedClassroom;
export const selectLoading = (state) => state.classroom.loading;
export const selectError = (state) => state.classroom.error;

export const getClassroomsAsync = createAsyncThunk('classroom/getClassrooms', async () => {
  const response = await fetchClassrooms();
  return response.data;
});

export const getClassroomAsync = createAsyncThunk('classroom/getClassroom', async (classID) => {
  const response = await fetchClassroom(classID);
  return response.data;
});

export const createClassroomAsync = createAsyncThunk('classroom/createClassroom', async (classroomData) => {
  const response = await createClassroom(classroomData);
  return response;
})
