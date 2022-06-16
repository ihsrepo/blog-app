import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import type { RootState } from "store";
import { formatISO } from "date-fns";

const nameSpace = "posts";

export interface Post {
  id: string | null;
  title: string;
  description: string;
  body: string;
  author: {
    firstName: string;
    lastName: string;
    email: string;
  };
  date: unknown;
}

interface PostState {
  loading: boolean;
  items: Post[];
  currentPost: Post;
}

const initialState: PostState = {
  loading: false,
  items: [],
  currentPost: {
    id: null,
    title: "",
    description: "",
    body: "",
    author: {
      firstName: "John",
      lastName: "Doe",
      email: "john@doe.com",
    },
    date: new Date().getTime(),
  },
};

export const fetchPosts = createAsyncThunk(
  `${nameSpace}/fetchPosts`,
  async () => {
    const response = await fetch(`http://localhost:3001/posts`);
    return (await response.json()) as Post[];
  }
);

export const fetchPostById = createAsyncThunk(
  `${nameSpace}/fetchPostById`,
  async (postId: Post["id"], { dispatch }) => {
    await dispatch(fetchPosts());
    const response = await fetch(`http://localhost:3001/posts/${postId}`);
    return (await response.json()) as Post;
  }
);

export const createPost = createAsyncThunk(
  `${nameSpace}/createPost`,
  async (post: Omit<Post, "author" | "id" | "date">, { dispatch }) => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...post,
        author: initialState.currentPost.author,
        date: new Date().getTime(),
      }),
    });
    dispatch(resetState());
    return response;
  }
);

export const updatePost = createAsyncThunk(
  `${nameSpace}/createPost`,
  async (post: Omit<Post, "author" | "date">, { dispatch, getState }) => {
    const state = getState() as RootState;
    const response = await fetch(`http://localhost:3001/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...state.posts.items.find((x) => x.id === post.id),
        ...post,
      }),
    });
    dispatch(resetState());
    return response;
  }
);

export const deletePost = createAsyncThunk(
  `${nameSpace}/deletePost`,
  async (id: Post["id"]) => {
    const response = await fetch(`http://localhost:3001/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }
);

export const postSlice = createSlice({
  name: nameSpace,
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.currentPost.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.currentPost.description = action.payload;
    },
    setBody: (state, action: PayloadAction<string>) => {
      state.currentPost.body = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPostById.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.currentPost = action.payload;
          state.loading = false;
        }
      );
  },
});

export const { setTitle, setDescription, setBody, resetState } =
  postSlice.actions;

export const selectPosts = createSelector(
  [(state: RootState) => state.posts.items],
  (posts) => {
    return posts
      .map((x) => ({
        ...x,
        date: formatISO(new Date(x.date as Date), {
          representation: "date",
        }),
      }))
      .reverse();
  }
);

export const selectPost = createSelector(
  [(state: RootState) => state.posts.currentPost],
  (post) => {
    return {
      ...post,
      date: formatISO(new Date(post?.date as Date), {
        representation: "date",
      }),
    };
  }
);
