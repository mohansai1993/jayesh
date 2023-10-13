import Loader from "@/components/loader";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Colors } from "../../public/assets/colors";
import { getFbAdsAccountsList } from "../actions/getAccountsList";
import Layout from "../hocs/layout";
import { useFbAdsAccountsListReducer } from "../reducers/connectionAccounts";
import { AppDispatch } from "../store";
import { routes } from "../utils";
import { parse } from "cookie";

// dynamically import error page when redirected variable is false
const ErrorPage = dynamic(() => import("next/error"));

export async function getServerSideProps(context: any) {
  const cookies = parse(context.req.headers?.cookie || "");
  const tokenKey = cookies?.token_key; // Replace 'some_key' with the name of your cookie

  return {
    props: { tokenKey },
  };
}

const SelectFbAdsAccount = ({ tokenKey }) => {
  const dispatch: AppDispatch = useDispatch();
  const { fbAdsAccountsList } = useFbAdsAccountsListReducer();
  const [isLoading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const { redirected } = router.query;

  // Effect Re-render when url query params are changes
  const loadFbAdsActsList = async () => {
    setLoading(true);
    // only called when token_key getting from query parameters
    try {
      const res =
        tokenKey && (await dispatch(getFbAdsAccountsList(tokenKey as string)));
      if (res?.success) {
        setLoading(false);
      }
      if (res?.error) {
        console.log("Error in loadFbAdsActsList", res);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error in loadFbAdsActsListy", error);
    }
  };

  useEffect(() => {
    if (tokenKey && redirected) {
      loadFbAdsActsList();
    }
  }, [router.query]);

  // customer account handler
  const fbAccountHandler = (id, name) => {
    // push search page with query parameters
    router.push({
      pathname: routes.setUp,
      query: {
        info: id,
        name: name,
        type: "Facebook Ads",
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
      title="Adzviser | Select a Facebook Ads Account"
      content="Pick a Facebook Ads account from the list below to start your marketing data search journey with Adzviser."
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
            Choose your Facebook Ads account
          </Card.Header>
          <Card.Body className="select-account">
            {/* Iterate manager accounts */}
            {fbAdsAccountsList &&
              Object.entries(fbAdsAccountsList)?.map(
                ([accountId, accountName]) => {
                  return (
                    <div key={accountId} className="select-account">
                      <div key={accountId} className="select-account__child">
                        <>
                          {" "}
                          {accountName}
                          <div
                            onClick={() =>
                              fbAccountHandler(accountId, accountName)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <BsFillArrowRightSquareFill size={24} />
                          </div>
                        </>
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

export default SelectFbAdsAccount;
