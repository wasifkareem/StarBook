import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isKey: false,
  keyId: null,
  isTipOpen: false,
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
    tipToggle: (state, action) => {
      state.isTipOpen = action.payload;
    },
    keyIdInfo: (state, action) => {
      state.keyId = action.payload;
    },

    clearKeys: () => initialState,
  },
});

export const { isKeyAvailable, clearKeys, keyIdInfo, tipToggle } =
  paySlice.actions;
export default paySlice.reducer;
