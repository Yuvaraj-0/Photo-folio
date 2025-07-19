// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import imageReducer from './imageSlice';
import clientImageReducer from './ClientImageSlice';
import inquiryReducer from './inquirySlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    images: imageReducer,
    clientImages: clientImageReducer,
    inquiry: inquiryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: [
          'meta.config.transformRequest',
          'meta.config.transformResponse',
        ],
      },
    }),
});
export  default store