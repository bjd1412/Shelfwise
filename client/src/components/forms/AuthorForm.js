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
        <h3>Add New Author</h3>
        {error && (
          <div className="error-notification">
            <span className="error-icon">&#x2191;</span>
            <span className="error-message">{error}</span>
          </div>
        )}
  
        <BaseForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          error={error} 
        >
          <TextField name="name" label="Author Name:" placeholder="Authors name..." />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Author"}
          </button>
        </BaseForm>
      </div>
    );
  };

export default AuthorForm;