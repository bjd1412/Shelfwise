import React from "react";
import * as Yup from "yup";
import BaseForm from "./BaseForm"; 
import TextField from "./TextField"; 

const AuthorForm = ({ onSubmit, isLoading, error }) => {
  
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Author name is required")
      .max(50, "Name cannot exceed 50 characters"),
  });

  
  const initialValues = {
    name: "",
  };

  return (
    <div>
      <h3>Add a New Author</h3>
      {error && <div className="error">{error}</div>}

      <BaseForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <TextField
          name="name"
          label="Author Name:"
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Author"}
        </button>
      </BaseForm>
    </div>
  );
};

export default AuthorForm;