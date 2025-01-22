import { createSlice } from "@reduxjs/toolkit";

const patronsSlice = createSlice({
    name: "patrons",
    initialState: {
        patrons: [],
        borrowings: [], 
        status: "idle",
        error: null
    },
    reducers: {

        setPatrons(state, action) {
            state.patrons = action.payload
        },
        setPatronsStatus(state, action) {
            state.status = action.payload
        },
        setPatronError(state, action) {
            state.error = action.payload
        },
        setPatronsBorrowings(state, action) {
            state.borrowings = action.payload
        }

    }
})

export const {setPatronError, setPatronsStatus, setPatrons, setPatronsBorrowings} = patronsSlice.actions

export default patronsSlice.reducer