import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  // creating a post
  postSuccessMessage: "",
  postFailureMessage: "",
  postCreationLoading: false,
  // fetch post variables
  fetchingPostFailure: "",
  fetchingPostLoading: false,
  // delete post variable
  deletingPostFailure: "",
  deletingPostLoading: false,
  // like and dislike variables
  likePostFailure: "",
  // update post variables
  updatePostLoading: false,
};

// create  a post
export const createPost = createAsyncThunk(
  "createPost",
  async (data, thunkAPI) => {
    const { email, ...postData } = data;
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/post/post?email=${email}`,
        postData
      );
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);
// fetch all posts
export const fetchPosts = createAsyncThunk("fetchPosts", async (thunkAPI) => {
  try {
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_API}/post/post`);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
  }
});
// delete a post
export const deletePost = createAsyncThunk(
  "deletePost",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const resp = await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/post/post?user_id=${data?.user_id}&post_id=${data?.post_id}`,
        { post_id: data?.post_id }
      );
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);
export const updatePost = createAsyncThunk(
  "updatePost",
  async (data, thunkAPI) => {
    console.log("this is text");
    console.log(data);
    try {
      const resp = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/post/post?user_id=${data?.user_id}&post_id=${data?.post_id}`,
        { post_id: data?.post_id, texts: data?.texts }
      );
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);
// like and dislike a post
export const likeAndDislike = createAsyncThunk(
  "like/dislike",
  async (data, thunkAPI) => {
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/post/like?user_id=${data?.user_id}&post_id=${data?.post_id}`
      );
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);
export const addComment = createAsyncThunk(
  "addComment",
  async (data, thunkAPI) => {
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/post/comment?user_id=${data?.user_id}&post_id=${data?.post_id}`,
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
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},

  extraReducers(builder) {
    // create post
    builder
      .addCase(createPost.pending, (state, action) => {
        state.postCreationLoading = true;
        console.log(state.postCreationLoading);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.postFailureMessage = action.error;
        state.postCreationLoading = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.postCreationLoading = false;
      })
      // fetching posts cases
      .addCase(fetchPosts.pending, (state, action) => {
        state.fetchingPostLoading = true;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.fetchingPostFailure = action.error;
        state.fetchingPostLoading = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.fetchingPostLoading = false;
      })
      // delete a post
      .addCase(deletePost.pending, (state, action) => {
        state.deletingPostLoading = true;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.deletingPostLoading = false;
        state.deletingPostFailure = action.error;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        console.log(action.payload);
        state.posts = state.posts.filter(
          (x) => x.post_id !== action.payload?.deletedPost?.post_id
        );
      })
      // like and dislike a post
      .addCase(likeAndDislike.fulfilled, (state, action) => {
        // Update the posts list with the updated post
        const { updatedPost } = action.payload;
        state.posts = state.posts.map((post) =>
          post.post_id === updatedPost.post_id ? updatedPost : post
        );
      })

      .addCase(addComment.rejected, (state, action) => {
        // Handle the rejected case if needed
        console.log(action.payload);
      })
      .addCase(likeAndDislike.rejected, (state, action) => {
        // Handle the rejected case if needed
        console.log(action.payload);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        // Update the posts list with the updated post
        const { updatedPost } = action.payload;
        state.posts = state.posts.map((post) =>
          post.post_id === updatedPost.post_id ? updatedPost : post
        );
      })
      // update the post
      .addCase(updatePost.pending, (state, action) => {
        state.updatePostLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { updatedPost } = action.payload;
        state.posts = state.posts.map((post) =>
          post.post_id === updatedPost.post_id ? updatedPost : post
        );
      });
  },
});
export default postSlice.reducer;
