import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import List from "../components/List";
import AddAuthor from "../components/AddAuthor";

function GenresAuthorsPage() {
  const { genreId } = useParams()
  const genres = useSelector(state => state.genres.genres)

  const genre = genres.find(genre => genre.id === parseInt(genreId))

  if (!genre) {
    return <div>Loading...</div>; 
  }

  const authors = genre.authors || [];

  const uniqueAuthors = Array.from(
    new Map(authors.map((author) => [author.id, author])).values()
  );

  console.log(uniqueAuthors);

  return (
    <div className="Main">
      <h3>{genre.name} Authors</h3>
      <AddAuthor genreId={genreId} />

      <List
        items={uniqueAuthors} 
        getKey={(author) => `${author.id}-${author.name}`}
        getDisplayText={(author) => author.name}
        getLink={(author) =>
          `/genres/${genre.id}/authors/${author.id}/books?genreId=${genre.id}`
        }
      />
    </div>
  );
}

export default GenresAuthorsPage;