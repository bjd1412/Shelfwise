import { setBooks, setBookDetails, setBooksError, setBooksStatus } from "../reducers/booksSlice";

export const fetchAuthorBooks = (authorId) => (dispatch) => {

    dispatch(setBooksStatus("loading"))
    dispatch(setBooks([]))

    fetch(`/authors/${authorId}/books`)
    .then(res => {
        if (!res.ok) {
            throw new Error("Failed to fetch books")
        }
        return res.json()
    })
    .then( books => {
        dispatch(setBooksStatus("succeeded"))
        dispatch(setBooks(books))
    })
    .catch(error => {
        setBooksError(error.toString())
        setBooksStatus("failed")
    })

}

export const fetchGenreAuthorBooks = (genreId, authorId) => (dispatch) => {
    dispatch(setBooksStatus("loading"))
    dispatch(setBooks([]))

    fetch(`/genres/${genreId}/authors/${authorId}/books`)
    .then(res => {
        if(!res.ok) {
            throw new Error("Failed to fetch books for author in genre")
        }
        return res.json()
    })
    .then(books => {
        dispatch(setBooks(books))
        dispatch(setBooksStatus('succeeded'))
    })
    .catch(error => {
        dispatch(setBooksError(error.toString()))
        dispatch(setBooksStatus('failed'))
    })
}

export const fetchBookDetails = (bookId) => (dispatch) => {
    dispatch(setBooksStatus("loading"))
    dispatch(setBooks([]))

    fetch(`/books/${bookId}`)
    .then(res => {
        if (!res.ok) {
            throw new Error("Failed to fetch books")
        }
        return res.json()
    })
    .then( book => {
        dispatch(setBooksStatus("succeeded"))
        dispatch(setBookDetails(book))
    })
    .catch(error => {
        setBooksError(error.toString())
        setBooksStatus("failed")
    })

}