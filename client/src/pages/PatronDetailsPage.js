import React from "react";
import { useEffect } from "react";
import { fetchPatronBorrowing } from "../redux/actions/patronsAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function PatronDetailsPage() {
    const dispatch = useDispatch()
    const {borrowings, status, error} = useSelector(state => state.patrons)
    const {patronId} = useParams()

    useEffect(() => {
        dispatch(fetchPatronBorrowing(patronId))
    }, [dispatch, patronId])

    if (status === "loading") {
        return <div>Loading...</div>
    }

    if (status === "failed") {
        return <div>Error: {error}</div>
    }

    if (!borrowings || borrowings.length === 0){
        return <div>This Patron has no borrowings</div>
    }

    return (
        <div>
             <h1>Patron Borrowing Info</h1>
            <ul>
                {borrowings.map(borrowing => (
                    <li key={borrowing.id}>
                        <h4>{borrowing.book_title}</h4>
                        <p>Borrowed on: {borrowing.borrow_date}</p>
                        <p>Due date: {borrowing.due_date}</p>
                        {borrowing.return_date && <p>Returned on: {borrowing.return_date}</p>}
                    </li>
                ))}
            </ul>
        </div>
    )


}
export default PatronDetailsPage