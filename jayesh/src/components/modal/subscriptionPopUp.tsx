import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useSubscriptionInfoReducer } from "../../reducers/subscriptionInfo";
import { getSubscriptionData, getConnectedDataSources } from "../../actions/subscription";
import { REQUEST_HEADERS } from "../../commonRequestHeader";
import axios from "axios";
import { routes } from "utils";
import Link from "next/link";
import PopupMessage from "@/components/modal/PopupMessage";
import {
    errorToaster,
    successToaster
} from "../../utils";

interface ModalPropsInterface {
    show: boolean;
    onHide?: () => void;
    onClick?: (e: SyntheticEvent) => void;
    children?: React.ReactNode;
    btnTitle?: string;
    btnType?: "button" | "submit" | "reset";
    isDisabled?: boolean;
}
const SubscriptionModal = (props: ModalPropsInterface) => {
    const dispatch: AppDispatch = useDispatch();
    const { subscriptionInfo, connectedSources } = useSubscriptionInfoReducer();
    const [isVisiblePopupMessage, setVisiblePopupMessage] = useState(false);

    const actionBtnTitle = subscriptionInfo?.formatted_status === "Cancelled" || subscriptionInfo?.formatted_status === "Expired" ? "Resubscribe" : "Upgrade";
    useEffect(() => {
        const loadSubscriptionData = async () => {
            await dispatch(getSubscriptionData());
        }

        const loadConnectedDataSources = async () => {
            await dispatch(getConnectedDataSources());
        }
        if (props.show) {
            loadSubscriptionData();
            loadConnectedDataSources();
        }
    }, [props.show]);

    return (
        <div className={`modal-container ${props.show ? "visible" : ""}`}>
            <div className="modal-overlay" onClick={props.onHide} />

            <div className={`f_modal ${props.show ? "f_active" : ""}`}>
                <div className="d-flex d-flex justify-content-end">
                    <div className="close-icon" onClick={props.onHide}></div>
                </div>

                <h4
                    style={{ fontSize: "16px" }}
                    className="text-center modals-top-title"
                >
                    Subscription Plan
                </h4>

                <div style={{ marginTop: "40px" }} className="modal_body">
                    <div className="cards d-flex gap-3 subs-plane-card-box">
                        <div className="col card_item">
                            <h6>Current</h6>
                            <h5>{subscriptionInfo?.subscription_name}</h5>
                            <button onClick={props.onClick}>{actionBtnTitle}</button>
                        </div>
                        <div className="col card_item">
                            <h6>Next Bill Amount</h6>
                            <h5> {subscriptionInfo?.formatted_status === "Cancelled" ? "$0" : subscriptionInfo?.subtotal_formatted} </h5>
                        </div>
                        <div className="col card_item">
                            <h6>{subscriptionInfo?.formatted_status === "Cancelled" ? "Subscription End Date" : "Next Bill Date"} </h6>
                            <h5> {subscriptionInfo?.formatted_status === "Cancelled" ? subscriptionInfo?.end_at?.slice(0, 10) : subscriptionInfo?.renews_at?.slice(0, 10)} </h5>
                        </div>
                    </div>
                    <div className="desc subs-plane-info-box">
                        <h6>Your usage</h6>
                        <ul>
                            <li>
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="19"
                                        height="19"
                                        viewBox="0 0 19 19"
                                        fill="none"
                                    >
                                        <rect width="19" height="19" rx="9.5" fill="#35898D" />
                                        <path
                                            d="M7 10.0769L8.66667 12L13 7"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                                <span>
                                    {" "}
                                    You have so far connected to <b>{connectedSources?.connected_sources?.length}</b> data sources - {connectedSources?.connected_sources?.join(", ")}.{" "}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="actionBtns align-items-center d-flex gap-3 mt-4">
                        <button className="up" onClick={props.onClick}>
                            {actionBtnTitle}
                        </button>
                        <button className="cancel" onClick={() => { setVisiblePopupMessage(true) }}>Cancel Auto-renewal</button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}>
                        <span style={{ paddingTop: '20px' }}>
                            {" "}
                            Questions? <Link href={routes.contactUs}><b> Contact us.</b>{" "}</Link>
                        </span>
                    </div>
                </div>
            </div>
            <PopupMessage
                btnTitle={"Yes"}
                isDangerBtn={true}
                isVisiblePopupMessage={isVisiblePopupMessage}
                popupMessageBtnHandler={async () => {
                    try {
                        const res = await axios.delete(
                            `/api/accounts/cancelSubscription?subscription_id=${subscriptionInfo.subscription_id}`,
                            REQUEST_HEADERS
                        );
                        if (res.status === 200) {
                            successToaster(res?.data?.success);
                            setVisiblePopupMessage((prev) => !prev);
                        } else {
                            errorToaster(res?.data?.error);
                        }
                    } catch (error) {
                        console.error("Error:", error);
                        errorToaster("An error occurred while attempting to cancel subscription.");
                    }
                }}

                setVisiblePopupMessage={setVisiblePopupMessage}
                popupMessage={"Canceling your subscription will halt our services. Are you certain you wish to proceed?"}
            />
        </div >
    );
};

export default SubscriptionModal;
