import React from "react";
import "./Hero.css";
import Foto from "../../assets/logo.png";
import heroImage from "../../assets/cover.jpg";

function Hero() {
  return (
    <>
      <div id="hero" className="hero">
        <div className="hero__container">
          <div className="logo-holder">
            <img src={Foto} alt="" className="logo" />
          </div>
          <div className="row">
            <div className="hero__content">
              <p>
                Currents, Pipes, Vibes,
                <br />
                and Heights –<br></br> We've Got Your Space
                <br />
                Wired Right
              </p>
              <div className="two-button">
                <button className="primary-btn-login">Login</button>
                <button className="primary-btn">Sign up</button>
              </div>
            </div>
            <div className="image-holder">
              <img src={heroImage} alt="" className="image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
