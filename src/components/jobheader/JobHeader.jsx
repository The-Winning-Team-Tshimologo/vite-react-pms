// JobHeader.js
import React, { useState } from 'react';
import { IoMenuOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import './JobHeader.css';

const JobHeader = ({ onSearch }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="job-header">
            {/* Menu Icon */}
            <IoMenuOutline className="menu-icon" onClick={toggleDropdown}/>
            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search city or service..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <IoIosSearch className="search-icon" onClick={handleSearch} />
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
