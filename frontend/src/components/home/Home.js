import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SimpleChart from "../common/trading/SimpleChart";
import React from "react";
import {Typography} from "@material-ui/core";
import {sectionStyle} from "../common/styles/Sections";

//TODO parametrize this chart depending on state selection

const Home = () => {
    const classes = sectionStyle();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography>Home</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <SimpleChart/>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Home;