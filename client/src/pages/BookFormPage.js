import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import BookForm from "../components/forms/BookForm";
import { fetchAuthors } from "../redux/actions/authorsActions";
import { fetchGenres } from "../redux/actions/genresAction";
import { createBook, updateBook} from "../redux/actions/booksActions";

function BookFormPage() {
    const { authorId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [initialValues, setInitialValues] = useState({
      title: "",
      summary: "",
      authorId: authorId || "",
      genreId: "",
    });
  
    const { authors, genres, authorsLoading, genresLoading } = useSelector((state) => ({
      authors: state.authors.authors, 
      genres: state.genres.genres,
      authorsLoading: state.authors.status === "loading",
      genresLoading: state.genres.status === "loading",
    }));
  
    useEffect(() => {
      dispatch(fetchAuthors());
      dispatch(fetchGenres());
    }, [dispatch]);
  
    const handleSubmit = async (values) => {
      const { title, summary, authorId, genreId } = values;
  
      if (initialValues.title) {
        dispatch(updateBook(values));
      } else {
        dispatch(createBook({ title, summary, authorId, genreId }));
      }
  
      navigate(`/authors/${authorId}/books`);
    };
  
 
    if (authorsLoading || genresLoading) {
      return <div>Loading authors and genres...</div>;
    }
  
    
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