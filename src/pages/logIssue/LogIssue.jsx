import Calendar from "@/components/calendar/Calendar";
import Dropdown from "@/components/dropdown/Dropdown";
import FileUpload from "@/components/fileUpload/FileUpload";
import Header from "@/components/header/Header";
import React from "react";

const LogIssue = () => {

    const handleFileUpload = () => {
        window.alert("yey you")
    }

  return (
    <>
      <Header />
      <div className="mt-10 mr-2 mx-2">
        <h1>Log an Issue</h1>
      </div>

      <div className="issues__container">
        <div className="flex justify-between px-32 pt-4">
          <div>
            <h2>Category</h2>
            <Dropdown />
          </div>
          <div>
            <h2>Address</h2>
            <div className="flex flex-col py-2 bd gap-3 px-10 address__container">
              <input type="text" placeholder="Address line 1" />
              <input type="text" placeholder="Address line 2" />
              <input type="text" placeholder="Suburb" />
              <input type="text" placeholder="City" />
              <input type="text" placeholder="Province" />
              <input type="number" placeholder="Postal Code" />
            </div>
          </div>
        </div>
        <h2>Description</h2>
        <div>
          <input
            type="text"
            placeholder="My geyser burst and water is flooding"
          />
        </div>

        <div className="flex flex-col justify-center ">
          <h2>Upload</h2>
          <FileUpload onClick={handleFileUpload} />
        </div>

        <div>
          <h2 className="bold">Book your appointment now</h2>
          <p className="bold">So our team can reach out to you on time</p>
        </div>

        <div>
          <p>Share your message</p>
          <textarea className="bg-gray-200" name="message" id="message" cols="30" rows="10"></textarea>
          <Calendar />
          <button>Submit</button>
        </div>
      </div>
    </>
  );
};

export default LogIssue;
