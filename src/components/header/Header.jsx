import React from "react";
import "./Header.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "@/security/auth/AuthContext";
import { HiEllipsisVertical } from "react-icons/hi2";
import { FaRegEnvelope } from "react-icons/fa";

const Header = () => {
  const { sidebarCollapsed, setSidebarCollapsed } = useAuth();

  const handleSideBarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="header__container">
      {!sidebarCollapsed && <GiHamburgerMenu className="header__hamburger-icon" onClick={handleSideBarCollapse} />}
      <div></div>
      <div className="header__user-details">
        <FaRegEnvelope />
        <p>Sbusiso Mabaso</p>
        <img
          src="https://media.istockphoto.com/id/155596999/photo/young-south-african-girl-in-classroom.jpg?s=2048x2048&w=is&k=20&c=UQEeHJug5CdnJK50y61bqSaOG29unDz9hwkdV0U6m88="
          alt=""
        />
        <HiEllipsisVertical />
      </div>
    </div>
  );
};

export default Header;
