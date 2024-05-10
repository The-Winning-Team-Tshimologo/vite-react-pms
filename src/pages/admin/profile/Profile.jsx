/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "@/components/header/Header";
import ProfessionalProfileCard from "@/components/professionalProfileCard/ProfessionalProfileCard";
import ReviewSummary from "@/components/reviewSummary/ReviewSummary";
import ReviewCarouselCard from "@/components/reviewCarouselCard/ReviewCarouselCard";


const Profile = () => {
	const { id, review } = useParams();


	return (
	
			<div className='profile__container'>
				<Header />
				<div className='review-carousel__container'>
					{review ? (
						<ProfessionalProfileCard
							useButtons={false}
							useDocs={true}
							// useServiceDetails
							
							id={id}
						/>
					) : (
						<>
							<ProfessionalProfileCard
								useButtons={true}
								id={id}
							/>
							<ReviewSummary />
							<ReviewCarouselCard />
						</>
					)}
				</div>
		
			</div>
	
	);
};

export default Profile;
