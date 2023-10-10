import { routes } from "utils";
import Layout from "../hocs/layout";
import Link from "next/link";

const RefundPolicyPage = () => {
    return (
        <Layout
            title="Adzviser | Refund Policy"
            content=""
        >
            <div className="refundPolicy">
                <div className="container">
                    <div>
                        <p className="c7 title" id="h.ia8083rly45r"><span className="c8 text-main">Money-back Policy</span></p>
                        <p className="c2"><span className="c3">Last updated Aug 10, 2023</span></p>
                        <p className="c2 c5"><span className="c3"></span></p>
                        <p className="c2"><span className="c3">Here is the refund and cancellation policy at the core of our 30-day money-back guarantee:</span></p>
                        <p className="c2 mt-3"><span className="c4">&quot;If you wish to claim a refund, you can do so within 30 days following your purchase of our Services. We do not grant refunds for recurring subscription payments if you cancel the Services after the renewal unless applicable law provides otherwise.&quot;</span></p>
                        <p className="c2 c5"><span className="c3"></span></p>
                        <p className="c2"><span>To receive a refund, please contact our customer support team at our </span><span className="c9"><Link className="c6" href={routes.contactUs}>customer support team</Link></span><span className="c3">.</span></p>
                        <p className="c2 c5"><span className="c3"></span></p>
                        <h1 className="c1" id="h.4vzorpcjm4k2"><span className="c0 text-main">Subscription Cancellation</span></h1>
                        <p className="c2"><span className="c3">You have a right to cancel your Subscription (i.e., turn off auto-renewals for the upcoming Service period) at any time (please note that canceled Subscriptions will not be refunded for the unused part of the ongoing Service period). </span></p>
                        <h1 className="c1" id="h.j643m1uunnz7"><span className="c0 text-main">Refund</span></h1>
                        <p className="c2"><span className="c3">We seek your full satisfaction with our Services. However, if you are not satisfied with our Services, you may cancel the Subscription and request a refund within thirty (30) days following your purchase of our Services (&ldquo;Money Back Guarantee&rdquo;). Please note that we do not grant Money Back Guarantee for the auto-renewed Subscription if you cancel the Subscription after the day of charge for such auto-renewal, unless applicable law provides otherwise. In any case, we would be glad to troubleshoot an issue you experienced before you decide to request a Money Back Guarantee. </span></p>
                        <h1 className="c1" id="h.rojydcwwl2nv"><span className="c0 text-main">Payment of Refund</span></h1>
                        <p className="c2"><span className="c3">Your request will be processed without any unreasonable delay and the refund will be paid using the same payment method as the one used for the purchase, except as otherwise mutually agreed, unless applicable law prohibits us or payment service providers we rely on from processing the refund. Payments made using prepaid cards or gift cards will not be refunded if such refund is not supported by the provider of the card. Once the refund is issued to you, you will lose access to the Services for which you were refunded. Refunds can take up to 10 days to appear on your bank statement.</span></p>
                        <h1 className="c1" id="h.vr7ppc5n9fgs"><span className="c0 text-main">Eligibility for Refund</span></h1>
                        <p className="c2"><span className="c3">You can only get a refund for each of our Services under the Money Back Guarantee twice. If you buy a particular Service again after the second refund for such Service, you will not be granted a Money Back Guarantee for any of its further cancellation. In case you cancel your Subscription at any time after the expiration of the respective Money Back Guarantee period, you shall be charged for the whole Subscription&#39;s duration (e.g., if you purchase an annual Subscription and you decide to cancel your Subscription after two (2) months, you will be charged the whole price, but once Subscription has ended, it will not be renewed).</span></p>
                        <p className="c2 c5"><span className="c3"></span></p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default RefundPolicyPage;