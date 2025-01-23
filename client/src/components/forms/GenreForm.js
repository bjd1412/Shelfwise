import React from "react";
import * as Yup from "yup";
import BaseForm from "./BaseForm";  
import TextField from "./TextField";  

function GenreForm({ onSubmit }) {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
  });

  const initialValues = {
    name: "",
  };

  return (
    <div>
      <h3>Add a New Genre</h3>

      <BaseForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <TextField name="name" label="Genre Name" />
        <button type="submit">Submit</button>
      </BaseForm>
    </div>
  );
}

export default GenreForm;