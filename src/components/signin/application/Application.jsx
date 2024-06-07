import React, { useState } from "react";
import "../Form.css";
import { useFormContext } from "@/utils/FormContext";
import { useNavigate } from "react-router";

const Application = () => {
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    const fields = [
      "userName",
      "mobile",
      "email",
      "expertise",
      "numberOfYearsWorked",
    ];

    fields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });

    const nestedFields = [
      { path: "address.streetName", label: "Street Name" },
      { path: "address.city", label: "City" },
      { path: "address.province", label: "Province" },
      { path: "address.zipCode", label: "Zip Code" },
    ];

    nestedFields.forEach(({ path, label }) => {
      const [parent, child] = path.split(".");
      if (!formData[parent] || !formData[parent][child]) {
        newErrors[path] = `This field is required`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      setLoading(true);
      setTimeout(() => {
        console.log("Form submitted:", formData);
        navigate("/SPSignupUploadDocuments");
        setLoading(false);
      }, 250);
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div className="flex-col">
      {isLoading && (
        <div className="loading-overlay">
          <l-helix size="150" speed="1.5" color="black"></l-helix>
        </div>
      )}
      <form onSubmit={handleSubmit}>
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
          placeholder="Enter Username"
          value={formData.userName || ""}
          onChange={handleChange}
        />

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
          placeholder="Enter Mobile Number"
          value={formData.mobile || ""}
          onChange={handleChange}
        />

        <label htmlFor="email">
          Email Address
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </label>
        <input
          className="application_input"
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email || ""}
          onChange={handleChange}
        />

        <label htmlFor="address.streetName">
          Street Name
          {errors["address.streetName"] && (
            <span className="error-message">{errors["address.streetName"]}</span>
          )}
        </label>
        <input
          className="application_input"
          type="text"
          name="address.streetName"
          placeholder="Enter Street Name"
          value={formData.address?.streetName || ""}
          onChange={handleChange}
        />

        <label htmlFor="address.city">
          City
          {errors["address.city"] && (
            <span className="error-message">{errors["address.city"]}</span>
          )}
        </label>
        <input
          className="application_input"
          type="text"
          name="address.city"
          placeholder="Enter City"
          value={formData.address?.city || ""}
          onChange={handleChange}
        />

        <label htmlFor="address.province">
          Province
          {errors["address.province"] && (
            <span className="error-message">{errors["address.province"]}</span>
          )}
        </label>
        <input
          className="application_input"
          type="text"
          name="address.province"
          placeholder="Enter Province"
          value={formData.address?.province || ""}
          onChange={handleChange}
        />

        <label htmlFor="address.zipCode">
          Zip Code
          {errors["address.zipCode"] && (
            <span className="error-message">{errors["address.zipCode"]}</span>
          )}
        </label>
        <input
          className="application_input"
          type="number"
          id="zipCode"
          name="address.zipCode"
          placeholder="Enter Zip Code"
          pattern="[0-9]{5}"
          maxLength="5"
          value={formData.address?.zipCode || ""}
          onChange={handleChange}
        />
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
          <option value="Electricity">Electricity</option>
          <option value="Gardening">Gardening</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Housekeeping">Housekeeping</option>
        </select>

        <label htmlFor="numberOfYearsWorked">
          Years of Paid Experience
          {errors.numberOfYearsWorked && (
            <span className="error-message">
              {errors.numberOfYearsWorked}
            </span>
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
      </form>
    </div>
  );
};

export default Application;
