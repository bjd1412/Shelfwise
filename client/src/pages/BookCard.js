import React from "react";


function BookCard({book}) {

    return (
        <div>
            <h1 className="Title">{book.title}</h1>
            <span>{book.author}</span>
            <p>{book.summary}</p>
            {book.author && <p>Author: {book.author.name}</p>}
        </div>
    )

}

export default BookCard