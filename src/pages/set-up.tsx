/* eslint-disable react-hooks/exhaustive-deps */
import WorkspaceBox from "../searchPage/components/workspaceBox";
import images from "../utils/images";
import Link from "next/link";
import Layout from "hocs/layout";
import Image from "next/image";
import { routes, checkAuth, updateDataConnection } from "utils";
import {
    useState, useEffect
} from "react";
import { useRouter } from "next/router";
import { useAuthReducer } from "../reducers/auth";
import {
    DataConnectionAccount,
} from "../searchPage/types";
import { closeModal } from "actions/modal";
import { useDispatch } from "react-redux";
import SubscriptionModal from "@/components/modal/subscriptionPopUp";
import PricingModal from "@/components/modal/pricingPopup";
import { useModalReducer } from "reducers/modal";

export async function getServerSideProps(context) {
    return checkAuth(context);
}

const SetUp = ({ tokenKeyFromCookie }) => {

    const { isModalOpen } = useModalReducer();

    const [selectedWorkspaceName, setSelectedWorkspaceName] = useState<string>("");
    const { user } = useAuthReducer();
    const router = useRouter();
    const dispatch = useDispatch();
    const { query, pathname } = router;
    const [dataConnectionAccounts, setDataConnectionAccounts] =
        useState<DataConnectionAccount[]>(null);
    const [upgrade, setUpgrade] = useState(false);
    const [subscriptionPaymentMonthly, setSubscriptionPaymentMonthly] = useState(true);

    // set query params on load
    useEffect(() => {
        updateDataConnection(query, setDataConnectionAccounts, tokenKeyFromCookie);
    }, [query]);

    return (
        <Layout
            title="Adzviser | Set Up"
            content="Set up your Adzviser account in two easy steps. Securely link your data sources and organize them into workspaces, then choose your preferred platform for data visualization."
        >
            <div className="all-center"
            >
                <div>
                    <div className="mb-4">
                        <div className="d-flex w-100">
                            <div className="me-4 my-auto">
                                <div className="green-tag all-center">
                                    <span>Step 1</span>
                                </div>
                            </div>
                            <div className="w-100 px-0 workspaceBox-outer">
                                <WorkspaceBox
                                    fromSearch={"false"}
                                    user={user}
                                    pathname={pathname}
                                    selectedWorkspaceName={selectedWorkspaceName}
                                    setSelectedWorkspaceName={setSelectedWorkspaceName}
                                    dataConnectionAccounts={dataConnectionAccounts}
                                    setDataConnectionAccounts={setDataConnectionAccounts}
                                />
                            </div>
                        </div>
                        <div className="para-text mt-4 ms-auto d-flex" >
                            <div>
                                <div className="warn-icon all-center">i</div>
                            </div>
                            <div className="ms-3 d-flex align-items-center">
                                <p>Securely link your data sources and organize them into distinct workspaces.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex w-100">
                            <div className="me-4 my-auto">
                                <div className="green-tag all-center">
                                    <span>Step 2</span>
                                </div>
                            </div>
                            <div>
                                <div className="addSpaceBtn">
                                    <a href="https://chat.openai.com/?model=gpt-4-plugins" className="nav-link f-20 text-center d-flex justify-content-center">
                                        <Image src={images.chatgptLogo} alt="" className="me-3" />
                                        <span><div className=" d-block"></div>Move to <span className="text-adzviser bold-font">ChatGPT</span></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="para-text mt-4 ms-auto d-flex" >
                            <div>
                                <div className="warn-icon all-center">i</div>
                            </div>
                            <div className="ms-3">
                                <p>Opt for ChatGPT for generative AI capabilities.</p>
                            </div>
                        </div>
                        {/*
                        <div className="para-text mt-4 ms-auto mb-5 pb-5" >
                            <Link href={routes.search} className="nav-link f-18 text-center text-decoration-underline">
                                <span><div className=" d-block regular-font"></div>Continue with <span className="text-main bold-font">adzviser</span></span>
                            </Link>
                        </div>
                        */}
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
export default SetUp;
