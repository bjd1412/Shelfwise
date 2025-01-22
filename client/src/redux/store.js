import { configureStore } from '@reduxjs/toolkit';
import authorsReducer from "./reducers/authorsSlice"
import genresReducer from "./reducers/genresSlice"
import patronsReducer from "./reducers/patronsSlice"
import booksReducer from "./reducers/booksSlice"


const store = configureStore({
  reducer: {
    authors: authorsReducer,
    genres: genresReducer,
    patrons: patronsReducer,
    books: booksReducer
  }
});

export default store;