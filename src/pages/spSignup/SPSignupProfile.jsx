import React, { useState } from "react";

export const SPSignupProfile = () => {
  const [formData, setFormData] = useState({
    professionalSummary: "",
    workExperience: "",
    education: "",
    license: "",
    skills: "",
    hourlyRate: "",
    numberOfYearsWorked: "",
    typeOfAccount: "",
    branchCode: "",
    bankStatement: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setFormData({
      ...formData,
      [name]: value,
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

  return (
    <div>
      {/* SPSignupProfile */}
      <div className="SPSignupProfile__container">
        <div className="SPSignupProfile__progress"></div>
        {/* <div className="SPSignupProfile__form">
          <div className="formFiled">
            <label>
              Professional Summary{" "}
              {errors.professionalSummary && (
                <span className="error-message">
                  {errors.professionalSummary}
                </span>
              )}
            </label>
            <input
              type="textarea"
              name="professionalSummary"
              value={formData.professionalSummary}
              onChange={handleChange}
            />{" "}
          </div>
        </div> */}

        
        {/*  professionalSummary: "",
    workExperience: "",
    education: "",
    license: "",
    skills: "",
    hourlyRate: "",
    numberOfYearsWorked: "",
    typeOfAccount: "",
    branchCode: "",
    bankStatement: "", */}
      </div>
    </div>
  );
};
