import React from 'react'
import Image from "next/image";
import { Colors } from "../../../public/assets/colors";
import images from "../../utils/images";

const ConnectionSection = () => {
  return (
    <div id = "connections" className='connection text-center py-110'>
        <h3 className='f-40 pt-lg-0 pt-md-0 pt-4 text-white'>Connections</h3>
        <p className='f-16 mt-2 text-white regular-font'>Quickly bring distributed metrics and dimensions together to access.</p>
        <div className='row m-0 px-100 justify-content-center mt-5'>
            <div className='col-lg-2 col-md-2 col-6 mb-lg-0 mb-md-0 mb-4'>
                <div className='con-card bg-white py-5 border-r-10'>
                    <Image src={images.adwordsLogo} alt='' className='mb-4' />
                    <span className='d-block'>Google Ads</span>
                </div>
            </div>
            <div className='col-lg-2 col-md-2 col-6 mb-lg-0 mb-md-0 mb-4'>
                <div className='con-card bg-white py-5 border-r-10'>
                    <Image src={images.searchConsole} alt='' className='mb-4' />
                    <span className='d-block'>Google Search Console</span>
                </div>
            </div>
            <div className='col-lg-2 col-md-2 col-6 mb-lg-0 mb-md-0 mb-4'>
                <div className='con-card bg-white py-5 border-r-10'>
                    <Image src={images.ga4} alt='' className='mb-4' />
                    <span className='d-block'>Google Analytics</span>
                </div>
            </div>
            <div className='col-lg-2 col-md-2 col-6 mb-lg-0 mb-md-0 mb-4'>
                <div className='con-card bg-white py-5 border-r-10'>
                    <Image src={images.facebook} alt='' className='mb-4' />
                    <span className='d-block'>Facebook Ads</span>
                </div>
            </div>
            <div className='col-lg-2 col-md-2 col-6 mb-lg-0 mb-md-0 mb-4'>
                <div className='con-card bg-white py-5 border-r-10'>
                    <Image src={images.facebook} alt='' className='mb-4' />
                    <span className='d-block'>Facebook Insights</span>
                </div>
            </div>
            <div className='col-lg-2 col-md-2 col-6 mb-lg-0 mb-md-0 mb-4'>
                <div className='con-card bg-white py-5 border-r-10'>
                    <Image src={images.bingAds} alt='' className='mb-4' />
                    <span className='d-block'>Microsoft Bing Ads</span>
                </div>
            </div>
            <div className='col-lg-2 col-md-2 col-6 mb-lg-0 mb-md-0 mb-4 mt-4'>
                <div className='con-card bg-white py-5 border-r-10'>
                    <Image src={images.linkedin} alt='' className='mb-4' />
                    <span className='d-block'>Coming Soon</span>
                </div>
            </div>
            <div className='col-lg-2 col-md-2 col-6 mb-lg-0 mb-md-0 mb-4 mt-4'>
                <div className='con-card bg-white py-5 border-r-10'>
                    <Image src={images.apple} alt='' className='mb-4' />
                    <span className='d-block'>Coming Soon</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConnectionSection;
