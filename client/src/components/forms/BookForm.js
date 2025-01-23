import React from "react";
import * as Yup from "yup";
import BaseForm from "./BaseForm";  
import TextField from "./TextField";  

function BookForm({ authors, genres, onSubmit }) {
 
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    summary: Yup.string()
      .required("Summary is required")
      .max(1000, "Summary can't exceed 1000 characters"),
    authorId: Yup.string().required("Author is required"),
    genreId: Yup.string().required("Genre is required"),
  });

  
  const initialValues = {
    title: "",
    summary: "",
    authorId: "",
    genreId: "",
  };

  return (
    <div>
      <h3>Add a New Book</h3>

      
      <BaseForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>      
        <TextField name="title" label="Title" />      
        <TextField name="summary" label="Summary" type="textarea" /> 
        <div>
          <label htmlFor="authorId">Author</label>
          <select
            id="authorId"
            name="authorId"
            onChange={(e) => formik.setFieldValue("authorId", e.target.value)}
            onBlur={formik.handleBlur}
            value={formik.values.authorId}
          >
            <option value="" label="Select an author" />
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
          {formik.touched.authorId && formik.errors.authorId && (
            <div className="error">{formik.errors.authorId}</div>
          )}
        </div>

        
        <div>
          <label htmlFor="genreId">Genre</label>
          <select
            id="genreId"
            name="genreId"
            onChange={(e) => formik.setFieldValue("genreId", e.target.value)}
            onBlur={formik.handleBlur}
            value={formik.values.genreId}
          >
            <option value="" label="Select a genre" />
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          {formik.touched.genreId && formik.errors.genreId && (
            <div className="error">{formik.errors.genreId}</div>
          )}
        </div>
     
        <button type="submit">Submit</button>
      </BaseForm>
    </div>
  );
}

export default BookForm;