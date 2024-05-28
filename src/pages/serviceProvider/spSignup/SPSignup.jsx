import React, { useState } from "react";
import { useFormContext } from "@/utils/FormContext";
import "./SPSignup.css";
import { FaFile, FaEye, FaEyeSlash } from "react-icons/fa6";
import { useDropzone } from "react-dropzone";
import uploadIcon from "@/assets/upload-icon.png";
import { NavLink, useNavigate } from "react-router-dom";
import FileUpload2 from "@/components/fileUpload/FileUpload2";

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
    const { name, type, files } = e.target;
    updateFormData({ [name]: type === "file" ? files[0] : e.target.value });
  };

   // Handle file changes and store the file in localStorage
  //  const handleFileChange2 = (e, key) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       localStorage.setItem(key, reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // // Retrieve a file from localStorage
  // const getFileFromLocalStorage = (key) => {
  //   const base64String = localStorage.getItem(key);
  //   if (base64String) {
  //     const byteString = atob(base64String.split(",")[1]);
  //     const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
  //     const ab = new ArrayBuffer(byteString.length);
  //     const ia = new Uint8Array(ab);
  //     for (let i = 0; i < byteString.length; i++) {
  //       ia[i] = byteString.charCodeAt(i);
  //     }
  //     return new Blob([ab], { type: mimeString });
  //   }
  //   return null;
  // };

  const handleFileChange = (inputName) => (acceptedFiles) => {
    updateFormData({ [inputName]: acceptedFiles[0] });
  };

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
                <label>Firstname</label>
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ""}
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
