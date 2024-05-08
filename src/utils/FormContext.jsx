import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Initialize with all fields that will be collected across steps
    id: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
    userName:"",
    rating:"",
    mobile:"",
    email:"",
    streetName:"",
    city:"",
    province:"", 
    zipCode:"",
    mainServiceCategory:"",
    yearsOfPaidExperience: "",
    professionalSummary: "",
    workExperience: "",
    education: "",
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
  });

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
