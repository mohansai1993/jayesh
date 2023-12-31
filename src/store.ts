import { configureStore } from "@reduxjs/toolkit";
import { useMemo } from "react";
import thunkMiddleware from "redux-thunk";
import { rootReducer } from "./reducers";

let store: any;

function initStore(initialState: any) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: [thunkMiddleware],
  });
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG(static site generation) and SSR(server site rendering) always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export default function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return { store };
}

export type AppDispatch = typeof store.dispatch;