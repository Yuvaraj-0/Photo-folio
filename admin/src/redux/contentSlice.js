import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedSection: 'home',
  content: {
    home: { heading: '', body: '' },
    about: { heading: '', body: '' },
  },
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setSection: (state, action) => {
      state.selectedSection = action.payload;
    },
    updateContent: (state, action) => {
      const { section, heading, body } = action.payload;
      state.content[section] = { heading, body };
    },
  },
});

export const { setSection, updateContent } = contentSlice.actions;
export default contentSlice.reducer;
