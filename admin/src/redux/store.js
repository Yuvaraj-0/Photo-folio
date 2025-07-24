// 5. store.js
import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './gallerySlice';
import contentReducer from './contentSlice';
import statsReducer from './statsSlice';
import clientAlbumReducer from './clientAlbumSlice';
import imageUploadReducer from './imageUploadSlice';
import clientImageReducer from './clientImage';
import inquiryReducer from './inquirySlice';
import authReducer from './authSlice';
import imageReducer from './adminAproval';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    gallery: galleryReducer,
    content: contentReducer,
    stats: statsReducer,
    clientAlbum: clientAlbumReducer,
    imageUpload: imageUploadReducer,
    clientImages: clientImageReducer,
    inquiry: inquiryReducer,
    images: imageReducer,
    
  },
});