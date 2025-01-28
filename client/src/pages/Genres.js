import React from "react";
import { useSelector } from "react-redux";
import List from "../components/List";
import AddGenre from "../components/AddGenre";

function Genres () {
  const genres = useSelector(state => state.genres.genres)

    
      return (
        <div>
          <h3>Genres List</h3>
          <AddGenre/>
          <List items={genres} getDisplayText={genre => genre.name} getLink={genre => `/genres/${genre.id}/authors`}/>        
        </div>
      );
  }  

  export default Genres