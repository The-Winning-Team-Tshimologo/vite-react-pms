import React, { useContext } from "react";
import "./Sidebar.css";
import { Outlet, NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { TfiCommentAlt } from "react-icons/tfi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { MdOutlineContacts } from "react-icons/md";
import { SlPicture } from "react-icons/sl";
import { FiUsers } from "react-icons/fi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from "../../security/auth/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = () => {
  const { sidebarCollapsed, setSidebarCollapsed } = useAuth();

  const handleSideBarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div
      className={`content__container ${sidebarCollapsed ? "collapsed" : ""}`}
    >
      <nav className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        {/* <div className="sidebar__logo" onClick={handleSideBarCollapse}> */}
        {/* {sidebarCollapsed && (
          <div className="sidebar__logo">
            <GiHamburgerMenu className="hamburger-icon" onClick={handleSideBarCollapse}/>
          </div>
        )} */}
        {sidebarCollapsed ? (
          <div className="sidebar__logo">
            <GiHamburgerMenu
              className="hamburger-icon"
              onClick={handleSideBarCollapse}
            />
          </div>
        ) : (
          <div className="">
            <p></p>
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

          <NavLink to="/issues">
            <h3>
              <TfiCommentAlt />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                LOG ISSUES
              </span>
            </h3>
          </NavLink>

          <NavLink to="">
            <h3>
              <SlCalender />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                REMINDERS
              </span>
            </h3>
          </NavLink>

          <NavLink to="/inbox">
            <h3>
              <MdOutlineContacts />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                MESSAGES
              </span>
            </h3>
          </NavLink>

          <NavLink to="/completed-jobs">
            <h3>
              <SlPicture />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                COMPLETED JOBS
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

        <div className="bottom-links">
          <NavLink to="/">
            <h3>
              <MdOutlineManageAccounts />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                ACCOUNT
              </span>
            </h3>
          </NavLink>

          <NavLink to="/">
            <h3>
              <IoIosLogOut />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                ACCOUNT
              </span>
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
