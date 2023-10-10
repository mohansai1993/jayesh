
import Slider from '@mui/material/Slider';
import { useState, useCallback } from "react";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";
import { BiHelpCircle } from 'react-icons/bi';
import { routes, combinedMonthlyAndYearlyDues } from "../../utils";

const formattedMonthlyDues = [0, ...combinedMonthlyAndYearlyDues.monthly].map(due => `$${due} / month`);
const formattedYearlyDues = [0, ...combinedMonthlyAndYearlyDues.yearly].map(due => `$${due} / year`);


const PriceSection = () => {
    const [numberOfConnections, setNumberOfConnections] = useState(1);
    // 0 represents monthly, 1 represents yearly
    const [tab, setTab] = useState(0);

    const features = [
        "Unlimited queries",
        "Unlimited workspaces",
        "Unlimited accounts per data source",
        "Preserved data privacy",
        "Plugin access on ChatGPT",
        "No data analytics experience required"
    ];

    return (
        <div id="price" className="price">
            <div className="row m-0 py-110">
                <div className="col-lg-8 col-md-9 col-12 mx-auto">
                    <div className="text-center">
                        <h3 className="f-40">Simple, Connection-based Pricing</h3>
                        <p className="f-16 mt-3 medium-font text-gray">Sign up for 1 data source unlimited trial. No credit card required.</p>
                    </div>
                    <div className="bg-white border-r-10 p-lg-5 p-md-5 p-3 mt-5">
                        <div className="priceBtn text-center">
                            <div className='d-flex mx-auto'>
                                {['Monthly Billing', 'Yearly Billing'].map((label, index) => (
                                    <button key={label} className={`btn ${tab === index ? 'active' : ''}`} onClick={() => setTab(index)}>{label}</button>
                                ))}
                            </div>
                        </div>
                        <div className="btn">
                            {tab === 0 && <PriceInfo numberOfConnections={numberOfConnections} tab={tab} />}
                            {tab === 1 && <PriceInfo numberOfConnections={numberOfConnections} tab={tab} />}

                            <SliderComponent setNumberOfConnections={setNumberOfConnections} />
                            <div className="priceBox-text p-4 mt-5">
                                <div className="d-flex priceBox-heading pb-3">
                                    <span className="warnIcon all-center">i</span>
                                    <h5 className="f-14 my-auto ms-3">WHAT'S INCLUDED</h5>
                                </div>
                                <div className="row m-0 mt-3">
                                    {features.map((feature, index) => (
                                        <FeatureItem key={feature} feature={feature} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-lg-5 mt-md-5 mt-3">
                        <Link href={routes.signup}>
                            <button className="f-14 px-4 btn btn-main py-2">Start Your Free Trial</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PriceInfo = ({ numberOfConnections, tab }) => (
    <div className="d-flex justify-content-between m-0 pt-3 mb-4">
        <div className="p-0 text-center">
            <span className="f-12">Number of data sources</span>
            <span className="f-25 bold-font d-block">{numberOfConnections}</span>
        </div>
        <div className="p-0 text-end">
            <span className="f-12">Your Price</span>
            <span className="f-25  bold-font ms-5 d-block text-main">{tab === 0 ? formattedMonthlyDues[numberOfConnections] : formattedYearlyDues[numberOfConnections]}</span>
        </div>
    </div>
);

const SliderComponent = ({ setNumberOfConnections }) => {
    const handleChange = useCallback((event, value) => {
        setNumberOfConnections(value);
    });

    return (
        <div>
            <Slider
                aria-label="Custom marks"
                onChange={handleChange}
                defaultValue={1}
                min={1}
                max={6}
                valueLabelDisplay="auto"
            />
        </div>
    );
};

const FeatureItem = ({ feature }) => (
    <div className="col-lg-4 col-md-4 col-12 d-flex p-0 mb-4 text-start fs-14">
        <div className=' my-auto'>
            <span className="num-icon all-center text-main fw-bold"><FaCheck /></span>
        </div>
        <span className="ms-3 my-auto">{feature}</span>
        {feature === "Unlimited workspaces" && (
            <div className='f-20 ms-2 my-auto helpCircle'>
                <BiHelpCircle />
                <span>A workspace helps you organize clients' cross channel accounts.</span>
            </div>)
        }

    </div>
);

export default PriceSection;