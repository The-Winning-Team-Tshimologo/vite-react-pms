import React from "react";
import "./ServiceRequest.css";
import Picture1 from "../../assets/Maintenance.jpg";
import Picture2 from "../../assets/Maintenance.jpg";
import Picture3 from "../../assets/Maintenance.jpg";
function ServiceRequest() {
  return (
    <div class="nomps">
      <h4>Service Request Details</h4>

      <div className="mpilo">
        <h3>Title</h3>
        <p>Plumber</p>
      </div>

      <div className="S-mpilo">
        <h3>Description</h3>
        <p>OMG my geyser is leaking ,when can you come to fix it?</p>
      </div>

      <div className="nompi">
        <h3>Service Request Images</h3>
        <img src={Picture1} alt="" className="card-img" />
        <img src={Picture2} alt="" className="card-img" />
        <img src={Picture3} alt="" className="card-img" />
      </div>
    </div>
  );
}

export default ServiceRequest;
// Nothing