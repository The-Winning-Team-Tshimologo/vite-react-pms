import React, { useContext } from "react";
import "./Sidebar.css";
import { Outlet, NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { TfiCommentAlt } from "react-icons/tfi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineContacts } from "react-icons/md";
import { SlPicture } from "react-icons/sl";
import { FiUsers } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../../security/auth/AuthContext";

const Sidebar = () => {
  // const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // const toggleSidebar = () => {
  //   setSidebarCollapsed(!sidebarCollapsed);
  // };
  const { sidebarCollapsed, setSidebarCollapsed } = useAuth();

  // console.log(sidebarCollapsed);

  const handleSideBarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // const handleLogout = () => {
  //   logout();
  // };

  return (
    <div className={`container ${sidebarCollapsed ? "collapsed" : ""}`}>
      <nav className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar__logo" onClick={handleSideBarCollapse}>
          PMS
        </div>
        <div className="sidebar__links top-1">
          <NavLink to="/">
            <h3>
              <LuLayoutDashboard /> DASHBOARD
            </h3>
          </NavLink>

          <NavLink to="/activity">
            <h3>
              <TfiCommentAlt /> ACTIVITY
            </h3>
          </NavLink>

          <NavLink to="/about">
            <h3>
              <AiOutlineInfoCircle />
              ABOUT
            </h3>
          </NavLink>

          <NavLink to="/messages">
            <h3>
              <MdOutlineContacts />
              MESSAGES
            </h3>
          </NavLink>

          <NavLink to="/issues">
            <h3>
              <SlPicture />
              LOG ISSUE
            </h3>
          </NavLink>

          <NavLink to="/sp">
            <h3>
              <FiUsers />
              SP
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
