import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    streetName: "",
    surburb: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
      setErrors(errors);
      navigate("/");
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
            />{" "}
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
            />{" "}
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
            />{" "}
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="formFiled">
            <label>Username </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="formFiled">
            <label>Address </label>
            <div className="flex flex-col signup-address__container">
              <div className="flex flex-col">
                <input
                  className="p-2"
                  type="text"
                  placeholder="Street Name"
                  name="streetName"
                  value={formData.streetName}
                  onChange={handleChange}
                />{" "}
                {errors.streetName && (
                  <span className="error-message">{errors.streetName}</span>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  className="p-2"
                  type="text"
                  placeholder="Suburb"
                  name="suburb"
                  value={formData.surburb}
                  onChange={handleChange}
                />
                {errors.surburb && (
                  <span className="error-message">{errors.surburb}</span>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  className="p-2"
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && (
                  <span className="error-message">{errors.city}</span>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  className="p-2"
                  type="text"
                  placeholder="Province"
                  name="Province"
                  value={formData.province}
                  onChange={handleChange}
                />
                {errors.province && (
                  <span className="error-message">{errors.province}</span>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  className="p-2"
                  type="number"
                  placeholder="Postal Code"
                  name="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
                {errors.postalCode && (
                  <span className="error-message">{errors.postalCode}</span>
                )}
              </div>
            </div>
          </div>

          <div className="formFiled">
            {" "}
            <label>Password </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />{" "}
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
            />{" "}
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>
          <br />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
