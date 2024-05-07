/** @format */

import React, { useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import "./Dropdown.css";
import axios from "axios";

const Dropdown = ({ setSelectedCategory }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const [categories, setCategories] = useState([]);
	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8081/api/v1/categories/all",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
        setCategories(response.data);
        console.log(response.data);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategories();
	}, [token]);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const onOptionClicked = (category) => () => {
		setSelectedOption(category);
    setSelectedCategory(category.categoryId);
 
    // Pass the ID of the selected category
		setIsOpen(false);
	};

	return (
		<div className='dropdown__category'>
			<div
				className='dropdown-header'
				onClick={toggleDropdown}
			>
				{selectedOption ? selectedOption.name : "Select Category"}
				<div className='flex flex-col'>
					{isOpen ? (
						<FaChevronUp className='w-2 h-2' />
					) : (
						<FaChevronDown className='w-2 h-2' />
					)}
				</div>
			</div>
			{isOpen && (
				<div className='dropdown-list-container'>
					<ul className='dropdown-list'>
						{categories.map((category) => (
							<li
								key={category.categoryId}
								onClick={onOptionClicked(category)}
								className={selectedOption === category ? "selected" : ""}
							>
								{category.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Dropdown;
