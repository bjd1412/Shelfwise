
import React from "react";
import { useDispatch } from "react-redux";
import { deleteBook } from "../redux/actions/authorsActions";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBookButton = ({bookId}) => {
    const { authorId, genreId} = useParams(); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete this book?")) {
        dispatch(deleteBook(bookId)) 
          .then(() => {           
            if (authorId) {
              navigate(`/authors/${authorId}/books`);
            } else if (genreId) {
              navigate(`/genres/${genreId}/authors/${authorId}/books?genreId=${genreId}`);
            }
          })
          .catch((error) => {
            console.error("Error deleting book:", error);
          });
      }
    };
  
    return (
      <button onClick={handleDelete} className="delete-book-button">
        Delete Book
      </button>
    );
  };
  

export default DeleteBookButton;