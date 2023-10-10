import { Fragment, useCallback, useEffect } from "react";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { Colors } from "../../../../public/assets/colors";
import { WorkspaceListInterface } from "../../types";

const WorkspaceList = ({
  setSelectedWorkspaceName,
  selectedWorkspaceName,
  workspace,
  index,
  setModalShown,
  setDataConnectionAccounts,
  setWorkspaceInput,
  setVisiblePopupMessage,
}: WorkspaceListInterface) => {

  // Select first workspace when workspace list is rendered
  const selectWorkspace = useCallback(() => {
    if (index === 0) {
      setSelectedWorkspaceName(workspace.name);
    }

  }, []);

  useEffect(() => {
    selectWorkspace();
  }, []);

  const onClickWorkspaceList = useCallback((workspaceName: string) => {
    setSelectedWorkspaceName(workspaceName);
  }, []);

  const onClickDeleteWorkspace = useCallback(() => {
    setVisiblePopupMessage(true);
  }, []);

  const onClickUpdateHandler = useCallback(() => {
    //onClick update set update modal visible and store some required info in localStorage
    setModalShown(() => ({ isUpdate: true, visible: true }));
    localStorage.setItem("modalShown", "true");
    localStorage.setItem("isUpdateModal", "true");
    setWorkspaceInput(workspace.name);
    localStorage.setItem("selectedWorkspace", workspace.name);
    setDataConnectionAccounts(workspace.data_connection_accounts);
  }, [workspace]);

  return (
    <Fragment>
      <li
        key={workspace?.name}
        onClick={() => onClickWorkspaceList(workspace?.name)}
        style={
          selectedWorkspaceName === workspace?.name
            ? {
                backgroundColor: "#f2f2f2",
                color: Colors.Primary,
                cursor: "pointer",
              }
            : { color: "#204C4C", cursor: "pointer" }
        }
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="my-auto">{workspace?.name} </p>
          {selectedWorkspaceName === workspace?.name && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <HiPencilAlt className="editBtn"
                  style={{ marginInline: "10px" }}
                  onClick={onClickUpdateHandler}
                />
                <HiTrash className="deleteBtn" size={18} onClick={onClickDeleteWorkspace} />
              </div>
            </div>
          )}
        </div>
      </li>
      <ul className="workspaceDropdown">
        {/*  Data source connected  accounts  */}
        {selectedWorkspaceName === workspace?.name &&
          workspace?.data_connection_accounts?.map((dataConnection, index) => {
            return (
              <li
                className="workspace-datasource-accounts"
                key={`${dataConnection.name}-${index}`}
                title={`${dataConnection.name} - ${dataConnection.type}`}
              >
                {dataConnection.name} - {dataConnection.type}
              </li>
            );
          })}
      </ul>
    </Fragment>
  );
};
export default WorkspaceList;
