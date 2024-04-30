import React, { useState } from "react";
import "./BrowseProfessionals.css";
import { Button } from "@/components/ui/button";
import ProfileCard from "./ProfileCard";
import { useNavigate } from "react-router";
import TrackActivity from "./TrackActivity";
import Header from "../../components/header/Header";
import { fetchUsersByRole } from "@/utils/fetchUsersByRole";

const BrowseProfessionals = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  // const [profiles, setProfiles] = useState([
  //   {
  //     id: 1,
  //     name: "Thatha Taga",
  //     address: "33 Life Ave, Soweto",
  //     rating: "4/5",
  //     job: "Gardener",
  //     imageUrl: "src/assets/Maintenance.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Da Costa",
  //     address: "255 Dophney Close, Johannesburg",
  //     rating: "2/5",
  //     job: "Plumber",
  //     imageUrl: "src/assets/Maintenance.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Ken Nethi",
  //     address: "12 High St, JHB CBD",
  //     rating: "3/5",
  //     job: "Fitter",
  //     imageUrl: "src/assets/Maintenance.jpg",
  //   },
  //   {
  //     id: 4,
  //     name: "Risotto Penne",
  //     address: "9 Sunninghill Rd, Sunninghill",
  //     rating: "5/5",
  //     job: "Fitter",
  //     imageUrl: "src/assets/Maintenance.jpg",
  //   },
  //   {
  //     id: 5,
  //     name: "Echo Chamber",
  //     address: "27 Van Buuren Rd, Bedfordview",
  //     rating: "4/5",
  //     job: "Electrician",
  //     imageUrl: "src/assets/Maintenance.jpg",
  //   },
  //   {
  //     id: 6,
  //     name: "Echo Chamber",
  //     address: "27 Van Buuren Rd, Bedfordview",
  //     rating: "4/5",
  //     job: "Electrician",
  //     imageUrl: "src/assets/Maintenance.jpg",
  //   },
  // ]);

  fetchUsersByRole("service_provider").then((users) => {
    if (users) {
      setProfiles(users);
      // console.log("Fetched service providers:", users);
    } else {
      
      // console.log("No service providers found or an error occurred.");
    }
  });

  const handleClick = (selectedProfile) => {
    console.log(selectedProfile);
    // navigate("/");
  };
  return (
    <>
      <Header />
      {/* Add means of checking whether there are activities to showcase or not */}
      <TrackActivity />
      <div className="BrowseProfessionals">
        <h2> Browse Professionals</h2>
        <div className="profile-container">
          {profiles.map((profile, index) => (
            <ProfileCard
              key={index}
              profile={profile}
              handleClick={handleClick}
            />
          ))}
        </div>

        <div className="flex justify-center margin-center w-96">
          <Button variant="custom">Log Issue</Button>
        </div>
      </div>
    </>
  );
};

export default BrowseProfessionals;
