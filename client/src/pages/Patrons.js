import React, { useEffect } from "react";
import List from "../components/List";
import { fetchPatrons } from "../redux/actions/patronsAction";
import { useDispatch, useSelector } from "react-redux";

function Patrons() {
    const dispatch = useDispatch()
    const {patrons, status, error} = useSelector(state => state.patrons)

    useEffect(() => {
        dispatch(fetchPatrons())
    }, [dispatch])

    if( status === "loading") {
        return <div>Loading patrons...</div>
    }

    if (status === "failed") {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h3>Patrons</h3>
            <List items={patrons} getDisplayText={patron => patron.name} getLink={patron => `/patrons/${patron.id}`} />
        </div>
    )

}

export default Patrons