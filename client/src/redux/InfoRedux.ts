import { createSlice } from "@reduxjs/toolkit";
import z from "zod";


const infoStateSchema = z.object({
  ReloadCards:z.boolean(),
  ReloadSpaces:z.boolean(),
  ReloadSpaceInfo:z.boolean()

})

type InfoState = z.infer<typeof infoStateSchema>

const initialState:InfoState = {
  ReloadCards: false,
  ReloadSpaces: false,
  ReloadSpaceInfo: false,
};

const infoSlice = createSlice({
  name: "info",
  initialState: 
    initialState,
  
  reducers: {
    ReloadCards: (state) => {
      state.ReloadCards = !state.ReloadCards;
    },
    ReloadSpaces: (state) => {
      state.ReloadSpaces =!state.ReloadSpaces;
    },
    ReloadSpaceInfo: (state) => {
      state.ReloadSpaceInfo = !state.ReloadSpaceInfo;
    },
  },
});

export const { ReloadCards, ReloadSpaces, ReloadSpaceInfo } = infoSlice.actions;
export default infoSlice.reducer;
