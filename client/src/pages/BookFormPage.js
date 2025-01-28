import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, useNavigate} from "react-router-dom";
import BookForm from "../components/forms/BookForm";
import { createBook, updateBook } from "../redux/actions/booksActions";

function BookFormPage() {
  const { authorId, bookId } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const authors = useSelector((state) => state.authors.authors);
  const genres = useSelector((state) => state.genres.genres); 
  const [initialValues, setInitialValues] = useState({
    title: "",
    summary: "",
    authorId: authorId || "",
    genreId: "",
  });

  
  const author = authors.find((auth) => auth.id === parseInt(authorId));
  const books = author ? author.books : []; 

  useEffect(() => {
    if (bookId && books) {
      const bookToEdit = books.find((book) => book.id === parseInt(bookId));
      if (bookToEdit) {
        setInitialValues({
          title: bookToEdit.title,
          summary: bookToEdit.summary,
          authorId: bookToEdit.author_id,
          genreId: bookToEdit.genre_id,
        });
      }
    }
  }, [bookId, books]);

  const handleSubmit = async (values) => {
    const { title, summary, authorId, genreId } = values;

    if (bookId) {
      
      dispatch(updateBook(bookId, { title, summary, authorId, genreId }));
    } else {
      
      dispatch(createBook({ title, summary, authorId, genreId }));
    }

   
    navigate(`/authors/${authorId}/books`);
  };

  const authorsList = Array.isArray(authors) ? authors : [];
  const genresList = Array.isArray(genres) ? genres : [];

  return (
    <div className="Main">
      <h1>{bookId ? "Edit Book" : "Add New Book"}</h1>
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