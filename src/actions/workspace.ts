import { WORKSPACE_LOAD_DATA_SUCCESS, WORKSPACE_LOAD_DATA_FAIL } from "./types";
import axios from "axios";
import { REQUEST_HEADERS } from "../commonRequestHeader";
import { AppDispatch } from "../store";

export const getWorkspaces = () => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get(`/api/workspace/get`, REQUEST_HEADERS);
    if (res.status === 200) {
      dispatch({
        type: WORKSPACE_LOAD_DATA_SUCCESS,
        payload: res?.data,
      });
      return { success: true };
    } else {
      dispatch({
        type: WORKSPACE_LOAD_DATA_FAIL,
      });
      return { success: false };
    }
  } catch (err: any) {
    dispatch({
      type: WORKSPACE_LOAD_DATA_FAIL,
    });
    return { error: true };
  }
};
