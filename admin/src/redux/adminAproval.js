import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
export const fetchUnapprovedImages = createAsyncThunk(
  'images/fetchUnapprovedImages',  // keep this
  async (clientId) => {
    const res = await axios.get(`${API_URL}/api/unapproved/${clientId}`);
    console.log("Unapproved data<<<===", res.data);
    return res.data;
  }
);

export const fetchApprovedImages = createAsyncThunk( // renamed variable as well (capital A)
  'images/fetchApprovedImages',  // changed prefix here
  async (clientId) => {
    const res = await axios.get(`${API_URL}/api/approved/${clientId}`);
    console.log("Approved data<<<===", res.data);
    return res.data;
  }
);

export const deleteSelImages = createAsyncThunk(
    'selImages/deleteSelImages',
    async ({ imageIds, clientId }, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`${API_URL}/api/delete/sel-images`, {
          data: { imageIds, clientId },
        });
        return response.data.results;
      } catch (error) {
        return rejectWithValue(error.response.data.message || 'Delete failed');
      }
    }
  );

const imageSlice = createSlice({
  name: 'images',
  initialState: {
    unapproved: [],
    approved: [],
    loading: false,
    error: null,
    items: [], // all selected images
    deleteStatus: 'idle',
    deleteError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnapprovedImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnapprovedImages.fulfilled, (state, action) => {
        state.loading = false;
        state.unapproved = action.payload;
      })
      .addCase(fetchUnapprovedImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchApprovedImages.pending, (state) => {  // use fetchApprovedImages here
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApprovedImages.fulfilled, (state, action) => {
        state.loading = false;
        state.approved = action.payload;
      })
      .addCase(fetchApprovedImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(deleteSelImages.pending, (state) => {
        state.deleteStatus = 'loading';
        state.deleteError = null;
      })
      .addCase(deleteSelImages.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        const deletedIds = action.payload.map((res) => res.id);
        state.items = state.items.filter((img) => !deletedIds.includes(img._id));
      })
      .addCase(deleteSelImages.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.deleteError = action.payload;
      });
  },
});

export default imageSlice.reducer;
