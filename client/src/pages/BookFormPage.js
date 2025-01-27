import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import BookForm from "../components/forms/BookForm";
import { createBook, updateBook} from "../redux/actions/booksActions";

function BookFormPage() {
    const { authorId } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {authors, genres} = useOutletContext()
  
    const [initialValues, setInitialValues] = useState({
      title: "",
      summary: "",
      authorId: authorId || "",
      genreId: "",
    });
  
  
    const handleSubmit = async (values) => {
      const { title, summary, authorId, genreId } = values;
  
      if (initialValues.title) {
        dispatch(updateBook(values));
      } else {
        dispatch(createBook({ title, summary, authorId, genreId }));
      }
  
      navigate(`/authors/${authorId}/books`);
    };
  
  
    
    const authorsList = Array.isArray(authors) ? authors : [];
    const genresList = Array.isArray(genres) ? genres : [];
  
    return (
      <div>
        <h1>{initialValues.title ? "Edit Book" : "Add New Book"}</h1>
        <BookForm
          authors={authorsList}
          genres={genresList}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        />
      </div>
    );
  }
export default BookFormPage;