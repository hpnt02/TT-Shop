import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  sidebarShow: true,
  theme: 'light',
};

// Create a slice
const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    set: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

// Export the action
export const { set } = menuSlice.actions;
export default menuSlice.reducer;