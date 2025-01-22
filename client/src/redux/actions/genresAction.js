import { setGenresError, setGenres, setGenresStatus } from "../reducers/genresSlice";

export const fetchGenres = () => (dispatch) => {
    dispatch(setGenresStatus('loading'))

    fetch("/genres")
        .then(res => {
            if (!res.ok) {
            throw new Error("Failed to fetch genres") 
            }
            return res.json() 
    })
    .then(genres => {
        dispatch(setGenres(genres))
        dispatch(setGenresStatus("succeeded"))
    })
    .catch(error => {
        dispatch(setGenresError(error.toString()))
        dispatch(setGenresStatus("failed"))

    })
}
