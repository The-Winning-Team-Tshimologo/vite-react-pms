import FileUpload2 from "@/components/fileUpload/FileUpload2";
import React, { useState } from "react";
import SPSIgnupProgress from "./SPSIgnupProgress";
import Header from "@/components/header/Header";
import { useFormContext } from "@/utils/FormContext";
import { useNavigate } from "react-router";
import { helix } from "ldrs";

export const SPSignupUploadDocument = () => {
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value, type } = e.target;
  //   updateFormData({ [name]: type === "file" ? e.target.files[0] : value });
  //   if (errors[name]) {
  //     setErrors({ ...errors, [name]: null }); // Clear errors on change
  //   }
  // };

  const handleFileChange = (inputName) => (eventOrFiles) => {
    // Check if it comes from Dropzone or from an input
    let file = null;
    if (Array.isArray(eventOrFiles)) {
      // From Dropzone
      file = eventOrFiles[0]; // Assuming you only want the first file
    } else if (eventOrFiles.target && eventOrFiles.target.files) {
      // From input
      file = eventOrFiles.target.files[0];
    }

    if (file && file instanceof File) {
      updateFormData((prevFormData) => ({
        ...prevFormData,
        [inputName]: file,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null }); // Clear errors on change
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Validate that all required fields and files are provided
    [
      "identityDocument",
      "bankStatement",
      "criminalRecord",
      "resume",
      "bankName",
      "accountNumber",
      "typeOfAccount",
      "branchCode",
    ].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     console.log("Form submitted:", formData);
  //     // Here you can handle navigation or further steps
  //     navigate("/SPSignupProfile");
  //   } else {
  //     console.log("errors:", errors);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    helix.register(); // Assuming helix.register() is synchronous
    setLoading(true); // Set loading state to true before the request simulation

    if (validateForm()) {
      try {
        // Simulate a network request with a 250ms delay
        await new Promise((resolve) => setTimeout(resolve, 250));
        console.log("Form submitted:", formData);
        navigate("/SPSignupProfile"); // Redirect on successful submission
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setLoading(false); // Reset loading state after the request simulation
      }
    } else {
      console.log("Validation errors:", errors);
      setLoading(false); // Reset loading state if validation fails
    }
  };

  const onDrop = (fieldName) => (acceptedFiles) => {
    updateFormData({ [fieldName]: acceptedFiles[0] });
  };
  return (
    <>
      <Header />
      {isLoading && (
        <>
          <div className="loading-overlay">
            <l-helix size="150" speed="1.5" color="black"></l-helix>
          </div>
        </>
      )}
      <div className="SignupUploadDocument">
        <div className="SPSignupUploadDocument__progress ml-10">
          <SPSIgnupProgress
            completedPages={50}
            page={"Background Check"}
            className=""
          />
        </div>
        {/* <h2>SPSignupUploadDocument</h2> */}
        <div className="SPSignupUploadDocument__form">
          <h2 className="w-full text-center">
            <span className="-ms-52">Application</span>
          </h2>

          <form onSubmit={handleSubmit}>
            <FileUpload2
              handleChange={handleFileChange("identityDocument")}
              onDrop={handleFileChange("identityDocument")}
              inputName={"identityDocument"}
              formData={formData.identityDocument}
              errors={errors.identityDocument}
              labelName={"ID/Passport/License No."}
            />

            <FileUpload2
              handleChange={handleFileChange("qualification")}
              onDrop={handleFileChange("qualification")}
              inputName={"qualification"}
              formData={formData.qualification}
              errors={errors.qualification}
              labelName={"Qualification/Certificate"}
            />
            <FileUpload2
              handleChange={handleFileChange("criminalRecord")}
              onDrop={handleFileChange("criminalRecord")}
              inputName={"criminalRecord"}
              formData={formData.criminalRecord}
              errors={errors.criminalRecord}
              labelName={"Criminal Record/Clearance Certificate"}
            />

            <FileUpload2
              handleChange={handleFileChange("resume")}
              onDrop={handleFileChange("resume")}
              inputName={"resume"}
              formData={formData.resume}
              errors={errors.resume}
              labelName={"Resume"}
            />

            <div className="bankDetails__header">
              <span>Account Details</span>
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
                value={formData.bankName}
                onChange={handleChange}
              />{" "}
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
                value={formData.accountNumber}
                onChange={handleChange}
              />{" "}
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
                value={formData.typeOfAccount}
                onChange={handleChange}
              />{" "}
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
                value={formData.branchCode}
                onChange={handleChange}
              />{" "}
            </div>

            <FileUpload2
              handleChange={handleFileChange("bankStatement")}
              onDrop={handleFileChange("bankStatement")}
              inputName="bankStatement"
              formData={formData.bankStatement}
              errors={errors.bankStatement}
              labelName="Upload Bank Statement"
            />

            <button type="submit" className="submit-button -ms-60">
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
