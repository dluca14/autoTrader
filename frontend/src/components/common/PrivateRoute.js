import React from "react";
import {Route, Redirect} from "react-router";
import {connect} from "react-redux";
import {paths} from "./Paths";
import Loading from "./Loading";

const PrivateRoute = ({component: Component, auth, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isLoading) {
                    return <Loading />
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