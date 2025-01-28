import { createSlice } from "@reduxjs/toolkit";

const authorsSlice = createSlice({
    name: "authors",
    initialState: {
        authors: [],
        status: "idle",
        error: null,
    },
    reducers: {
        setAuthors: (state, action) => {
            state.authors = action.payload
        },
        setAuthorsStatus: (state, action) => {
            state.status = action.payload
        },
        setAuthorsError: (state, action) => {
            state.error = action.payload
        },
        deleteBookFromAuthor: (state, action) => {
            const { authorId, bookId } = action.payload;
            const author = state.authors.find((auth) => auth.id === authorId);
            if (author) {
              author.books = author.books.filter((book) => book.id !== bookId);
            }}
    },
});

export const {deleteBookFromAuthor, setAuthors, setAuthorsStatus, setAuthorsError} = authorsSlice.actions
export default authorsSlice.reducer