import React from "react";
import { Field, ErrorMessage } from "formik";

export const FormInput = ({ name }: { name: string }) => {
  return (
    <div className="pt-5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      ></label>
      <div className="mt-1">
        <Field
          type="text"
          name={name}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder={name}
        />
        <div className="text-red-400">
          <ErrorMessage name={name} />
        </div>
      </div>
    </div>
  );
};
