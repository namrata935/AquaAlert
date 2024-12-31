import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalAmount: 0,  // This tracks the total donation amount
};

const donationSlice = createSlice({
  name: 'donation',
  initialState,
  reducers: {
    // Define actions to update the totalAmount
    donate: (state, action) => {
      state.totalAmount += action.payload;
    },
  },
});

export const { donate } = donationSlice.actions;

export default donationSlice.reducer;
