// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3002/api/auth/register', {
        email,
        password,
      });
      return response.data; // the returned user + token from backend
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;

