import axios from "axios";
import {returnErrors} from './messages';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    PASSWORD_RESET_TOKEN_CHECK_IN_PROGRESS,
    PASSWORD_RESET_TOKEN_CHECKED
} from "./types";

const accountsUrl = '/api/accounts/'

export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    axios
        .get(accountsUrl + 'user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        })
    });
}

export const register = (email, firstName, lastName, password) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const account = {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password
    }

    const body = JSON.stringify(account);

    axios
        .post(accountsUrl + 'register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: REGISTER_FAIL
        })
    });
}

// Login User
export const login = (email, password) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        email,
        password
    });

    axios
        .post(accountsUrl + 'login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: LOGIN_FAIL
        })
    });
}

export const forgotPassword = (email) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        email
    });

    axios
        .post(accountsUrl + 'password-reset', body, config)
        .then(res => {
            dispatch({
                type: FORGOT_PASSWORD_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: FORGOT_PASSWORD_FAIL
        })
    });
}

export const checkPasswordResetToken = (uidb64, token) => dispatch => {
    dispatch({type: PASSWORD_RESET_TOKEN_CHECK_IN_PROGRESS});

    axios
        .get(accountsUrl + 'password-reset/' + uidb64 + '/' + token)
        .then(res => {
            dispatch({
                type: PASSWORD_RESET_TOKEN_CHECKED,
                payload: res.data
            });
        }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
    });
}

export const passwordReset = (password, uidb64, token) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        password,
        uidb64,
        token
    });

    axios
        .patch(accountsUrl + 'password-reset/complete', body, config)
        .then(res => {
            dispatch({
                type: PASSWORD_RESET_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
    });
}

export const logout = () => (dispatch, getState) => {
    axios
        .post(accountsUrl + 'logout', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
    });
}

// Config setup with token
export const tokenConfig = (getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
}