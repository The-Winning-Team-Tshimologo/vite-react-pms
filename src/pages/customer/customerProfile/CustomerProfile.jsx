/** @format */

import Header from "@/components/header/Header";
import ProfessionalProfileCard from "@/components/professionalProfileCard/ProfessionalProfileCard";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import download from "../../../assets/download.jpeg";
import axios from "axios";

const CustomerProfile = () => {
  const { id, id2, userName, status } = useParams();
  const navigate = useNavigate();
  const CurrentDate = new Date().getTime();

  // ADDED PROFILE CODE
  //   const [data, setData] = useState(null);

  const handleMessageClick = () => {
    const currentUser = JSON.parse(localStorage.getItem("user")).userName; // Assuming you store the user object in local storage
    navigate(`/inbox`, {
      state: { userName: currentUser, user2: userName },
    });
  };

  const [ServiceRequest, setServiceRequest] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServiceRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(
        "http://localhost:8081/api/v1/service/serviceRequests/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized access");
        } else {
          throw new Error("Failed to fetch data");
        }
      }

      const data = await response.json();
      // console.log("request ", data);

      setServiceRequest(data);
    } catch (error) {
      console.error("Error fetching service requests:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceRequests();
  }, [id]);

  const handleAcceptance = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:8081/api/v1/service/assign/${id}/${id2}`,
        null,
        config
      );
      console.log("Request accepted:", response.data);

      navigate(
        `/customer-profile/${ServiceRequest.serviceId}/${ServiceRequest.customer.userId}/${ServiceRequest.customer.username}/${ServiceRequest.status}`
      );
      // navigate("/jobrequest");
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleAcceptRequest = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        `http://localhost:8081/api/v1/service/accept/${ServiceRequest.serviceId}`,
        null,
        config
      );
      // Handle successful acceptance (e.g., show a success message)
      navigate("/jobrequest");
      // console.log("Request accepted:", response.data);
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error accepting request:", error);
    }
  };

  const handleDecline = async () => {
    // Handle decline action
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        `http://localhost:8081/api/v1/service/decline/${id}`,
        null,
        config
      );
      // Handle successful acceptance (e.g., show a success message)

      console.log("Request decline:", response.data);
      navigate("/jobrequest");
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error accepting request:", error);
    }
  };

  const handleWithdraw = async () => {
    // Handle withdraw action
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        `http://localhost:8081/api/v1/service/withdraw/${ServiceRequest.serviceId}`,
        null,
        config
      );
      // Handle successful acceptance (e.g., show a success message)
      console.log("Request Withdraw:", response.data);
      navigate("/jobrequest");
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error accepting request:", error);
    }
  };

  const handleCompleteRequest = async () => {
    // Handle Complete request action
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        `http://localhost:8081/api/v1/service/confirm-completed/${ServiceRequest.serviceId}`,
        null,
        config
      );
      console.log("Request completed:", response.data);
      window.alert("Service Request completed");
      fetchServiceRequests();
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error accepting request:", error);
    }
  };

  const handleReview = () => {
    navigate("/review/"+ServiceRequest.serviceId);
  };
  // END

  return (
    <div className="profile__container">
      <Header />

      {/* **************************************Customer profile*************************** */}

      {ServiceRequest && (
        <div className="card_border_line">
          <div className="profile-pic">
            {ServiceRequest.customer && (
              <img
                src={`data:multipart/form-data;base64,${ServiceRequest.customer.profilePicture}`}
                alt="Profile"
              />
            )}
          </div>
          <div className="content">
            <div className="Name_Surname">
              <h2>
                {ServiceRequest.customer &&
                  ServiceRequest.customer.firstName +
                    " " +
                    ServiceRequest.customer.lastName}
              </h2>
            </div>
            <div className="context ">
              <p className=" text-lg">
                {ServiceRequest.customer &&
                  ServiceRequest.customer.roles.name.split("_")[1]}{" "}
              </p>
              <p>{ServiceRequest.customer && ServiceRequest.customer.email} </p>
            </div>
            <div className="location">
              <p>
                Address:{" "}
                {ServiceRequest.address &&
                  ServiceRequest.address.streetName +
                    ", " +
                    ServiceRequest.address.city +
                    ", " +
                    ServiceRequest.address.province +
                    ", " +
                    ServiceRequest.address.zipCode}
              </p>
              {/* <p>South Africa</p> */}
            </div>
          </div>
          <button className="submit_button" onClick={handleMessageClick}>
            Message
          </button>
        </div>
      )}

      {/* **************************************Service Request Details*************************** */}

      {ServiceRequest ? (
        <div className="service-request">
          <label className="main-label">Service Request Details</label>
          <div className="details mt-5">
            <div className="row">
              <div className="column title">
                <label>Title</label>
                <div>
                  {ServiceRequest.category && ServiceRequest.category.name}
                </div>
              </div>
              <div className="column appointed-for">
                <label>Appointed for</label>
                <div className="">{ServiceRequest.appointmentDate}</div>
              </div>
            </div>
            <div className="description">
              <label>Description</label>
              <div>{ServiceRequest.description}</div>
            </div>
          </div>
          <label>Service Request Images</label>

          <div className="images mt-2">
            {ServiceRequest.pictures ? (
              <img
                src={`data:multipart/form-data;base64,${ServiceRequest.pictures}`}
                alt={`service-request-`}
              />
            ) : (
              <h2>No Service request picture</h2>
            )}

            {/* {data.images.map((image, index) => (
          <img key={index} src={image} alt={`service-request-${index}`} />
        ))} */}
          </div>
          {!status ? (
            <button className="accept-button" onClick={handleAcceptance}>
              Accept Request
            </button>
          ) : (
            <div className="two-buttons flex items-center space-x-2">
              {ServiceRequest.status === "PENDING" && (
                <>
                  <button
                    className="status-button bg-[#008000] text-white"
                    onClick={handleAcceptRequest}
                  >
                    Accept
                  </button>
                  <button
                    className="status-button bg-[#D9D9D9]"
                    onClick={handleDecline}
                  >
                    Decline
                  </button>
                </>
              )}
              {ServiceRequest.status === "ACCEPTED" &&
              ServiceRequest.completed ? (
                <button
                  className="status-button bg-[#2C3639]  text-white"
                  onClick={handleReview}
                >
                  Review
                </button>
              ) : (
                <>
                  {" "}
                  {CurrentDate >= new Date(ServiceRequest.appointmentDate) && (
                    <button
                      className="status-button bg-[#008000]  text-white"
                      onClick={handleCompleteRequest}
                    >
                      Complete
                    </button>
                  )}
                  <button
                    className="status-button bg-[#D9D9D9] "
                    onClick={handleWithdraw}
                  >
                    Withdraw
                  </button>
                </>
              )}
              {ServiceRequest.status === "REJECTED" && (
                <button
                  className="status-button bg-[#D9D9D9]  opacity-70 cursor-not-allowed"
                  disabled
                >
                  Rejected
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <h2>No Service request data</h2>
      )}
    </div>
  );
};

export default CustomerProfile;
