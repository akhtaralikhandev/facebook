import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  // list of groups
  groups: [],
  // create group
};
export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducer: {
    createGroup: (state, action) => {
      state.groups?.unshift(action.payload);
    },
  },
  extraReducers: {},
});
export const { createGroup } = messageSlice.actions;
export default messageSlice.reducer;
