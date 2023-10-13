import Loader from "@/components/loader";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Colors } from "../../public/assets/colors";
import { getSearchConsoleDomainsList } from "../actions/getAccountsList";
import Layout from "../hocs/layout";
import { useSearchConsoleDomainsListReducer } from "../reducers/connectionAccounts";
import { AppDispatch } from "../store";
import { routes } from "../utils";
import { parse } from 'cookie';

// dynamically import error page when redirected variable is false
const ErrorPage = dynamic(() => import("next/error"))

export async function getServerSideProps(context) {
    const cookies = parse(context.req.headers.cookie || '');
    const tokenKey = cookies?.token_key; // Replace 'some_key' with the name of your cookie
    const gscAccessToken = cookies?.gsc_access_token;

    return {
        props: { tokenKey, gscAccessToken }
    };
}


const SelectSearchConsoleDomain = ({ tokenKey, gscAccessToken }) => {
    const dispatch: AppDispatch = useDispatch();
    const { searchConsoleDomainsList } = useSearchConsoleDomainsListReducer();
    const [isLoading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const { redirected } = router.query;

    // Effect Re-render when url query params are changes
    const loadSearchConsoleDomainsList = async () => {
        setLoading(true);
        // only called when token_key getting from query parameters
        try {
            const res =
                gscAccessToken && (await dispatch(getSearchConsoleDomainsList(gscAccessToken as string)));
            if (res?.success) {
                setLoading(false);
            }
            if (res?.error) {
                console.log("Error in loadSearchConsoleDomainsList", res);
            }
            setLoading(false);
        } catch (error) {
            console.log("Error in loadSearchConsoleDomainsList", error);
        }
    };

    useEffect(() => {
        if (tokenKey && redirected && gscAccessToken) {
            loadSearchConsoleDomainsList();
        }
    }, [router.query]);

    // customer account handler
    const searchConsoleDomainHandler = (
        siteUrl
    ) => {
        // push search page with query parameters
        router.push({
            pathname: routes.setUp,
            query: {
                info: siteUrl,
                // Removes the "sc-domain:" from "sc-domain:adzviser.com"
                name: siteUrl.replace(/.*:/, ""),
                type: "Search Console",
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
            title="Adzviser | Select a Search Console domain"
            content="Pick a Search Console domain from the list below to start your marketing data search journey with Adzviser."
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
                        Choose your Search Console domain
                    </Card.Header>
                    <Card.Body className="select-account">
                        {/* Iterate manager accounts */}
                        {searchConsoleDomainsList &&
                            searchConsoleDomainsList.map(
                                (siteUrl, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="select-account"
                                        >
                                            <div
                                                key={index}
                                                className="select-account__child"
                                            >
                                                <>
                                                    {" "}
                                                    {siteUrl.replace(/.*:/, "")}
                                                    <div
                                                        onClick={() =>
                                                            searchConsoleDomainHandler(siteUrl)
                                                        }
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        <BsFillArrowRightSquareFill size={24} />
                                                    </div>
                                                </>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    );
};

export default SelectSearchConsoleDomain;