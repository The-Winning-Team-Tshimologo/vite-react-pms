import Calendar from "@/components/calendar/Calendar";
import Dropdown from "@/components/dropdown/Dropdown";
import FileUpload from "@/components/fileUpload/FileUpload";
import Header from "@/components/header/Header";
import React from "react";
import "./LogIssue.css";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const LogIssue = () => {
  const handleFileUpload = () => {
    window.alert("yey you");
  };

const handleCalendar = (selectedDate) => {
  // Do what you gotta do
  // console.log(selectedDate);
}

  return (
    <>
      <Header />
      {/* <div className="mt-10 mr-2 mx-2">
        <h1>Log an Issue</h1>
      </div> */}

      <div className="issues__container">
        <div className="flex justify-between pt-4">
          <div className="ms-10 p-4">
            <h2>Category</h2>
            <Dropdown />
          </div>
          <div className="me-10 p-4">
            <h2>Address</h2>
            <div className="flex flex-col pr-20 py-1 address__container">
              <input
                className="p-2 pr-10"
                type="text"
                placeholder="Address line 1"
              />
              <input className="p-2" type="text" placeholder="Address line 2" />
              <input className="p-2" type="text" placeholder="Suburb" />
              <input className="p-2" type="text" placeholder="City" />
              <input className="p-2" type="text" placeholder="Province" />
              <input className="p-2" type="number" placeholder="Postal Code" />
            </div>
          </div>
        </div>

        <div className="description__container py-10">
          <h2 className="w-fit">Description</h2>
          <div className="description__content">
            <Textarea
              className="custom-border"
              placeholder="My geyser burst and water is going to flood"
            />
          </div>
        </div>

        <div className="flex flex-col w-fit margin-center py-10">
          <h2 className="text-center">Upload</h2>
          <FileUpload onClick={handleFileUpload} />
        </div>

        {/* <div className="appointment__container flex ">
          <div className="flex-1">
            <h2 className="px-10">Book your appointment now</h2>
            <p className="px-10">So our team can reach out to you on time</p>
            <div className="p-10">
            <p> Share your message</p>
              <Textarea
                className="custom-border bg-gray-100"
                rows={25}
                // cols={5}
              />
            </div>
          </div>

          <div className="flex-1 mt-">
            <Calendar />
            <button>Submit</button>
          </div>
        </div> */}

        <div className="appointment__container flex">
          <div className="flex-1">
            <h2 className="px-10">Book your appointment now</h2>
            <p className="px-10">So our team can reach out to you on time</p>
            <div className="p-10">
              <p> Share your message</p>
              <Textarea className="custom-border bg-gray-100" rows={25} />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {/* Adjusted to center the Calendar and Submit button vertically */}
            <Calendar getSelectedDate={handleCalendar}/>
            {/* <button className="mt-4 ">Submit</button> */}
            <div className="flex justify-center margin-center w-96">
              <Button variant="custom">Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIssue;
