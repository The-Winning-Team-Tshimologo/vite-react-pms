import Header from "@/components/header/Header";

import React, { useEffect, useState } from "react";
import "./Profile.css"
import ReviewCarouselCard from "@/components/reviewCarouselCard/ReviewCarouselCard";
import ReviewSummary from "@/components/reviewSummary/ReviewSummary";
import ProfessionalProfileCard from "@/components/professionalProfileCard/ProfessionalProfileCard";
import { useNavigate, useParams } from "react-router";

const Profile = () => {
  const{id,review}=useParams();

  return (
    <div className="profile__container">
      <Header />
      <div className="review-carousel__container">
         {review ?<ProfessionalProfileCard useButtons={false} useDocs ={true} id={id}/> :
         <>
          <ProfessionalProfileCard useButtons={true} id={id}/>
          <ReviewSummary/>
         <ReviewCarouselCard /> </> }        
      </div>
    </div>
  );
};

export default Profile;
