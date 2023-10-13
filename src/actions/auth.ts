import axios from "axios";
import { REQUEST_HEADERS } from "../commonRequestHeader";
import { AppDispatch } from "../store";
import {
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
  REMOVE_AUTH_LOADING,
  SET_AUTH_LOADING,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  USER_LOADED_FAIL,
  USER_LOADED_SUCCESS,
} from "./types";

export const loadUser = () => async (dispatch: AppDispatch) => {
  dispatch({ type: SET_AUTH_LOADING });
  try {
    const res = await axios.get("/api/accounts/loadUser", REQUEST_HEADERS);
    if (res.status === 200) {
      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res?.data,
      });
    } else {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } catch (err: any) {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    const body = JSON.stringify({ email, password });
    dispatch({ type: SET_AUTH_LOADING });
    try {
      const res = await axios.post(
        "/api/accounts/login",
        body,
        REQUEST_HEADERS,
      );
      if (res.status === 200) {
        dispatch({
          type: LOGIN_SUCCESS,
        });
        dispatch(loadUser());
        return { success: true, authCode: res.data["authCode"] };
      }
    } catch (err: any) {
      console.log(err);
      dispatch({
        type: LOGIN_FAIL,
      });
      return { error: true };
    }
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  };

export const signup =
  (name: string, email: string, password: string, re_password: string) =>
  async (dispatch: AppDispatch) => {
    const body = JSON.stringify({ name, email, password, re_password });

    dispatch({
      type: SET_AUTH_LOADING,
    });
    try {
      const res = await axios.post(
        "/api/accounts/signup",
        body,
        REQUEST_HEADERS,
      );

      if (res.status === 201) {
        dispatch({
          type: SIGNUP_SUCCESS,
        });
        dispatch({
          type: REMOVE_AUTH_LOADING,
        });
        return { success: true };
      }
      dispatch({
        type: SIGNUP_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      return { success: false };
    } catch (err: any) {
      dispatch({
        type: SIGNUP_FAIL,
      });

      dispatch({
        type: REMOVE_AUTH_LOADING,
      });

      return err?.response?.data?.error;
    }
  };

export const activate =
  (uid: string | string[], token: string | string[]) =>
  async (dispatch: AppDispatch) => {
    const body = JSON.stringify({ uid, token });
    dispatch({
      type: SET_AUTH_LOADING,
    });
    try {
      const res = await axios.post(
        "/api/accounts/activate",
        body,
        REQUEST_HEADERS,
      );
      if (res.status === 200) {
        dispatch({
          type: ACTIVATION_SUCCESS,
        });
      } else {
        dispatch({
          type: ACTIVATION_FAIL,
        });
      }
    } catch (err: any) {
      dispatch({
        type: ACTIVATION_FAIL,
      });
    }
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  };

export const resetPassword =
  (email: string) => async (dispatch: AppDispatch) => {
    const body = JSON.stringify({ email });
    dispatch({
      type: SET_AUTH_LOADING,
    });
    try {
      const res = await axios.post(
        "/api/accounts/resetPassword",
        body,
        REQUEST_HEADERS,
      );
      if (res?.status === 204) {
        dispatch({
          type: PASSWORD_RESET_SUCCESS,
        });
        return { success: true };
      }
    } catch (err: any) {
      dispatch({
        type: PASSWORD_RESET_FAIL,
      });
      return {
        success: false,
        error: err?.response?.data?.error,
      };
    }

    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  };

export const resetPasswordConfirm =
  (
    uid: string | string[],
    token: string | string[],
    new_password: string,
    re_new_password: string,
  ) =>
  async (dispatch: AppDispatch) => {
    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    dispatch({
      type: SET_AUTH_LOADING,
    });

    try {
      const res = await axios.post(
        "/api/accounts/resetPasswordConfirm",
        body,
        REQUEST_HEADERS,
      );
      if (res?.status === 204) {
        dispatch({
          type: PASSWORD_RESET_CONFIRM_SUCCESS,
        });
        dispatch({
          type: REMOVE_AUTH_LOADING,
        });
        return { success: true };
      }
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      return { success: false };
    } catch (err: any) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      return err?.response?.data?.error;
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  await axios.post("/api/accounts/logout", REQUEST_HEADERS);
  dispatch({
    type: LOGOUT,
  });
};
