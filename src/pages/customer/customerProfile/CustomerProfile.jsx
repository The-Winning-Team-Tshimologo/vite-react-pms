/** @format */

import Header from "@/components/header/Header";
import ProfessionalProfileCard from "@/components/professionalProfileCard/ProfessionalProfileCard";
import React from "react";
import { useParams } from "react-router";

const CustomerProfile = () => {
	const { id, id2 } = useParams();

	return (
		<div className='profile__container'>
			<Header />
			<div className='review-carousel__container'>
				(
				<ProfessionalProfileCard
					useButtons={true}
					useDocs={false}
					useServiceDetails={true}
					id={id}
					id2={id2}
				/>
				)
			</div>
		</div>
	);
};

export default CustomerProfile;
