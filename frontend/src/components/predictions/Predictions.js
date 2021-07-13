//TODO display predictions using data from ML backend
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React, {useEffect} from "react";
import {Typography} from "@material-ui/core";
import {sectionStyle} from "../common/styles/Sections";
import Loading from "../common/Loading";
import PredictionChart from "./PredictionChart";
import {connect} from "react-redux";
import {loadPredictionChart} from "../../actions/trading";
import SimulationChart from "./SimulationChart";

const Predictions = (props) => {
    const classes = sectionStyle();

    const {selectedCoin, selectedPeriod, predictionChartIsLoaded} = props.trading;


    useEffect(() => {
        if (!predictionChartIsLoaded) {
            props.loadPredictionChart(selectedCoin, selectedPeriod);
        }
    }, [])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h5">{selectedCoin}/USD {selectedPeriod} Predictions</Typography>
                    <Typography> <span style={{color: "#33D778"}}>Real</span> vs. <span
                        style={{color: "#2196f3"}}>Predicted</span></Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper} style={{minHeight: "630px"}}>
                    {predictionChartIsLoaded ? <PredictionChart/> : <Loading/>}
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h5">{selectedCoin}/USD {selectedPeriod} 1000$ Trading Simulation</Typography>
                    <Typography> <span style={{color: "#FFE74C"}}>Hold</span> vs. <span
                        style={{color: "#FF5964"}}>AutoTrader AI</span></Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper} style={{minHeight: "630px"}}>
                    {predictionChartIsLoaded ? <SimulationChart/> : <Loading/>}
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    trading: state.trading
})

export default connect(mapStateToProps, {loadPredictionChart})(Predictions);