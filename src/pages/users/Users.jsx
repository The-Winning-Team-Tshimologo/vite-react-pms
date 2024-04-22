import React from "react";
import "./Users.css";
import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";

const mockSPData = [
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

const mockCustomerData = [
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

const Users = () => {
  return (
    <div>
      <Header />
      <h2 className="users-heading">Customers</h2>
      {mockCustomerData.map((profile) => (
        <div key={profile.id} className="users-card">
          <img
            className="users-card__img"
            src={profile.img}
            alt={`${profile.firstname} ${profile.lastname}`}
          />
          <p className="users-card-names">
            {profile.firstname} {profile.lastname}
          </p>
          <p className="users-card-date">{profile.date}</p>
          <p className="users-card-time">{profile.time}</p>
          <Button className="users-card__btn">View</Button>
        </div>
      ))}

      <h2 className="users-heading">Service Providers</h2>
      {mockSPData.map((profile) => (
        <div key={profile.id} className="users-card">
          <img
            className="users-card__img"
            src={profile.img}
            alt={`${profile.firstname} ${profile.lastname}`}
          />
          <p className="users-card-names">
            {profile.firstname} {profile.lastname}
          </p>
          <p className="users-card-date">{profile.date}</p>
          <p className="users-card-time">{profile.time}</p>
          <Button className="users-card__btn">View</Button>
        </div>
      ))}
    </div>
  );
};

export default Users;
