import React, { useState } from "react";
import "./SPSignup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faCloudUploadAlt,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import uploadIcon from "../../assets/upload-icon.png";

export const SPSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
  });

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
    setFormData({
      ...formData,
      [name]: type === "file" ? e.target.files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
      setErrors(errors);
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    for (const key in data) {
      if (!data[key]) {
        // errors[key] = `${
        //   key.charAt(0).toUpperCase() + key.slice(1)
        // } is required `;

        errors[key] = ` is required `;
      }
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const onDrop = (acceptedFiles, fieldName) => {
    setFormData({
      ...formData,
      ["profilePicture"]: acceptedFiles[0],
    });
    console.log(acceptedFiles[0]);
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
                  Name{" "}
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />{" "}
                {/* {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )} */}
              </div>

              <div className="formFiled">
                <label>
                  Surname{" "}
                  {errors.surname && (
                    <span className="error-message">{errors.surname}</span>
                  )}
                </label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                />{" "}
                {/* {errors.surname && (
                  <span className="error-message">{errors.surname}</span>
                )} */}
              </div>
            </div>

            <div className="formFiled">
              {" "}
              <label>
                Password{" "}
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}{" "}
              </label>
              <input
                type={inputType1}
                name="password"
                value={formData.password}
                onChange={handleChange}
                // id="password"
              />
              <span onClick={toggleInputType1} className="icon-button">
                {inputType1 === "password" ? (
                  <FontAwesomeIcon icon={faEye} className="icon-button__icon" />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="icon-button__icon"
                  />
                )}
              </span>{" "}
              {/* {errors.password && (
                <span className="error-message">{errors.password}</span>
              )} */}
            </div>

            <div className="formFiled">
              <label>
                Confirm Password{" "}
                {errors.confirmPassword && (
                  <span className="error-message">
                    {errors.confirmPassword}
                  </span>
                )}{" "}
              </label>
              <input
                type={inputType2}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                // id="password"
              />
              <span onClick={toggleInputType2} className="icon-button">
                {inputType2 === "password" ? (
                  <FontAwesomeIcon icon={faEye} className="icon-button__icon" />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="icon-button__icon"
                  />
                )}
              </span>{" "}
              {/* {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )} */}
            </div>

            {/* <div className="file-upload-container">
              <label>Upload Avatar {errors.profilePicture && (
                <span className="error-message">{errors.profilePicture}</span>
              )}</label>
              <div
                className="file-upload-box"
                {...getRootProps()}
                style={{
                  borderColor: isDragActive ? "#888" : "#5E8D83",
                  backgroundColor: isDragAccept ? "#f0f8ff" : "#f8fafc",
                }}
              >
                <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" className="file-upload__icon" />
                <p>
                  Drag & drop files or{" "}
                  <label htmlFor="file-upload" className="browse-label">
                    Browse
                  </label>
                </p>
                <p style={{ fontSize: "12px" }}>
                  Supported formats: JPEG, PNG, PDF
                </p>
                <input
                  type="file"
                  id="file-upload"
                  name="profilePicture"
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </div>
              {formData.profilePicture && (
                <div className="file-feedback">
                  <p>File selected: {formData.profilePicture.name}</p>
                </div>
              )}

            </div> */}

            <div className="file-upload-container">
              <label>
                Upload Avatar{" "}
                {errors.profilePicture && (
                  <span className="error-message">{errors.profilePicture}</span>
                )}
              </label>
              <div
                className="file-upload-box"
                {...getRootProps()}
                style={{
                  borderColor: isDragActive ? "#888" : "#5E8D83",
                  backgroundColor: isDragAccept ? "#f0f8ff" : "#f8fafc",
                }}
              >
                <div className="flex items-center justify-center p-2 rounded-full h-10 ">
                  <img src={uploadIcon} alt="Upload" className="h-12" />
                </div>
                <p>
                  Drag & drop files or{" "}
                  <label htmlFor="file-upload" className="browse-label">
                    Browse
                  </label>
                </p>
                <p style={{ fontSize: "12px" }}>
                  Supported formats: JPEG, PNG, PDF
                </p>
                <input
                  type="file"
                  id="file-upload"
                  name="profilePicture"
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </div>
              {formData.profilePicture && (
                <div className="file-feedback">
                  <p>File selected: {formData.profilePicture.name}</p>
                </div>
              )}
            </div>

            <button type="submit">Next</button>
            <br />
          </form>
        </div>
      </div>

      <div className="sp__requirements">
        <div className="sp__requirements__head">
          <hr />
          <FontAwesomeIcon icon={faFile} size="2x" color="gray" />
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
            {" "}
            We (Property Maintenance System) are not an employer, simply connect
            independent service providers with customers
          </strong>
        </p>
      </div>
    </div>
  );
};
