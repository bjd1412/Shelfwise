import React from "react";
import * as Yup from "yup";
import BaseForm from "./BaseForm";  
import TextField from "./TextField";  

function PatronForm({ onSubmit, isLoading, error }) {
  
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

 
  const initialValues = {
    name: "",
    email: "",
  };

  return (
    <div>
      <h3>Add New Patron</h3>
      {error && (
          <div className="error-notification">
            <span className="error-icon">&#x2191;</span>
            <span className="error-message">{error}</span>
          </div>
        )}

      <BaseForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} error={error}>   
        <TextField name="name" label="Name" placeholder="Patron's name..." />     
        <TextField name="email" label="Email" type="email" placeholder="Patrons email..."/>       
        <button type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Patron"}
        </button>
      </BaseForm>
    </div>
  );
}

export default PatronForm;