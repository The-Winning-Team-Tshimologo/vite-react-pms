import React, { useEffect, useState } from "react";
import "./BrowseProfessionals.css";
import { blue } from "@mui/material/colors";
import { fetchAllUsers } from "@/utils/fetchAllUsers";

const TrackActivity = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    fetchAllUsers()
      .then(setUsers)
      // console.log("Users: ", users)
      .catch((err) => {
        console.error("Error loading users:", err);
        setError("Failed to load users");
      });

    const fetchUserData = async () => {
      setLoading(true);
      const fetchedUser = await fetchUserById(users.id);
      if (fetchedUser) {
        setUser(fetchedUser);
      } else {
        setError("Unable to fetch user data.");
      }
      setLoading(false);
    };

    if (users.id) {
      fetchUserData();
    }
  }, [users.id]);
  // const [Service, setService] = useState([
  //   {
  //     id: 1,
  //     name: "Lady Smith",
  //     date: "20 Apr 2024",
  //     status: "Accepted",
  //     imageUrl: "src/assets/Maintenance.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Lady Smith",
  //     date: "20 Apr 2024",
  //     status: "Accepted",
  //     imageUrl: "src/assets/Maintenance.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Lady Smith",
  //     date: "20 Apr 2024",
  //     status: "Declined",
  //     imageUrl: "src/assets/Maintenance.jpg",
  //   },
  //   {
  //     id: 4,
  //     name: "Lady Smith",
  //     date: "",
  //     status: "Pending",
  //     imageUrl: "src/assets/Maintenance.jpg",
  //   },
  // ]);
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
      <h2 className="px-10">TrackActivity</h2>
      {/* <div className="profile-container">
        {user.map((user, index) => (
          <div
            className="TrackActivity__card"
            key={user.id}
            onClick={() => {
              handleClick(user);
            }}
          >
            <div className="TrackActivity-header">
              <img src={user.profilePicture} alt={user.firstName + user.lastName} />
              <div>
                <p>{user.requests.serviceName}</p>
                <p>Appointment:</p>
                <p>
                  {user.reervice.date ? (
                    Service.date
                  ) : (
                    <span style={{ color: "blue" }}>Book Appoitment</span>
                  )}
                </p>
              </div>
              <div className="service__status">
                <span style={{ backgroundColor: StatusColor(Service.status) }}>
                  {Service.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default TrackActivity;
