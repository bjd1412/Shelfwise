import React, { useEffect } from "react";
import List from "../components/List";
import { fetchPatrons } from "../redux/actions/patronsAction";
import { useDispatch, useSelector } from "react-redux";
import AddPatron from "../components/AddPatron";

function Patrons() {
    const dispatch = useDispatch()
    const {patrons, status} = useSelector(state => state.patrons)

    useEffect(() => {
        if (status === "idle") {
              dispatch(fetchPatrons());
            }
    }, [dispatch, status])


    return (
        <div>
            <h3>Patrons</h3>
            <AddPatron/>
            <List items={patrons} getDisplayText={patron => patron.name} getLink={patron => `/patrons/${patron.id}`} />
        </div>
    )

}

export default Patrons