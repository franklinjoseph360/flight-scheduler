import React, { useState, useEffect } from "react";
import axios from "axios";
import FlightCard from "./components/FlightCard.jsx";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '75%',
        position: 'relative',
        margin: 'auto'
    }
}));

export const Home = () => {

    const classes = useStyles();

    const [flights, loadFlightsData] = useState(false);
    const [errorMessage, setError] = useState(false);

    useEffect(async () => {
        console.log('Load Flights data ...');
        axios.defaults.headers.get['Content-Type'] = 'application/json';
        axios.get(`${process.env.REACT_APP_FLIGHTS_API_ENDPOINT}`)
            .then(async (res) => {
                console.log('res', res);
                const flightsData = await res.data.flights;
                if(flightsData.length > 0) loadFlightsData(flightsData);
                else throw new Error("No data found")
            })
            .catch(err => {
                console.log('Error loading flights data' + err);
                setError(err.toString())
            })
    }, [])

    return (
        <div className={classes.root}>
            {errorMessage &&
                <Alert severity="error" onClose={() => setError(false)}>{errorMessage}</Alert>
            }
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