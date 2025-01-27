import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import AddBorrow from "../components/AddBorrow";

function PatronDetailsPage() {

    const {patrons} = useOutletContext()
    const {patronId} = useParams()

    const patron = patrons.find(patron => patron.id === parseInt(patronId))

    if (!patron) {
        return <div>Patron not found</div>;
      }
    

    const borrowings = patron.borrowings || [];



    return (
        
        <div>
            <AddBorrow/>
          <h1>{patron.name}'s Borrowings</h1>
          <ul>
            {borrowings.length === 0 ? (
              <li>No borrowings found for this patron.</li>
            ) : (
              borrowings.map(borrowing => (
                <div key={borrowing.id}>
                  <div><strong>Title:</strong> {borrowing.book.title}</div>
                  <div><strong>Borrow Date:</strong> {new Date(borrowing.borrow_date).toLocaleDateString()}</div>
                  <div><strong>Due Date:</strong> {new Date(borrowing.due_date).toLocaleDateString()}</div>
                  <div><strong>Return Date:</strong>  {borrowing.return_date
                  ? new Date(borrowing.return_date).toLocaleDateString()
                  : "Not returned yet"}</div>
                </div>
              ))
            )}
          </ul>
        </div>
      );
    }
export default PatronDetailsPage