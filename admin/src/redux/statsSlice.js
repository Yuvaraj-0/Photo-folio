import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStats = createAsyncThunk('stats/fetchStats', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('/api/stats', {
      
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // Clear user data from localStorage or Redux
      localStorage.removeItem("user"); // or dispatch logout action
      window.location.href = "/login"; // Redirect to login page
    }
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    
  }
});

const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    data: {
      totalImages: 0,
      totalAlbums: 0,
      totalInquiries: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(fetchStats.pending, state => {
      console.log('fetchStats pending');
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchStats.fulfilled, (state, action) => {
      console.log('fetchStats fulfilled:', action.payload);
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchStats.rejected, (state, action) => {
      console.log('fetchStats rejected:', action.payload);
      state.loading = false;
      state.error = action.payload || 'Failed to fetch stats';
    });
    
  },
});

export default statsSlice.reducer;
