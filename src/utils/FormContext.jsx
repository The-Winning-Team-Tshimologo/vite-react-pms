import React, { createContext, useContext, useState } from "react";
import axios from "axios";

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
  // [profilePicture, setProfilePicture] = useState(null);
  // [criminalRecord, setCriminalRecord] = useState(null);
  // [resume, setResume] = useState(null);
  // [bankStatement, setBankStatement] = useState(null);
  // [identityDocument, setIdentityDocument] = useState(null);
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

  // Append non-file data as JSON string
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
  });

  formDataObject.append("profile", jsonProfileData);

  // Retrieve files from localStorage and append to formDataObject
  // const appendFileFromLocalStorage = (name) => {
  //   const fileData = localStorage.getItem(name);
  //   if (fileData) {
  //     const blob = new Blob([fileData], { type: "application/octet-stream" });
  //     formDataObject.append(name, blob, name);
  //   }
  // };

  // console.log(localStorage.getItem("profilePicture"));
  // console.log(localStorage.getItem("identityDocument"));
  // console.log(localStorage.getItem("qualification"));
  // console.log(localStorage.getItem("criminalRecord"));
  // console.log(localStorage.getItem("resume"));

  const getFileFromLocalStorage = (key) => {
    const base64String = localStorage.getItem(key);
    if (base64String) {
      const byteString = atob(base64String.split(",")[1]);
      const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }
    return null;
  };

  formDataObject.append(
    "profilePicture",
    getFileFromLocalStorage("profilePicture")
  );
  formDataObject.append(
    "identityDocument",
    getFileFromLocalStorage("identityDocument")
  );
  formDataObject.append(
    "qualification",
    getFileFromLocalStorage("qualification")
  );
  formDataObject.append(
    "criminalRecord",
    getFileFromLocalStorage("criminalRecord")
  );
  formDataObject.append("resume", getFileFromLocalStorage("resume"));
  formDataObject.append(
    "bankStatement",
    getFileFromLocalStorage("bankStatement")
  );

  // appendFileFromLocalStorage("profilePicture");
  // appendFileFromLocalStorage("identityDocument");
  // appendFileFromLocalStorage("qualification");
  // appendFileFromLocalStorage("criminalRecord");
  // appendFileFromLocalStorage("resume");
  // appendFileFromLocalStorage("bankStatement");

  // Log the formDataObject entries
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
    onError(error.message);
  }
};

// export const submitData = async (formData, onSuccess, onError) => {
//   const endpoint = "http://localhost:8081/api/v1/auth/signup-sp";
//   const formDataObject = new FormData();

//   // Append non-file data as JSON string
//   const jsonData = JSON.stringify({
//     userName: formData.userName,
//     email: formData.email,
//     password: formData.password,
//     firstName: formData.firstName,
//     lastName: formData.lastName,
//     mobile: formData.mobile,
//     rating: formData.rating,
//     category: { name: formData.expertise },
//     address: formData.address,
//     bankName: formData.bankName,
//     typeOfAccount: formData.typeOfAccount,
//     branchCode: formData.branchCode,
//   });

//   formDataObject.append("data", jsonData);

//   const jsonProfileData = JSON.stringify({
//     skills: formData.skills,
//     expertise: formData.expertise,
//     professionalSummary: formData.professionalSummary,
//     numberOfYearsWorked: formData.numberOfYearsWorked,
//     hourlyRate: formData.hourlyRate,
//     workExperienceList: [formData.workExperience], // Ensure this is an array
//     education: [formData.education], // Ensure this is an array
//     verification: formData.verification,
//   });

//   formDataObject.append("profile", jsonProfileData);

//   // Append files to formDataObject
//   if (formData.profilePicture)
//     formDataObject.append("profilePicture", formData.profilePicture);
//   if (formData.identityDocument)
//     formDataObject.append("identityDocument", formData.identityDocument);
//   if (formData.qualification)
//     formDataObject.append("qualification", formData.qualification);
//   if (formData.criminalRecord)
//     formDataObject.append("criminalRecord", formData.criminalRecord);
//   if (formData.resume) formDataObject.append("resume", formData.resume);
//   if (formData.bankStatement)
//     formDataObject.append("bankStatement", formData.bankStatement);

//   // Log the formDataObject entries
//   // Log the formDataObject entries
//   // for (const pair of formDataObject.entries()) {
//   //   if (pair[1] instanceof File) {
//   //     console.log(`${pair[0]}: `, {
//   //       name: pair[1].name,
//   //       type: pair[1].type,
//   //       size: pair[1].size,
//   //     });
//   //   } else {
//   //     console.log(`${pair[0]}: `, pair[1]);
//   //   }
//   // }

//   for (let [key, value] of formDataObject.entries()) {
//     console.log(`${key}:`, value);
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
//         onError(responseData.message);
//       }
//     } else {
//       const textResponse = await response.text();
//       console.error("Non-JSON response received:", textResponse);
//       onError(textResponse);
//     }
//   } catch (error) {
//     console.error("Error submitting form:", error);
//     onError(error.message);
//   }
// };

// Append files if they exist
// if (formData.profilePicture instanceof File) {
//   console.log("Appending profilePicture", formData.profilePicture);
//   formDataObject.append(
//     "profilePicture",
//     formData.profilePicture,
//     formData.profilePicture.name
//   );
// }
// if (formData.identityDocument instanceof File) {
//   console.log("Appending identityDocument", formData.identityDocument);
//   formDataObject.append(
//     "identityDocument",
//     formData.identityDocument,
//     formData.identityDocument.name
//   );
// }
// if (formData.qualification instanceof File) {
//   console.log("Appending qualification", formData.qualification);
//   formDataObject.append(
//     "qualification",
//     formData.qualification,
//     formData.qualification.name
//   );
// }
// if (formData.criminalRecord instanceof File) {
//   console.log("Appending criminalRecord", formData.criminalRecord);
//   formDataObject.append(
//     "criminalRecord",
//     formData.criminalRecord,
//     formData.criminalRecord.name
//   );
// }
// if (formData.resume instanceof File) {
//   console.log("Appending resume", formData.resume);
//   formDataObject.append("resume", formData.resume, formData.resume.name);
// }
// if (formData.bankStatement instanceof File) {
//   console.log("Appending bankStatement", formData.bankStatement);
//   formDataObject.append(
//     "bankStatement",
//     formData.bankStatement,
//     formData.bankStatement.name
//   );
// }

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   helix.register();
//   setLoading(true);

//   if (validateForm()) {
//     try {
//       // Convert profilePicture to Blob
//       const profilePictureBlob = new Blob([formData.profilePicture], {
//         type: formData.profilePicture.type,
//       });

//       // Update formData with Blob
//       updateFormData({ profilePicture: profilePictureBlob });

//       // ... Rest of your submission logic (fetch/axios call) ...

//     } catch (error) {
//       // ... error handling ...
//     } finally {
//       setLoading(false);
//     }
//   } else {
//     // ... error handling ...
//   }
// };

// Append files directly to FormData
// for (const [fieldName, value] of Object.entries(formData)) {
//   if (value instanceof File) {
//     console.log(`Appending ${fieldName}:`, value);
//     formDataObject.append(fieldName, value); // No need to specify filename manually
//   }
// }

// formDataObject.append("profilePicture", formData.profilePicture.path);

// export const submitData = async (formData, onSuccess, onError) => {
//   const endpoint = "http://localhost:8081/api/v1/auth/signup-sp";
//   const formDataObject = new FormData();

//   // Append non-file data as JSON string
//   const jsonData = JSON.stringify({
//     userName: formData.userName,
//     email: formData.email,
//     password: formData.password,
//     firstName: formData.firstName,
//     lastName: formData.lastName,
//     mobile: formData.mobile,
//     rating: formData.rating,
//     category: { name: formData.expertise },
//     address: formData.address,
//     bankName: formData.bankName,
//     typeOfAccount: formData.typeOfAccount,
//     branchCode: formData.branchCode,
//   });

//   formDataObject.append("data", jsonData);

//   const jsonProfileData = JSON.stringify({
//     skills: formData.skills,
//     expertise: formData.expertise,
//     professionalSummary: formData.professionalSummary,
//     numberOfYearsWorked: formData.numberOfYearsWorked,
//     hourlyRate: formData.hourlyRate,
//     workExperienceList: [formData.workExperience], // Ensure this is an array
//     education: [formData.education], // Ensure this is an array
//     verification: formData.verification,
//     hourlyRate: formData.hourlyRate,
//   });

//   formDataObject.append("profile", jsonProfileData);

//   // Append files if they exist
//   if (formData.profilePicture instanceof File) {
//     console.log("profilPic trying to be appended: ", formData.profilePicture);
//     formDataObject.append(
//       "profilePicture",
//       formData.profilePicture,
//       formData.profilePicture.name
//     );
//   }
//   if (formData.identityDocument instanceof File) {
//     console.log(
//       "identityDocument trying to be appended: ",
//       formData.identityDocument
//     );
//     formDataObject.append(
//       "identityDocument",
//       formData.identityDocument,
//       formData.identityDocument.name
//     );
//   }
//   if (formData.qualification instanceof File) {
//     console.log(
//       "qualification trying to be appended: ",
//       formData.qualification
//     );
//     formDataObject.append(
//       "qualification",
//       formData.qualification,
//       formData.qualification.name
//     );
//   }
//   if (formData.criminalRecord instanceof File) {
//     console.log(
//       "criminalRecord trying to be appended: ",
//       formData.criminalRecord
//     );
//     formDataObject.append(
//       "criminalRecord",
//       formData.criminalRecord,
//       formData.criminalRecord.name
//     );
//   }
//   if (formData.resume instanceof File) {
//     console.log("resume trying to be appended: ", formData.resume);
//     formDataObject.append("resume", formData.resume, formData.resume.name);
//   }
//   if (formData.bankStatement instanceof File) {
//     console.log(
//       "bankStatement trying to be appended: ",
//       formData.bankStatement
//     );
//     formDataObject.append(
//       "bankStatement",
//       formData.bankStatement,
//       formData.bankStatement.name
//     );
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
//         onError(responseData.message);
//       }
//     } else {
//       const textResponse = await response.text();
//       console.error("Non-JSON response received:", textResponse);
//       onError(textResponse);
//     }
//   } catch (error) {
//     console.error("Submission error:", error);
//     onError(error.message);
//   }
// };

// export const submitData = async (formData, onSuccess, onError) => {
//   const endpoint = "http://localhost:8081/api/v1/auth/signup-sp";
//   const formDataObject = new FormData();

//   const jsonData = JSON.stringify({
//     userName: formData.userName,
//     email: formData.email,
//     password: formData.password,
//     firstName: formData.firstName,
//     lastName: formData.lastName,
//     mobile: formData.mobile,
//     rating: formData.rating,
//     category: { name: formData.expertise },
//     address: formData.address,
//     bankName: formData.bankName,
//     typeOfAccount: formData.typeOfAccount,
//     branchCode: formData.branchCode,
//   });

//   formDataObject.append("data", jsonData);

//   const jsonProfileData = JSON.stringify({
//     skills: formData.skills,
//     expertise: formData.expertise,
//     professionalSummary: formData.professionalSummary,
//     numberOfYearsWorked: formData.numberOfYearsWorked,
//     hourlyRate: formData.hourlyRate,
//     workExperienceList: [formData.workExperience],
//     education: [formData.education],
//     verification: formData.verification,
//     hourlyRate: formData.hourlyRate,
//   });

//   formDataObject.append("profile", jsonProfileData);

//   if (formData.profilePicture) {
//     console.log("profilPic trying to be appended: ", formData.profilePicture);
//     formDataObject.append("profilePicture", formData.profilePicture);
//   }
//   if (formData.identityDocument) {
//     console.log("identityDocument trying to be appended: ", formData.identityDocument);
//     formDataObject.append("identityDocument", formData.identityDocument);
//   }
//   if (formData.qualification) {
//     console.log("qualification trying to be appended: ", formData.qualification);
//     formDataObject.append("qualification", formData.qualification);
//   }
//   if (formData.criminalRecord) {
//     console.log("criminalRecord trying to be appended: ", formData.criminalRecord);
//     formDataObject.append("criminalRecord", formData.criminalRecord);
//   }
//   if (formData.resume) {
//     console.log("resume trying to be appended: ", formData.resume);
//     formDataObject.append("resume", formData.resume);
//   }
//   if (formData.bankStatement) {
//     console.log("bankStatement trying to be appended: ", formData.bankStatement);
//     formDataObject.append("bankStatement", formData.bankStatement);
//   }

//   const response = await fetch(endpoint, {
//     method: "POST",
//     body: formDataObject,
//   });

//   const contentType = response.headers.get("content-type");
//   if (contentType && contentType.includes("application/json")) {
//     const responseData = await response.json();
//     if (response.ok) {
//       console.log("Service Provider created successfully:", responseData);
//       onSuccess(responseData);
//     } else {
//       console.error("Failed to submit form:", responseData.message);
//       onError(responseData.message);
//     }
//   } else {
//     const textResponse = await response.text();
//     console.error("Non-JSON response received:", textResponse);
//     onError(textResponse);
//   }
// };

// export const submitData = async (formData, onSuccess, onError) => {
//   const endpoint = "http://localhost:8081/api/v1/auth/signup-sp";
//   const formDataObject = new FormData();

//   // Ensure JSON data is stringified
//   const jsonData = JSON.stringify({
//     userName: formData.userName,
//     email: formData.email,
//     password: formData.password,
//     firstName: formData.firstName,
//     lastName: formData.lastName,
//     mobile: formData.mobile,
//     rating: formData.rating,
//     category: { name: formData.expertise },
//     address: formData.address,
//     bankName: formData.bankName,
//     typeOfAccount: formData.typeOfAccount,
//     branchCode: formData.branchCode,
//   });

//   // Append stringified JSON to FormData
//   formDataObject.append("data", jsonData);

//   const jsonProfileData = JSON.stringify({
//     skills: formData.skills,
//     expertise: formData.expertise,
//     professionalSummary: formData.professionalSummary,
//     numberOfYearsWorked: formData.numberOfYearsWorked,
//     hourlyRate: formData.hourlyRate,
//     workExperienceList: [formData.workExperience], // Ensure this is an array
//     education: [formData.education], // Ensure this is an array
//     verification: formData.verification,
//     hourlyRate: formData.hourlyRate,
//   });

//   // Append profile data
//   formDataObject.append("profile", jsonProfileData);

//   const response = await fetch(endpoint, {
//     method: "POST",
//     body: formDataObject,
//   });

//   const contentType = response.headers.get("content-type");
//   if (contentType && contentType.includes("application/json")) {
//     const responseData = await response.json();
//     if (response.ok) {
//       console.log("Service Provider created successfully:", responseData);
//       onSuccess(responseData);
//     } else {
//       console.error("Failed to submit form:", responseData.message);
//       onError(responseData.message);
//     }
//   } else {
//     const textResponse = await response.text();
//     console.error("Non-JSON response received:", textResponse);
//     onError(textResponse);
//   }
// };
