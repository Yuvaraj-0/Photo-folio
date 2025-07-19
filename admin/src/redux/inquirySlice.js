// features/inquiry/inquirySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;





export const fetchInquiries = createAsyncThunk('inquiry/fetchInquiries', async () => {
    const res = await axios.get(`${API_URL}/api/get-quiry`,{
       
    }); // use correct route
    return res.data;
  });
  
  export const deleteInquiry = createAsyncThunk('inquiry/deleteInquiry', async (id) => {
    await axios.delete(`${API_URL}/api/delete-quiry/${id}`);
    return id;
  });
  

const inquirySlice = createSlice({
  name: 'inquiry',
  initialState: {
    inquiries: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInquiries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInquiries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.inquiries = action.payload;
      })
      .addCase(fetchInquiries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteInquiry.fulfilled, (state, action) => {
        // Remove deleted inquiry from state
        state.inquiries = state.inquiries.filter(inq => inq._id !== action.payload);
      });
  },
});

export default inquirySlice.reducer;
