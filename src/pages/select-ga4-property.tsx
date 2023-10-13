import Loader from "@/components/loader";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Colors } from "../../public/assets/colors";
import { getGa4PropertiesList } from "../actions/getAccountsList";
import Layout from "../hocs/layout";
import { useGa4PropertiesListReducer } from "../reducers/connectionAccounts";
import { AppDispatch } from "../store";
import { routes } from "../utils";
import { parse } from "cookie";

// dynamically import error page when redirected variable is false
const ErrorPage = dynamic(() => import("next/error"));

export async function getServerSideProps(context: any) {
  const cookies = parse(context.req.headers.cookie || "");
  const tokenKey = cookies?.token_key; // Replace 'some_key' with the name of your cookie
  const ga4AccessToken = cookies?.ga4_access_token;

  return {
    props: { tokenKey, ga4AccessToken },
  };
}

const SelectGa4Property = ({ tokenKey, ga4AccessToken }) => {
  const dispatch: AppDispatch = useDispatch();
  const { ga4PropertiesList } = useGa4PropertiesListReducer();
  const [isLoading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [currentSelectedAccount, setSelectedAccount] = useState<number>(0);
  const [isCollapsed, setCollapsed] = useState<boolean>(false);

  const { redirected } = router.query;
  // Effect Re-render when url query params are changes
  const loadGa4PropertiesList = async () => {
    setLoading(true);

    // only called when token_key getting from query parameters
    try {
      const res =
        ga4AccessToken &&
        (await dispatch(getGa4PropertiesList(ga4AccessToken as string)));
      if (res?.success) {
        setLoading(false);
      }
      if (res?.error) {
        console.log("Error in loadGa4PropertiesList", res);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error in loadGa4PropertiesList", error);
    }
  };

  useEffect(() => {
    if (tokenKey && redirected && ga4AccessToken) {
      loadGa4PropertiesList();
    }
  }, [router.query]);

  const onClickAccount = (index: number) => {
    setSelectedAccount(index);
    currentSelectedAccount === index
      ? setCollapsed((prev) => !prev)
      : setCollapsed(true);
  };

  // customer account handler
  const ga4PropertyHandler = (id, name) => {
    // push search page with query parameters
    router.push({
      pathname: routes.setUp,
      query: {
        info: id,
        name: name,
        type: "Google Analytics",
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
      title="Adzviser | Select a Google Analytics 4 Property"
      content="Pick a Google Analytics 4 Property from the list below to start your marketing data search journey with Adzviser."
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
            Choose your GA4 property
          </Card.Header>
          <Card.Body className="select-account">
            {/* Iterate manager accounts */}
            {ga4PropertiesList &&
              Object.keys(ga4PropertiesList)?.map((accountName, index) => {
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
                        {ga4PropertiesList[accountName]?.length > 0 &&
                          (isCollapsed && currentSelectedAccount === index ? (
                            <RiArrowUpSLine size={24} />
                          ) : (
                            <RiArrowDownSLine size={24} />
                          ))}
                      </div>
                    </div>
                    <div id={`property ${accountName}`}>
                      {/* Iterate child accounts appropriate manager account ids */}
                      {isCollapsed &&
                        currentSelectedAccount === index &&
                        ga4PropertiesList[accountName]?.map((property) => {
                          // For example, property =  ["350900063", "adzviser.com"]
                          // The first element is the property id, the second is the property name
                          return (
                            <div
                              key={property?.[0]}
                              className="select-account__child"
                            >
                              {" "}
                              {property?.[1]}
                              <div
                                onClick={() =>
                                  ga4PropertyHandler(
                                    property?.[0],
                                    property?.[1],
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
              })}
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export default SelectGa4Property;
