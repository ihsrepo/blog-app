import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "store";
import { createPost, resetState } from "features";
import { FormInput, FormButton } from "components";
import { Formik, Form } from "formik";
import { formSchema } from "./Create.schema";
import { BaseFormProps } from "types";

export const Create = () => {
  const dispatch = useAppDispatch();
  let history = useHistory();

  const handleCreatePost = useCallback(
    async (values: BaseFormProps) => {
      await dispatch(createPost(values));
      history.push("/");
    },
    [dispatch, history]
  );

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  const initialValues: BaseFormProps = { title: "", description: "", body: "" };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await handleCreatePost(values);
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
