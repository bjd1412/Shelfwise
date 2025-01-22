import { setPatronsStatus, setPatrons, setPatronsBorrowings, setPatronError } from "../reducers/patronsSlice";

export const fetchPatrons = () => (dispatch) => {
    dispatch(setPatronsStatus("loading"))

    fetch("/patrons")
    .then(res => {
        if (!res.ok){
            throw new Error("Patron fetch failed")
        }
        return res.json()

    })
    .then(patrons => {
        dispatch(setPatrons(patrons))
        dispatch(setPatronsStatus("succeeded"))
    })
    .catch(error => {
        dispatch(setPatronsStatus("failed"))
        dispatch(setPatronError(error.toString()))
    })

}

export const fetchPatronBorrowing = (patronId) => (dispatch) => {

    dispatch(setPatronsStatus("loading"))


    fetch(`/patrons/${patronId}/borrowings`)
    .then(res => {
        if (!res.ok){
            throw new Error("Patron fetch failed")
        }
        return res.json()

    })
    .then(borrowing => {
        dispatch(setPatronsBorrowings(borrowing))
        dispatch(setPatronsStatus("succeeded"))
    })
    .catch(error => {
        dispatch(setPatronsStatus("failed"))
        dispatch(setPatronError(error.toString()))
    })

}


