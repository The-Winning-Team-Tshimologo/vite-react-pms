import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import JobRequestItem from "../JobRequestItem/JobRequestItem";
import axios from "axios";
import { useNavigate } from "react-router";


const ServiceReview = () => {
	const [serviceData, setServiceData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
  const navigate = useNavigate();
	const [itemsPerPage] = useState(6);
	const [currentPage, setCurrentPage] = useState(1);



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
          "http://localhost:8081/api/v1/service/customer/accepted-completed",
          config
        );
				setServiceData(response.data);
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

  const handleReview = (id) => {
    navigate("/review/"+id);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = serviceData.slice(indexOfFirstItem, indexOfLastItem);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className='TrackActivity'>
      <Header/>
			<h2 className='px-10'>Completed request</h2>
			{loading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			{currentItems.length === 0 && <p>No activity</p>}
			{currentItems.length > 0 && (
				<div className='profile-container'>
					{currentItems.map((service, index) => (
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
								<div className='service__status' onClick={()=>handleReview(service.id)}>
									<span
										style={{ backgroundColor: StatusColor(service.status) }}
									>
										{/* {service.status} */}
                    Write review
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

export default ServiceReview;
