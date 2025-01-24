
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
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            marginBottom: "10px",
            padding: "5px",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
  
    
        <ul>
          {filteredItems.map((item) => (
            <li key={item.id}>
              <Link to={getLink(item)}>{getDisplayText(item)}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
export default List;