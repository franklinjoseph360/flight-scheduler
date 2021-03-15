import React, { useState, useEffect } from "react";
import axios from "axios";
import FlightCard from "./components/FlightCard.jsx";
import FlightDataView from "./components/FlightDataView.jsx";
import CreateForm from "./components/CreateForm.jsx";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Header from "./static/header.jsx";

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
    const [currentData, setCurrentData] = useState(false);
    const [errorMessage, setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [createForm, showCreateForm] = useState(false);

    useEffect(async () => {
        console.log('Load Flights data ...');
        axios.defaults.headers.get['Content-Type'] = 'application/json';
        axios.get(`${process.env.REACT_APP_FLIGHTS_API_ENDPOINT}`)
            .then(async (res) => {
                console.log('res', res);
                const flightsData = await res.data.flights;
                if (flightsData && flightsData.length > 0) loadFlightsData(flightsData);
                else throw new Error("No data found")
            })
            .catch(err => {
                console.log('Error loading flights data' + err);
                setError(err.toString())
            })
    }, [successMessage])

    const viewFlightData = (id) => {
        axios.get(`${process.env.REACT_APP_FLIGHTS_API_ENDPOINT}/${id}`)
            .then(async (res) => {
                const flightsData = await res.data.flight;
                if (flightsData) setCurrentData(flightsData);
                else throw new Error("No data found")
            })
            .catch(err => {
                console.log('Error loading flights data' + err);
                setError(err.toString())
            })
    }

    const closeFlightData = (updatedData) => {
        let flightsList = flights && flights.map((flight) => {
            if (flight.id === updatedData.id) {
                return updatedData
            } else return flight;
        });
        loadFlightsData(flightsList);
        setCurrentData(false);
        setSuccessMessage("Updated Successfully")
    }

    const closeCreateForm = () => {
        setSuccessMessage("Created Successfully");
        showCreateForm(false);
    }

    return (
        <div className={classes.root}>
            <Header 
                create={showCreateForm}
            />
            {errorMessage &&
                <Alert severity="error" onClose={() => setError(false)}>{errorMessage}</Alert>
            }
            {successMessage &&
                <Alert severity="success" onClose={() => setSuccessMessage(false)}>{successMessage}</Alert>
            }
            {flights && flights.map(flightData => {
                return (
                    <FlightCard
                        flightData={flightData}
                        key={flightData.id}
                        viewFlightData={viewFlightData}
                    />
                )
            })}
            {currentData && Object.keys(currentData).length > 0 &&
                <>
                    <FlightDataView
                        flightData={currentData}
                        close={closeFlightData}
                    />
                </>
            }
            {createForm &&
                <>
                    <CreateForm
                        close={closeCreateForm} 
                     />
                </>
            }
        </div>
    )
}