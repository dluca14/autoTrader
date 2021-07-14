//TODO display predictions using data from ML backend
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React, {useEffect, useState} from "react";
import {Typography} from "@material-ui/core";
import {sectionStyle} from "../common/styles/Sections";
import Loading from "../common/Loading";
import PredictionChart from "./PredictionChart";
import {connect} from "react-redux";
import {loadPredictionChart} from "../../actions/trading";
import SimulationChart from "./SimulationChart";
import {ChartDarkTheme} from "../common/styles/ChartDarkTheme";
import * as accounting from "accounting-js";


const Predictions = (props) => {
    const classes = sectionStyle();

    const {selectedCoin, selectedPeriod, predictionChartIsLoaded, predictionChartData} = props.trading;
    const [aiProfit, setAiProfit] = useState(0);
    const [holdProfit, setHoldProfit] = useState(0);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();


    function toDollars(number) {
        return accounting.formatMoney(number, "$", 2, ".", ",");
    }

    useEffect(() => {
        if (predictionChartData) {
            setAiProfit(parseFloat(predictionChartData['ai_value'][predictionChartData['ai_value'].length - 1].value) - 1000.0);
            setHoldProfit(parseFloat(predictionChartData['hold_value'][predictionChartData['hold_value'].length - 1].value) - 1000.0);
            setStartDate(predictionChartData['ai_value'][1].time);
            setEndDate(predictionChartData['ai_value'][predictionChartData['ai_value'].length - 1].time);
        }
        if (!predictionChartIsLoaded) {
            props.loadPredictionChart(selectedCoin, selectedPeriod);
        }

    }, [predictionChartData])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h5">{selectedCoin}/USD {selectedPeriod} Predictions</Typography>
                    <Typography> <span style={{color: ChartDarkTheme.yellowSeries.lineColor}}>Real</span> vs. <span
                        style={{color: ChartDarkTheme.blueSeries.lineColor}}>Predicted</span></Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper} style={{minHeight: "630px"}}>
                    {predictionChartIsLoaded ? <PredictionChart/> : <Loading/>}
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h5">{selectedCoin}/USD {selectedPeriod}</Typography>
                    <Typography variant="h6"> 1000$ Trading Simulation - from {startDate} to {endDate}</Typography>
                    <Typography>
                        <span
                            style={{color: ChartDarkTheme.yellowSeries.lineColor}}>Hold({toDollars(holdProfit)}$)</span> vs. <span
                        style={{color: ChartDarkTheme.series.lineColor}}>AutoTrader AI ({toDollars(aiProfit)})</span> -
                        Difference: {toDollars(aiProfit - holdProfit)}
                    </Typography>
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