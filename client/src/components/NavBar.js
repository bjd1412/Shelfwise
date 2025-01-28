import { NavLink } from "react-router-dom";
import React from "react";
import "./Navbar.css"
import Shelfwise from "../imgs/Shelf_Wise.png"

function NavBar() {

    return (
        <div>
            <nav className="navbar">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/authors">Authors</NavLink>
                <NavLink to="/patrons">Patrons</NavLink>
                <NavLink to="/genres">Genres</NavLink>
                <div>
                
                </div>
            </nav>
            
        </div>

    )
}

export default NavBar