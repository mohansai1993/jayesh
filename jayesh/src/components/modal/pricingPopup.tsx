import Script from "next/script";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { routes } from "utils";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSubscriptionInfoReducer } from "../../reducers/subscriptionInfo";
import { AppDispatch } from "../../store";
import { getSubscriptionData } from "../../actions/subscription";
import { combinedMonthlyAndYearlyDues } from "../../utils";

interface ModalPropsInterface {
    show: boolean;
    onHide?: () => void;
    children?: React.ReactNode;
    btnTitle?: string;
    subscriptionPaymentMonthly: boolean;
    btnType?: "button" | "submit" | "reset";
    isDisabled?: boolean;
    setSubscriptionPaymentMonthly: Dispatch<SetStateAction<boolean>>;
}

const PricingModal = (props: ModalPropsInterface) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const [dues, setDues] = useState(combinedMonthlyAndYearlyDues.monthly);
    const { subscriptionInfo } = useSubscriptionInfoReducer();
    const actionTitle = subscriptionInfo?.formatted_status === "Cancelled" || subscriptionInfo?.formatted_status === "Expired" ? "Resubscribe" : "Upgrade";
    const dispatch: AppDispatch = useDispatch();

    let paymentLink;

    if (process.env.NODE_ENV === "production") {
        paymentLink = props.subscriptionPaymentMonthly
            ? "https://adzviser.lemonsqueezy.com/checkout/buy/120d0d53-1993-4706-a1ce-215bd2d0b60d?embed=1&media=0"
            : "https://adzviser.lemonsqueezy.com/checkout/buy/74ce3baa-6984-48ce-8b51-f79bf65c0973?embed=1&media=0";
    } else {
        paymentLink = props.subscriptionPaymentMonthly
            ? "https://adzviser.lemonsqueezy.com/checkout/buy/91431120-3be7-4c9b-9f06-9db4be4cc5d8?embed=1&media=0"
            : "https://adzviser.lemonsqueezy.com/checkout/buy/e42b411f-8fa5-4af2-992e-23920bc9a4bc?embed=1&media=0";
    }

    useEffect(() => {
        if (props.subscriptionPaymentMonthly) {
            setDues(combinedMonthlyAndYearlyDues.monthly);
        } else {
            setDues(combinedMonthlyAndYearlyDues.yearly);
        }
    }, [props.subscriptionPaymentMonthly])

    useEffect(() => {
        const loadSubscriptionData = async () => {
            await dispatch(getSubscriptionData());
        }
        if (props.show) {
            loadSubscriptionData();
        }
    }, [props.show])

    const handleModalHide = () => {
        setSelectedItemIndex(null);
        if (props.onHide) {
            props.onHide();
        }
    };

    return (
        <div className={`modal-container ${props.show ? "visible" : ""}`}>
            <div className="modal-overlay" onClick={() => handleModalHide()} />

            <div className={`s_modal ${props.show ? "s_active" : ""}`}>

                <div className="d-flex d-flex justify-content-end">
                    <div className="close-icon" onClick={() => handleModalHide()}></div>
                </div>

                <h4 style={{ fontSize: "16px" }} className="text-center  modals-top-title">
                    {actionTitle} Your {subscriptionInfo?.subscription_name}
                </h4>

                <div className="modal_body upgrade-plane-box"
                >
                    <div className="frist upgrade-plane-left-cont">
                        <div className="switcher">
                            <button
                                className={`monthly ${props.subscriptionPaymentMonthly ? "active" : ""
                                    }`}
                                onClick={() => { props.setSubscriptionPaymentMonthly(true) }}
                            >
                                Monthly Billing
                            </button>
                            <button
                                className={`yearly ${props.subscriptionPaymentMonthly === false ? "active" : ""
                                    }`}
                                onClick={() => { props.setSubscriptionPaymentMonthly(false) }}
                            >
                                Yearly Billing
                            </button>
                        </div>
                        <table className="pricing_table">
                            <thead>
                                <tr>
                                    <th>Number of data sources</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dues.map((item, index) => (
                                    <tr key={index} className={selectedItemIndex === index ? "selected--color" : ""}
                                        onClick={() => setSelectedItemIndex(index)}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {props.subscriptionPaymentMonthly
                                                ? "$" + item + "/month"
                                                : "$" + item + "/year"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-between align-items-center mt-3 footer_content">
                            <a href={paymentLink} className="lemonsqueezy-button">
                                <button>PAY</button>
                            </a>
                            <Script
                                src="https://assets.lemonsqueezy.com/lemon.js"
                                strategy="lazyOnload"
                                onLoad={() =>
                                    // @ts-ignore
                                    window.createLemonSqueezy()
                                }
                            />

                            {selectedItemIndex !== null ? (
                                <p>Due Today: $
                                    {dues[selectedItemIndex]}
                                    + VAT if applicable
                                </p>
                            ) :
                                <p>Due Today: $0 VAT if applicable
                                </p>
                            }
                        </div>
                    </div>
                    <div className="second upgrade-plane-right-cont">
                        <h5>
                            What if I want to upgrade my current paid subscription?
                        </h5>
                        <p className="h-auto">
                            If you're currently on a paid subscription plan and decide to
                            upgrade, we'll adjust your charges on a prorated basis for the
                            remainder of the current billing cycle. Please <Link href={routes.contactUs}><b>contact us</b>{" "}</Link> to upgrade.
                        </p>

                        <h5 className="mt-4">
                            Can I modify the payment method for my current subscription?
                        </h5>
                        <p className="h-auto">
                            To update your payment method, please follow <Link href={subscriptionInfo?.update_payment_method_url ? subscriptionInfo.update_payment_method_url : "#"}><b>this link</b>{" "}</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingModal;
