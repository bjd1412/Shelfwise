import { NavLink } from "react-router-dom";
import React from "react";

function NavBar() {

    return (
        <div>
        <nav className="NavBar">
            <NavLink to="/authors">Authors</NavLink>
            <NavLink to="/patrons">Patrons</NavLink>
            <NavLink to="/genres">Genres</NavLink>
        </nav>
        </div>

    )
}

export default NavBar