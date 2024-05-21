import React, { useState, useEffect } from "react";
import "./Applications.css";
import { Button } from "@/components/ui/button";
import Header from "@/components/header/Header";
import { useNavigate } from "react-router";

const mockData = [
  {
    id: 1,
    firstname: "Chinmay",
    lastname: "Sarasvati",
    date: "23 Sep 2023",
    time: "02:52PM",
    img: "/src/assets/Ellipse23.png",
  },
  {
    id: 2,
    firstname: "Dina",
    lastname: "Glenn",
    date: "22 Sep 2023",
    time: "01:36PM",
    img: "/src/assets/Ellipse24.png",
  },
  {
    id: 3,
    firstname: "Izabella",
    lastname: "Tabakova",
    date: "29 Sep 2023",
    time: "06:58PM",
    img: "/src/assets/Ellipse25.png",
  },
  {
    id: 4,
    firstname: "Opi",
    lastname: "Watihana",
    date: "16 Sep 2023",
    time: "02:41PM",
    img: "/src/assets/grahamAvatar.png",
  },
];




const Applications = () => {

  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

useEffect(() => {

  const fetchUserData = async () => {
  fetch("http://localhost:8081/api/v1/admin/pending-sp", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setApplications(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  }


  fetchUserData();
}, []);

  const handleClick =(userId)=>{
    // console.log(userId);  
    navigate("/sp-profile2/"+userId+"/"+userId)


  }

  return (
    <div>
      <Header />
      <h2 className="applications-heading">Applications</h2>
      {mockData.map((application) => (
        <div key={application.id} className="application-card">
          <img
            className="application-card__img"
            src={application.img}
            alt={`${application.firstname} ${application.lastname}`}
          />
          <p className="application-card-names">
            {application.firstname} {application.lastname}
          </p>
          <p className="application-card-date">{application.date}</p>
          <p className="application-card-time">{application.time}</p>
          <Button className="application-card__btn">View</Button>
        </div>
      ))}

<h2 className="applications-heading">Applications</h2>
      { applications.length >0 ? applications.map((application) => (
        <div key={application.userId} className="application-card">
          <img
            className="application-card__img"
            src={`data:multipart/form-data;base64,${application.profilePicture}`}
            alt={`${application.firstName} ${application.lastName}`}
          />
          <p className="application-card-names">
            {application.firstName} {application.lastName}
          </p>
          
           <p className="application-card-date">{application.createdDate.split('T')[0]}</p>
          <p className="application-card-time">{application.createdDate.split('T')[1].split('.')[0]}</p>
          <Button className="application-card__btn" onClick={()=>handleClick(application.userId)}>View</Button>
        </div>
      )) :<h2 className="pl-12">No Applications</h2>}
    </div>
  );
};

export default Applications;
