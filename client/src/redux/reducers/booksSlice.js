import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
    name: "books",
    initialState: {
        books: [], 
        status: "idle",
        error: null
    },
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload
        },
        setBooksStatus: (state, action) => {
            state.status = action.payload
        },
        setBooksError: (state, action) => {
            state.error = action.payload
        },
    } ,
})

export const {setBooks, setBooksStatus, setBooksError} = booksSlice.actions
export default booksSlice.reducer