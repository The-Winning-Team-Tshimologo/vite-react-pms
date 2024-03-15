import React, { useState } from 'react';
import { IoMenuOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import './JobHeader.css';

const JobHeader = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="job-header">
            {/* Menu Icon */}
            <IoMenuOutline className="menu-icon" onClick={toggleDropdown}/>
            {/* Search Bar */}
            <div className="search-container">
                <input type="text" placeholder="Search..." className="search-input" />
                <IoIosSearch className="search-icon" />
            </div>
            {/* Dropdown */}
            {isDropdownOpen && (
                <div className="dropdown">
                    {/* Add your services here */}
                    <h2>Services</h2>
                    <ul>
                        <li>Service 1</li>
                        <li>Service 2</li>
                        <li>Service 3</li>
                        {/* Add more services as needed */}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default JobHeader;
