
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddBorrow from "../components/AddBorrow";

function PatronDetailsPage() {

    const patrons = useSelector(state => state.patrons.patrons)
    const {patronId} = useParams()

    const patron = patrons.find(patron => patron.id === parseInt(patronId))

    if (!patron) {
        return <div>Patron not found</div>;
      }
    

    const borrowings = patron.borrowings || [];



    return (
        
        <div className="Main">
            <AddBorrow/>
            <div>
            <h1>{patron.name}</h1>
            <span>{patron.email}</span>
            </div>

          <h4>Borrowings</h4>

                    <ul>
            {borrowings.length === 0 ? (
                <li>No borrowings found for this patron.</li>
            ) : (
                borrowings.map(borrowing => (
                <li key={borrowing.id}>
                    <div><strong>Title:</strong> {borrowing.book.title}</div>
                    <div><strong>Borrow Date:</strong> {new Date(borrowing.borrow_date).toLocaleDateString()}</div>
                    <div><strong>Due Date:</strong> {new Date(borrowing.due_date).toLocaleDateString()}</div>
                    {borrowing.return_date && (
                    <div><strong>Return Date:</strong> {new Date(borrowing.return_date).toLocaleDateString()}</div>
                    )}
                </li>
                ))
            )}
            </ul>
        </div>
      );
    }
export default PatronDetailsPage