import React from "react";
import * as Yup from "yup";
import BaseForm from "./BaseForm";  
import TextField from "./TextField";  

function PatronForm({ onSubmit }) {
  
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
      <h3>Add a New Patron</h3>

      <BaseForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>   
        <TextField name="name" label="Name" />     
        <TextField name="email" label="Email" type="email" />       
        <button type="submit">Submit</button>
      </BaseForm>
    </div>
  );
}

export default PatronForm;