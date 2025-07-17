import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// 1. Fetch all client images
export const fetchClientImages = createAsyncThunk(
  'clientImages/fetchClientImages',
  async (clientAlbumId, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/api/client-images/${clientAlbumId}`);
      console.log("🎯 Backend image fetch success:", res.data);
      // Assuming res.data is directly an array of images:
      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch images'
      );
    }
  }
);


// 2. Send selected image to DB
export const sendSelectedImage = createAsyncThunk(
  "images/sendSelectedImage",
  async ({ clientId, imageId }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/api/selectedImg/add`, {
        clientId,
        imageId,
      });

      // ✅ Updated log
      console.log("<==>", res.data);

      return res.data;
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


// 3. Get selected images for client
export const getSelectedImages = createAsyncThunk(
  'clientImages/getSelectedImages',
  async (clientId, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/api/selectedImg/${clientId}`);
      console.log("->>> Selected images:", res.data);
      return Array.isArray(res.data) ? res.data : [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to load selected images'
      );
    }
  }
);

// 4. Soft-delete selected image (isDeleted: true)
// export const removeSelectedImage = createAsyncThunk(
//   'clientImages/removeSelectedImage',
//   async (selImageId, thunkAPI) => {
//     try {
//       await axios.put(`${API_URL}/api/soft-remove/${selImageId}`); // ⬅️ PUT, not DELETE
//       return selImageId;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to remove selected image'
//       );
//     }
//   }
// );

// 5. Restore soft-deleted image (isDeleted: false)
export const getBackSelectedImage = createAsyncThunk(
  'clientImages/getBackSelectedImage',
  async (selImageId, thunkAPI) => {
    try {
      console.log('🛠️ Restoring image ID:', selImageId);
      const res = await axios.put(`${API_URL}/api/restore/${selImageId}`);
      console.log('✅ Restore API success:', res.data);
      return selImageId;
    } catch (err) {
      console.error('❌ Restore API failed:', err.response?.data || err.message);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to restore selected image'
      );
    }
  }
);

// In ClientImageSlice.js
export const softRemoveSelectedImage = createAsyncThunk(
  'clientImages/softRemoveSelectedImage',
  async (selImageId, thunkAPI) => {
    try {
      await axios.put(`${API_URL}/api/soft-remove/${selImageId}`); // PUT endpoint to set isDeleted: true
      return selImageId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to soft remove selected image'
      );
    }
  }
);

export const restoreClientImage = createAsyncThunk(
  'clientImages/restoreClientImage',
  async (clientImageId, thunkAPI) => {
    try {
      const res = await axios.put(`${API_URL}/api/client-images/restore/${clientImageId}`);
      return res.data.image; // returns the updated image
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to restore image'
      );
    }
  }
);


const clientImageSlice = createSlice({
  name: 'clientImages',
  initialState: {
    images: [],
    selected: [],
    loading: false,
    error: null,
    selectStatus: null,
    selectError: null,
  },
  reducers: {
    clearSelectStatus: (state) => {
      state.selectStatus = null;
      state.selectError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch client images
      .addCase(fetchClientImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchClientImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Send selected image
      .addCase(sendSelectedImage.pending, (state) => {
        state.selectStatus = 'loading';
        state.selectError = null;
      })
      .addCase(sendSelectedImage.fulfilled, (state) => {
        state.selectStatus = 'success';
      })
      .addCase(sendSelectedImage.rejected, (state, action) => {
        state.selectStatus = 'error';
        state.selectError = action.payload;
      })

      // Get selected images
      .addCase(getSelectedImages.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(getSelectedImages.rejected, (state, action) => {
        state.error = action.payload;
      })

       // Soft remove (set isDeleted: true)
    .addCase(softRemoveSelectedImage.fulfilled, (state, action) => {
      // Remove from selected array in redux store
      state.selected = state.selected.filter(img => img._id !== action.payload);
    })
    .addCase(softRemoveSelectedImage.rejected, (state, action) => {
      state.error = action.payload;
    })
    // Restore deleted image (set isDeleted: false)
    .addCase(restoreClientImage.fulfilled, (state, action) => {
      // Optionally, remove the restored image from selected[] if you want
      state.selected = state.selected.filter(img => img.imageId._id !== action.payload._id);
    })
    .addCase(restoreClientImage.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { clearSelectStatus } = clientImageSlice.actions;
export default clientImageSlice.reducer;
