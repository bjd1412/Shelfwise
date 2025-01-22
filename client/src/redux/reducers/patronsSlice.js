import { createSlice } from "@reduxjs/toolkit";

const patronsSlice = createSlice({
    name: "patron",
    initialState: {
        patrons: [],
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

    }
})

export const {setPatronError, setPatronsStatus, setPatrons} = patronsSlice.actions

export default patronsSlice.reducer