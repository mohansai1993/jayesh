import Loader from "@/components/loader";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Colors } from "../../public/assets/colors";
import { getIgProfilesList } from "../actions/getAccountsList";
import Layout from "../hocs/layout";
import { useIgInsightsProfileListReducer } from "../reducers/connectionAccounts";
import { AppDispatch } from "../store";
import { routes } from "../utils";
import { parse } from "cookie";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

// dynamically import error page when redirected variable is false
const ErrorPage = dynamic(() => import("next/error"));

export async function getServerSideProps(context: any) {
  const cookies = parse(context.req.headers?.cookie || "");
  const tokenKey = cookies?.token_key; // Replace 'some_key' with the name of your cookie
  //const tokenKey = "ig_test";
  return {
    props: { tokenKey },
  };
}

const SelectIgInsightsProfile = ({ tokenKey }) => {
  const dispatch: AppDispatch = useDispatch();
  const { igInsightsProfilesList } = useIgInsightsProfileListReducer();
  const [isLoading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [currentSelectedAccount, setSelectedAccount] = useState<number>(0);
  const [isCollapsed, setCollapsed] = useState<boolean>(false);

  const { redirected } = router.query;

  // Effect Re-render when url query params are changes
  const loadIgProfilesList = async () => {
    setLoading(true);
    // only called when token_key getting from query parameters
    try {
      const res =
        tokenKey && (await dispatch(getIgProfilesList(tokenKey as string)));
      if (res?.success) {
        setLoading(false);
      }
      if (res?.error) {
        console.log("Error in loadIgProfilesList", res);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error in loadIgProfilesList", error);
    }
  };

  useEffect(() => {
    if (tokenKey && redirected) {
      loadIgProfilesList();
    }
  }, [router.query]);

  const onClickAccount = (index: number) => {
    setSelectedAccount(index);
    currentSelectedAccount === index
      ? setCollapsed((prev) => !prev)
      : setCollapsed(true);
  };

  // customer account handler
  const igProfileHandler = (id, name) => {
    // push search page with query parameters
    router.push({
      pathname: routes.setUp,
      query: {
        info: id,
        name: name,
        type: "Instagram Insights",
      },
    });
  };

  // Error page shown when is not redirected
  if (redirected === "false") {
    return <ErrorPage statusCode={400} />;
  }

  // loader
  if (isLoading) {
    return <Loader type="Oval" style={{ top: "50%", left: "50%" }} />;
  }
  return (
    <Layout
      title="Adzviser | Select a Instagram Profile"
      content="Pick an Instagram profile from the list below to start your marketing data search journey with Adzviser."
    >
      <div className="card-outer">
        <Card style={{ minWidth: "50%" }}>
          <Card.Header
            as="h5"
            style={{
              display: "flex",
              justifyContent: "center",
              color: Colors.Primary,
            }}
          >
            Choose your Instagram Profile
          </Card.Header>
          <Card.Body className="select-account">
            {/* Iterate manager accounts */}
            {igInsightsProfilesList &&
              Object.keys(igInsightsProfilesList)?.map((accountName, index) => {
                return (
                  <div key={accountName} className="select-account">
                    <div
                      className="select-account__manager"
                      style={{
                        backgroundColor:
                          currentSelectedAccount === index
                            ? Colors.Primary
                            : "#f2f2f2",
                        color:
                          currentSelectedAccount === index
                            ? Colors.Secondary
                            : Colors.Primary,
                      }}
                      onClick={() => onClickAccount(index)}
                    >
                      {accountName}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* Only collapse icons shows when child accounts available */}
                        {igInsightsProfilesList[accountName] &&
                          (isCollapsed && currentSelectedAccount === index ? (
                            <RiArrowUpSLine size={24} />
                          ) : (
                            <RiArrowDownSLine size={24} />
                          ))}
                      </div>
                    </div>
                    <div id={`property ${accountName}`}>
                      {/* Iterate child accounts appropriate manager account ids */}
                      {isCollapsed && currentSelectedAccount === index && (
                        // For example, igInsightsProfilesList
                        //{
                        //    "Adzviser": {
                        //        "profile_name": "Adzviser LLC",
                        //        "profile_id": "17841459168181705"
                        //    }
                        //}
                        <div
                          key={
                            igInsightsProfilesList[accountName]?.["profile_id"]
                          }
                          className="select-account__child"
                        >
                          {" "}
                          {
                            igInsightsProfilesList[accountName]?.[
                              "profile_name"
                            ]
                          }
                          <div
                            onClick={() =>
                              igProfileHandler(
                                igInsightsProfilesList[accountName]?.[
                                  "profile_id"
                                ],
                                igInsightsProfilesList[accountName]?.[
                                  "profile_name"
                                ],
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <BsFillArrowRightSquareFill size={24} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export default SelectIgInsightsProfile;
