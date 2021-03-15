import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import {
    Card, Typography, Modal, Select, FormControl,
    MenuItem, TextField, AppBar, Toolbar, Button
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '75%',
        position: 'relative',
        margin: 'auto'
    },
    card: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
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
    formWrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        width: '100%'
    },
    textField: {
        width: '100%'
    }
}));

const statusOptions = ['DELAYED', 'ON SCHEDULE', 'LANDED'];

const CreateForm = ({
    close
}) => {

    const classes = useStyles();

    const [formValues, setFormValues] = useState(false);
    const [errorMessage, setError] = useState(false);

    const handleChange = (e, field) => {
        const newFormValue = {
            ...formValues,
            [field]: e.target.value
        }
        setFormValues(newFormValue)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('formValues', formValues)
        if (formValues.status) {
            axios.post(`${process.env.REACT_APP_FLIGHTS_API_ENDPOINT}`, { ...formValues })
                .then(async (res) => {
                    const flightsData = await res.data;
                    console.log('flightsData', flightsData);
                    if (flightsData) close(flightsData);
                    else throw new Error("Create Failed")
                })
                .catch(err => {
                    console.log('Error Updating data' + err);
                    setError(err.toString())
                })
        }
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
            <form onSubmit={(e) => handleSubmit(e)}>
            <AppBar position="static">
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" className={classes.title}>
                        Create Flight Details
                    </Typography>
                    <div>
                        <Button component={'button'} size='small' variant='contained' color="secondary" onClick={() => close()}>close</Button>
                        <Button component={'button'} size='small' variant='contained' color="primary" type="submit">Create</Button>
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
                            <FormControl className={classes.formControl}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    onChange={(e) => handleChange(e, 'status')}
                                    className={classes.textField}
                                    value={formValues['status']}
                                >
                                    {statusOptions.map((option, index) => {
                                        return (
                                            <MenuItem value={option} key={index}
                                            >{option}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.content}>
                            <Typography variant="subtitle1" color="secondary">
                                Flight Code
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <TextField onChange={(e) => handleChange(e, 'flightCode')} className={classes.textField} required/>
                            </FormControl>
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.content}>
                            <Typography variant="subtitle1" color="secondary">
                                Flight Provider
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <TextField onChange={(e) => handleChange(e, 'flightProvider')} required/>
                            </FormControl>
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.content}>
                            <Typography variant="subtitle1" color="secondary">
                                Source Port Name
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <TextField onChange={(e) => handleChange(e, 'sourcePortName')} required/>
                            </FormControl>
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.content}>
                            <Typography variant="subtitle1" color="secondary">
                                Source Port Code
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <TextField onChange={(e) => handleChange(e, 'sourcePortCode')} required/>
                            </FormControl>
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.content}>
                            <Typography variant="subtitle1" color="secondary">
                                Destination Port Code
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <TextField onChange={(e) => handleChange(e, 'destinationPortCode')} required/>
                            </FormControl>
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.content}>
                            <Typography variant="subtitle1" color="secondary">
                                Destination Port Name
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <TextField onChange={(e) => handleChange(e, 'destinationPortName')} required/>
                            </FormControl>
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.content}>
                            <Typography variant="subtitle1" color="secondary">
                                Scheduled Arrival
                            </Typography>
                            <TextField
                                type="datetime-local"
                                onChange={(e) => handleChange(e, 'scheduledArrival')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.content}>
                            <Typography variant="subtitle1" color="secondary">
                                Scheduled Departure
                            </Typography>
                            <TextField
                                type="datetime-local"
                                onChange={(e) => handleChange(e, 'scheduledDeparture')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </div>
                </div>
                </form>
            </Card>

        </Modal>
    )
}

CreateForm.propTypes = {
    close: PropTypes.func
}

export default CreateForm;