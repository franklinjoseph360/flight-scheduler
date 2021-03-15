import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, AppBar, Toolbar, Button, Modal, Select, MenuItem } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '75%',
        position: 'relative',
        margin: 'auto'
    },
    card: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        flexDirection: 'column',
        width: '750px',
        overflow: 'visible',
        margin: 10,
        overflow: 'scroll',
        boxShadow: '0 20px 20px -20px rgb(0 0 0 / 30%), 0 0 15px rgb(0 0 0 / 6%)'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '30%'
    },
    content: {
        flex: '1 0 auto',
        padding: 10
    },
    divider: {
        alignSelf: 'center',
        height: 50
    },
    link: {
        color: "#388e3c"
    },
    modal: {
        display: 'flex',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const statusOptions = ['DELAYED', 'ON SCHEDULE', 'LANDED'];

const FlightDataView = ({
    flightData,
    close
}) => {

    const classes = useStyles();

    const [status, setStatus] = useState(false);
    const [errorMessage, setError] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setStatus(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status) {
            axios.defaults.headers.get['Application'] = 'application/json';
            axios.defaults.headers.get['Content-Type'] = 'application/json';
            axios.put(`${process.env.REACT_APP_FLIGHTS_API_ENDPOINT}/${flightData.id}`, { status })
                .then(async (res) => {
                    const flightsData = await res.data.flight;
                    if (flightsData) close(flightsData);
                    else throw new Error("Update Failed")
                })
                .catch(err => {
                    console.log('Error Updating data' + err);
                    setError(err.toString())
                })
        }
    }

    const deleteRecord = async (e) => {
        e.preventDefault();
        axios.delete(`${process.env.REACT_APP_FLIGHTS_API_ENDPOINT}/${flightData.id}`)
            .then(async (res) => {
                if(res.data.result) close(false);
                else throw new Error("Delete unsuccessfull")
            })
            .catch(err => {
                console.log('Error deleting data' + err);
                setError(err.toString())
            })
    }

    return (
        <Modal
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open
            aria-labelledby="View Flight Detail"
            aria-describedby="Flight data, Update status"
            className={classes.modal}
        >
            <Card className={classes.card}>
                <AppBar position="static">
                    <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" className={classes.title}>
                            Update Flight Status
                        </Typography>
                        <div>
                            <Button component='button' size='small' variant='contained' color="secondary" onClick={() => close(false)}>close</Button>
                        &nbsp;
                        <Button component='button' size='small' variant='contained'
                                style={{ backgroundColor: 'red', color: 'white' }} onClick={(e) => deleteRecord(e)}>Delete</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                {errorMessage &&
                    <Alert severity="error" onClose={() => setError(false)}>{errorMessage}</Alert>
                }
                <div className={classes.formWrapper}>
                    <div className={classes.details}>
                        <div className={classes.content}>
                            <Typography variant="subtitle1" color="secondary">
                                Status
                            </Typography>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={flightData.status}
                                onChange={handleChange}
                            >
                                {statusOptions.map((option, index) => {
                                    return (
                                        <MenuItem value={option} key={index}
                                        >{option}</MenuItem>
                                    )
                                })}
                            </Select>
                            &nbsp;
                            <Button
                                component='button'
                                size='small'
                                variant='contained'
                                color="primary"
                                onClick={(e) => handleSubmit(e)}
                                disabled={status ? false : true}
                            >Update</Button>
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.content}>
                            <Typography variant="subtitle1" color="secondary">
                                Flight Code
                        </Typography>
                            <Typography component="h1" variant="h1" color="primary">
                                {flightData.flightCode}
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.content}>
                            <Typography variant="subtitle1" color="secondary">
                                Flight Provider
                        </Typography>
                            <Typography component="h1" variant="h1" color="primary">
                                {flightData.flightProvider}
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.content}>
                            <Typography variant="subtitle1" color="secondary">
                                Source Port Name
                        </Typography>
                            <Typography component="h1" variant="h1" color="primary">
                                {flightData.sourcePortName}
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.content}>
                            <Typography variant="subtitle1" color="secondary">
                                Source Port Code
                        </Typography>
                            <Typography component="h1" variant="h1" color="primary">
                                {flightData.sourcePortCode}
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.content}>
                            <Typography variant="subtitle1" color="secondary">
                                Destination Port Code
                        </Typography>
                            <Typography component="h1" variant="h1" color="primary">
                                {flightData.destinationPortCode}
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.content}>
                            <Typography variant="subtitle1" color="secondary">
                                Destination Port Name
                        </Typography>
                            <Typography component="h1" variant="h1" color="primary">
                                {flightData.destinationPortName}
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.content}>
                            <Typography variant="subtitle1" color="secondary">
                                Scheduled Arrival
                        </Typography>
                            <Typography component="h1" variant="h1" color="primary">
                                {flightData.scheduledArrival}
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.content}>
                            <Typography variant="subtitle1" color="secondary">
                                Scheduled Departure
                        </Typography>
                            <Typography component="h1" variant="h1" color="primary">
                                {flightData.scheduledDeparture}
                            </Typography>
                        </div>
                    </div>
                </div>
            </Card>

        </Modal>
    )
}

FlightDataView.propTyes = {
    flightData: PropTypes.object,
    close: PropTypes.func
}

export default FlightDataView;