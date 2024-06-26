import {createChart, LineStyle, LineType, PriceScaleMode} from "lightweight-charts";
import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {loadChart, loadPredictionChart} from "../../actions/trading";
import {ChartDarkTheme} from "../common/styles/ChartDarkTheme";

function PredictionChart(props) {
    const ref = React.useRef();

    const chartProperties = {
        width: 1200,
        height: 600,
        position: 'right',
        mode: PriceScaleMode.Normal,
        timeScale: {
            timeVisible: true,
            secondsVisible: false
        },
        crosshair: {
            mode: 1
        }
    }

    const {predictionChartData} = props.trading

    useEffect(() => {
        const chart = createChart(ref.current, chartProperties);
        const realSeries = chart.addLineSeries({color: ChartDarkTheme.yellowSeries.topColor});
        const predictionSeries = chart.addAreaSeries(ChartDarkTheme.blueSeries);

        chart.applyOptions(ChartDarkTheme.chart);

        if (predictionChartData) {
            predictionSeries.setData(predictionChartData['prediction'].map(
                point => {
                    return {
                        time: point.time,
                        value: point.value
                    }
                }
            ));

            realSeries.setData(predictionChartData['real'].map(
                point => {
                    return {
                        time: point.time,
                        value: point.value
                    }
                }
            ));
        }
    }, [])

    return (
        <div ref={ref}/>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    trading: state.trading
})

export default connect(mapStateToProps, {loadPredictionChart})(PredictionChart);