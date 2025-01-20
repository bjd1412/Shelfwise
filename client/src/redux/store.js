import { configureStore } from '@reduxjs/toolkit';
import authorsReducer from "./reducers/authorsSlice"


const store = configureStore({
  reducer: {
    authors: authorsReducer,
  }
});

export default store;