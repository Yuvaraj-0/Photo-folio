
// 4. gallerySlice.js
import { createSlice } from '@reduxjs/toolkit';

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    images: [],
    selectedImage: null,
    showModal: false,
  }, 
  reducers: {
    addImages: (state, action) => {
      const payload = Array.isArray(action.payload)
        ? action.payload
        : [action.payload]; // ✅ always an array
      state.images.push(...payload);
    },
  
    removeImage: (state, action) => {
      state.images = state.images.filter(img => img.public_id !== action.payload);
    },
    selectImage: (state, action) => {
      state.selectedImage = action.payload;
      state.showModal = true;
    },
    closeModal: (state) => {
      state.selectedImage = null;
      state.showModal = false;
    },
    updateMetadata: (state, action) => {
      const index = state.images.findIndex(img => img.public_id === action.payload.public_id);
      if (index !== -1) {
        state.images[index] = action.payload;
        state.showModal = false;
      }
    },
  },
});

export const { addImages, removeImage, selectImage, closeModal, updateMetadata } = gallerySlice.actions;
export default gallerySlice.reducer;
