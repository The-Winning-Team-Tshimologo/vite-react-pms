
import React from "react";
import { MdOutlinePinDrop, MdQuestionMark } from "react-icons/md";
import ServiceRequest from "@/components/ServiceRequest/ServiceRequest";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const JobRequestItem = ({ ServiceRequest, fetchServiceRequests}) => {

	const navigate = useNavigate();


	useEffect(() => {
		
	});
 const handleAcceptRequest = async () => {
		const token = localStorage.getItem("token");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		try {
			const response = await axios.post(
				`http://localhost:8081/api/v1/service/accept/${ServiceRequest.serviceId}`,
				null,
				config
			);
			// Handle successful acceptance (e.g., show a success message)
			fetchServiceRequests();
			console.log("Request accepted:", response.data);
		} catch (error) {
			// Handle error (e.g., show an error message)
			console.error("Error accepting request:", error);
		}
 };

	const handleDecline = async () =>  {
		// Handle decline action
		const token = localStorage.getItem("token");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		try {
			const response = await axios.post(
				`http://localhost:8081/api/v1/service/decline/${ServiceRequest.serviceId}`,
				null,
				config
			);
			// Handle successful acceptance (e.g., show a success message)
			fetchServiceRequests();
			console.log("Request accepted:", response.data);
		} catch (error) {
			// Handle error (e.g., show an error message)
			console.error("Error accepting request:", error);
		}
	};

	const handleWithdraw = async () => {
		// Handle withdraw action
		const token = localStorage.getItem("token");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		try {
			const response = await axios.post(
				`http://localhost:8081/api/v1/service/withdraw/${ServiceRequest.serviceId}`,
				null,
				config
			);
			// Handle successful acceptance (e.g., show a success message)
			fetchServiceRequests();
			console.log("Request accepted:", response.data);
		} catch (error) {
			// Handle error (e.g., show an error message)
			console.error("Error accepting request:", error);
		}
	};	


	const handleClickEvent = () => {
		navigate(`/customer-profile/${ServiceRequest.serviceId}/${ServiceRequest.customer.userId}/${ServiceRequest.customer.username}/${ServiceRequest.status}`);
		console.log("clicked",ServiceRequest);
	};

	const handleReview = () => {
		navigate("/review/"+ServiceRequest.serviceId);
	  };

	

	return (
		<li className='personal-request'  >
			<div className='flex items-center h-auto' >
				<img
					src={`data:image/png;base64,${ServiceRequest.customer.profilePicture}`}
					alt='profile pic'
					className='w-[50px] h-[50px] mr-4 rounded-full'
				/>
				<div className='information-details-container justify-between flex-row '  >
					<div className='detail-container cursor-pointer' onClick={handleClickEvent}>
						<div className='ml-10 font-bold'>
							{ServiceRequest.customer.firstName}{" "}
							{ServiceRequest.customer.lastName}
							<br />
						</div>
						<div className='address-container'>
							<div className='address-job flex'>
								<MdOutlinePinDrop
									size={24}
									className='mt-[9px] mr-4'
								/>
								{ServiceRequest.address.streetName}
								<br />
								{ServiceRequest.address.city}
							</div>
							<div className='service-job flex'>
								<MdQuestionMark
									size={24}
									className='mr-4'
								/>{" "}
								<p className='mr-1'>Requesting </p>{" "}
								{ServiceRequest.category.name}
							</div>
							<div className={`serviceRequest-status ml-10 ${ServiceRequest.status}`}>{ServiceRequest.completed === true? "COMPLETED" : ServiceRequest.status}</div>
						</div>
					</div>
					<div className='two-buttons flex items-center space-x-2'>
						{ServiceRequest.status === "PENDING" && (
							<>
								<button
									className='status-button bg-[#008000] mr-[10px] p-[8px] text-white'
									onClick={handleAcceptRequest}
								>
									Accept
								</button>
								<button
									className='status-button bg-[#D9D9D9] p-[8px]'
									onClick={handleDecline}
								>
									Decline
								</button>
							</>
						)}
						{ServiceRequest.status === "ACCEPTED" && (
							 ServiceRequest.completed ? (
								<button
								  className="status-button bg-[#2C3639]  text-white p-[12px]"
								  onClick={handleReview}
								>
								  Write review
								</button>
							  ) : (
							<button
								className=' status-button bg-[#D9D9D9] mr-[15px] p-[12px]'
								onClick={handleWithdraw}
							>
								Withdraw
							</button>
							  )
						)}
						{ServiceRequest.status === "REJECTED" && (
							<button
								className=' status-button bg-[#D9D9D9] mr-[15px] p-[12px] opacity-50 cursor-not-allowed'
								disabled
							>
								Rejected
							</button>
						)}
					</div>
				</div>
			</div>
		</li>
	);
};

export default JobRequestItem;
