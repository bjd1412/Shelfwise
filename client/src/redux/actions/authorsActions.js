import { setAuthors, setAuthorsError, setAuthorsStatus } from "../reducers/authorsSlice";

export const fetchAuthors = (authorId = null) => (dispatch) => {
    dispatch(setAuthorsStatus('loading'));  

     const url = authorId ? `/authors/${authorId}` : "/authors"
  
    fetch(url)  
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch authors');
        }
        return response.json();  
      })
      .then((data) => {
        const authors = authorId ? [data] : data
        console.log("Fetched Authors:", data)
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
          throw new Error("Author already exists"); 
        }
        return res.json();  
      })
      .then((newAuthor) => {
        dispatch(setAuthorsStatus("succeeded"));  
       
        const currentAuthors = getState().authors.authors;
  
        
        dispatch(setAuthors([...currentAuthors, newAuthor]));
      })
      .catch((error) => {
        dispatch(setAuthorsError(error.toString()));  
        dispatch(setAuthorsStatus("failed"));  
        throw error; 
      });
  };
  