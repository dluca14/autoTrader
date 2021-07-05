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
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import TextFieldWrapper from "../common/TextFieldWrapper";
import {paths} from "../../Paths";

import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {login} from "../../actions/accounts";

import {Redirect} from "react-router";
import useStyles from "./Styles";

const validationSchema = Yup.object({
    email: Yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: Yup
        .string('Enter your password')
        .required('Password is required')
})

const initialValues = {
    email: '',
    password: ''
}

const Login = (props) => {
    const classes = useStyles();

    if (props.isAuthenticated) {
        return <Redirect to="/"/>
    } else {
        return (
            <Container maxWidth="xs">
                <CssBaseline/>
                <Formik
                    initialValues={{...initialValues}}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        props.login(values.email, values.password);
                    }}>
                    <Form className={classes.form}>
                        <Grid container spacing={2} alignItems={"center"}>
                            <Grid item xs={12} align="center">
                                <Avatar className={classes.avatar}>
                                    <VpnKeyIcon/>
                                </Avatar>
                                <Typography component='h1' variant='h4'>
                                    User Login
                                </Typography>
                                <Typography variant='caption'>
                                    Please fill this form to log in
                                </Typography>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <TextFieldWrapper
                                    name='email'
                                    label='Email'
                                />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <TextFieldWrapper
                                    name='password'
                                    label='Password'
                                    type="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12} align='center'>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Log in
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container justify="flex-end">
                            <Grid item xs>
                                <RouterLink component={Link} to={paths.ForgotPassword}>
                                    Forgot password?
                                </RouterLink>
                            </Grid>
                            <Grid item>
                                <RouterLink component={Link} to={paths.Register}>
                                    Don't have an account? Sign Up
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Container>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);