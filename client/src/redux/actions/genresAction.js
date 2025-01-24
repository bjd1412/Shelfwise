import { setGenresError, setGenres, setGenresStatus } from "../reducers/genresSlice";
import { setAuthors, setAuthorsError, setAuthorsStatus } from "../reducers/authorsSlice";

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


export const fetchGenresAuthor =(genreId) =>(dispatch) => {
    dispatch(setAuthorsStatus("loading"))

    fetch(`/genres/${genreId}/authors`)
    .then(res => {
        if (!res.ok) {

            throw new Error("Failed to fetch authors in genre")
        }
        return res.json()
    })
    .then(authors => {
        dispatch(setAuthors(authors))
        dispatch(setAuthorsStatus('succeeded'))
    })
    .catch(error => {
        dispatch(setAuthorsError(error.toString()))
        dispatch(setAuthorsStatus('failed'))
    })

}

export const createGenres = (genreData) => (dispatch, getState) => {
    dispatch(setGenresStatus("loading"))

    const formData = new FormData()
    formData.append("name", genreData.name)

    return fetch("/genres", {
        method: "POST",
        body: formData,
    })
    .then(res => {
        if (!res.ok){
            throw new Error("Genre already exists")
        }
        return res.json()
    })
    .then(newGenre => {
        dispatch(setGenresStatus("succeeded"))
        const currentGenres = getState().genres.genres
        dispatch(setGenres([...currentGenres, newGenre]))
    })
    .catch(error => {
        dispatch(setGenresStatus("failed"))
        dispatch(setGenresError(error.toString()))
        throw error
    })
}