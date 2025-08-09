import { createSlice } from "@reduxjs/toolkit";
import z from "zod";


const payStateSchema = z.object({
  isKey:z.boolean(),
  keyId:z.string().nullable(),
  isTipOpen:z.boolean()
})
type payState = z.infer<typeof payStateSchema>
const initialState:payState = {
  isKey: false,
  keyId: null,
  isTipOpen: false,
};

const paySlice = createSlice({
  name: "payData",
  initialState,
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
