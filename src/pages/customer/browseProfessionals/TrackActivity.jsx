/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

const TrackActivity = () => {
	const [serviceData, setServiceData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await axios.get(
					"http://localhost:8081/api/v1/service/customer",
					config
				);
				setServiceData(response.data);
				console.log(response.data);
				setLoading(false);
			} catch (error) {
				setError("Failed to fetch data");
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const StatusColor = (serviceStatus) => {
		let statusColor = "";
		switch (serviceStatus) {
			case "ACCEPTED":
				statusColor = "green";
				break;
			case "REJECTED":
				statusColor = "red";
				break;
			case "PENDING":
				statusColor = "grey";
				break;
			default:
				statusColor = "transparent"; // Default color if status is not recognized
		}
		return statusColor;
	};

	return (
		<div className='TrackActivity'>
			<h2 className='px-10'>Track Activity</h2>
			{loading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			{serviceData.length === 0 && <p>No activity</p>}
			{serviceData.length > 0 && (
				<div className='profile-container'>
					{serviceData.map((service, index) => (
						<div
							className='TrackActivity__card'
							key={index}
							// onClick={() => {
							// 	handleClick(service);
							// }}
						>
							<div className='TrackActivity-header'>
								<img
									src={service.profilePicture}
									alt={`${service.firstName} ${service.lastName}`}
								/>
								<div>
									<p>
										{service.firstName} {service.lastName}
									</p>
									<p>Appointment:</p>
									<p>
										{service.appointmentDate ? (
											service.appointmentDate
										) : (
											<span style={{ color: "blue" }}>Book Appointment</span>
										)}
									</p>
								</div>
								<div className='service__status'>
									<span
										style={{ backgroundColor: StatusColor(service.status) }}
									>
										{service.status}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default TrackActivity;
