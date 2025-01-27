import React, { useEffect } from "react";
import List from "../components/List";
import { useOutletContext } from "react-router-dom";
import AddPatron from "../components/AddPatron";

function Patrons() {

    const {patrons} = useOutletContext()



    return (
        <div>
            <h3>Patrons</h3>
            <AddPatron/>
            <List items={patrons} getDisplayText={patron => patron.name} getLink={patron => `/patrons/${patron.id}`} />
        </div>
    )

}

export default Patrons