import React, { useState, useEffect } from "react";
import axios from "axios";
import FlightCard from "./components/FlightCard.jsx";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '75%',
        position: 'relative',
        margin: 'auto'
    }
}));

export const Home = () => {

    const classes = useStyles();

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

    return (
        <div className={classes.root}>
            {flights && flights.map(flightDetail => {
                return (
                    <FlightCard
                        flightDetail={flightDetail}
                        key={flightDetail.id}
                    />
                )
            })}
        </div>
    )
}