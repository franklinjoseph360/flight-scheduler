import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from "./Home.jsx";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey, red } from "@material-ui/core/colors"

const theme = createMuiTheme({
    root: {
        height: '100vh'
    },
    palette: {
        primary: {
            main: grey[800]
        },
        secondary: {
            main: grey[500]
        }
    },
    typography: {
        h2: {
            fontSize: '1.2rem',
            fontWeight: 700,
        },
        h1: {
            fontSize: '1rem',
            fontWeight: 700,
        },
        h5: {
            fontSize: '0.9rem',
            fontWeight: 700,
        },
        subtitle1: {
            fontSize: '0.8rem',
            fontWeight: 700,
        },
        subtitle2: {
            fontSize: '0.9rem',
            fontWeight: 400,
        }
    }
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Home />
        </ThemeProvider>
    )
}
ReactDOM.render(<App />, document.getElementById('app'));