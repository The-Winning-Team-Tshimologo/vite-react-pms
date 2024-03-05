
import React from "react";
import { BsFacebook } from "react-icons/bs";
import { FaSquareTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3>Contact Us</h3>
        <p>Email: info@propertymaintainance.com</p>
        <p>Phone: +1 (555) 123-4567</p>
      </div>
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Properties</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Follow Us</h3>
        <div class="social-icons">
        <span className="footer__flex-row">
              <BsFacebook /> <FaSquareTwitter /> <BsInstagram />
           </span>
        </div>
      </div>
    </div>
    </div>

    // <div id="footer" className="main-footer">
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-1">
    //         <h4>FOLLOW US</h4>
    //         <ul className="list-unstyled">
    //           <li>Yes, we are social</li>
    //         </ul>
    //         <span className="footer__flex-row">
    //           <BsFacebook /> <FaSquareTwitter /> <BsInstagram />
    //         </span>
    //       </div>

    //       <div className="col-2">
    //         <h4>Logo</h4>
    //       {/* <img src={Foto} alt="" className="logo" /> */}
    //       </div>

    //       <div className="col-3">
    //         <h4>CONTACT US</h4>
    //         <ul className="list-unstyled">
    //           <li>pms@gmail.com</li>
    //           <li>41 Juta Street, Braamfontein,</li>
    //           <li>Johannesburg, 2001</li>
    //         </ul>
    //       </div>
    //     </div>
    //     <hr />
    //     <div className="row-2">
    //       <p className="col-sm">
    //         &copy;{new Date().getFullYear()} Property Maintanaince System| All rights reserved |
    //         Terms of Service | Privacy
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Footer;