//TODO data vs Sentiment
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import {Typography} from "@material-ui/core";
import {sectionStyle} from "../common/styles/Sections";

const Sentiment = () => {
    const classes = sectionStyle();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography>Data vs. Sentiment</Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Sentiment;