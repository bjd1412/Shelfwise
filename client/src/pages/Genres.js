import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchGenres } from "../redux/actions/genresAction";
import List from "../components/List";

function Genres () {
    const dispatch = useDispatch()
    const {genres, status, error} = useSelector( state => state.genres)

    useEffect( () => {
        dispatch(fetchGenres())
    }, [dispatch])

    if (status === 'loading') {
        return <div>Loading authors...</div>;
      }
    
      if (status === 'failed') {
        return <div>Error: {error}</div>;
      }
    
      return (
        <div>
          <h3>Genres List</h3>
          <List items={genres} getDisplayText={genre => genre.name} getLink={genre => `/genres/${genre.id}/authors`}/>
        </div>
      );
  }  

  export default Genres