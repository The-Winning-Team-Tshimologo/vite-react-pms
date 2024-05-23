import React, { useState } from "react";
import SPSIgnupProgress from "./SPSIgnupProgress";
import Header from "@/components/header/Header";
import { useFormContext } from "@/utils/FormContext";
import { useNavigate } from "react-router";
import FileUpload2 from "@/components/fileUpload/FileUpload2";

export const SPSignupUploadDocument = () => {
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // const handleChange = (name, e) => {
  //   const { type, files, value } = e.target;
  //   const updatedValue = type === "file" ? files[0] : value;
  //   updateFormData({ [name]: updatedValue });

  //   if (errors[name]) {
  //     setErrors({ ...errors, [name]: null }); // Clear errors on change
  //   }
  // };

  const handleChange = (e) => {
    const { name, type, files } = e.target;
    updateFormData({ [name]: type === "file" ? files[0] : e.target.value });
  };

  const handleFileChange = (inputName) => (acceptedFiles) => {
    updateFormData({ [inputName]: acceptedFiles[0] });
  };

  // const handleFileChange2 = (e, key) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       localStorage.setItem(key, reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

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

  const validateForm = () => {
    const newErrors = {};
    // Validate that all required fields and files are provided
    const requiredFields = [
      "identityDocument",
      "qualification",
      "criminalRecord",
      "resume",
      "bankStatement",
      "bankName",
      "accountNumber",
      "typeOfAccount",
      "branchCode",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // console.log("profilePicture", getFileFromLocalStorage("profilePicture"));
      // console.log("identityDocument", getFileFromLocalStorage("identityDocument"));
      // console.log("qualification", getFileFromLocalStorage("qualification"));
      // console.log("criminalRecord", getFileFromLocalStorage("criminalRecord"));
      // console.log("resume", getFileFromLocalStorage("resume"));
      // console.log("bankStatement", getFileFromLocalStorage("bankStatement"));
      navigate("/SPSignupProfile");
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <>
      <Header />
      <div className="SignupUploadDocument">
        <div className="SPSignupUploadDocument__progress ml-10">
          <SPSIgnupProgress completedPages={50} page={"Background Check"} />
        </div>
        <div className="SPSignupUploadDocument__form">
          <h2 className="w-full text-center">
            <span className="-ms-52">Application</span>
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="file-upload-container">
              <label>
                ID/Passport/License No.
                {errors.identityDocument && (
                  <span className="error-message">
                    {errors.identityDocument}
                  </span>
                )}
              </label>
              <FileUpload2
                handleChange={handleChange}
                onDrop={handleFileChange}
                inputName="identityDocument"
                formData={formData.identityDocument}
                errors={errors.identityDocument}
                // labelName="Upload Avatar"
              />
            </div>

            <div className="file-upload-container">
              <label>
                {" "}
                Qualification/Certificate
                {errors.qualification && (
                  <span className="error-message">{errors.qualification}</span>
                )}
              </label>
              <FileUpload2
                handleChange={handleChange}
                onDrop={handleFileChange}
                inputName="qualification"
                formData={formData.qualification}
                errors={errors.qualification}
                // labelName="Upload Avatar"
              />
            </div>

            <div className="file-upload-container">
              <label>
                Criminal Record/Clearance Certificate
                {errors.criminalRecord && (
                  <span className="error-message">{errors.criminalRecord}</span>
                )}
              </label>
              <FileUpload2
                handleChange={handleChange}
                onDrop={handleFileChange}
                inputName="criminalRecord"
                formData={formData.criminalRecord}
                errors={errors.criminalRecord}
                // labelName="Upload Avatar"
              />
            </div>

            <div className="file-upload-container">
              <label>
                Resume
                {errors.resume && (
                  <span className="error-message">{errors.resume}</span>
                )}
              </label>
              <FileUpload2
                handleChange={handleChange}
                onDrop={handleFileChange}
                inputName="resume"
                formData={formData.resume}
                errors={errors.resume}
                // labelName="Upload Avatar"
              />
            </div>

            <div className="formFiled">
              <label>
                Bank Name{" "}
                {errors.bankName && (
                  <span className="error-message">{errors.bankName}</span>
                )}
              </label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName || ""}
                onChange={handleChange}
              />
            </div>

            <div className="formFiled">
              <label>
                Account Number{" "}
                {errors.accountNumber && (
                  <span className="error-message">{errors.accountNumber}</span>
                )}
              </label>
              <input
                type="number"
                name="accountNumber"
                value={formData.accountNumber || ""}
                onChange={handleChange}
              />
            </div>

            <div className="formFiled">
              <label>
                Type of Account{" "}
                {errors.typeOfAccount && (
                  <span className="error-message">{errors.typeOfAccount}</span>
                )}
              </label>
              <input
                type="text"
                name="typeOfAccount"
                value={formData.typeOfAccount || ""}
                onChange={handleChange}
              />
            </div>

            <div className="formFiled">
              <label>
                Branch Code{" "}
                {errors.branchCode && (
                  <span className="error-message">{errors.branchCode}</span>
                )}
              </label>
              <input
                type="number"
                name="branchCode"
                value={formData.branchCode || ""}
                onChange={handleChange}
              />
            </div>

            <div className="file-upload-container">
              <label>
                Alternatively, submit scanned bank statement
                {errors.bankStatement && (
                  <span className="error-message">{errors.bankStatement}</span>
                )}
              </label>
              <FileUpload2
                handleChange={handleChange}
                onDrop={handleFileChange}
                inputName="bankStatement"
                formData={formData.bankStatement}
                errors={errors.bankStatement}
                // labelName="Upload Avatar"
              />
            </div>

            <button type="submit" className="submit-button -ms-60">
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SPSignupUploadDocument;
