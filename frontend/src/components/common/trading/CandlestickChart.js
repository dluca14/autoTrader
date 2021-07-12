import {createChart, PriceScaleMode} from "lightweight-charts";
import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {loadChart} from "../../../actions/trading";

function CandlestickChart(props) {
    const ref = React.useRef();

    const chartProperties = {
        width: 1100,
        height: 600,
        position: 'right',
        mode: PriceScaleMode.Normal,
        timeScale: {
            timeVisible: true,
            secondsVisible: false
        }
    }

    function toTimestamp(strDate) {
        let datum = Date.parse(strDate);
        return datum / 1000;
    }

    const {chartData} = props.trading;

    // TODO chart is not showing up with data when providing hour
    useEffect(() => {
        const chart = createChart(ref.current, chartProperties);
        const candlestickSeries = chart.addCandlestickSeries();

        if (chartData != null) {
            candlestickSeries.setData(chartData.map(stick => {
                return {
                    time: toTimestamp(stick.time),
                    open: parseFloat(stick.open),
                    high: parseFloat(stick.high),
                    low: parseFloat(stick.low),
                    close: parseFloat(stick.close)
                };
            }));
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

export default connect(mapStateToProps, {loadChart})(CandlestickChart);