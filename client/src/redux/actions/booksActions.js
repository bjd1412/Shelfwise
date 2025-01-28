import { setBooksError, setBooksStatus } from "../reducers/booksSlice";
import { setAuthors } from "../reducers/authorsSlice";
import { fetchGenres } from "./genresAction";



export const createBook = (bookData) => (dispatch, getState) => {
    dispatch(setBooksStatus("loading"));
  
    const formData = new FormData();
    formData.append("title", bookData.title);
    formData.append("summary", bookData.summary);
    formData.append("author_id", bookData.authorId);
    formData.append("genre_id", bookData.genreId);
  
    fetch("/books", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create book");
        }
        return res.json();
      })
      .then((newBook) => {
        dispatch(setBooksStatus("succeeded"));
  
        const { authors } = getState();
        const updatedAuthors = authors.authors.map((author) => {
          if (author.id === newBook.author_id) {
            return {
              ...author,
              books: author.books ? [...author.books, newBook] : [newBook],
            };
          }
          return author;
        });
        dispatch(setAuthors(updatedAuthors));
  
        dispatch(fetchGenres());
      })
      .catch((error) => {
        console.error("Error Creating Book:", error);
        dispatch(setBooksError(error.toString()));
        dispatch(setBooksStatus("failed"));
      });
  };
  export const updateBook = (bookId, updatedData) => (dispatch, getState) => {
    dispatch(setBooksStatus("loading"));
  
    const formData = new FormData();
    formData.append("title", updatedData.title);
    formData.append("summary", updatedData.summary);
    formData.append("author_id", updatedData.authorId);
    formData.append("genre_id", updatedData.genreId);
  
    fetch(`/books/${bookId}`, {
      method: "PATCH",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update book");
        }
        return res.json();
      })
      .then((updatedBook) => {
        dispatch(setBooksStatus("succeeded"));
  
        const { authors } = getState(); 
        const updatedAuthors = authors.authors.map((author) => {
          if (author.id === updatedBook.author_id) {
            return {
              ...author,
              books: author.books.map((book) =>
                book.id === updatedBook.id ? { ...book, ...updatedBook } : book
              ),
            };
          }
          return author;
        });
  
        dispatch(setAuthors(updatedAuthors)); 
  
        
        dispatch(fetchGenres()); 
      })
      .catch((error) => {
        console.error("Error Updating Book:", error);
        dispatch(setBooksError(error.toString()));
        dispatch(setBooksStatus("failed"));
      });
  };
