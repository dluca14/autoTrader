//TODO should connect to state to see logged user & display portfolio
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import {Typography} from "@material-ui/core";
import {sectionStyle} from "../common/styles/Sections";

const Portfolio = () => {
    const classes = sectionStyle();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography>Portfolio</Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Portfolio;