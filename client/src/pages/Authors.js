import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAuthors } from "../redux/actions/authorsActions"

function Authors(){
    const dispatch = useDispatch()
    const { authors, status, error } = useSelector((state) => state.authors); 

    useEffect(() => {
      dispatch(fetchAuthors());  
    }, [dispatch]);
  
    if (status === 'loading') {
      return <div>Loading authors...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div>
        <h3>Authors List</h3>
        <ul>
          {authors.map((author) => (
            <li key={author.id}>{author.name}</li>
          ))}
        </ul>
      </div>
    );
}  

export default Authors