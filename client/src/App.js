import './App.css';
import React, { useEffect } from "react";
import { Outlet } from 'react-router-dom'; 
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchPatrons } from './redux/actions/patronsAction';
import { fetchGenres } from './redux/actions/genresAction';
import { fetchAuthors } from './redux/actions/authorsActions';


function App() {

  const dispatch = useDispatch()
  const authors = useSelector(state => state.authors.authors)
  const genres = useSelector(state => state.genres.genres)
  const patrons = useSelector(state => state.patrons.patrons)

  useEffect(() => {
    dispatch(fetchPatrons());
    dispatch(fetchAuthors())
    dispatch(fetchGenres())
  }, [dispatch]);


  
  return (
    <div className="App">
      <NavBar/>
      <header className="App-header">
      <Outlet context={{authors, genres, patrons}} />
      </header>
  
   
    </div>
  );
}

export default App;
