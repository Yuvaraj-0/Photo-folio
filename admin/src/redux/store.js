// 5. store.js
import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './gallerySlice';
import contentReducer from './contentSlice';
import statsReducer from './statsSlice';
import clientAlbumReducer from './clientAlbumSlice';
import imageUploadReducer from './imageUploadSlice';
export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    content: contentReducer,
    stats: statsReducer,
    clientAlbum: clientAlbumReducer,
    imageUpload: imageUploadReducer,
  },
});