import React, { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import BaseForm from "./BaseForm";
import TextField from "./TextField";
import * as Yup from "yup";

function BorrowingForm({ onSubmit }) {
  const { authors } = useOutletContext(); // Access authors from Outlet context
  const { patronId } = useParams(); // Get patronId from URL parameters
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    // Extract all books from authors and set them to the books state
    const allBooks = authors.reduce((acc, author) => {
      return [...acc, ...author.books];
    }, []);
    setBooks(allBooks);
  }, [authors]);

  useEffect(() => {
    // Filter books based on search term
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, books]);

  const initialValues = {
    bookTitle: "", // Book title will be selected from dropdown
    dueDate: "",   // Due date input field
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
          
          <TextField
            formik={{
              values: { search: searchTerm },
              handleChange: (e) => setSearchTerm(e.target.value),
              handleBlur: () => {},
              touched: {},
              errors: {},
            }}
            name="search"
            label="Search Book Title"
            placeholder="Type to search for a book..."
          />

          
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
              {filteredBooks.map((book) => (
                <option key={book.id} value={book.title}>
                  {book.title}
                </option>
              ))}
            </select>
            {formik.touched.bookTitle && formik.errors.bookTitle && (
              <div>{formik.errors.bookTitle}</div>
            )}
          </div>

          
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