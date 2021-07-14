import {createChart, LineStyle, LineType, PriceScaleMode} from "lightweight-charts";
import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {loadPredictionChart} from "../../actions/trading";
import {ChartDarkTheme} from "../common/styles/ChartDarkTheme";

function SimulationChart(props) {
    const ref = React.useRef();

    const chartProperties = {
        width: 1200,
        height: 600,
        position: 'right',
        mode: PriceScaleMode.Logarithmic,
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

        const aiSeries = chart.addAreaSeries(ChartDarkTheme.series);
        const holdSeries = chart.addLineSeries({
            color: ChartDarkTheme.yellowSeries.lineColor,
            lineWidth: 1,
            lineStyle: LineStyle.Dashed
        });

        // This works, but it complaints it doesn't
        chart.applyOptions(ChartDarkTheme.chart);


        if (predictionChartData) {
            aiSeries.setData(predictionChartData['ai_value'].map(
                point => {
                    return {
                        time: point.time,
                        value: parseFloat(point.value)
                    }
                }
            ));

            aiSeries.setMarkers(predictionChartData['ai_value'].filter(
                point => {
                    if (point.action !== 'hold' && point.action !== '') {
                        return true;
                    }
                }
            ).map(point => {
                    let buy = point.action === 'buy';
                    return {
                        time: point.time,
                        position: buy ? 'belowBar' : 'aboveBar',
                        color: 'white',
                        shape: buy ? 'arrowUp' : 'arrowDown',
                        text: point.action.toUpperCase()
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