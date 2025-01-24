import React from "react";
import { useNavigate } from "react-router-dom";

const AddBookButton = ({ authorId, genreId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (authorId && genreId) {
      
      navigate(`/genres/${genreId}/authors/${authorId}/books/new/${authorId}`);
    } else if (authorId) {
      
      navigate(`/authors/${authorId}/books/new/${authorId}`);
    }
  };

  return (
    <button onClick={handleClick} className="add-book-button">
      Add New Book
    </button>
  );
};

export default AddBookButton;