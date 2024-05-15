import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

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

  const updateFormData = (newData) =>
    setFormData((prev) => deepMergeObjects(prev, newData));

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const submitData = async (formData, onSuccess, onError) => {
  const endpoint = "http://localhost:8081/api/v1/auth/signup-sp";
  const formDataObject = new FormData();

  // Ensure JSON data is stringified
  const jsonData = JSON.stringify({
    userName: formData.userName,
    email: formData.email,
    password: formData.password,
    firstName: formData.firstName,
    lastName: formData.lastName,
    mobile: formData.mobile,
    rating: formData.rating,
    category: { name: formData.expertise },
    address: formData.address,
    bankName: formData.bankName,
    typeOfAccount: formData.typeOfAccount,
    branchCode: formData.branchCode,
  });

  // Append stringified JSON to FormData
  formDataObject.append("data", jsonData);

  const jsonProfileData = JSON.stringify({
    skills: formData.skills,
    expertise: formData.expertise,
    professionalSummary: formData.professionalSummary,
    numberOfYearsWorked: formData.numberOfYearsWorked,
    hourlyRate: formData.hourlyRate,
    workExperienceList: [formData.workExperience], // Ensure this is an array
    education: [formData.education], // Ensure this is an array
    verification: formData.verification,
    hourlyRate: formData.hourlyRate,
  });

  // Append profile data
  formDataObject.append("profile", jsonProfileData);

  // const fileFields = ["profilePicture", "bankStatement", "identityDocument"];

  // fileFields.forEach((inputName) => {
  //   console.log("File to be appended:", formData[inputName]);

  //   if (formData[inputName] && formData[inputName] instanceof File) {
  //     formDataObject.append(
  //       inputName,
  //       formData[inputName],
  //       formData[inputName].name
  //     );
  //   } else {
  //     console.error(inputName + " is not available or not a file");
  //   }
  // });

  // if (
  //   formData["profilePicture"] &&
  //   formData["profilePicture"] instanceof File
  // ) {
  //   formDataObject.append(
  //     inputName,
  //     formData[inputName],
  //     formData[inputName].name
  //   );
  // } else {
  //   console.error(inputName + " is not available or not a file");
  // }

  // for (let [key, value] of formDataObject.entries()) {
  //   console.log(`${key}:`, value);
  // }

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
};
