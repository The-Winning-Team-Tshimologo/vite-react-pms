import React, { useState } from "react";
import { useFormContext } from "@/utils/FormContext";
import "./SPSignup.css";
import { FaFile, FaEye, FaEyeSlash } from "react-icons/fa6";
import { useDropzone } from "react-dropzone";
import uploadIcon from "../../assets/upload-icon.png";
import { NavLink, useNavigate } from "react-router-dom";

export const SPSignup = () => {
  const { formData, updateFormData } = useFormContext();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [inputType1, setInputType1] = useState("password");
  const [inputType2, setInputType2] = useState("password");

  const toggleInputType1 = () => {
    setInputType1(inputType1 === "password" ? "text" : "password");
  };

  const toggleInputType2 = () => {
    setInputType2(inputType2 === "password" ? "text" : "password");
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    updateFormData({ [name]: type === "file" ? e.target.files[0] : value });
  };

  const validateForm = () => {
    const newErrors = {};
    [
      "firstname",
      "lastname",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      navigate("/SPSignupProfileApplication"); // Redirect on successful submission
    } else {
      console.log("Validation errors:", errors);
    }
  };

  const onDrop = (acceptedFiles) => {
    updateFormData({ profilePicture: acceptedFiles[0] });
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept } =
    useDropzone({ onDrop });

  return (
    <div className="sp__container">
      <div className="sp__context">
        <div className="sp__context_side">
          <h2 className="sp__context_side__title">Join as a Pro</h2>
        </div>
        <div className="sp__context_form">
          <h2>Join as a Pro</h2>
          <form onSubmit={handleSubmit}>
            <div className="sp__context_form_top">
              <div className="formFiled">
                <label>
                  Firstname
                  
                </label>
                {errors.firstname && (
                    <span className="error-message">{errors.firstname}</span>
                  )}
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="formFiled">
                <label>
                  Lastname
                  
                </label>
                {errors.lastname && (
                    <span className="error-message">{errors.lastname}</span>
                  )}
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname || ""}
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
                Upload Avatar
                {errors.profilePicture && (
                  <span className="error-message">{errors.profilePicture}</span>
                )}
              </label>
              <div
                {...getRootProps()}
                className="file-upload-box"
                style={{
                  borderColor: isDragActive ? "#888" : "#5E8D83",
                  backgroundColor: isDragAccept ? "#f0f8ff" : "#f8fafc",
                }}
              >
                <img src={uploadIcon} alt="Upload" className="h-12" />
                <input {...getInputProps()} />
                <p>Drag & drop files or click to browse</p>
              </div>
              {formData.profilePicture && (
                <div className="file-feedback">
                  <p>File selected: {formData.profilePicture.name}</p>
                </div>
              )}
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
