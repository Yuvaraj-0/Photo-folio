import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
<<<<<<< HEAD
=======

>>>>>>> Make image preview section scrollable and keep upload button visible
const API_URL = import.meta.env.VITE_API_URL;
// Async thunks to fetch albums and photos by album
export const fetchAlbums = createAsyncThunk('gallery/fetchAlbums', async () => {
  const response = await axios.get(`${API_URL}/api/albums`);
  return response.data; // expect [{id, name}, ...]
});

export const fetchPhotosByAlbum = createAsyncThunk('gallery/fetchPhotosByAlbum', async (albumId) => {
  const response = await axios.get(`${API_URL}/api/album/${albumId}/photos`);
  return response.data; // expect array of images
});

//DELETE BY ID

export const deleteImage = createAsyncThunk(
  'gallery/deleteImage',
  async (public_id, thunkAPI) => {
    if (!public_id) throw new Error('public_id is required');

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found');


      await axios.delete(`${API_URL}/api/images`, {

        data: { public_id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return public_id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);




export const uploadImages = createAsyncThunk(
  'gallery/uploadImages',
  async ({ images, album }) => {
   
    const formData = new FormData();

    // images should be array of File objects; confirm this in your component

    if (!images || images.length === 0) {
      throw new Error('No files to upload');
    }

    images.forEach(file => formData.append('images', file));  // MUST match multer field name

    formData.append('album', album);

    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/api/images/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.images;
  }
);



// New async thunk to upload images
// export const uploadImages = createAsyncThunk(
//   'gallery/uploadImages',
//   async ({ files, album }) => {
//     const API_URL = import.meta.env.VITE_API_URL;
//     const formData = new FormData();
//     files.forEach(file => formData.append('files', file));
//     formData.append('album', album);

//     const token = localStorage.getItem('token');
//     const response = await axios.post(`${API_URL}/api/images/upload`, formData, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     return response.data.images; // expect array of uploaded images
//   }
// );

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    albums: [],
    selectedAlbumId: null,
    images: [],
    selectedImages: [],   // For multi-select deletion
    selectedImage: null,
    showModal: false,
    loading: false,
    error: null,
  },
  reducers: {updateMetadata: (state, action) => {
    const updated = action.payload;
    const index = state.images.findIndex(
      (img) => img.id === updated.id || img.public_id === updated.public_id
    );
    if (index !== -1) {
      state.images[index] = updated;
      state.selectedImage = null;
      state.showModal = false;
    }
  },
  
    selectImage: (state, action) => {
      state.selectedImage = action.payload;
      state.showModal = true;
    },
    closeModal: (state) => {
      state.selectedImage = null;
      state.showModal = false;
    },
    toggleSelectImage: (state, action) => {
      const id = action.payload;
      if (state.selectedImages.includes(id)) {
        state.selectedImages = state.selectedImages.filter(imgId => imgId !== id);
      } else {
        state.selectedImages.push(id);
      }
    },
    clearSelectedImages: (state) => {
      state.selectedImages = [];
    },
    setSelectedAlbum: (state, action) => {
      state.selectedAlbumId = action.payload;
      state.images = [];
      state.selectedImages = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Albums
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.loading = false;
        state.albums = action.payload;
        if (!state.selectedAlbumId && action.payload.length > 0) {
          state.selectedAlbumId = action.payload[0].id;
        }
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Photos by album
      .addCase(fetchPhotosByAlbum.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.images = [];
        state.selectedImages = [];
      })
      .addCase(fetchPhotosByAlbum.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchPhotosByAlbum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete photos
      .addCase(deleteImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.loading = false;
        state.images = state.images.filter(img => !action.payload.includes(img.id || img.public_id));
        state.selectedImages = [];
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Upload images
      .addCase(uploadImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure payload is an array before spreading
        if (Array.isArray(action.payload)) {
          state.images.push(...action.payload);
        } else if (action.payload) {
          // If single object, just push it
          state.images.push(action.payload);
        }
      })
      
      .addCase(uploadImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectImage,
  closeModal,
  toggleSelectImage,
  clearSelectedImages,
  setSelectedAlbum,
  updateMetadata,
 
  
} = gallerySlice.actions;

export default gallerySlice.reducer;
