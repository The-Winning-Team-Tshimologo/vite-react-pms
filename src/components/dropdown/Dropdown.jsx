import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import "./Dropdown.css";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Plumbing");
  const categories = [
    "Electricity",
    "Plumbing",
    "Gardening",
    "Fitting",
    "Housekeeping",
  ];

  // const toggleDropdown = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    // setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" /*onClick={toggleDropdown}*/>
        {selectedOption}
        <div className="flex flex-col">
          <FaChevronUp className="w-2 h-2" /> <FaChevronDown className="w-2 h-2" />
        </div>
        {/* {isOpen ? <FaChevronUp className='w-2'/> : <FaChevronDown className='w-2' />} */}
      </div>
      {isOpen && (
        <div className="dropdown-list-container">
          <ul className="dropdown-list">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={onOptionClicked(category)}
                className={selectedOption === category ? "selected" : ""}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
