import React, {useEffect} from "react";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {render} from "react-dom";
import {Grid} from "@material-ui/core";

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';

import {paths} from "../Paths";
import Dashboard from "./layout/Dashboard";
import Alerts from "./layout/Alerts";

// Accounts
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PasswordReset from "./accounts/PasswordReset";
import ForgotPassword from "./accounts/ForgotPassword";

import PrivateRoute from "./common/PrivateRoute";

import {Provider} from "react-redux";

import store from '../store';
import {loadUser} from "../actions/accounts";

import {Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-oldschool-dark";
import Header from "./layout/Header";

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


function App(props) {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

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
                                <Switch>
                                    <PrivateRoute exact path="/" component={Dashboard}/>
                                    <Route exact path={paths.Login} component={Login}/>
                                    <Route exact path={paths.Register} component={Register}/>
                                    <Route exact path={paths.ForgotPassword} component={ForgotPassword}/>
                                    <Route exact path={paths.PasswordReset} component={PasswordReset}/>
                                </Switch>
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