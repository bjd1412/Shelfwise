
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";


function List({ items, getDisplayText, getLink }) {
    const [searchTerm, setSearchTerm] = useState(""); 
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value); 
    };
  
    const filteredItems = Array.isArray(items)
      ? items.filter((item) =>
          getDisplayText(item).toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
  
    return (
      <div className="list-container">
        <input
          type="text"
          className="list-search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
  
    
        <ul className="list">
          {filteredItems.map((item) => (
            <li  key={`${item.id}-${item.name}`} className="list-item">
            <Link to={getLink(item)}>{getDisplayText(item)}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
export default List;