import React, { useState } from "react";
import PatronForm from "./forms/PatronForm";
import { useDispatch, useSelector } from "react-redux";
import { createPatrons } from "../redux/actions/patronsAction";
import "../App.css"


const AddPatron = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formError, setFormError] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.patrons.status === "loading");

  const handleOpenModal = () => {
    setIsModalVisible(true);
    setFormError(null);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setFormError(null);
  };

  const handleSubmit = (patronData) => {
    setFormError(null);

    dispatch(createPatrons(patronData))
      .then(() => {
        setIsModalVisible(false); 
      })
      .catch((error) => {
        if (error.message.includes("already exists")) {
          setFormError("Patron already exists!"); 
        } else {
          setFormError("Failed to add patron. Please try again.");
        }
      });
  };

  return (
    <>
      <button className="add-author-button" onClick={handleOpenModal}>
        Add New Patron
      </button>

      {isModalVisible && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            

            {formError && (
              <div className="error-notification">
                <span className="error-icon">⚠️</span>
                <span className="error-message">{formError}</span>
              </div>
            )}

            <PatronForm
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

export default AddPatron;