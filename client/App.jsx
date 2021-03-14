import React, { useState, useEffect } from "react";
import axios from "axios";

export const App = () => {

    const [flights, loadFlightsData] = useState(null);

    useEffect(async () => {
        console.log('Load Flights data ...');
        axios.defaults.headers.get['Content-Type'] = 'application/json';
        axios.get(`/flights`)
            .then(async (res) => {
                console.log('res', res);
                const flightsData = await res.data;
                loadFlightsData(flightsData);
            })
    }, [])

    console.log('flights', flights);
    return (
        <div>
            Flight Details 
        </div>
    )
}