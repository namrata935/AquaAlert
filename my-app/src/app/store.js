import { configureStore } from '@reduxjs/toolkit';
import donationReducer from './donationSlice'; // Import your donation slice

export const store = configureStore({
  reducer: {
    donation: donationReducer, // Add donation reducer here
  },
});
