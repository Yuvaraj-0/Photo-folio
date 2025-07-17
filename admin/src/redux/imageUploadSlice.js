import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const uploadImages = createAsyncThunk(
  'imageUpload/uploadImages',
  async ({ clientId, images }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      images.forEach((img) => formData.append('images', img));

      const response = await axios.post(`${API_URL}/api/upload/${clientId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Image upload failed');
    }
  }
);

const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState: {
    uploading: false,
    success: null,
    error: null,
  },
  reducers: {
    clearUploadStatus: (state) => {
      state.uploading = false;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.uploading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.uploading = false;
        state.success = action.payload.message || 'Upload successful';
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload || 'Upload failed';
      });
  },
});

export const { clearUploadStatus } = imageUploadSlice.actions;
export default imageUploadSlice.reducer;
