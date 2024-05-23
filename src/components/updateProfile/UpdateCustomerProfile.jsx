/** @format */

import React, { useState, useEffect } from "react";
import { useAuth } from "@/security/auth/AuthContext";
import "./Update.css";
import Header from "../header/Header";
import axios from "axios";

function UpdateCustomerProfile() {
	const [address, setAddress] = useState({
		streetName: "",
		city: "",
		province: "",
		zipCode: "", // Changed from zipCode to postalCode
	});

	const [profilePictureFile, setProfilePictureFile] = useState(null);
	const { userDetails } = useAuth();

	useEffect(() => {
		const fetchAddress = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					console.error("Authentication token not found");
					return;
				}
				const headers = { Authorization: `Bearer ${token}` };
				const response = await axios.get(
					"http://localhost:8081/api/v1/address/all",
					{ headers }
				);
				setAddress(response.data);
			} catch (error) {
				console.error("Error fetching address:", error);
			}
		};
		fetchAddress();
	}, []);

	const handleAddressChange = (event) => {
		setAddress({
			...address,
			[event.target.name]: event.target.value,
		});
	};

	const handleProfilePictureChange = (event) => {
		const file = event.target.files[0];
		setProfilePictureFile(file);
	};

	const saveProfilePicture = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				console.error("Authentication token not found");
				return;
			}
			const formData = new FormData();
			formData.append("file", profilePictureFile);
			const headers = {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			};
			const response = await axios.post(
				"http://localhost:8081/api/v1/user/profile-picture",
				formData,
				{ headers }
			);
			console.log("Profile picture uploaded successfully:", response.data);
		} catch (error) {
			console.error("Error uploading profile picture:", error);
		}
	};

	const saveAddress = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				console.error("Authentication token not found");
				return;
			}
			const headers = { Authorization: `Bearer ${token}` };
			const response = await axios.put(
				"http://localhost:8081/api/v1/address/save",
				address,
				{ headers }
			);
			console.log("Address updated successfully:", response.data);
		} catch (error) {
			console.error("Error updating address:", error);
		}
	};

	const handleProfilePictureClick = () => {
		document.getElementById("profilePictureInput").click();
	};

	return (
		<div>
			<Header />
			<div className='avatar-container'>
				<h3>Update Avatar</h3>
				<div
					className='avatar'
					onClick={handleProfilePictureClick}
				>
					<img
						src={`data:image/png;base64,${userDetails.profilePicture}`}
						alt='Avatar'
						className='round-image'
					/>
					<input
						type='file'
						accept='image/*'
						id='profilePictureInput'
						onChange={handleProfilePictureChange}
					/>
				</div>
				<button
					className='primary-btn'
					onClick={saveProfilePicture}
				>
					Save Profile Picture
				</button>
			</div>
			<div className='formField'>
				<label className='flex gap-1'>Address</label>
				<div className='address-container'>
					<input
						type='text'
						placeholder='Street Name'
						name='streetName'
						value={address.streetName}
						onChange={handleAddressChange}
					/>
					<input
						type='text'
						placeholder='City'
						name='city'
						value={address.city}
						onChange={handleAddressChange}
					/>
					<input
						type='text'
						placeholder='Province'
						name='province'
						value={address.province}
						onChange={handleAddressChange}
					/>
					<input
						type='text'
						placeholder='Postal Code'
						name='zipCode'
						value={address.zipCode}
						onChange={handleAddressChange}
					/>
				</div>
				<button
					className='primary-btn'
					onClick={saveAddress}
				>
					Save Address
				</button>
			</div>
		</div>
	);
}

export default UpdateCustomerProfile;
