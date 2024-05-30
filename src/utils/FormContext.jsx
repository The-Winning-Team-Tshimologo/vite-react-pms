import React, { createContext, useContext, useState } from "react";
import { Navigate } from "react-router";

// Create a Context for the form data
const FormContext = createContext();

// Custom hook to use the FormContext
export const useFormContext = () => useContext(FormContext);

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

  const updateFormData = (newData) =>
    setFormData((prev) => ({ ...prev, ...newData }));

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Function to submit form data to the server
export const submitData = async (formData, onSuccess, onError) => {
  const endpoint = "http://localhost:8081/api/v1/auth/signup-sp";
  const formDataObject = new FormData();

  // Append non-file data as JSON string
  const jsonData = JSON.stringify({
    userName: formData.userName,
    email: formData.email,
    password: formData.password,
    firstName: formData.firstName,
    lastName: formData.lastName,
    mobile: formData.mobile,
    rating: formData.rating,
    address: {
      streetName: formData.address.streetName,
      city: formData.address.city,
      province: formData.address.province,
      zipCode: formData.address.zipCode,
    },
    bankName: formData.bankName,
    accountNumber: formData.accountNumber,
    typeOfAccount: formData.typeOfAccount,
    branchCode: formData.branchCode,
    category: {
      name: formData.expertise,
    }
  });

  formDataObject.append("data", jsonData);

  // Append profile data as JSON string
  const jsonProfileData = JSON.stringify({
    skills: formData.skills,
    professionalSummary: formData.professionalSummary,
    workExperienceList: [
      // {
      //   startDate: formData.workExperience.startDate,
      //   endDate: formData.workExperience.endDate,
      //   title: formData.workExperience.title,
      //   companyName: formData.workExperience.companyName,
      //   description: formData.workExperience.description,
      // },
      formData.workExperience
    ],
    education: [
      // {
      //   institution: formData.education.institution,
      //   qualification: formData.education.qualification,
      //   startDate: formData.education.startDate,
      //   endDate: formData.education.endDate,
      // },
      formData.education
    ],
    numberOfYearsWorked: formData.numberOfYearsWorked,
    verification: formData.verification,
    hourlyRate: formData.hourlyRate,
  });

  formDataObject.append("profile", jsonProfileData);

  // Append files if present
  if (formData.profilePicture) {
    formDataObject.append("profilePicture", formData.profilePicture);
  }
  if (formData.identityDocument) {
    formDataObject.append("identityDocument", formData.identityDocument);
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

  // Log the formDataObject entries for debugging
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
        // <Navigate to={"/SPActivation"}/>
      } else {
        console.error("Failed to submit form:", responseData.message);
        // onError(responseData.message);
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


// // Function to submit form data to the server
// export const submitData = async (formData, onSuccess, onError) => {
//   const endpoint = "http://localhost:8081/api/v1/auth/signup-sp";
//   const formDataObject = new FormData();

//   // Append non-file data as JSON string
//   const jsonData = JSON.stringify({
//     userName: formData.userName,
//     email: formData.email,
//     password: formData.password,
//     firstname: formData.firstname,
//     lastname: formData.lastname,
//     mobile: formData.mobile,
//     rating: formData.rating,
//     address: {
//       streetName: formData.address.streetName,
//       city: formData.address.city,
//       province: formData.address.province,
//       zipCode: formData.address.zipCode,
//     },
//     bankName: formData.bankName,
//     // accountNumber: formData.accountNumber,
//     typeOfAccount: formData.typeOfAccount,
//     branchCode: formData.branchCode,
//   });
//   // formDataObject.append("data", JSON.stringify(dataToSubmit));

//   formDataObject.append("data", jsonData);

//   // Append profile data as JSON string
//   const jsonProfileData = JSON.stringify({
//     skills: formData.skills,
//     expertise: formData.expertise,
//     professionalSummary: formData.professionalSummary,
//     // yearsOfPaidExperience: formData.yearsOfPaidExperience,
//     workExperienceList: {
//       startDate: formData.workExperience.startDate,
//       endDate: formData.workExperience.endDate,
//       title: formData.workExperience.title,
//       companyName: formData.workExperience.companyName,
//       description: formData.workExperience.description,
//     },
//     numberOfTasksCompleted: 0,
//     education: {
//       institution: formData.education.institution,
//       qualification: formData.education.qualification,
//       startDate: formData.education.startDate,
//       endDate: formData.education.startDate,
//     },
//     numberOfYearsWorked: formData.numberOfYearsWorked,
//     verification: true,
//     hourlyRate: formData.hourlyRate,
//     workExperienceList: [formData.workExperience], // Ensure this is an array
//     education: [formData.education], // Ensure this is an array
//     verification: formData.verification,
//   });

//   formDataObject.append("profile", jsonProfileData);


//   // Append files if present
//   if (formData.profilePicture ) {
//     formDataObject.append("profilePicture", formData.profilePicture);
//   }
//   if (formData.qualification) {
//     formDataObject.append("qualification", formData.qualification);
//   }
//   if (formData.criminalRecord) {
//     formDataObject.append("criminalRecord", formData.criminalRecord);
//   }
//   if (formData.resume) {
//     formDataObject.append("resume", formData.resume);
//   }
//   if (formData.bankStatement) {
//     formDataObject.append("bankStatement", formData.bankStatement);
//   }

//   // Log the formDataObject entries for debugging
//   for (const pair of formDataObject.entries()) {
//     if (pair[1] instanceof File) {
//       console.log(`${pair[0]}: `, {
//         name: pair[1].name,
//         type: pair[1].type,
//         size: pair[1].size,
//       });
//     } else {
//       console.log(`${pair[0]}: `, pair[1]);
//     }
//   }

//   try {
//     const response = await fetch(endpoint, {
//       method: "POST",
//       body: formDataObject,
//     });

//     const contentType = response.headers.get("content-type");
//     if (contentType && contentType.includes("application/json")) {
//       const responseData = await response.json();
//       if (response.ok) {
//         console.log("Service Provider created successfully:", responseData);
//         onSuccess(responseData);
//       } else {
//         console.error("Failed to submit form:", responseData.message);
//         // onError(responseData.message);
//       }
//     } else {
//       const textResponse = await response.text();
//       console.error("Non-JSON response received:", textResponse);
//       // onError(textResponse);
//     }
//   } catch (error) {
//     console.error("Error submitting form:", error);
//     // onError(error.message);
//     // onError(error.message);
//   }
// };
