import { createSelector } from 'reselect';


const selectAuthors = (state) => state.authors.data;
const selectGenres = (state) => state.genres.data;


export const selectMemoizedAuthors = createSelector(
  [selectAuthors],
  (authors) => authors
);

export const selectMemoizedGenres = createSelector(
  [selectGenres],
  (genres) => genres
);