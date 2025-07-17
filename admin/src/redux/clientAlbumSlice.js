// src/redux/clientAlbumSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const createClientAlbum = createAsyncThunk(
  'clientAlbum/create',
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/client-albums`, clientData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Error creating album');
    }
  }
);
// get all client data
export const fetchClientAlbums = createAsyncThunk('clientAlbum/fetchAll', async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/client-albums`);
    return res.data;
  });

const clientAlbumSlice = createSlice({
  name: 'clientAlbum',
  initialState: {
    albums: [],
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {
    clearStatus: (state) => {
      state.status = 'idle';
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClientAlbum.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createClientAlbum.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
      })
      .addCase(createClientAlbum.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

  
    
    builder
    .addCase(fetchClientAlbums.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchClientAlbums.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.albums = action.payload;
    })
    .addCase(fetchClientAlbums.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

export const { clearStatus } = clientAlbumSlice.actions;
export default clientAlbumSlice.reducer;
