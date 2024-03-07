import React from "react";
import "./Header.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "@/security/auth/AuthContext";
import { HiEllipsisVertical  } from "react-icons/hi2";
import { motion } from "framer-motion";
import { fadeOut } from "@/motion/motion";
import { FaRegEnvelope } from "react-icons/fa";

const Header = () => {
  const { sidebarCollapsed, setSidebarCollapsed } = useAuth();

  const handleSideBarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="header__container">
      {/* <motion.div 
        variants={fadeOut("right", "spring", 0.75)}
        className='w-full p-[1px] rounded-[75px]'
      >   */}
        <GiHamburgerMenu onClick={
          handleSideBarCollapse    
        }/>
      {/* </motion.div> */}

      <div className="header__user-details">
        <div className="header__user-messages">
          <FaRegEnvelope />
        </div>
        <p>Sbusiso Mabaso</p>
        {/* {user && (
          <>
            <img
              src="https://media.istockphoto.com/id/155596999/photo/young-south-african-girl-in-classroom.jpg?s=2048x2048&w=is&k=20&c=UQEeHJug5CdnJK50y61bqSaOG29unDz9hwkdV0U6m88="
              alt="profile picture"
            />
            <p>{user.firstname} {user.lastname}</p>
          </>
        )} */}
        {/* <i class="fa-solid fa-ellipsis-vertical"></i> */}
        <img
          src="https://media.istockphoto.com/id/155596999/photo/young-south-african-girl-in-classroom.jpg?s=2048x2048&w=is&k=20&c=UQEeHJug5CdnJK50y61bqSaOG29unDz9hwkdV0U6m88="
          alt=""
        />
        <div className="header__user-profile-more">
          <HiEllipsisVertical/>
        </div>
      </div>
    </div>
  );
};

export default Header;
