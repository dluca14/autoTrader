import React, {useEffect, useState} from "react";
import MapGL, {Source, Layer} from 'react-map-gl';
import {heatmapLayer} from "./MapStyle";
import Loading from "../common/Loading";
import {connect} from "react-redux";
import {loadHeatmap} from "../../actions/trading";

function WrappedMap(props) {
    const [viewport, setViewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        width: '1200px',
        height: '50vh',
        zoom: 1
    })

    const {heatmapIsLoaded, heatmapData} = props.trading;

    useEffect(() => {
        if (!heatmapIsLoaded) {
            props.loadHeatmap();
        }
    }, []);

    return (
        <MapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={setViewport}
            maxZoom={9}
        >
            {heatmapIsLoaded ? (
                <Source type="geojson" data={heatmapData}>
                    <Layer {...heatmapLayer} />
                </Source>
            ) : (<Loading/>)}
        </MapGL>
    )
}

const mapStateToProps = state => ({
    trading: state.trading
})

export default connect(mapStateToProps, {loadHeatmap})(WrappedMap);