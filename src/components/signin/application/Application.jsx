import React, { useState } from "react";
import "../Form.css";
import { useFormContext } from "@/utils/FormContext";
import { useNavigate } from "react-router";

const Application = () => {
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Correct handleChange to handle nested array updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, key] = name.split(".");
      updateFormData({
        ...formData,
        [section]: { ...formData[section], [key]: value },
      });
    } else {
      updateFormData({ ...formData, [name]: value });
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };


  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Non-nested fields that require validation
    const fields = [
      "userName",
      "mobile",
      "email",
      "expertise",
      "numberOfYearsWorked",
    ];

    // Check non-nested fields
    fields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });

    // Nested fields that require validation
    const nestedFields = [
      { path: "address.streetName", label: "address.streetName" },
      { path: "address.city", label: "address.city" },
      { path: "address.province", label: "address.province" },
      { path: "address.zipCode", label: "address.zipCode" }
    ];

    // Check nested fields
    nestedFields.forEach(({ path, label }) => {
      const [parent, child] = path.split(".");
      if (!formData[parent] || !formData[parent][child]) {
        newErrors[label] = "This field is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
};


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      navigate("/SPSignupUploadDocuments");
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div className="flex-col">
      {/* Username Field */}
      <label htmlFor="userName">
        Username
        {errors.userName && (
          <span className="error-message">{errors.userName}</span>
        )}
      </label>
      <input
        className="application_input"
        type="text"
        id="userName"
        name="userName"
        placeholder="Please enter your username"
        value={formData.userName || ""}
        onChange={handleChange}
      />

      {/* Mobile Field */}
      <label htmlFor="mobile">
        Mobile Number
        {errors.mobile && (
          <span className="error-message">{errors.mobile}</span>
        )}
      </label>
      <input
        className="application_input"
        type="number"
        id="mobile"
        name="mobile"
        placeholder="Please enter your mobile number"
        value={formData.mobile || ""}
        onChange={handleChange}
      />

      {/* Email Field */}
      <label htmlFor="email">
        Email Address
        {errors.email && <span className="error-message">{errors.email}</span>}
      </label>
      <input
        className="application_input"
        type="email"
        id="email"
        name="email"
        placeholder="Enter email"
        value={formData.email || ""}
        onChange={handleChange}
      />

      {/* Street Name Field */}
      <label htmlFor="address.streetName">
        Street Name
        {errors['address.streetName'] && (
            <span className="error-message">{errors['address.streetName']}</span>
          )}
      </label>
      <input
        className="application_input"
        type="text"
        name="address.streetName"
        value={formData.address.streetName || ""}
        onChange={handleChange}
      />

      {/* City Field */}
      <label htmlFor="address.city">
        City
        {/* {errors.city && <span className="error-message">{errors.address.city}</span>} */}
        {errors['address.city'] && (
            <span className="error-message">{errors['address.city']}</span>
          )}
      </label>
      <input
        className="application_input"
        type="text"
        id="city"
        name="address.city"
        value={formData.address.city || ""}
        onChange={handleChange}
      />

      {/* Province Field */}
      <label htmlFor="address.province">
        Province
        {/* {errors.province && (
          <span className="error-message">{errors.address.province}</span>
        )} */}
        {errors['address.province'] && (
            <span className="error-message">{errors['address.province']}</span>
          )}
      </label>
      <input
        className="application_input"
        type="text"
        name="address.province"
        value={formData.address.province || ""}
        onChange={handleChange}
      />

      {/* Zip Code Field */}
      <label htmlFor="address.zipCode">
        Zip Code
        {/* {errors.zipCode && (
          <span className="error-message">{errors.address.zipCode}</span>
        )}  */}
        {errors['address.zipCode'] && (
            <span className="error-message">{errors['address.zipCode']}</span>
          )}
      </label>
      <input
        className="application_input"
        type="number"
        id="zipCode"
        name="address.zipCode"
        pattern="[0-9]{5}"
        maxLength="5"
        value={formData.address.zipCode || ""}
        onChange={handleChange}
      />

      {/* Main Service Category Select Field */}
      <label htmlFor="expertise">
        Main Service
        {errors.expertise && (
          <span className="error-message">{errors.expertise}</span>
        )}
      </label>
      <select
        className="application_input"
        id="expertise"
        name="expertise"
        value={formData.expertise || ""}
        onChange={handleChange}
      >
        <option value="">Select a service</option>
        <option value="Plumbing">Plumbing</option>
        <option value="Electricty">Electricty</option>
        <option value="Gardening">Gardening</option>
        <option value="Cleaning">Cleaning</option>
        <option value="Housekeeping">Housekeeping</option>
      </select>

      {/* Years of Paid Experience Field */}
      <label htmlFor="numberOfYearsWorked">
        Years of Paid Experience
        {errors.numberOfYearsWorked && (
          <span className="error-message">{errors.numberOfYearsWorked}</span>
        )}
      </label>
      <input
        className="application_input"
        type="number"
        id="numberOfYearsWorked"
        name="numberOfYearsWorked"
        pattern="[0-9]{1,2}"
        maxLength="2"
        value={formData.numberOfYearsWorked || ""}
        onChange={handleChange}
      />

      <button className="submit-button" onClick={handleSubmit}>
        Next
      </button>
    </div>
  );
};

export default Application;
