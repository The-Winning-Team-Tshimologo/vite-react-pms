import React, { useState } from "react";
import "./BrowseProfessionals.css"
import { blue } from "@mui/material/colors";

const TrackActivity = () => {
  const [Service, setService] = useState([
    {
      id: 1,
      name: "Lady Smith",
      date: "20 Apr 2024",
      status: "Accepted",
      imageUrl: "src/assets/Maintenance.jpg",
    },
    {
      id: 2,
      name: "Lady Smith",
      date: "20 Apr 2024",
      status: "Accepted",
      imageUrl: "src/assets/Maintenance.jpg",
    },
    {
      id: 3,
      name: "Lady Smith",
      date: "20 Apr 2024",
      status: "Declined",
      imageUrl: "src/assets/Maintenance.jpg",
    },
    {
      id: 4,
      name: "Lady Smith",
      date: "",
      status: "Pending",
      imageUrl: "src/assets/Maintenance.jpg",
    },
  ]);
  const handleClick = (selectedService) => {
    console.log(selectedService);
    // navigate("/");
  };

  const StatusColor = (ServiceStatus) => {
    let statusColor = "";
    switch (ServiceStatus) {
      case "Accepted":
        statusColor = "green";
        break;
      case "Declined":
        statusColor = "red";
        break;
      case "Pending":
        statusColor = "grey";
        break;
      default:
        statusColor = "transparent"; // Default color if status is not recognized
    }
    return statusColor;
  };

  return (
    <div className="TrackActivity">
      {" "}
      <h2>TrackActivity</h2>
      <div className="profile-container">
        {Service.map((Service, index) => (
          <div
            className="TrackActivity__card"
            key={Service.id}
            onClick={() => {
              handleClick(Service);
            }}
          >
            <div className="TrackActivity-header">
              <img src={Service.imageUrl} alt={Service.name} />
              <div>
                <p>{Service.name}</p>
                <p>Appointment:</p>
                <p>
                  {Service.date ? (
                    Service.date
                  ) : (
                    <span style={{ color: "blue" }}>
                      Book Appoitment
                    </span>
                  )}
                </p>
              </div>
              <div className="service__status">
                <span  style={{ backgroundColor: StatusColor(Service.status) }}>
                  {Service.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackActivity;
