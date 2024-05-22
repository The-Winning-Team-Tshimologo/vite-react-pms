/** @format */

import Header from "@/components/header/Header";
import ProfessionalProfileCard from "@/components/professionalProfileCard/ProfessionalProfileCard";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import download from '../../../assets/download.jpeg'

const CustomerProfile = () => {
  const { id, id2 } = useParams();

  // ADDED PROFILE CODE
//   const [data, setData] = useState(null);
const [data, setData] = useState({
	"title": "Plumber",
	"appointedFor": "05/02/24",
	"description": "OMG my geyser is leaking 😲 when can you come wix the fix the geyser?",
	"images": [
		download,
		download,
		download
	]
  });

//   useEffect(() => {
//     fetch("rest api")
//       .then((response) => response.json())
//       .then((data) => setData(data));
//   }, []);

  //   if (!data) return <div>Loading...</div>;

  // END

  return (
    <div className="profile__container">
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

<div className="service-request">
      <label className="main-label">Service Request Details</label>
	  {/* <br/> */}
      <div className="details mt-5">
        <div className="row">
          <div className="column title">
            <label>Title</label>
            <div>{data.title}</div>
          </div>
          <div className="column appointed-for">
            <label>Appointed for</label>
            <div>{data.appointedFor}</div>
          </div>
        </div>
        <div className="description">
          <label>Description</label>
          <div>{data.description}</div>
        </div>
      </div>
	  <label>Service Request Images</label>

      <div className="images mt-2">
	 
        {data.images.map((image, index) => (
          <img key={index} src={image} alt={`service-request-${index}`} />
        ))}
      </div>
      <button className="accept-button">Accept Request</button>
    </div>
    </div>
  );
};

export default CustomerProfile;
