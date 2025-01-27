import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditBookButton = ({ bookId }) => {
  const navigate = useNavigate();
  const {authorId, genreId} = useParams()

  const handleClick = () => {
    if (authorId && genreId && bookId) {
      navigate(`/genres/${genreId}/authors/${authorId}/books/${bookId}/edit`);
    } else if (authorId && bookId) {
      navigate(`/authors/${authorId}/books/${bookId}/edit`);
    }
  };

  return (
    <button onClick={handleClick} className="add-book-button">
      Edit Book
    </button>
  );
};

export default EditBookButton;