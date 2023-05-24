import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  likes: [],
};
export const likesSlice = createSlice({
  name: "user",
  initialState,
  reducer: {},
  extraReducers: {},
});

export default likesSlice.reducer;
