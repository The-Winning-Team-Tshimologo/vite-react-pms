/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

const TrackActivity = () => {
	const [serviceData, setServiceData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [activeTab, setActiveTab] = useState("acceptedPending");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(6);

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
				// setServiceData(response.data.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)));
				setServiceData(response.data.sort((a, b) => b.id - a.id));

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

	const handleTabClick = (tab) => {
		setActiveTab(tab);
		setCurrentPage(1); // Reset to the first page when the tab changes
	};

	const filterData = () => {
		switch (activeTab) {
			case "acceptedPending":
				return serviceData.filter(
					(service) =>
						service.status === "ACCEPTED" || service.status === "PENDING"
				);
			case "rejected":
				return serviceData.filter((service) => service.status === "REJECTED");
			case "completed":
				return serviceData.filter((service) => service.status === "ACCEPTED" && service.completed === true);
			default:
				return serviceData;
		}
	};

	const filteredData = filterData();
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className='TrackActivity'>
			<h2 className='px-10'>Track Activity</h2>
			<div className="tabs">
				<button
					className={activeTab === 'acceptedPending' ? 'active' : ''}
					onClick={() => handleTabClick('acceptedPending')}>Accepted / Pending</button>
				<button
					className={activeTab === 'rejected' ? 'active' : ''}
					onClick={() => handleTabClick('rejected')}>Rejected</button>
				{/* <button
					className={activeTab === 'completed' ? 'active' : ''}
					onClick={() => handleTabClick('completed')}>Completed</button> */}
			</div>
			{loading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			{currentItems.length === 0 && !loading && <p>No activity</p>}
			{currentItems.length > 0 && (
				<div className='profile-container'>
					{currentItems.map((service, index) => (
						<div
							className='TrackActivity__card'
							key={index}
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
			{/* Pagination */}
			{filteredData.length > itemsPerPage && (
				<div className='pagination'>
					{Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
						<button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
							{i + 1}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default TrackActivity;
