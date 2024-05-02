/** @format */

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/security/auth/AuthContext";
import "./SignUp.css";

const SignUp = () => {
  const { register } = useAuth(); // Accessing register function from AuthProvider
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    user_name: "",
    password: "",
    confirmPassword: "",
    address: {
      streetName: "",
      city: "",
      province: "",
      postalCode: "",
    },
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      // If the field is part of the address object
      const addressField = name.split(".")[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: {
          ...prevFormData.address,
          [addressField]: value,
        },
      }));
    } else {
      // If the field is not part of the address object
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      try {
        // Check if address data is provided
        if (
          !formData.address ||
          !formData.address.streetName ||
          !formData.address.city ||
          !formData.address.province ||
          !formData.address.postalCode
        ) {
          throw new Error("Address data is incomplete");
        }

        const response = await register(formData);
        if (response) {
          // Registration successful, redirect or perform any other actions
          navigate("/signin");
        } else {
          // Registration failed, errors will be set in the state by the register function
          setErrors(`Registration failed: ${error}`);
        }
      } catch (error) {
        console.error("Registration failed:", error);
        setErrors(`Registration failed: ${error}`);
      }
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    for (const key in data) {
      if (!data[key]) {
        errors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required `;
      }
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1>Welcome to Our Community</h1>
        <p>
          Your one-stop solution for home perfection. From plumbing and
          electrical repairs to pool maintenance and gardening expertise, Our
          team of skilled professionals is dedicated to delivering unparalleled
          craftsmanship, reliability, and efficiency in every repair and
          enhancement, bringing a touch of expertise to every corner of your
          homes
        </p>

        <br />
        <div className="image-stack">
          <img
            src="src\assets\register page pic1.png"
            alt="Community Member 3"
          />
          <p>1k plus people have joined our platform now it's your turn!</p>
        </div>
      </div>

      <div className="signup-form">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="formFiled">
            <label>Name </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="formFiled">
            <label>Surname </label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            />
            {errors.surname && (
              <span className="error-message">{errors.surname}</span>
            )}
          </div>

          <div className="formFiled">
            <label>Email </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="formFiled">
            <label>Username </label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
            />
            {errors.user_name && (
              <span className="error-message">{errors.user_name}</span>
            )}
          </div>

          <div className="formFiled">
            <label>Address </label>
            <div className="flex flex-col signup-address__container">
              <div className="">
                <input
                  className=""
                  type="text"
                  placeholder="Street Name"
                  name="address.streetName"
                  value={formData.address.streetName}
                  onChange={handleChange}
                />
                {errors.streetName && (
                  <span className="error-message">{errors.streetName}</span>
                )}
              </div>

              <div className="">
                <input
                  className=""
                  type="text"
                  placeholder="City"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                />
                {errors.city && (
                  <span className="error-message">{errors.city}</span>
                )}
              </div>

              <div className="">
                <input
                  className=""
                  type="text"
                  placeholder="Province"
                  name="address.province"
                  value={formData.address.province}
                  onChange={handleChange}
                />
                {errors.province && (
                  <span className="error-message">{errors.province}</span>
                )}
              </div>

              <input
                className=""
                type="text"
                placeholder="Postal Code"
                name="address.postalCode"
                value={formData.address.postalCode}
                onChange={handleChange}
              />
              {errors.postalCode && (
                <span className="error-message">{errors.postalCode}</span>
              )}
            </div>
          </div>

          <div className="formFiled">
            <label>Password </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="formFiled">
            <label>Confirm Password </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>
         
          <div className="mt-5"><p>Have an account already? <NavLink to={"/signin"} className={" text-blue-500"}>Signin</NavLink></p></div>
<br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
