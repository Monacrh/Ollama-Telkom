import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import uiStateReducer from './slices/uiStateSlice';
import userReducer from './slices/userSlice';
import classroomReducer from './slices/classroomSlice';
import chatReducer from './slices/chatSlice';
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
  uiState: uiStateReducer,
  user: userReducer,
  classroom: classroomReducer,
  chat: chatReducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
