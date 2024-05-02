import React, { useEffect, useState } from "react";
import "./Header.css";
import { useAuth } from "@/security/auth/AuthContext";
import { HiEllipsisVertical } from "react-icons/hi2";  // Correct the import path as mentioned previously
import { FaRegEnvelope } from "react-icons/fa";

const Header = () => {
  const { sidebarCollapsed, setSidebarCollapsed, userDetails } = useAuth();

  const handleSideBarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };


  // If no userDetails, only render the logo
  if (!userDetails) {
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
      </div>
    );
  }

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
        <p>{userDetails ? userDetails.fullName : "No user details available"}</p>
        {userDetails && userDetails.profilePicture ? (
          <>
            <img
              className="header__customer-img"
              src={userDetails.profilePicture}
              alt="user profile picture"
            />
            <HiEllipsisVertical />
          </>
        ) : (
          <img
            className="header__customer-img"
            src="/src/assets/user-placeholder.png"
            alt="Default user placeholder"
          />
        )}
      </div>
    </div>
  );
};

export default Header;
