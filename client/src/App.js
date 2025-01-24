import './App.css';
import { Outlet } from 'react-router-dom'; 
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <header className="App-header">
      <Outlet />
      </header>
  
   
    </div>
  );
}

export default App;
