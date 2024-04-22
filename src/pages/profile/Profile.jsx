import Header from "@/components/header/Header";

import React from "react";
import "./Profile.css"
import ReviewCarouselCard from "@/components/reviewCarouselCard/ReviewCarouselCard";
import ReviewSummary from "@/components/reviewSummary/ReviewSummary";
import ProfessionalProfileCard from "@/components/professionalProfileCard/ProfessionalProfileCard";

const Profile = () => {
  return (
    <div className="profile__container">
      <Header />
      <div className="review-carousel__container">
        <ProfessionalProfileCard useButtons={true}/>
        <ReviewSummary/>
        <ReviewCarouselCard />
      </div>
    </div>
  );
};

export default Profile;
