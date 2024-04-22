import "./Update.css";
import React from "react";
import Profile from "../../assets/sbusisoAvatar.png";
import Header from "../header/Header";
function Update() {
  return (
    <>
      <div className="update">
        <Header/>

        <div className="avatar">
          <h3>Update Avatar</h3>
          <img src={Profile} alt="Avatar" className="round-image" />
          <div className="button">
            <button className="primary-btn">Save</button>
          </div>
        </div>

        <div className="content">
          <h2>Personal Summary</h2>
          <textarea
            id="myTextarea"
            name="myTextarea"
            rows="4"
            cols="50"
          ></textarea>
          <div className="button">
            <button className="primary-btn">Save</button>
          </div>

          <h2>Work Experience</h2>
          <textarea
            id="myTextarea"
            name="myTextarea"
            rows="4"
            cols="50"
          ></textarea>
          <div className="button">
            <button className="primary-btn">Save</button>
          </div>

          <h2>Address</h2>
          <textarea
            id="myTextarea"
            name="myTextarea"
            rows="4"
            cols="50"
          ></textarea>
          <div className="button">
            <button className="primary-btn">Save</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Update;
