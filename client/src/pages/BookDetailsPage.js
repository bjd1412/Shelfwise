import React from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";



function BookDetailsPage () {

    const {authors} = useOutletContext()
    const {bookId} = useParams()
    const {status, error} = useSelector(state => state.books)


    const bookDetails = authors
        .flatMap((author) => author.books)
        .find((book) => book.id === parseInt(bookId));


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
            {bookDetails.genre && <span>{bookDetails.genre.name}</span>}
        </div>
    );    

}







export default BookDetailsPage