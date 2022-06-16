import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { fetchPosts, selectPosts } from "features/postsSlice";
import { Link } from "react-router-dom";

export const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto pt-12">
      <div className="relative mx-auto divide-y-2 divide-gray-200">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          {posts.map((x) => (
            <Link key={x.id} to={`/post/${x.id}`}>
              <p className="text-sm text-gray-500">
                <time dateTime={x.date}>{x.date}</time>
              </p>
              <span className="mt-2 block">
                <p className="text-xl font-semibold text-gray-900">{x.title}</p>
                <p className="mt-3 text-base text-gray-500">{x.description}</p>
              </span>
              <div className="mt-3">
                <span className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
                  Read full story
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
