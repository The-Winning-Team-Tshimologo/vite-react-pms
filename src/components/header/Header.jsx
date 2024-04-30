/** @format */

import React, { useEffect } from "react";
import "./Header.css";
import { useAuth } from "@/security/auth/AuthContext";
import { HiEllipsisVertical } from "react-icons/hi2";
import { FaRegEnvelope } from "react-icons/fa";

const Header = () => {
	const { sidebarCollapsed, setSidebarCollapsed, user, setUser } = useAuth();

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
        const token = localStorage.getItem("token");
        
      
				if (!token) {
					throw new Error("Token not found in local storage");
				}

				const response = await fetch(
					"http://localhost:8081/api/v1/user/user-details",
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch user details");
				}

				const userData = await response.json();
				setUser(userData);
			} catch (error) {
				console.error("Error fetching user details:", error);
			}
		};

		fetchUserDetails();
	}, [setUser]);

	const handleSideBarCollapse = () => {
		setSidebarCollapsed(!sidebarCollapsed);
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
			<div className='header__user-details'>
				<FaRegEnvelope />
				<p>
					{user.fullName}
				</p>
				<img
					className='header__cutomer-img'
					src={user.profilePicture}
					alt='user profile picture'
				/>
				<HiEllipsisVertical />
			</div>
		</div>
	);
};

export default Header;
