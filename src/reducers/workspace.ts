import { useSelector } from "react-redux";
import {
  UPDATE_WORKSPACE_DATA,
  WORKSPACE_LOAD_DATA_FAIL,
  WORKSPACE_LOAD_DATA_SUCCESS,
} from "../actions/types";

const initialState = {
  workspaces: null,
};

export default function workspacesReducer(
  state = initialState,
  action: { type: any; payload: any }
) {
  const { type, payload } = action;
  switch (type) {
    case WORKSPACE_LOAD_DATA_SUCCESS:
      return {
        ...state,
        workspaces: payload,
      };
    case WORKSPACE_LOAD_DATA_FAIL:
      return {
        ...state,
        workspaces: null,
      };
    case UPDATE_WORKSPACE_DATA:
      const workspace = state.workspaces[payload.key];
      state.workspaces[payload.workspaceName] = workspace;
      state.workspaces[payload.workspaceName].forEach((element: any) => {
        element.workspace_name = payload.workspaceName;
      });
      delete state.workspaces[payload.key];
      return {
        ...state,
        workspace,
      };

    default:
      return { ...state };
  }
}

export const useWorkspacesReducer = () => {
  const workspaces = useSelector((state: any) => state.workspaces);
  return workspaces;
};
