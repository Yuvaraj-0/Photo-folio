import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


export const fetchClientImages = createAsyncThunk(
  'clientImages/fetchClientImages',
  async (clientAlbumId, thunkAPI) => {
    try {
      console.log('➡️ Fetching images for clientAlbumId:', clientAlbumId);
      const res = await axios.get(`${API_URL}/api/client-images/getAll/${clientAlbumId}`);
      console.log('🎯 Backend image fetch success:', res.data);
      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      console.error('❌ Error fetching client images:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch images'
      );
    }
  }
);

export const getSelectedImages = createAsyncThunk(
  'clientImages/getSelectedImages',
  async (clientId, thunkAPI) => {
    try {
      console.log('Album ID:'); // add this to debug

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
export const approveSelectedImage = createAsyncThunk(
    'clientImages/approveSelectedImage',
    async (selectedImageId, thunkAPI) => {
      try {
        const res = await axios.put(`${API_URL}/api/selectedImg/approve/${selectedImageId}`);
        return res.data.updated;  // return updated selected image object
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to approve image');
      }
    }
  );
  
  export const approveAllImagesByClient = createAsyncThunk(
    "selectedImages/approveAll",
    async (clientId, thunkAPI) => {
      try {
        
        const res = await axios.put(`${API_URL}/api/approve-all/${clientId}`);
        
        return res.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

const clientImageSlice = createSlice({
  name: 'clientImages',
  initialState: {
    images: [],
    selectedImages: [],
    status: 'idle',
    loading: false,
    approveStatus: "idle",
    approveMessage: "",
    error: null,
    selectStatus: 'idle',
    selectError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchClientImages handlers
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

      // getSelectedImages handlers
      .addCase(getSelectedImages.pending, (state) => {
        state.selectStatus = 'loading';
        state.selectError = null;
      })
      .addCase(getSelectedImages.fulfilled, (state, action) => {
        state.selectStatus = 'succeeded';
        state.selectedImages = action.payload;
      })
      .addCase(getSelectedImages.rejected, (state, action) => {
        state.selectStatus = 'failed';
        state.selectError = action.payload;
      })



      




  .addCase(approveSelectedImage.fulfilled, (state, action) => {
    // Replace approved image in selectedImages array
    const index = state.selectedImages.findIndex(img => img._id === action.payload._id);
    if (index !== -1) {
      state.selectedImages[index] = action.payload;
    }
  })

  .addCase(approveAllImagesByClient.pending, (state) => {
    state.approveStatus = "loading";
    state.error = null;
  })
  .addCase(approveAllImagesByClient.fulfilled, (state, action) => {
    state.approveStatus = "succeeded";
    state.approveMessage = action.payload.message;
  })
  .addCase(approveAllImagesByClient.rejected, (state, action) => {
    state.approveStatus = "failed";
    state.error = action.payload?.error || "Something went wrong";
  });
  },
});

export default clientImageSlice.reducer;

