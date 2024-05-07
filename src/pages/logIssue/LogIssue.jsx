import Calendar from "@/components/calendar/Calendar";
import Dropdown from "@/components/dropdown/Dropdown";
import FileUpload from "@/components/fileUpload/FileUpload";
import Header from "@/components/header/Header";
import React, { useState} from "react";
import "./LogIssue.css";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";

const LogIssue = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [descriptionBook, setDescriptionBook] = useState("");
	const [address, setAddress] = useState({
		streetName: "",
		city: "",
		province: "",
		postalCode: "",
	});
	const [selectedDate, setSelectedDate] = useState(null); // Add selectedDate state

	const handleFileUpload = () => {
		window.alert("yey you");
	};

	const handleCalendar = (selectedDate) => {
		console.log("Selected date:", selectedDate); // Log the selected date
		setSelectedDate(selectedDate); // Set the selected date
	};

const handleSubmit = async () => {
	try {
		// Retrieve the token from local storage
		const token = localStorage.getItem("token");

		// Set the Authorization header with the token
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		};

		// Construct the data object to be posted
		const postData = {
			createServiceRequestDTO: {
				description,
				address,
			},
			createAppointmentDTO: {
				appointmentDate: selectedDate ? selectedDate : null, // Convert to ISO string if selectedDate is not null
				appointmentMessage: descriptionBook,
			},
		};

		console.log("Data to be posted:", postData); // Log the data being posted

		// Send the POST request
		const response = await axios.post(
			`http://localhost:8081/api/v1/service/create/${selectedCategory}`,
			postData,
			config
		);

		console.log(response.data); // Log the response data if needed
		window.alert("Service requested successfully");
		// Optionally, perform additional logic after the service request is successful
	} catch (error) {
		console.error("Error requesting service:", error);
		window.alert("Failed to request service. Please try again later.");
		// Optionally, handle errors gracefully
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
								value={address.postalCode}
								onChange={(e) =>
									setAddress({ ...address, postalCode: e.target.value })
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
					<FileUpload onClick={handleFileUpload} />
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
