import { createSlice } from "@reduxjs/toolkit";

const genresSlice = createSlice({
    name: "genres",
    initialState: {
        genres: [],
        status: "idle",
        error: null, 
    },
    reducers: {
        setGenres(state, action) {
            state.genres = action.payload
        },
        setGenresStatus(state, action) {
            state.status = action.payload
        },
        setGenresError(state, action){
            state.error = action.payload
        },
    },
})

export const {setGenres, setGenresError, setGenresStatus} = genresSlice.actions
export default genresSlice.reducer