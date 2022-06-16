import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  title: Yup.string().max(50, "Too Long!").required("Required"),
  description: Yup.string().max(250, "Too Long!").required("Required"),
  body: Yup.string().required("Required"),
});
