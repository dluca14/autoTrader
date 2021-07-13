import {
    CHART_LOADING,
    CHART_LOADED,
    COIN_SELECTED,
    PERIOD_SELECTED, HEATMAP_LOADING, HEATMAP_LOADED, PREDICTION_CHART_LOADING, PREDICTION_CHART_LOADED
} from "../actions/types";


const initialState = {
    selectedCoin: "BTC",
    selectedPeriod: "DAY",
    chartIsLoaded: false,
    chartData: null,
    heatmapIsLoaded: false,
    heatmapData: null,
    predictionChartIsLoaded: false,
    predictionChartData: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CHART_LOADING:
            return {
                ...state,
                chartData: null,
                chartIsLoaded: false,
            }
        case CHART_LOADED:
            return {
                ...state,
                chartData: action.payload,
                chartIsLoaded: true
            }
        case COIN_SELECTED:
            return {
                ...state,
                selectedCoin: action.payload
            }
        case PERIOD_SELECTED:
            return {
                ...state,
                selectedPeriod: action.payload
            }
        case HEATMAP_LOADING:
            return {
                ...state,
                heatmapIsLoaded: false,
                heatmapData: null
            }
        case HEATMAP_LOADED:
            return {
                ...state,
                heatmapIsLoaded: true,
                heatmapData: action.payload
            }
        case PREDICTION_CHART_LOADING:
            return {
                ...state,
                predictionChartIsLoaded: false,
                predictionChartData: null
            }
        case PREDICTION_CHART_LOADED:
            return {
                ...state,
                predictionChartIsLoaded: true,
                predictionChartData: action.payload
            }
        default:
            return state;
    }
}