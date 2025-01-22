import { setBooks, setBooksError, setBooksStatus } from "../reducers/booksSlice";

export const fetchAuthorBooks = (authorId) => (dispatch) => {

    dispatch(setBooksStatus("loading"))

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