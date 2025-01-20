import { setAuthors, setAuthorsError, setAuthorsStatus } from "../reducers/authorsSlice";

export const fetchAuthors = () => (dispatch) => {
    dispatch(setAuthorsStatus('loading'));  
  
    fetch('/authors')  
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch authors');
        }
        return response.json();  
      })
      .then((authors) => {
        dispatch(setAuthors(authors));  
        dispatch(setAuthorsStatus('succeeded'));  
      })
      .catch((error) => {
        dispatch(setAuthorsError(error.toString()));  
        dispatch(setAuthorsStatus('failed'));  
      });
  };