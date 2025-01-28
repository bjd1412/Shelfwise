import React from "react"
import { useSelector } from "react-redux"
import List from "../components/List"
import AddAuthor from "../components/AddAuthor"

function Authors() {
  
  const authors = useSelector(state => state.authors.authors)

  return (
    <div>
      <h3>Authors List</h3>
      <AddAuthor />
      <List
        items={authors}
        getDisplayText={(author) => author.name}
        getLink={(author) => `/authors/${author.id}/books`}
      />
    </div>
  );
}

export default Authors