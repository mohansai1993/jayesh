import axios from "axios";
import { REQUEST_HEADERS } from "../commonRequestHeader";
import { AppDispatch } from "../store";
import {
    LOAD_SUBSCRIPTION_DATA_SUCCESS, LOAD_SUBSCRIPTION_DATA_FAIL,
    LOAD_CONNECTED_SOURCES_SUCCESS, LOAD_CONNECTED_SOURCES_FAIL
} from "./types";

export const getSubscriptionData = () => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.get(
            `/api/accounts/getSubscriptionInfo`,
            REQUEST_HEADERS
        );
        if (res.status === 200) {
            dispatch({
                type: LOAD_SUBSCRIPTION_DATA_SUCCESS,
                payload: res?.data
            });
            return { success: true };
        }
        dispatch({
            type: LOAD_SUBSCRIPTION_DATA_FAIL,
        });
        return { success: false };
    } catch (err) {
        dispatch({
            type: LOAD_SUBSCRIPTION_DATA_FAIL,
        });
        return { error: true };
    }
}

export const getConnectedDataSources = () => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.get(
            `/api/accounts/subscriptionCheck`,
            REQUEST_HEADERS
        );
        if (res.status === 200) {
            dispatch({
                type: LOAD_CONNECTED_SOURCES_SUCCESS,
                payload: res?.data
            });
            return { success: true };
        }
        dispatch({
            type: LOAD_CONNECTED_SOURCES_FAIL,
        });
        return { success: false };
    } catch (err) {
        dispatch({
            type: LOAD_CONNECTED_SOURCES_FAIL,
        });
        return { error: true };
    }
}