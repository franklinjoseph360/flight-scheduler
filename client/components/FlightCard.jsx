import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Divider, Link, IconButton } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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
    }
}));

const FlightCard = () => {
    const classes = useStyles();
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
                        Frankfurt FRA
                    </Typography>
                    <Typography variant="subtitle1" color="secondary">
                        LH980&nbsp;Lufthansa
                    </Typography>
                </CardContent>
            </div>
            <Divider orientation="vertical" className={classes.divider} />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5" color="primary">
                        LANDED
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
                        <Link href="#" color="inherit" className={classes.link}>
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
    flightDetail: PropTypes.object
}

export default FlightCard;