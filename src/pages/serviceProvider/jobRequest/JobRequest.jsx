import React, { useState, useEffect } from 'react';

import './JobRequest.css'; // Import the CSS file

import JobRequestItem from "@/components/JobRequestItem/JobRequestItem.jsx";
import JobHeader from "@/components/jobheader/JobHeader.jsx";
import { Button } from "@/components/ui/button.jsx";
import HelpWanted from "@/components/helpwanted/HelpWanted.jsx";
import Header from '../../../components/header/Header.jsx';

function JobRequest() {
	const [showAllItems, setShowAllItems] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [ServiceRequest, setServiceRequest] = useState([]);
	const [SystemWide, setSystemWide] = useState([]);

	

	useEffect(() => {
		const fetchServiceRequests = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					throw new Error("No token found");
				}

				const response = await fetch(
					"http://localhost:8081/api/v1/service/serviceRequests",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					if (response.status === 401) {
						throw new Error("Unauthorized access");
					} else {
						throw new Error("Failed to fetch data");
					}
				}

				const data = await response.json();
				console.log(data);
				setServiceRequest(data);
			} catch (error) {
				console.error("Error fetching service requests:", error.message);
			}
		};

		const fetchSystemWide = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					throw new Error("No token found");
				}

				const response = await fetch(
					"http://localhost:8081/api/v1/service/system-wide",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					if (response.status === 401) {
						throw new Error("Unauthorized access");
					} else {
						throw new Error("Failed to fetch data");
					}
				}

				const data = await response.json();
				
				setSystemWide(data);
			} catch (error) {
				console.error("Error fetching system-wide data:", error.message);
			}
		};

		fetchServiceRequests();
		fetchSystemWide();
	}, []);
	const handleReadMore = () => {
		setShowAllItems(!showAllItems);
	
	};
	const handleSearch = (query) => {
		setSearchQuery(query);
	};



	return (
		<>
			<Header />
			<div className='job-container'>
				<div className='center-content'>
					<JobHeader onSearch={handleSearch} />
				</div>
				<div className='job-request'>
					<h2 className='font-bold text-[25px] mb-7'>My Job requests</h2>
					<div className='track-job'>
						<h3 className='ml-[140px] py-2 font-bold text-[18px]'>
							Track recent job requests
						</h3>
						{ServiceRequest.length > 0 ? (
							<ul className='mb-7'>
								{ServiceRequest.map((ServiceRequest, index) => (
									<JobRequestItem
										key={index}
										ServiceRequest={ServiceRequest}
									/>
								))}
							</ul>
						) : (
							<p className='text-gray-500'>Nothing found</p>
						)}
						<div className='text-center'>
							{/* Added text-center class */}
							<Button
								className='read-more-button p-7 mb-7 bg-[#576E6A]'
								onClick={handleReadMore}
							>
								{showAllItems ? "Show Less" : "Read More"}
							</Button>
						</div>
					</div>
				</div>
				<div className='help-wanted mt-9'>
					<h2 className='font-bold text-[25px] mb-7'>Help wanted</h2>
					<div className='grid grid-cols-2 gap-1'>
						{SystemWide.map((SystemWide, index) => (
							<HelpWanted
								key={index}
								SystemWide={SystemWide}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default JobRequest;