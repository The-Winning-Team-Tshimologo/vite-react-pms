import React, { useState } from "react";
import { useFormContext } from "@/utils/FormContext";
import "./SPSignup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { helix } from "ldrs";
import { FaFile } from "react-icons/fa";
import FileUpload2 from "@/components/fileUpload/FileUpload2";

export const SPSignup = () => {
  const { formData, updateFormData } = useFormContext();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [inputType1, setInputType1] = useState("password");
  const [inputType2, setInputType2] = useState("password");
  const [isLoading, setLoading] = useState(false);

  // Toggle the visibility of the password input field
  const toggleInputType1 = () => {
    setInputType1(inputType1 === "password" ? "text" : "password");
  };

  // Toggle the visibility of the confirm password input field
  const toggleInputType2 = () => {
    setInputType2(inputType2 === "password" ? "text" : "password");
  };

  const handleChange = (e) => {
    const { name, type, files } = e.target;
    updateFormData({ [name]: type === "file" ? files[0] : e.target.value });
  };

  const handleFileChange = (inputName) => (acceptedFiles) => {
    updateFormData({ [inputName]: acceptedFiles[0] });
  };
//  Validate the form fields

  const validateForm = () => {
    const newErrors = {};
    [
      "firstName",
      "lastName",
      "password",
      "confirmPassword",
      "profilePicture",
    ].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "  This field is required";
      }
    });

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    helix.register(); // Perform any necessary actions before submission
    setLoading(true);
    if (validateForm()) {
      try {
        // Simulate a delay for form submission
        await new Promise((resolve) => setTimeout(resolve, 250));

        console.log("Form submitted:", formData);
        navigate("/SPSignupProfileApplication"); // Navigate to the next page on success
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setLoading(false);
        console.log(
          "profilePicture",
          getFileFromLocalStorage("profilePicture")
        );
      }
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div className="sp__container">
      {isLoading && (
        <div className="loading-overlay">
          <l-helix size="150" speed="1.5" color="black"></l-helix>
        </div>
      )}
      <div className="sp__context">
        <div className="sp__context_side">
          <h2 className="sp__context_side__title">Join as a Pro</h2>
        </div>
        <div className="sp__context_form">
          <h2>Join as a Pro</h2>
          <form onSubmit={handleSubmit}>
            <div className="sp__context_form_top">
              <div className="formFiled">
                <label>Firstname</label>
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ""}
                  // onChange={(e) => handleChange("firstName", e)}
                  onChange={handleChange}
                />
              </div>

              <div className="formFiled">
                <label>Lastname</label>
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ""}
                  // onChange={(e) => handleChange("lastName", e)}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="formFiled">
              <label>
                Password
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </label>
              <input
                type={inputType1}
                name="password"
                value={formData.password || ""}
                // onChange={(e) => handleChange("password", e)}
                onChange={handleChange}
              />
              <span onClick={toggleInputType1} className="icon-button">
                {inputType1 === "password" ? (
                  <FaEye className="icon-button__icon" />
                ) : (
                  <FaEyeSlash className="icon-button__icon" />
                )}
              </span>
            </div>

            <div className="formFiled">
              <label>
                Confirm Password
                {errors.confirmPassword && (
                  <span className="error-message">
                    {errors.confirmPassword}
                  </span>
                )}
              </label>
              <input
                type={inputType2}
                name="confirmPassword"
                value={formData.confirmPassword || ""}
                // onChange={(e) => handleChange("confirmPassword", e)}
                onChange={handleChange}
              />
              <span onClick={toggleInputType2} className="icon-button">
                {inputType2 === "password" ? (
                  <FaEye className="icon-button__icon" />
                ) : (
                  <FaEyeSlash className="icon-button__icon" />
                )}
              </span>
            </div>

            <div className="file-upload-container">
              <label>
                {/* Upload Avatar */}
                {errors.profilePicture && (
                  <span className="error-message">{errors.profilePicture}</span>
                )}
              </label>
              <FileUpload2
                handleChange={handleChange}
                onDrop={handleFileChange}
                inputName="profilePicture"
                formData={formData.profilePicture}
                errors={errors.profilePicture}
                labelName="Upload Avatar"
              />
            </div>
            <p>
              Already have an account? <NavLink to={"/signin"}>Sign in</NavLink>
            </p>
            <button type="submit">Next</button>
          </form>
        </div>
      </div>
      <div className="sp__requirements">
        <div className="sp__requirements__head">
          <hr />
          <FaFile className="w-52  h-10" color="gray" />
          <hr />
        </div>
        <h2>Requirements</h2>
        <ul>
          <li>
            Must have paid experience with the services you are applying for
          </li>
          <li>Must be authorized to work in the country you are applying in</li>
          <li>
            Must be proficient as well as have excellent customer service skills
          </li>
          <li>
            Must have current qualifications/certifications for the services you
            are applying for
          </li>
        </ul>
        <br />
        <p>
          <strong>
            We (Property Maintenance System) are not an employer, simply connect
            independent service providers with customers
          </strong>
        </p>
      </div>
    </div>
  );
};
