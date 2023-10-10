import { useSelector } from "react-redux";
import {
    BING_ADS_LOAD_ACT_LIST_SUCCESS, BING_ADS_LOAD_ACT_LIST_FAIL,
    GA4_LOAD_ACT_LIST_SUCCESS, GA4_LOAD_ACT_LIST_FAIL,
    GOOGLE_ADS_LOAD_HIERARCHY_SUCCESS, GOOGLE_ADS_LOAD_HIERARCHY_FAIL,
    SEARCH_CONSOLE_LOAD_ACT_LIST_SUCCESS, SEARCH_CONSOLE_LOAD_ACT_LIST_FAIL,
    FB_ADS_LOAD_ACT_LIST_SUCCESS, FB_ADS_LOAD_ACT_LIST_FAIL,
    FB_INSIGHTS_LOAD_PAGES_LIST_SUCCESS, FB_INSIGHTS_LOAD_PAGES_LIST_FAIL,
    IG_INSIGHTS_LOAD_PROFILES_LIST_SUCCESS, IG_INSIGHTS_LOAD_PROFILES_LIST_FAIL
} from "../actions/types";

// Define a generic reducer factory
const createListReducer = (successType, failType, listName) => {
    const initialState = {
        [listName]: null,
    };

    return (state = initialState, action) => {
        const { type, payload } = action;
        switch (type) {
            case successType:
                return {
                    ...state,
                    [listName]: payload
                }
            case failType:
                return {
                    ...state,
                    [listName]: null
                }
            default:
                return { ...state };
        }
    };
};

// Define a generic selector factory
const createListSelector = (listName) => {
    return () => {
        return useSelector(state => state[listName]);
    };
};

// Create specific reducers and selectors
export const bingAdsActsListReducer = createListReducer(
    BING_ADS_LOAD_ACT_LIST_SUCCESS, BING_ADS_LOAD_ACT_LIST_FAIL, 'bingAdsAccountsList'
);
export const useBingAdsAccountsListReducer = createListSelector('bingAdsAccountsList');

export const fbAdsActsListReducer = createListReducer(
    FB_ADS_LOAD_ACT_LIST_SUCCESS, FB_ADS_LOAD_ACT_LIST_FAIL, 'fbAdsAccountsList'
);
export const useFbAdsAccountsListReducer = createListSelector('fbAdsAccountsList');

export const fbInsightsPagesListReducer = createListReducer(
    FB_INSIGHTS_LOAD_PAGES_LIST_SUCCESS, FB_INSIGHTS_LOAD_PAGES_LIST_FAIL, 'fbInsightsPagesList'
);
export const useFbInsightsPagesListReducer = createListSelector('fbInsightsPagesList');

export const ga4PropertiesListReducer = createListReducer(
    GA4_LOAD_ACT_LIST_SUCCESS, GA4_LOAD_ACT_LIST_FAIL, 'ga4PropertiesList'
);
export const useGa4PropertiesListReducer = createListSelector('ga4PropertiesList');

export const googleAdsHierarchyReducer = createListReducer(
    GOOGLE_ADS_LOAD_HIERARCHY_SUCCESS, GOOGLE_ADS_LOAD_HIERARCHY_FAIL, 'googleAdsAccountHierarchy'
);
export const useGoogleAdsHierarchyReducer = createListSelector('googleAdsAccountHierarchy');

export const igInsightsProfileListReducer = createListReducer(
    IG_INSIGHTS_LOAD_PROFILES_LIST_SUCCESS, IG_INSIGHTS_LOAD_PROFILES_LIST_FAIL, 'igInsightsProfilesList'
);
export const useIgInsightsProfileListReducer = createListSelector('igInsightsProfilesList');

export const searchConsoleDomainsListReducer = createListReducer(
    SEARCH_CONSOLE_LOAD_ACT_LIST_SUCCESS, SEARCH_CONSOLE_LOAD_ACT_LIST_FAIL, 'searchConsoleDomainsList'
);
export const useSearchConsoleDomainsListReducer = createListSelector('searchConsoleDomainsList');