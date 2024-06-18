import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import JobRequestItem from "../JobRequestItem/JobRequestItem";

const ServiceReview = () => {
  const [ServiceRequest, setServiceRequest] = useState([]);

  const fetchServiceRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(
        "http://localhost:8081/api/v1/service/serviceRequests",
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
      console.log(data);
      // setMainData(data);
      // setServiceRequest(data);
      setServiceRequest(
        data.filter(
          (item) => item.status === "ACCEPTED" && item.completed === true
        )
      );
    } catch (error) {
      console.error("Error fetching service requests:", error.message);
    }
  };

  useEffect(() => {
    fetchServiceRequests();
  }, []);
  return (
    <>
      <div>
        <Header />
        <div className="job-container ">
          <div className="job-request">
            <h2 className="font-bold text-[25px] mb-7">Service Review</h2>
            <div className="track-job py-8">
              {ServiceRequest.length > 0 ? (
                <ul className="mb-7">
                  {ServiceRequest.map((ServiceRequest, index) => (
                    <JobRequestItem
                      key={index}
                      ServiceRequest={ServiceRequest}
                      fetchServiceRequests={fetchServiceRequests}
                    />
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Nothing found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceReview;
