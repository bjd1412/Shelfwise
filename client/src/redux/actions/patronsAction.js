import { setPatronsStatus, setPatrons, setPatronsBorrowings, setPatronError , setBorrowingError, setBorrowingStatus} from "../reducers/patronsSlice";

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

  export const createPatrons = (patronData) => (dispatch, getState) => {
    dispatch(setPatronsStatus("loading")); 
  
    const formData = new FormData();
    formData.append("name", patronData.name);
    formData.append("email", patronData.email)
  
    return fetch("/patrons", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Patron already exists"); 
        }
        return res.json();  
      })
      .then((newPatron) => {
        dispatch(setPatronsStatus("succeeded"));  
       
        const currentPatrons = getState().patrons.patrons;
  
        
        dispatch(setPatrons([...currentPatrons, newPatron]));
      })
      .catch((error) => {
        dispatch(setPatronError(error.toString()));  
        dispatch(setPatronsStatus("failed"));  
        throw error; 
      });
  }



export const createBorrowing = (borrowingData) => (dispatch, getState) => {
  console.log("createBorrowing action called with data:", borrowingData);

  
  const formData = new FormData();
  formData.append("book_title", borrowingData.bookTitle);
  formData.append("due_date", borrowingData.dueDate);
  formData.append("patron_id", borrowingData.patronId); 
  return fetch("/borrowings", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Borrowing created:", data);
      dispatch(setBorrowingStatus("succeeded"));
      dispatch(setPatronsBorrowings(data)); 
    })
    .catch((error) => {
      console.error("Error in createBorrowing:", error);
      dispatch(setBorrowingStatus("failed"));
      dispatch(setBorrowingError(error.message));
    });
};