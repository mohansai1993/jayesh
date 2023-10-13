/* eslint-disable react-hooks/exhaustive-deps */
import WorkspaceBox from "../searchPage/components/workspaceBox";
import Loader from "@/components/loader";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Colors } from "../../public/assets/colors";
import { useWorkspacesReducer } from "../reducers/workspace";
import Layout from "../hocs/layout";
import { useAuthReducer } from "../reducers/auth";
import MemoizedSearchResultChart from "../searchPage/components/charts/adzviserChart";
import MemoizedSearchResultTable from "../searchPage/components/searchResult";
import { FILTERED_COLUMNS, infoToaster, errorToaster, updateDataConnection, checkAuth } from "../utils";
import images from "../utils/images";
import { DataConnectionAccount, SearchResultInterface } from "searchPage/types";
import axios from "axios";
import { REQUEST_HEADERS } from "commonRequestHeader";
import { useModalReducer } from "reducers/modal";
import { closeModal } from "actions/modal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import SubscriptionModal from "@/components/modal/subscriptionPopUp";
import PricingModal from "@/components/modal/pricingPopup";

export async function getServerSideProps(context) {
  return checkAuth(context);
}
const SearchPage = ({ tokenKeyFromCookie }) => {
  const { isModalOpen } = useModalReducer();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  // useRef<HTMLInputElement> creates a reference to an input element in the DOM
  const { user } = useAuthReducer();
  const { query, pathname } = router;
  const [selectedWorkspaceName, setSelectedWorkspaceName] =
    useState<string>("");
  // useRef<HTMLInputElement> creates a reference to an input element in the DOM
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  // This loading keeps track of search result loading
  const [loading, setLoading] = useState(false);
  const [upgrade, setUpgrade] = useState(false);
  const { workspaces } = useWorkspacesReducer();
  const [searchResult, setSearchResult] = useState<SearchResultInterface>();

  const [visualizeSearchResult, setVisualizeSearchResult] =
    useState<SearchResultInterface>();
  const [checkboxDict, setCheckboxDict] = useState({});
  const [barWidth, setBarwidth] = useState("0");
  const [dataConnectionAccounts, setDataConnectionAccounts] =
    useState<DataConnectionAccount[]>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSearchResultTab, setCurrentSearchResultTab] =
    useState<string>("table");
  // If this value is true, then it is monthly; if false, then yearly
  const [subscriptionPaymentMonthly, setSubscriptionPaymentMonthly] = useState(true);

  const onChange = useCallback((e: { target: HTMLInputElement }) => {
    setSearchQuery(e?.target?.value);
  }, []);

  const clearInput = useCallback(() => {
    setSearchQuery("");
  }, []);

  const [activeSourceTab, setActiveSourceTab] = useState("googleAds");

  const handleTabClick = (tab) => {
    setActiveSourceTab(tab);
  };

  const initializeDefaultCheckbox = useCallback(() => {
    setCheckboxDict({});
    const headers = searchResult?.google_ads?.[0]?.[0] || [];

    FILTERED_COLUMNS.forEach((item) => {
      let column = item;
      if (!headers.includes(column)) {
        return;
      }
      let data = searchResult?.google_ads?.[0].slice(1).map((row) => {
        return row[headers.indexOf(column)];
      });
      if (column === "Status") {
        setCheckboxDict((prev) => {
          return { ...prev, Status: ["Enabled"] };
        });
      } else {
        setCheckboxDict((prev) => {
          return { ...prev, [column]: [...new Set(data)] };
        });
      }
    }, {});
  }, [searchResult]);

  useEffect(() => {
    // Listen to route changes
    const handlePopstate = (event: PopStateEvent) => {
      const state = event.state;
      if (state && state.searchResult && state.searchQuery) {
        setSearchResult(state.searchResult);
        setSearchQuery(state.searchQuery);
      }
    };
    window.addEventListener("popstate", handlePopstate);
    return () => {
      // Clean up the event listener
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  useEffect(() => {
    initializeDefaultCheckbox();
  }, [searchResult]);

  // set query params on load
  useEffect(() => {
    updateDataConnection(query, setDataConnectionAccounts, tokenKeyFromCookie);
  }, [query]);

  useEffect(() => {
    if (dataConnectionAccounts) {
      localStorage.setItem(
        "dataConnectionAccounts",
        JSON.stringify(dataConnectionAccounts),
      );
    }
  }, [dataConnectionAccounts]);

  // Search bar handler
  const searchBarHandler = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      // if user have not workspace
      if (workspaces?.length == 0) {
        return infoToaster("Please create a workspace before your search.");
      }

      // when search query is empty
      if (searchQuery === "") {
        return;
      }
      setLoading(true);

      const body = JSON.stringify({
        search_query: searchQuery,
        workspace_name: selectedWorkspaceName,
      });
      try {
        window.dataLayer = window.dataLayer || [];
        if (
          user?.email !== "zeyuan.goo@gmail.com" &&
          user?.email !== "zeyuan.gu@adzviser.com" &&
          user?.email !== "zegooey@gmail.com" &&
          user?.email !== "development@lnxct.com" &&
          user?.email !== "matthewz1996@gmail.com"
        ) {
          window.dataLayer.push({
            event: "search",
            query_and_email: `${searchQuery} -- ${user?.email}`,
          });
        }
        const result = await (
          await axios.post("/api/search/bar", body, REQUEST_HEADERS)
        ).data;
        setSearchResult(result?.result);

        let res = result?.result;

        if (res) {
          let {
            facebook_ads,
            google_ads,
            facebook_page,
            ga4,
            search_console,
            bing_ads,
            subscription_checkup_message,
            workspace_checkup_message
          } = res;

          if (subscription_checkup_message !== "") {
            infoToaster(subscription_checkup_message)
          }
          if (workspace_checkup_message !== "") {
            infoToaster(workspace_checkup_message)
          }
          if (
            google_ads &&
            !facebook_ads &&
            !facebook_page &&
            !ga4 &&
            !search_console &&
            !bing_ads
          ) {
            setActiveSourceTab("googleAds");
          }
          if (
            facebook_ads &&
            !google_ads &&
            !facebook_page &&
            !ga4 &&
            !search_console &&
            !bing_ads
          ) {
            setActiveSourceTab("facebookAds");
          }
          if (
            facebook_page &&
            !google_ads &&
            !facebook_ads &&
            !ga4 &&
            !search_console &&
            !bing_ads
          ) {
            setActiveSourceTab("facebookPage");
          }
          if (
            ga4 &&
            !google_ads &&
            !facebook_ads &&
            !facebook_page &&
            !search_console &&
            !bing_ads
          ) {
            setActiveSourceTab("ga4");
          }
          if (
            search_console &&
            !ga4 &&
            !google_ads &&
            !facebook_ads &&
            !facebook_page &&
            !bing_ads
          ) {
            setActiveSourceTab("searchConsole");
          }
          if (
            bing_ads &&
            !ga4 &&
            !google_ads &&
            !facebook_ads &&
            !facebook_page &&
            !search_console
          ) {
            setActiveSourceTab("bingAds");
          }
        }

        // set default search result only status is enabled
        const header = result?.result.google_ads?.[0][0];
        const filterColumnIndex = header?.findIndex(
          (column: string) => column === "Status",
        );
        if (filterColumnIndex >= 0) {
          const filteredResult = result?.result?.google_ads?.map((adArray) => {
            const filteredAdArray = adArray.slice(1).filter((item) => {
              return item[filterColumnIndex] !== "Paused";
            });
            return [header, ...filteredAdArray];
          });
          setVisualizeSearchResult({
            ...result?.result,
            google_ads: filteredResult,
          });
        } else {
          setVisualizeSearchResult(result?.result);
        }

        // store the search result in the browser history state
        window.history.pushState(
          { searchResult: result?.result, searchQuery: searchQuery },
          "",
          "/search",
        );
        setLoading(false);
        setBarwidth("1");
      } catch (error) {
        errorToaster(error?.response?.data?.error);
        setBarwidth("1");
        setLoading(false);
        setSearchResult(null);
        setVisualizeSearchResult(null);
      }
    },
    [searchQuery, selectedWorkspaceName, workspaces],
  );

  return (
    <Layout
      title="Adzviser | Search"
      content="Enter your search queries on Adzviser to instantly retrieve your marketing data from platforms such as Google Ads, Facebook Ads, Bing Ads, and more. With our proprietary natural language processing technology, you can retrieve, analyze, and strategize your marketing data in a matter of seconds."
    >
      <div
        className="search"
      >
        <div className="row m-0 h-100 w-100 px-4">
          <div className="col-lg-2 col-md-2 col-12 px-lg-3 px-md-3 px-0 auto pt-lg-0 pt-md-0 pt-4">
            <WorkspaceBox
              fromSearch={"true"}
              user={user}
              pathname={pathname}
              selectedWorkspaceName={selectedWorkspaceName}
              setSelectedWorkspaceName={setSelectedWorkspaceName}
              dataConnectionAccounts={dataConnectionAccounts}
              setDataConnectionAccounts={setDataConnectionAccounts}
            />
          </div>
          <div
            className={`col-lg-10 col-md-10 col-12 search__right search__result ${barWidth == "1" ? "mt-4" : "m-lg-auto m-md-auto"
              }`}
          >
            <div
              className={`d-lg-flex d-md-flex d-block ${barWidth == "1"
                ? "justify-content-between"
                : "justify-content-center"
                }`}
            >
              <div className="search__input">
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="Enter your query..."
                  onChange={onChange}
                  onKeyDown={useCallback((e) => {
                    if (e.key === "Enter") {
                      searchButtonRef.current.click();
                    }
                  }, [])}
                  required
                />
                <div className="search__input--icon">
                  {searchQuery?.length > 0 && (
                    <AiFillCloseCircle
                      color={Colors.GrayShadeC4}
                      size={24}
                      onClick={clearInput}
                    />
                  )}
                  <button
                    className="search-button"
                    ref={searchButtonRef}
                    type="submit"
                    onClick={searchBarHandler}
                  >
                    <Image
                      src={images.search}
                      alt="icon"
                      style={{
                        marginLeft: 15,
                        marginRight: 20,
                        marginBottom: 2.5,
                      }}
                    />
                  </button>
                </div>
              </div>
              <a
                className="btn chatbtn mt-lg-0 mt-md-0 mt-3 d-flex align-items-center"
                href="https://chat.openai.com/?model=gpt-4-plugins"
              >
                <Image src={images.chatgptLogo} alt="" />
                Move to <span className="bold-font ms-1">ChatGPT</span>
              </a>
            </div>

            {searchResult && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <div className="customTabs">
                  {searchResult.google_ads && (
                    <div
                      onClick={() => handleTabClick("googleAds")}
                      className="customTabs__title"
                      style={{
                        color:
                          activeSourceTab === "googleAds"
                            ? Colors.Primary
                            : "grey",
                        borderBottom:
                          activeSourceTab === "googleAds"
                            ? `1px solid ${Colors.Primary}`
                            : "none",
                        marginLeft: 15,
                      }}
                    >
                      Google Ads
                    </div>
                  )}
                  {searchResult.facebook_ads && (
                    <div
                      onClick={() => handleTabClick("facebookAds")}
                      className="customTabs__title"
                      style={{
                        color:
                          activeSourceTab === "facebookAds"
                            ? Colors.Primary
                            : "grey",
                        borderBottom:
                          activeSourceTab === "facebookAds"
                            ? `1px solid ${Colors.Primary}`
                            : "none",
                        marginLeft: 15,
                      }}
                    >
                      Facebook Ads
                    </div>
                  )}
                  {searchResult.facebook_page && (
                    <div
                      onClick={() => handleTabClick("facebookPage")}
                      className="customTabs__title"
                      style={{
                        color:
                          activeSourceTab === "facebookPage"
                            ? Colors.Primary
                            : "grey",
                        borderBottom:
                          activeSourceTab === "facebookPage"
                            ? `1px solid ${Colors.Primary}`
                            : "none",
                        marginLeft: 15,
                      }}
                    >
                      Facebook Page / Insights
                    </div>
                  )}
                  {searchResult.ga4 && (
                    <div
                      onClick={() => handleTabClick("ga4")}
                      className="customTabs__title"
                      style={{
                        color:
                          activeSourceTab === "ga4" ? Colors.Primary : "grey",
                        borderBottom:
                          activeSourceTab === "ga4"
                            ? `1px solid ${Colors.Primary}`
                            : "none",
                        marginLeft: 15,
                      }}
                    >
                      Google Analytics
                    </div>
                  )}
                  {searchResult.search_console && (
                    <div
                      onClick={() => handleTabClick("searchConsole")}
                      className="customTabs__title"
                      style={{
                        color:
                          activeSourceTab === "searchConsole"
                            ? Colors.Primary
                            : "grey",
                        borderBottom:
                          activeSourceTab === "searchConsole"
                            ? `1px solid ${Colors.Primary}`
                            : "none",
                        marginLeft: 15,
                      }}
                    >
                      Search Console
                    </div>
                  )}
                  {searchResult.bing_ads && (
                    <div
                      onClick={() => handleTabClick("bingAds")}
                      className="customTabs__title"
                      style={{
                        color:
                          activeSourceTab === "bingAds"
                            ? Colors.Primary
                            : "grey",
                        borderBottom:
                          activeSourceTab === "bingAds"
                            ? `1px solid ${Colors.Primary}`
                            : "none",
                        marginLeft: 15,
                      }}
                    >
                      Bing Ads
                    </div>
                  )}
                </div>
              </div>
            )}
            <div
              className="customTable"
              style={{ position: "relative", width: "100%" }}
            >
              {!loading ? (
                <>
                  {currentSearchResultTab === "table" && (
                    <MemoizedSearchResultTable
                      searchResult={searchResult}
                      setVisualizeSearchResult={setVisualizeSearchResult}
                      visualizeSearchResult={visualizeSearchResult}
                      checkboxDict={checkboxDict}
                      setCheckboxDict={setCheckboxDict}
                      activeSourceTab={activeSourceTab}
                    />
                  )}
                  {currentSearchResultTab === "visualization" && (
                    <MemoizedSearchResultChart
                      visualizationData={visualizeSearchResult}
                    />
                  )}
                </>
              ) : (
                <>
                  <Loader type="Threedots" style={undefined} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* open first modal */}
        <SubscriptionModal
          show={isModalOpen}
          onHide={() => {
            dispatch(closeModal());
          }}
          btnTitle="Save Changes"
          onClick={() => {
            setUpgrade(!upgrade);
            dispatch(closeModal());
          }}
        >
        </SubscriptionModal>
        {/* open second modal for set and check plan details */}
        <PricingModal
          show={upgrade}
          onHide={() => {
            setUpgrade(false);
          }}
          btnTitle="Save Changes"
          subscriptionPaymentMonthly={subscriptionPaymentMonthly}
          setSubscriptionPaymentMonthly={setSubscriptionPaymentMonthly}
        >
        </PricingModal>
      </div>
    </Layout>
  );
};
export default SearchPage;
