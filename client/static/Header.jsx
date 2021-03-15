import React from "react";
import PropTypes from "prop-types";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '75%',
        position: 'relative',
        margin: 'auto'
    }
}));

const Header = ({
    create
}) => {

    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" className={classes.title}>
                    Flights
                </Typography>
                <Button component='button' size='small' variant='contained' color="primary" onClick={() => create(true)}>Create</Button>
            </Toolbar>
        </AppBar>
    )
}

Header.propTypes = {
    create: PropTypes.func
}

export default Header;