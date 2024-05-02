import FileUpload2 from "@/components/fileUpload/FileUpload2";
import React, { useState } from "react";
import SPSIgnupProgress from "./SPSIgnupProgress";

export const SPSignupUploadDocument = () => {
  const [formData, setFormData] = useState({
    id: "",
    qualification: "",
    criminalRecord: "",
    resume: "",
    sarsNo: "",
    bankName: "",
    accountNumber: "",
    typeOfAccount: "",
    branchCode: "",
    bankStatement: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // console.log(name);
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
      console.log("errors:", errors);
      console.log("Form:", formData);
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
    return errors;
  };

  const onDrop = (fieldName) => (acceptedFiles) => {
    setFormData({
      ...formData,
      //   ["profilePicture"]: acceptedFiles[0],
      [fieldName]: acceptedFiles[0],
    });
  };
  return (
    <div className="SignupUploadDocument flex   ">
      <div className="SPSignupUploadDocument__progress  ml-10 ">
        <SPSIgnupProgress completedPages={50} page={"Background Check"} />
      </div>
      {/* <h2>SPSignupUploadDocument</h2> */}
      <div className="SPSignupUploadDocument__form">
        <h2>Application</h2>

        <form onSubmit={handleSubmit}>
          <FileUpload2
            handleChange={handleChange}
            onDrop={onDrop}
            inputName={"id"}
            formData={formData.id}
            errors={errors.id}
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

          <div className="formFiled">
            <label>
              SARS No.{" "}
              {errors.sarsNo && (
                <span className="error-message">{errors.sarsNo}</span>
              )}
            </label>
            <input
              type="number"
              name="sarsNo"
              value={formData.sarsNo}
              onChange={handleChange}
            />{" "}
          </div>

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

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
