import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAuthors } from "../redux/actions/authorsActions"
import List from "../components/List"
import AddAuthor from "../components/AddAuthor"

function Authors() {
  const dispatch = useDispatch();
  const { authors, status } = useSelector((state) => state.authors);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAuthors());
    }
  }, [dispatch, status]);


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