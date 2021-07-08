import React from "react";
import {Route, Redirect} from "react-router";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {CircularProgress} from "@material-ui/core";
import {paths} from "./Paths";

const PrivateRoute = ({component: Component, auth, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isLoading) {
                    return <CircularProgress />
                } else if (!auth.isAuthenticated) {
                    return <Redirect to={paths.Login}/>
                } else {
                    return <Component {...props} />
                }
            }}
        />
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);