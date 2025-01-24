import React from "react";
import * as Yup from "yup";
import BaseForm from "./BaseForm";  
import TextField from "./TextField";  

function GenreForm({ onSubmit, isLoading, error }) {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
  });

  const initialValues = {
    name: "",
  };

  return (
    <div>
      <h3>Add a New Genre</h3>
      {error && (
          <div className="error-notification">
            <span className="error-icon">&#x2191;</span>
            <span className="error-message">{error}</span>
          </div>
        )}

      <BaseForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} error={error}>
        <TextField name="name" label="Genre Name" placeholder="Genre..."/>
        <button type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Genre"}
        </button>
      </BaseForm>
    </div>
  );
}

export default GenreForm;