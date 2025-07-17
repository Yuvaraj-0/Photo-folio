// src/redux/imageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
export const fetchImageById = createAsyncThunk(
    'images/fetchById',
    async (imageId) => {
      const response = await axios.get(`${API_URL}/api/image/${imageId}`);
      return response.data;
    }
  );
export const fetchPhotosByAlbum = createAsyncThunk(
    'images/fetchByAlbum',
    async (albumId) => { // accept albumId as argument
      const res = await axios.get(`${API_URL}/api/album/${albumId}/photos`);
      return res.data;
    }
  );
  

  const imageSlice = createSlice({
    name: 'images',
    initialState: {
      images: [],
      currentImage: null,
      status: 'idle',
      error: null,
    },
    reducers: {
      clearImages: (state) => {
        state.images = [];
      },
      clearCurrentImage: (state) => {
        state.currentImage = null;
      },
    },
    extraReducers: (builder) => {
      builder
        // ✅ Album Images
        .addCase(fetchPhotosByAlbum.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPhotosByAlbum.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.images = action.payload;
        })
        .addCase(fetchPhotosByAlbum.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
  
        // ✅ Single Image
        .addCase(fetchImageById.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchImageById.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.currentImage = action.payload;
        })
        .addCase(fetchImageById.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
  
  export const { clearImages, clearCurrentImage } = imageSlice.actions;
  export default imageSlice.reducer;