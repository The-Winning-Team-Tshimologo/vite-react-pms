import "./Update.css";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Header from "@/components/header/Header";

import Profile from "@/assets/sbusisoAvatar.png";
function Update() {
  return (
    <>
      <Header />
      <div className="avatar">
        <h3>Update Avatar</h3>
        <img src={Profile} alt="Avatar" className="round-image" />
        <div className="button">
          <Button>Save</Button>
        </div>
      </div>

      <div className="summary__container py-10">
        <h2 className="w-fit">Personal Summary</h2>
        <div className="summary__content">
          <Textarea
            className="custom-border"
            placeholder="i'm a bubbly and loving person who grew up in soweto and now resides in South Johannesburg, Winchester Hills"
          />
        </div>
        <div className="button">
          <Button>Save</Button>
        </div>
      </div>

      <div className="summary__container py-10">
        <h2 className="w-fit">Work Experience</h2>
        <div className="summary__content">
          <Textarea
            className="custom-border"
            placeholder="Mid Virtualization Architect Pearson Insitute March 2020 - Present"
          />
        </div>
        <div className="button">
          <Button>Save</Button>
        </div>
      </div>

      <div className="summary__container py-10">
        <h2 className="w-fit">Address</h2>
        <div className="summary__content">
          <Textarea
            className="custom-border"
            placeholder="14 Kent Avenue Winchester Hills Suburb Johsnnesburg Gauteng 2110"
          />
        </div>
        <div className="button">
          <Button>Save</Button>
        </div>
      </div>
    </>
  );
}

export default Update;
