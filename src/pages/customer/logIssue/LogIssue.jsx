import Calendar from "@/components/calendar/Calendar";
import Dropdown from "@/components/dropdown/Dropdown";
import FileUpload from "@/components/fileUpload/FileUpload";
import Header from "@/components/header/Header";
import React, { useState} from "react";
import "./LogIssue.css";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "react-router-dom";

const LogIssue = () => {
	const { id } = useParams(); // Ensure this line extracts the 'id' correctly

	const [selectedCategory, setSelectedCategory] = useState(null);
	const [description, setDescription] = useState("");
	const [descriptionBook, setDescriptionBook] = useState("");
	const [address, setAddress] = useState({
		streetName: "",
		city: "",
		province: "",
		zipCode: "",
	});
	const [selectedDate, setSelectedDate] = useState(null); // Add selectedDate state
	const [pictures, setPictures] = useState([]);
	const [errors, setErrors] = useState({});

	const handleFileChange = (e) => {
		const files = Array.from(e.target.files);
		setPictures(files);
	  };
	

	const handleFileUpload = () => {
		window.alert("yey you");
	};

	const handleCalendar = (selectedDate) => {
		console.log("Selected date:", selectedDate); // Log the selected date
		setSelectedDate(selectedDate); // Set the selected date
	};

	const handleSubmit = async () => {
		try {
			const token = localStorage.getItem("token");
			const formData = new FormData();
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			};
	
			// Construct the requestDTOData object
			const requestDTOData = {
				createServiceRequestDTO: {
					description,
					address,
				},
				createAppointmentDTO: {
					appointmentDate: selectedDate ? selectedDate : null,
					appointmentMessage: descriptionBook,
				},
			};

			// Append requestDTOData as a string to the FormData object
			formData.append('requestDTOData', JSON.stringify(requestDTOData));
	
			// Append each file from the 'files' array to the FormData object
			pictures.forEach((file) => {
				formData.append('files', file);
			});
			let url = `http://localhost:8081/api/v1/service/create/`;
			// let url = `http://localhost:8081/api/v1/service/create/test/`;

			if (id) {
				// If serviceProviderId is available, include it in the URL
				url += `${id}/${selectedCategory}`;
			} else {
				// Otherwise, use the default endpoint
				url += `${selectedCategory}`;
			}		

			// for (let pair of formData.entries()) {
			// 	console.log(pair[0] + ':', pair[1]);
			// }
			
			const response = await axios.post(url, formData, config);
			console.log(response.data);
			window.alert("Service requested successfully");
		} catch (error) {
			console.error("Error requesting service:", error);
			window.alert("Failed to request service. Please try again later.");
		}
	};

	
	return (
		<>
			<Header />
			{/* <div className="mt-10 mr-2 mx-2">
        <h1>Log an Issue</h1>
      </div> */}

			<div className='issues__container'>
				<div className='flex justify-between pt-4'>
					<div className='ms-10 p-4'>
						<h2>Category</h2>
						<Dropdown setSelectedCategory={setSelectedCategory} />
					</div>
					<div className='me-10 p-4'>
						<h2>Address</h2>
						<div className='flex flex-col pr-20 py-1 address__container'>
							<input
								className='p-2'
								type='text'
								placeholder='Street Name'
								value={address.streetName}
								onChange={(e) =>
									setAddress({ ...address, streetName: e.target.value })
								}
							/>
							<input
								className='p-2'
								type='text'
								placeholder='City'
								value={address.city}
								onChange={(e) =>
									setAddress({ ...address, city: e.target.value })
								}
							/>
							<input
								className='p-2'
								type='text'
								placeholder='Province'
								value={address.province}
								onChange={(e) =>
									setAddress({ ...address, province: e.target.value })
								}
							/>
							<input
								className='p-2'
								type='number'
								placeholder='Postal Code'
								value={address.zipCode}
								onChange={(e) =>
									setAddress({ ...address, zipCode: e.target.value })
								}
							/>
						</div>
					</div>
				</div>

				<div className='description__container py-10'>
					<h2 className='w-fit'>Description</h2>
					<div className='description__content'>
						<Textarea
							className='custom-border'
							placeholder='My geyser burst and water is going to flood'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</div>

				<div className='flex flex-col w-fit margin-center py-10'>
					<h2 className='text-center'>Upload</h2>
					{/* <FileUpload
						handleFileChange={handleFileChange("pictures")}
						onDrop={handleFileChange("pictures")}
						inputName="pictures"
						formData={pictures}
						errors={errors.pictures}
						labelName="Upload Profile Picture"
					/> */}

				<input type="file" multiple onChange={handleFileChange} />
				</div>

				<div className='appointment__container flex'>
					<div className='flex-1'>
						<h2 className='px-10'>Book your appointment now</h2>
						<p className='px-10'>So our team can reach out to you on time</p>
						<div className='p-10'>
							<p> Share your message</p>
							<Textarea
								className='custom-border bg-gray-100'
								rows={25}
								value={descriptionBook}
								onChange={(e) => setDescriptionBook(e.target.value)}
							/>
						</div>
					</div>

					<div className='flex-1 flex flex-col justify-center'>
						{/* Adjusted to center the Calendar and Submit button vertically */}
						<Calendar getSelectedDate={handleCalendar} />
						{/* <button className="mt-4 ">Submit</button> */}
						<div className='flex justify-center margin-center w-96'>
							<Button
								variant='custom'
								onClick={handleSubmit}
							>
								Submit
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LogIssue;