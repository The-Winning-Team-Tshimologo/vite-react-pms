import Application from "./application/Application";
import { useState } from "react";
import "./Form.css";

const Form = () => {
  const [data, setData] = useState({
    UserName: "",
    MobileNumber: "",
    email: "",
    PhysicalAdress: "",
    Streetname: "",
    City: "",
    Location: "",
    ZipCode: "",
    MainService: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(data));
  };

  const handleChange = (e) => {
    const type = e.target.type;

    const name = e.target.name;

    const value = type === "checkbox" ? e.target.checked : e.target.value;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { Streetname, ...otherProps } = data;

  const canSave = [...Object.values(otherProps)].every(Boolean);

  const content = (
    <form className="form flex-col" onSubmit={handleSubmit}>
      {/* <h2>Application</h2> */}

      <Application data={data} handleChange={handleChange} />

      <button className="submit-button" disabled={!canSave}>
        Submit
      </button>
    </form>
  );

  return content;
};
export default Form;
