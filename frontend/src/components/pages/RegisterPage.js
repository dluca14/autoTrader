import React, {useState} from "react";
import {Link} from "react-router-dom"

import {Grid, Paper, Typography, Button, TextField, FormHelperText, FormControl, Avatar}
    from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {FormControlLabel} from "@material-ui/core";
import Styles from "../Styles";

// We are using bcrypt to turn the password into a hash
const bcrypt = require('bcryptjs')

// What endpoint should be used for registering a new user?
const registerEndpoint = "/api/accounts/register";

function RegisterPage(props) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    // API call here to handle user registration
    const handleButtonClick = (evt) => {
        evt.preventDefault()
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync())
        const doesPasswordMatch = bcrypt.compareSync(passwordConfirmation, hashedPassword)

        if (email && username && password) {
            if (!doesPasswordMatch) {
                alert('Passwords Must Match!')
            } else {
                const user = {
                    email: email,
                    username: username,
                    password: hashedPassword,
                }

                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(user)
                }
                fetch(registerEndpoint, requestOptions).then((response) => alert("Successfully register user!"));
            }
        }
    }

    return (
        <Grid container spacing={1}>
            <Paper elevation={5} style={Styles.paperStyle}>
                <Grid item xs={12} align="center">
                    <Avatar style={Styles.avatarStyle}>
                        <AddCircleOutlineIcon></AddCircleOutlineIcon>
                    </Avatar>
                    <Typography component='h4' variant='h4'>
                        User Registration
                    </Typography>
                    <Typography variant='caption'>
                        Please fill this form to create an account
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl style={Styles.margin}>
                        <TextField fullWidth label='Email' required={true} type="email"
                                   onChange={e => setEmail(e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl style={Styles.margin}>
                        <TextField fullWidth label='Username' required={true} type="text"
                                   onChange={e => setUsername(e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl style={Styles.margin}>
                        <TextField fullWidth label='Password' required={true} type="password"
                                   onChange={e => setPassword(e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl style={Styles.margin}>
                        <TextField fullWidth label='Confirm password' required={true} type="password"
                                   onChange={e => setPasswordConfirmation(e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button style={Styles.buttonStyle} variant="contained" onClick={handleButtonClick}>
                        Register User
                    </Button>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default RegisterPage;