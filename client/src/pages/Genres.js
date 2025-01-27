import React from "react";
import { useOutletContext } from "react-router-dom";
import List from "../components/List";
import AddGenre from "../components/AddGenre";

function Genres () {
    const {genres} = useOutletContext()

    
      return (
        <div>
          <h3>Genres List</h3>
          <AddGenre/>
          <List items={genres} getDisplayText={genre => genre.name} getLink={genre => `/genres/${genre.id}/authors`}/>        
        </div>
      );
  }  

  export default Genres