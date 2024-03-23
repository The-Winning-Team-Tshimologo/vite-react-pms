import React from "react";
import "../Form.css";

const Application = ({ data, handleChange }) => {
  return (
    <div className="flex-col">
      <h1>Application</h1>

      <label htmlFor="UserName">Username</label>
      <input
        className="application_input"
        type="text"
        id="UserName"
        name="UserName"
        placeholder="Please enter your username"
        pattern="([A-Z])[\w+.]{1,}"
      />

      <label htmlFor="MobileNumber">Mobile Number</label>
      <input
        className="application_input"
        type="text"
        id="MobileNumber"
        name="MobileNumber"
        placeholder="Please enter your Mobile Number "
        pattern="([A-Z])[\w+.]{1,}"
      />

      <label htmlFor="email">Email Adress</label>
      <input
        className="application_input"
        type="email"
        id="email"
        name="email"
        placeholder="enter email"
        pattern="[\w\d\s.#]{2,}"
      />

      <label htmlFor="PhysicalAdress" className="offscreen">
        {" "}
        Physical Adress{" "}
      </label>
      <input
        className="application_input"
        type="text"
        id="PhysicalAdress"
        name="PhysicalAdress"
        pattern="[\w\d\s.#]{2,}"
      />

      <label htmlFor="Streetname" className="offscreen">
        Street Name
      </label>
      <input
        className="application_input"
        type="text"
        id="Streetname"
        name="Streetname"
        pattern="[\w\d\s.#]{2,}"
      />

      <label htmlFor="City">City</label>
      <input
        className="application_input"
        type="text"
        id="City"
        name="City"
        pattern="([A-Z])[\w\s.]{1,}"
      />

      <div className="split-container">
        <div className="">
          <label htmlFor="Location">Location</label>
          <select
            className="application_input_select"
            id="Location"
            name="Location"
          >
            <option value="No">North Johannesburg</option>
            <option value="So">West Johannesburg</option>
            <option value="Et">South Johannesburg</option>
            <option value="we">East Johannesburg</option>
          </select>
        </div>

        <div className="flex-col">
          <label htmlFor="ZipCode">Zip Code</label>
          <input
            className="application_input_select"
            type="text"
            id="ZipCode"
            name="ZipCode"
            pattern="[0-9]{5}"
            maxLength="5"
          />
        </div>
      </div>
      <label htmlFor="MainService"> Main Service</label>
      <select className="application_input" id="MainService" name="MainService">
        <option value="PLu">Plumbing</option>
        <option value="El">Electricty</option>
        <option value="Gar">Garderning</option>
        <option value="Fi">Fitting</option>
        <option value="Hoe">Housekepping</option>
      </select>

      <label htmlFor="SecondService"> Second Service</label>
      <select
        className="application_input"
        id="SecondService"
        name="SecondService"
      >
        <option value="PLu">Plumbing</option>
        <option value="El">Electricty</option>
        <option value="Gar">Garderning</option>
        <option value="Fi">Fitting</option>
        <option value="Hoe">Housekepping</option>
      </select>

      <label htmlFor="experience">
        How many years of paid experience do you have?
      </label>
      <input
        className="application_input"
        type="text"
        id="experience"
        name="experience"
        pattern="[0-9]{5}"
        maxLength="80"
      />

      <label htmlFor="experiencetwo">
        Are you the owner or employee of a registered company/business?
      </label>
      <input
        className="application_input"
        type="text"
        id="experiencetwo"
        name="experiencetwo"
        pattern="[0-9]{5}"
        maxLength="80"
      />

      <button type="submit" className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default Application;
