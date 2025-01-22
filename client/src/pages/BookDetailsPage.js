import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookDetails } from "../redux/actions/booksActions";

function BookDetailsPage () {

    const dispatch = useDispatch()
    const {bookId} = useParams()
    const {bookDetails, status, error} = useSelector(state => state.books)

    useEffect(() => {
        dispatch(fetchBookDetails(bookId))
    }, [dispatch, bookId])

    if (status === "loading") {
        return <div>Loading book details...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    if (!bookDetails) {
        return <div>No book details found</div>;
    }

    return (
        <div>
            <h1>{bookDetails.title}</h1>        
            <p>{bookDetails.summary}</p>
            <span>{bookDetails.genre?.name}</span>
        </div>
    );    

}







export default BookDetailsPage