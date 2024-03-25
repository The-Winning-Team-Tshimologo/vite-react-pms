import React, { useContext } from "react";
import "./Sidebar.css";
import { Outlet, NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { TfiCommentAlt } from "react-icons/tfi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineContacts } from "react-icons/md";
import { SlPicture } from "react-icons/sl";
import { FiUsers } from "react-icons/fi";
import { useAuth } from "../../security/auth/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = () => {
  const { sidebarCollapsed, setSidebarCollapsed } = useAuth();

  const handleSideBarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={`container ${sidebarCollapsed ? "collapsed" : ""}`}>
      <nav className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        {/* <div className="sidebar__logo" onClick={handleSideBarCollapse}> */}
        {sidebarCollapsed && (
          <div className="sidebar__logo">
            <GiHamburgerMenu className="hamburger-icon" onClick={handleSideBarCollapse}/>
          </div>
        )}
        {/* </div> */}
        <div className="sidebar__links">
          <NavLink to="/">
            <h3>
              <LuLayoutDashboard />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                DASHBOARD
              </span>
            </h3>
          </NavLink>

          <NavLink to="">
            <h3>
              <TfiCommentAlt />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                ACTIVITY
              </span>
            </h3>
          </NavLink>

          <NavLink to="">
            <h3>
              <AiOutlineInfoCircle />
              <span className={sidebarCollapsed ? "icon-only" : ""}>ABOUT</span>
            </h3>
          </NavLink>

          <NavLink to="">
            <h3>
              <MdOutlineContacts />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                MESSAGES
              </span>
            </h3>
          </NavLink>

          <NavLink to="/issues">
            <h3>
              <SlPicture />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                LOG ISSUE
              </span>
            </h3>
          </NavLink>

          <NavLink to="">
            <h3>
              <FiUsers />
              <span className={sidebarCollapsed ? "icon-only" : ""}>SP</span>
            </h3>
          </NavLink>
        </div>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
