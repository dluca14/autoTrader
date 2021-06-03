import React, {Component, useState} from "react";
import {Avatar, Button, FormControl, FormHelperText, Grid, Paper, TextField, Typography} from "@material-ui/core";

import Styles from "../Styles";

// We are using bcrypt to turn the password into a hash
const bcrypt = require('bcryptjs')

// What endpoint should be used for logging in?
const loginEndpoint = "/api/accounts/login";

function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailHelperText = "Please input an email!";
    const passwordHelperText = "Please input a password!";

    FormHelperText.disabled = true;

    // API call here to handle user registration
    const handleButtonClick = (evt) => {
        evt.preventDefault()
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync())

        if (email && password) {
            if (!doesPasswordMatch) {
                alert('Passwords Must Match!')
            } else {
                const user = {
                    email: email,
                    password: hashedPassword,
                }

                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(user)
                }
                fetch(loginEndpoint, requestOptions).then((response) => alert("Successfully register user!"));
            }
        } else {
            FormHelperText.disabled = false;
            FormHelperText.error = true;
        }
    }

    return (
        <Grid container spacing={1}>
            <Paper elevation={5} style={Styles.paperStyle}>
                <Grid item xs={12} align="center">
                    <Avatar style={Styles.avatarStyle}>
                    </Avatar>
                    <Typography component='h4' variant='h4'>
                        User Login
                    </Typography>
                    <Typography variant='caption'>
                        Please fill this form to login
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl style={Styles.margin}>
                        <TextField fullWidth label='Email' required={true} type="email"
                                   onChange={e => setEmail(e.target.value)}/>
                        <FormHelperText>
                            {emailHelperText}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl style={Styles.margin}>
                        <TextField fullWidth label='Password' required={true} type="password"
                                   onChange={e => setPassword(e.target.value)}/>
                        <FormHelperText style={Styles.errorHelperField}>
                            {passwordHelperText}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button style={Styles.buttonStyle} variant="contained" onClick={handleButtonClick}>
                        Login
                    </Button>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default LoginPage;