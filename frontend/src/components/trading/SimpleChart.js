import {createChart, PriceScaleMode} from "lightweight-charts";
import React, {useEffect} from 'react';


function SimpleChart(props) {
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

    const predictionSeriesOptions = {
        color: '#FF0000'
    }

    useEffect(() => {
        const chart = createChart(ref.current, chartProperties);
        const lineSeries = chart.addLineSeries();
        lineSeries.setData([
            {time: '2019-04-11', value: 80.01},
            {time: '2019-04-12', value: 96.63},
            {time: '2019-04-13', value: 76.64},
            {time: '2019-04-14', value: 81.89},
            {time: '2019-04-15', value: 74.43},
            {time: '2019-04-16', value: 80.01},
            {time: '2019-04-17', value: 96.63},
            {time: '2019-04-18', value: 76.64},
            {time: '2019-04-19', value: 81.89},
            {time: '2019-04-20', value: 74.43},
        ]);

        const predictionSeries = chart.addLineSeries(predictionSeriesOptions);
        predictionSeries.setData([
            {time: '2019-04-20', value: 74.43},
            {time: '2019-04-21', value: 90.43},
            {time: '2019-04-22', value: 94.43},
        ]);
    }, [])

    return (
        <div ref={ref}></div>
    );
}

export default SimpleChart;