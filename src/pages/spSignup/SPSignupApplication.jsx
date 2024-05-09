import Header from "@/components/header/Header";
import Form from "@/components/signin/Form";
import React from "react";
import SPSIgnupProgress from "./SPSIgnupProgress";

const SPSignupApplication = () => {
  return (
    <>
    <Header/>
      <div className="flex">
        <div className="SPSignupUploadDocument__progress  ml-10 ">
          <SPSIgnupProgress completedPages={25} page={"Personal Information"} />
        </div>
        {/* <Header /> */}
        <Form />
      </div>
    </>
  );
};

export default SPSignupApplication;
