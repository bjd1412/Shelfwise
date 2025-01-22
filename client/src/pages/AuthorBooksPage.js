import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchAuthorBooks } from "../redux/actions/booksActions"
import List from "../components/List"

function AuthorsBooksPage () {
    const dispatch = useDispatch()
    const {books, status, error } = useSelector(state => state.books )
    const {authorId} = useParams()

    useEffect(() => {
        dispatch(fetchAuthorBooks(authorId))
    }, [dispatch, authorId])

    if (status === "loading") {
        return <div>...Loading books</div>
    }

    if (status === "failed") {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h3>Book List</h3>
            <List items={books} getDisplayText={book => book.title} getLink={book => `/authors/${authorId}/books/${book.id}`}/>

        </div>
    )
}

export default AuthorsBooksPage