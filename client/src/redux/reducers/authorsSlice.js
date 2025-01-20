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
    },
});

export const {setAuthors, setAuthorsStatus, setAuthorsError} = authorsSlice.actions
export default authorsSlice.reducer