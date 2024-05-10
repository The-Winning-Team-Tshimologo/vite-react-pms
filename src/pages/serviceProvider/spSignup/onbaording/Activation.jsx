import Header from "@/components/header/Header";
import React from "react";
import SPSIgnupProgress from "../SPSIgnupProgress";
import "./Activation.css";

const Activation = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="SPSignupUploadDocument__progress ml-10">
          <SPSIgnupProgress completedPages={100} page={"Activation"} />
        </div>
        <div className="flex flex-col flex-1 custom-width h-screen items-center justify-center gap-5">
          <h1>Your Application is under review</h1>
          <h2 className="p-10">
            We'll notify you via email once your account is activated
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Activation;
