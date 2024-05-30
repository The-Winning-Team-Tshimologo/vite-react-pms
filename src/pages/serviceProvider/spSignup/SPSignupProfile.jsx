import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import SPSIgnupProgress from "./SPSIgnupProgress";
import Header from "@/components/header/Header";
import { submitData, useFormContext } from "@/utils/FormContext";
// import "./SPSignupProfile.css"; // Ensure you have the necessary CSS for the loading overlay
import { useNavigate } from "react-router-dom";

export const SPSignupProfile = () => {
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, key] = name.split(".");
      updateFormData({
        ...formData,
        [section]: { ...formData[section], [key]: value },
      });
    } else {
      updateFormData({ ...formData, [name]: value });
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSuccess = () => navigate("/SPActivation");
  const handleError = (message) => alert(`Error: ${message}`);

  // Validate all required fields including dynamic fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate non-nested fields
    [
      "professionalSummary",
      "skills",
      "hourlyRate",
      "numberOfYearsWorked",
      "agreement",
    ].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });

    // Validate nested 'workExperience' fields
    const workExperienceFields = [
      "startDate",
      "endDate",
      "title",
      "companyName",
      "description",
    ];
    workExperienceFields.forEach((field) => {
      if (!formData.workExperience || !formData.workExperience[field]) {
        newErrors[`workExperience.${field}`] = "This field is required";
        isValid = false;
      }
    });

    // Validate nested 'education' fields
    const educationFields = [
      "institution",
      "qualification",
      "startDate",
      "endDate",
    ];
    educationFields.forEach((field) => {
      if (!formData.education || !formData.education[field]) {
        newErrors[`education.${field}`] = "This field is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form submission starts
    if (validateForm()) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 250)); // Simulate a delay for form submission
        console.log("Form submitted:", formData);
        handleFinalSubmit();
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

  const handleFinalSubmit = () => {
    submitData(formData, handleSuccess, handleError);
  };

  const handleCheckboxChange = (e) => {
    updateFormData({ agreement: e.target.checked });
  };

  let page = "Activation";

  return (
    <>
      <Header />
      {isLoading && (
        <div className="loading-overlay">
          <l-helix size="150" speed="1.5" color="black"></l-helix>
        </div>
      )}
      <div className="SPSignupProfile__container flex">
        <div className="SPSignupProfile__progress  ml-10">
          <SPSIgnupProgress completedPages={75} page={"Profile"} />
        </div>

        <div className="SPSignupProfile__form_container ">
          <h2 className="w-full text-center">
            <span className="-ms-52">Application</span>
          </h2>
          <form
            className="flex flex-col max-w-max align-middle justify-center"
            onSubmit={handleSubmit}
          >
            <div className="p-10  pb-0">
              <p className=" w-fit">
                Professional Summary
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
                className="textarea-custom__border bg-gray-100"
                rows={8}
              />
            </div>

            <div className="p-10  pb-0 ">
              <p>Work Experience</p>
              <div className="flex mt-1">
                <label
                  htmlFor="workExperience.startDate"
                  className="flex flex-col -ms-0"
                >
                  Start Date
                  {errors["workExperience.startDate"] && (
                    <span className="error-message">
                      {errors["workExperience.startDate"]}
                    </span>
                  )}
                  <input
                    type="date"
                    name="workExperience.startDate"
                    value={formData.workExperience.startDate}
                    onChange={handleChange}
                    className="inputbox-custom__border bg-gray-100 p-2 w-56"
                    id="textIndent"
                    placeholder="End Date"
                  />
                </label>

                <label
                  htmlFor="workExperience.endDate"
                  className="flex flex-col "
                >
                  End Date
                  {errors["workExperience.endDate"] && (
                    <span className="error-message">
                      {errors["workExperience.endDate"]}
                    </span>
                  )}
                  <input
                    type="date"
                    name="workExperience.endDate"
                    value={formData.workExperience.endDate}
                    onChange={handleChange}
                    className="inputbox-custom__border bg-gray-100 p-2 w-56"
                    id="textIndent"
                    placeholder="Start Date"
                  />
                </label>
              </div>

              <div className="flex mt-1">
                <label
                  htmlFor="workExperience.companyName"
                  className="flex flex-col -ms-0"
                >
                  Company Name
                  {errors["workExperience.companyName"] && (
                    <span className="error-message">
                      {errors["workExperience.companyName"]}
                    </span>
                  )}
                  <input
                    type="text"
                    name="workExperience.companyName"
                    value={formData.workExperience.companyName}
                    onChange={handleChange}
                    className="inputbox-custom__border bg-gray-100 p-2 w-56"
                    id="textIndent"
                    placeholder="Company Name"
                  />
                </label>

                <label htmlFor="workExperience.title" className="flex flex-col">
                  Title
                  {errors["workExperience.title"] && (
                    <span className="error-message">
                      {errors["workExperience.title"]}
                    </span>
                  )}
                  <input
                    type="text"
                    name="workExperience.title"
                    value={formData.workExperience.title}
                    onChange={handleChange}
                    className="inputbox-custom__border bg-gray-100 p-2 w-56"
                    id="textIndent"
                    placeholder="Title"
                  />
                </label>
              </div>
              <label>
                Description
                {errors["workExperience.description"] && (
                  <span className="error-message">
                    {errors["workExperience.description"]}
                  </span>
                )}
                <Textarea
                  name={"workExperience.description"}
                  value={formData.workExperience.description}
                  onChange={handleChange}
                  className="textarea-custom__border bg-gray-100 "
                  rows={3}
                  placeholder="Description"
                />
              </label>
            </div>
            <div className="p-10  pb-0 ">
              <p>Education</p>
              <div className="flex mt-1">
                <label
                  htmlFor="education.startDate"
                  className="flex flex-col -ms-0"
                >
                  Start Date
                  {errors["education.startDate"] && (
                    <span className="error-message">
                      {errors["education.startDate"]}
                    </span>
                  )}
                  <input
                    type="date"
                    name="education.startDate"
                    value={formData.education.startDate}
                    onChange={handleChange}
                    className="inputbox-custom__border bg-gray-100 p-2 w-56"
                    id="textIndent"
                    placeholder="Start Date"
                  />
                </label>

                <label htmlFor="education.endDate" className="flex flex-col ">
                  End Date
                  {errors["education.endDate"] && (
                    <span className="error-message">
                      {errors["education.endDate"]}
                    </span>
                  )}
                  <input
                    type="date"
                    name="education.endDate"
                    value={formData.education.endDate}
                    onChange={handleChange}
                    className="inputbox-custom__border bg-gray-100 p-2 w-56"
                    id="textIndent"
                    placeholder="End Date"
                  />
                </label>
              </div>

              <div className="flex mt-1">
                <label
                  htmlFor="education.institution"
                  className="flex flex-col -ms-0"
                >
                  Institution Name
                  {errors["education.institution"] && (
                    <span className="error-message">
                      {errors["education.institution"]}
                    </span>
                  )}
                  <input
                    type="text"
                    name="education.institution"
                    value={formData.education.institution}
                    onChange={handleChange}
                    className="inputbox-custom__border bg-gray-100 p-2 w-56"
                    id="textIndent"
                    placeholder="Institution Name"
                  />
                </label>

                <label htmlFor="startDate" className="flex flex-col">
                  Qualification
                  {errors["education.qualification"] && (
                    <span className="error-message">
                      {errors["education.qualification"]}
                    </span>
                  )}
                  <input
                    type="text"
                    name="education.qualification"
                    value={formData.education.qualification}
                    onChange={handleChange}
                    className="inputbox-custom__border bg-gray-100 p-2 w-56"
                    id="textIndent"
                    placeholder="Qualification"
                  />
                </label>
              </div>
            </div>

            <div className="p-10  pb-0">
              <p>
                Skills
                {errors.skills && (
                  <span className="error-message">{errors.skills}</span>
                )}
              </p>
              <Textarea
                name={"skills"}
                value={formData.skills}
                onChange={handleChange}
                className="textarea-custom__border bg-gray-100 "
                rows={5}
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
                className="inputbox-custom__border bg-gray-100  indent-8"
                id="textIndent"
              />
              <span className="absolute left-11 top-[70px] text-gray-600">
                R
              </span>
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
                className="inputbox-custom__border bg-gray-100  indent-8"
                id="textIndent"
              />
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
              <button type="submit" className="sp__profile-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SPSignupProfile;
