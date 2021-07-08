//TODO populate user data & settings page
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import {Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {sectionStyle} from "../common/styles/Sections";

const Profile = (props) => {
    const classes = sectionStyle();

    const {user} = props.auth

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography>{user ? `${user.first_name} ${user.last_name}` : "Profile Page"}</Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Profile);