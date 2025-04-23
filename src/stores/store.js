import { configureStore } from '@reduxjs/toolkit';
import uiStateReducer from './slices/uiStateSlice';

const store = configureStore({
  reducer: {
    uiState: uiStateReducer,
  },
});
export default store;
