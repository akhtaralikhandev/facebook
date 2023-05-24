import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  user: {},
  email: "",
  userLoading: false,
  userLoadingError: false,
  // updateUser
  updateUserLoading: false,
  updataUserMessageError: "",
};
export const fetchUser = createAsyncThunk(
  "getUser",
  async (email, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/profile/profile?email=${email}`
      );
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const resp = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/profile/profile?email=${data?.email}`,
        data
      );
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    addEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // fetch user cases
      .addCase(fetchUser.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.userLoadingError = action.error;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      // update user cases
      .addCase(updateUser.pending, (state, action) => {
        state.updateUserLoading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updataUserMessageError = action.error;
        state.updateUserLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserLoading = false;
        state.user = action.payload;
      });
  },
});
export const { loginUser, addEmail } = userSlice.actions;
export default userSlice.reducer;
