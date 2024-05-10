import React from "react";
import Header from "@/components/header/Header";
import profile from "../../assets/sbusisoAvatar.png";
import location from "../../assets/location_pin.jpg";
import smiley from "../../assets/smiley_11768538.png";
import btn from "../../assets/btn.jpg";
// import { Textarea } from "@/components/ui/textarea";
import "./Comms.css";

function Comms() {
  return (
    <div>
      <Header />

      <div className="square-lines">
        <div class="profile">
          <img src={profile} alt="Avatar" className="round-image" />
          <div class="profile-info">
            <h2>Rea Motho</h2>
            <div class="location">
              <img src={location} alt="Location Pin" className="location" />
              <h4>Johannesburg, Gauteng</h4>
            </div>
            <div className="content">
              <h4>6 Completed Services</h4>
              <div class="separator"></div>
              <h4>(+27) 555 555 555</h4>
              <div class="separator"></div>
              <h4>(+27) 555 555 555</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="inbox">
        <div class="chat-box">
          <div class="date-divider">
            <h3>Today</h3>
          </div>
          <div class="chat sender">
            <div class="message">Hey! How's it going?</div>
          </div>
          <div class="chat receiver">
            <div class="message">
              Hi! I'm doing fine, thanks. How about you?
            </div>
          </div>

          <div class="input-container">
            <img src={smiley} alt="emoji" className="smiley" />
            <textarea class="custom-textarea" placeholder="Message"></textarea>
            <img src={btn} alt="button" className="btn" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comms;
