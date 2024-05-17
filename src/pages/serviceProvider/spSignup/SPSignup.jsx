import React, { useState } from "react";
import { useFormContext } from "@/utils/FormContext";
import "./SPSignup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { helix } from "ldrs";
import { FaFile } from "react-icons/fa";

export const SPSignup = () => {
  const { formData, updateFormData } = useFormContext();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [inputType1, setInputType1] = useState("password");
  const [inputType2, setInputType2] = useState("password");
  const [profilePicture, setProfilePicture] = useState();

  const toggleInputType1 = () => {
    setInputType1(inputType1 === "password" ? "text" : "password");
  };

  const toggleInputType2 = () => {
    setInputType2(inputType2 === "password" ? "text" : "password");
  };

  const handleChange = (name, e) => {
    const { type, files, value } = e.target;
    // const updatedValue = type === "file" ? files[0] : value;
    const updatedValue = type === "file" ? files[0] : value;
    // const updatedValue = value;

    updateFormData({ [name]: updatedValue });

  

    if (errors[name]) {
      setErrors({ ...errors, [name]: null }); // Clear errors on change
    }
  };

  const handleFileChange2 = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem(key, reader.result);
        // formData.append(
        //   "profilePicture",
        //   getFileFromLocalStorage("profilePicture")
        // );
        // updateFormData({ [profilePicture]: getFileFromLocalStorage("profilePicture") });
        // updateFormData(
        //   profilePicture,
        //   getFileFromLocalStorage("profilePicture")
        // );
        // setFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const getFileFromLocalStorage = (key) => {
    const base64String = localStorage.getItem(key);
    if (base64String) {
      const byteString = atob(base64String.split(",")[1]);
      const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }
    return null;
  };

  const validateForm = () => {
    const newErrors = {};
    [
      "firstName",
      "lastName",
      "password",
      "confirmPassword",
      // "profilePicture",
    ].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    helix.register();
    setLoading(true);
    if (validateForm()) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 250));

        console.log("Form submitted:", formData);
        navigate("/SPSignupProfileApplication");
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setLoading(false);
        // console.log("pp", localStorage.getItem("profilePicture"));
        console.log("profilePicture", getFileFromLocalStorage("profilePicture"));
   
      }
    } else {
      console.log("Validation errors:", errors);
      setLoading(false);
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
                <label>
                  Firstname{" "}
                  {errors.firstName && (
                    <span className="error-message">{errors.firstName}</span>
                  )}
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={(e) => handleChange("firstName", e)}
                />
              </div>
              <div className="formFiled">
                <label>
                  Lastname{" "}
                  {errors.lastName && (
                    <span className="error-message">{errors.lastName}</span>
                  )}
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={(e) => handleChange("lastName", e)}
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
                onChange={(e) => handleChange("password", e)}
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
                onChange={(e) => handleChange("confirmPassword", e)}
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
                Upload Profile Picture
                {errors.profilePicture && (
                  <span className="error-message">{errors.profilePicture}</span>
                )}
              </label>
              {/* <input
                type="file"
                name="profilePicture"
                onChange={(e) => handleChange("profilePicture", e)}
              /> */}
              <input
                type="file"
                name="profilePicture"
                onChange={(e) => handleFileChange2(e, "profilePicture")}
              />
            </div>
            <p>
              Already have an account?{" "}
              <NavLink to={"/signin"} className={" text-blue-500"}>
                Sign in
              </NavLink>
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
