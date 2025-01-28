import './App.css';
import React, { useEffect } from "react";
import { Outlet } from 'react-router-dom'; 
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchPatrons } from './redux/actions/patronsAction';
import { fetchGenres } from './redux/actions/genresAction';
import { fetchAuthors } from './redux/actions/authorsActions';
import Shelfwise from "./imgs/Shelf_Wise.png"


function App() {

  const dispatch = useDispatch()
  
  
  

  useEffect(() => {
    dispatch(fetchPatrons());
    dispatch(fetchAuthors())
    dispatch(fetchGenres())
  }, [dispatch]);


  
  return (
    <div className='App'>
      <img src={Shelfwise} alt="Logo" className="Navbar_logo"/>
      <NavBar/>
      <div className='App-header'>
      <Outlet  />
      </div> 
    </div>
  );
}

export default App;
