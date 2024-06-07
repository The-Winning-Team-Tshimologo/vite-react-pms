/** @format */

import React, { useState } from "react";
import "./Header.css";
import { useAuth } from "@/security/auth/AuthContext";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa";
import Notification from "../notification/SystemNotification"; // Import Notification component

const Header = () => {
	const { sidebarCollapsed, setSidebarCollapsed, userDetails, user, logout } = useAuth();
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const navigate = useNavigate();

	const handleSideBarCollapse = () => {
		setSidebarCollapsed(!sidebarCollapsed);
	};

	const toggleDropdown = (event) => {
		event.stopPropagation();
		setDropdownVisible(!dropdownVisible);
	};

	const handleViewProfile = () => {
		console.log("View Profile clicked");
		if (user && user.roles.includes("ROLE_CUSTOMER")) {
			navigate("/customer-profile-update");
		}
	};

	const handleMessage = () => {
		if (user && user.roles.includes("ROLE_SERVICE_PROVIDER") || user && user.roles.includes("ROLE_CUSTOMER")) {
			navigate("/inbox")
		}
	};

	const handleLogout = () => {
		logout();
		console.log("Log Out clicked");
	};

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
			>
				<FaRegEnvelope onClick={handleMessage} className="cursor__pointer-visible"/>
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
						<HiEllipsisVertical onClick={toggleDropdown} className="cursor__pointer-visible"/>
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
