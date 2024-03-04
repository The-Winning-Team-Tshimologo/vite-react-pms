import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Hero from '@/components/hero/Hero'
import React from 'react'
import Service from "@/components/service/Service.jsx";
import Testimonial from "@/components/testimony/Testimonial.jsx";
import MyComponent from "@/components/testimony/MyComponent.jsx";

const LandingPage = () => {
  return (
   <>
  <Header/>
  <Hero/>
     <Service/>
       <Testimonial/>
  <Footer/>
   </>
  )
}

export default LandingPage