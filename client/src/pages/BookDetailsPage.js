import React from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditBookButton from "../components/EditBookButton";
import DeleteBookButton from "../components/BookDeleteButton";



function BookDetailsPage () {

    const authors = useSelector(state => state.authors.authors)
    const {bookId} = useParams()


    const bookDetails = authors
        .flatMap((author) => author.books)
        .find((book) => book.id === parseInt(bookId));


    if (!bookDetails) {
        return <div>No book details found</div>;
    }

    return (
        <div className="Main">
            <EditBookButton bookId={bookId}/> 
            <DeleteBookButton bookId={bookId}/>    
            <h1>{bookDetails.title}</h1>        
            <p>{bookDetails.summary}</p>
            {bookDetails.genre && <span>{bookDetails.genre.name}</span>}
        </div>
    );    

}







export default BookDetailsPage