import { useSelector } from "react-redux";
import {
    LOAD_SUBSCRIPTION_DATA_SUCCESS, LOAD_SUBSCRIPTION_DATA_FAIL,
    LOAD_CONNECTED_SOURCES_SUCCESS, LOAD_CONNECTED_SOURCES_FAIL, FB_INSIGHTS_LOAD_PAGES_LIST_FAIL
} from "../actions/types";

const initialState = {
    subscriptionInfo: null,
    // connectedSources contains two information, the number of connections allowed (from subscription) and the list of 
    // connections currently connected.
    connectedSources: null,
};

export default function subscriptionInfoReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOAD_SUBSCRIPTION_DATA_SUCCESS:
            return {
                ...state,
                subscriptionInfo: payload
            }
        case LOAD_SUBSCRIPTION_DATA_FAIL:
            return {
                ...state,
                subscriptionInfo: null
            }
        case LOAD_CONNECTED_SOURCES_SUCCESS:
            return {
                ...state,
                connectedSources: payload
            }
        case LOAD_CONNECTED_SOURCES_FAIL:
            return {
                ...state,
                connectedSources: null
            }
        default:
            return { ...state };
    }
}

export const useSubscriptionInfoReducer = () => {
    const subscriptionInfo = useSelector(state => state.subscriptionInfo);
    return subscriptionInfo
};