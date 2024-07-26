import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ReloadCards: false,
  ReloadSpaces: false,
};

const infoSlice = createSlice({
  name: "info",
  initialState: {
    initialState,
  },
  reducers: {
    ReloadCards: (state) => {
      state.ReloadCards = (initialState) => !initialState;
    },
    ReloadSpaces: (state) => {
      state.ReloadSpaces = (initialState) => !initialState;
    },
    ReloadSpaceInfo: (state) => {
      state.ReloadSpaceInfo = (initialState) => !initialState;
    },
  },
});

export const { ReloadCards, ReloadSpaces, ReloadSpaceInfo } = infoSlice.actions;
export default infoSlice.reducer;
