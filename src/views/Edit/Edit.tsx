import React, { useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store";
import { updatePost, resetState, fetchPostById, selectPost } from "features";
import { FormButton, FormInput } from "components";
import { Formik, Form } from "formik";
import { formSchema } from "./Edit.schema";
import { FormProps } from "types";

export const Edit = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const currentPost = useAppSelector(selectPost);

  const handleUpdatePost = useCallback(
    async (values: FormProps) => {
      await dispatch(updatePost(values));
      history.push("/");
    },
    [dispatch, history]
  );

  useEffect(() => {
    dispatch(fetchPostById(id));

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, id]);

  const initialValues: FormProps = {
    title: currentPost?.title,
    description: currentPost?.description,
    body: currentPost?.body,
    id,
  };

  if (!(currentPost?.title && currentPost?.body && currentPost.description)) {
    return <div>Loading</div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await handleUpdatePost(values);
      }}
      validationSchema={formSchema}
    >
      <Form>
        <FormInput name="title" />
        <FormInput name="description" />
        <FormInput name="body" />
        <FormButton name="save" />
      </Form>
    </Formik>
  );
};
