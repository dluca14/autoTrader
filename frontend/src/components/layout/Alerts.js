import React, {Fragment, useEffect, useRef} from 'react';
import {withAlert} from 'react-alert';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Alerts = (props, prevProps) => {
    const isInitialRender = useRef(true)

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
        } else {
            const {error, alert, message} = props;

            // Add custom errors here
            if (error !== prevProps.error) {
                if (error.msg.non_field_errors)
                    alert.error(error.msg.non_field_errors.join());
                if (error.msg.email)
                    alert.error(error.msg.email.join());
                if (error.status === 404)
                    alert.error("Something went wrong..")
                if (error.status === 500)
                    alert.error("Server Failure")
            }
        }
    });

    return <Fragment/>;
}

Alerts.propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    error: state.errors,
    message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));