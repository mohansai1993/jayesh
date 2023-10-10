import { useSelector } from "react-redux";
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    LOGOUT,
} from "../actions/types";

const initialState = {
    authenticated: null,
    user: null,
    authLoading: true
};

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case AUTHENTICATED_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                authenticated: true,
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case SIGNUP_SUCCESS:
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                authenticated: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null,
            }
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:
            return {
                ...state,
                authenticated: false,
                user: null
            }
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
        default:
            return { ...state };
    }
}

export const useAuthReducer = () => {
    const auth = useSelector(state => state.auth);
    return auth
};