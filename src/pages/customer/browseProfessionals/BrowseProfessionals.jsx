import React, { useState, useEffect } from "react";
import "./BrowseProfessionals.css";
import { Button } from "@/components/ui/button";
import ProfileCard from "./ProfileCard";
import { useNavigate } from "react-router";
import TrackActivity from "./TrackActivity";
import Header from "@/components/header/Header";
// import { fetchUsersByRole } from "@/utils/fetchUsersByRole";

const BrowseProfessionals = () => {
	const navigate = useNavigate();
	const [profiles, setProfiles] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Retrieve the token from local storage
				const token = localStorage.getItem("token");

				// Make the HTTP request to your backend endpoint
				const response = await fetch(
					"http://localhost:8081/api/v1/service-providers/browse",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				// Check if the request was successful
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}

				// Parse the response JSON
				const data = await response.json();
				console.log(data);

				// Update the state variable with the fetched data
				setProfiles(data);
			} catch (error) {
				// Handle any errors that occur during the fetch process
				setError(error.message);
			}
		};

		// Call the fetchData function when the component mounts
		fetchData();
	}, []); // Empty dependency array to ensure useEffect runs only once when component mounts

	const handleClick = (selectedProfile) => {
		
		navigate(
			`/sp-profile/${selectedProfile.userId}/${selectedProfile.userName}`
			
		);
	};




	return (
		<>
			<Header />

			<TrackActivity/>
			{/* Add means of checking whether there are activities to showcase or not */}
			{/* <TrackActivity /> */}
			<div className='BrowseProfessionals'>
				<h2> Browse Professionals</h2>
				<div className='profile-container'>
					{profiles.map((profile, index) => (
						<ProfileCard
							key={index}
							profile={profile}
							handleClick={handleClick}
						/>
					))}
				</div>

				<div className='flex justify-center margin-center w-96'>
					<Button variant='custom'>Log Issue</Button>
				</div>
			</div>
		</>
	);
};

export default BrowseProfessionals;
