import React from "react";
import { useFormik } from "formik";

function BaseForm({ initialValues, validationSchema, onSubmit, children, error }) {
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });
  
    return (
      <form onSubmit={formik.handleSubmit}>
        {typeof children === "function"
          ? children(formik, error) 
          : React.Children.map(children, (child) =>
              React.cloneElement(child, { formik, error })
            )}
      </form>
    );
  }
export default BaseForm;