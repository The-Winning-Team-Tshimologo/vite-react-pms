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
  const { sidebarCollapsed, setSidebarCollapsed, logout, user } = useAuth();

  const handleSideBarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    logout();
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
          <NavLink
            to="/admin-dashboard"
            style={{
              display: user?.role?.includes("admin") ? "block" : "none",
            }}
          >
            <h3>
              <LuLayoutDashboard />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                Dashboard
              </span>
            </h3>
          </NavLink>

          <NavLink
            to="/browse-professionals"
            style={{
              display: user?.role?.includes("customer") ? "block" : "none",
            }}
          >
            <h3>
              <LuLayoutDashboard />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                Service Providers
              </span>
            </h3>
          </NavLink>

          <NavLink
            to="/issues"
            style={{
              display: user?.role?.includes("customer") ? "block" : "none",
            }}
          >
            <h3>
              <TfiCommentAlt />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                Log Issues
              </span>
            </h3>
          </NavLink>

          <NavLink
            to="/reminders"
            style={{
              display: user?.role?.includes("customer") ? "block" : "none",
            }}
          >
            <h3>
              <SlCalender />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                Reminders
              </span>
            </h3>
          </NavLink>

          <NavLink to="/inbox">
            <h3>
              <MdOutlineContacts />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                Messages
              </span>
            </h3>
          </NavLink>

          <NavLink
            to="/completed-jobs"
            style={{
              display: user?.role?.includes("service_provider")
                ? "block"
                : "none",
            }}
          >
            <h3>
              <SlPicture />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                Completed Jobs
              </span>
            </h3>
          </NavLink>

          <NavLink to="/users" style={{
              display: user?.role?.includes("admin")
                ? "block"
                : "none",
            }}>
            <h3>
              <FiUsers />
              <span className={sidebarCollapsed ? "icon-only" : ""}>Users</span>
            </h3>
          </NavLink>
        </div>

        <div className="bottom-links">
          <NavLink
            to="/profile"
            style={{
              display:
                user?.role?.includes("customer") ||
                user?.role?.includes("service_provider")
                  ? "block"
                  : "none",
            }}
          >
            <h3>
              <MdOutlineManageAccounts />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                Account
              </span>
            </h3>
          </NavLink>

          <div onClick={handleLogout}>
            <h3>
              <IoIosLogOut />
              <span className={sidebarCollapsed ? "icon-only" : ""}>
                Logout
              </span>
            </h3>
          </div>
        </div>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
