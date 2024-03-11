// import Calendar from "@/components/calendar/Calendar";
import Calendar from "@/components/calendar/Calendar";
import Header from "@/components/header/Header";
import React from "react";
import "./Dashboard.css";
import FileUpload from "@/components/fileUpload/FileUpload";

const Dashboard = () => {
  const handleClick = () => {
    window.alert("clicked");
  };

  return (
    <>
      <Header />
      <div className="mt-10 mr-2 mx-2">
        <h1>Dashboard</h1>
      </div>
      <h2 className="mr-2 mx-2">Browse Professionals</h2>
      <Calendar />

      <FileUpload onClick={handleClick} />

      {/* <div className="flex justify-center">
       <img className="img-size" src="/src/assets/upload-icon.png" alt="" />
       
      </div> */}
    </>
  );
};

export default Dashboard;
