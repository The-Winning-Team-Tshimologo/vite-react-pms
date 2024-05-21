import React from "react";
import "./Form.css";
import Application from "./application/Application";
import { useFormContext } from "@/utils/FormContext";

const Form = () => {
  // const { formData, updateFormData } = useFormContext();

  
  // const canSave = Object.values(formData).every(Boolean);

  return (
    <div className="form flex-col">
      <h2 className="w-full text-center">
            <span className="-ms-52">Application</span>
          </h2>
      <br />
      <Application/>

      {/* <button className="submit-button" disabled={!canSave}>
        Next
      </button> */}
    </div>
  );
};

export default Form;
