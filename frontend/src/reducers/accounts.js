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
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    PASSWORD_RESET_TOKEN_CHECK_IN_PROGRESS,
    PASSWORD_RESET_TOKEN_CHECKED

} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    isPasswordReset: null,
    isPasswordResetRequestSent: null,
    passwordResetToken: null,
    user: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case PASSWORD_RESET_SUCCESS:
            localStorage.removeItem('token');
            return {
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                isPasswordReset: true,
                isPasswordResetRequestSent: false
            }
        case FORGOT_PASSWORD_SUCCESS:
            localStorage.removeItem('token');
            return {
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                isPasswordReset: false,
                isPasswordResetRequestSent: true
            }
        case PASSWORD_RESET_TOKEN_CHECKED:
            localStorage.removeItem('token');
            return {
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                isPasswordReset: false,
                isPasswordResetRequestSent: false,
                passwordResetToken: action.payload,
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
        case FORGOT_PASSWORD_FAIL:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_TOKEN_CHECK_IN_PROGRESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                isPasswordReset: false,
                isPasswordResetRequestSent: false,
                passwordResetToken: null
            }
        default:
            return state;
    }
}