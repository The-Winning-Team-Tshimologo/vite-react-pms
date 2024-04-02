import React from "react";
import Header from "../../components/landingPageHeader/Header";
import Hero from "../../components/hero/Hero";
import Service from "../../components/service/Service";
import Testimonial from "../../components/testimony/Testimonial";
import Footer from "../../components/footer/Footer";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Service />
      <Testimonial />
      <Footer />
    </>
  );
};

export default LandingPage;
