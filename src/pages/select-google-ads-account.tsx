import Loader from "@/components/loader";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Colors } from "../../public/assets/colors";
import { getGoogleAdsAccountHierarchy } from "../actions/getAccountsList";
import Layout from "../hocs/layout";
import { useGoogleAdsHierarchyReducer } from "../reducers/connectionAccounts";
import { AppDispatch } from "../store";
import { routes } from "../utils";
import { parse } from "cookie";

// dynamically import error page when redirected variable is false
const ErrorPage = dynamic(() => import("next/error"));

export async function getServerSideProps(context: any) {
  const cookies = parse(context.req.headers?.cookie || "");
  const tokenKey = cookies?.token_key;

  return {
    props: { tokenKey },
  };
}

const SelectGoogleAdsAccount = ({ tokenKey }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isCollapsed, setCollapsed] = useState<boolean>(false);
  const [currentSelectedAccount, setSelectedAccount] = useState<number>(0);
  const { googleAdsAccountHierarchy } = useGoogleAdsHierarchyReducer();
  const [isLoading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const { redirected } = router.query;

  // Effect Re-render when url query params are changes
  const loadGoogleAdsAccountHierarchy = async () => {
    setLoading(true);
    // only called when token_key getting from query parameters
    try {
      const res =
        tokenKey &&
        (await dispatch(getGoogleAdsAccountHierarchy(tokenKey as string)));
      if (res?.success) {
        setLoading(false);
      }
      if (res?.error) {
        console.log("Error in loadGoogleAdsAccountHierarchy", res);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error in loadGoogleAdsAccountHierarchy", error);
    }
  };

  useEffect(() => {
    if (tokenKey && redirected) {
      loadGoogleAdsAccountHierarchy();
    }
  }, [router.query]);

  const onClickManagerAccount = (index: number) => {
    setSelectedAccount(index);
    currentSelectedAccount === index
      ? setCollapsed((prev) => !prev)
      : setCollapsed(true);
  };
  interface Customer {
    id: string;
    descriptiveName: string;
    manager: boolean;
    manager_id?: string;
  }

  // customer account handler
  const customerAccountHandler = (
    login_customer_id: string,
    customer: Customer,
  ) => {
    // push search page with query parameters
    router.push({
      pathname: routes.setUp,
      query: {
        info: `${login_customer_id}+${customer.id}`,
        name: customer.descriptiveName,
        type: "Google Ads",
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
      title="Adzviser | Select a Google Ads Account"
      content="Pick a Google Ads account from the account hierarchy below to start your marketing data search journey with Adzviser."
    >
      <div className="card-outer">
        <Card style={{ minWidth: "30%" }}>
          <Card.Header
            as="h5"
            style={{
              display: "flex",
              justifyContent: "center",
              color: Colors.Primary,
            }}
          >
            Choose your Google Ads account
          </Card.Header>
          <Card.Body className="select-account">
            {/* Iterate manager accounts */}
            {googleAdsAccountHierarchy &&
              Object.keys(googleAdsAccountHierarchy[0])?.map(
                (rootCustomerId, index) => {
                  const rootCustomerMap: Customer =
                    googleAdsAccountHierarchy[0];
                  return (
                    <div
                      key={rootCustomerMap[rootCustomerId].id}
                      className="select-account"
                    >
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
                        onClick={() => onClickManagerAccount(index)}
                      >
                        {rootCustomerMap[rootCustomerId].descriptiveName}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {/* Only collapse icons shows when child accounts available */}
                          {googleAdsAccountHierarchy[1][
                            rootCustomerMap[rootCustomerId]?.id
                          ]?.length > 0 &&
                            (isCollapsed && currentSelectedAccount === index ? (
                              <RiArrowUpSLine size={24} />
                            ) : (
                              <RiArrowDownSLine size={24} />
                            ))}

                          {!rootCustomerMap[rootCustomerId]?.manager && (
                            <div
                              style={{ marginInline: 8 }}
                              onClick={() =>
                                customerAccountHandler(
                                  rootCustomerMap[rootCustomerId]?.manager_id,
                                  rootCustomerMap[rootCustomerId],
                                )
                              }
                            >
                              <BsFillArrowRightSquareFill size={24} />
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        id={`childAccount${rootCustomerMap[rootCustomerId]?.id}`}
                      >
                        {/* Iterate child accounts appropriate manager account ids */}
                        {isCollapsed &&
                          currentSelectedAccount === index &&
                          googleAdsAccountHierarchy[1][
                            rootCustomerMap[rootCustomerId]?.id
                          ]?.map((child: Customer) => {
                            return (
                              <div
                                key={child?.id}
                                className="select-account__child"
                              >
                                {" "}
                                {child?.descriptiveName}
                                <div
                                  onClick={() =>
                                    customerAccountHandler(
                                      rootCustomerMap[rootCustomerId]
                                        ?.manager_id,
                                      child,
                                    )
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <BsFillArrowRightSquareFill size={24} />
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                },
              )}
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export default SelectGoogleAdsAccount;
