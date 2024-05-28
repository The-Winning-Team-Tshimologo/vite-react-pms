import React, { createContext, useContext, useState } from "react";

// Create a Context for the form data
const FormContext = createContext();

// Custom hook to use the FormContext
export const useFormContext = () => useContext(FormContext);

// Helper function to deeply merge two objects
// function deepMergeObjects(target, source) {
//   const output = { ...target };
//   if (typeof target === "object" && typeof source === "object") {
//     for (const key in source) {
//       if (source[key] instanceof Date) {
//         output[key] = new Date(source[key]);
//       } else if (typeof source[key] === "object" && key in target) {
//         output[key] = deepMergeObjects(target[key], source[key]);
//       } else {
//         output[key] = source[key];
//       }
//     }
//   }
//   return output;
// }

// FormProvider component to provide form data and update function to its children
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
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
    criminalRecord: null,
    resume: null,
    bankName: "",
    accountNumber: "",
    typeOfAccount: "",
    branchCode: "",
    bankStatement: null,
    agreement: "",
    identityDocument: null,
  });

  // Function to update the form data by deeply merging with new data
  // const updateFormData = (newData) =>
  //   setFormData((prev) => deepMergeObjects(prev, newData));

  const updateFormData = (newData) =>
    setFormData((prev) => ({ ...prev, ...newData }));

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
  if (formData.profilePicture ) {
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

  for (const pair of formDataObject.entries()) {
    if (pair[1] instanceof File) {
      console.log(`${pair[0]}: `, {
        name: pair[1].name,
        type: pair[1].type,
        size: pair[1].size,
      });
    } else {
      console.log(`${pair[0]}: `, pair[1]);
    }
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formDataObject,
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const responseData = await response.json();
      if (response.ok) {
        console.log("Service Provider created successfully:", responseData);
        onSuccess(responseData);
      } else {
        console.error("Failed to submit form:", responseData.message);
        onError(responseData.message);
      }
    } else {
      const textResponse = await response.text();
      console.error("Non-JSON response received:", textResponse);
      onError(textResponse);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    // onError(error.message);
  }
};
