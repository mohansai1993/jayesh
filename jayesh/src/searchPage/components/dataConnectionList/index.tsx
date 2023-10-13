import Image from "next/image";
import { SyntheticEvent, useCallback, useEffect, useState, Fragment } from "react";
import { BsCheckLg } from "react-icons/bs";
import { Colors } from "../../../../public/assets/colors";
import { DataConnectionInterface as DataConnectionListInterface } from "../../types";

const DataConnectionsList = (props: DataConnectionListInterface) => {
  const {
    item,
    isUpdate,
    setSelectedDataConnIndex,
    selectedDataConnIndex,
    dataConnectionAccounts,
    workspaceInputRef,
    setRedirectLoading,
    disabledConnectionsList
  } = props;

  useEffect(() => {
    if (workspaceInputRef?.current?.value === "") {
      workspaceInputRef?.current?.focus();
    }
  }, []);

  const redirectToAuth = (endpoint: string) => {
    setRedirectLoading(true);
    const url = `api/${endpoint}/authorize`;
    window.location.href = url;
  };

  const authActions = {
    "Google Ads": () => redirectToAuth('googleAds'),
    "Facebook Ads": () => redirectToAuth('fbAds'),
    "Facebook Insights": () => redirectToAuth('fbInsights'),
    "Google Analytics": () => redirectToAuth('ga4'),
    "Search Console": () => redirectToAuth('searchConsole'),
    "Bing Ads": () => redirectToAuth('bingAds'),
    "Instagram Insights": () => redirectToAuth('igInsights')
  };

  const onClickDataConnHandler = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    setSelectedDataConnIndex(item.id);
    const action = authActions[item.name];
    if (action) {
      action();
      localStorage.setItem("workspaceName", workspaceInputRef?.current?.value);
    }
  }, [item.id, item.name, workspaceInputRef, setSelectedDataConnIndex]);

  const showAccountNameUnderLogo = (type: string) => {
    const filteredAccounts = dataConnectionAccounts?.filter(account => account.type === type);
    return (
      <p className="text-center">
        {filteredAccounts?.map((account, index) => (
          <Fragment key={index}>
            <span>{account.name}</span> <BsCheckLg color={Colors.Primary} />
          </Fragment>
        ))}
      </p>
    );
  };

  const disabledForDiscretion = (name: string) => {
    // If the user is trying to update the connected data source, let them be able to click the connected source logo.
    // If the user is creating a new workspace, then when they return to the modal, disable the logo just so they don't 
    // continue going to the loop of loging in again and again.
    if (isUpdate) return false;
    return dataConnectionAccounts?.find(account => account.type === name);
  };
  
  return (
    <div className="col-lg-4 col-md-4 col-6 mb-2">
      <div
        className={`addClient__source--item addClient-item mb-2 text-center ${(disabledConnectionsList.includes(item.name) || disabledForDiscretion(item.name)) ? 'disabled-box' : ''}`}
        onClick={onClickDataConnHandler}
        style={
          selectedDataConnIndex === item.id
            ? { border: `2px solid ${Colors.Primary}` }
            : { border: "2px solid transparent " }
        }
      >
        <Image src={item.url} alt="icon" />
        <span className="d-block">{item.name}</span>
      </div>
      {showAccountNameUnderLogo(item.name)}
    </div>
  );
};

export default DataConnectionsList;
