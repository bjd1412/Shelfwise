import React, {useEffect} from "react"
import { useOutletContext, useParams } from "react-router-dom"
import AddBookButton from "../components/AddBookButton"
import List from "../components/List"

function AuthorsBooksPage () {

    const {authors} = useOutletContext()
    const {authorId} = useParams()

    const author = authors.find((auth) => auth.id === parseInt(authorId));

    if (!author) {
      return <p>Author not found.</p>;
    }
    return (
        <div>
            <h3>Book List</h3>
            <AddBookButton authorId={authorId}/>
            <List items={author.books || []} getDisplayText={book => book.title} 
            getLink={book => `/authors/${authorId}/books/${book.id}`}/>
        </div>
    )
}

export default AuthorsBooksPage