import React, { useState } from "react";
import BorrowingForm from "./forms/BorrowingForm";
import { useDispatch, useSelector } from "react-redux";
import { createBorrowing } from "../redux/actions/patronsAction";
import "../App.css"



const AddBorrow = () => {
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

  const handleSubmit = (borrowData) => {
    console.log("Borrowing data received in AddBorrow:", borrowData)
    console.log("Borrowing data received in AddBorrow:", borrowData)
    setFormError(null);

    dispatch(createBorrowing(borrowData))
      .then(() => {
        setIsModalVisible(false); 
      })
      .catch((error) => {
        if (error.message.includes("already exists")) {
          setFormError("Borrowing already exists!"); 
        } else {
          setFormError("Failed to borrow. Please try again.");
        }
      });
  };

  return (
    <>
      <button className="add-author-button" onClick={handleOpenModal}>
        Add a Borrow
      </button>

      {isModalVisible && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Add a New Borrow</h3>

            {formError && (
              <div className="error-notification">
                <span className="error-icon">⚠️</span>
                <span className="error-message">{formError}</span>
              </div>
            )}

            <BorrowingForm
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

export default AddBorrow;