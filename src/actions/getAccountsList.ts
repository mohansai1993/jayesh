import axios from "axios";
import { REQUEST_HEADERS } from "../commonRequestHeader";
import { AppDispatch } from "../store";
import {
  BING_ADS_LOAD_ACT_LIST_SUCCESS,
  BING_ADS_LOAD_ACT_LIST_FAIL,
  FB_ADS_LOAD_ACT_LIST_SUCCESS,
  FB_ADS_LOAD_ACT_LIST_FAIL,
  SEARCH_CONSOLE_LOAD_ACT_LIST_SUCCESS,
  SEARCH_CONSOLE_LOAD_ACT_LIST_FAIL,
  GOOGLE_ADS_LOAD_HIERARCHY_FAIL,
  GOOGLE_ADS_LOAD_HIERARCHY_SUCCESS,
  GA4_LOAD_ACT_LIST_FAIL,
  GA4_LOAD_ACT_LIST_SUCCESS,
  FB_INSIGHTS_LOAD_PAGES_LIST_FAIL,
  FB_INSIGHTS_LOAD_PAGES_LIST_SUCCESS,
  IG_INSIGHTS_LOAD_PROFILES_LIST_FAIL,
  IG_INSIGHTS_LOAD_PROFILES_LIST_SUCCESS,
} from "./types";

export const getBingAdsAccountsList =
  (token_key: string) => async (dispatch: AppDispatch) => {
    try {
      const res = await axios.get(
        `/api/bingAds/accountsList?token_key=${token_key}`,
        REQUEST_HEADERS,
      );
      if (res.status === 200) {
        dispatch({
          type: BING_ADS_LOAD_ACT_LIST_SUCCESS,
          payload: res?.data,
        });
        return { success: true };
      }
      dispatch({
        type: BING_ADS_LOAD_ACT_LIST_FAIL,
      });
      return { success: false };
    } catch (err: any) {
      dispatch({
        type: BING_ADS_LOAD_ACT_LIST_FAIL,
      });
      return { error: true };
    }
  };

export const getFbAdsAccountsList =
  (token_key: string) => async (dispatch: AppDispatch) => {
    try {
      const res = await axios.get(
        `/api/fbAds/accountsList?token_key=${token_key}`,
        REQUEST_HEADERS,
      );
      if (res.status === 200) {
        dispatch({
          type: FB_ADS_LOAD_ACT_LIST_SUCCESS,
          payload: res?.data,
        });
        return { success: true };
      }
      dispatch({
        type: FB_ADS_LOAD_ACT_LIST_FAIL,
      });
      return { success: false };
    } catch (err: any) {
      dispatch({
        type: FB_ADS_LOAD_ACT_LIST_FAIL,
      });
      return { error: true };
    }
  };

export const getFbInsightsPagesList =
  (user_token: string) => async (dispatch: AppDispatch) => {
    try {
      const res = await axios.get(
        `/api/fbInsights/pagesList?user_token=${user_token}`,
        REQUEST_HEADERS,
      );
      if (res.status === 200) {
        dispatch({
          type: FB_INSIGHTS_LOAD_PAGES_LIST_SUCCESS,
          payload: res?.data,
        });
        return { success: true };
      }
      dispatch({
        type: FB_INSIGHTS_LOAD_PAGES_LIST_FAIL,
      });
      return { success: false };
    } catch (err: any) {
      dispatch({
        type: FB_INSIGHTS_LOAD_PAGES_LIST_FAIL,
      });
      return { error: true };
    }
  };

export const getGa4PropertiesList =
  (access_token: string) => async (dispatch: AppDispatch) => {
    try {
      const res = await axios.get(
        `/api/ga4/propertiesList?access_token=${access_token}`,
        REQUEST_HEADERS,
      );
      if (res.status === 200) {
        dispatch({
          type: GA4_LOAD_ACT_LIST_SUCCESS,
          payload: res?.data,
        });
        return { success: true };
      }
      dispatch({
        type: GA4_LOAD_ACT_LIST_FAIL,
      });
      return { success: false };
    } catch (err: any) {
      dispatch({
        type: GA4_LOAD_ACT_LIST_FAIL,
      });
      return { error: true };
    }
  };

export const getGoogleAdsAccountHierarchy =
  (token_key: string) => async (dispatch: AppDispatch) => {
    try {
      const res = await axios.get(
        `/api/googleAds/accountHierarchy?token_key=${token_key}`,
        REQUEST_HEADERS,
      );
      if (res.status === 200) {
        dispatch({
          type: GOOGLE_ADS_LOAD_HIERARCHY_SUCCESS,
          payload: res?.data,
        });
        return { success: true };
      }
      dispatch({
        type: GOOGLE_ADS_LOAD_HIERARCHY_FAIL,
      });
      return { success: false };
    } catch (err: any) {
      dispatch({
        type: GOOGLE_ADS_LOAD_HIERARCHY_FAIL,
      });
      return { error: true };
    }
  };

export const getSearchConsoleDomainsList =
  (access_token: string) => async (dispatch: AppDispatch) => {
    try {
      const res = await axios.get(
        `/api/searchConsole/domainsList?access_token=${access_token}`,
        REQUEST_HEADERS,
      );
      if (res.status === 200) {
        dispatch({
          type: SEARCH_CONSOLE_LOAD_ACT_LIST_SUCCESS,
          payload: res?.data,
        });
        return { success: true };
      }
      dispatch({
        type: SEARCH_CONSOLE_LOAD_ACT_LIST_FAIL,
      });
      return { success: false };
    } catch (err: any) {
      dispatch({
        type: SEARCH_CONSOLE_LOAD_ACT_LIST_FAIL,
      });
      return { error: true };
    }
  };

export const getIgProfilesList =
  (token_key: string) => async (dispatch: AppDispatch) => {
    try {
      const res = await axios.get(
        `/api/igInsights/profilesList?token_key=${token_key}`,
        REQUEST_HEADERS,
      );
      if (res.status === 200) {
        dispatch({
          type: IG_INSIGHTS_LOAD_PROFILES_LIST_SUCCESS,
          payload: res?.data,
        });
        return { success: true };
      }
      dispatch({
        type: IG_INSIGHTS_LOAD_PROFILES_LIST_FAIL,
      });
      return { success: false };
    } catch (err: any) {
      dispatch({
        type: IG_INSIGHTS_LOAD_PROFILES_LIST_FAIL,
      });
      return { error: true };
    }
  };
