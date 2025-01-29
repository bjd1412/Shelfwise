import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BaseForm from "./BaseForm";
import CustomDropdown from "../CustomDropdown";
import TextField from "./TextField";
import * as Yup from "yup";

function BorrowingForm({ onSubmit }) {
  const authors = useSelector(state => state.authors.authors)
  const { patronId } = useParams(); 
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    
    const allBooks = authors.reduce((acc, author) => {
      return [...acc, ...author.books];
    }, []);
    setBooks(allBooks);
  }, [authors]);

  useEffect(() => {
   
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, books]);

  const initialValues = {
    bookTitle: "", 
    dueDate: "",   
  };

  const validationSchema = Yup.object({
    bookTitle: Yup.string().required("Book title is required"),
    dueDate: Yup.string()
      .required("Due date is required")
      .matches(
        /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
        "Due date must be in MM/DD/YYYY format"
      ),
  });

  const handleSubmit = (values) => {
    console.log("Submitting borrowing form with values:", values); 
    
    const selectedBook = books.find((book) => book.title === values.bookTitle);

    if (selectedBook) {
      
      const borrowingData = {
        ...values,
        patronId,  
        bookId: selectedBook.id,  
      };
      console.log("Borrowing data:", borrowingData)
      onSubmit(borrowingData);
    } else {
     
      console.error("Selected book not found");
    }
  };

  return (
    <BaseForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <>
          
            <CustomDropdown
          label="Book Title"
          options={filteredBooks.map((book) => ({
            value: book.title,
            label: book.title,
          }))}
          value={formik.values.bookTitle}
          onChange={(option) => formik.setFieldValue('bookTitle', option.value)}
          onBlur={() => formik.setFieldTouched('bookTitle', true)}
          error={formik.touched.bookTitle && formik.errors.bookTitle}
          touched={formik.touched.bookTitle}
        />      
          

          
          <TextField
            formik={formik}
            name="dueDate"
            label="Due Date"
            placeholder="MM/DD/YYYY"
            error={formik.touched.dueDate && formik.errors.dueDate}
          />

        
          <div>
            <button type="submit">Submit</button>
          </div>
        </>
      )}
    </BaseForm>
  );
}

export default BorrowingForm;