import React, {useEffect} from "react";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {render} from "react-dom";
import {Grid} from "@material-ui/core";

import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';

import {paths} from "./common/Paths";
import Alerts from "./common/Alerts";

// Accounts
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PasswordReset from "./accounts/PasswordReset";
import ForgotPassword from "./accounts/ForgotPassword";

import PrivateRoute from "./common/PrivateRoute";

import {Provider} from "react-redux";

import store from '../store';
import {loadUser} from "../actions/accounts";

import Home from "./home/Home";
import Portfolio from "./portfolio/Portfolio";

import {Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-oldschool-dark";
import Header from "./header/Header";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Copyright from "./common/Copyright";
import Heatmap from "./heatmap/Heatmap";
import Predictions from "./predictions/Predictions";
import Sentiment from "./sentiment/Sentiment";
import Profile from "./profile/Profile";


const alertOptions = {
    timeout: 3000,
    position: 'bottom center'
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: red[900],
        },
        secondary: {
            main: red[500],
        }
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    appBarSpacer: theme.mixins.toolbar
}));

function App(props) {
    const classes = useStyles();
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    const privateRoutes = [
        <PrivateRoute exact path={paths.Home} component={Home}/>,
        <PrivateRoute exact path={paths.Portfolio} component={Portfolio}/>,
        <PrivateRoute exact path={paths.Heatmap} component={Heatmap}/>,
        <PrivateRoute exact path={paths.Predictions} component={Predictions}/>,
        <PrivateRoute exact path={paths.Sentiment} component={Sentiment}/>,
        <PrivateRoute exact path={paths.Profile} component={Profile}/>
    ]

    const publicRoutes = [
        <Route exact path={paths.Login} component={Login}/>,
        <Route exact path={paths.Register} component={Register}/>,
        <Route exact path={paths.ForgotPassword} component={ForgotPassword}/>,
        <Route exact path={paths.PasswordReset} component={PasswordReset}/>
    ]

    const mainView = (
        <div className={classes.root}>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Switch>
                        {privateRoutes}
                        {publicRoutes}
                    </Switch>
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>
            </main>
        </div>
    );

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Grid container>
                            <Grid item xs={12}>
                                <Header/>
                                <Alerts/>
                            </Grid>
                            <Grid item xs={12}>
                                {mainView}
                            </Grid>
                        </Grid>
                    </Router>
                </AlertProvider>
            </ThemeProvider>
        </Provider>
    );
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);