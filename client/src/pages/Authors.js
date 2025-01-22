import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAuthors } from "../redux/actions/authorsActions"
import List from "../components/List"

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
        <List items={authors} getDisplayText={author => author.name} getLink={author => `/authors/${author.id}/books`}/>
      </div>
    );
}  

export default Authors