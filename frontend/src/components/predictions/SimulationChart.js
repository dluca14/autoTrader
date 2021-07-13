import {createChart, LineStyle, LineType, PriceScaleMode} from "lightweight-charts";
import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {loadPredictionChart} from "../../actions/trading";

function SimulationChart(props) {
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
        const aiSeries = chart.addLineSeries({
            color: "#FF5964",
            overlay: true,
            lineWidth: 3
        });
        const holdSeries = chart.addLineSeries({
            color: "#FFE74C",
            lineWidth: 3
        });

        if (predictionChartData) {
            aiSeries.setData(predictionChartData['ai_value'].map(
                point => {
                    return {
                        time: point.time,
                        value: point.value
                    }
                }
            ));

            holdSeries.setData(predictionChartData['hold_value'].map(
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

export default connect(mapStateToProps, {loadPredictionChart})(SimulationChart);