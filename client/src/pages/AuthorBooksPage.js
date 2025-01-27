import React from "react";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import AddBookButton from "../components/AddBookButton";
import List from "../components/List";

function AuthorsBooksPage() {
  const { authors } = useOutletContext();
  const { authorId } = useParams();
  const [searchParams] = useSearchParams();
  const genreId = searchParams.get("genreId"); 

  const author = authors.find((auth) => auth.id === parseInt(authorId));

  if (!author) {
    return <p>Author not found.</p>;
  }


  const filteredBooks = genreId
    ? author.books.filter(
        (book) => book.genre && book.genre.id === parseInt(genreId)
      )
    : author.books;

  return (
    <div>
      <h3>Books in Selected Genre</h3>
      <AddBookButton authorId={authorId} genreId={genreId} />
      <List
        items={filteredBooks} 
        getDisplayText={(book) => book.title}
        getLink={(book) => `/authors/${authorId}/books/${book.id}`}
      />
    </div>
  );
}

export default AuthorsBooksPage;