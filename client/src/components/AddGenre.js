import React, { useState } from "react";
import GenreForm from "./forms/GenreForm";
import { useDispatch, useSelector } from "react-redux";
import { createGenres } from "../redux/actions/genresAction";
import "../App.css"

const AddGenre = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formError, setFormError] = useState(null);
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.genres.status === "loading");
  
    const handleOpenModal = () => {
      setIsModalVisible(true);
      setFormError(null);
    };
  
    const handleCloseModal = () => {
      setIsModalVisible(false);
      setFormError(null);
    };
  
    const handleSubmit = (genreData) => {
      setFormError(null);
  
      dispatch(createGenres(genreData))
        .then(() => {
          setIsModalVisible(false); 
        })
        .catch((error) => {
          if (error.message.includes("already exists")) {
            setFormError("Genre already exists!"); 
          } else {
            setFormError("Failed to add genre. Please try again.");
          }
        });
    };
  
    return (
      <>
        <button className="add-author-button" onClick={handleOpenModal}>
          Add New Genre
        </button>
  
        {isModalVisible && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">Add a New Genre</h3>
  
              {formError && (
                <div className="error-notification">
                  <span className="error-icon">⚠️</span>
                  <span className="error-message">{formError}</span>
                </div>
              )}
  
              <GenreForm
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
  
  export default AddGenre;