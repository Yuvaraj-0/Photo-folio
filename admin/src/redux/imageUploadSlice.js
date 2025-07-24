import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Async Thunk to upload images
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

// Async Thunk to delete single or multiple images
export const deleteClientImages = createAsyncThunk(
  'imageUpload/deleteClientImages',
  async (imageIds, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/api/delete/client-images`, {
        data: { imageIds },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Delete failed');
    }
  }
);

export const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState: {
    uploading: false,
    success: null,
    error: null,
    deleting: false,
    deleteSuccess: null,
    deleteError: null,
  },
  reducers: {
    clearUploadStatus: (state) => {
      state.uploading = false;
      state.success = null;
      state.error = null;
    },
    clearDeleteStatus: (state) => {
      state.deleting = false;
      state.deleteSuccess = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    // Upload
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
        state.error = action.payload;
      });

    // Delete
    builder
      .addCase(deleteClientImages.pending, (state) => {
        state.deleting = true;
        state.deleteSuccess = null;
        state.deleteError = null;
      })
      .addCase(deleteClientImages.fulfilled, (state, action) => {
        state.deleting = false;
        state.deleteSuccess = action.payload.message || 'Delete successful';
      })
      .addCase(deleteClientImages.rejected, (state, action) => {
        state.deleting = false;
        state.deleteError = action.payload;
      });
  },
});

export const { clearUploadStatus, clearDeleteStatus } = imageUploadSlice.actions;
export default imageUploadSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export const uploadImages = createAsyncThunk(
//   'imageUpload/uploadImages',
//   async ({ clientId, images }, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       images.forEach((img) => formData.append('images', img));

//       const response = await axios.post(`${API_URL}/api/upload/${clientId}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Image upload failed');
//     }
//   }
// );

// export const deleteClientImages = createAsyncThunk(
//   'clientImages/deleteClientImages',
//   async (imageIds, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete('/api/client-images', {
//         data: { imageIds }
//       });
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// const imageUploadSlice = createSlice({
//   name: 'imageUpload',
//   initialState: {
//     uploading: false,
//     success: null,
//     error: null,
//   },
//   reducers: {
//     clearUploadStatus: (state) => {
//       state.uploading = false;
//       state.success = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(uploadImages.pending, (state) => {
//         state.uploading = true;
//         state.success = null;
//         state.error = null;
//       })
//       .addCase(uploadImages.fulfilled, (state, action) => {
//         state.uploading = false;
//         state.success = action.payload.message || 'Upload successful';
//       })
//       .addCase(uploadImages.rejected, (state, action) => {
//         state.uploading = false;
//         state.error = action.payload || 'Upload failed';
//       });
//   },
// });

// export const { clearUploadStatus } = imageUploadSlice.actions;
// export default imageUploadSlice.reducer;
