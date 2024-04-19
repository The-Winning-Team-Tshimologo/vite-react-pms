import React from "react";
import "./Applications.css";
import { Button } from "@/components/ui/button";
import Header from "@/components/header/Header";

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
    </div>
  );
};

export default Applications;
