
import React, { useState } from "react";
import AuthorForm from "./forms/AuthorForm";
import { useDispatch, useSelector } from "react-redux";
import { createAuthors } from "../redux/actions/authorsActions";
import "../App.css"


const AddAuthor = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formError, setFormError] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.authors.status === "loading");
  const authors = useSelector((state) => state.authors.authors); 

  const handleOpenModal = () => {
    setIsModalVisible(true);
    setFormError(null); 
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setFormError(null);
  };

  const handleSubmit = (authorData) => {
    setFormError(null);

   
    dispatch(createAuthors(authorData))
      .then(() => {
        setIsModalVisible(false); 
      })
      .catch((error) => {
        setFormError(error.message); 
      });
  };

  return (
    <>
      <button className="add-author-button" onClick={handleOpenModal}>
        Add New Author
      </button>

      {isModalVisible && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Add a New Author</h3>

          
            {formError && (
              <div className="error-notification">
                <span className="error-icon">⚠️</span>
                <span className="error-message">{formError}</span>
              </div>
            )}

            <AuthorForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />

            <button className="cancel-button" onClick={handleCloseModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAuthor;