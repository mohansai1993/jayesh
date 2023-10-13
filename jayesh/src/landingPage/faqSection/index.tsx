import React from 'react'
import { routes } from 'utils';
import Link from "next/link";

const FaqSection = () => {
    return (
        <div className='faq py-110'>
            <div className='text-center'>
                <h3 className='f-40 bold-font'>Frequently Asked Questions</h3>
            </div>
            <div className='px-100 py-110 pb-0'>
                <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                How can I install the Adzviser ChatGPT Plugin?
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div className="accordion-body">
                                Please refer to our installation <Link href={routes.tutorial}>tutorial</Link>.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                What safeguards does Adzviser have in place to ensure security?
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                            <div className="accordion-body">
                                At Adzviser, we prioritize your data security above all else. Leveraging state-of-the-art encryption and storage solutions, we ensure that your sensitive information is protected at every stage of transmission and processing. Our security measures include -
                                <ol>
                                    <li><strong>Secure Storage:</strong> All sensitive data with regard to your connected accounts are stored in a highly secure and compliant environment with leading industry partners. This includes access controls, regular security audits, and multi-layered security protocols.</li>
                                    <li><strong>Regular Monitoring and Compliance:</strong> Our systems are continuously monitored for any suspicious activities, and we adhere to internationally recognized security standards and regulations. More can be found in Terms and Conditions.</li>
                                    <li><strong>Exclusive Access Control:</strong> No one but yourself has access to your data. We've implemented measures that ensure that your sensitive information is encrypted throughout the process and cannot even seen by us.</li>
                                </ol>
                            </div>

                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                Can I trust my data with ChatGPT?
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                            <div className="accordion-body">
                                Trusting your data with ChatGPT is a consideration that requires understanding both the potential risks and benefits. Like other popular data destinations such as Looker Studio or Google Sheets, ChatGPT offers tremendous productivity advantages but comes with certain considerations:
                                <ol>
                                    <li><strong>Visibility to OpenAI:</strong> While data entered into ChatGPT doesn't become publicly available, it might be visible to very few people at OpenAI, the organization behind the technology.</li>
                                    <li><strong>Cybersecurity Considerations:</strong> Although there have been no known instances of membership inference attacks or breaches, the theoretical risk does exist. OpenAI is actively working to limit access to personal and sensitive data.</li>
                                    <li><strong>Rapid Growth and Regulation:</strong> With the unprecedented and rapid expansion of ChatGPT, aligning with regulations and closing potential security gaps is an ongoing process. The technology is still young, and certain vulnerabilities might exist.</li>
                                    <li><strong>Balancing Risks and Rewards:</strong> Like any innovative technology, using ChatGPT involves balancing potential risks with the considerable benefits it can bring to your productivity. The decision should be guided by an understanding of your specific needs, the value that ChatGPT can add to your processes, and a thoughtful evaluation of the associated risks.</li>
                                    In conclusion, while ChatGPT operates with security measures in place, like any tool or platform handling data, there is an inherent level of risk. Your decision to trust your data with ChatGPT should weigh these factors against the considerable productivity gains that the service can provide.
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                                Why did the team build Adzviser?
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                            <div className="accordion-body">
                                We built Adzviser in response to a clear gap in the market for accessible and cost-effective marketing visualization tools. Many existing solutions, whether they involve extensions for Excel or Google Sheets, or pipelining data from data warehouses like Big Query to visualization endpoints such as Tableau or Looker Studio, entail a level of technical complexity that can be daunting.
                                <br />
                                <br />

                                Our founder's experience as a software engineer at Google Ads, working on various dashboards with limited flexibility, further highlighted this challenge. He found the process of creating marketing visualizations for one-off requests or specific pipelines cumbersome and unsatisfying.
                                Fueled by a desire to simplify this process and make it more user-friendly, he left his position to create Adzviser. Our goal was to provide a better tool that eliminates unnecessary technical hurdles without compromising functionality. By focusing on ease of use and affordability, we've developed a solution that we believe truly meets the needs of today's marketing professionals.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">
                                What is a workspace?
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
                            <div className="accordion-body">
                                A workspace in the context of Adzviser is a unified grouping of your various marketing accounts. Think of it as a personalized hub that consolidates different platforms such as Google Ads, Facebook Ads, LinkedIn Ads, Google Analytics, Bing Ads, and more, all under one umbrella.
                                <br />
                                <br />
                                For example, if you have a customer like Glamour Grove with accounts across these platforms, you can create a dedicated workspace for them. The advantage of this approach is efficiency and ease of access. Want to know how much was spent last month for Glamour Grove? Simply ask Adzviser "How much did I spend for Glamour Grove last month", and it will pull data from all the accounts within that workspace, providing you with a comprehensive view at once. If you need more specific information, such as the expenditure on Google Ads alone, you can refine your question accordingly.
                                <br />
                                <br />
                                By grouping accounts into one workspace, you have a streamlined way to manage, query, and analyze your marketing data, offering a more organized and user-friendly experience.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingSix">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false" aria-controls="panelsStayOpen-collapseSix">
                                How can I request a refund?
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseSix" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSix">
                            <div className="accordion-body">
                                We seek your full satisfaction with our Services. However, if you are not satisfied with our Services, you may cancel the Subscription and request a refund within thirty (30) days following your purchase of our Services (“Money Back Guarantee”). More can be found in our <Link href={routes.refund}>refund policy</Link>.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingSeven">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSeven" aria-expanded="false" aria-controls="panelsStayOpen-collapseSeven">
                                How can I upgrade or downgrade my subscription?
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseSeven" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSeven">
                            <div className="accordion-body">
                                If you wish to upgrade or downgrade your subscription, we've made the process simple for you. Just <Link href={routes.contactUs}>reach out to us</Link> through the provided form, and our team will assist you with the necessary adjustments.
                                <br />
                                <br />
                                Please be aware that when upgrading or downgrading your subscription, a prorated charge or refund may apply, reflecting the changes in your service level. We're committed to making this process as smooth and transparent as possible, so don't hesitate to contact us with any questions or concerns.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FaqSection;
