
import React from "react";
import { Link } from "react-router-dom";

function List({ items, getDisplayText, getLink }) {
 
  const itemsList = Array.isArray(items) ? items : [];

  return (
    <ul>
      {itemsList.map(item => (
        <li key={item.id}>
          <Link to={getLink(item)}>{getDisplayText(item)}</Link>
        </li>
      ))}
    </ul>
  );
}

export default List;