import React from "react";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {Link as RouterLink} from "react-router-dom";
import {connect} from "react-redux";
import {register} from "../../actions/auth";

import {Grid, Typography, Avatar, Button, Container, makeStyles, Link, CssBaseline, Snackbar}
    from "@material-ui/core";

// Custom Wrapper components
import TextFieldWrapper from "../common/TextFieldWrapper";
import {PropTypes} from "prop-types";
import {login} from "../../actions/auth";
import {Redirect} from "react-router";

const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirmation: ''
}
const validationSchema = Yup.object({
    email: Yup
        .string('Enter an email address')
        .email('Enter a valid email')
        .required('Email is required'),
    firstName: Yup
        .string('Enter a first name')
        .required('First name is required'),
    lastName: Yup
        .string('Enter a last name')
        .required('Last name is required'),
    password: Yup
        .string('Enter a password')
        .required('Password is required'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required')
})

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#489fb5',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#489fb5',
        '&:hover': {
            backgroundColor: '#16697a',
        },
    },
}));

const Register = (props) => {
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
                         props.register(values.email, values.firstName, values.lastName, values.password);
                     }}>
                     <Form className={classes.form}>
                         <Grid container spacing={2} alignItems={"center"}>
                             <Grid item xs={12} align="center">
                                 <Avatar className={classes.avatar}>
                                 </Avatar>
                                 <Typography component='h1' variant='h4'>
                                     User Registration
                                 </Typography>
                                 <Typography variant='caption'>
                                     Please fill this form to create an account
                                 </Typography>
                             </Grid>
                             <Grid item xs={6} align="center">
                                 <TextFieldWrapper
                                     name='firstName'
                                     label='First name'
                                     autoComplete='given-name'
                                 />
                             </Grid>
                             <Grid item xs={6} align="center">
                                 <TextFieldWrapper
                                     name='lastName'
                                     label='Last name'
                                     autoComplete='family-name'
                                 />
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
                             <Grid item xs={12} align="center">
                                 <TextFieldWrapper
                                     name='passwordConfirmation'
                                     label='Password confirmation'
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
                                     Register
                                 </Button>
                             </Grid>
                         </Grid>
                         <Grid container justify="flex-end">
                             <Grid item>
                                 <RouterLink component={Link} to="/login">
                                     Already have an account? Sign in
                                 </RouterLink>
                             </Grid>
                         </Grid>
                     </Form>
                 </Formik>
             </Container>
         );
     }

}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register})(Register);
