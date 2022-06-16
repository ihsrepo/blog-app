import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import type { RootState } from "store";

const nameSpace = "posts";

interface Post {
  title: string;
  description: string;
  body: string;
  author: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface PostState {
  loading: boolean;
  items: Post[];
  currentPost: {
    title: string;
    description: string;
    body: string;
    author: {
      firstName: "John";
      lastName: "Doe";
      email: "john@doe.com";
    };
  };
}

const initialState: PostState = {
  loading: false,
  items: [],
  currentPost: {
    title: "",
    description: "",
    body: "",
    author: {
      firstName: "John",
      lastName: "Doe",
      email: "john@doe.com",
    },
  },
};

export const fetchPosts = createAsyncThunk(
  `${nameSpace}/fetchPosts`,
  async () => {
    const response = await fetch(`http://localhost:3001/posts`);
    return (await response.json()) as Post[];
  }
);

export const postSlice = createSlice({
  name: nameSpace,
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = { ...action.payload };
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.currentPost.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.currentPost.description = action.payload;
    },
    setBody: (state, action: PayloadAction<string>) => {
      state.currentPost.body = action.payload;
    },
    resetState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
  },
});

export const { setPosts, setTitle, setDescription } = postSlice.actions;

export const selectPosts = createSelector(
  (state: RootState) => state.posts.items,
  (posts) => posts
);

export const isPostsLoading = (state: RootState) => state.posts.loading;
export const selectTitle = (state: RootState) => state.posts.currentPost.title;
export const selectDescription = (state: RootState) =>
  state.posts.currentPost.description;
export const selectBody = (state: RootState) => state.posts.currentPost.body;
