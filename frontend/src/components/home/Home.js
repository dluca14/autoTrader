import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React, {useEffect} from "react";
import {sectionStyle} from "../common/styles/Sections";
import CandlestickChart from "./CandlestickChart";
import {connect} from "react-redux";
import {loadChart} from "../../actions/trading";
import Loading from "../common/Loading";

const Home = (props) => {
    const classes = sectionStyle();
    const {selectedCoin, selectedPeriod, chartIsLoaded} = props.trading;

    useEffect(() => {
        if (!chartIsLoaded) {
            props.loadChart(selectedCoin, selectedPeriod)
        }
    }, [])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper} style={{minHeight:"630px"}}>
                    {chartIsLoaded ? <CandlestickChart/> : <Loading/>}
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    trading: state.trading
})

export default connect(mapStateToProps, {loadChart})(Home);