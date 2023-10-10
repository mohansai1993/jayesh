import React from 'react'
import { FaCheck } from "react-icons/fa";

const AboutSection = () => {
  return (
    <div className='about py-110 pt-4'>
        <div className='col-lg-6 col-md-6 col-11 mx-auto text-center'>
            <h3 className='f-40 bold-font mb-4'>Why Should I Choose <span className='text-main'>Adzviser?</span></h3>
            <p className='f-16 regular-font'>While Supermetrics can be costly and complex for many digital marketers to configure, Adzviser simplifies the process. With its natural language understanding feature, Adzviser makes data extraction and analysis accessible and straightforward, even for those without technical expertise or prior experience.</p>
        </div>
        <div className='row m-0 mt-5 px-100'>
            <div className='col-lg-4 col-md-4 col-12 mb-3 px-lg-4 px-md-4 px-2'>
                <div className="tipBox d-flex bg-white p-4 border-r-10 mb-4">
                    <div>
                        <span className="num-icon all-center text-main fw-bold"><FaCheck/></span>
                    </div>
                    <div className=" ms-4">
                        <h5 className='bold-font f-16'>Quick and easy to use</h5>
                        <p className="f-16 regular-font">Say goodbye to excessive clicking and mousing on Google Sheets extensions. Type your mind and fetch your data effortlessly.</p>
                    </div>
                </div>
            </div>
            <div className='col-lg-4 col-md-4 col-12 mb-3 px-lg-4 px-md-4 px-2'>
                <div className="tipBox d-flex bg-white p-4 border-r-10 mb-4">
                    <div>
                        <span className="num-icon all-center text-main fw-bold"><FaCheck/></span>
                    </div>
                    <div className=" ms-4">
                        <h5 className='bold-font f-16'>Direct Integration with ChatGPT</h5>
                        <p className="f-16 regular-font">Reporting, validating hypothesis and analyzing data has never been made so easy. Don't use yesterday's tool to answer today's questions.</p>
                    </div>
                </div>
            </div>
            <div className='col-lg-4 col-md-4 col-12 mb-3 px-lg-4 px-md-4 px-2'>
                <div className="tipBox d-flex bg-white p-4 border-r-10 mb-4">
                    <div>
                        <span className="num-icon all-center text-main fw-bold"><FaCheck/></span>
                    </div>
                    <div className=" ms-4">
                        <h5 className='bold-font f-16'>Multi-channel connections</h5>
                        <p className="f-16 regular-font">While we offer fewer data source connections than Supermetrics, we're expanding our integrations. Your feedback is vital; tell us your crucial connections, and we'll prioritize.</p>
                    </div>
                </div>
            </div>
            <div className='col-lg-4 col-md-4 col-12 offset-lg-2 px-lg-4 px-md-4 px-2'>
                <div className="tipBox d-flex bg-white p-4 border-r-10 mb-4">
                    <div>
                        <span className="num-icon all-center text-main fw-bold"><FaCheck/></span>
                    </div>
                    <div className=" ms-4">
                        <h5 className='bold-font f-16'>Affordable and simple pricing</h5>
                        <p className="f-16 regular-font">You only pay for what you use. No additional costs, no wasted resources. Every penny spent is directly utilized.</p>
                    </div>
                </div>
            </div>
            <div className='col-lg-4 col-md-4 col-12 px-lg-4 px-md-4 px-2'>
                <div className="tipBox d-flex bg-white p-4 border-r-10 mb-4">
                    <div>
                        <span className="num-icon all-center text-main fw-bold"><FaCheck/></span>
                    </div>
                    <div className=" ms-4">
                        <h5 className='bold-font f-16'>Data security in check</h5>
                        <p className="f-16 regular-font">It allows quick and easy access to your proprietary data. Say goodbye to writing platform-specific custom queries.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutSection;
