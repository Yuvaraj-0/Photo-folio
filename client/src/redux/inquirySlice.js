import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const submitInquiry = createAsyncThunk(
  'inquiry/submit',
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/api/post-quiry`, formData); // removed the extra object wrapper
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// // Fetch All Inquiries
// export const getInquiries = createAsyncThunk(
//   'inquiry/getAll',
//   async (formData, thunkAPI) => {
//     try {
//       const res = await axios.post(`${API_URL}/api/post-quiry`, formData);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );

const inquirySlice = createSlice({
  name: 'inquiry',
  initialState: {
    inquiries: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    resetInquiryState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitInquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitInquiry.fulfilled, (state) => {
        state.loading = false;
        state.success = 'Inquiry submitted successfully';
      })
      .addCase(submitInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Failed to submit';
      })
    //   .addCase(getInquiries.fulfilled, (state, action) => {
    //     state.inquiries = action.payload;
    //   })
    ;
  },
});

export const { resetInquiryState } = inquirySlice.actions;
export default inquirySlice.reducer;
