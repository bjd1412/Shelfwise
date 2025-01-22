import React from "react"
import {Link} from "react-router-dom"

function List({items, getDisplayText, getLink}) {
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    <Link to={getLink(item)}>{getDisplayText(item)}</Link>

                </li>
            ))}
        </ul>
    )
}

export default List