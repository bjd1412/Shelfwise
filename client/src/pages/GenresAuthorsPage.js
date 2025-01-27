import React from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import List from "../components/List";
import AddAuthor from "../components/AddAuthor";

function GenresAuthorsPage() {
  const { genreId } = useParams()
  const { genres } = useOutletContext()

  const genre = genres.find(genre => genre.id === parseInt(genreId))

  if (!genre) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <h3>{genre.name} Authors</h3>
      <AddAuthor /> 
      <List
        items={genre.authors}  
        getDisplayText={author => author.name}
        getLink={author => `/genres/${genre.id}/authors/${author.id}/books`} 
      />
    </div>
  );
}

export default GenresAuthorsPage;