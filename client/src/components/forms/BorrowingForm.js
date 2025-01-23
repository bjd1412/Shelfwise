import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/actions/bookActions"; 

function BorrowingForm({ patronId, onSubmit }) {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);

  useEffect(() => {
    
    dispatch(fetchBooks()); 
  }, [dispatch]); 

  const formik = useFormik({
    initialValues: {
      bookTitle: "", 
      dueDate: "",   
    },
    validationSchema: Yup.object({
      bookTitle: Yup.string().required("Book title is required"),
      dueDate: Yup.string()
        .required("Due date is required")
        .matches(
          /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
          "Due date must be in MM/DD/YYYY format"
        ),
    }),
    onSubmit: (values) => {
      onSubmit({ ...values, patronId });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="bookTitle">Book Title</label>
        <select
          id="bookTitle"
          name="bookTitle"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.bookTitle}
        >
          <option value="" label="Select a book" />
          {books.map((book) => (
            <option key={book.id} value={book.title}>
              {book.title}
            </option>
          ))}
        </select>
        {formik.touched.bookTitle && formik.errors.bookTitle && (
          <div>{formik.errors.bookTitle}</div>
        )}
      </div>

      <div>
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          name="dueDate"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dueDate}
        />
        {formik.touched.dueDate && formik.errors.dueDate && (
          <div>{formik.errors.dueDate}</div>
        )}
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default BorrowingForm;