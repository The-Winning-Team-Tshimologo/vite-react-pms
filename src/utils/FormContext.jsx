import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

//  Handles nested structures optimally when updating form data. A robust solution that ensures deep merging of state,
//  especially for complex forms with nested objects and arrays
function deepMergeObjects(target, source) {
  const output = { ...target };
  if (typeof target === "object" && typeof source === "object") {
    for (const key in source) {
      if (source[key] instanceof Date) {
        output[key] = new Date(source[key]);
      } else if (typeof source[key] === "object" && key in target) {
        output[key] = deepMergeObjects(target[key], source[key]);
      } else {
        output[key] = source[key];
      }
    }
  }
  return output;
}

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Initialize with all fields that will be collected across steps
    // id: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
    userName: "",
    rating: 0,
    mobile: "",
    email: "",
    expertise: "",
    numberOfYearsWorked: "",
    professionalSummary: "",
    address: {
      streetName: "",
      city: "",
      province: "",
      zipCode: "",
    },
    workExperience: {
      startDate: "",
      endDate: "",
      title: "",
      companyName: "",
      description: "",
    },

    education: {
      institution: "",
      qualification: "",
      startDate: "",
      endDate: "",
    },

    skills: "",
    hourlyRate: "",
    qualification: "",
    criminalRecord: "",
    resume: "",
    bankName: "",
    accountNumber: "",
    typeOfAccount: "",
    branchCode: "",
    bankStatement: "",
    agreement: "",
  });

  // const updateFormData = (newData) => {
  //   setFormData((prev) => ({ ...prev, ...newData }));
  // };
  const updateFormData = (newData) => {
    setFormData((prev) => deepMergeObjects(prev, newData));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Function to handle the submission of form data
export const submitData = async (formData) => {
  // const { formData, updateFormData } = useFormContext();
  const endpoint = "http://localhost:8081/api/v1/auth/signup-sp";
  const formDataObject = new FormData();

  // Append text data as JSON string
  const dataToSubmit = {
    userName: formData.userName,
    email: formData.email,
    password: formData.password,
    firstname: formData.firstname,
    lastname: formData.lastname,
    mobile: formData.mobile,
    rating: formData.rating,
    address: {
      streetName: formData.address.streetName,
      city: formData.address.city,
      province: formData.address.province,
      zipCode: formData.address.zipCode,
    },
    bankName: formData.bankName,
    // accountNumber: formData.accountNumber,
    typeOfAccount: formData.typeOfAccount,
    branchCode: formData.branchCode,
  };
  formDataObject.append("data", JSON.stringify(dataToSubmit));

  const filesToSubmit = {
    skills: formData.skills,
    expertise: formData.expertise,
    professionalSummary: formData.professionalSummary,
    // yearsOfPaidExperience: formData.yearsOfPaidExperience,
    workExperienceList: {
      startDate: formData.workExperience.startDate,
      endDate: formData.workExperience.endDate,
      title: formData.workExperience.title,
      companyName: formData.workExperience.companyName,
      description: formData.workExperience.description,
    },
    numberOfTasksCompleted: 0,
    education: {
      institution: formData.education.institution,
      qualification: formData.education.qualification,
      startDate: formData.education.startDate,
      endDate: formData.education.startDate,
    },
    numberOfYearsWorked: formData.numberOfYearsWorked,
    verification: true,
    hourlyRate: formData.hourlyRate,
  };
  formDataObject.append("profile", JSON.stringify(filesToSubmit));

  // Append files if present
  if (formData.profilePicture) {
    formDataObject.append("profilePicture", formData.profilePicture);
  }
  if (formData.qualification) {
    formDataObject.append("qualification", formData.qualification);
  }
  if (formData.criminalRecord) {
    formDataObject.append("criminalRecord", formData.criminalRecord);
  }
  if (formData.resume) {
    formDataObject.append("resume", formData.resume);
  }
  if (formData.bankStatement) {
    formDataObject.append("bankStatement", formData.bankStatement);
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });
    const responseData = await response.json();
    if (response.ok) {
      console.log("Service Provider created successfully:", responseData);
      <Navigate to={"/SPActivation"} />;
    } else {
      console.log("Form Context Joining Data For Backend: ", formData);
      throw new Error(
        `Backend returned status ${response.status}: ${responseData.message}`
      );
    }
  } catch (error) {
    console.error("Failed to submit form:", error.message);
  }
};
