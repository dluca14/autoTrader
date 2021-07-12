import axios from "axios";
import {returnErrors} from './messages';

import {
    CHART_LOADING,
    CHART_LOADED,
    COIN_SELECTED,
    PERIOD_SELECTED,
    HEATMAP_LOADED,
    HEATMAP_LOADING
} from "./types";

const inferenceUrl = '/api/inference/'
const twitterUrl = '/api/twitter/'

export const loadChart = (coin, period) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    dispatch({type: CHART_LOADING});

    axios
        .get(inferenceUrl + `chart_data/${coin}/${period}`, config)
        .then(res => {
            dispatch({
                type: CHART_LOADED,
                payload: res.data
            });
        }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
    });
}

export const selectCoin = (coin) => (dispatch, getState) => {
    dispatch({type: COIN_SELECTED, payload: coin})
    dispatch(loadChart(coin, getState().trading.selectedPeriod))
}

export const selectPeriod = (period) => (dispatch, getState) => {
    dispatch({type: PERIOD_SELECTED, payload: period})
    dispatch(loadChart(getState().trading.selectedCoin, period))
}

export const loadHeatmap = () => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    dispatch({type: HEATMAP_LOADING});

        axios
        .get(twitterUrl + `tweets/heat_map`, config)
        .then(res => {
            dispatch({
                type: HEATMAP_LOADED,
                payload: res.data
            });
        }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
    });
}