/** @format */

import React, { useEffect, useState } from "react";
import "./Header.css";
import { useAuth } from "@/security/auth/AuthContext";
import { HiEllipsisVertical } from "react-icons/hi2";
import { FaRegEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Header = () => {
	const { sidebarCollapsed, setSidebarCollapsed, userDetails, user } = useAuth();
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const navigate = useNavigate(); // Initialize useNavigate for navigation

	const handleSideBarCollapse = () => {
		setSidebarCollapsed(!sidebarCollapsed);
	};

	const toggleDropdown = (event) => {
		event.stopPropagation();
		setDropdownVisible(!dropdownVisible);
	};

	const handleViewProfile = () => {
		console.log("View Profile clicked");
		// Check if the user role is ROLE_CUSTOMER
		if (user && user.roles.includes("ROLE_CUSTOMER")) {
			// Navigate to /customer-profile-update if the user role is ROLE_CUSTOMER
			navigate("/customer-profile-update");
		}
	};

	const handleLogout = () => {
		console.log("Log Out clicked");
	};

	useEffect(() => {
		console.log("User details updated", userDetails);
	}, [userDetails]);

	useEffect(() => {
		const closeDropdown = () => setDropdownVisible(false);
		if (dropdownVisible) {
			document.addEventListener("click", closeDropdown);
		} else {
			document.removeEventListener("click", closeDropdown);
		}

		return () => {
			document.removeEventListener("click", closeDropdown);
		};
	}, [dropdownVisible]);

	if (!userDetails) {
		return (
			<div className='header__container'>
				<div>
					<img
						className='w-fit h-20'
						src='/src/assets/pms-logo.png'
						alt='PMS Logo'
						onClick={handleSideBarCollapse}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className='header__container'>
			<div>
				<img
					className='w-fit h-20'
					src='/src/assets/pms-logo.png'
					alt='PMS Logo'
					onClick={handleSideBarCollapse}
				/>
			</div>
			<div
				className='header__user-details'
				onClick={toggleDropdown}
			>
				<FaRegEnvelope />
				<p>
					{userDetails ? userDetails.fullName : "No user details available"}
				</p>
				{userDetails && userDetails.profilePicture ? (
					<>
						<img
							className='header__customer-img'
							src={`data:image/png;base64,${userDetails.profilePicture}`}
							alt='user profile picture'
						/>
						<HiEllipsisVertical />
					</>
				) : (
					<img
						className='header__customer-img'
						src='/src/assets/user-placeholder.png'
						alt='Default user placeholder'
					/>
				)}
				{dropdownVisible && (
					<div
						className='dropdown-menu'
						onClick={(e) => e.stopPropagation()}
					>
						<button onClick={handleViewProfile}>View Profile</button>
						<button onClick={handleLogout}>Log Out</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
