import React, {useEffect} from "react";
import {Form, Formik} from "formik";
import {Link as RouterLink} from "react-router-dom";
import * as Yup from 'yup';
import {
    Avatar,
    Button, CircularProgress, Container, CssBaseline,
    Grid, Link,
    Typography
} from "@material-ui/core";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import TextFieldWrapper from "../common/TextFieldWrapper";

import {connect} from "react-redux";
import {passwordReset} from "../../actions/accounts";
import {checkPasswordResetToken} from "../../actions/accounts";

import {Redirect, useParams} from "react-router";
import store from "../../store";
import {paths} from "../common/Paths";
import {accountStyles} from "../common/styles/Accounts";

const validationSchema = Yup.object({
    password: Yup
        .string('Enter a new password')
        .required('A new password is required'),
})

const initialValues = {
    password: ''
}

const ResetForm = () => {
    const classes = accountStyles();

    return [
        <Grid item xs={12} align="center">
            <TextFieldWrapper
                name='password'
                label='Password'
                type="password"
                autoComplete="current-password"
            />
        </Grid>,
        <Grid item xs={12} align='center'>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Send Password Reset
            </Button>
        </Grid>
    ]
}

const Links = () => {
    return (
        <Grid container justify="flex-end">
            <Grid item xs>
                <RouterLink component={Link} to={paths.Login}>
                    Remembered? Log In
                </RouterLink>
            </Grid>
            <Grid item>
                <RouterLink component={Link} to={paths.Register}>
                    Don't have an account? Sign Up
                </RouterLink>
            </Grid>
        </Grid>
    )
}


const ResetDone = () => {
    return [
        <Grid item xs={12} align="center">
            <Typography>
                Password has been successfully changed! You may now login using the new password.
            </Typography>
        </Grid>,
        <Grid item xs={12} align='center'>
            <RouterLink component={Link} to={paths.Login}>
                Understood. Take me to the log in page.
            </RouterLink>
        </Grid>
    ]
}

const ErrorMessage = () => {
    return (
        <Container maxWidth="xs">
            <CssBaseline/>
            <Grid item xs={12} align="center">
                <Typography>
                    The password reset token expired or is not valid. Please send a new request.
                </Typography>
            </Grid>,
            <Grid item xs={12} align='center'>
                <RouterLink component={Link} to={paths.ForgotPassword}>
                    Understood. Take me to the forgot password page.
                </RouterLink>
            </Grid>
        </Container>
    );
}


const PasswordReset = (props) => {
    let {uidb64, token} = useParams();
    useEffect(() => {
        store.dispatch(checkPasswordResetToken(uidb64, token));
    }, []);
    const classes = accountStyles();

    if (props.isAuthenticated) {
        return <Redirect to={paths.ChartView}/>
    } else if (props.passwordResetToken) {
        if (props.passwordResetToken.success) {
            return (
                <Container maxWidth="xs">
                    <CssBaseline/>
                    <Formik
                        initialValues={{...initialValues}}
                        validationSchema={validationSchema}
                        onSubmit={values => {
                            props.passwordReset(values.password, uidb64, token);
                        }}>
                        <Form className={classes.form}>
                            <Grid container spacing={2} alignItems={"center"}>
                                <Grid item xs={12} align="center">
                                    <Avatar className={classes.avatar}>
                                        {props.isPasswordReset ? <LockOpenIcon/> : <LockIcon/>}
                                    </Avatar>
                                    <Typography component='h1' variant='h4'>
                                        Password Reset
                                    </Typography>
                                    <Typography variant='caption'>
                                        {props.isPasswordReset ? 'Password Changed Successfully!' : 'Please enter a new password'}
                                    </Typography>
                                </Grid>
                                {props.isPasswordReset ? <ResetDone/> : <ResetForm/>}
                            </Grid>
                            {props.isPasswordReset ? null : <Links/>}
                        </Form>
                    </Formik>
                </Container>
            );
        } else {
            return <ErrorMessage/>;
        }
    } else if (props.isPasswordReset) {
        return <ResetDone/>;
    } else {
        return (<Grid container justify="center">
            <CircularProgress/>
        </Grid>);
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isPasswordReset: state.auth.isPasswordReset,
    passwordResetToken: state.auth.passwordResetToken
});

export default connect(mapStateToProps, {passwordReset})(PasswordReset);