import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=> {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) =>
  axios.delete(`/posts/${id}`),
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {}, // Замените "reducer" на "reducers"
  extraReducers: {
    // Получение статей
    [fetchPosts.pending]: (state) => {
      console.log("fetchPosts is pending");
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      console.log("fetchPosts is fulfilled", action.payload);
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state, action) => {
      console.error("Error fetching posts:", action.error);
      state.posts.items = [];
      state.posts.status = 'error';
    },

    // Удаление статей
    [fetchRemovePost.pending]: (state, action) => {
      console.log("fetchRemovePost is pending");
    },
    [fetchRemovePost.fulfilled]: (state, action) => {
      console.log("fetchRemovePost is fulfilled");
      state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
    },
    [fetchRemovePost.rejected]: (state, action) => {
      console.log("fetchRemovePost is rejected");
    },
  },
});

export const postsReducer = postsSlice.reducer;

