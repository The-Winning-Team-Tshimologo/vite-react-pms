import React, { useState } from "react";
import SPSIgnupProgress from "./SPSIgnupProgress";
import Header from "@/components/header/Header";
import { useFormContext } from "@/utils/FormContext";
import { useNavigate } from "react-router";
import FileUpload2 from "@/components/fileUpload/FileUpload2";
import "./SPSignup.css"

export const SPSignupUploadDocument = () => {
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, files } = e.target;
    updateFormData({ [name]: type === "file" ? files[0] : e.target.value });
  };

  const handleFileChange = (inputName) => (acceptedFiles) => {
    updateFormData({ [inputName]: acceptedFiles[0] });
  };

  const validateForm = () => {
    const newErrors = {};
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form submission starts
    if (validateForm()) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 250)); // Simulate a delay for form submission
        console.log("Form submitted:", formData);
        navigate("/SPSignupProfile");
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setLoading(false); // Set loading to false when form submission ends
      }
    } else {
      setLoading(false); // Set loading to false if validation fails
      console.log("Validation errors:", errors);
    }
  };

  return (
    <>
      <Header />
      {isLoading && (
        <div className="loading-overlay">
          <l-helix size="150" speed="1.5" color="black"></l-helix>
        </div>
      )}
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
              />
            </div>

            <div className="file-upload-container">
              <label>
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
