import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { fetchPosts, selectPosts } from "features/postsSlice";

export const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      {posts.map((x, i) => (
        <div key={i}>{x.title}</div>
      ))}
    </div>
  );
};
