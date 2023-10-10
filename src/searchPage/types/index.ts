// Search page related all interfaces

import { Dispatch, SetStateAction } from "react";


export interface DataConnectionAccount {
  name?: string; type?: string; info?: string; token_secret_key?: string
}
export interface WorkspaceInterface {
  name: string;
  data_connection_accounts?: DataConnectionAccount[];
}

export interface SearchResultInterface {
  google_ads: string[][];
  facebook_ads: string[][];
  facebook_page: string[][];
  ga4: string[][];
  search_console: string[][];
  bing_ads: string[][];
  date_entities_list: string[];
  intent: string;
  extra_info: { [key: string]: any };
}

export interface WorkspaceBoxInterface {
  // fromSearch is a string instead of a boolean because it will be stored in localStorage for redirection
  fromSearch: string;
  user: { [key: string]: string };
  pathname: string;
  selectedWorkspaceName: string;
  setSelectedWorkspaceName: Dispatch<SetStateAction<string>>;
  dataConnectionAccounts: DataConnectionAccount[];
  setDataConnectionAccounts: Dispatch<SetStateAction<DataConnectionAccount[]>>;
}

export interface WorkspaceListInterface {
  index?: number;
  workspace: WorkspaceInterface;
  selectedWorkspaceName: string;
  setSelectedWorkspaceName: Dispatch<SetStateAction<string>>;
  setModalShown: Dispatch<SetStateAction<{ isUpdate: boolean, visible: boolean }>>;
  setDataConnectionAccounts: Dispatch<SetStateAction<DataConnectionAccount[]>>;
  setWorkspaceInput: Dispatch<SetStateAction<string>>;
  setVisiblePopupMessage?: Dispatch<SetStateAction<boolean>>;
}

export interface DataConnectionInterface {
  item: { id: number; url: string; name: string };
  isUpdate: boolean;
  setSelectedDataConnIndex?: Dispatch<SetStateAction<number>>;
  selectedDataConnIndex?: number;
  dataConnectionAccounts: DataConnectionAccount[];
  workspaceInputRef: any;
  setRedirectLoading: Dispatch<SetStateAction<boolean>>;
  disabledConnectionsList: string[];
}