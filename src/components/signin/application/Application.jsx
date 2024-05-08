// import React from "react";
// import "../Form.css";
// import { useFormContext } from "@/utils/FormContext";

// const Application = () => {
//   const { formData, updateFormData } = useFormContext();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     updateFormData();
//     console.log("Form submitted:", formData);
//   };

//   return (
//     <div className="flex-col">
//       {/* <h1>Application</h1> */}

//       <label htmlFor="userName">Username</label>
//       <input
//         className="application_input"
//         type="text"
//         id="userName"
//         name="userName"
//         placeholder="Please enter your username"
//         // pattern="([A-Z])[\w+.]{1,}"
//       />

//       <label htmlFor="mobile">Mobile Number</label>
//       <input
//         className="application_input"
//         type="number"
//         id="mobile"
//         name="mobile"
//         placeholder="Please enter your Mobile Number "
//         // pattern="([A-Z])[\w+.]{1,}"
//       />

//       <label htmlFor="email">Email Adress</label>
//       <input
//         className="application_input"
//         type="email"
//         id="email"
//         name="email"
//         placeholder="enter email"
//         // pattern="[\w\d\s.#]{2,}"
//       />

//       <label htmlFor="streetName" className="offscreen">
//         Street Name
//       </label>
//       <input
//         className="application_input"
//         type="text"
//         id="streetName"
//         name="streetName"
//         // pattern="[\w\d\s.#]{2,}"
//       />

//       <label htmlFor="city">City</label>
//       <input
//         className="application_input"
//         type="text"
//         id="city"
//         name="city"
//         // pattern="([A-Z])[\w\s.]{1,}"
//       />

//       <label htmlFor="province">Province</label>
//       <input
//         className="application_input"
//         type="text"
//         id="province"
//         name="province"
//         // pattern="([A-Z])[\w\s.]{1,}"
//       />

//       <label htmlFor="zipCode">Zip Code</label>
//       <input
//         className="application_input"
//         type="Number"
//         id="zipCode"
//         name="zipCode"
//         pattern="[0-9]{5}"
//         maxLength="5"
//       />

//       {/* <div className="split-container">
//         <div className="">
//           <label htmlFor="Location">Location</label>
//           <select
//             className="application_input_select"
//             id="Location"
//             name="Location"
//           >
//             <option value="No">North Johannesburg</option>
//             <option value="So">West Johannesburg</option>
//             <option value="Et">South Johannesburg</option>
//             <option value="we">East Johannesburg</option>
//           </select>
//         </div>

//         <div className="flex-col">
//           <label htmlFor="ZipCode">Zip Code</label>
//           <input
//             className="application_input_select"
//             type="text"
//             id="ZipCode"
//             name="ZipCode"
//             pattern="[0-9]{5}"
//             maxLength="5"
//           />
//         </div>
//       </div> */}

//       <label htmlFor="mainServiceCategory"> Main Service</label>
//       <select className="application_input" id="mainServiceCategory" name="mainServiceCategory">
//         <option value="PLu">Plumbing</option>
//         <option value="El">Electricty</option>
//         <option value="Gar">Garderning</option>
//         <option value="Fi">Cleaning</option>
//         <option value="Hoe">Housekepping</option>
//       </select>


//       <label htmlFor="yearsOfPaidExperience">
//         How many years of paid experience do you have?
//       </label>
//       <input
//         className="application_input"
//         type="number"
//         id="yearsOfPaidExperience"
//         name="yearsOfPaidExperience"
//         pattern="[0-9]{5}"
//         maxLength="80"
//       />

//       <button className="submit-button" onClick={handleSubmit}>
//         Next
//       </button>
//     </div>
//   );
// };

// export default Application;


import React, { useState } from 'react';
import "../Form.css";
import { useFormContext } from "@/utils/FormContext";
import { useNavigate } from 'react-router';

const Application = () => {
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    // Clear the error for this field when it's changed
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // List all fields that require validation
    const requiredFields = [
      'userName', 'mobile', 'email', 'streetName', 'city', 'province',
      'zipCode', 'mainServiceCategory', 'yearsOfPaidExperience'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = '  This field is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      navigate('/SPSignupUploadDocuments')
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div className="flex-col">
      {/* Username Field */}
      <label htmlFor="userName">Username
        {errors.userName && <span className="error-message">{errors.userName}</span>}
      </label>
      <input
        className="application_input"
        type="text"
        id="userName"
        name="userName"
        placeholder="Please enter your username"
        value={formData.userName || ''}
        onChange={handleChange}
      />

      {/* Mobile Field */}
      <label htmlFor="mobile">Mobile Number
        {errors.mobile && <span className="error-message">{errors.mobile}</span>}
      </label>
      <input
        className="application_input"
        type="number"
        id="mobile"
        name="mobile"
        placeholder="Please enter your mobile number"
        value={formData.mobile || ''}
        onChange={handleChange}
      />

      {/* Email Field */}
      <label htmlFor="email">Email Address
        {errors.email && <span className="error-message">{errors.email}</span>}
      </label>
      <input
        className="application_input"
        type="email"
        id="email"
        name="email"
        placeholder="Enter email"
        value={formData.email || ''}
        onChange={handleChange}
      />

      {/* Street Name Field */}
      <label htmlFor="streetName">Street Name
        {errors.streetName && <span className="error-message">{errors.streetName}</span>}
      </label>
      <input
        className="application_input"
        type="text"
        id="streetName"
        name="streetName"
        value={formData.streetName || ''}
        onChange={handleChange}
      />

      {/* City Field */}
      <label htmlFor="city">City
        {errors.city && <span className="error-message">{errors.city}</span>}
      </label>
      <input
        className="application_input"
        type="text"
        id="city"
        name="city"
        value={formData.city || ''}
        onChange={handleChange}
      />

      {/* Province Field */}
      <label htmlFor="province">Province
        {errors.province && <span className="error-message">{errors.province}</span>}
      </label>
      <input
        className="application_input"
        type="text"
        id="province"
        name="province"
        value={formData.province || ''}
        onChange={handleChange}
      />

      {/* Zip Code Field */}
      <label htmlFor="zipCode">Zip Code
        {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
      </label>
      <input
        className="application_input"
        type="number"
        id="zipCode"
        name="zipCode"
        pattern="[0-9]{5}"
        maxLength="5"
        value={formData.zipCode || ''}
        onChange={handleChange}
      />

      {/* Main Service Category Select Field */}
      <label htmlFor="mainServiceCategory">Main Service
        {errors.mainServiceCategory && <span className="error-message">{errors.mainServiceCategory}</span>}
      </label>
      <select
        className="application_input"
        id="mainServiceCategory"
        name="mainServiceCategory"
        value={formData.mainServiceCategory || ''}
        onChange={handleChange}
      >
        <option value="">Select a service</option>
        <option value="PLu">Plumbing</option>
        <option value="El">Electricty</option>
        <option value="Gar">Gardening</option>
        <option value="Fi">Cleaning</option>
        <option value="Hoe">Housekeeping</option>
      </select>

      {/* Years of Paid Experience Field */}
      <label htmlFor="yearsOfPaidExperience">Years of Paid Experience
        {errors.yearsOfPaidExperience && <span className="error-message">{errors.yearsOfPaidExperience}</span>}
      </label>
      <input
        className="application_input"
        type="number"
        id="yearsOfPaidExperience"
        name="yearsOfPaidExperience"
        pattern="[0-9]{1,2}"
        maxLength="2"
        value={formData.yearsOfPaidExperience || ''}
        onChange={handleChange}
      />

      <button className="submit-button" onClick={handleSubmit}>
        Next
      </button>
    </div>
  );
};

export default Application;
