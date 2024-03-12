// Service.jsx
import React from "react";
import { services, svg } from "./ServiceData";
import "./service.css";

function Service() {
  return (
    <div className="services-container">
      <div className="service-content"></div>
      <div className="service-svg" >
        {svg.map((item, index) => (
          <div key={index} className="svg-container">
            {item.svg}
          </div>
        ))}
      </div>

        <div className="service-container">
            <div className="service-description">
                <h1>What we are offering</h1>
                <p>Service Facilities<br/>
                    We have over 1000+ Reviews of Customers <br />
                    trusting our quality service</p>

            </div>

            <div className="icons-container" style={{ marginTop: "20px" }}>
                <div className="top-icons">
                    {services.slice(0, 2).map((service, index) => (
                        <div key={index} className="service-item">
                            <div className="icon-container">{service.icon}</div>
                        </div>
                    ))}
                </div>

                <div className="bottom-icons">
                    {services.slice(2, 5).map((service, index) => (
                        <div key={index} className="service-item">
                            <div className="icon-container">{service.icon}</div>
                            <div className="spacer"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}

export default Service;
