import React, { useEffect, useState } from "react";
import "./ProfessionalProfileCard.css";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";
import { useLocation } from "react-router"; // Import useParams hook
// import { useAuth } from "@/security/auth/AuthContext";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

// Mock data for professional's profile (this would typically be fetched from an API)
const professionalProfile = {
  name: "Sibusiso Mabaso",
  profession: "Plumber",
  location: "Johannesburg, Gauteng",
  reviewsCount: 10,
  projectsCompleted: 10,
  hourlyRate: 300,
  availability: ["Mon", "Tue", "Wed"],
  rating: 4,
  professionalSummary:
    "Efficient plumber with 7+ years of experience. Skilled in PEX and copper installation, repair, and maintenance...",
  experience: [
    {
      title: "Plumber",
      company: "Dickinson Elwood Plumbing",
      dateRange: "May 2013–May 2019",
      achievements: [
        "Worked in a high-volume plumbing business, completing 10–30 client calls per week.",
        "Installed new plumbing systems on 20+ $1M–$3M homes.",
      ],
    },
    {
      title: "Plumber",
      company: "Jim’s Rooter of Lexington",
      dateRange: "April 2012–June 2013",
      achievements: [
        "Answered 50+ customer calls per week.",
        "Maintained upsell rate 15% higher than franchise average.",
      ],
    },
  ],
  education: {
    institution: "Ivy Tech Community College of Lexington",
    degree: "Vocational Training and Apprenticeship",
    accolades: [
      "Commended 6x by the contractor I apprenticed with for efficiency.",
      "Excelled in new installation instruction.",
    ],
  },
  license: "Journeyman License #8823473, Kentucky Division of Plumbing",
  skills: {
    technicalSkills:
      "Installation, repair, PEX, copper, sewage lines PVC, venting",
    softSkills:
      "Physical fitness, problem solving, strong work ethic, customer service",
  },
};

const ProfessionalProfileCard = ({
  useButtons,
  useDocs,
  useServiceDetails,
	id,
  id2,
}) => {
	const { pathname } = useLocation(); // Get the current URL path
	const [serviceProviderInfo, setServiceProviderInfo] = useState([]);
	const token = localStorage.getItem("token");
  const navigate = useNavigate();
 const { userName } = useParams();

 const handleMessageClick = () => {
		const currentUser = JSON.parse(localStorage.getItem("user")).userName; // Assuming you store the user object in local storage
		navigate(`/inbox`, {
			state: { userName: currentUser, user2: userName },
		});
 };
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8081/api/v1/admin/get-sp/${id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				setServiceProviderInfo(response.data);
				console.log("sp :", serviceProviderInfo);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [id, token]);

	useEffect(() => {
		const fetchData = async () => {
			// Check if the URL path matches the customer profile endpoint and token is present
			if (pathname === `/customer-profile/${id}` && token) {
				try {
					const response = await axios.get(
						`http://localhost:8081/api/v1/customer/get-customer/${id}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					setServiceProviderInfo(response.data);
					console.log("sp :", response.data); // Update console log to log the fetched data
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			} else {
				// Proceed with other endpoints or handle token absence
				// You can fetch data from other endpoints here or handle the absence of token
			}
		};

		fetchData();
	}, [id, token, pathname]); // Include token and pathname in the dependencies array

	const handleClick = async (serviceProviderID, Accept) => {
		console.log("click " + id + status + "toke ");

		try {
			const response = await axios.post(
				`http://localhost:8081/api/v1/admin/toogle-service-providers-status/${serviceProviderID}`,
				null,
				{
					params: {
						Accept: Accept,
					},
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log(response.data); // Handle the response data as needed
			alert(response.data);
			return response.data; // Return data if needed
		} catch (error) {
			console.error("Error:", error);
			throw new Error("Failed to submit service provider status");
		}
	};

	// Render loading state while fetching data
	if (!serviceProviderInfo) {
		return <div>Loading...</div>;
	}

	const handleAcceptance = async() => {
		
		const token = localStorage.getItem("token");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		try {
			const response = await axios.put(
				`http://localhost:8081/api/v1/service/assign/${id}/${id2}`,
				null,
				config
			);
			// Handle successful acceptance (e.g., show a success message)
			console.log("Request accepted:", response.data);

			navigate("/jobrequest");

		} catch (error) {
			// Handle error (e.g., show an error message)
			console.error("Error accepting request:", error);
		}

	}

	const convertBase64ToBlobUrl = (base64) => {

		const [imageLoaded, setImageLoaded] = useState(false);
  if (!base64) {
        return <div>No data provided</div>;
      }

   // Convert base64 to Blob URL
   const binaryString = window.atob(base64);
   const binaryLen = binaryString.length;
   const bytes = new Uint8Array(binaryLen);
   for (let i = 0; i < binaryLen; i++) {
     bytes[i] = binaryString.charCodeAt(i);
   }
   let blob = new Blob([bytes]);
   let blobUrl = window.URL.createObjectURL(blob);

   const handleImageLoad = () => {
    setImageLoaded(true);
  };
 
   return (
     <div>
       {/* Attempt to display as an image */}
       <img src={blobUrl} alt="Base64" width="350" height="400" style={{ display: imageLoaded ? 'block' : 'none' }}
        onLoad={handleImageLoad} />
 
       {/* Fallback to display as a PDF */}
       <object data={convet(bytes)} type="application/pdf" width="350" height="400" style={{ display: imageLoaded ? 'none' : 'block' }}>
         <embed src={convet(bytes)} type="application/pdf" width="350" height="400" />
       </object>
     </div>
   );
	};

	const convet =(bytes)=>{

		const blob = new Blob([bytes], { type: 'application/pdf' });
		const blobUrl = window.URL.createObjectURL(blob);
	
		return blobUrl;
		
	  }
	return (
		<div className='professional-profile__card'>
			<div className='professional-profile__header'>
				<img
					src={`data:multipart/form-data;base64,${serviceProviderInfo.profilePicture}`}
					alt={serviceProviderInfo.firstName}
					className='professional-profile__image'
				/>
				<div className='professional-profile__header-info'>
					<h2 className='professional-profile__name'>
						{serviceProviderInfo.firstName}
						<div className='professional-profile__rating'>
							{serviceProviderInfo.rating}/5 ★
						</div>
					</h2>
					<div className='professional-profile__profession-info'>
						<p className='professional-profile__profession'>
							{serviceProviderInfo.category
								? serviceProviderInfo.category.name
								: "N/A"}
						</p>
						<p>
							{" "}
							{serviceProviderInfo.address
								? serviceProviderInfo.address.city
								: "N/A"}{" "}
						</p>
					</div>

					<div className='professional-profile__details'>
						<span className='professional-profile__reviews'>
							{serviceProviderInfo.reviews
								? serviceProviderInfo.reviews.length
								: 0}{" "}
							Reviews
						</span>
						<span className='professional-profile-horizontal-divider'></span>
						<span className='professional-profile__reviews'>
							Projects Completed {professionalProfile.reviewsCount}
						</span>
						<span className='professional-profile-horizontal-divider'></span>
						<span className='professional-profile__rate'>
							R
							{serviceProviderInfo.profile
								? serviceProviderInfo.profile.hourlyRate
								: "N/A"}{" "}
							per hour
						</span>
						<span className='professional-profile-horizontal-divider'></span>
						<span className='professional-profile__availability'>
							<p className='w-fit'>Availability:</p>{" "}
							{professionalProfile.availability.join(", ")}
						</span>
					</div>
					<div className='professional-profile__ratings'></div>
					<div className='professional-profile__rate-availability'></div>
				</div>
			</div>
			<div className='professional-profile__body-details'>
				<div className='professional-profile__summary'>
					<h2 className='professional-profile__text-bold'>
						Professional Summary
					</h2>
					<p>
						{serviceProviderInfo.profile
							? serviceProviderInfo.profile.professionalSummary
							: "N/A"}
					</p>
				</div>
				<br />
				<div className='professional-profile__experience'>
					<h2 className='professional-profile__text-bold'>Work Experience</h2>
					{serviceProviderInfo &&
						serviceProviderInfo.profile &&
						Array.isArray(serviceProviderInfo.profile.workExperienceList) &&
						serviceProviderInfo.profile.workExperienceList.map((job, index) => (
							<div
								key={index}
								className='professional-profile__job'
							>
								<h4>
									<strong> {job.title} </strong> at {job.companyName}
								</h4>
								<p>
									{job.startDate.split("T")[0]} to {"     "}
									{job.endDate ? job.endDate.split("T")[0] : "Present"}
								</p>
								<p>{job.description}</p>
								<br />
							</div>
						))}
				</div>

				<div className='professional-profile__education'>
					<h2 className='professional-profile__text-bold'>Education</h2>
					{serviceProviderInfo &&
						serviceProviderInfo.profile &&
						Array.isArray(serviceProviderInfo.profile.education) &&
						serviceProviderInfo.profile.education.map((education, index) => (
							<div key={index}>
								<p>
									{" "}
									<strong>{education.qualification} </strong>
								</p>
								<p>{education.institution} </p>
								<p>
									{education.startDate.split("T")[0]} to {"     "}
									{education.enddate
										? education.enddate.split("T")[0]
										: "Present"}
								</p>
							</div>
						))}
				</div>
				<br />
				<div className='professional-profile__skills'>
					<h2 className='professional-profile__text-bold'>Skills</h2>
					<p>
						{serviceProviderInfo.profile
							? serviceProviderInfo.profile.skills
							: "N/A"}
					</p>
				</div>
			</div>
			{useButtons && (
				<div className='professional-profile__actions'>
					<button
						className='professional-profile__message-btn'
						onClick={handleMessageClick}
					>
						Message
					</button>

					<NavLink
						className='professional-profile__issue-btn'
						to={`/issues/${id}`}
					>
						Log Issue
					</NavLink>

					{/* <button className="professional-profile__message-btn">Message</button>
        <button className="professional-profile__issue-btn">Log Issue</button> */}
				</div>
			)}
			{useDocs && (
				<>
					<div className='application-documents__container'>
						{/* <div>Document 1</div>
						<div>Document 2</div> */}
						<div>
							<h3>Bank Statement</h3>
							{/* {renderImage(
								serviceProviderInfo.bankStatement,
								"bank_statement.png"
							)} */}
							{convertBase64ToBlobUrl(serviceProviderInfo.bankStatement)}
						</div>
						<div>
							<h3>Resume</h3>
							{/* {renderImage(serviceProviderInfo.resume, "resume.png")} */}
							{convertBase64ToBlobUrl(serviceProviderInfo.profilePicture)}
						</div>
					</div>
					<div className='application-documents-action__btns'>
						<Button className='application-document__download-btn'>
							Download
						</Button>
						<Button
							className='application-document__accept-btn'
							onClick={() => handleClick(id, true)}
						>
							Accept
						</Button>
						<Button
							className='application-document__reject-btn'
							onClick={() => handleClick(id, false)}
						>
							Reject
						</Button>
					</div>
				</>
			)}

			{useServiceDetails && (
				<div className='flex flex-col'>
					<div>
						<p>{/* Service Category */} i.e., Plumbling</p>

						<p>{/* Appoint */} i.e., 05/02/24</p>
					</div>
					<div>{/* Description */} i.e., OMG my ..........</div>
					<div className='flex flex-row w-12 h-12'>
						{/* pictures */}{" "}
						<img
							src='/src/assets/Maintenance.jpg'
							alt=''
							srcset=''
						/>
						<img
							src='/src/assets/Maintenance.jpg'
							alt=''
							srcset=''
						/>
						<img
							src='/src/assets/Maintenance.jpg'
							alt=''
							srcset=''
						/>
					</div>
					<div>
						<button
							className=''
							onClick={handleAcceptance}
						>
							Accept Request
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfessionalProfileCard;
