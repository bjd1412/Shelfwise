import React, { useEffect } from "react";
import List from "../components/List";
import { useSelector } from "react-redux";
import AddPatron from "../components/AddPatron";

function Patrons() {

    const patrons = useSelector(state => state.patrons.patrons)



    return (
        <div>
            <h3>Patrons</h3>
            <AddPatron/>
            <List items={patrons} getDisplayText={patron => patron.name} getLink={patron => `/patrons/${patron.id}`} />
        </div>
    )

}

export default Patrons