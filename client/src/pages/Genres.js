import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchGenres } from "../redux/actions/genresAction";
import List from "../components/List";
import AddGenre from "../components/AddGenre";

function Genres () {
    const dispatch = useDispatch()
    const {genres, status} = useSelector( state => state.genres)

    useEffect( () => {
         if (status === "idle") {
              dispatch(fetchGenres());
            }
    }, [dispatch, status])

    
      return (
        <div>
          <h3>Genres List</h3>
          <AddGenre/>
          <List items={genres} getDisplayText={genre => genre.name} getLink={genre => `/genres/${genre.id}/authors`}/>        
        </div>
      );
  }  

  export default Genres