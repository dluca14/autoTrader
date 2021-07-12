import React from "react";
import {Form, Formik} from "formik";
import {Link as RouterLink} from "react-router-dom";
import * as Yup from 'yup';
import {
    Avatar,
    Button, Container, CssBaseline,
    Grid, Link,
    Typography
} from "@material-ui/core";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import TextFieldWrapper from "../common/TextFieldWrapper";

import {paths} from "../common/Paths";

import {connect} from "react-redux";
import {forgotPassword} from "../../actions/accounts";

import {Redirect} from "react-router";
import {accountStyles} from "../common/styles/Accounts";

const validationSchema = Yup.object({
    email: Yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
})

const initialValues = {
    email: ''
}

const ResetForm = () => {
    const classes = accountStyles();

    return [
        <Grid item xs={12} align="center">
            <TextFieldWrapper
                name='email'
                label='Email'
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
                Send Password Reset Request
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
                Please check your inbox and follow the instructions to complete the password reset process.
            </Typography>
        </Grid>,
        <Grid item xs={12} align='center'>
            <RouterLink component={Link} to={paths.Login}>
                Understood. Take me to the log in page.
            </RouterLink>
        </Grid>
    ]
}


const ForgotPassword = (props) => {
    const classes = accountStyles();

    if (props.isAuthenticated) {
        return <Redirect to={paths.Home}/>
    } else {
        return (
            <Container maxWidth="xs">
                <CssBaseline/>
                <Formik
                    initialValues={{...initialValues}}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        props.forgotPassword(values.email);
                    }}>
                    <Form className={classes.form}>
                        <Grid container spacing={2} alignItems={"center"}>
                            <Grid item xs={12} align="center">
                                <Avatar className={classes.avatar}>
                                    {props.isPasswordReset ? <LockOpenIcon/> : <LockIcon/>}
                                </Avatar>
                                <Typography component='h1' variant='h4'>
                                    Forgotten Password
                                </Typography>
                                <Typography variant='caption'>
                                    {props.isPasswordReset ? 'Email sent successfully!' : 'Please enter your email to reset your password'}
                                </Typography>
                            </Grid>
                            {props.isPasswordReset ? <ResetDone/> : <ResetForm/>}
                        </Grid>
                        {props.isPasswordReset ? null : <Links/>}
                    </Form>
                </Formik>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isPasswordReset: state.auth.isPasswordResetRequestSent
});

export default connect(mapStateToProps, {forgotPassword})(ForgotPassword);