import React from "react";
import MainLayout from "../hocs/mainLayout";
import ActionSection from "../landingPage/actionSection";
import BannerSection from "../landingPage/bannerSection";
import ProductSection from "../landingPage/productSection";
import PriceSection from "../landingPage/priceSection";
import AboutSection from "../landingPage/aboutSection";
import ConnectionSection from "landingPage/connectionSection";
import FaqSection from "landingPage/faqSection";
const LandingPage = () => {
  return (
    <MainLayout title="Adzviser | Chatbot for Marketers" content="We strive to help marketers make better, faster data-driven decisions. With Adzviser, you can reach an understanding of your marketing performance without any engineering.">
      <BannerSection />
      <ProductSection />
      <PriceSection />
      <AboutSection />
      <ConnectionSection />
      <FaqSection />
      <ActionSection />
    </MainLayout >
  );
};

export default LandingPage;
