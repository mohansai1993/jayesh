import { combineReducers } from "redux";
import authReducer from "./auth";
import modalReducer from "./modal";

import { googleAdsHierarchyReducer, fbAdsActsListReducer,
         fbInsightsPagesListReducer, ga4PropertiesListReducer, 
         searchConsoleDomainsListReducer, bingAdsActsListReducer, 
         igInsightsProfileListReducer } from "./connectionAccounts";
import workspacesReducer from "./workspace";
import subscriptionInfoReducer from "./subscriptionInfo";

export const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  googleAdsAccountHierarchy: googleAdsHierarchyReducer,
  fbAdsAccountsList: fbAdsActsListReducer,
  fbInsightsPagesList: fbInsightsPagesListReducer,
  ga4PropertiesList: ga4PropertiesListReducer,
  searchConsoleDomainsList: searchConsoleDomainsListReducer,
  bingAdsAccountsList: bingAdsActsListReducer,
  igInsightsProfilesList: igInsightsProfileListReducer,
  workspaces: workspacesReducer,
  subscriptionInfo: subscriptionInfoReducer,
});
