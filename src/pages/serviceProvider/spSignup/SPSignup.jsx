import React, { useState } from "react";
import { useFormContext } from "@/utils/FormContext";
import "./SPSignup.css";
import { FaFile, FaEye, FaEyeSlash } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import FileUpload2 from "@/components/fileUpload/FileUpload2";
import { helix } from "ldrs";
import { useDropzone } from "react-dropzone";

export const SPSignup = () => {
  const { formData, updateFormData } = useFormContext();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [inputType1, setInputType1] = useState("password");
  const [inputType2, setInputType2] = useState("password");

  const toggleInputType1 = () => {
    setInputType1(inputType1 === "password" ? "text" : "password");
  };

  const toggleInputType2 = () => {
    setInputType2(inputType2 === "password" ? "text" : "password");
  };

  const handleFileChange = (inputName) => (acceptedFiles) => {
    // console.log("Accepted files:", acceptedFiles);
    if (acceptedFiles && acceptedFiles.length > 0) {
      // Assuming you want to handle only the first file
      const file = acceptedFiles[0];
      updateFormData({ ...formData, [inputName]: file });
    }
  };

  // const handleFileChange = (inputName) => (eventOrFiles) => {
  //   // Determine if the event is from an input element or Dropzone
  //   let files = eventOrFiles.target ? eventOrFiles.target.files : eventOrFiles;

  //   // Check if files exist and the first item is a File object
  //   if (files.length > 0 && files[0] instanceof File) {
  //     const file = files[0];
  //     updateFormData((prevFormData) => ({
  //       ...prevFormData,
  //       [inputName]: file,
  //     }));
  //     console.log("File stored:", file);
  //   }
  // };

  // const handleFileChange = (inputName) => (eventOrFiles) => {
  //   // Check if it comes from Dropzone or from an input
  //   let file = null;
  //   if (Array.isArray(eventOrFiles)) {
  //     // From Dropzone
  //     file = eventOrFiles[0]; // Assuming you only want the first file
  //   } else if (eventOrFiles.target && eventOrFiles.target.files) {
  //     // From input
  //     file = eventOrFiles.target.files[0];
  //   }

  //   if (file && file instanceof File) {
  //     updateFormData((prevFormData) => ({
  //       ...prevFormData,
  //       [inputName]: file,
  //     }));
  //   }
  // };

  

  const handleChange = (e) => {
    // const { name, type, files } = e.target;
    // updateFormData({ [name]: type === "file" ? files[0] : e.target.value });
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: e.target.value });
  };

  // const handleFileChange = (inputName) => (acceptedFiles) => {
  //   updateFormData({ [inputName]: acceptedFiles[0] });
  // };

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

    // Check password length
    if (formData.password && formData.password.length < 8) {
      newErrors.password = " Password must be at least 8 characters";
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
        // Simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 250));
        console.log("Form submitted:", formData);
        navigate("/SPSignupProfileApplication"); // Redirect on successful submission
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Validation errors:", errors);
      setLoading(false);
    }
  };

  const onDrop = (acceptedFiles) => {
    updateFormData({ profilePicture: acceptedFiles[0] });
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept } =
    useDropzone({ onDrop });

  return (
    <div className="sp__container">
      {isLoading && (
        <>
          <div className="loading-overlay">
            <l-helix size="150" speed="1.5" color="black"></l-helix>
          </div>
        </>
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
                  onChange={handleChange}
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
              {/* <label>
                Upload Avatar
                {errors.profilePicture && (
                  <span className="error-message">{errors.profilePicture}</span>
                )}
              </label> */}
              <FileUpload2
                handleChange={handleFileChange("profilePicture")}
                onDrop={handleFileChange("profilePicture")}
                inputName="profilePicture"
                formData={formData.profilePicture}
                errors={errors.profilePicture}
                labelName="Upload Profile Picture"
              />

              {/* {formData.profilePicture && (
                <div className="file-feedback">
                  <p>File selected: {formData.profilePicture.name}</p>
                </div>
              )} */}
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
