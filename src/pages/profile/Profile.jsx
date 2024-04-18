import Header from "@/components/header/Header";

import React from "react";
import "./Profile.css"
import ReviewCarouselCard from "@/components/reviewCarouselCard/ReviewCarouselCard";

const Profile = () => {
  return (
    <div className="profile__container">
      <Header />
      <div className="review-carousel__container">
        <ReviewCarouselCard />
      </div>
    </div>
  );
};

export default Profile;
