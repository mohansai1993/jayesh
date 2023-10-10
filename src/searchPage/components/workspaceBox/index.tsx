/* eslint-disable react-hooks/exhaustive-deps */
import CustomModal from "@/components/modal";
import PopupMessage from "@/components/modal/PopupMessage";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import WorkspaceList from "../workspaceList";
import { getWorkspaces } from "../../../actions/workspace";
import { REQUEST_HEADERS } from "../../../commonRequestHeader";
import { useWorkspacesReducer } from "../../../reducers/workspace";
import DataConnectionsList from "../dataConnectionList";
import {
  WorkspaceInterface
} from "../../types";
import { AppDispatch } from "../../../store";
import {
  dataSourceList,
  emmiter,
  errorToaster,
  successToaster
} from "../../../utils";
import images from "../../../utils/images";
import { WorkspaceBoxInterface } from "../../types";
import { useSubscriptionInfoReducer } from "reducers/subscriptionInfo";
import { getConnectedDataSources } from "actions/subscription";
import Loader from "@/components/loader";

const WorkspaceBox = ({
  fromSearch,
  user,
  pathname,
  selectedWorkspaceName,
  setSelectedWorkspaceName,
  dataConnectionAccounts,
  setDataConnectionAccounts
}: WorkspaceBoxInterface) => {
  const [changeText, setChangeText] = useState("0")
  const router = useRouter();
  // useRef<HTMLInputElement> creates a reference to an input element in the DOM
  const workspaceInputRef = useRef<HTMLInputElement>(null);
  const [workspaceInput, setWorkspaceInput] = useState<string>("");
  const [modalShown, setModalShown] = useState<{
    isUpdate: boolean;
    visible: boolean;
  }>({ isUpdate: false, visible: false });
  const { workspaces } = useWorkspacesReducer();
  const dispatch: AppDispatch = useDispatch();
  const [redirectLoading, setRedirectLoading] = useState(false);
  const [workspaceInputError, setWorkspaceInputError] =
    useState<boolean>(false);
  const [selectedDataConnIndex, setSelectedDataConnIndex] = useState<number>(0);
  const [isVisiblePopupMessage, setVisiblePopupMessage] =
    useState<boolean>(false);
  const [dataSourceError, setDataSourceError] = useState<boolean>(false);
  const [workspaceNameDuplicateError, setWorkspaceNameDuplicateError] = useState(false);
  const { connectedSources } = useSubscriptionInfoReducer();
  const [disabledConnectionsList, setDisabledConnectionsList] = useState([]);
  const [loading, setLoading] = useState(false);

  // This will be deleted after fb verifies ig permissions
  const [tempDataSourceList, setTempDataSourceList] = useState(dataSourceList);

  const loadConnectedDataSources = async () => {
    await dispatch(getConnectedDataSources());
  }

  const checkSubscription = useCallback(async () => {
    let parsedStoredDataConnectionAccounts = null;
    // Because when the user updates an existing workspace, dataConnectionAccounts get loaded. Thus we don't want to double count the connectedAccounts 
    // from the db and the ones in local storage.
    if (!modalShown.isUpdate) {
      parsedStoredDataConnectionAccounts = JSON.parse(localStorage.getItem('dataConnectionAccounts'));
    }
    if (connectedSources?.subscription_plan <= (parsedStoredDataConnectionAccounts?.length ?? 0) + connectedSources?.connected_sources?.length ?? 0) {
      // When subscription_plan is < connected_source.length, this should only happen when the user downgrades the plan. 
      // Since we don't retroactively delete their connected sources if users downgrades, we only give them the option of 
      // accessing / connecting the first X sources they connected. X is their current subscription plan.
      const combinedConnectionsList = [
        ...(connectedSources?.connected_sources || []),
        ...(parsedStoredDataConnectionAccounts?.map(item => item.type) || [])
      ];
      const enabledConnectionsList = combinedConnectionsList.slice(0, connectedSources?.subscription_plan);
      setDisabledConnectionsList(dataSourceList.filter(item => !enabledConnectionsList.includes(item.name)).map(item => item.name));
    }
    else {
      setDisabledConnectionsList([]);
    }
  }, [connectedSources])

  useEffect(() => {
    if (modalShown.visible) {
      loadConnectedDataSources();
    }

    if (dataConnectionAccounts) {
      localStorage.setItem('dataConnectionAccounts', JSON.stringify(dataConnectionAccounts));
    }
  }, [modalShown.visible, dataConnectionAccounts]);

  useEffect(() => {
    if (connectedSources) {
      checkSubscription();
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [connectedSources])

  useEffect(() => {
    const storedDataConnectionAccounts = localStorage.getItem('dataConnectionAccounts');

    if (storedDataConnectionAccounts) {
      setDataConnectionAccounts(JSON.parse(storedDataConnectionAccounts));
    }

    // Function to run when the window unloads
    const handleUnload = () => {
      // Set redirectLoading to false
      setRedirectLoading(false);
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => {
      // Clean up the event listener
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  const fetchWorkspaces = useCallback(async () => {
    // Only called when user data is not null
    await dispatch(getWorkspaces());
    if (user?.["email"] !== "zeyuan.gu@adzviser.com") {
      setTempDataSourceList(dataSourceList.slice(0, 6));
    } else {
      setTempDataSourceList(dataSourceList);
    }
  }, [user]);

  useEffect(() => {
    // fetch workspaces
    fetchWorkspaces();
    // Re-fetch the workspaces once the user has saved a new workspace
    const emit = emmiter.addListener("getWorkspaces", () => fetchWorkspaces());

    if (localStorage.getItem("modalShown") === "true") {
      if (localStorage.getItem("isUpdateModal") === "true") {
        setModalShown(() => ({ isUpdate: true, visible: true }));
      } else {
        setModalShown((modal) => ({ ...modal, visible: true }));
      }
    }

    // getting workspace name from local storage
    if (localStorage.getItem("workspaceName")) {
      setWorkspaceInput(localStorage.getItem("workspaceName"));
    }

    // Failing to remove event listeners when they are no longer needed
    // can lead to memory leaks, as the listeners will continue to run
    // and consume memory even if the component that created them is no longer in use.
    return () => emit.remove();
  }, [user]);

  // This function is called when the user clicks on the "Save" or "Cancel" button in the modal
  const resetAndReturn = useCallback(() => {
    setModalShown((modal) => ({ ...modal, visible: false }));
    localStorage.setItem("modalShown", "false");
    localStorage.removeItem("workspaceName");
    localStorage.removeItem("isUpdateModal");
    //localStorage.removeItem("fromSearch");
    localStorage.removeItem("dataConnectionAccounts");
    setWorkspaceInput("");
    setDataConnectionAccounts(null);
    setSelectedDataConnIndex(0);
    setWorkspaceInputError(false);
    setWorkspaceNameDuplicateError(false);
    setDataSourceError(false);

    const cookiesToReset = ["token_key", "fb_page_user_token", "ga4_access_token", "gsc_access_token"];
    cookiesToReset.forEach(cookieName => {
      if (process.env.NODE_ENV === "production") {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.adzviser.com; secure;`;
      } else {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=127.0.0.1;`;
      }
    });

    // By replacing the current route instead of pushing a new one, we can go back to the search page;
    // { shallow: true } means that the navigation will be shallow, meaning that the
    // route components will not be unmounted and re-mounted but rather updated in place,
    // which could potentially result in faster navigation.
    router.replace({ pathname }, undefined, { shallow: true });
  }, []);

  // onClick save and update buttons handler
  const saveAndUpdateBtnHandler = useCallback(async () => {
    // When Workspace input is empty
    if (
      workspaceInputRef.current?.value === null ||
      workspaceInputRef.current?.value === ""
    ) {
      setWorkspaceInputError(true);
      return;
    }
    if (dataConnectionAccounts === null) {
      setDataSourceError(true);
      return;
    }
    const workspaceData = {
      accounts: dataConnectionAccounts.map(account => ({
        accountInfo: account?.info,
        accountType: account?.type,
        accountName: account?.name,
        tokenSecretKey: account?.token_secret_key,
      })),
    };

    // Update the workspace
    if (modalShown.isUpdate) {
      try {
        const body = JSON.stringify({
          ...workspaceData,
          newWorkspaceName: workspaceInputRef.current?.value,
          oldWorkspaceName: localStorage.getItem("selectedWorkspace"),
        });
        const res = await axios.post(
          "/api/workspace/update",
          body,
          REQUEST_HEADERS
        );
        if (res.status === 200) {
          successToaster(res?.data?.success);
          emmiter.emit("getWorkspaces");
          resetAndReturn();
        }
      } catch (error) {
        console.log(error);
        errorToaster(error.response?.data?.error?.message);
        //resetAndReturn();
      }

      // Create the Workspace
    } else {
      try {
        const body = JSON.stringify({
          ...workspaceData,
          workspaceName: workspaceInputRef.current?.value,
        });
        const res = await axios.post(
          "/api/workspace/create",
          body,
          REQUEST_HEADERS
        );
        if (res.status === 200) {
          successToaster(res?.data?.success);
          emmiter.emit("getWorkspaces");
          resetAndReturn();
        }
      } catch (error) {
        errorToaster(error?.response?.data?.error?.message);
        //resetAndReturn();
      }
    }
  }, [modalShown, workspaceInputRef]);

  // On change workspace input
  const onChangeWorkspaceInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e?.target?.value !== "") {
        setWorkspaceInputError(false);
      }
      setWorkspaceInput(e?.target.value);
      if (e.target.value === "") {
        workspaceInputRef.current.focus();
      }
      if (workspaces?.some(item => item.name === workspaceInputRef.current?.value) && e.target.value !== selectedWorkspaceName) {
        setWorkspaceNameDuplicateError(true);
      }
      else {
        setWorkspaceNameDuplicateError(false);
      }
    },

    [workspaces]
  );

  // onClick add new workspace
  const onClickAddNewWorkspace = useCallback(() => {
    resetAndReturn();
    localStorage.setItem("modalShown", "true");
    localStorage.setItem("isUpdateModal", "false");
    localStorage.setItem("fromSearch", fromSearch);
    setModalShown(() => ({ isUpdate: false, visible: true }));
  }, []);

  // onClick delete workspace
  const onClickDeleteWorkspace = useCallback(async () => {
    try {
      const body = JSON.stringify({
        workspaceName: selectedWorkspaceName,
      });
      const res = await axios.post(
        "/api/workspace/delete",
        body,
        REQUEST_HEADERS
      );
      if (res.status === 200) {
        successToaster(res?.data?.success);
        emmiter.emit("getWorkspaces");
        setVisiblePopupMessage((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
      errorToaster(error?.response?.data?.error);
      setVisiblePopupMessage((prev) => !prev);
    }
  }, [workspaces, isVisiblePopupMessage]);
  return (
    <>
      <div className="search__clients">
        <h4
          className="search__clients--title workspaceTitle text-center p-3"
        >
          Workspace{" "}
        </h4>

        <ul className="search__clients--list">

          <div className="workspaceBox">
            {workspaces &&
              workspaces?.map(
                (workspace: WorkspaceInterface, index: number) => {
                  return (
                    <WorkspaceList
                      key={workspace?.name}
                      index={index}
                      workspace={workspace}
                      setSelectedWorkspaceName={setSelectedWorkspaceName}
                      selectedWorkspaceName={selectedWorkspaceName}
                      setModalShown={setModalShown}
                      setDataConnectionAccounts={
                        setDataConnectionAccounts
                      }
                      setWorkspaceInput={setWorkspaceInput}
                      setVisiblePopupMessage={setVisiblePopupMessage}
                    />
                  );
                }
              )}
          </div>
          <li
            onClick={onClickAddNewWorkspace}
          >
            <span className="nav-link all-center f-12 py-3 m-0">
              <span className="d-flex justify-content-center my-auto ms-0">
                <span className="addBtn all-center f-12 m-0">
                  <Image src={images.addIcon} alt="" />
                </span>
                <span className="my-auto ms-2 text-main">Add</span>
              </span>
            </span>
          </li>
        </ul>
      </div>

      <div className="customModal">
        <CustomModal
          onClick={redirectLoading ? null : saveAndUpdateBtnHandler}
          show={modalShown?.visible}
          onHide={useCallback(() => resetAndReturn(), [])}
          btnTitle={modalShown?.isUpdate ? "Update" : "Save"}
          isDisabled={redirectLoading}
        >
          {loading ? (<div className="addClient__source modal-content-center">
            <Loader type="Threedots" />
          </div>) : (
            <div className="addClient pt-5">
              <div className={`workspace--name input-box ${changeText === "1" ? "foucsInput" : " "}  w-100`}>
                <input
                  type="text"
                  placeholder="Workspace Name"
                  className="workspace--name__input"
                  ref={workspaceInputRef}
                  onClick={() => setChangeText("1")}
                  onChange={onChangeWorkspaceInput}
                  value={workspaceInput}
                  required
                />
              </div>
              {workspaceInputError ? (
                <div className="text-center pt-2 error-text">
                  <span>
                    Please enter a workspace name.
                  </span>
                </div>
              ) : null}
              {workspaceNameDuplicateError ? (
                <div className="text-center pt-2 error-text">
                  <span>
                    The workspace name you've chosen is already in use. Please enter a different one.
                  </span>
                </div>
              ) : null}
              <div className="addClient__source">
                <div className="addClient__source--box row m-0">
                  {tempDataSourceList?.map((item) => {
                    return (
                      <DataConnectionsList
                        key={item.id}
                        item={item}
                        isUpdate={modalShown.isUpdate}
                        setSelectedDataConnIndex={setSelectedDataConnIndex}
                        selectedDataConnIndex={selectedDataConnIndex}
                        dataConnectionAccounts={dataConnectionAccounts}
                        workspaceInputRef={workspaceInputRef}
                        setRedirectLoading={setRedirectLoading}
                        disabledConnectionsList={disabledConnectionsList}
                      />
                    );
                  })}
                </div>
                {dataSourceError && (
                  <div className="pt-2 error-text">
                    <span>
                      Data source required: Please select at least one for your workspace.
                    </span>
                  </div>
                )}
                {disabledConnectionsList.length !== 0 && (
                  <div className="pt-2 error-text">
                    <span>
                      Your current plan provides access to a limited number of data sources. Upgrade now for expanded access.
                    </span>
                  </div>
                )}
              </div>
            </div>)}
        </CustomModal>
        <PopupMessage
          btnTitle={"Delete"}
          isDangerBtn={true}
          isVisiblePopupMessage={isVisiblePopupMessage}
          popupMessageBtnHandler={onClickDeleteWorkspace}
          setVisiblePopupMessage={setVisiblePopupMessage}
          popupMessage={"Deleting this workspace will erase all its content. Are you sure about this decision?"}
        />
      </div>
    </>
  );
};

export default WorkspaceBox;
