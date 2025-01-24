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

  export const createAuthors = (authorData) => (dispatch, getState) => {
    dispatch(setAuthorsStatus("loading"));
  
    const formData = new FormData();
    formData.append("name", authorData.name);
  
    
    return fetch("/authors", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Author already exists!");
        }
        return res.json();
      })
      .then((newAuthor) => {
        dispatch(setAuthorsStatus("succeeded"));
  
        // Get the current authors from the state
        const currentAuthors = getState().authors.authors;
  
        // Dispatch the updated array as a plain object
        dispatch(setAuthors([...currentAuthors, newAuthor]));
      })
      .catch((error) => {
        dispatch(setAuthorsError(error.toString()));
        dispatch(setAuthorsStatus("failed"));
        throw error; // Re-throw the error to be caught in the handleSubmit .catch()
      });
  };