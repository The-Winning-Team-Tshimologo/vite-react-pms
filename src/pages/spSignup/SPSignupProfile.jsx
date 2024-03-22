import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SPSIgnupProgress from "./SPSIgnupProgress";

export const SPSignupProfile = () => {
  const [formData, setFormData] = useState({
    professionalSummary: "",
    workExperience: "",
    education: "",
    license: "",
    skills: "",
    hourlyRate: "",
    numberOfYearsWorked: "",
    agreement: false,
  });
  // const variableNames = Object.keys(formData);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name);
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

  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      ["agreement"]: !formData.agreement,
    });
  };

  let page = "Activation";

  return (
    <div className="SPSignupProfile__container flex">
      <div className="SPSignupProfile__progress  ml-10">
        <SPSIgnupProgress formData={formData} page={"Profile"} />
      </div>

      <div className="SPSignupProfile__form_container ">
        <h2 className="px-10">Application</h2>
        <form className="appointment__container   " onSubmit={handleSubmit}>
          <div className="p-10  pb-0">
            <p>
              {" "}
              Professional Summary{" "}
              {errors.professionalSummary && (
                <span className="error-message">
                  {errors.professionalSummary}
                </span>
              )}
            </p>
            <Textarea
              name={"professionalSummary"}
              value={formData.professionalSummary}
              onChange={handleChange}
              className="custom-border bg-gray-100 "
              rows={10}
            />
          </div>

          <div className="p-10  pb-0 ">
            <p>
              {" "}
              Work Experience{" "}
              {errors.workExperience && (
                <span className="error-message">{errors.workExperience}</span>
              )}
            </p>
            <Textarea
              name={"workExperience"}
              value={formData.workExperience}
              onChange={handleChange}
              className="custom-border bg-gray-100"
              rows={10}
            />
          </div>

          <div className="p-10  pb-0">
            <p>
              {" "}
              Education{" "}
              {errors.education && (
                <span className="error-message">{errors.education}</span>
              )}
            </p>
            <Textarea
              name={"education"}
              value={formData.education}
              onChange={handleChange}
              className="custom-border bg-gray-100"
              rows={10}
            />
          </div>

          <div className="p-10  pb-0">
            <p>
              {" "}
              License{" "}
              {errors.license && (
                <span className="error-message">{errors.license}</span>
              )}
            </p>
            <Textarea
              name={"license"}
              value={formData.license}
              onChange={handleChange}
              className="custom-border bg-gray-100"
              rows={10}
            />
          </div>

          <div className="p-10  pb-0">
            <p>
              {" "}
              Skills{" "}
              {errors.skills && (
                <span className="error-message">{errors.skills}</span>
              )}
            </p>
            <Textarea
              name={"skills"}
              value={formData.skills}
              onChange={handleChange}
              className="custom-border bg-gray-100"
              rows={10}
            />
          </div>

          <div className="formFiled relative p-10  pb-0 m-0">
            <p>
              Hourly Rate{" "}
              {errors.hourlyRate && (
                <span className="error-message">{errors.hourlyRate}</span>
              )}
            </p>
            <input
              type="number"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              className="custom-border bg-gray-100  indent-8"
              id="textIndent"
            />{" "}
            <span className="absolute left-11 top-[70px] text-gray-600">R</span>
          </div>

          <div className="formFiled  p-10  pb-0 m-0">
            <p>
              Number of Years Worked{" "}
              {errors.numberOfYearsWorked && (
                <span className="error-message">
                  {errors.numberOfYearsWorked}
                </span>
              )}
            </p>
            <input
              type="number"
              name="numberOfYearsWorked"
              value={formData.numberOfYearsWorked}
              onChange={handleChange}
              className="custom-border bg-gray-100  indent-8"
              id="textIndent"
            />{" "}
          </div>

          <div className=" p-10  pb-0 m-0">
            <input
              type="checkbox"
              name="myCheckbox"
              checked={formData.agreement}
              onChange={handleCheckboxChange}
              className="w-10 h-5 "
            />
            <label className="w-30 h-20 text-xs mb-10">
              Please tick if you consent and agree that all above information
              stated is factual and accurate.
            </label>
          </div>

          <div className=" w-96 p-10">
            <Button type="submit" variant="custom">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
