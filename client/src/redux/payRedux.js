import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isKey: false,
};

const paySlice = createSlice({
  name: "payData",
  initialState: {
    initialState,
  },
  reducers: {
    isKeyAvailable: (state, action) => {
      state.isKey = action.payload;
    },

    clearKeys: () => initialState,
  },
});

export const { isKeyAvailable, clearKeys } = paySlice.actions;
export default paySlice.reducer;
