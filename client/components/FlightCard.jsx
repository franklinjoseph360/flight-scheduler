import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Divider, Link, IconButton } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import clsx from  'clsx';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '75%',
        position: 'relative',
        margin: 'auto'
    },
    card: {
        display: 'flex',
        justifyContent: 'space-around',
        overflow: 'visible',
        margin: 10,
        boxShadow: '0 20px 20px -20px rgb(0 0 0 / 30%), 0 0 15px rgb(0 0 0 / 6%)'
    },
    details: {
        display: 'flex',
        padding: 10,
        width: '100%',
        flexDirection: 'column'
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
    badge: {
        borderRadius: '4px',
        padding: '5px',
        display: 'block',
        width: 'fit-content',
        fontSize: '12px'
    },
    landed: {
        backgroundColor: 'green',
        color: 'white'
    },
    delayed:  {
        backgroundColor: 'yellow'
    }
}));

const FlightCard = ({
    viewFlightData,
    flightData
}) => {
    const classes = useStyles();
    let cls;
    if(flightData.status === 'DELAYED') {
        cls = clsx(classes.badge, classes.delayed);
    } else {
        cls = clsx(classes.badge, classes.landed);
    }
    return (
        <Card className={classes.card}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="h2" color="primary">
                        17:05
                    </Typography>
                </CardContent>
            </div>
            <Divider orientation="vertical" className={classes.divider} />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h1" variant="h1" color="primary">
                        {flightData.sourcePortName}
                    </Typography>
                    <Typography variant="subtitle1" color="secondary">
                        {flightData.flightCode}&nbsp;{flightData.flightProvider}
                    </Typography>
                </CardContent>
            </div>
            <Divider orientation="vertical" className={classes.divider} />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h1" variant="h1" color="primary" className={cls}>
                        {flightData.status}
                    </Typography>
                </CardContent>
            </div>
            <Divider orientation="vertical" className={classes.divider} />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="subtitle1" color="secondary">
                        Terminal 1
                    </Typography>
                </CardContent>
            </div>
            <div className={classes.details}>
                <CardContent className={classes.content} style={{ textAlign: 'right' }}>
                    <Typography component="h5" variant="h5">
                        <Link href="#" color="inherit" className={classes.link} onClick={() => viewFlightData(flightData.id)}>
                            More Details&nbsp;
                            <IconButton aria-label="More Details">
                                <ArrowForwardIcon className={classes.link} />
                            </IconButton>
                        </Link>
                    </Typography>
                </CardContent>
            </div>
        </Card>
    )
}

FlightCard.propTyes = {
    flightData: PropTypes.object,
    viewFlightData: PropTypes.func
}

export default FlightCard;