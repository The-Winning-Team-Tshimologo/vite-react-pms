// import React, { useEffect, useState } from "react";
// import './Dropdown.css'

// const Dropdown = () => {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [categories, setCategories] = useState([]);

//   // Simulating retrieving categories from backend
//   useEffect(() => {
//     const fetchedCategories = [
//       { id: 1, name: "Electricity" },
//       { id: 2, name: "Plumbing" },
//       { id: 3, name: "Gardening" },
//       { id: 4, name: "Fitting" },
//       { id: 5, name: "Housekeeping" },
//     ];

//     setCategories(fetchedCategories);
//     // setSelectedCategory(fetchedCategories[0].name);
//   }, []);

//   const handleChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   return (
//     <div className="flex flex-col dropdown-container">
//       <label htmlFor="category-dropdown" className="category-label">Category</label>
//       <select
//         id="category-dropdown"
//         value={selectedCategory}
//         onChange={handleChange}
//         className="dropdown"
//       >
//         {categories.map((category) => (
//           <option key={category.id} value={category.name}>
//             {category.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default Dropdown;

import React, { useState } from 'react';
import './Dropdown.css';
// import { Fa9 } from 'react-icons/fa6';
import { FaChevronUp } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Plumbing');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption}
        <i className={`Fa9 ${isOpen ? FaChevronUp : FaChevronDown}`}></i>
      </div>
      {isOpen && (
        <div className="dropdown-list-container">
          <ul className="dropdown-list">
            <li onClick={onOptionClicked('Electricity')} className={selectedOption === 'Electricity' ? 'selected' : ''}>Electricity</li>
            <li onClick={onOptionClicked('Plumbing')} className={selectedOption === 'Plumbing' ? 'selected' : ''}>Plumbing</li>
            <li onClick={onOptionClicked('Gardening')} className={selectedOption === 'Gardening' ? 'selected' : ''}>Gardening</li>
            <li onClick={onOptionClicked('Fitting')} className={selectedOption === 'Fitting' ? 'selected' : ''}>Fitting</li>
            <li onClick={onOptionClicked('Housekeeping')} className={selectedOption === 'Housekeeping' ? 'selected' : ''}>Housekeeping</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
