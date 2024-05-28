import FileUpload2 from "@/components/fileUpload/FileUpload2";
import React, { useState } from "react";
import SPSIgnupProgress from "./SPSIgnupProgress";
import Header from "@/components/header/Header";
import { useFormContext } from "@/utils/FormContext";
import { useNavigate } from "react-router";

export const SPSignupUploadDocument = () => {
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    updateFormData({ [name]: type === "file" ? e.target.files[0] : value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null }); // Clear errors on change
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Validate that all required fields and files are provided
    [
      "identityDocument",
      "qualification",
      "criminalRecord",
      "resume",
      "bankStatement",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Here you can handle navigation or further steps
      navigate("/SPSignupProfile");
    } else {
      console.log("errors:", errors);
    }
  };

  const onDrop = (fieldName) => (acceptedFiles) => {
    updateFormData({ [fieldName]: acceptedFiles[0] });
  };
  return (
    <>
      <Header />
      <div className="SignupUploadDocument">
        <div className="SPSignupUploadDocument__progress ml-10">
          <SPSIgnupProgress completedPages={50} page={"Background Check"} />
        </div>
        {/* <h2>SPSignupUploadDocument</h2> */}
        <div className="SPSignupUploadDocument__form">
          <h2 className="w-full text-center">
            <span className="-ms-52">Application</span>
          </h2>

          <form onSubmit={handleSubmit}>
            <FileUpload2
              handleChange={handleChange}
              onDrop={onDrop}
              inputName={"identityDocument"}
              formData={formData.identityDocument}
              errors={errors.identityDocument}
              labelName={"ID/Passport/License No."}
            />

            <FileUpload2
              handleChange={handleChange}
              onDrop={onDrop}
              inputName={"qualification"}
              formData={formData.qualification}
              errors={errors.qualification}
              labelName={"Qualification/Certificate"}
            />
            <FileUpload2
              handleChange={handleChange}
              onDrop={onDrop}
              inputName={"criminalRecord"}
              formData={formData.criminalRecord}
              errors={errors.criminalRecord}
              labelName={"Criminal Record/Clearance Certificate"}
            />

            <FileUpload2
              handleChange={handleChange}
              onDrop={onDrop}
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
              handleChange={handleChange}
              onDrop={onDrop}
              inputName={"bankStatement"}
              formData={formData.bankStatement}
              errors={errors.bankStatement}
              labelName={"Alternatively, submit scanned bank statement "}
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
