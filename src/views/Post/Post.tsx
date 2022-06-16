import React, { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { fetchPostById, selectPost, resetState, deletePost } from "features";
import { useParams, Link, useHistory } from "react-router-dom";

export const Post = () => {
  const dispatch = useAppDispatch();
  const { title, description, body, date, author } = useAppSelector(selectPost);

  const { id } = useParams<{ id: string }>();

  const history = useHistory();

  const handleDeletePost = useCallback(async () => {
    await dispatch(deletePost(id));
    history.push("/");
  }, [dispatch, id, history]);

  useEffect(() => {
    dispatch(fetchPostById(id));

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, id]);

  return (
    <>
      <div className="relative prose lg:prose-xl mx-auto pt-12 pb-12">
        <div className="text-lg">
          <h1>
            <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
              Introducing
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </span>
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              <time dateTime={date}>{date}</time>
              <br />
              {author.firstName} {author.lastName}
              <br />
              {author.email}
            </p>
            <div>
              <button
                className="bg-gray-100 text-gray-900 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium no-underline mr-4"
                onClick={() => handleDeletePost()}
              >
                Delete post
              </button>
              <Link
                className="bg-gray-100 text-gray-900 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium no-underline"
                to={`/edit/${id}`}
              >
                Edit post
              </Link>
            </div>
          </div>
          <p className="mt-8 text-xl text-gray-500 leading-8">{description}</p>
        </div>
        <div
          className="mt-6 prose prose-indigo prose-lg text-gray-500 max-w-full"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </>
  );
};
