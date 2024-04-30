/** @format */

import React, { useEffect, useState } from "react";
import "./Header.css";
import { useAuth } from "@/security/auth/AuthContext";
import { HiEllipsisVertical } from "react-icons/hi2";
import { FaRegEnvelope } from "react-icons/fa";

const Header = () => {
  const { sidebarCollapsed, setSidebarCollapsed, userDetails, setUserDetails } =
    useAuth();
  const [loading, setLoading] = useState(true);

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
        setUserDetails(userData);
        setLoading(false); // Set loading to false once user details are fetched
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchUserDetails();
  }, []);

  const handleSideBarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Render loading state if userDetails is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the header with user details if userDetails is available
  return (
    <div className="header__container">
      <div>
        <img
          className="w-fit h-20"
          src="/src/assets/pms-logo.png"
          alt="PMS Logo"
          onClick={handleSideBarCollapse}
        />
      </div>
      <div className="header__user-details">
        <FaRegEnvelope />
        <p>
          {userDetails ? userDetails.fullName : "No user details available"}
        </p>
        {userDetails.profilePicture ? (
          <>
            <img
              className="header__customer-img"
              src={userDetails.profilePicture}
              alt="user profile picture"
            />
            <HiEllipsisVertical />
          </>
        ): <img className="header__customer-img"  src={"/src/assets/user-placeholder.png"}/>}
      </div>
    </div>
  );
};

export default Header;
