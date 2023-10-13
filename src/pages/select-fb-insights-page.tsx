import Loader from "@/components/loader";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Colors } from "../../public/assets/colors";
import { getFbInsightsPagesList } from "../actions/getAccountsList";
import Layout from "../hocs/layout";
import { useFbInsightsPagesListReducer } from "../reducers/connectionAccounts";
import { AppDispatch } from "../store";
import { routes } from "../utils";
import axios from "axios";
import { REQUEST_HEADERS } from "../commonRequestHeader";
import { parse } from 'cookie';

// dynamically import error page when redirected variable is false
const ErrorPage = dynamic(() => import("next/error"))

export async function getServerSideProps(context) {
    const cookies = parse(context.req.headers.cookie || '');
    const userToken = cookies?.fb_page_user_token;
    const tokenKey = cookies?.token_key;

    return {
        props: { userToken, tokenKey }
    };
}

const SelectFbInsightsPage = ({ userToken, tokenKey }) => {
    const dispatch: AppDispatch = useDispatch();
    const { fbInsightsPagesList } = useFbInsightsPagesListReducer();
    const [isLoading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const { redirected } = router.query;

    // Effect Re-render when url query params are changes
    const loadFbInsightsPagesList = async () => {
        setLoading(true);
        // only called when token_key getting from query parameters
        try {
            const res =
                userToken && (await dispatch(getFbInsightsPagesList(userToken as string)));
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
        if (userToken && redirected) {
            loadFbInsightsPagesList();
        }
    }, [router.query]);

    // customer account handler
    const fbPageHandler = async (
        id, info
    ) => {
        const longLivedPageToken = info?.["access_token"];
        const res = await axios.get(
            `/api/fbInsights/saveLongLivedPageToken?long_lived_token=${longLivedPageToken}&token_key=${tokenKey}`,
            REQUEST_HEADERS,
        );
        
        // push search page with query parameters
        router.push({
            pathname: routes.setUp,
            query: {
                info: id,
                name: info?.["name"],
                type: "Facebook Insights",
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
            title="Adzviser | Select a Facebook Page"
            content="Pick a Facebook page from the list below to start your insights data search journey with Adzviser."
        >
            <div className='card-outer'>
                <Card style={{ minWidth: "30%" }}>
                    <Card.Header
                        as="h5"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            color: Colors.Primary,
                        }}
                    >
                        Choose your Facebook Page
                    </Card.Header>
                    <Card.Body className="select-account">
                        {/* Iterate manager accounts */}
                        {fbInsightsPagesList &&
                            Object.entries(fbInsightsPagesList)?.map(
                                ([pageId, pageInfo]) => {
                                    return (
                                        <div
                                            key={pageId}
                                            className="select-account"
                                        >
                                            <div
                                                key={pageId}
                                                className="select-account__child"
                                            >
                                                <>
                                                    {pageInfo?.["name"]}
                                                    <BsFillArrowRightSquareFill
                                                        size={24}
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => fbPageHandler(pageId, pageInfo)}
                                                    />
                                                </>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                    </Card.Body>
                </Card>
            </div>
        </Layout >
    );
};

export default SelectFbInsightsPage;