import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {render} from "react-dom";
import {Container, Grid,} from "@material-ui/core";

import Dashboard from "./layout/Dashboard";
import Header from "./layout/Header";
import Alerts from "./layout/Alerts";

import Login from "./accounts/Login";
import Register from "./accounts/Register";

import PrivateRoute from "./common/PrivateRoute";

import {Provider} from "react-redux";

import store from '../store';
import {loadUser} from "../actions/auth";

import {Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const alertOptions = {
    timeout: 3000,
    position: 'bottom center'
}

function App(props) {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <Router>
                    <Grid container>
                        <Grid item xs={12}>
                            <Header/>
                            <Alerts/>
                        </Grid>
                        <Grid item xs={12}>
                            <Container maxWidth="md">
                                <Switch>
                                    <PrivateRoute exact path="/" component={Dashboard}/>
                                    <Route exact path="/login" component={Login}/>
                                    <Route exact path="/register" component={Register}/>
                                </Switch>
                            </Container>
                        </Grid>
                    </Grid>
                </Router>
            </AlertProvider>
        </Provider>
    );
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);